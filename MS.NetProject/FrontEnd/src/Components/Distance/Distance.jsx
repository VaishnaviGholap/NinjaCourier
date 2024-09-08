import React, { useState, useEffect } from 'react';
import './Distance.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { GetAgent } from '../../APICallFunction/AgentFunction';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const Distance = () => {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [, setAutocompleteFrom] = useState(null);
  const [, setAutocompleteTo] = useState(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [output, setOutput] = useState('');
  const [showOrderButton, setShowOrderButton] = useState(false); // New state to control order button visibility

  const [agentsData, setAgents] = useState([]);
  const navigate = useNavigate();
  const [distance, setDistance] = useState();
  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBeOYuSUlVB9d4S6zc6pyK4WXvV4cSv3Kg&libraries=places`;
      script.async = true;
      script.onload = () => initializeMap();
      document.body.appendChild(script);
    };
    tokenCheck();
    loadGoogleMaps();

  }, []);

  
   
    
  
    const tokenCheck = ()=>{
      const token = getToken();
      if(!token){
        console.log("123");
        //navigate('/')
        
      }
    }

  const initializeMap = () => {
    if (!window.google) return;

    const myLatLng = { lat: 38.346, lng: -0.4907 };

    const mapOptions = {
      center: myLatLng,
      zoom: 7,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    };

    const map = new window.google.maps.Map(document.getElementById('googleMap'), mapOptions);
    setMap(map);

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    setDirectionsService(directionsService);
    setDirectionsRenderer(directionsRenderer);

    const input1 = document.getElementById('from');
    const autocomplete1 = new window.google.maps.places.Autocomplete(input1);
    setAutocompleteFrom(autocomplete1);

    const input2 = document.getElementById('to');
    const autocomplete2 = new window.google.maps.places.Autocomplete(input2);
    setAutocompleteTo(autocomplete2);

    autocomplete1.addListener('place_changed', () => {
      const place = autocomplete1.getPlace();
      if (place.geometry) {
        setFrom(place.formatted_address);
      }
    });

    autocomplete2.addListener('place_changed', () => {
      const place = autocomplete2.getPlace();
      if (place.geometry) {
        setTo(place.formatted_address);
      }
    });
  };

  const getAllAgents = async() => {
    try {
      const res = await GetAgent();
    console.log(res);
    setAgents(res.data);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      navigate('/customer');
    }
  }

  const calcRoute = () => {
    if (!directionsService || !directionsRenderer) return;

    
    const request = {
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.IMPERIAL,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDistance(result.routes[0].legs[0].distance.value);
        setOutput(
          `<div class='alert-info'>From: ${from}.<br />To: ${to}.<br /> Driving distance <i class='fas fa-road'></i> : ${result.routes[0].legs[0].distance.text}.<br />Duration <i class='fas fa-hourglass-start'></i> : ${result.routes[0].legs[0].duration.text}.</div>`
          
        );
        getAllAgents();
        directionsRenderer.setDirections(result);
        setShowOrderButton(true); // Show the "Place Order" button after successful route calculation
      } else {
        directionsRenderer.setDirections({ routes: [] });
        map.setCenter({ lat: 38.346, lng: -0.4907 });
        setOutput(
          "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not Retrieve</div>"
        );
        // Save data to sessionStorage
        

        setShowOrderButton(false); // Hide the "Place Order" button if route calculation fails
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="containerDist">
        <div className="form-section">
          <h1 className='text'>Enter your Locations</h1>
          <br></br>
        
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="from" className='form-label'>From Location:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Origin Location"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
          
          <br></br>
            <div className="form-group">
              <label htmlFor="to" className='form-label'>To Location:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Destination Location"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button type="button" className="btn btn-info btn-lg" id='abc' onClick={calcRoute}>
                View Distance
              </button>
            </div>
          </form>

          <div id="output" dangerouslySetInnerHTML={{ __html: output }}></div>

          {showOrderButton && (
            <div className="order-section">
              <br></br>
              
            </div>
          )}
        </div>

        <div className="map-section">
          <div id="googleMap"></div>
        </div>
      </div>
      <br></br>
      <div className="container mt-4">
      <div className="row">
        
        {agentsData.map((item, index) => {
        // Calculate the image index using modulo to reset after 5
        const imageIndex = (index % 10) + 1; // Assuming image files are named 1.jpg, 2.jpg, ..., 5.jpg
        const inr = (distance/5000 * imageIndex).toFixed(2)
        return (
          <div className="col-md-4 mb-4" key={item.agentId}>
            <div className="card" style={{ width: '20rem' }}>
              <img className="card-img-top" src={`/Images/${imageIndex}.jpg`} alt="Card" />
              <div className="card-body1">
                <h5 className="card-title">Company: {item.companyName}</h5>
                <p className="card-text">Address: {item.address}</p>
                <p className="card-text">Ratings: {item.ratings}/5</p>
                <p className="card-text">Call: {item.phoneNumber}</p>
               
                <Button variant='primary' style={{ marginBottom:'10px' }} onClick={()=>{
                  sessionStorage.setItem('inr', inr);
                  sessionStorage.setItem('agID', item.agentId);
                                            navigate(`/order/${from}/${to}`);
                                        }}>Price : ₹{inr}</Button>
                
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Distance;





