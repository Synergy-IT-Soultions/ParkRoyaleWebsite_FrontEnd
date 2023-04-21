import { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import InputComponent from "../../CommonComponents/InputComponent";
import cmClient from "../../clients/ContentManagementClient";
import { toast } from "react-toastify";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { displayErrors } from "../../utils/CommonUtils";

class TableRowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {}
        }

        this.saveRowData = this.saveRowData.bind(this);
        this.deleteRowData = this.deleteRowData.bind(this);
    }

    saveRowData(event) {

        const { containerPricingInfoId } = this.state.rowData;
        const { token, formData, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.rowData);
        rowDataCopy.roomType = _.get(formData, "roomType"+containerPricingInfoId);
        rowDataCopy.weekDaysWithBreakfastPrice = _.get(formData, "weekDaysWithBreakfastPrice"+containerPricingInfoId);
        rowDataCopy.weekDaysWithOutBreakfastPrice = _.get(formData, "weekDaysWithOutBreakfastPrice"+containerPricingInfoId);
        rowDataCopy.weekEndWithBreakfastPrice = _.get(formData, "weekEndWithBreakfastPrice"+containerPricingInfoId);
        rowDataCopy.weekEndWithOutBreakfastPrice = _.get(formData, "weekEndWithOutBreakfastPrice"+containerPricingInfoId);


        console.log("rowDataCopy======================>");
        console.log(JSON.stringify(rowDataCopy));
        console.log(rowDataCopy);
        //return;

        showPageLoader();
        cmClient.post('/content/save/container/pricing', rowDataCopy, {
            headers: {
                'Authorization': auth
            }
        })
            .then(response => {
                toast.success("Record saved successfully");
                console.log("Record saved successfully");
                console.log(response.data);
                this.props.loadData();
                hidePageLoader();
            })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });

    }

    deleteRowData(event) {
        const { token, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.rowData);
        rowDataCopy.contPricingisActive = 0;

        console.log("rowDataCopy======================>");
        console.log(JSON.stringify(rowDataCopy));
        console.log(rowDataCopy);
        //return;

        showPageLoader();
        cmClient.post('/content/save/container/pricing', rowDataCopy, {
            headers: {
                'Authorization': auth
            }
        })
            .then(response => {
                toast.error("Record deleted successfully");
                console.log("record deleted successfully");
                console.log(response.data);
                this.props.loadData();
                hidePageLoader();
            })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });
    }

    
    componentDidMount() {
        this.setState({ rowData: this.props.data});
    }


    render() {
        const {roomType, weekDaysWithBreakfastPrice, weekDaysWithOutBreakfastPrice, weekEndWithBreakfastPrice, weekEndWithOutBreakfastPrice, containerPricingInfoId} = this.props.data;
        
        let editable = this.props.editable;
        return (
            <tr >
                <td >{editable?<InputComponent id={"roomType"+containerPricingInfoId} value={roomType} noLabel="true"/>:<div className='tablecard'>{roomType}</div>}</td>
                <td >{editable?<InputComponent id={"weekDaysWithBreakfastPrice"+containerPricingInfoId} value={weekDaysWithBreakfastPrice} noLabel="true"/>:<div className='tablecard'>{weekDaysWithBreakfastPrice}</div>}</td>
                <td >{editable?<InputComponent id={"weekDaysWithOutBreakfastPrice"+containerPricingInfoId} value={weekDaysWithOutBreakfastPrice} noLabel="true"/>:<div className='tablecard'>{weekDaysWithOutBreakfastPrice}</div>}</td>
                <td >{editable?<InputComponent id={"weekEndWithBreakfastPrice"+containerPricingInfoId} value={weekEndWithBreakfastPrice} noLabel="true"/>:<div className='tablecard'>{weekEndWithBreakfastPrice}</div>}</td>
                <td >{editable?<InputComponent id={"weekEndWithOutBreakfastPrice"+containerPricingInfoId} value={weekEndWithOutBreakfastPrice} noLabel="true"/>:<div className='tablecard'>{weekEndWithOutBreakfastPrice}</div>}</td>
                {editable?<td ><i className="fa fa-fw fa-trash" onClick={this.deleteRowData}></i> <i className="fa fa-floppy-o" onClick={this.saveRowData}></i></td>:""}
            </tr>

        );
    }

}

const mapStateToPros = state => {
    return {
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

export default connect(mapStateToPros, mapDispatchToProps)(TableRowComponent);