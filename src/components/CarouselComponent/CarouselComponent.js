import { React, Component } from "react";
import { Carousel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CarouselComponent.css'
import axios from 'axios';
import FileUploadComponent from "../../CommonComponents/FileUploadComponent/FileUploadComponent";
import { connect } from "react-redux";
import _ from "lodash";
import { CarouselCardComponent } from "./CarouselCardComponent";
import editImage from '../../assets/edit.png'
import cmClient from "../../clients/ContentManagementClient";

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

        // const user = authenticate();
        // this.setState({user: user.data});

        cmClient.get('/content/get/container/images/' + id)
            //.then(response => console.log(response))
            .then(response => this.setState({ data: response.data, isLoading: false }))
            .catch(error => console.log(error));
    }

    deleteImage(fileId) {

        cmClient.post('/image/delete/' + fileId)
            //.then(response => console.log(response))
            .then(response => {
                this.fetchImages();
            })
            .catch(error => console.log(error));

    }

    uploadImage(formData) {
        const { token } = this.props;
        const auth = "Bearer " + token;
        cmClient.post('/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data;boundary=',
                'Authorization': auth
            }
        })
            .then(response => {
                this.fetchImages();
            })
            .catch(error => console.log(error));
    }



    componentDidMount() {
        this.fetchImages();

    }


    render() {
        const { isAdmin } = this.props;
        let activeImages = _.filter(this.state.data, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });



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
                        {activeImages.length === 0 ? "Images not added yet, please add images." :""}
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
                        {/* <input
                            type='file'
                            className='custom-file-input'
                            id='customFile'
                            onChange={this.onChange}
                        />
                        <Button variant="primary" onClick={this.uploadImage}>Upload</Button> */}
                        <Button type="text" onClick={this.handleShowUpload}>Add Image</Button>

                    </Modal.Footer>
                </Modal>

                <FileUploadComponent show={this.state.showUpload} uploadImage={this.uploadImage} handleShowUpload={this.handleShowUpload} handleCloseUpload={this.handleCloseUpload} />

                <Carousel>
                    {

                        _.map(activeImages, (image) => {

                            let imageId = image.imageInfo.imageInfoId;
                            return (<Carousel.Item key={imageId}>
                                <img
                                    className="d-block w-100"
                                    src={"http://10.10.10.32/ContentManagement/image/download/" + imageId}
                                    alt= {image.imageInfo.imageAlt}
                                />

                            </Carousel.Item>)

                        })



                        // _.map(this.state.data?.containerImageInfo, (containerImageInfoObject) => {

                        //     let imageId = containerImageInfoObject?.imageInfo?.imageInfoId;
                        //     return (<Carousel.Item>
                        //         <img
                        //             className="d-block w-100"
                        //             src={"http://10.10.10.32/ContentManagement/image/download/" + imageId}
                        //             alt="First slide"
                        //         />
                        //         <Carousel.Caption>
                        //             <h3>First slide label</h3>
                        //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        //         </Carousel.Caption>
                        //     </Carousel.Item>)

                        // })
                    }
                    {/* <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hotelImage1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hotelImage2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={hotelImage3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item> */}
                </Carousel>
            </div>
        );
    }
}

const mapStateToPros = state => {
    return {
        isAdmin: _.isEqual(state?.userInfo?.role, "Admin"),
        token: state.userInfo.token
    };
};



//export default CarouselComponent;
export default connect(mapStateToPros, undefined)(CarouselComponent);
