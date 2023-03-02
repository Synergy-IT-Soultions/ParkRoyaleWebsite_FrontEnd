import { Component } from "react";
import _ from "lodash";
import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

class RoomPricingSwiperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
        this.createSlide = this.createSlide.bind(this);
    }

    createSlide(slide) {
        return <div key={slide.containerDivId} className="swiper-slide">
        <div className="box">
            <h3>{slide.containerHeader}</h3>
            <img src={slide.containerImageInfo[0].imageInfo.imageURL}/>
            <div>
                <ul>
                    <li>{slide.containerTextInfo[0].containerTextLabelName +":"+slide.containerTextInfo[0].containertextLabelValue}</li>
                    <li>{slide.containerTextInfo[0].containertextLabelValue}</li>
                </ul>
            </div>
            {/* <div className="btn-wrap">
                <a href="#" className="btn-buy">Buy Now</a>
            </div> */}
        </div>
    </div>;
    }

    componentDidMount(){
        new Swiper('.testimonials-slider', {
            modules: [Navigation, Pagination, Scrollbar],
            speed: 600,
            loop: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 40
              },
        
              1200: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }
          });
    }

    render() {
        const { data } = this.props;
        
        return (
            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-wrapper">
                {
                    _.map(data, (dataObj)=>{
                        return this.createSlide(dataObj);
                    })
                }
                    

                </div>
                <div className="swiper-pagination"></div>
            </div>
        );
    }
}

export default RoomPricingSwiperComponent;