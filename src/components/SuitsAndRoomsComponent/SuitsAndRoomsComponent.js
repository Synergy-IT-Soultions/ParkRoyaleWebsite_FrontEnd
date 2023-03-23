import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import { RoomsAndOverviewContainer } from "./RoomsAndOverviewContainer";

class SuitsAndRoomsComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (<div>
            <CarouselComponent id="sandr-imagebar-id" imageType="IMAGEBAR"/>
            
             <RoomsAndOverviewContainer /> 
             <RoomTariffComponent id="home-roompricing-id"/>
             <RoomsAndOverviewContainer /> 
        </div>);
    }
}
 
export default SuitsAndRoomsComponent;