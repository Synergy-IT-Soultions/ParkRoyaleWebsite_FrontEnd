import { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import InputComponent from "../../CommonComponents/InputComponent";
import cmClient from "../../clients/ContentManagementClient";

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
        const { token, formData } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.rowData);
        rowDataCopy.roomType = _.get(formData, "roomType"+containerPricingInfoId);
        rowDataCopy.roomPrice = _.get(formData, "roomPrice"+containerPricingInfoId);

        console.log("rowDataCopy======================>");
        console.log(JSON.stringify(rowDataCopy));
        console.log(rowDataCopy);
        //return;

        cmClient.post('/content/save/container/pricing', rowDataCopy, {
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

    deleteRowData(event) {
        const { token } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.rowData);
        rowDataCopy.contPricingisActive = 0;

        console.log("rowDataCopy======================>");
        console.log(JSON.stringify(rowDataCopy));
        console.log(rowDataCopy);
        //return;

        cmClient.post('/content/save/container/pricing', rowDataCopy, {
            headers: {
                'Authorization': auth
            }
        })
            .then(response => {
                console.log("record deleted successfully");
                console.log(response.data);
                this.props.loadData();
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.setState({ rowData: this.props.data});
    }

    render() {
        const {roomType, roomPrice, gstPercentage, gstCalculatedPrice, totalPrice, containerPricingInfoId} = this.state.rowData;
        let editable = this.props.editable;
        return (
            <tr>
                <td>{editable?<InputComponent id={"roomType"+containerPricingInfoId} value={roomType} noLabel="true"/>:roomType}</td>
                <td>{editable?<InputComponent id={"roomPrice"+containerPricingInfoId} value={roomPrice} noLabel="true"/>:roomPrice}</td>
                {/* <td>{gstPercentage}</td> */}
                <td>{gstCalculatedPrice}</td>
                <td>{totalPrice}</td>
                {editable?<td><i class="fa fa-fw fa-trash" onClick={this.deleteRowData}></i> <i class="fa fa-floppy-o" onClick={this.saveRowData}></i></td>:""}
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
        
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(TableRowComponent);