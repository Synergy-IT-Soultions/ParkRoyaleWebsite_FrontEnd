import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomPricingComponent from "../RoomPricingComponent/RoomPricingComponent";
import RoomTariffComponent from "../RoomTariffComponent/RoomTariffComponent";
import WhoWeAreComponent from "../WhoWeAreComponent/WhoWeAreComponent";

function HomePageComponent() {
    return ( <div>
        <CarouselComponent id="home-imagecarousel-id"/>
        <RoomPricingComponent id="home-roompricing-id"/>
        <RoomTariffComponent id="home-roompricing-id"/>
        <WhoWeAreComponent id="home-roompricing-id"/>
    </div> );
}

export default HomePageComponent;