import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, selectedPackage, peopleCount, pickupTime, totalCost, paymentStatus, selectedGuide } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = async () => {
    // Make a call to the backend to save payment data
    const paymentData = {
      orderId,
      selectedPackage,
      peopleCount,
      pickupTime,
      totalCost,
      paymentMethod,
      paymentStatus: 'success',  // Set payment status as 'success' by default
      selectedGuide,
    };

    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // On success, navigate to payment confirmation with the details
        navigate('/paymentconfirmation', { state: paymentData });
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error in payment:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="payment-transaction">
      <h1>Payment Transaction</h1>
      {/* Add Payment Method UI */}
      <div>
        <label>
          Payment Method:
          <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
          </select>
        </label>
      </div>

      {/* Removed the Payment Status Form */}

      <button onClick={handlePayment}>Finish Payment</button>
    </div>
  );
};

export default PaymentTransaction;
