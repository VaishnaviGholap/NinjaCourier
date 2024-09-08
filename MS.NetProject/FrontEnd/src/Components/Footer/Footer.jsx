import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer mt-auto" style={{ width: '100%' }}>
      <div className="container">
        <div className="row align-items-center">
       
          <div className="col-md-4 mb-4 text-center">
            <h6 className="text-uppercase fw-bold">
              <FontAwesomeIcon icon={faGem} /> Courier Service
            </h6>
            <div id="txt">
              <p>To provide reliable and efficient courier services, ensuring timely delivery and customer satisfaction.</p>
            </div>
          </div>

       
          <div className="col-md-4 mb-4 text-center">
            <h6 className="text-uppercase fw-bold">Our Services</h6>
            <ul className="list-unstyled">
              <li>Tracking</li>
              <li>Fast Delivery</li>
              <li>Instant Booking</li>
              <li>Premium Service</li>
            </ul>
          </div>

   
          <div className="col-md-4 mb-4 text-center">
            <div id="link">
              <h6 className="text-uppercase fw-bold">Useful Links</h6>
              <ul className="list-unstyled">
                <li><a href="adminHome" className="text-reset">Home</a></li>
                <li><a href="Aboutus" className="text-reset">About Us</a></li>
                <li><a href="submitFeed" className="text-reset">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <img src="https://cdn-icons-gif.flaticon.com/11688/11688604.gif" alt="GIF Icon" style={{ width: '50px', height: '50px' }} />
          <img src="https://cdn-icons-gif.flaticon.com/9820/9820045.gif" alt="GIF Icon" style={{ width: '50px', height: '50px' }} />
          <img src="https://cdn-icons-gif.flaticon.com/15309/15309712.gif" alt="GIF Icon" style={{ width: '50px', height: '50px' }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;