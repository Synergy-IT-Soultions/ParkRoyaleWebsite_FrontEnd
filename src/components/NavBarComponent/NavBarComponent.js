import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/ParkRoyale_Logo.png'
import LoginComponent from '../LoginComponent/LoginComponent';

class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.navBarRef = React.createRef();
        this.mobileToggleRef = React.createRef();

        this.mobileToggleClicked = this.mobileToggleClicked.bind(this);
    }

    mobileToggleClicked() {
        this.navBarRef.current.classList.toggle("navbar-mobile");
        this.mobileToggleRef.current.classList.toggle("bi-list");
        this.mobileToggleRef.current.classList.toggle("bi-x");

    }

    render() {
        return (
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                    {/* <h1 className="logo"><a href="index.html">Techie</a></h1> */}
                    {/* <!-- Uncomment below if you prefer to use an image logo -->*/}
                    <a href="index.html" className="logo"><img src={logoImage} alt=""  /></a>

                    <nav id="navbar" className="navbar" ref={this.navBarRef}>
                        <ul>
                            <li><NavLink className="nav-link scrollto" to="/" activeClassName="active">Home</NavLink></li>
                            {/* <li><a className="nav-link scrollto" href="#about">Suits and Rooms</a></li> */}
                            <li><NavLink className='nav-link scrollto' to="/suitsandrooms" activeClassName="active">Suits and Rooms</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/restaurants" activeClassName="active">Restaurants</NavLink></li>
                            <li><NavLink className="nav-link scrollto " to="/recreations" activeClassName="active">Recreations</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/toursandtravels" activeClassName="active">Tours and Travels</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/gallery" activeClassName="active">Gallery</NavLink></li>
                            <li><NavLink className="getstarted scrollto" to="/contactus" activeClassName="active">Contact Us</NavLink></li>
                            <LoginComponent />
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" ref={this.mobileToggleRef} onClick={this.mobileToggleClicked}></i>
                    </nav>

                </div>
            </header>

        );
    }
}

export default NavBarComponent;