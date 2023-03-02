import CarouselComponent from "../CarouselComponent/CarouselComponent";
import RoomPricingComponent from "../RoomPricingComponent/RoomPricingComponent";

function HomePageComponent() {
    return ( <div>
        <CarouselComponent id="home-imagecarousel-id"/>
        <RoomPricingComponent id="home-roompricing-id"/>
    </div> );
}

export default HomePageComponent;