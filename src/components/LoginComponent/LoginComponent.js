import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { FloatingLabel } from 'react-bootstrap';
import _ from "lodash";
import { hidePageLoader, showPageLoader } from '../../utils/ReduxActions';
import cmClient from '../../clients/ContentManagementClient';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { show: false, loggedin: false, user_name: "", password: "", validated: false }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    validateUser(event) {
        //const user = authenticate();
        //alert(JSON.stringify(user.data));
        const { addUserInfo, showPageLoader, hidePageLoader } = this.props;
        //addUserInfo("userInfo",user.data);
        const form = event.currentTarget;

        if (form.checkValidity() === false || _.isEmpty(this.state.user_name) || _.isEmpty(this.state.password)) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: false });
            toast("Invalid User Credentials");
            return;
        }
        this.setState({ validated: true });

        showPageLoader();
        cmClient.post('/user/authenticate', {}, {
            auth: {
                username: this.state.user_name,
                password: this.state.password
            }
        })
            //.then(response => console.log(response))
            .then(response => {
                addUserInfo("userInfo", response.data);
                sessionStorage.setItem('userInfo', JSON.stringify(response.data));
                this.setState({ show: false, loggedin: true });
                hidePageLoader();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.errorMessage);
                hidePageLoader();
            });

    }

    componentDidMount() {
        const { addUserInfo } = this.props;
        const userInfo = sessionStorage.getItem('userInfo');
        if(!_.isEmpty(userInfo)){
            addUserInfo("userInfo", JSON.parse(userInfo));
            this.setState({ show: false, loggedin: true });
        }
        
    }

    onChange(e) {
        let key = e.target.id;
        let data = {};
        data[key] = e.target.value;
        this.setState(data);

    }

    logoutUser() {
        const { removeUserInfo, showPageLoader, hidePageLoader } = this.props;
        showPageLoader();
        removeUserInfo("userInfo");
        sessionStorage.removeItem('userInfo');
        this.setState({ loggedin: false, user_name: "", password: "" });
        setTimeout(() => {
            hidePageLoader();
        }, 1000);
    }

    render() {
        return (
            <React.Fragment>



                {!this.state.loggedin && <li><a className="nav-link scrollto" href="javascript:void(0)" onClick={this.handleShow}> Login </a></li>}
                {this.state.loggedin && <li><a className="nav-link scrollto" href="javascript:void(0)" onClick={this.logoutUser}> Logout </a></li>}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form noValidate validated={this.state.validated}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="User Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" name="user_name" isValid={!_.isEmpty(this.state.user_name)} isInvalid={_.isEmpty(this.state.user_name)} placeholder="User Name" id="user_name" value={this.state.user_name} onChange={this.onChange} required />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" isValid={!_.isEmpty(this.state.password)} isInvalid={_.isEmpty(this.state.password)} placeholder="Password" id="password" value={this.state.password} onChange={this.onChange} required />
                            </FloatingLabel>


                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" onClick={this.validateUser}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>);
    }
}

const mapStateToPros = state => {
    return {
        count: state.count
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addUserInfo: (id, data) => dispatch({ type: 'USER_INFO', id, data }),
        removeUserInfo: (id) => dispatch({ type: 'REMOVE_USER', id }),
        showPageLoader: () => showPageLoader(dispatch),
        hidePageLoader: () => hidePageLoader(dispatch),
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(LoginComponent);