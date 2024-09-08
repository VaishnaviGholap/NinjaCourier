import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './CustomerHome.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAgent } from '../../APICallFunction/AgentFunction';
import { Button } from 'react-bootstrap';


const CustomerHome = () => {
  const [agentsData, setAgents] = useState([]);
  const [studentId, agentId] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    getAllAgents();
  },[])

  const getAllAgents = async() => {
    try {
      const res = await GetAgent();
    console.log(res);
    setAgents(res.data);
    } catch (error) {
      console.log("error h bhai "+error);
      navigate('/customer');
      
    }
  }

 

  return (
    <div>
      <Navbar />
    <div className="container mt-4">
      <div className="row">
        
        {agentsData.map((item, index) => {
        const imageIndex = (index % 10) + 1; 
        
        return (
          <div className="col-md-4 mb-4" key={item.agentId}>
            <div className="card" style={{ width: '20rem' }}>
              <img className="card-img-top" src={`/Images/${imageIndex}.jpg`} alt="Card" />
              <div className="card-body1">
                <h5 className="card-title">Company: {item.companyName}</h5>
                <p className="card-text">Address: {item.address}</p>
                <p className="card-text">Ratings: {item.ratings}/5</p>
                <p className="card-text">Call: {item.phoneNumber}</p>
                <Button variant='primary' style={{ marginBottom:'10px',width:'50%' }} onClick={()=>{
                                            navigate(`/agentProfile/${item.agentId}`);
                                        }}>View Profile</Button>
                
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CustomerHome;

