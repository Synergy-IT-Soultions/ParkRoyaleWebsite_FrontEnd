import { Component } from "react";
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";

class GalleryHeaderComponent extends Component {

    render() {
        const {headerData} = this.props;
        return (
            <>
            {headerData?
            <div className="section-title">
                <h2>{headerData.containerHeader}</h2>
                <p>{headerData.containerTextInfo[0].containertextLabelValue}</p>
            </div>:<SpinnerComponent/>}
            </>
        );
    }
}

export default GalleryHeaderComponent;