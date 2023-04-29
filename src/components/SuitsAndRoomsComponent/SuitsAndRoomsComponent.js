import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import OverviewComponent from "./OverviewComponent";
import GallerySwiperComponent from "../GallerySwiperComponent/GallerySwiperComponent";

class SuitsAndRoomsComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="sandr-imagebar-id" imageType="IMAGEBAR"/>
            <OverviewComponent id="sandr-roomdescription-id" /> 
            <RoomTariffComponent id="home-king-suite-tariff-id"/>
            <RoomTariffComponent id="home-deluxe-suite-tariff-id"/>
            <GallerySwiperComponent id="sandr-room-gallery-id" imageType="ROOMS"/> 
        </div>);
    }
}
 
export default SuitsAndRoomsComponent;