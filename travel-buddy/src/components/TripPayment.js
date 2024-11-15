/* import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TripPayment.css';

const TripPayment = () => {
  const { state } = useLocation();
  const { fare } = state || {};
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  const handlePayment = () => {

    setTimeout(() => {
      setPaymentStatus('Payment Successful');
    }, 2000);
  };

  const handleFinishPayment = () => {

    navigate('/payment-confirmation', { state: { fare, paymentStatus } });
  };

  return (
    <div className="trip-payment-page">
      <h1>Payment Process</h1>
      {fare ? (
        <>
          <p><strong>Total Fare:</strong> ₹{fare}</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
          {paymentStatus && <p>{paymentStatus}</p>}
          {paymentStatus && <button onClick={handleFinishPayment}>Finish Payment</button>}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TripPayment;
 */

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TripPayment.css';

const TripPayment = () => {
  const { state } = useLocation();
  const { fare } = state || {};
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Send payment request to backend
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fare, // Send fare value
          paymentMethod: 'Credit Card', // You can change this based on your application
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setPaymentStatus('Payment Successful');
        } else {
          setPaymentStatus('Payment Failed');
        }
      } else {
        setPaymentStatus('Payment Failed');
      }
    } catch (error) {
      console.error('Error during payment:', error);
      setPaymentStatus('Payment Failed');
    }
  };

  const handleFinishPayment = () => {
    // Redirect to Payment Confirmation page
    navigate('/payment-confirmation', { state: { fare, paymentStatus } });
  };

  return (
    <div className="trip-payment-page">
      <h1>Payment Process</h1>
      {fare ? (
        <>
          <p><strong>Total Fare:</strong> ₹{fare}</p>
          <button onClick={handlePayment}>Proceed to Payment</button>
          {paymentStatus && <p>{paymentStatus}</p>}
          {paymentStatus && <button onClick={handleFinishPayment}>Finish Payment</button>}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TripPayment;
