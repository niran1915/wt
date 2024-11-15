/* import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './Home.css';

const libraries = ["places"];

const Home = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING'); 

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handlePlaceChange = (autocomplete, setter) => {
    const place = autocomplete.getPlace();
    setter(place);
  };

  const calculateRoute = () => {
    if (from && to) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: from.geometry.location,
          destination: to.geometry.location,
          travelMode: window.google.maps.TravelMode[travelMode],
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setDistance(result.routes[0].legs[0].distance.text);
            setDuration(result.routes[0].legs[0].duration.text);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
    }
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={libraries}>
      <div className="home-container">
       
        <div className="location-select">
          <Autocomplete
            onLoad={(autocomplete) => (fromRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceChange(fromRef.current, setFrom)}
          >
            <input type="text" placeholder="From" />
          </Autocomplete>
          
          <button onClick={swapLocations}>⇄</button>

          <Autocomplete
            onLoad={(autocomplete) => (toRef.current = autocomplete)}
            onPlaceChanged={() => handlePlaceChange(toRef.current, setTo)}
          >
            <input type="text" placeholder="To" />
          </Autocomplete>
          
          <button onClick={calculateRoute}>Get Route</button>
        </div>

       
        <div className="travel-mode-select">
          <label htmlFor="travelMode">Travel Mode: </label>
          <select
            id="travelMode"
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
          >
            <option value="DRIVING">Driving</option>
            <option value="WALKING">Walking</option>
            <option value="BICYCLING">Bicycling</option>
            <option value="TRANSIT">Transit</option>
          </select>
        </div>

       
        <GoogleMap
          center={{ lat: 37.7749, lng: -122.4194 }} // Default center
          zoom={13}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          {from && to && directions && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>

        
        <div className="route-info">
          {distance && duration && (
            <div>
              <p>Distance: {distance}</p>
              <p>Approximate Time: {duration}</p>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default Home;   */


import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection
import './Home.css';

import iskconTempleImg from '../images/iskcon-temple.jpg';
import lalbaghImg from '../images/lalbagh.jpg';
import cubbonParkImg from '../images/cubbon-park.jpg';
import concertImg from '../images/concert.jpg';
import marathonImg from '../images/marathon.jpg';
import foodFestivalImg from '../images/food-festival.jpg';

// Importing images for transport modes
import carImg from '../images/car.jpg';
import bikeImg from '../images/bike.jpg';
import busImg from '../images/bus.jpg';

