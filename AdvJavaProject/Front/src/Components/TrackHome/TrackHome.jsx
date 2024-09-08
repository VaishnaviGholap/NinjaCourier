
import React, { useEffect, useState } from 'react';
import './TrackHome.css';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';

const TrackHome = () => {
    const [trk, setTrk] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   

    const tokenCheck = () => {
        const token = getToken();
        if (!token) {
            navigate('/customer');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (trk === '') {
            setError('Tracking number is required');
        } else {
            setError('');
         
            console.log('Tracking number:', trk);
            navigate(`/tarckdetails/${trk}`);
        }
    };

    return (
        <div className="track-courier-center-form">
            <div className="track-courier-form-container">
                <h2 className="track-courier-heading">Track Your Courier</h2>
                <hr className="track-courier-heading-line" />
                <form onSubmit={handleSubmit}>
                    <div className="track-courier-form-group">
                        <label htmlFor="trk" className="track-courier-control-label" style={{fontSize:'25px'}}>Tracking Number :</label>
                        <input 
                            type="text"
                            id="trk"
                            className="track-courier-input-control"
                            value={trk}
                            onChange={(e) => setTrk(e.target.value)}
                             placeholder="Enter your tracking ID"
                        />
                        {error && <span className="track-courier-text-danger">{error}</span>}
                    </div>
                    <div className="track-courier-form-group">
                        <input type="submit" value="Track" className="track-courier-btn-primary" />
                        <Link to="/customer-home" className="track-courier-btn-success">Back to Home</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrackHome;

