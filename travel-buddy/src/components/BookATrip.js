import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookATrip.css';

const BookATrip = () => {
  const [name, setName] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropPoint, setDropPoint] = useState('');
  const [modeOfTransport, setModeOfTransport] = useState('');
  const [model, setModel] = useState('');
  const [totalPeople, setTotalPeople] = useState('');
  const navigate = useNavigate();

  const handleBookNow = async () => {
    const details = {
      name,
      pickupPoint,
      dropPoint,
      modeOfTransport,
      model,
      totalPeople,
    };

    try {
      // Send data to backend
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        const trip = await response.json();
        // Redirect to TripDetails page with the saved trip data
        navigate(`/trip-details/${trip.id}`, { state: trip });
      } else {
        alert('Failed to book trip');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error booking the trip');
    }
  };

  // Predefined list of places in Bengaluru
  const places = [
    'Koramangala', 'Indiranagar', 'MG Road', 'Whitefield', 'Jayanagar', 
    'BTM Layout', 'Electronic City', 'Hebbal', 'Rajajinagar', 'Banashankari'
  ];

  // Predefined list of transport modes
  const transportModes = ['Car', 'Bus', 'Bike', 'Auto', 'Cab'];

  // Predefined list of total people options
  const peopleOptions = Array.from({ length: 10 }, (_, i) => i + 1); // Creates an array [1, 2, ..., 10]

  // Models for each transport type
  const transportModels = {
    Car: ['Swift', 'Innova', 'Fortuner', 'i10','Yaris'],
    Bike: ['Splendor', 'Raider', 'Raedon','StarCity','TVS Sport'],
    Bus: ['SwitchMob', 'StarBus', 'AL Cheetah','Starbus Ultra','SML'],
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  return (
    <div className="book-trip-page">
      <h1>BOOK A TRIP</h1>
      <div className="form-section">
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <label>Pickup Point:</label>
        <select 
          value={pickupPoint} 
          onChange={(e) => setPickupPoint(e.target.value)}
        >
          <option value="">Select Pickup Point</option>
          {places.map((place, index) => (
            <option key={index} value={place}>{place}</option>
          ))}
        </select>

        <label>Drop Point:</label>
        <select 
          value={dropPoint} 
          onChange={(e) => setDropPoint(e.target.value)}
        >
          <option value="">Select Drop Point</option>
          {places.map((place, index) => (
            <option key={index} value={place}>{place}</option>
          ))}
        </select>

        <label>Mode of Transport:</label>
        <select 
          value={modeOfTransport} 
          onChange={(e) => {
            setModeOfTransport(e.target.value);
            setModel(''); // Reset model when transport mode changes
          }}
        >
          <option value="">Select Mode of Transport</option>
          {transportModes.map((mode, index) => (
            <option key={index} value={mode}>{mode}</option>
          ))}
        </select>

        {modeOfTransport && (
          <>
            <label>Select Model:</label>
            <select 
              value={model} 
              onChange={handleModelChange}
            >
              <option value="">Select a model</option>
              {transportModels[modeOfTransport]?.map((modelOption, index) => (
                <option key={index} value={modelOption}>{modelOption}</option>
              ))}
            </select>
          </>
        )}

        <label>Total No. of People:</label>
        <select 
          value={totalPeople} 
          onChange={(e) => setTotalPeople(e.target.value)}
        >
          <option value="">Select Number of People</option>
          {peopleOptions.map((people, index) => (
            <option key={index} value={people}>{people}</option>
          ))}
        </select>

        <button className="book-now" onClick={handleBookNow}>BOOK NOW</button>
      </div>
    </div>
  );
};

export default BookATrip;
