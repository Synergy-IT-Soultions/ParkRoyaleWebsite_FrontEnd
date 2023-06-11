import { React, Component } from "react";
import { Carousel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CarouselComponent.css'
import FileUploadComponent from "../../CommonComponents/FileUploadComponent/FileUploadComponent";
import { connect } from "react-redux";
import _ from "lodash";
import  CarouselCardComponent  from "./CarouselCardComponent";
import cmClient from "../../clients/ContentManagementClient";
import { toast } from "react-toastify";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import { displayErrors } from "../../utils/CommonUtils";

class CarouselComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            data: [],
            isLoading: true,
            showUpload: false
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.fetchImages = this.fetchImages.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleCloseUpload = this.handleCloseUpload.bind(this);
        this.handleShowUpload = this.handleShowUpload.bind(this);
        this.displayCarousel = this.displayCarousel.bind(this);

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleCloseUpload() {

        this.setState({ showUpload: false });
        this.handleShow();
    }

    handleShowUpload() {
        this.handleClose();
        this.setState({ showUpload: true });
    }

    fetchImages() {
        const { id } = this.props;

        cmClient.get('/content/get/container/images/' + id)
            .then(response => this.setState({ data: response.data, isLoading: false }))
            .catch(error => console.log(error));
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
                    this.fetchImages();
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



    componentDidMount() {
        this.fetchImages();

    }

    displayCarousel(activeImages) {
        return <Carousel interval={2000}>
               
        {

            _.map(activeImages, (image) => {

                let imageId = image.imageInfo.imageInfoId;
                return (
                
                <Carousel.Item key={imageId}>
                    
                    <img
                        className="d-block w-100 carouselimagesize"
                        src={image.imageInfo.imageURL}
                        alt={image.imageInfo.imageAlt}
                        style={{}}
                        key={imageId}
                       
                        
                    />

                </Carousel.Item>)

            })

        }
         
    </Carousel>
    }


    render() {
        const { isAdmin } = this.props;
        let activeImages = _.filter(this.state.data, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        let noOfImages = activeImages.length;



        return (
            <div>
                {
                    isAdmin ?

                        <Button variant="primary" size="sm" className="over-parent " onClick={this.handleShow}>
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

                        <Button type="text" onClick={this.handleShowUpload}>Add Image</Button>

                    </Modal.Footer>
                </Modal>
                  
                <FileUploadComponent 
                    show={this.state.showUpload} 
                    uploadImage={this.uploadImage} 
                    handleShowUpload={this.handleShowUpload} 
                    handleCloseUpload={this.handleCloseUpload} 
                    id={this.props.id} 
                    imageType={this.props.imageType} />

                {
                    noOfImages==1?_.map(activeImages, (image) => {

                        let imageId = image.imageInfo.imageInfoId;
                        return (
                            <img
                                key={imageId}
                                className=" d-block w-100 carouselimagesize"
                                src={image.imageInfo.imageURL}
                                alt={image.imageInfo.imageAlt}
                                style={{border: "15px solid #fff"}}
                            />

                        )

                    }):this.displayCarousel(activeImages)
                }
                
            </div>
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



export default connect(mapStateToPros, mapDispatchToProps)(CarouselComponent);
