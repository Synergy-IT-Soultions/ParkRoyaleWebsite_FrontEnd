import { Component } from "react";
import _ from "lodash";
import './ImageGalleryComponent.css'
import cmClient from "../../clients/ContentManagementClient";
import AOS from 'aos'
import 'aos/dist/aos.css'
import Isotope from "isotope-layout";
import GalleryHeaderComponent from "./GalleryHeaderComponent";
import GalleryTabsComponent from "./GalleryTabsComponent";
import SpinnerComponent from "../../CommonComponents/SpinnerComponent/SpinnerComponent";

class ImageGalleryComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true }
    this.loadData = this.loadData.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  createCard(imageCard){
    return <div className="col-lg-4 col-md-6 portfolio-item filter-app" key={imageCard.imageInfo.imageInfoId}>
        <div className="portfolio-wrap">
          <img src={imageCard.imageInfo.imageURL} className="img-fluid" alt="" />
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

  loadData(event) {

    const { id } = this.props;
    // let id = "sandr-room-gallery-id";
    // if(event){
    //   id = event.target.id;
    // }

    // cmClient.get('/content/get/container/group-details/'+id)
    //     //.then(response => console.log(response))
    //     .then(response => this.setState({ data: response.data , isLoading:false}))
    //     .catch(error => console.log(error));

    cmClient.get('/content/get/container/group-details/'+id)
      //.then(response => console.log(response))
      .then(response => this.setState({ data: response.data, isLoading: false }))
      .catch(error => console.log(error));

  }

  componentDidMount() {
    this.loadData();
      /**
     * Initiate portfolio lightbox 
     */
      // const portfolioLightbox = GLightbox({
      //   selector: '.portfolio-lightbox'
      // });
      //window.addEventListener('load', () => {
        let portfolioContainer = this.select('.portfolio-container');
        if (portfolioContainer) {
          // let portfolioIsotope = new Isotope(portfolioContainer, {
          //   itemSelector: '.portfolio-item'
          // });
    
          let portfolioFilters = this.select('#portfolio-flters li', true);
    
          this.on('click', '#portfolio-flters li', function(e) {
            e.preventDefault();
            portfolioFilters.forEach(function(el) {
              el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');
    
            // portfolioIsotope.arrange({
            //   filter: this.getAttribute('data-filter')
            // });
            // portfolioIsotope.on('arrangeComplete', function() {
            //  AOS.refresh()
            // });
          }, true);
        }
    
      //});

  }

  on = (type, el, listener, all = false) => {
    let selectEl = this.select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  render() {
    const { id } = this.props;
    let galleryData = this.state.data;

    const headerObject = galleryData && _.filter(galleryData, (obj)=> _.isEqual(id, obj.containerDivId));
    const galleryTabs = galleryData && _.filter(galleryData, (obj)=> !_.isEqual(id, obj.containerDivId));

       

    let images = [];
        _.forEach(galleryTabs, (tab)=>{
            tab.containerImageInfo && _.forEach(tab.containerImageInfo, (item)=>{
                images.push(item);
            })
        })

        images = _.filter(images, (item) => {
             return _.isEqual(item.imageInfo.imageIsActive, 1);
        });
      
    return (

      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">

          {
            _.isEmpty(galleryData)?<SpinnerComponent/>:
            <GalleryHeaderComponent headerData={headerObject[0]} loadData={this.loadData}/>
            
          }
          {
            _.isEmpty(galleryData)?<SpinnerComponent/>:
            <GalleryTabsComponent images={images} tabsData = {galleryTabs} loadData={this.loadData}/>
          }
        </div>
      </section>
    );
  }
}

export default ImageGalleryComponent;