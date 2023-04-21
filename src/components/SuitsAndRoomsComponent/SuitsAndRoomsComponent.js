import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomPricingComponent from "../RoomPricingComponent/RoomPricingComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import RoomsAndOverviewContainer from "../SuitsAndRoomsComponent/RoomsAndOverviewContainer";
import HotelAndOverviewContainer from "./HotelAndOverviewContainer";

class SuitsAndRoomsComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="sandr-imagebar-id" imageType="IMAGEBAR"/>
            <HotelAndOverviewContainer id="sandr-hoteloverview-id" /> 
            <RoomTariffComponent id="home-king-suite-tariff-id"/>
            <RoomTariffComponent id="home-deluxe-suite-tariff-id"/>
             {/* <RoomsAndOverviewContainer />  */}
             <RoomPricingComponent id="home-roompricing-id"/>
             
             
        </div>);
    }
}
 
export default SuitsAndRoomsComponent;