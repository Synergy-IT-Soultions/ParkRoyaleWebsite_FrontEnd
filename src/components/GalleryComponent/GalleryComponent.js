import { Component } from "react";
import _ from "lodash";
import './GalleryComponent.css'
import cmClient from "../../clients/ContentManagementClient";
import AOS from 'aos'
import 'aos/dist/aos.css'
import Isotope from "isotope-layout";

class GalleryComponent extends Component {

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

    let id = "sandr-room-gallery-id";
    if(event){
      id = event.target.id;
    }

    // cmClient.get('/content/get/container/group-details/'+id)
    //     //.then(response => console.log(response))
    //     .then(response => this.setState({ data: response.data , isLoading:false}))
    //     .catch(error => console.log(error));

    cmClient.get('/content/get/container/details/'+id)
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

    let imageCards = _.cloneDeep(this.state.data.containerImageInfo);
    imageCards = _.filter(imageCards, (item) => {
            return _.isEqual(item.imageInfo.imageIsActive, 1);
    });
      
    return (

      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">

          <div className="section-title">
            <h2>Gallery</h2>
            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
          </div>

          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li data-filter="*" className="filter-active" id="sandr-room-gallery-id" onClick={this.loadData}>Suits and Rooms</li>
                <li data-filter=".filter-app" id="rest-gallery-id" onClick={this.loadData}>Restaurants</li>
                <li data-filter=".filter-card" id="rec-gallery-id" onClick={this.loadData}>Recreations</li>
                <li data-filter=".filter-web" id="tandt-gallery-id" onClick={this.loadData}>Tours and Travels</li>
              </ul>
            </div>
          </div>

          <div className="row portfolio-container">

            {
              imageCards.map(image =>
                this.createCard(image)
              )
            }

          </div>

        </div>
      </section>
    );
  }
}

export default GalleryComponent;