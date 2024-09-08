import React, { useEffect, useState } from 'react';
import { OTPUser } from '../../APICallFunction/UserFunction';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const username = sessionStorage.getItem('user');

  useEffect(()=>{
    checkUsername();
  })

  const checkUsername = ()=>{
    if(!username){
      navigate('/customer');
    }
  }
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join('');
    console.log('OTP Submitted:', otpCode);

    const otpPayload = { otp: otpCode };

    try {
      const response = await OTPUser(username, otpPayload);
      console.log(response);

      if (response.status === 200) {
        navigate('/password'); // Redirect to the Password component
      } else {
        setError('Invalid OTP');
      }
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f9fc',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: 'auto',
    width: 'fit-content',
    minWidth: '600px',
  };

  const headingStyle = {
    color: '#333',
    fontSize: '40px',
    margin: '0 0 20px 0',
  };

  const inputsContainerStyle = {
    display: 'flex',
    gap: '10px',
  };

  const inputStyle = {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    fontSize: '20px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  };

  return (
    <div
      className='back'
      style={{
        backgroundImage: 'url(/Images/form.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={containerStyle}>
        <h2 style={headingStyle}>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputsContainerStyle}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                style={{
                  ...inputStyle,
                  ...(document.activeElement.id === `otp-input-${index}` ? inputFocusStyle : {}),
                }}
              />
            ))}
          </div>
          <button
            type="submit"
            style={{
              marginTop: '20px',
              marginLeft: '110px',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#007bff',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Otp;
