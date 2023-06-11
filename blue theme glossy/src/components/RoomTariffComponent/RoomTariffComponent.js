import { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import cmClient from "../../clients/ContentManagementClient";
import _ from "lodash";
import { connect } from "react-redux";
import './RoomTariffComponent.css'
import TableRowComponent from "./TableRowComponent";
import InputComponent from "../../CommonComponents/InputComponent";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { toast } from "react-toastify";
import { displayErrors } from "../../utils/CommonUtils";
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";

class RoomTariffComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editable: false,
            show: false,
            showEditPage:true
        }
        this.loadData = this.loadData.bind(this);
        this.toggleTableEditable = this.toggleTableEditable.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSaveTableData = this.handleSaveTableData.bind(this);
        this.handleSaveHeaderData = this.handleSaveHeaderData.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    loadData() {

        const { id } = this.props;
        cmClient.get('/content/get/container/group-details/' + id)
            //.then(response => console.log(response))
            .then(response => {

                let responseData = response.data[0];
    
                this.setState({ data: responseData.containerPricingInfo , headerData: responseData})
            })
            .catch(error => console.log(error));

    }

    componentDidMount() {
        this.loadData();
    }

    toggleTableEditable() {
        this.setState({ editable: !this.state.editable });
    }

    handleShow() {
        this.setState({show:true});
    }

    handleClose() {
        this.setState({show:false});
    }

    handleSaveHeaderData = (event) => {
        const { formData, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        const { token } = this.props;
        const { headerData } = this.state;
        const auth = "Bearer " + token;

        let requestData = _.cloneDeep(headerData);

        //Lets delete extra info 
        delete requestData.containerImageInfo;
        delete requestData.containerPricingInfo;

        requestData.containerHeader = _.get(formData, headerData.pageContainerInfoId + "")
        requestData.containerTextInfo[0].containertextLabelValue = _.get(formData, headerData.containerTextInfo[0].containerTextInfoId);

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
                this.loadData();
                hidePageLoader();
                this.setState({showEditPage:false})
            })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });
    }

    handleSaveTableData() {

        const { token, formData, showPageLoader, hidePageLoader, showLoginModalDispatcher } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.data[0]);
        delete rowDataCopy.containerPricingInfoId;
        rowDataCopy.roomType = _.get(formData, "room_tariff_new_king_suite");
        rowDataCopy.weekDaysWithBreakfastPrice = _.get(formData, "week_days_with_breakfast_new_rate");
        rowDataCopy.weekDaysWithOutBreakfastPrice = _.get(formData, "week_days_without_breakfast_new_rate");
        rowDataCopy.weekEndWithBreakfastPrice = _.get(formData, "week_end_with_breakfast_new_rate");
        rowDataCopy.weekEndWithOutBreakfastPrice = _.get(formData, "week_end_without_breakfast_new_rate");


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
                toast.success("Record created successfully");
                console.log("record created successfully");
                console.log(response.data);
                this.loadData();
                this.toggleTableEditable();
                this.handleClose();
                hidePageLoader();
            })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });

    }

    render() {
        const { isAdmin } = this.props;
        let tableEditOption;
        let contentEditOption;
        if (isAdmin) {
            tableEditOption = <Button size="sm" onClick={this.toggleTableEditable}>
                <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
            </Button>;

            contentEditOption = <Button size="sm" onClick={this.toggleTableEditable}>
            <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
        </Button>;
        }

        let { editable, show, data, headerData } = this.state;
        editable = editable && isAdmin;

        const containerHeader = headerData &&  headerData.containerHeader;
        const containertextLabelValue = headerData && headerData.containerTextInfo[0].containertextLabelValue;
        

        return (
            <section id="pricing" className="pricing section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        {/* <h2>{isAdmin ? contentEditOption : ""}Room Tariff</h2> */}
                        <h2 style={{color:'#fff'}}>{isAdmin && headerData ? <ContainerEditComponent showEditPage={ this.state.showEditPage} data={headerData} handleSave={this.handleSaveHeaderData} /> : ""}{containerHeader}</h2>
                

                    </div>
                    <div className="tableHolder">
                    <div >{isAdmin ? tableEditOption : ""}</div>
                    <Table striped bordered hover>
                        
                        <thead>
                            <tr className="tableHeader">
                                <td rowSpan="2" className="valign-middle fw-bold"> Suite</td>
                                <td colSpan="2" className="valign-middle fw-bold">Week Days </td>
                                <td colSpan="2" className="valign-middle fw-bold">Week End</td>
                                
                                {editable ? <td rowSpan="2" className="valign-middle fw-bold">Delete/Save</td> : ""}
                            </tr>
                            <tr className="tableHeader">
                                <td className="valign-middle fw-bold"> With Breakfast</td>
                                <td className="valign-middle fw-bold">Without Breakfast</td>
                                <td className="valign-middle fw-bold">With Breakfast</td>
                                <td className="valign-middle fw-bold">Without Breakfast</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(this.state.data, (row, index) => <TableRowComponent  data={row} editable={editable} key={index} loadData={this.loadData} />)
                            }
                            {/* <tr aria-colSpan={4}></tr> */}
                        </tbody>

                    </Table>
                    
                    </div>
                    <p className="price-table-bottom-text">{containertextLabelValue}</p>
                    {editable ? <Button type="text" onClick={this.handleShow}>Add Row</Button> : ""}
                    
                    <Modal size="md" show={show} onHide={this.handleClose}>
                        <Modal.Header className="modalHeader text-white" closeButton>
                            <Modal.Title>Editor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputComponent label="Suite" id="room_tariff_new_king_suite" />
                            <InputComponent label="Week Days With Breakfast" id="week_days_with_breakfast_new_rate" />
                            <InputComponent label="Week Days Without Breakfast" id="week_days_without_breakfast_new_rate" />
                            <InputComponent label="Week End With Breakfast" id="week_end_with_breakfast_new_rate" />
                            <InputComponent label="Week End Without Breakfast" id="week_end_without_breakfast_new_rate" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" onClick={this.handleSaveTableData}>Save</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>

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

export default connect(mapStateToPros, mapDispatchToProps)(RoomTariffComponent);