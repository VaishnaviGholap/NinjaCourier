import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AgentHome.module.css'; 
import AgentNav from '../AgentNav/AgentNav';
import Footer from '../Footer/Footer';
import { GetSingle } from '../../APICallFunction/AgentFunction';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const AgentHome = () => {
  const agID = sessionStorage.getItem('agent');
  const [agent, setAgent] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    AgentFecth();
  },[])

  const AgentFecth = async() => {
    try {
      console.log(getToken());
      const res = await GetSingle(agID);
    console.log(res.data);
    
    setAgent(res.data);
    } catch (error) {
      console.log(error);
     navigate('/agent');
    }
}
  return (
    <div>
      <AgentNav/>
   
    <div className={styles.agentContainer + ' mt-4'}>
      <div><h1 className={styles.agentTitle + ' text-center mb-4'}>YOUR PROFILE</h1></div>
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
                
                <Link to={`/agentorders`} className="btn btn-primary">View Orders</Link>
              </div>
            </div>
          </div>
        
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AgentHome;

