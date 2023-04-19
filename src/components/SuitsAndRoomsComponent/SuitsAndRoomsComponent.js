import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import RoomsAndOverviewContainer from "../SuitsAndRoomsComponent/RoomsAndOverviewContainer";
import HotelAndOverviewContainer from "./HotelAndOverviewContainer";

class SuitsAndRoomsComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="sandr-imagebar-id" imageType="IMAGEBAR"/>
            <HotelAndOverviewContainer id="sandr-hoteloverview-id" /> 
            <RoomTariffComponent id="home-roompricing-id"/>
            <RoomTariffComponent id="home-roompricing-id"/>
             <RoomsAndOverviewContainer /> 
             
             
        </div>);
    }
}
 
export default SuitsAndRoomsComponent;