import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import InputComponent from "../InputComponent";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import _ from "lodash";
import "./ContainerEditComponent.css";


class ContainerEditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            data:undefined,
            uiComponents:[],
            isLoading:false,
            formChanged:false
        }
    }

    handleShow = (event)=>{
        this.setState({show:true});
    };

    handleClose = (event)=>{
        this.setState({show:false});
    };

    reenderUI = (event)=>{
        console.log("Inside Render UI");
        const { data } = this.props;
        let uiComponents = [];
        let containerHeader = data;
        let containerTextInfo = data.containerTextInfo;
        let containerImageInfo = data.containerImageInfo;
        let containerPricingInfo = data.containerPricingInfo;

        console.log ('containerHeader: '+containerHeader);
        console.log ('containerTextInfo: '+containerTextInfo);
        console.log ('containerImageInfo: '+containerImageInfo);
        console.log ('containerPricingInfo: '+containerPricingInfo);


        this.createComponent(containerHeader, uiComponents);
        this.createComponent(containerTextInfo, uiComponents);
        this.createComponent(containerImageInfo, uiComponents);
        this.createComponent(containerPricingInfo, uiComponents);

        this.setState({uiComponents});
    }

    onChange = (event)=>{
        this.setState({formChanged:true});


    }

    handlSave = (event)=>{
        this.setState({formChanged:false});
        const { handleSave, data } = this.props;
        handleSave(data);
    }

    createComponent = (uiData, uiComponents)=>{
        console.log('Inside Create Component: ' + uiData);
        if(uiData && _.isArray(uiData)){
            console.log ('uiData: '+uiData);
            _.forEach(uiData, (uiDataItem)=>{
                this.createComponent(uiDataItem, uiComponents);
            })
        }
        else if(_.isPlainObject(uiData)){
            console.log ('Plain Object: '+uiData);
            let comp;
            if(_.isEqual(uiData.editType, "Header")){
                console.log ('Header: '+uiData.editType);
                comp = <InputComponent key={uiData.pageContainerInfoId+""} id={uiData.pageContainerInfoId+""} value={uiData.containerHeader} label={uiData.editType} type="text"/>
            }
            else if(_.isEqual(uiData.editType, "Text")){
                console.log ('Text: '+uiData.editType);
                comp = <InputComponent key={uiData.containerTextInfoId+""}  id={uiData.containerTextInfoId+""} value={uiData.containertextLabelValue} label={uiData.containerTextLabelName} type="text"/>

            }
            else if(_.isEqual(uiData.editType, "Image")){
                console.log ('Image: '+uiData.editType);
                comp = <InputComponent key={uiData.containerImageInfoId+""}  id={uiData.containerImageInfoId+""} value={uiData.imageInfo.imageInfoId} label={uiData.containerTextLabelName} select={true} fetchOptions={this.props.fetchOptions} showSelectedImage={true}/>
            }
            uiComponents.push(comp);

        }
        console.log('Exiting Create Component: ' );

    }

    loadingStart =()=>{
        console.log('Inside Loading Start');
        this.setState({isLoading:true});
    }
    loadingStop =()=>{
        console.log('Inside Loading Stop');
        this.setState({isLoading:false});
    }

    componentDidMount(){
        console.log('Inside Component Did Mount');
        const { data } = this.props;
        this.setState({data});
        console.log('Data state updated: ' + data);
        let labelName = _.get(data[0], "containerTextInfo[0].containerTextLabelName");
        console.log('labelName: ' + labelName);
        this.loadingStart();
        this.reenderUI();
        this.loadingStop();
    }
    
    render() { 
        const { uiComponents, isLoading, show, formChanged } = this.state;
        console.log('isLoading : '+ isLoading);
        return ( <span className="editor">
            
            <Button  size="sm" onClick={this.handleShow}>
                <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
            </Button>

            <Modal size="md"  show={show} onHide={this.handleClose}>
                    <Modal.Header className="modalHeader text-white" closeButton>
                        <Modal.Title>Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            isLoading?<SpinnerComponent/>:uiComponents
                        }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type="submit" disabled={formChanged} onClick={this.handlSave}>Save</Button>
                    </Modal.Footer>
                </Modal>
        </span> );
    }
}
 
export default ContainerEditComponent;