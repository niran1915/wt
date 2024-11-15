import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, selectedPackage, peopleCount, pickupTime, totalCost, paymentStatus, selectedGuide } = location.state || {};

  // Handle PDF print
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text("Payment Confirmation", 20, 20);

    // Add more content with details
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 20, 30);
    doc.text(`Package: ${selectedPackage.name}`, 20, 40);
    doc.text(`Pickup Time: ${pickupTime}`, 20, 50);
    doc.text(`Number of People: ${peopleCount}`, 20, 60);
    doc.text(`Total Cost: ₹${totalCost}`, 20, 70);
    doc.text(`Payment Status: ${paymentStatus}`, 20, 80);

    // Add guide details to the PDF
    if (selectedGuide) {
      doc.text(`Travel Guide: ${selectedGuide.name}`, 20, 90);
      doc.text(`Guide Bio: ${selectedGuide.bio}`, 20, 100);
    }

    // Save the PDF (this will trigger the download)
    doc.save('payment_confirmation.pdf');
  };

  // Handle Go to Home
  const handleGoHome = () => {
    navigate('/home');  // Navigate to the home page (root)
  };

  return (
    <div className="payment-confirmation">
      <h1>Payment Confirmation</h1>
      <div className="confirmation-details">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Package:</strong> {selectedPackage.name}</p>
        <p><strong>Pickup Time:</strong> {pickupTime}</p>
        <p><strong>Number of People:</strong> {peopleCount}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        <p><strong>Payment Status:</strong> {paymentStatus}</p>
        <p>payment confirmed</p>
      </div>

      {/* Show Guide Details in UI */}
      {selectedGuide && (
        <div className="guide-details">
          <h3>Travel Guide Details:</h3>
          <p><strong>Name:</strong> {selectedGuide.name}</p>
          <p><strong>Bio:</strong> {selectedGuide.bio}</p>
        </div>
      )}

      <div className="confirmation-actions">
        <button onClick={handlePrintPDF}>Print PDF</button>
        <button onClick={handleGoHome}>Go to Home</button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
