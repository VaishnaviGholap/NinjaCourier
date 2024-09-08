import React, { useEffect } from 'react';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutUs.css';
import corosel2 from './corosel2.jpg';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const AboutUs = () => {

   
        const navigate = useNavigate();
        useEffect(()=>{
          tokenCheck();
        },[])
      
        const tokenCheck = ()=>{
          const token = getToken();
          if(!token){
            navigate('/customer')
          }
        }
    return (
        <div>
            <Navbar/>
        <div style={{ backgroundColor: '#a0b7d976' }}>
            <div className="about-us1">
                <Container>
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://png.pngtree.com/thumb_back/fh260/background/20220215/pngtree-flat-delivery-banner-poster-background-image_924442.jpg" alt="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={corosel2} alt="Second slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={corosel2} alt="Third slide" />
                        </Carousel.Item>
                    </Carousel>

                    <h1 className="text-center mt-5">About Us</h1>

                    <div className="upperbody">
                        <div className="mission-vision mb-5">
                            <Row>
                                <Col md={6} className="d-flex align-items-stretch">
                                    <Card className="mb-3 flex-fill">
                                        <Card.Body>
                                            <Card.Title>Our Mission</Card.Title>
                                            <Card.Text>
                                                To provide fast, reliable, and efficient courier services to our customers, ensuring their parcels reach their destinations on time and in perfect condition. We are dedicated to exceeding customer expectations through continuous improvement and innovation in our delivery processes. Our mission is to create a seamless and hassle-free shipping experience by leveraging state-of-the-art technology and maintaining a highly trained and motivated workforce. We prioritize sustainability and environmental responsibility in our operations.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <img className="card-img-top" src="https://imcuae.com/wp-content/uploads/2017/09/Our-Mission.jpg" alt="Mission" style={{ borderRadius: '10px', height: '100%', width: '100%' }} />
                                </Col>
                            </Row>
                        </div>
                        <div className="mission-vision mb-5 mt-5">
                            <Row>
                                <Col md={6}>
                                    <img className="card-img-top" src="https://navigatemc.com/wp-content/uploads/2018/08/Vision-compass.jpg" alt="Vision" style={{ borderRadius: '10px', height: '100%', width: '100%' }} />
                                </Col>
                                <Col md={6} className="d-flex align-items-stretch">
                                    <Card className="mb-3 flex-fill">
                                        <Card.Body>
                                            <Card.Title>Our Vision</Card.Title>
                                            <Card.Text>
                                                Our vision is to lead the industry with unparalleled service quality, setting new standards for speed, reliability, and efficiency. We aspire to be at the forefront of technological advancements, continuously integrating cutting-edge solutions to enhance our delivery processes. By fostering a customer-centric approach, we aim to build a global network that seamlessly connects people and businesses, empowering them to thrive in a dynamic and interconnected world. Aiming to reduce our carbon footprint while delivering exceptional service.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className="values mb-5">
                        <h2 className="text-center mb-4">Our Values</h2>
                        <Row>
                            <Col md={4}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Reliability</Card.Title>
                                        <Card.Text>
                                            We ensure timely and safe delivery of packages with utmost reliability. Our dedicated team works around the clock to monitor each shipment, guaranteeing that every package arrives at its destination without delays or damages.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Customer Focus</Card.Title>
                                        <Card.Text>
                                            Our customers are at the heart of everything we do, and we strive to exceed their expectations. We actively seek and value customer feedback to continuously improve our services and ensure a personalized experience for each client.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Innovation</Card.Title>
                                        <Card.Text>
                                            We embrace technology and innovation to enhance our services and provide better solutions. By investing in cutting-edge tools and systems, we streamline operations, improve efficiency, and offer real-time tracking and updates to our customers.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div className="team mb-5">
                        <h2 className="text-center mb-4">Meet the Team</h2>
                        <Row>
                            <Col md={4}>
                                <Card className="team-member mb-3">
                                    <Card.Body>
                                        <Card.Title>Abdul Samad</Card.Title>
                                        <Card.Text>Space</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="team-member mb-3">
                                    <Card.Body>
                                        <Card.Title>Aman</Card.Title>
                                        <Card.Text>Los Angeles</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="team-member mb-3">
                                    <Card.Body>
                                        <Card.Title>Vipul Kandge</Card.Title>
                                        <Card.Text>Chicago</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col md={6}>
                                <Card className="team-member mb-3">
                                    <Card.Body>
                                        <Card.Title>Vaishnavi Gholap</Card.Title>
                                        <Card.Text>New York</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="team-member mb-3">
                                    <Card.Body>
                                        <Card.Title>Sachin Ahire</Card.Title>
                                        <Card.Text>Los Angeles</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div className="testimonials mb-5">
                        <h2 className="text-center mb-4">What Our Customers Say</h2>
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">"The Courier Service Portal has transformed our delivery process. Their reliability and efficiency are unmatched. Highly recommended!"</p>
                        </blockquote>
                    </div>
                </Container>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default AboutUs;