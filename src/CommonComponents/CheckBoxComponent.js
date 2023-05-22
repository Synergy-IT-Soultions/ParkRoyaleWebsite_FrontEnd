import { Component } from "react";
import { Form } from "react-bootstrap";
import _ from 'lodash'

import { connect } from "react-redux";
import { ON_CHANGE } from "../utils/ActionTypes";

class CheckBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options:[]
        }
    }

    componentDidMount() {

        const { onChange , id, value} = this.props;
        let data={};
        _.set(data, "id", id);
        _.set(data, "value", value);
        onChange(data);

    }

    componentWillUnmount() {
        const {onChange, id} = this.props;
        let data={};
        _.set(data, "id", id);
        _.set(data, "value", "");
        onChange(data);

    }

    onValueChange = (event)=>{
        const { onChange , id, performAction} = this.props;
        let data={};
        let value = event.target.checked;
        _.set(data, "id", id);
        _.set(data, "value", value);
        onChange(data);

        if(performAction){
            performAction(event);
        }


    }

    render() {
        const { id, label, type, formData } = this.props;

        return (
            <div>
                    <Form.Check
                        type={type?type:"switch"}
                        id={id}
                        label={label}
                        onChange={this.onValueChange}
                        checked={_.get(formData, id)}
                    />
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

export default connect(mapStateToPros, mapDispatchToProps)(CheckBoxComponent);