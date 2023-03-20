import { Component } from "react";
import _ from "lodash";
import cmClient from "../../clients/ContentManagementClient";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { connect } from "react-redux";
import xtype from 'xtypejs'

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
            .then(response => this.setState({ data: response.data , isLoading:true}))
            .catch(error => console.log(error));

    }

    componentDidMount() {
        console.log('Inside did mount');
        this.loadData();
    }

 
    
    render() {
        const  data1  = _.slice(this.state.data,0,1)[0];
        const containerHeader = ""
        const dataObject =({data1}) => {
             containerHeader =  data1.containerHeader;
        }
        console.log(containerHeader)
       // const myObject = JSON.parse(data1);
      //  const containerHeader = myObject?.containerHeader;

       // console.log(data1.containerHeader);
      //  const containertextLabelValue = data1.containerTextInfo[0].containertextLabelValue;
       /* const isLoading = this.state.isLoading;
        const { isAdmin } = this.props;
      
       
*/
       

        return (
            ""
         /*   isLoading?<SpinnerComponent/>:
                <section id="who-we-are" className="pricing section-bg">
                <div className="container" data-aos="fade-up">
                <h2>{isAdmin ? <ContainerEditComponent showEditPage={ this.state.showEditPage} data={headerObject} handleSave={this.handleSave} /> : ""}{containerHeader}</h2>
                <p>{containertextLabelValue}</p>
                </div>
                </section>
          */
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