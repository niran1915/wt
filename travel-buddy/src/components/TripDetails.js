import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './TripDetails.css';

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [updatedTrip, setUpdatedTrip] = useState({
    name: '',
    pickupPoint: '',
    dropPoint: '',
    modeOfTransport: '',
    model: '',
    totalPeople: 0,
  });

  // Fetch trip details on component mount
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/trips/${id}`);
        if (response.ok) {
          const tripData = await response.json();
          setTrip(tripData);
          setUpdatedTrip(tripData);  // Set state for editing
        } else {
          alert('Trip not found');
        }
      } catch (error) {
        console.error('Error fetching trip details:', error);
        alert('Error fetching trip details');
      }
    };

    if (id) {
      fetchTripDetails();
    }
  }, [id]);

  // Handle the "View Fare Details" button click (POST request to /api/fare)
  const handleViewFare = async () => {
    if (!trip) return; // If trip data isn't available, do nothing

    try {
      const response = await fetch('http://localhost:5000/api/fare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modeOfTransport: trip.modeOfTransport,
          model: trip.model,
          pickupPoint: trip.pickupPoint,
          dropPoint: trip.dropPoint,
          totalPeople: trip.totalPeople,
        }),
      });

      if (response.ok) {
        const fareData = await response.json();
        navigate('/trip-fare', { state: fareData });
      } else {
        alert('Failed to fetch fare details');
      }
    } catch (error) {
      console.error('Error fetching fare details:', error);
      alert('Error calculating fare');
    }
  };

  // Handle trip update (PUT request)
  const handleUpdateTrip = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTrip),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setTrip(updatedData);  // Update the trip data in the state
        alert('Trip updated successfully');
      } else {
        alert('Failed to update trip');
      }
    } catch (error) {
      console.error('Error updating trip:', error);
      alert('Error updating trip');
    }
  };

  // Handle trip deletion (DELETE request)
  const handleDeleteTrip = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/trips/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Trip deleted successfully');
          navigate('/trips'); // Redirect to trip list page after deletion
        } else {
          alert('Failed to delete trip');
        }
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Error deleting trip');
      }
    }
  };

  // Handle PDF generation
  const handleGetPDF = () => {
    const doc = new jsPDF();
    
    // Set up document title
    doc.setFontSize(16);
    doc.text("Trip Details", 20, 20);

    // Trip Details
    doc.setFontSize(12);
    doc.text(`Name: ${trip.name}`, 20, 30);
    doc.text(`Pickup Point: ${trip.pickupPoint}`, 20, 40);
    doc.text(`Drop Point: ${trip.dropPoint}`, 20, 50);
    doc.text(`Mode of Transport: ${trip.modeOfTransport}`, 20, 60);
    doc.text(`Model: ${trip.model}`, 20, 70);
    doc.text(`Total People: ${trip.totalPeople}`, 20, 80);

    // Save the generated PDF
    doc.save(`trip_details_${trip.name}.pdf`);
  };

  // If trip data is not yet loaded, show loading message
  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trip-details-page">
      <h1>Trip Details</h1>
      <div className="trip-info">
        <p><strong>Name:</strong> {trip.name}</p>
        <p><strong>Pickup Point:</strong> {trip.pickupPoint}</p>
        <p><strong>Drop Point:</strong> {trip.dropPoint}</p>
        <p><strong>Mode of Transport:</strong> {trip.modeOfTransport}</p>
        <p><strong>Model:</strong> {trip.model}</p>
        <p><strong>Total People:</strong> {trip.totalPeople}</p>

        {/* Update Fields */}
        <div>
          <h3>Update Trip</h3>
          <label>Name:</label>
          <input
            type="text"
            value={updatedTrip.name}
            onChange={(e) => setUpdatedTrip({ ...updatedTrip, name: e.target.value })}
          />
          <label>Pickup Point:</label>
          <input
            type="text"
            value={updatedTrip.pickupPoint}
            onChange={(e) => setUpdatedTrip({ ...updatedTrip, pickupPoint: e.target.value })}
          />
          <label>Drop Point:</label>
          <input
            type="text"
            value={updatedTrip.dropPoint}
            onChange={(e) => setUpdatedTrip({ ...updatedTrip, dropPoint: e.target.value })}
          />
          <label>Mode of Transport:</label>
          <input
            type="text"
            value={updatedTrip.modeOfTransport}
            onChange={(e) => setUpdatedTrip({ ...updatedTrip, modeOfTransport: e.target.value })}
          />
          <label>Model:</label>
          <input
            type="text"
            value={updatedTrip.model}
            onChange={(e) => setUpdatedTrip({ ...updatedTrip, model: e.target.value })}
          />
          <label>Total People:</label>
          <input
            type="number"
            value={updatedTrip.totalPeople}
            onChange={(e) => setUpdatedTrip({ ...updatedTrip, totalPeople: e.target.value })}
          />

          <button onClick={handleUpdateTrip}>Update Trip</button>
        </div>

        {/* Delete Button */}
        <button onClick={handleDeleteTrip}>Delete Trip</button>

        {/* View Fare Button */}
        <button onClick={handleViewFare}>View Fare Details</button>

        {/* Get PDF Button */}
        <button onClick={handleGetPDF}>Get PDF</button>
      </div>
    </div>
  );
};

export default TripDetails;
