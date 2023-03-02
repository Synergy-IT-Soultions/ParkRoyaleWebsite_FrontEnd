import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import _ from 'lodash';
//import {imageInfo} from '../../assets/image_info.json'

function FileUploadComponent(props) {
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [file, setFile] = useState();
    const [imageInfo, setImageInfo] = useState({imageIsActive:1,updatedBy:3,containerDivId: "home-imagecarousel-id"});

    const onFileChange = e => {
        let uploadedFile = e.target.files[0];
        let size = uploadedFile.size;

        if(size > 1048576){
            alert("File is too big!");
            e.target.value = "";
            return;
         };

        setFile(e.target.files[0]);
        //setFilename(e.target.files[0].name);
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
            //alert(JSON.stringify(res.data))
        }

        

        


    };

    const uploadFile =  ()=>{

        const formData = new FormData();
        formData.append('file', file);
        //formData.append('imageInfo', imageInfo);
        _.forEach(imageInfo, (value, key)=> formData.append(key, value) );
        //formData.append('abc', "abc");
        const { uploadImage } = props;
        uploadImage(formData);
        setShow(false);


        // axios.post('http://10.10.10.32/ContentManagement/image/upload', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data;boundary=',
        //       'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoibnByYXNhdGgiLCJleHAiOjE2NzcwMTM4ODksImlhdCI6MTY3Njk5OTQ4OSwic2NvcGUiOiJBZG1pbiJ9.X-6khriPu_G0RLByhWmSO0VGfrYRlvLo4tdKONvoXGzhCARoNQFUtSuw2s3XB-pFYFL3poKgRAcyLrgoYprW071mPWg44rEkf9GccvcudWS2JD-OItCg17V4QEE-KzUXCPVMjCYz5cU6yTM0Z2-ZC7RATRq0IWekjex36q8hZcNKoMEdjC7XLTtWTKiGcvJ_IeiUWU5EO9cRhfjTjgjwoOyDUjk3t09DEgv0EVRkaR_iOKLnsW95DU4jGbh5m2dm3H6fZSO7cIOmy1zFNJ_lZYBP8b8mwl8vLUKC1_PKJGHA0PLbbfb01BtVhxzRli6xcFRumhrU_cU3JKgFy1TwtA'
        //     }
        //   })
        //   .then(response => alert(response.data))
        //     .catch(error => console.log(error));

          

    }

    const uploadForm = (event) => {
        return (
            // <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageName"
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageDescription"
                        onChange={onChange}
                    />
                </Form.Group>

            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageType"
                        onChange={onChange}
                        defaultValue="CAROUSEL"
                    />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Alt Text</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="imageAlt"
                        onChange={onChange}
                    />
                </Form.Group>

            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
                    
                    <Form.Control required type="file" id="new_image_file" accept="image/png,image/webp" onChange={onFileChange}/>
                </Form.Group>
                
            </Row>

            <Button type="submit" onClick={handleSubmit}>Save</Button>
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
        <Button type="text" onClick={handleShow}>Add Image</Button>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {uploadForm()}
            </Modal.Body>

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
//connect(mapStateToPros, mapDispatchToProps)(FileUploadComponent);