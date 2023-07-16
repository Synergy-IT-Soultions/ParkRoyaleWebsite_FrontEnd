import { Component } from "react";
import _ from "lodash";
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";
import cmClient from "../../clients/ContentManagementClient";
import GallerySwiperHeaderComponent from "./GallerySwiperHeaderComponent";
import GallerySwiperDetailsComponent from "./GallerySwiperDetailsComponent";

class GallerySwiperComponent extends Component {
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
        const {imageType} = this.props;

        const headerObject = _.cloneDeep(this.state.data);
        delete headerObject.containerImageInfo;

        let swiperCards = _.cloneDeep(this.state.data.containerImageInfo);
        swiperCards = _.filter(swiperCards, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        return (
            isLoading?<SpinnerComponent/>:
                <section id="pricing" className="pricing">
                <div className="container" data-aos="fade-up">
                <GallerySwiperHeaderComponent id={this.props.id} data={headerObject} loadData={this.loadData}/>
                <GallerySwiperDetailsComponent id={this.props.id} data={swiperCards} loadData={this.loadData} imageType={imageType}/>
                </div>
                </section>
        
        );
    }
}

export default GallerySwiperComponent;