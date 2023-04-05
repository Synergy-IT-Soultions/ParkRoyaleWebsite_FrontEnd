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
        this.closeMobileToggleDropDown = this.closeMobileToggleDropDown.bind(this);
    }

    mobileToggleClicked() {

        // let displayStyle = this.mobileToggleRef.current.style.getPropertyValue('display');
        // console.log("mobileToggleClicked->displayStyle : "+displayStyle);

        this.navBarRef.current.classList.add("navbar-mobile");
        this.mobileToggleRef.current.classList.remove("bi-list"); 
        this.mobileToggleRef.current.classList.add("bi-x");

    }

    closeMobileToggleDropDown(){
        this.mobileToggleRef.current.classList.remove("bi-x");
        this.mobileToggleRef.current.classList.add("bi-list");
        this.navBarRef.current.classList.remove("navbar-mobile");
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
                            <li><NavLink className="nav-link scrollto" to="/" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Home</NavLink></li>
                            {/* <li><a className="nav-link scrollto" href="#about">Suits and Rooms</a></li> */}
                            <li><NavLink className='nav-link scrollto' to="/suitsandrooms" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Suits and Rooms</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/restaurants" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Restaurants</NavLink></li>
                            <li><NavLink className="nav-link scrollto " to="/recreations" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Recreations</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/toursandtravels" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Tours and Travels</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/gallery" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Gallery</NavLink></li>
                            <li><NavLink className="getstarted scrollto" to="/contactus" activeClassName="active" onClick={this.closeMobileToggleDropDown}>Contact Us</NavLink></li>
                            <LoginComponent mobileToggleClicked={this.closeMobileToggleDropDown}/>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" ref={this.mobileToggleRef} onClick={this.mobileToggleClicked}></i>
                    </nav>

                </div>
            </header>

        );
    }
}

export default NavBarComponent;