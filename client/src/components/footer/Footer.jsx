import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="text-center text-lg-start bg-dark text-light">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="*" className="me-4 text-reset">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="*" className="me-4 text-reset">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="*" className="me-4 text-reset">
              <i className="fab fa-google"></i>
            </a>
            <a href="*" className="me-4 text-reset">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="*" className="me-4 text-reset">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="*" className="me-4 text-reset">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Booking app
                </h6>
                <p>
                Make your traveling the best time in your life.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Travel</h6>
                <p>
                  <a href="#!" className="text-reset">
                  Cities
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  Regions
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  Airports
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  Hotels
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Services</h6>
                <p>
                  <a href="#!" className="text-reset">
                  Homes
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  Apartments 
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  Resorts
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                  Villas
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3"></i> HCM city, Tan Phu District, 12 Trinh Dinh Thao st
                </p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  info@example.com
                </p>
                <p>
                  <i className="fas fa-phone me-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default Footer;
