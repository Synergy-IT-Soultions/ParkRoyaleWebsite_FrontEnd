import React from "react";
import { Component } from "react";
import _ from "lodash";
import  cmClient  from "../../clients/ContentManagementClient";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { connect } from "react-redux";
import  SpinnerComponent  from "../../CommonComponents/SpinnerComponent/SpinnerComponent";
import  ContainerEditComponent  from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import Card from 'react-bootstrap/Card';
import { toast } from "react-toastify";
import {decode} from 'html-entities';
import { displayErrors } from "../../utils/CommonUtils";

 class OverviewEditContainer extends Component {
    
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

        data?.containerTextInfo.map((containerTextInfo,index) => {
            requestData.containerTextInfo[index].containertextLabelValue = _.get(formData, data.containerTextInfo[index].containerTextInfoId);
          });

       
       // requestData.containerTextInfo[1].containertextLabelValue = _.get(formData, data.containerTextInfo[1].containerTextInfoId);

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
                displayErrors(error);
            });
    }
    
    render() {
        const { isAdmin } = this.props;
        const  data  = _.slice(this.state.data,0,1)[0];
        const isLoading = this.state.isLoading;
        const containerHeader = data && data.containerHeader;
        
        const displayData = data?.containerTextInfo.map((containerTextInfo) => {
            return (
             <tr >
                 <td className="tableCol" > <div class='tablecard'> {containerTextInfo?.containerTextLabelName}: </div> </td>
                 <td className="tableCol" > <div class='tablecard' > {decode(containerTextInfo?.containertextLabelValue)}</div></td>
              </tr>
            );
          });
    
        return (
            
            isLoading?<SpinnerComponent/>:
              
                <Card className='tableHolder'>
                                   <Card.Header style={{ backgroundColor: '#5846f9', color:'white', fontWeight: 800 }} > 
                                   {isAdmin ? <ContainerEditComponent showEditPage={ this.state.showEditPage} data={data} handleSave={this.handleSave} /> : ""}{containerHeader }
                                   </Card.Header>
                                   <Card.Body >
                                        <table>
                                        {
                                           displayData
                                        }    
                                        </table>
                                   </Card.Body>
                              </Card>
              
          
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

export default  connect(mapStateToPros, mapDispatchToProps) (OverviewEditContainer);