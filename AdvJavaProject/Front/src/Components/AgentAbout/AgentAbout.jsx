
import React from 'react';
import './AgentAbout.css';
import AgentNav from '../AgentNav/AgentNav'
import Footer from '../Footer/Footer';

const AboutUs = () => {
  return (
    <div>
      <AgentNav/>
    <div className="about-us-container">
      <header className="about-us-header">
        <div className="about-us-gif-image"></div>
        <h1 className="about-us-company-name" style={{ fontFamily: 'cursive', color: 'black',textDecoration:'underline'}}>NinjaCourier</h1>
      </header>

      <section className="about-us-mission">
        <h2 className="about-us-heading">Our Mission</h2>
        <p className="about-us-text">
          To provide fast, reliable, and efficient courier services to our customers, ensuring their parcels reach their destinations on time and in perfect condition. We are dedicated to exceeding customer expectations through continuous improvement and innovation in our delivery processes. Our mission is to create a seamless and hassle-free shipping experience by leveraging state-of-the-art technology and maintaining a highly trained and motivated workforce. We prioritize sustainability and environmental responsibility in our operations.
        </p>
      </section>

      <section className="about-us-vision">
        <h2 className="about-us-heading">Our Vision</h2>
        <p className="about-us-text">
          Our vision is to lead the industry with unparalleled service quality, setting new standards for speed, reliability, and efficiency. We aspire to be at the forefront of technological advancements, continuously integrating cutting-edge solutions to enhance our delivery processes. By fostering a customer-centric approach, we aim to build a global network that seamlessly connects people and businesses, empowering them to thrive in a dynamic and interconnected world. Aiming to reduce our carbon footprint while delivering exceptional service.
        </p>
      </section>

      <section className="about-us-values">
        <h2 className="about-us-heading">Our Values</h2>

        <div className="about-us-value">
          <h3 className="about-us-subheading">Reliability</h3>
          <p className="about-us-text">
            We ensure timely and safe delivery of packages with utmost reliability. Our dedicated team works around the clock to monitor each shipment, guaranteeing that every package arrives at its destination without delays or damages.
          </p>
        </div>

        <div className="about-us-value">
          <h3 className="about-us-subheading">Customer Focus</h3>
          <p className="about-us-text">
            Our customers are at the heart of everything we do, and we strive to exceed their expectations. We actively seek and value customer feedback to continuously improve our services and ensure a personalized experience for each client.
          </p>
        </div>

        <div className="about-us-value">
          <h3 className="about-us-subheading">Innovation</h3>
          <p className="about-us-text">
            We embrace technology and innovation to enhance our services and provide better solutions. By investing in cutting-edge tools and systems, we streamline operations, improve efficiency, and offer real-time tracking and updates to our customers.
          </p>
        </div>
      </section>

      <section className="about-us-team">
        <h2 className="about-us-heading">Meet the Team</h2>
        <ul className="about-us-team-list">
          <li className="about-us-team-member">Abdul Samad Sheakh</li>
          <li className="about-us-team-member">Aman</li>
          <li className="about-us-team-member">Vipul Kandge</li>
          <li className="about-us-team-member">Vaishnavi Gholap</li>
          <li className="about-us-team-member">Sachin Ahire</li>
        </ul>
      </section>

      <section className="about-us-testimonials">
        <h2 className="about-us-heading">What Our Customers Say</h2>
        <blockquote className="about-us-quote">
          "The Courier Service Portal has transformed our delivery process. Their reliability and efficiency are unmatched. Highly recommended!"
        </blockquote>
      </section>
    </div>
   <Footer/>
   <br></br>
    </div>
  );
};

export default AboutUs;
