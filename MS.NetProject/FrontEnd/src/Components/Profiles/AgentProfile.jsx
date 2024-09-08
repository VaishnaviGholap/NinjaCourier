import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../AgentHome/AgentHome.module.css'; 

import { GetSingle } from '../../APICallFunction/AgentFunction';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AgentHome = () => {
  const {agId} = useParams();
  const [agent, setAgent] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    AgentFecth();
  },[])

  const AgentFecth = async() => {
    try {
      const res = await GetSingle(agId);
    setAgent(res.data);

    } catch (error) {
      navigate('/customer');
    }
  }
  return (
    <div>
      
   
    <div className={styles.agentContainer + ' mt-4'}>
      <div><h1 className={styles.agentTitle + ' text-center mb-4'}>Agent's Profile</h1></div>
      <div className="row justify-content-center">
        
          <div className="col-12 mb-4" key={agent.id}>
            <div className={styles.agentDetailsCard}>
              <img className={styles.agentDetailsImg} src='/Images/agent1.jpg' alt="Card" />
              <div className={styles.agentDetailsBody}>
                <h4 className={styles.agentDetailsTitle}>Company: {agent.companyName}</h4>
                <h6 className={styles.agentDetailsTitle1}>Agent Name: {agent.agentName}</h6>
                <p className={styles.agentDetailsText}>Address: {agent.address}</p>
                <p className={styles.agentDetailsText}>Ratings: {agent.ratings}/5</p>
                <p className={styles.agentDetailsText}>Call: {agent.phoneNumber}</p>
                
                <Link to={`/customer-home`} className="btn btn-primary">Back</Link>
              </div>
            </div>
          </div>
        
      </div>
    </div>
   
    </div>
  );
};

export default AgentHome;

