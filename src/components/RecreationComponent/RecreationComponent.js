import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import GallerySwiperComponent from "../GallerySwiperComponent/GallerySwiperComponent";
import OverviewComponent from "../SuitsAndRoomsComponent/OverviewComponent";

class RecreationHomeComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="rec-imagecarousel-id" imageType="IMAGEBAR"/>
            <OverviewComponent id="rec-overview-id" /> 
            <GallerySwiperComponent id="rec-gallery-id" imageType="RECREATION"/> 
             </div>);
    }
}
 
export default RecreationHomeComponent;