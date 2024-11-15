import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelHistoryPage.css';

const TravelHistory = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch booking history on component mount
  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/booking');
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          alert('Failed to fetch booking history');
        }
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookingHistory();
  }, []);

  // Fetch trip details when a booking is selected
  const handleBookingClick = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:5002/api/trips/${bookingId}`);
      if (response.ok) {
        const tripData = await response.json();
        setSelectedBooking(tripData);
      } else {
        alert('Failed to fetch trip details');
      }
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };

  // Handle the "Go Back to Profile" button click
  const handleGoBack = () => {
    navigate('/profile');
  };

  return (
    <div className="travel-history-page">
      <h1>Travel History</h1>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-item">
            <h3>{booking.selectedPackage.name}</h3>
            <button onClick={() => handleBookingClick(booking.id)}>View Trip Details</button>
          </div>
        ))}
      </div>

      {selectedBooking && (
        <div className="trip-details">
          <h2>Trip Details</h2>
          <p><strong>Pickup Point:</strong> {selectedBooking.pickupPoint}</p>
          <p><strong>Drop Point:</strong> {selectedBooking.dropPoint}</p>
          <p><strong>Mode of Transport:</strong> {selectedBooking.modeOfTransport}</p>
          <p><strong>Total People:</strong> {selectedBooking.totalPeople}</p>
        </div>
      )}

      <button className="go-back-btn" onClick={handleGoBack}>Go Back to Profile</button>
    </div>
  );
};

export default TravelHistory;
