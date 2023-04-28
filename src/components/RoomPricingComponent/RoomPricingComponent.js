import { Component } from "react";
import RoomPricingHeaderComponent from "./RoomPricingHeaderComponent";
import RoomPricingSwiperComponent from "./RoomPricingSwiperComponent";
import _ from "lodash";
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";
import cmClient from "../../clients/ContentManagementClient";

class RoomPricingComponent extends Component {
    constructor(props) {
        super(props);
        this.state={data:[],isLoading:true}
        this.loadData = this.loadData.bind(this);
    }

    loadData() {

        const {id} = this.props;
        
        // cmClient.get('/content/get/container/group-details/'+id)
        //     //.then(response => console.log(response))
        //     .then(response => this.setState({ data: response.data , isLoading:false}))
        //     .catch(error => console.log(error));

        cmClient.get('/content/get/container/details/'+id)
            //.then(response => console.log(response))
            .then(response => this.setState({ data: response.data , isLoading:false}))
            .catch(error => console.log(error));

    }

    componentDidMount() {
        this.loadData();
    }
    
    render() {
        const isLoading = this.state.isLoading;
        // const headerObject = _.slice(this.state.data,0,1)[0];
        // const swiperCards = _.slice(this.state.data,1);

        const headerObject = _.cloneDeep(this.state.data);
        delete headerObject.containerImageInfo;

        let swiperCards = _.cloneDeep(this.state.data.containerImageInfo);
        swiperCards = _.filter(swiperCards, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });


        //let imageType = _.get(swiperCards[0], "containerImageInfo[0].imageInfo.imageType");
        let imageType = swiperCards && _.get(swiperCards[0], "imageInfo.imageType");

        return (
            isLoading?<SpinnerComponent/>:
                <section id="pricing" className="pricing section-bg">
                <div className="container" data-aos="fade-up">
                <RoomPricingHeaderComponent id={this.props.id} data={headerObject} loadData={this.loadData}/>
                <RoomPricingSwiperComponent id={this.props.id} data={swiperCards} loadData={this.loadData} imageType={imageType}/>
                </div>
                </section>
        
        );
    }
}

export default RoomPricingComponent;