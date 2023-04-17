import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomPricingComponent from "../RoomPricingComponent/RoomPricingComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import WhoWeAreComponent from "../WhoWeAreComponent/WhoWeAreComponent";

function HomePageComponent() {
    return ( <div>
        <CarouselComponent id="home-imagecarousel-id" imageType="CAROUSEL"/>
        <RoomPricingComponent id="home-roompricing-id"/>
        <RoomTariffComponent id="home-roompricing-id"/>
        <WhoWeAreComponent id="home-whoweare-id"/>
    </div> );
}

export default HomePageComponent;