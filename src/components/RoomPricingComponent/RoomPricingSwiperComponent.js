import { Component } from "react";
import _ from "lodash";
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import { connect } from "react-redux";
import axios from "axios";

class RoomPricingSwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            options:[]
        }
        this.createSlide = this.createSlide.bind(this);
    }

    handleSave = (data)=>{
        const {formData} = this.props;
        const {token} = this.props;
        const auth = "Bearer "+token;

        let requestData = _.cloneDeep(data);
        requestData.containerHeader=_.get(formData, data.pageContainerInfoId+"")
        //requestData.containerTextInfo[0].containertextLabelValue=_.get(formData, data.containerTextInfo[0].containerTextInfoId+"");
        _.forEach(requestData.containerTextInfo, (containerTextInfoItem)=>{
            containerTextInfoItem.containertextLabelValue = _.get(formData, containerTextInfoItem.containerTextInfoId+"");
        });

        _.forEach(requestData.containerImageInfo, (containerImageInfoItem)=>{
             let containerImageInfoId = _.get(formData, containerImageInfoItem.containerImageInfoId+"");
             let options = this.state.options;
             let selectedImageInfo = _.filter(options, (option)=>{return option.imageInfoId == containerImageInfoId})
             containerImageInfoItem.imageInfo=selectedImageInfo[0];
        });

        console.log("requestData======================>");
        console.log(JSON.stringify(requestData));
        console.log(requestData);
        //return;

        axios.post('http://localhost:8080/content/save/container', requestData, {
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

    createSlide(slide) {
        const { isAdmin } = this.props;
        return <div key={slide.containerDivId} className="swiper-slide">
        <div className="box">
            <h3>{slide.containerHeader}{isAdmin?<ContainerEditComponent data={slide}  handleSave={this.handleSave} fetchOptions={this.fetchOptions}/>:""}</h3>
            <img src={slide.containerImageInfo[0].imageInfo.imageURL}/>
            <div>
                <ul>
                    <li>{slide.containerTextInfo[0].containerTextLabelName +":"+slide.containerTextInfo[0].containertextLabelValue}</li>
                    <li>{slide.containerTextInfo[1].containertextLabelValue}</li>
                </ul>
            </div>
            {/* <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
            </div> */}
        </div>
    </div>;
    }

    componentDidMount(){
        new Swiper('.testimonials-slider', {
            modules: [Navigation, Pagination, Scrollbar],
            speed: 600,
            loop: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 40
              },
        
              1200: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }
          });

          axios.get('http://localhost:8080/content/get/image/list/SUITSANDROOMS')
          //.then(response => console.log(response))
          .then(response => this.setState({ options: response.data}))
          .catch(error => console.log(error));
    }

    fetchOptions = ()=>{
        return this.state.options;
    }

    render() {
        const { data } = this.props;
        
        return (
            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-wrapper">
                {
                    _.map(data, (dataObj)=>{
                        return this.createSlide(dataObj);
                    })
                }
                    

                </div>
                <div className="swiper-pagination"></div>
            </div>
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
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
    }
};

export default connect(mapStateToPros, undefined)(RoomPricingSwiperComponent);
