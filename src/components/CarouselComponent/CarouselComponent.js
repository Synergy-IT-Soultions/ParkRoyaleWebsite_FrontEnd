import { React, Component } from "react";
import { Carousel } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";
import './CarouselComponent.css'
import axios from 'axios';
import FileUploadComponent from "../../CommonComponents/FileUploadComponent/FileUploadComponent";
import { authenticate } from "../../utils/APIExecuter";
import { connect } from "react-redux";
import _ from "lodash";


class CarouselComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            data:[],
            isLoading:true
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.fetchImages = this.fetchImages.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    fetchImages() {
        const {id} = this.props;

        // const user = authenticate();
        // this.setState({user: user.data});

        axios.get('http://10.10.10.32/ContentManagement/content/get/container/images/'+id)
            //.then(response => console.log(response))
            .then(response => this.setState({ data: response.data , isLoading:false}))
            .catch(error => console.log(error));
    }

    deleteImage(fileId) {

        axios.post('http://10.10.10.32/ContentManagement/image/delete/'+fileId)
            //.then(response => console.log(response))
            .then(response => {
                this.fetchImages();
            })
            .catch(error => console.log(error));

    }

    uploadImage(formData) {
        const {token} = this.props;
        const auth = "Bearer "+token;
        axios.post('http://10.10.10.32/ContentManagement/image/upload', formData, {
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
        const {isAdmin} = this.props;
        let activeImages = _.filter(this.state.data, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
        });

        

        return (
            <div>
            {isAdmin?<Button variant="primary" className="over-parent" onClick={this.handleShow}>Edit Images</Button>:""}
            <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Image Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {activeImages.length == 0 ? <SpinnerComponent/> :""}

                        <div className="image-editor-grid">
                            {
                                activeImages.map(image => <span><i class="fa fa-fw fa-trash" onClick={this.deleteImage.bind(this, [image.imageInfo.imageInfoId])}></i><img src={"http://10.10.10.32/ContentManagement/image/download/"+image.imageInfo.imageInfoId} className="image_icon" /></span>)
                                // this.state.images.map(image => <span><i class="fa fa-fw fa-trash" onClick={this.deleteImage.bind(this, [image.id])}></i><img src={image.fileURL} className="image_icon" data-filePath={image.fileURL} /></span>)
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
                        <FileUploadComponent uploadImage={this.uploadImage}/>
                    </Modal.Footer>
                </Modal>
            
            <Carousel>
                {

                    _.map(activeImages, (image) => {

                        let imageId = image.imageInfo.imageInfoId;
                        return (<Carousel.Item key={imageId}>
                            <img
                                className="d-block w-100"
                                src={"http://10.10.10.32/ContentManagement/image/download/" + imageId}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
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
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
    }
};


//export default CarouselComponent;
export default connect(mapStateToPros, undefined)(CarouselComponent);