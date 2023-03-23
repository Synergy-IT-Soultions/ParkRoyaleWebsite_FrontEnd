import React from 'react'
import { Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import './RoomAndOverviewContainer.css'
import Table from 'react-bootstrap/Table';

export const RoomsAndOverviewContainer = () => {
  return (
    <div class="container-fluid">
        <section id="roomImages" >

        
        <div class="container">
       
            <div class="left">
                  <Card>
                     <Card.Body style={{ height: '98%' }}>
                         <CarouselComponent id="sandr-pictures-id" imageType="ROOMS"/>
                    </Card.Body>
                 </Card>
            </div>
           
            <div class="right">
            <Card className='tableHolder'>
                    <Card.Header style={{ backgroundColor: '#5846f9', color:'white' }} > Rooms Overview </Card.Header>
                     <Card.Body >
                            <table>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol" style={{ width: '40%' }}> <div class='tablecard'> Occupancy: </div>  </td>
                                 <td className="tableCol"> <div class='tablecard'> Up to 4 Persons </div>  </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol"><div class='tablecard'>LCD: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>Yes </div> </td>
                                 </tr>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol"><div class='tablecard'>Water heater: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>Yes </div> </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol"><div class='tablecard'>Room heater: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>Yes </div> </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol"><div class='tablecard'>Dining table: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>Yes </div> </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol"><div class='tablecard'>Safe locker: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>Yes </div> </td>
                            </tr>
                            <tr style={{ height: '75px' }}>
                                 <td className="tableCol"><div class='tablecard'>Queen size bed: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>Height 9 inches <br></br>
                                 Size 6 * 6.6 feet
                                 </div> 
                                 </td>
                            </tr>
                            <tr style={{ height: '100px' }}>
                                 <td className="tableCol"><div class='tablecard'>Bathroom:  </div> </td>
                                 <td className="tableCol"><div class='tablecard'>(Both bathrooms has individual Heater) <br></br>
                                 Bathroom 1 – 6.6 * 4.6 <br></br>
                                 Bathroom 2 – 8 * 4.6
                                 </div> 
                                 </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                 <td className="tableCol"><div class='tablecard'>Room Size: </div> </td>
                                 <td className="tableCol"><div class='tablecard'>33 * 15 feet </div> </td>
                            </tr>
                            </table>
                    </Card.Body>
                 </Card>
            </div>
           
        </div>
       
        </section>
    </div>
  )
}
