import { Component } from "react";
import _ from "lodash";

class GalleryTabsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: props.images,
            filteredImages: props.images
        }

        
    }

    // shouldComponentUpdate(nextProps, nextState){

    // }

    createTab = (tab)=>{
        return <li data-filter="*" id={tab.containerDivId} key={tab.containerDivId} onClick={this.tabClicked}>{tab.containerHeader}</li>;
    }

    tabClicked = (event)=>{
        console.log(event);
        let portfolioFilters = this.select('#portfolio-flters li', true);
        portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
        let ele = event.target;
        ele.classList.add("filter-active");
    }

    select = (el, all = false) => {
        el = el.trim()
        if (all) {
          return [...document.querySelectorAll(el)]
        } else {
          return document.querySelector(el)
        }
      }

    createCard = (imageCard)=>{
        return <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={imageCard.imageInfo.imageInfoId}>
            <div className="portfolio-wrap">
              <img src={imageCard.imageInfo.thumbnailURL} className="img-fluid" alt="" />
              <div className="portfolio-info">
                <h4>App 1</h4>
                <p>App</p>
              </div>
              <div className="portfolio-links">
                <a href={imageCard.imageInfo.imageURL} data-gallery="portfolioGallery" className="portfolio-lightbox" title="App 1"><i className="bx bx-plus"></i></a>
                {/* <a href="portfolio-details.html" title="More Details"><i className="bx bx-link"></i></a> */}
              </div>
            </div>
          </div>;
      }

    

    render() {
        const { tabsData } = this.props;
        const { filteredImages } = this.state;
        // let images = [];
        // _.forEach(tabsData, (tab)=>{
        //     tab.containerImageInfo && _.forEach(tab.containerImageInfo, (item)=>{
        //         images.push(item);
        //     })
        // })

        // images = _.filter(images, (item) => {
        //      return _.isEqual(item.imageInfo.imageIsActive, 1);
        // });

        return (
            <>
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <ul id="portfolio-flters">
                            {/* <li data-filter="*" className="filter-active" id="sandr-room-gallery-id" onClick={this.loadData}>Suits and Rooms</li>
                            <li data-filter=".filter-app" id="rest-gallery-id" onClick={this.loadData}>Restaurants</li>
                            <li data-filter=".filter-card" id="rec-gallery-id" onClick={this.loadData}>Recreations</li>
                            <li data-filter=".filter-web" id="tandt-gallery-id" onClick={this.loadData}>Tours and Travels</li> */}
                            {
                                tabsData.map(tab =>
                                    this.createTab(tab)
                                )
                            }
                        </ul>
                    </div>
                </div>

                <div className="row portfolio-container">

                    {   
                        filteredImages.map(image =>
                            this.createCard(image)
                        )
                    }

                </div>
            </>
        );
    }
}

export default GalleryTabsComponent;