/* import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPackage, peopleCount, pickupTime, totalCost } = location.state || {};

  if (!selectedPackage) {
   
    navigate('/');
    return null;
  }

  const handlePayNow = () => {
   
    window.location.href = `https://mockpaymentgateway.com/pay?amount=${totalCost}`;
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Page</h1>
        <div className="payment-details">
          <h3>Package Details:</h3>
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Pickup Time:</strong> {pickupTime}</p>
          <p><strong>Number of People:</strong> {peopleCount}</p>
          <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>

        <div className="payment-actions">
          <button onClick={handlePayNow}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPackage, peopleCount, pickupTime, totalCost } = location.state || {};

  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Redirect to home if no selectedPackage is available
  if (!selectedPackage) {
    navigate('/');
    return null;
  }

  // Function to create the order (mock backend call)
  const createOrder = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalCost, // Amount for the order (in INR)
          packageName: selectedPackage.name, // Package name from the selected package
        }),
      });
      const data = await response.json();
      if (data.orderId) {
        setOrderId(data.orderId); // Store the order ID from the response
      } else {
        console.error('Failed to create order:', data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handlePayNow = async () => {
    if (!orderId) {
      // Create the order if it's not already created
      setIsLoading(true); // Show loading indicator
      await createOrder(); // Wait for order creation
      setIsLoading(false); // Hide loading indicator after order is created
    }

    if (orderId) {
      // Redirect to PaymentTransaction page with order details
      navigate('/paymentconfirmation', {
        state: {
          selectedPackage,
          peopleCount,
          pickupTime,
          totalCost,
          orderId,
        },
      });
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Page</h1>
        <div className="payment-details">
          <h3>Package Details:</h3>
          <p><strong>Package:</strong> {selectedPackage.name}</p>
          <p><strong>Pickup Time:</strong> {pickupTime}</p>
          <p><strong>Number of People:</strong> {peopleCount}</p>
          <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>

        <div className="payment-actions">
          {isLoading ? (
            <p>Loading order...</p>
          ) : (
            <button onClick={handlePayNow}>Pay Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
