import React from 'react'
import Card from 'react-bootstrap/Card';
import "./CarouselComponent.css"


export const CarouselCardComponent = ({id, name, description, updatedDate, deleteImage, thumbnailURL}) => {
  return (
    <div>

        <Card className="mx-auto my-3 text-white mb-2 rounded">
            <Card.Header>
            <div class="d-flex" >

                    <div >
                          <i class="fa fa-fw fa-trash" onClick={deleteImage.bind(this, [id])}></i>
                    </div>
                    <div className='cardHeader'>
                         {name}
                    </div>
            </div>
            </Card.Header>
            <Card.Img variant="top"  src={thumbnailURL} className="cover"  />
            <Card.Body>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="cardFooter">
                <small className="text-white">{"Uploaded Date: "+updatedDate}</small>
            </Card.Footer>
            </Card>

    </div>
  )
}
