import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import RoomsAndOverviewContainer from "../SuitsAndRoomsComponent/RoomsAndOverviewContainer";
import HotelAndOverviewContainer from "./HotelAndOverviewContainer";

class SuitsAndRoomsComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="sandr-imagebar-id" imageType="IMAGEBAR"/>
             <RoomsAndOverviewContainer /> 
             <RoomTariffComponent id="home-roompricing-id"/>
             <HotelAndOverviewContainer id="sandr-hoteloverview-id" /> 
        </div>);
    }
}
 
export default SuitsAndRoomsComponent;