import React, { useEffect, useState } from 'react';
import './TrackOrder.css';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const TrackCourierForm = () => {
    const [trk, setTrk] = useState('');
    const [error, setError] = useState('');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (trk === '') {
            setError('Tracking number is required');
            

        } else {
            setError('');
            // Handle form submission
            console.log('Tracking number:', trk);
            navigate(`/tarckdetails/${trk}`);
        }
    };

    return (
        <div className="center-form">
            <div className="form-container">
                <h2 className="track-courier-heading">Track Your Courier</h2>
                <hr className="heading-line" />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="trk" className="control-label" style={{fontSize:'18px'}}>Tracking Number</label>
                        <input 
                            type="text"
                            id="trk"
                            className="form-control"
                            value={trk}
                            onChange={(e) => setTrk(e.target.value)}
                        />
                        {error && <span className="text-danger">{error}</span>}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Track" className="btn btn-primary" />
                    </div>
                    <div className='backbtn'>
                    
                    <Link to="/customer-home" className="btn btn-success ml-2">Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrackCourierForm;
