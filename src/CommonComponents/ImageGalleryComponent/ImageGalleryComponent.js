import { Component } from "react";
import _ from "lodash";
// import required modules
import { Zoom, Navigation, Pagination } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { connect } from "react-redux";

import { hidePageLoader, showPageLoader } from "../../utils/ReduxActions";


class ImageGalleryComponent extends Component {
    constructor(props) {
        super(props);
        this.createSlide = this.createSlide.bind(this);
    }

    componentDidMount() {
    }

    createSlide(image){
       return  <SwiperSlide>
                        <div className="swiper-zoom-container">
                            <img src={image} />
                        </div>
                </SwiperSlide>;
    }

    render() {
        const { images } = this.props;

        return (
            <>
                <Swiper
                    style={{
                        "--swiper-navigation-color": "#5846f9",
                        "--swiper-pagination-color": "#5846f9",
                    }}
                    loop={true}
                    zoom={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Zoom, Navigation, Pagination]}
                    className="mySwiper"
                >

                    {
                         _.map(images, (image)=>{
                            return this.createSlide(image);
                        })
                    }
                   
                </Swiper>
            </>
        );
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
        showLoginModalDispatcher: (value) => dispatch({ type: "SHOW_LOGIN", showLoginModal: value })
    }
};

export default connect(mapStateToPros, mapDispatchToProps)(ImageGalleryComponent);
