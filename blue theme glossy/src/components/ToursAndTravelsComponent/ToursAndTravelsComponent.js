import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import GallerySwiperComponent from "../GallerySwiperComponent/GallerySwiperComponent";
import OverviewComponent from "../SuitsAndRoomsComponent/OverviewComponent";

class ToursAndTravelsComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="tandt-imagecarousel-id" imageType="IMAGEBAR"/>
            <OverviewComponent id="tandt-overview-id" /> 
            <GallerySwiperComponent id="tandt-gallery-id" imageType="TOURS"/> 
             </div>);
    }
}
 
export default ToursAndTravelsComponent;