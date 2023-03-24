import React, { Component } from 'react'
import { connect } from 'react-redux';
import './RoomAndOverviewContainer.css'
import _ from "lodash";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import HotelSummary from './HotelSummary';
import OverviewContainer from './OverviewContainer';


class HotelAndOverviewContainer extends Component {
     constructor(props) {
          super(props);
          this.state={
               data:[],
               isLoading:false
          }
      }

     render() {
         return (
               <div class="container-fluid" >
                    <section >
                        <div class="container" data-aos="fade-up">
                            <div class="left1" style={{ height: '98%' }}>
                                <HotelSummary id="sandr-roomdescription-id"/>
                            </div>
                            <div class="right1">
                                <OverviewContainer id="sandr-hoteloverview-id"/>
                            </div>
                        </div>
                    </section>
               </div>
          )
     }
}
const mapStateToPros = state => {
     return {
         isAdmin: _.isEqual(state?.userInfo?.role, "Admin"),
         // isAdmin:true,
         token: state.userInfo.token,
         formData: state.formData,
     };
 };
 
 const mapDispatchToProps = dispatch => {
     return {
         showPageLoader: () => showPageLoader(dispatch),
         hidePageLoader: () => hidePageLoader(dispatch),
     }
 };
 
 export default connect(mapStateToPros, mapDispatchToProps) (HotelAndOverviewContainer);