const Home = () => {
  const navigate = useNavigate();  // useNavigate for redirection
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [travelMode, setTravelMode] = useState('driving');  // Default travel mode
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const OPENROUTESERVICE_API_KEY = process.env.REACT_APP_OPENROUTESERVICE_API_KEY; // API key from .env

  // Debounce function for handling input change delay
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Fetch place suggestions from OpenRouteService API
  const fetchSuggestions = async (location, setter, setSuggestions) => {
    if (location.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
        params: {
          api_key: OPENROUTESERVICE_API_KEY,  // The API key
          text: location,  // The location query
        },
      });

      if (response.data.features && response.data.features.length > 0) {
        setSuggestions(response.data.features.map((place) => ({
          displayName: place.properties.label,  // The full address or place name
          position: { lat: place.geometry.coordinates[1], lng: place.geometry.coordinates[0] }, // Lat/Lng coordinates
        })));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setSuggestions([]);
    }
  };

  // Handle place change with debounce
  const handlePlaceChange = debounce((location, setter, setSuggestions) => {
    fetchSuggestions(location, setter, setSuggestions);
  }, 300);

  // Select a suggestion and update the input field
  const selectSuggestion = (suggestion, setter, inputRef, setSuggestions) => {
    setter(suggestion.position); // Set the place position (lat/lng)
    inputRef.current.value = suggestion.displayName; // Set the display name in the input
    setSuggestions([]); // Clear the suggestions list
  };

  // Fetch route details (distance and duration) using OpenRouteService API
  const calculateRoute = async () => {
    if (from && to) {
      setDistance('');
      setDuration('');

      try {
        // Use OpenRouteService Directions API to get the route details
        const response = await axios.post('https://api.openrouteservice.org/v2/directions/driving-car', {
          coordinates: [
            [from.lng, from.lat], // From coordinates
            [to.lng, to.lat],     // To coordinates
          ],
        }, {
          headers: {
            Authorization: `Bearer ${OPENROUTESERVICE_API_KEY}`,
          },
        });

        // Parse the route information
        const routeData = response.data.routes[0];
        const dist = routeData.summary.distance / 1000;  // Convert from meters to kilometers
        const duration = routeData.summary.duration / 60; // Convert from seconds to minutes

        setDistance(`${dist.toFixed(2)} km`);
        setDuration(`${Math.round(duration)} mins`);
      } catch (error) {
        console.error('Error fetching route:', error);
        alert('Failed to calculate route. Please try again.');
      }
    } else {
      alert("Please select both the start and end locations.");
    }
  };

  // Swap the start and end locations
  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setFromSuggestions([]); // Clear the suggestions when swapping
    setToSuggestions([]);
  };

  // Bangalore specific popular destinations
  const popularDestinations = [
    {
      name: "ISKCON Temple",
      location: "Rajajinagar, Bangalore",
      rating: "4.2 ⭐",
      image: iskconTempleImg
    },
    {
      name: "Lalbagh Botanical Garden",
      location: "Mavalli, Bangalore",
      rating: "4.7 ⭐",
      image: lalbaghImg
    },
    {
      name: "Cubbon Park",
      location: "Bangalore",
      rating: "4.5 ⭐",
      image: cubbonParkImg
    },
  ];

  // Bangalore specific popular events
  const popularEvents = [
    {
      name: "Live Concert by XYZ Band",
      location: "ABC Arena, Bangalore",
      date: "12th December 2024",
      image: concertImg
    },
    {
      name: "City Marathon 2024",
      location: "Downtown Park, Bangalore",
      date: "5th January 2024",
      image: marathonImg
    },
    {
      name: "Annual Food Festival",
      location: "City Square, Bangalore",
      date: "20th November 2024",
      image: foodFestivalImg
    },
  ];

  return (
    <div className="home-container">
      {/* Location Selection Section */}
      <div className="location-select">
        {/* From Location Input */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="From"
            ref={fromRef}
            onChange={(e) => handlePlaceChange(e.target.value, setFrom, setFromSuggestions)}
          />
          {fromSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {fromSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => selectSuggestion(suggestion, setFrom, fromRef, setFromSuggestions)}>
                  {suggestion.displayName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Swap Button */}
        <button onClick={swapLocations}>⇄</button>

        {/* To Location Input */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="To"
            ref={toRef}
            onChange={(e) => handlePlaceChange(e.target.value, setTo, setToSuggestions)}
          />
          {toSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {toSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => selectSuggestion(suggestion, setTo, toRef, setToSuggestions)}>
                  {suggestion.displayName}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Travel Mode Selector */}
        <div className="travel-mode-selector">
          <label>
            <input
              type="radio"
              value="driving"
              checked={travelMode === 'driving'}
              onChange={() => setTravelMode('driving')}
            />
            Driving
          </label>
          <label>
            <input
              type="radio"
              value="walking"
              checked={travelMode === 'walking'}
              onChange={() => setTravelMode('walking')}
            />
            Walking
          </label>
          <label>
            <input
              type="radio"
              value="bicycling"
              checked={travelMode === 'bicycling'}
              onChange={() => setTravelMode('bicycling')}
            />
            Bicycling
          </label>
        </div>

        {/* Get Route Button */}
        <button onClick={calculateRoute}>Get Route</button>
      </div>

      {/* Distance and Duration */}
      <div className="route-details">
        {distance && duration && (
          <div>
            <h3>Distance: {distance}</h3>
            <h3>Duration: {duration}</h3>
          </div>
        )}
      </div>

      {/* Popular Destinations */}
      <div className="popular-sections">
        <h2>Popular Destinations</h2>
        <div className="popular-destinations">
          {popularDestinations.map((destination, index) => (
            <div key={index} className="destination">
              <img src={destination.image} alt={destination.name} className="destination-image" />
              <div>
                <h3>{destination.name}</h3>
                <p>{destination.location}</p>
                <p>{destination.rating}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Button to redirect to the Popular Destinations page */}
        <button className="see-all-btn" onClick={() => navigate('/destinations')}>
          See All Destinations
        </button>
      </div>

      {/* Popular Events */}
      <div className="popular-events">
        <h2>Upcoming Events in Bangalore</h2>
        <div className="events-list">
          {popularEvents.map((event, index) => (
            <div key={index} className="event-item">
              <img src={event.image} alt={event.name} className="event-image" />
              <div>
                <h3>{event.name}</h3>
                <p>{event.location}</p>
                <p>{event.date}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Button to redirect to the Popular Events page */}
        <button className="see-all-btn" onClick={() => navigate('/events')}>
          See All Events
        </button>
      </div>

       {/* Mode of Transport Section */}
       <div className="transport-section">
        <h2>Mode of Transports Available</h2>
        <div className="transport-options">
          <div className="transport-option">
            <img src={carImg} alt="Car" />
            <h3>Car</h3>
            <p>Comfortable and fast. Ideal for long distances.</p>
            {/* Button to redirect to Car Models page */}
            <button onClick={() => navigate('/car-models')}>View Car Models</button>
          </div>
          <div className="transport-option">
            <img src={bikeImg} alt="Bike" />
            <h3>Bike</h3>
            <p>Perfect for short distances and avoiding traffic.</p>
            {/* Button to redirect to Bike Models page */}
            <button onClick={() => navigate('/bike-models')}>View Bike Models</button>
          </div>
          <div className="transport-option">
            <img src={busImg} alt="Bus" />
            <h3>Bus</h3>
            <p>Affordable and convenient for daily commuting.</p>
            {/* Button to redirect to Bus Models page */}
            <button onClick={() => navigate('/bus-models')}>View Bus Models</button>
          </div>
        </div>
      </div>

      {/* About TravelBuddy Section */}
      <div className="about-travelbuddy">
        <h2>About TravelBuddy</h2>
        <p>TravelBuddy is your ultimate guide for exploring Bangalore. Whether you are a local or a visitor, we help you find the best routes, events, and destinations in the city.</p>
      </div>
    </div>
  );
};

export default Home;





