import { Component } from "react";
import { Form, Image } from "react-bootstrap";
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

        const { select, onChange , id, value, fetchOptions} = this.props;
        let data={};
        _.set(data, "id", id);
        _.set(data, "value", value);
        onChange(data);

        if(_.isFunction(fetchOptions)){
            let options = fetchOptions();
            this.setState({options:options});
        }
        

        if(!select) return;

    }

    componentWillUnmount() {

    }

    onValueChange = (event)=>{
        const { onChange , id} = this.props;
        let data={};
        let value = event.target.value;
        _.set(data, "id", id);
        _.set(data, "value", value);
        onChange(data);

        const {options} = this.state;
        let imageInfo = _.filter(options, option=>{ return option.imageInfoId==value})[0]
        this.setState({imageInfo});

    }

    render() {
        const { id, label, type, select, formData ,showSelectedImage} = this.props;
        const { options, imageInfo } = this.state;

        return (
            <div>
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
                    </Form.Select>
                    
                }
            </Form.Group>
            {showSelectedImage && imageInfo?<Image src={imageInfo.thumbnailURL} thumbnail={true}/>:""}
            </div>
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