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
import { Button, Modal } from "react-bootstrap";
import ImageGalleryComponent from "../../CommonComponents/ImageGalleryComponent/ImageGalleryComponent";
import  CarouselCardComponent  from "../CarouselComponent/CarouselCardComponent";
import FileUploadComponent from "../../CommonComponents/FileUploadComponent/FileUploadComponent";
import './GallerySwiperstyle.css'

class GallerySwiperDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            options:[],
            showGallery:false,
            show: false,
            showUpload: false
        }
        this.createSlide = this.createSlide.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.handleShowUpload = this.handleShowUpload.bind(this);
        this.handleCloseUpload = this.handleCloseUpload.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    handleShowUpload() {
        this.handleClose();
        this.setState({ showUpload: true });
    }

    handleCloseUpload() {

        this.setState({ showUpload: false });
        this.handleShow();
    }

    deleteImage(fileId) {
        const { token, showPageLoader, hidePageLoader, showLoginModalDispatcher} = this.props;
        const auth = "Bearer " + token;
        const isOk = window.confirm('Are you sure to delete this image?');
        if(isOk) {
            showPageLoader();
            cmClient.post('/image/delete/' + fileId,{},{
                headers: {
                    'Authorization': auth
                }
            })
                .then(response => {
                    toast.success("Image deleted Successfully.")
                    this.props.loadData();
                    hidePageLoader();

                })
                .catch(error => {
                    console.log(error);
                    hidePageLoader();
                    //toast.error(error.response.data.errorMessage);
                    displayErrors(error, showLoginModalDispatcher.bind({},true));
                });
        }
    }

    uploadImage(formData) {
        const { token , showPageLoader, hidePageLoader, showLoginModalDispatcher} = this.props;
        const auth = "Bearer " + token;
        showPageLoader();
        cmClient.post('/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=',
                'Authorization': auth
            }
        })
            .then(response => {
                toast.success("Image Uploaded Successfully.");
                this.fetchImages();
                hidePageLoader();
                this.setState({showUpload:false})
            })
            .catch(error => {console.log(error);
                hidePageLoader();
                //toast.error(error.response.data.errorMessage);
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
        images.push(slide.imageInfo.imageURL);
        return <div key={slide.containerImageInfoId} className="swiper-slide mb-2">

        <Card className="mx-auto my-3 text-white mb-2 rounded">
            {/* <Card.Header  className="cardHeader">
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
            </Card.Header> */}
            <Card.Img variant="top"  src={slide.imageInfo.imageURL}  onClick={this.swiperClicked}/>
            {/* <Card.Body>
                 <Card.Text className="cardDescription">
                         <div>
                                
                                   {slide.containerTextInfo[0].containerTextLabelName +":"+slide.containerTextInfo[0].containertextLabelValue} <br></br>
                                   {slide.containerTextInfo[1].containertextLabelValue}
                                
                            </div>
                </Card.Text> 
            </Card.Body> */}
            {isAdmin?
            <Card.Footer className="cardFooter">
                <small className="text-white">{"Updated Date: " + slide.updatedDate}</small>
            </Card.Footer>
            :""}
            </Card>
            
            </div>;
                
    }

    createSlide1(slide, images) {
        const { isAdmin } = this.props;
        images.push(slide.containerImageInfo[0].imageInfo.imageURL);
        return <div key={slide.containerDivId} className="swiper-slide mb-2">

        <Card className="mx-auto my-3 text-white mb-2 rounded">
            {/* <Card.Header  className="cardHeader">
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
            </Card.Header> */}
            <Card.Img variant="top"  src={slide.containerImageInfo[0].imageInfo.imageURL}  onClick={this.swiperClicked}/>
            {/* <Card.Body>
                 <Card.Text className="cardDescription">
                         <div>
                                
                                   {slide.containerTextInfo[0].containerTextLabelName +":"+slide.containerTextInfo[0].containertextLabelValue} <br></br>
                                   {slide.containerTextInfo[1].containertextLabelValue}
                                
                            </div>
                </Card.Text> 
            </Card.Body> */}
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
                slidesPerView: 3,
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
        const { data, isAdmin } = this.props;
        let images = [];

        let activeImages = _.filter(data, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        let noOfImages = activeImages.length;
        
        return (
            <>
            {/* <p>{
                    isAdmin ?

                        <Button variant="primary" size="sm" className=" " onClick={this.handleShow}>
                            <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>

                        </Button>

                        : ""
                }</p> */}
            <div className="testimonials-slider swiper img_carousal_pad" data-aos="fade-up" data-aos-delay="100">
                
                <Modal show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header className="modalHeader text-white" closeButton>
                        <Modal.Title >Image Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {noOfImages === 0 ? "Images not added yet, please add images." : ""}
                        <div >
                            {
                                activeImages.map(image =>
                                    <CarouselCardComponent key={image.imageInfo.imageInfoId}
                                        id={image.imageInfo.imageInfoId}
                                        name={image.imageInfo.imageName}
                                        thumbnailURL={image.imageInfo.thumbnailURL}
                                        description={image.imageInfo.imageDescription}
                                        updatedDate={image.imageInfo.updatedDate}
                                        deleteImage={this.deleteImage} />
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button className="btn_orange" type="text" onClick={this.handleShowUpload}>Add Image</Button>

                    </Modal.Footer>
                </Modal>
                <FileUploadComponent 
                    show={this.state.showUpload} 
                    uploadImage={this.uploadImage} 
                    handleShowUpload={this.handleShowUpload} 
                    handleCloseUpload={this.handleCloseUpload} 
                    id={this.props.id} 
                    imageType={this.props.imageType} />
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
            </>
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

export default connect(mapStateToPros, mapDispatchToProps)(GallerySwiperDetailsComponent);
