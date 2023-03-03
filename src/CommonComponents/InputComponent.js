import { Component } from "react";
import { Form } from "react-bootstrap";
import _ from 'lodash'
import axios from "axios";
import { connect } from "react-redux";
import { ON_CHANGE } from "../utils/ActionTypes";

class InputComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[]
        }
    }

    componentDidMount() {

        const { select, onChange , id, value} = this.props;
        let data={};
        _.set(data, "id", id);
        _.set(data, "value", value);
        onChange(data);

        if(!select) return;

        axios.get('http://10.10.10.32/ContentManagement/content/get/image/list/SUITSANDROOMS')
            //.then(response => console.log(response))
            .then(response => this.setState({ options: response.data}))
            .catch(error => console.log(error));

    }

    onValueChange = (event)=>{
        const { onChange , id} = this.props;
        let data={};
        _.set(data, "id", id);
        _.set(data, "value", event.target.value);
        onChange(data);

    }

    render() {
        const { id, label, type, select, formData } = this.props;
        const { options } = this.state;

        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                {!select ?
                    <Form.Control
                        required
                        type={type}
                        id={id}
                        value={_.get(formData, id)}
                        onChange={this.onValueChange}
                    />
                    :

                    <Form.Select aria-label="Default select example" id={id} value={_.get(formData, id)} onChange={this.onValueChange}>
                        {
                            _.map(options, (option) => {
                                return <option value={option.imageInfoId}>{option.imageName}</option>
                            })
                        }
                    </Form.Select>}
            </Form.Group>
        );
    }
}

const mapStateToPros = state => {
    return {
        formData: state.formData,
        token: state.userInfo.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onChange: (data) => dispatch({ type: ON_CHANGE , data}),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(InputComponent);