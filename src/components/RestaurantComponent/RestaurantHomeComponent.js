import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import GallerySwiperComponent from "../GallerySwiperComponent/GallerySwiperComponent";
import OverviewComponent from "../SuitsAndRoomsComponent/OverviewComponent";

class RestaurantHomeComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="rest-imagecarousel-id" imageType="IMAGEBAR"/>
            <OverviewComponent id="rest-overview-id" /> 
            <GallerySwiperComponent id="rest-gallery-id" imageType="RESTAURANT"/> 
             </div>);
    }
}
 
export default RestaurantHomeComponent;