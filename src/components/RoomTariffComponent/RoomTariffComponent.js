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

class RoomTariffComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editable: false,
            show: false
        }
        this.loadData = this.loadData.bind(this);
        this.toggleTableEditable = this.toggleTableEditable.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlSave = this.handlSave.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    loadData() {

        const { id } = this.props;
        cmClient.get('/content/get/container/pricing/' + id)
            //.then(response => console.log(response))
            .then(response => this.setState({ data: response.data }))
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

    handlSave() {

        const { token, formData, showPageLoader, hidePageLoader } = this.props;
        const auth = "Bearer " + token;

        let rowDataCopy = _.cloneDeep(this.state.data[0]);
        delete rowDataCopy.containerPricingInfoId;
        rowDataCopy.roomType = _.get(formData, "room_tariff_new_king_suite");
        rowDataCopy.roomPrice = _.get(formData, "room_tariff_new_rate");

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
                toast.error(error.response.data.errorMessage);
            });

    }

    render() {
        const { isAdmin } = this.props;
        let editOption;
        if (isAdmin) {
            editOption = <Button size="sm" onClick={this.toggleTableEditable}>
                <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
            </Button>;
        }

        let { editable, show } = this.state;
        editable = editable && isAdmin;

        return (
            <section id="pricing" className="pricing section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>{isAdmin ? editOption : ""}Room Tariff</h2>

                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>King Suite</th>
                                <th>Rate</th>
                                <th>GST %</th>
                                <th>GST</th>
                                <th>Total</th>
                                {editable ? <th>Delete/Save</th> : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(this.state.data, (row) => <TableRowComponent data={row} editable={editable} loadData={this.loadData} />)
                            }
                            {/* <tr aria-colspan={4}></tr> */}
                        </tbody>

                    </Table>
                    
                    {editable ? <Button type="text" onClick={this.handleShow}>Add Row</Button> : ""}
                    
                    <Modal size="md" show={show} onHide={this.handleClose}>
                        <Modal.Header className="modalHeader text-white" closeButton>
                            <Modal.Title>Editor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputComponent label="King Suite" id="room_tariff_new_king_suite"/>
                            <InputComponent label="Rate" id="room_tariff_new_rate"/>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" onClick={this.handlSave}>Save</Button>
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
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(RoomTariffComponent);