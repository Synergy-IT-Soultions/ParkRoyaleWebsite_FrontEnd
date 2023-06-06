import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import WhoWeAreComponent from "../WhoWeAreComponent/WhoWeAreComponent";

function HomePageComponent() {
    return ( <div>
        <CarouselComponent id="home-imagecarousel-id" imageType="CAROUSEL"/>
        <WhoWeAreComponent id="home-whoweare-id"/>
        <RoomTariffComponent id="home-king-suite-tariff-id"/>
        <RoomTariffComponent id="home-deluxe-suite-tariff-id"/>
       
        

    </div> );
}

export default HomePageComponent;