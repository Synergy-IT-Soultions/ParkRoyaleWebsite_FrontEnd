import { Component } from "react";
import _ from "lodash";
import cmClient from "../../clients/ContentManagementClient";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { connect } from "react-redux";
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import xtype from 'xtypejs'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";

class WhoWeAreComponent extends Component {
    constructor(props) {
        super(props);
        this.state={data:[],isLoading:true}
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        console.log('Inside load data');
        const {id} = this.props;
        cmClient.get('/content/get/container/group-details/'+id)
           // .then(response => console.log(response))
            .then(response => this.setState({ data: response.data , isLoading:false}))
            .catch(error => console.log(error));
    }

    componentDidMount() {
        console.log('Inside did mount');
        this.loadData();
    }

    handleSave = (data)=>{
        console.log(this.props);
        const {  formData, showPageLoader, hidePageLoader } = this.props;
        const { token } = this.props;
        const auth = "Bearer " + token;

        let requestData = _.cloneDeep(data);
        console.log(data);

        requestData.containerHeader = _.get(formData, data.pageContainerInfoId + "")
        requestData.containerTextInfo[0].containertextLabelValue = _.get(formData, data.containerTextInfo[0].containerTextInfoId);
        requestData.containerTextInfo[1].containertextLabelValue = _.get(formData, data.containerTextInfo[1].containerTextInfoId);

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
                toast.error(error.response.data.errorMessage);
            });
    }
    
    render() {
        const { isAdmin } = this.props;
        const  data  = _.slice(this.state.data,0,1)[0];
        const isLoading = this.state.isLoading;
        const containerHeader = data && data.containerHeader;
        const containertextLabelValue = data && data.containerTextInfo[0].containertextLabelValue;
        const containerVideoURL = data && data.containerTextInfo[1].containertextLabelValue;
    
        return (
            
            isLoading?<SpinnerComponent/>:
                <section id="who-we-are" className="pricing section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                         <h2>{isAdmin ? <ContainerEditComponent showEditPage={ this.state.showEditPage} data={data} handleSave={this.handleSave} /> : ""}{containerHeader}</h2>
                    </div>
                <div class="d-flex">
                <Card className="mx-auto my-3 text-white mb-2 rounded">
                    <Card.Body>
                        <Row lg={2}>  
                            <Col className="d-flex">
                            <iframe width="100%" height="100%" src={containerVideoURL} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </Col>
                            <Col className="d-flex">
                                    <p align="left">{containertextLabelValue}</p>
                            </Col>
                        </Row>            
                    </Card.Body>
                </Card>
                </div>
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

export default connect(mapStateToPros, mapDispatchToProps) (WhoWeAreComponent);