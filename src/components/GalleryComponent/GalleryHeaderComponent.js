import { Component } from "react";
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import _ from 'lodash'
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { connect } from "react-redux";
import cmClient from "../../clients/ContentManagementClient";
import { toast } from "react-toastify";
import { displayErrors } from "../../utils/CommonUtils";

class GalleryHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            showEditPage:true
        }
    }

    handleSave = (event) => {
        const { headerData, formData, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        const { token } = this.props;
        const auth = "Bearer " + token;

        let requestData = _.cloneDeep(headerData);
        requestData.containerHeader = _.get(formData, headerData.pageContainerInfoId + "")
        requestData.containerTextInfo[0].containertextLabelValue = _.get(formData, headerData.containerTextInfo[0].containerTextInfoId+"");

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
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });
    }

    render() {
        const {headerData, isAdmin} = this.props;

        const containerHeader = headerData.containerHeader;
        const containertextLabelValue = headerData.containerTextInfo[0].containertextLabelValue;

        return (
            <>
            {headerData?
            <div className="section-title">
                <h2>{isAdmin ? <ContainerEditComponent showEditPage={ this.state.showEditPage} data={headerData} handleSave={this.handleSave} /> : ""}{containerHeader}</h2>
                {/* <p>{containertextLabelValue}</p> */}
                
            </div>:<SpinnerComponent/>}
            </>
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
        showLoginModalDispatcher: (value) => dispatch({ type: "SHOW_LOGIN", showLoginModal:value})
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(GalleryHeaderComponent);