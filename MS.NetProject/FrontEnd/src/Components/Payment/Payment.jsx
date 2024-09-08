import '../../App.css';
import axios from 'axios'
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);
    const inr = sessionStorage.getItem('inr');
    const navigate = useNavigate();
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;         // POP screen provide krega

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
      })
  }

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/orders",
      headers: {
        'Content-Type': 'application/json'
      },
      data:data
    }

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      handleRazorpayScreen(response.data.amount)
    })
    .catch((error) => {
      console.log("error at", error)
    })
  }

  const handleRazorpayScreen = async(amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("Some error at razorpay screen loading ")
      return;
    }

    const options = {
      key: 'rzp_test_aCsvsoYMZp0sl5',
      amount: amount,
      currency: 'INR',
      name: "Ninja Courier",
      description: "Payment to Ninja Courier",
      image: "https://i.pinimg.com/736x/e2/c8/76/e2c8767a375a4799842cbcb051c61227.jpg",
      handler: function (response){
        setResponseId(response.razorpay_payment_id)
      },
      prefill: {
        name:"Ninja Courier",
        email: "ninjacourier@gmail.com"
      },
      theme: {
        color: "#FDBEDD"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value; 

    axios.get(`http://localhost:4000/payment/${paymentId}`)
    .then((response) => {
      console.log(response.data);
      setResponseState(response.data)
    })
    .catch((error) => {
      console.log("error occures", error)
    })
}
const redirect = ()=>{
    navigate('/customer-home')
}
  return (
    <div className="App">
   <button onClick={() => createRazorpayOrder(inr)}>Pay {inr} Rs.</button>
   {responseId && <p>{responseId}</p>}
   <h1>This is payment verification form</h1>
   <form onSubmit={paymentFetch}>
    <input type="text" name="paymentId" />
    <button type="submit">Fetch Payment</button>
    <Button onClick={()=>{redirect()}}>Home</Button>
    {responseState.length !==0 && (
      <ul>
        <li>Amount: {responseState.amount / 100} Rs.</li>
        <li>Currency: {responseState.currency}</li>
        <li>Status: {responseState.status}</li>
        <li>Method: {responseState.method}</li>
      </ul>
    )}
   </form>

    </div>
  );
}

export default Payment;