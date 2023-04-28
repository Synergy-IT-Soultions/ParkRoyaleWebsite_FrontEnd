import { Component } from "react";
import RestaurantDisplayComponent from "./RestaurantDisplayComponent";
import CarouselComponent from "../CarouselComponent/CarouselComponent";

class RestaurantHomeComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="sandr-imagebar-id" imageType="IMAGEBAR"/>
           
        </div>);
    }
}
 
export default RestaurantHomeComponent;