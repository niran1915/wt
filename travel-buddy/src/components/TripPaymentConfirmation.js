import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import './TripPaymentConfirmation.css';

const TripPaymentConfirmation = () => {
  const { state } = useLocation();
  const { fare, paymentStatus } = state || {};

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Trip Fare Confirmation`, 20, 20);
    doc.text(`Total Fare: ₹${fare}`, 20, 40);
    doc.text(`Payment Status: ${paymentStatus}`, 20, 60);

    // Add any additional details here (e.g., trip details)
    doc.text('Trip Details:', 20, 80);
    doc.text(`Fare: ₹${fare}`, 20, 100);
    doc.text(`Payment Status: ${paymentStatus}`, 20, 120);

    doc.save('Trip_Confirmation.pdf');
  };

  return (
    <div className="payment-confirmation-page">
      <h1>Payment Confirmation</h1>
      {paymentStatus && (
        <>
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </>
      )}
    </div>
  );
};

export default TripPaymentConfirmation;
