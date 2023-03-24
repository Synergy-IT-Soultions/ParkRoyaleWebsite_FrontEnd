import { Component } from "react";
import {  Modal } from "react-bootstrap";
import { connect } from "react-redux";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import './PageLoader.css'

class PageLoader extends Component {
    

    render() {
        const { showPageLoader } = this.props;
        return (
            <Modal className="chandan"
                size="sm"
                show={showPageLoader}
                aria-labelledby="example-modal-sizes-title-sm" centered>

                
                <Modal.Body><span className="center-spinner"><SpinnerComponent/></span></Modal.Body>
            </Modal>
        );
    }
}

const mapStateToPros = state => {
    return {
        showPageLoader: state.showPageLoader
    };
};
const mapDispatchToProps = dispatch => {
    return {
        
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(PageLoader);