
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../APICallFunction/UserFunction';
import './Payment.css';

function Payment() {
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);
  const [showFetchForm, setShowFetchForm] = React.useState(false);
  const [paymentId, setPaymentId] = React.useState("");
  const inr = sessionStorage.getItem('inr');
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = React.useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    var tkn = getToken();
    if (!tkn) {
      navigate('/customer');
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src; 
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/orders",
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        handleRazorpayScreen(response.data.amount, response.data.id);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };

  const handleRazorpayScreen = async (amount, orderId) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Some error at Razorpay screen loading");
      return;
    }

    const options = {
      key: 'rzp_test_aCsvsoYMZp0sl5',
      amount: amount,
      currency: 'INR',
      name: "Ninja Courier",
      description: "Payment to Ninja Courier",
      image: "https://i.pinimg.com/736x/e2/c8/76/e2c8767a375a4799842cbcb051c61227.jpg",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
        setPaymentId(response.razorpay_payment_id); 
        setShowFetchForm(true); 
        setPaymentCompleted(true); 
      },
      prefill: {
        name: "Ninja Courier",
        email: "ninjacourier@gmail.com",
      },
      theme: {
        color: "#FDBEDD",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:4000/payment/${paymentId}`)
      .then((response) => {
        setResponseState(response.data);
      })
      .catch((error) => {
        console.log("error occurs", error);
      });
  };

  const redirect = () => {
    navigate('/customer-home');
  };

  return (
    <div className="Payment">
      <div className="Payment-container">
        <h1>Payment Verification</h1>
        {!paymentCompleted && (
          <>
            <button onClick={() => createRazorpayOrder(inr)} className="payment-button" style={{backgroundColor:'green'}}>
              Pay {inr} Rs.
            </button>
            <button onClick={() => navigate('/customer-home')} className="cancel-button" style={{backgroundColor:'red'}}>
              Cancel
            </button>
          </>
        )}
        {paymentCompleted && (
          <>
          <button onClick={() => navigate('/distance')} className="cancel-button" style={{backgroundColor:'blue'}}>
            ReOrder
          </button>
          <button onClick={() => navigate('/customer-home')} className="cancel-button" style={{backgroundColor:'red'}}>
              Cancel
            </button>
          </>
        )}
        <br />
        {showFetchForm && (
          <form onSubmit={paymentFetch} className="fetch-form">
            <button type="submit" className="fetch-button" >
              Fetch Payment
            </button>
            <input
              type="text"
              name="paymentId"
              value={paymentId} 
              onChange={(e) => setPaymentId(e.target.value)} 
            />
            
            {responseState.length !== 0 && (
              <ul>
                <li>Amount: {responseState.amount / 100} Rs.</li>
                <li>Currency: {responseState.currency}</li>
                <li>Status: {responseState.status}</li>
                <li>Method: {responseState.method}</li>
              </ul>
            )}
           
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;


