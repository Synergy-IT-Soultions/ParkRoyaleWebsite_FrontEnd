import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import ImageGalleryComponent from "./ImageGalleryComponent";

class GalleryComponent extends Component {

    render() {
        return (
            <div>
                <CarouselComponent id="gllry-imagecarousel-id" imageType="IMAGEBAR" />
                <ImageGalleryComponent id="gllry-outer-cntnr-id"/>
            </div>
        );
    }
}

export default GalleryComponent;