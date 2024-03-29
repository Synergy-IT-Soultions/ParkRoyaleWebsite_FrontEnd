import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/img/parkroyallogo.png'
import LoginComponent from '../LoginComponent/LoginComponent';
import './NavbarComponents.css'

class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.navBarRef = React.createRef();
        this.mobileToggleRef = React.createRef();

        this.mobileToggleClicked = this.mobileToggleClicked.bind(this);
        this.closeMobileToggleDropDown = this.closeMobileToggleDropDown.bind(this);
    }

    componentDidMount(){
        //alert(window.location.pathname);
        window.addEventListener('scroll', this.handleScroll);
    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    //   }

    // handleScroll = () => {
    //     const element = document.querySelector('.fixed-top');
    //     const colorlink = document.querySelectorAll('.colorlink');
    //     if (window.scrollY > 200) {
    //       element.classList.add('scrolled');
    //       colorlink.classList.add('linkscolor');
          
    //     } else {
    //       element.classList.remove('scrolled');
    //       colorlink.classList.remove('linkscolor');
          
    //     }
    //   };
    

    mobileToggleClicked() {

        // let displayStyle = this.mobileToggleRef.current.style.getPropertyValue('display');
        // console.log("mobileToggleClicked->displayStyle : "+displayStyle);
        if(this.mobileToggleRef.current.classList.contains("bi-x")){
            this.closeMobileToggleDropDown();
            return;
        }

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

                <div className="container-fluid d-flex align-items-center justify-content-between navbar_padding">
                    {/* <h1 className="logo"><a href="index.html">Techie</a></h1> */}
                    {/* <!-- Uncomment below if you prefer to use an image logo -->*/}
                    {/* <a href="index.html" className="logo"><img src={logoImage} alt=""  /></a> */}
                    <NavLink className="nav-link logo" to="/"><img src={logoImage} style={{width: '112px',height:'82px'}} alt=""  /></NavLink>


                    <nav id="navbar" className="navbar" ref={this.navBarRef}>
                        <ul>
                            <li><NavLink className="nav-link scrollto" to="/" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Home</NavLink></li>
                            {/* <li><a className="nav-link scrollto" href="#about">Suits and Rooms</a></li> */}
                            <li><NavLink className='nav-link scrollto' to="/suitsandrooms" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Suits and Rooms</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/restaurants" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Restaurants</NavLink></li>
                            <li><NavLink className="nav-link scrollto " to="/recreations" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Recreations</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/toursandtravels" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Tours and Travels</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/gallery" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Gallery</NavLink></li>
                            <li><NavLink className="nav-link scrollto" to="/contactus" activeclassname="active" onClick={this.closeMobileToggleDropDown}>Contact Us</NavLink></li>
                            {window.location.pathname == "/adminlogin"?<LoginComponent mobileToggleClicked={this.closeMobileToggleDropDown}/>:""}
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" ref={this.mobileToggleRef} onClick={this.mobileToggleClicked}></i>
                    </nav>
                  </div>
                
            </header>

        );
    }
}

export default NavBarComponent;