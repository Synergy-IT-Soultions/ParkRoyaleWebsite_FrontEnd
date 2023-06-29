import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';


//import {imageInfo} from '../../assets/image_info.json'

function FileUploadComponent(props ) {
    const id  = props.id && props.id
    const imageType  = props.imageType && props.imageType
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState();
    const [imageInfo, setImageInfo] = useState({imageIsActive:1,updatedBy:3,containerDivId: id,imageType:imageType});

    const onFileChange = e => {
        let uploadedFile = e.target.files[0];
        let size = uploadedFile.size;

        if(size > 1048576){
            alert("File is too big!");
            e.target.value = "";
            return;
         };

        setFile(e.target.files[0]);
    };

    const onChange = e => {
        let id = e.target.id;
        let value = e.target.value;
        let data = {...imageInfo};
        data[id] = value;
        setImageInfo(data);
        
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

        }
        else{
            setValidated(true);
            uploadFile();
        }

    };

    const uploadFile =  ()=>{
        const formData = new FormData();
        formData.append('file', file);
        _.forEach(imageInfo, (value, key)=> formData.append(key, value) );
        const { uploadImage } = props;
        uploadImage(formData);
        setShow(false);
    }

    const uploadForm = (event) => {
        return (
            <div>
            <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageName"
                        onChange={onChange}
                        autoComplete="off"
                        
                    />
                </Form.Group>
               </Row>
               <Row className="mb-3"> 
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageDescription"
                        onChange={onChange}
                        autoComplete="off"
                    />
                </Form.Group>
            </Row>
            <Row >
                <Form.Group as={Col}  controlId="validationCustom01">
                    <Form.Control
                        disabled
                        type="hidden"
                        id="imageType"
                        onChange={onChange}
                        defaultValue={imageType}
                    />
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Alt Text</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageAlt"
                        onChange={onChange}
                        autoComplete="off"
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Image File</Form.Label>
                    <Form.Control 
                        required type="file" 
                        id="new_image_file" 
                        accept="image/png, image/webp, image/jpg, image/jpeg" 
                        onChange={onFileChange}
                        autoComplete="off"
                    />
                </Form.Group>
                
            </Row>
            
           
            </div>
        //</Form>
        );
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
        
    }

    return (<>
        {/* <Button type="text" onClick={handleShow}>Add Image</Button> */}
        <Modal size="sm"  show={props.show} onHide={props.handleCloseUpload}>
            <Modal.Header className="modalHeader text-white" closeButton>
                <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {uploadForm()}
            </Modal.Body>
            <Modal.Footer>
            <Button type="submit" onClick={handleSubmit}><i class="fas fa-save pe-2"></i>Save</Button>
            </Modal.Footer>
        </Modal></>
    );
}

const mapStateToPros = state => {
    return {
        count: state.count
    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' })
    }
};

export default FileUploadComponent;
