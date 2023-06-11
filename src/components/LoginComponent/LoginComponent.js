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
import { displayErrors } from '../../utils/CommonUtils';
import { NavLink } from 'react-router-dom';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = { show: false, loggedin: false, user_name: "", password: "", validated: false, isInValid:false }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.validateUser = this.validateUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isUserNameValid = this.isUserNameValid.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.userNameRef = React.createRef();
    }

    handleClose() {
        //this.setState({ show: false });
        const { showLoginModalDispatcher } = this.props;
        showLoginModalDispatcher(false);
    }

    handleShow() {
        
        //this.setState({ show: true });
        const { showLoginModalDispatcher } = this.props;
        showLoginModalDispatcher(true);
        if(this.props.mobileToggleClicked){
            this.props.mobileToggleClicked();
        }
        //this.userNameRef.current.focus();
    }

    validateUser(event) {
        //const user = authenticate();
        //alert(JSON.stringify(user.data));
        const { addUserInfo, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        //addUserInfo("userInfo",user.data);
        const form = event.currentTarget;

        if (form.checkValidity() === false || _.isEmpty(this.state.user_name) || _.isEmpty(this.state.password)) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: false , isInValid: true});
            toast.error("Invalid User Credentials");
            return;
        }
        this.setState({ validated: true , isValid:true});

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
                this.setState({ show: false, loggedin: true, isInValid: false });
                showLoginModalDispatcher(false);
                hidePageLoader();
            })
            .catch(error => {
                console.log(error);
                displayErrors(error);
                this.setState({ validated: false , isInValid: true});
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
        if(_.isEmpty(e.target.value)){
            data.isInValid = false;
        }
        this.setState(data);

    }

    logoutUser() {
        const { removeUserInfo, showPageLoader, hidePageLoader } = this.props;
        showPageLoader();
        removeUserInfo("userInfo");
        sessionStorage.removeItem('userInfo');
        this.setState({ loggedin: false, user_name: "", password: "" });
        if(this.props.mobileToggleClicked){
            this.props.mobileToggleClicked();
        }
        setTimeout(() => {
            hidePageLoader();
        }, 1000);
    }

    isUserNameValid() {
        if(_.isEmpty(this.state.user_name)) return false;
        
        return this.state.isInValid;
    }

    isPasswordValid() {
        if(_.isEmpty(this.state.password)) return false;
        return this.state.isInValid;
    }

    handleKeyPress(e){
        //alert("Hello"+ e.keyCode);
        if (e.keyCode == 13) {
            this.validateUser(e);
        }
        
    }

    render() {

        const { showLoginModal } = this.props;

        return (
            <React.Fragment>


                <div align="right">
                {!this.state.loggedin && <li><NavLink className="getstarted scrollto" onClick={this.handleShow}> Admin Login </NavLink></li>}
                {this.state.loggedin && <li><NavLink className="getstarted scrollto" onClick={this.logoutUser}> Logout </NavLink></li>}
                </div>
                <Modal show={showLoginModal} onHide={this.handleClose} onKeyDown={this.handleKeyPress}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <FloatingLabel
                                // controlId="floatingInput"
                                label="User Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" ref={this.userNameRef} isInvalid={this.isUserNameValid()} name="user_name" placeholder="User Name" id="user_name" value={this.state.user_name} onChange={this.onChange} required onKeyDown={this.handleKeyPress}/>
                            </FloatingLabel>
                            <FloatingLabel label="Password">
                                <Form.Control type="password" isInvalid={this.isPasswordValid()} placeholder="Password" id="password" value={this.state.password} onChange={this.onChange} required onKeyDown={this.handleKeyPress}/>
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
        count: state.count,
        showLoginModal: state.showLoginModal
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addUserInfo: (id, data) => dispatch({ type: 'USER_INFO', id, data }),
        removeUserInfo: (id) => dispatch({ type: 'REMOVE_USER', id }),
        showPageLoader: () => showPageLoader(dispatch),
        hidePageLoader: () => hidePageLoader(dispatch),
        showLoginModalDispatcher: (value) => dispatch({ type: "SHOW_LOGIN", showLoginModal:value})
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(LoginComponent);