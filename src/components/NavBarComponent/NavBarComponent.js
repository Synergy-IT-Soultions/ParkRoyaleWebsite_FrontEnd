import React, { Component } from 'react';
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
            <header id="header" className="fixed-top ">
                <div className="container d-flex align-items-center justify-content-between">
                    {/* <h1 className="logo"><a href="index.html">Techie</a></h1> */}
                    {/* <!-- Uncomment below if you prefer to use an image logo -->*/}
                    <a href="index.html" className="logo"><img src={logoImage} alt="" className="img-fluid" /></a>

                    <nav id="navbar" className="navbar" ref={this.navBarRef}>
                        <ul>
                            <li><Link className="nav-link scrollto active" to="/">Home</Link></li>
                            {/* <li><a className="nav-link scrollto" href="#about">Suits and Rooms</a></li> */}
                            <li><Link className='nav-link scrollto' to="suitsandrooms">Suits and Rooms</Link></li>
                            <li><a className="nav-link scrollto" href="#services">Restaurants</a></li>
                            <li><a className="nav-link scrollto " href="#portfolio">Recreations</a></li>
                            <li><a className="nav-link scrollto" href="#team">Tours and Travels</a></li>
                            {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                        <ul>
                            <li><a href="#">Drop Down 1</a></li>
                            <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                                <ul>
                                    <li><a href="#">Deep Drop Down 1</a></li>
                                    <li><a href="#">Deep Drop Down 2</a></li>
                                    <li><a href="#">Deep Drop Down 3</a></li>
                                    <li><a href="#">Deep Drop Down 4</a></li>
                                    <li><a href="#">Deep Drop Down 5</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Drop Down 2</a></li>
                            <li><a href="#">Drop Down 3</a></li>
                            <li><a href="#">Drop Down 4</a></li>
                        </ul>
                    </li> */}
                            <li><a className="nav-link scrollto" href="#contact">Gallery</a></li>

                            <li><a className="getstarted scrollto" href="#about">Contact Us</a></li>
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