import { Component } from "react";
import { connect } from "react-redux";
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import _ from 'lodash'
import cmClient from "../../clients/ContentManagementClient";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { toast } from "react-toastify";

class RoomPricingHeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            showEditPage:true
        }
    }

    handleSave = (event) => {
        const { data, formData, showPageLoader, hidePageLoader } = this.props;
        const { token } = this.props;
        const auth = "Bearer " + token;

        let requestData = _.cloneDeep(data);
        requestData.containerHeader = _.get(formData, data.pageContainerInfoId + "")
        requestData.containerTextInfo[0].containertextLabelValue = _.get(formData, data.containerTextInfo[0].containerTextInfoId);

        console.log("requestData======================>");
        console.log(JSON.stringify(requestData));
        console.log(requestData);
        //return;
        showPageLoader();
        cmClient.post('/content/save/container', requestData, {
            headers: {
                'Authorization': auth
            }
        })
            .then(response => {
                toast.success("Record saved Successfully.");
                console.log("record saved successfully");
                console.log(response.data);
                this.props.loadData();
                hidePageLoader();
                this.setState({showEditPage:false})
            })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                toast.error(error.response.data.errorMessage);
            });



    }

    render() {
        const { data, isAdmin } = this.props;
        const containerHeader = data.containerHeader;
        const containertextLabelValue = data.containerTextInfo[0].containertextLabelValue;

        return (
            <div className="section-title">
                <h2>{isAdmin ? <ContainerEditComponent showEditPage={ this.state.showEditPage} data={data} handleSave={this.handleSave} /> : ""}{containerHeader}</h2>
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
        showPageLoader: () => showPageLoader(dispatch),
        hidePageLoader: () => hidePageLoader(dispatch),
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(RoomPricingHeaderComponent);