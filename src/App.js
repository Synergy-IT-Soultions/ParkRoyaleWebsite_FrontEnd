//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from './components/LayoutComponent/LayoutComponent';
import HomePageComponent from './components/HomePageComponent/HomePageComponent';
import NoPageComponent from './components/NoPageComponent/NoPageComponent';
import { Component } from 'react';
import { connect } from 'react-redux';
import SuitsAndRoomsComponent from './components/SuitsAndRoomsComponent/SuitsAndRoomsComponent';
import ComingSoonComponent from './components/ComingSoonComponent/ComingSoonComponent';


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
        <BrowserRouter basename="/HotelManagement">
          <Routes>
            <Route path="/" element={<LayoutComponent />}>
              <Route index element={<HomePageComponent />} />
              <Route path="/suitsandrooms" element={<SuitsAndRoomsComponent />} />
              <Route path="/restaurants" element={<ComingSoonComponent />} />
              <Route path="/recreations" element={<ComingSoonComponent />} />
              <Route path="/toursandtravels" element={<ComingSoonComponent />} />
              <Route path="/gallery" element={<ComingSoonComponent />} />
              <Route path="/contactus" element={<ComingSoonComponent />} />
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
