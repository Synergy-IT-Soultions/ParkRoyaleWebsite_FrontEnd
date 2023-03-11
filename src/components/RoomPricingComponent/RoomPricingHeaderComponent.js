import { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import _ from 'lodash'
import axios from "axios";
import cmClient from "../../clients/ContentManagementClient";

class RoomPricingHeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleSave = (event) => {
        const { data, formData } = this.props;
        const { token } = this.props;
        const auth = "Bearer " + token;

        let requestData = _.cloneDeep(data);
        requestData.containerHeader = _.get(formData, data.pageContainerInfoId + "")
        requestData.containerTextInfo[0].containertextLabelValue = _.get(formData, data.containerTextInfo[0].containerTextInfoId);

        console.log("requestData======================>");
        console.log(JSON.stringify(requestData));
        console.log(requestData);
        //return;

        cmClient.post('/content/save/container', requestData, {
            headers: {
                'Authorization': auth
            }
        })
            .then(response => {
                console.log("record saved successfully");
                console.log(response.data);
                this.props.loadData();
            })
            .catch(error => console.log(error));



    }

    render() {
        const { data, isAdmin } = this.props;
        const containerHeader = data.containerHeader;
        const containertextLabelValue = data.containerTextInfo[0].containertextLabelValue;

        return (
            <div className="section-title">
                <h2>{isAdmin ? <ContainerEditComponent data={data} handleSave={this.handleSave} /> : ""}{containerHeader}</h2>
                <p>{containertextLabelValue}</p>
            </div>
        );
    }
}


const mapStateToPros = state => {
    return {
        isAdmin: _.isEqual(state?.userInfo?.role, "Admin"),
        // isAdmin:true,
        token: state.userInfo.token,
        formData: state.formData,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
    }
};

export default connect(mapStateToPros, undefined)(RoomPricingHeaderComponent);