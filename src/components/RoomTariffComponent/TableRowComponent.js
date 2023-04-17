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
        this.reCalculateTotalPrice = this.reCalculateTotalPrice.bind(this);
    }

    saveRowData(event) {

        const { containerPricingInfoId } = this.state.rowData;
        const { token, formData, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.rowData);
        rowDataCopy.roomType = _.get(formData, "roomType"+containerPricingInfoId);
        rowDataCopy.roomPrice = _.get(formData, "roomPrice"+containerPricingInfoId);

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

    static getDerivedStateFromProps(props, state) {
        const { formData } = props;
        const { containerPricingInfoId, roomPrice, gstPercentage } = state.rowData;
        let newGstPercentage = _.get(formData, "gstPercentage"+containerPricingInfoId);
        let newRoomPrice = _.get(formData, "roomPrice"+containerPricingInfoId);
        if(_.isEqual(roomPrice, newRoomPrice) && _.isEqual(gstPercentage, newGstPercentage)) return null;
        if(_.isNil(newRoomPrice) || _.isNil(newGstPercentage)) return null;


        newGstPercentage = parseInt(newGstPercentage);
        newRoomPrice = parseInt(newRoomPrice);

        if(isNaN(newGstPercentage) || isNaN(newRoomPrice)) return null;

        let newGST, newTotal;
        newGST = _.multiply(newGstPercentage, _.divide(newRoomPrice, 100));
        newTotal = _.add(newRoomPrice, newGST);
        return {
            rowData:{...state.rowData,gstPercentage:newGstPercentage,
                totalPrice:newTotal,
                roomPrice:newRoomPrice,
                gstCalculatedPrice:newGST}
            

        };


        // if (props.currentRow !== state.lastRow) {
        //   return {
        //     isScrollingDown: props.currentRow > state.lastRow,
        //     lastRow: props.currentRow,
        //   };
        // }
    
        // // Return null to indicate no change to state.
        // return null;
      }

    componentDidUpdate(prevProps, prevState){

        // const { formData } = this.props;
        // const { containerPricingInfoId, roomPrice, gstPercentage } = this.state.rowData;
        // let newGstPercentage = _.get(formData, "gstPercentage"+containerPricingInfoId);
        // let newRoomPrice = _.get(formData, "roomType"+containerPricingInfoId);
        // if(_.isEqual(roomPrice, newRoomPrice) && _.isEqual(gstPercentage, newGstPercentage)) return;

        // let newGST, newTotal;
        // newGST = _.multiply(newGstPercentage, _.divide(newRoomPrice, 100));
        // newTotal = _.add(newRoomPrice, newGST);
        // this.setState({
        //     gstPercentage:newGST,
        //     totalPrice:newTotal,
        //     roomPrice:newRoomPrice,

        // });



    }

    reCalculateTotalPrice() {

    }

    componentDidMount() {
        this.setState({ rowData: this.props.data});
    }

    render() {
        const {roomType, roomPrice, gstPercentage, gstCalculatedPrice, totalPrice, containerPricingInfoId} = this.props.data;
        
        let editable = this.props.editable;
        return (
            <tr >
                <td >{editable?<InputComponent id={"roomType"+containerPricingInfoId} value={roomType} noLabel="true"/>:<div className='tablecard'>{roomType}</div>}</td>
                <td >{editable?<InputComponent id={"roomPrice"+containerPricingInfoId} value={roomPrice} noLabel="true"/>:<div className='tablecard'>{roomPrice}</div>}</td>
                <td >{editable?<InputComponent id={"gstPercentage"+containerPricingInfoId} value={gstPercentage} noLabel="true"/>:<div className='tablecard'>{gstPercentage}</div>}</td>
                <td >{editable?this.state.rowData.gstCalculatedPrice:<div className='tablecard'>{gstCalculatedPrice}</div>}</td>
                <td  >{editable?this.state.rowData.totalPrice:<div className='tablecard'>{totalPrice}</div>}</td>
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