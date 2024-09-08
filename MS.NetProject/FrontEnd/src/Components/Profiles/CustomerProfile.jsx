import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../AgentHome/AgentHome.module.css'; 

import { GetSingle, GetSingleUser } from '../../APICallFunction/AgentFunction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getToken, storeToken } from '../../APICallFunction/UserFunction';

const AgentHome = () => {
  const {agId} = useParams();
  const [agent, setAgent] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    AgentFecth();
  },[])

  const AgentFecth = async() => {
    console.log(getToken());
    try {
      const res = await GetSingleUser(agId);
      console.log(res.data); 
      
        
      setAgent(res.data);
      
    } catch (error) {
      console.log("Error =>"+error);
     // navigate('/agent');
      
    }
}
  return (
    <div>
      
   
    <div className={styles.agentContainer + ' mt-4'}>
      <div><h1 className={styles.agentTitle + ' text-center mb-4'}>Customer's Profile</h1></div>
      <div className="row justify-content-center">
     
          <div className="col-12 mb-4" key={agent.id}>
            <div className={styles.agentDetailsCard}>
              <img className={styles.agentDetailsImg} src='/Images/cus.jpeg' alt="Card" />
              <div className={styles.agentDetailsBody}>
                <h4 className={styles.agentDetailsTitle}>User Name: {agent.name}</h4>
                <h6 className={styles.agentDetailsTitle1}>Email : {agent.email}</h6>
                <p className={styles.agentDetailsText}>Address: {agent.address}</p>
                <p className={styles.agentDetailsText}>Username: {agent.username}</p>
                <p className={styles.agentDetailsText}>Call : {agent.phoneNumber}</p>
                
                <Link to={`/agentorders`} className="btn btn-primary">Back</Link>
              </div>
            </div>
          </div>
        
      </div>
    </div>
   
    </div>
  );
};

export default AgentHome;

