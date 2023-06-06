import { Component } from "react";
import CarouselComponent from "../CarouselComponent/CarouselComponent";
import ContactUsMapComponent from "./ContactUsMapComponent";

class ContactUsComponent extends Component {
  
    render() { 
        return (<div>
            <CarouselComponent id="contus-imagecarousel-id" imageType="IMAGEBAR"/>
            <ContactUsMapComponent id="contus-address-id" />
             </div>);
    }
}
 
export default ContactUsComponent;