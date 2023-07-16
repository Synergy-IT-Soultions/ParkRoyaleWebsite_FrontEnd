import { Component } from "react";
import _ from "lodash";
import FileUploadComponent from "../../CommonComponents/FileUploadComponent/FileUploadComponent";
import { Button, Card, Form, Modal } from "react-bootstrap";
import CarouselCardComponent from "../CarouselComponent/CarouselCardComponent";
import { connect } from "react-redux";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import cmClient from "../../clients/ContentManagementClient";
import { toast } from "react-toastify";
import { displayErrors } from "../../utils/CommonUtils";
import ImageGalleryComponent from "../../CommonComponents/ImageGalleryComponent/ImageGalleryComponent";

import './ImageGalleryComponent.css'
import CheckBoxComponent from "../../CommonComponents/CheckBoxComponent";

import galleryTabsAndNavBarMappings from './galleryTabsAndNavBarMappings.json'

class GalleryTabsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: props.images,
            filteredImages: props.images,
            show: false,
            isLoading: true,
            showUpload: false,
            showGallery:false,

            containerDivId: undefined,
            imageType: undefined
        }


    }

    setContainerDivIdAndImageType = (tabData)=>{
        let imageType, containerDivId;

        if(tabData.containerDivId){
            containerDivId = tabData.containerDivId;
        }

        if(!_.isEmpty(tabData.containerImageInfo)){
            //Derive dynamically from existing images
            imageType = tabData.containerImageInfo[0].imageInfo.imageType;
        }
        else{
            let containerDivIdAndImageTypeMappings = {};
            containerDivIdAndImageTypeMappings["gllry-sandr-cntnr-id"] = "ROOMS";
            containerDivIdAndImageTypeMappings["gllry-rest-cntnr-id"] = "RESTAURANT";
            containerDivIdAndImageTypeMappings["gllry-recr-cntnr-id"] = "RECREATION";
            containerDivIdAndImageTypeMappings["gllry-tandt-cntnr-id"] = "TOURS";


            imageType = containerDivIdAndImageTypeMappings[containerDivId];
        }

        
        this.setState({
            containerDivId,
            imageType
        });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleCloseUpload = () => {

        this.setState({ showUpload: false });
        this.handleShow();
    }

    handleShowUpload = () => {
        this.handleClose();
        this.setState({ showUpload: true });
    }

    deleteImage = (fileId) => {
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

    updateImageLinkage = (event) => {
        console.log("updateImageLinkage==>START");

        var selectedTabDivId = document.querySelector("#portfolio-flters li.filter-active").id;
        const toContainerDivId = galleryTabsAndNavBarMappings[selectedTabDivId];

        let userChecked = event.target.checked;
        let selectedImageInfoId = parseInt(event.target.id);

        let requestObject = {
            "fromContainerDivId": selectedTabDivId,
            "toContainerDivId": toContainerDivId,
            "imageInfoId": selectedImageInfoId,
            "isLinked": userChecked?1:0
        }

        
        console.log(requestObject);

        const { token , showPageLoader, hidePageLoader, showLoginModalDispatcher} = this.props;
        const auth = "Bearer " + token;

        showPageLoader();
        cmClient.post('/content/save/container/image/link', requestObject, {
            headers: {
                'Authorization': auth
            }
        })
            .then(response => {
                toast.success(userChecked?"Image Added to Swiper":"Image Removed from Swiper");
                console.log(userChecked?"Image Added to Swiper":"Image Removed from Swiper");
                console.log(response.data);
                this.props.loadData();
                hidePageLoader();
                //this.setState({showEditPage:false})
            })
            .catch(error => {
                console.log(error);
                hidePageLoader();
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });

        console.log("updateImageLinkage==>END");
    }

    uploadImage = (formData) => {
        const { token , showPageLoader, hidePageLoader, showLoginModalDispatcher} = this.props;
        const auth = "Bearer " + token;
        showPageLoader();
        //Incase below fields are missing, read from state
        if(_.isEmpty(formData.containerDivId) || _.isEmpty(formData.imageType)){
            formData.delete("containerDivId");
            formData.delete("imageType");
            formData.append("containerDivId", this.state.containerDivId)
            formData.append("imageType", this.state.imageType)
        }
        cmClient.post('/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=',
                'Authorization': auth
            }
        })
            .then(response => {
                toast.success("Image Uploaded Successfully.");
                this.props.loadData();
                hidePageLoader();
                this.setState({showUpload:false})
            })
            .catch(error => {console.log(error);
                hidePageLoader();
                //toast.error(error.response.data.errorMessage);
                displayErrors(error, showLoginModalDispatcher.bind({},true));
            });
    }

    componentDidUpdate(prevProps, prevState) {
        const { tabsData } = this.props;

        if(_.isEqual(prevProps.tabsData, tabsData)){
            return;
        }

        let portfolioFilters = this.select('#portfolio-flters li.filter-active', false);

        let filteredImages = [];
        _.forEach(tabsData, (tab) => {
            if (_.isEqual(tab.containerDivId, portfolioFilters.id)) {
                tab.containerImageInfo && _.forEach(tab.containerImageInfo, (item) => {
                    filteredImages.push(item);
                })

                //this.setContainerDivIdAndImageType(tab);
            }

        });

        filteredImages = _.filter(filteredImages, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        this.setState({ filteredImages });
    }

    componentDidMount() {

        console.log("===============");
        console.log(this.props.images);
        console.log("===============");

        let portfolioFilters = this.select('#portfolio-flters li', false);
        portfolioFilters.classList.add('filter-active');

        const { tabsData } = this.props;
        let filteredImages = [];
        _.forEach(tabsData, (tab) => {
            if (_.isEqual(tab.containerDivId, portfolioFilters.id)) {
                tab.containerImageInfo && _.forEach(tab.containerImageInfo, (item) => {
                    filteredImages.push(item);
                })

                this.setContainerDivIdAndImageType(tab);
            }

        });

        filteredImages = _.filter(filteredImages, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        this.setState({ filteredImages });


    }

    // shouldComponentUpdate(nextProps, nextState){

    // }

    createTab = (tab) => {
        return <li data-filter="*" id={tab.containerDivId} key={tab.containerDivId} onClick={this.tabClicked}>{tab.containerHeader}</li>;
    }

    tabClicked = (event) => {
        console.log(event);
        let portfolioFilters = this.select('#portfolio-flters li', true);
        portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
        });
        let ele = event.target;
        ele.classList.add("filter-active");

        let filteredImages = [];
        const { tabsData, images } = this.props;
        _.forEach(tabsData, (tab) => {
            if (_.isEmpty(event.target.id)) {//All Images
                filteredImages = images;
            } else if (_.isEqual(tab.containerDivId, event.target.id)) {
                tab.containerImageInfo && _.forEach(tab.containerImageInfo, (item) => {
                    filteredImages.push(item);
                })

                this.setContainerDivIdAndImageType(tab);
            }

        });

        filteredImages = _.filter(filteredImages, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        this.setState({ filteredImages });

    }

    select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    callOnSwitchClick = (event) => {
        console.log("callOnSwitchClick==>START");
        console.log(event);

        let userChecked = event.target.checked;

        console.log("callOnSwitchClick==>END");
    }

    createCard = (imageCard, images)=>{

        const { isAdmin } = this.props;
        images.push(imageCard.imageInfo.imageURL);

        let containerImageIsLinked = imageCard.containerImageIsLinked?(imageCard.containerImageIsLinked==0?false:true):false;
        const checkBoxLabel = containerImageIsLinked? "Remove from Swiper":"Add to Swiper";

        return <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={imageCard.imageInfo.imageInfoId}>
            <div className="zoom-on-hover">
                <Card className="box-img text-white">
                    <Card.Img variant="top" src={imageCard.imageInfo.thumbnailURL} onClick={this.swiperClicked}/>

                    {isAdmin ?
                        <Card.Footer className="cardFooter">
                            <CheckBoxComponent label={checkBoxLabel} 
                                id={imageCard.imageInfo.imageInfoId+""} 
                                value={containerImageIsLinked}
                                performAction={this.updateImageLinkage}/>
                            {/* <Form.Check
                                type="switch"
                                id={}
                                label={checkBoxLabel}
                                onClick={this.callOnSwitchClick}
                                checked={containerImageIsLinked}
                            /> */}
                            {/* <small className="text-white">{"Updated Date: " + slide.updatedDate}</small> */}
                        </Card.Footer>
                        : ""}
                </Card>
            </div>
        </div>;
            
    }

    createCard1 = (imageCard, images) => {

        images.push(imageCard.imageInfo.imageURL);

        return <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={imageCard.imageInfo.imageInfoId}>
            <div className="">{/**portfolio-wrap */}
                <img src={imageCard.imageInfo.thumbnailURL} className="img-fluid show-zoomin" alt=""  onClick={this.swiperClicked}/>
                {/* <div className="portfolio-info">
                    <h4>App 1</h4>
                    <p>App</p>
                </div> */}
                {/* <div className="portfolio-links">
                    <a href={imageCard.imageInfo.imageURL} data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 1"><i className="bx bx-plus"></i></a>
                    <a><i className="bx bx-plus" onClick={this.swiperClicked}></i></a>
                    
                    <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a>
                </div> */}
            </div>
        </div>;
    }

    swiperClicked = ()=>{
        //alert("Hello");
        this.setState({showGallery:true})
    }

    showEditForImages = () => {
        const { isAdmin } = this.props;
        let activeImages = this.state.filteredImages;
        let noOfImages = activeImages.length;
        return <>
            {
                isAdmin ?

                    <Button variant="primary" size="sm" className="over-parent btn_edit" onClick={this.handleShow}>
                        <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>

                    </Button>

                    : ""
            }
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

                    <Button className="btn_orange" type="text" onClick={this.handleShowUpload}><i class="fa fa-plus pe-2"></i>Add Image</Button>

                </Modal.Footer>
            </Modal>

            <FileUploadComponent
                show={this.state.showUpload}
                uploadImage={this.uploadImage}
                handleShowUpload={this.handleShowUpload}
                handleCloseUpload={this.handleCloseUpload}
                id={this.state.containerDivId}
                imageType={this.state.imageType} />
        </>
    }



    render() {
        const { tabsData } = this.props;
        const { filteredImages } = this.state;
        let images = [];
        // let images = [];
        // _.forEach(tabsData, (tab)=>{
        //     tab.containerImageInfo && _.forEach(tab.containerImageInfo, (item)=>{
        //         images.push(item);
        //     })
        // })

        // images = _.filter(images, (item) => {
        //      return _.isEqual(item.imageInfo.imageIsActive, 1);
        // });

        return (
            <>
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                    <div>{this.showEditForImages()}</div>
                        <ul id="portfolio-flters">
                            {/* <li data-filter="*" className="filter-active" id="sandr-room-gallery-id" onClick={this.loadData}>Suits and Rooms</li>
                            <li data-filter=".filter-app" id="rest-gallery-id" onClick={this.loadData}>Restaurants</li>
                            <li data-filter=".filter-card" id="rec-gallery-id" onClick={this.loadData}>Recreations</li>
                            <li data-filter=".filter-web" id="tandt-gallery-id" onClick={this.loadData}>Tours and Travels</li> */}
                            
                            {/* <li className="filter-active" onClick={this.tabClicked}>All</li> */}
                            {
                                tabsData.map(tab =>
                                    this.createTab(tab)
                                )
                            }
                        </ul>
                    </div>
                </div>
                
                <div className="row portfolio-container">

                    {
                        filteredImages.map(image =>
                            this.createCard(image, images)
                        )
                    }

                </div>

                <Modal show={this.state.showGallery} fullscreen={true} onHide={() => this.setState({showGallery:false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Gallery</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageGalleryComponent images={images}/>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapStateToPros = state => {
    return {
        isAdmin: _.isEqual(state?.userInfo?.role, "Admin"),
        token: state.userInfo.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showPageLoader: () => showPageLoader(dispatch),
        hidePageLoader: () => hidePageLoader(dispatch),
        showLoginModalDispatcher: (value) => dispatch({ type: "SHOW_LOGIN", showLoginModal:value})
    }
};



export default connect(mapStateToPros, mapDispatchToProps)(GalleryTabsComponent);