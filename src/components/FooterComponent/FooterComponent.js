function FooterComponent() {
    return (
        <footer id="footer">
            <div className="footer-top">  
            </div>

            <div className="container">
                <div className="copyright-wrap d-md-flex py-4">
                    <div className="me-md-auto text-center text-md-start">
                        <div className="copyright">
                            &copy; Copyright <strong><span>Synergy IT Solutions and Services</span></strong>. All Rights Reserved
                        </div>
                    </div>
                    <div className="social-links text-center text-md-right pt-3 pt-md-0">
                        <a href="https://wa.me/919154546666" className="whatsapp" target="_blank"><i className="bx bxl-whatsapp"></i></a>
                        <a href="https://wa.me/919444432828" className="whatsapp" target="_blank"><i className="bx bxl-whatsapp"></i></a>
                        <a href="https://www.facebook.com/people/Park-Royale/100070181315115" className="facebook" target="_blank"><i className="bx bxl-facebook"></i></a>
                        <a href="https://www.instagram.com/parkroyalekodaikanal/" className="instagram" target="_blank"><i className="bx bxl-instagram"></i></a>
                    </div>
                </div>

            </div>
        </footer>
    );

}

export default FooterComponent;