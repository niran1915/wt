import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TripFare.css';

const TripFare = () => {
  const { state } = useLocation();
  const { fare } = state || {};
  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate('/trip-payment', { state: { fare } });  // Pass fare to the payment page
  };

  return (
    <div className="trip-fare-page">
      <h1>Trip Fare Details</h1>
      {fare !== undefined ? (
        <div className="fare-info">
          <p><strong>Total Fare:</strong> ₹{fare}</p>
          <button onClick={handlePayNow}>Pay Now</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TripFare;
