import { Component } from "react";
import { Button, Table } from "react-bootstrap";
import cmClient from "../../clients/ContentManagementClient";
import _ from "lodash";
import { connect } from "react-redux";

class TableRowComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {}
        }
    }

    componentDidMount() {
        this.setState({ rowData: this.props.data});
    }

    render() {
        const {roomType, roomPrice, gstPercentage, gstCalculatedPrice, totalPrice} = this.state.rowData;
        let editable = this.props.editable;
        return (
            <tr>
                <td>{roomType}</td>
                <td>{roomPrice}</td>
                {/* <td>{gstPercentage}</td> */}
                <td>{gstCalculatedPrice}</td>
                <td>{totalPrice}</td>
                {editable?<td><i class="fa fa-fw fa-trash"></i> <i class="fa fa-floppy-o"></i></td>:""}
            </tr>

        );
    }

}

class RoomTariffComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            editable:false
        }
        this.loadData = this.loadData.bind(this);
        this.makeTableEditable = this.makeTableEditable.bind(this);
    }

    loadData() {

        const {id} = this.props;
        cmClient.get('/content/get/container/pricing/'+id)
            //.then(response => console.log(response))
            .then(response => this.setState({ data: response.data}))
            .catch(error => console.log(error));

    }

    componentDidMount() {
        this.loadData();
    }

    makeTableEditable() {
        this.setState({editable:true});
    }

    render() {
        const {isAdmin} = this.props;
        let editOption;
        if(isAdmin){
            editOption = <Button  size="sm" onClick={this.makeTableEditable}>
                            <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                        </Button>;
        }

        let isEditable = this.state.editable;

        return (
            <section id="pricing" className="pricing section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Room Tariff{isAdmin?editOption:""}</h2>
                        
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>King Suite</th>
                                <th>Rate</th>
                                <th>GST @ 18%</th>
                                <th>Total</th>
                                {isEditable?<th>Delete/Save</th>:""}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.map(this.state.data, (row)=><TableRowComponent data={row} editable={this.state.editable}/>)
                            }
                        </tbody>
                    </Table>
                </div>
            </section>

        );
    }
}

const mapStateToPros = state => {
    return {
        // isAdmin: _.isEqual(state?.userInfo?.role, "Admin"),
        isAdmin:true,
        token: state.userInfo.token,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(RoomTariffComponent);