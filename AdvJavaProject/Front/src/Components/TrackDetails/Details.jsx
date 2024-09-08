import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Details.css'; 
import { Tracking } from '../../APICallFunction/UserFunction';

const Details = () => {

    const [track, setData] = useState([]);
    const { trk } = useParams();
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    useEffect(()=>{
        getTrack()
    },[])

    const getTrack = async ()=>{
         try
         {
            const res = await Tracking(trk);
            console.log(res.data);
            
            if(res.status === 200){
                setData(res.data);
            }
            else{
                setErr('No Record Found. Please Check Again');

            }
        
         } catch (error) {
           //navigate('/customer')
              console.log(error);
            
         }
    }

    
  return (
    <div className="cardDetail" style={{ marginTop: '50px'}}>
      <div className="card-header" style={{backgroundColor:' rgb(190, 186, 186)',alignItems:'center'}}>
        <h4 style={{fontSize:'50px'}}>Track Details</h4>
      </div>
      <div className="card-body">
        <dl className="row">
          <dt className="col-sm-3">Id :</dt>
          <dd className="col-sm-9">{track.id}</dd>

          <dt className="col-sm-3">Name :</dt>
          <dd className="col-sm-9">{track.name}</dd>

          <dt className="col-sm-3">Email :</dt>
          <dd className="col-sm-9">{track.email}</dd>

          <dt className="col-sm-3">Phone :</dt>
          <dd className="col-sm-9">{track.phoneNumber}</dd>

          <dt className="col-sm-3">Pick Up :</dt>
          <dd className="col-sm-9">{track.pickup}</dd>

          <dt className="col-sm-3">Destination :</dt>
          <dd className="col-sm-9">{track.destination}</dd>

          <dt className="col-sm-3">Created Date :</dt>
          <dd className="col-sm-9">{track.oDate}</dd>

          <dt className="col-sm-3">Delivery Date :</dt>
          <dd className="col-sm-9">{track.dDate}</dd>

          <dt className="col-sm-3">Tracking Number :</dt>
          <dd className="col-sm-9">{track.trackingID}</dd>
        </dl>
      </div>
      <div className="card-footer text-muted">
      <Link to="/track-order" className="btn btn-primary" style={{width: '120px'}}>Back</Link>
      <Link to="/customer-home" className="btn btn-primary">Back to Home</Link>
        
      </div>
    </div>
  );
};

export default Details



