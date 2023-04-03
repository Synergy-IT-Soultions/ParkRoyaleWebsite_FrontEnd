import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import  CarouselComponent  from '../CarouselComponent/CarouselComponent';
import './RoomAndOverviewContainer.css'
import _ from "lodash";
import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";
import  OverviewEditContainer  from './OverviewEditContainer';

class RoomsAndOverviewContainer extends Component {
     constructor(props) {
          super(props);
          this.state={
               data:[],
               isLoading:false
          }
          
      }
     render() {
         return (
               
                    <section >
                         <div class="container" data-aos="fade-up">
                         <div class="row row-cols-lg-2">
                              <div class="left">
                                   <Card>
                                        <Card.Body >
                                             <CarouselComponent id="sandr-pictures-id" imageType="ROOMS"/>
                                        </Card.Body>
                                   </Card>
                              </div>
                              <div class="card-content">
                                   <OverviewEditContainer id="sandr-roomsoverview-id"/>
                              </div>
                         </div>
                         </div>
                    </section>
              
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
 
export default connect(mapStateToPros, mapDispatchToProps) (RoomsAndOverviewContainer);