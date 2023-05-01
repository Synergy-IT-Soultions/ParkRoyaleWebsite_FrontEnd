//import logo from './logo.svg';
import './App.css';
import { browserHistory, BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import HomePageComponent from './components/HomePageComponent/HomePageComponent';
import NoPageComponent from './components/NoPageComponent/NoPageComponent';
import { Component } from 'react';
import { connect } from 'react-redux';
import SuitsAndRoomsComponent from './components/SuitsAndRoomsComponent/SuitsAndRoomsComponent';
import ComingSoonComponent from './components/ComingSoonComponent/ComingSoonComponent';
import RestaurantHomeComponent from './components/RestaurantComponent/RestaurantHomeComponent';
import RecreationHomeComponent from './components/RecreationComponent/RecreationComponent';
import ToursAndTravelsComponent from './components/ToursAndTravelsComponent/ToursAndTravelsComponent';
<<<<<<< HEAD
import ContactUsComponent from './components/ContactUsComponent/ContactUsComponent';
=======
import GalleryComponent from './components/GalleryComponent/GalleryComponent';
>>>>>>> 0d5182a (Gallery page)


class App extends Component {


  componentDidMount() {
    // //const user = authenticate();
    // //alert(JSON.stringify(user.data));
    // const { addUserInfo } = this.props;
    // //addUserInfo("userInfo",user.data);

    // cmClient.post('/user/authenticate', {}, {
    //   auth: {
    //     username: "nprasath",
    //     password: "password234"
    //   }
    // })
    //   //.then(response => console.log(response))
    //   .then(response => addUserInfo("userInfo",response.data))
    //   .catch(error => console.log(error));


  }

  render() {
    return (
      <div className="App">
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<LayoutComponent />}>
              <Route index element={<HomePageComponent />} />
              <Route path="/adminlogin" element={<HomePageComponent />} />
              <Route path="/suitsandrooms" element={<SuitsAndRoomsComponent />} />
              <Route path="/restaurants" element={<RestaurantHomeComponent />} />
              <Route path="/recreations" element={<RecreationHomeComponent />} />
              <Route path="/toursandtravels" element={<ToursAndTravelsComponent />} />
              <Route path="/contactus" element={<ContactUsComponent />} />
              <Route path="/gallery" element={<GalleryComponent/>} />
              <Route path="*" element={<NoPageComponent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>);
  }
}

const mapStateToPros = state => {
  return {
    count: state.count
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addUserInfo: (id, data) => dispatch({ type: 'USER_INFO', id, data })
  }
};

export default connect(mapStateToPros, mapDispatchToProps)(App);
