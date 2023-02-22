import { Outlet } from "react-router-dom";
import FooterComponent from "../FooterComponent/FooterComponent";
import NavBarComponent from "../NavBarComponent/NavBarComponent";
import NotificationComponent from "../NotificationComponent/NotificationComponent";
import './LayoutComponent.css'

function LayoutComponent() {
    return (<>

    <NavBarComponent/>
    <div className="menu-space"></div>
    <Outlet/>
    <NotificationComponent/>
    <FooterComponent/>

    </>);
}

export default LayoutComponent;