import { Component } from "react";
import _ from "lodash";
import Swiper, { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import ContainerEditComponent from "../../CommonComponents/ContainerEditComponent/ContainerEditComponent";
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';
import cmClient from "../../clients/ContentManagementClient";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { toast } from "react-toastify";
import { displayErrors } from "../../utils/CommonUtils";
import { Modal } from "react-bootstrap";
import ImageGalleryComponent from "../../CommonComponents/ImageGalleryComponent/ImageGalleryComponent";

class RoomPricingSwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            options:[],
            showGallery:false
        }
        this.createSlide = this.createSlide.bind(this);
    }

    handleSave = (data)=>{
        const {formData, showPageLoader, hidePageLoader, showLoginModalDispatcher} = this.props;
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

        showPageLoader();
        cmClient.post('/content/save/container', requestData, {
            headers: {
              'Authorization': auth
            }
          })
          .then(response => {
            toast.success("Record saved successfully")
            console.log("record saved successfully");
            console.log(response.data);
            this.props.loadData();
            hidePageLoader();
          })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });



    }

    createSlide(slide, images) {
        const { isAdmin } = this.props;
        images.push(slide.containerImageInfo[0].imageInfo.imageURL);
        return <div key={slide.containerDivId} className="swiper-slide mb-2">

        <Card className="mx-auto my-3 text-white mb-2 rounded">
            <Card.Header  className="cardHeader">
            <div className="d-flex" >

                    <div className="text">
                        { 
                           isAdmin ? 
                                        <ContainerEditComponent data={slide}  handleSave={this.handleSave} fetchOptions={this.fetchOptions}/>
                                   : ""
                        }
                        {slide.containerHeader}
                    </div>
                    
            </div>
            </Card.Header>
            <Card.Img variant="top"  src={slide.containerImageInfo[0].imageInfo.imageURL}  onClick={this.swiperClicked}/>
            <Card.Body>
                <Card.Text className="cardDescription">
                         <div>
                                
                                   {slide.containerTextInfo[0].containerTextLabelName +":"+slide.containerTextInfo[0].containertextLabelValue} <br></br>
                                   {slide.containerTextInfo[1].containertextLabelValue}
                                
                            </div>
                </Card.Text>
            </Card.Body>
            {isAdmin?
            <Card.Footer className="cardFooter">
                <small className="text-white">{"Updated Date: " + slide.updatedDate}</small>
            </Card.Footer>
            :""}
            </Card>
            
            </div>;
                
    }

    componentDidMount(){
        new Swiper('.testimonials-slider', {
            modules: [Navigation, Pagination, Scrollbar, Autoplay],
            speed: 1000,
            centeredSlides: false,
            loop: true,//This will work only when total slides is equal to slidesPerView*2
            // freeMode: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
              stopOnLastSlide: false
            },
            slidesPerView: 'auto',
            // pagination: {
            //   el: '.swiper-pagination',
            //   type: 'bullets',
            //   clickable: true
            // },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 40
              },
        
              1200: {
                slidesPerView: 2,
                spaceBetween: 40
              }
            }
          });

          const {imageType} = this.props;
          cmClient.get('/content/get/image/list/'+imageType)
          //.then(response => console.log(response))
          .then(response => this.setState({ options: response.data}))
          .catch(error => console.log(error));
    }

    fetchOptions = ()=>{
        return this.state.options;
    }

    swiperClicked = ()=>{
        //alert("Hello");
        this.setState({showGallery:true})
    }

    render() {
        const { data } = this.props;
        let images = [];
        
        return (
            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-wrapper">
                {
                    _.map(data, (dataObj)=>{
                        return this.createSlide(dataObj, images);
                    })
                }
                    

                </div>
                <div className="swiper-pagination"></div>
                {/* <!-- If we need navigation buttons --> */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <Modal show={this.state.showGallery} fullscreen={true} onHide={() => this.setState({showGallery:false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Gallery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageGalleryComponent images={images}/>
                    </Modal.Body>
                </Modal>
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
        showPageLoader: () => showPageLoader(dispatch),
        hidePageLoader: () => hidePageLoader(dispatch),
        showLoginModalDispatcher: (value) => dispatch({ type: "SHOW_LOGIN", showLoginModal:value})
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(RoomPricingSwiperComponent);
