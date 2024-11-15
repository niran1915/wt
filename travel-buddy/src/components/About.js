/* import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactUs from './ContactUs';
import PopularDestinations from './PopularDestinations';
import PopularEvents from './PopularEvents';
import TravelBuddy from './TravelBuddy'; 
import Profile from './Profile'; 
import About from './About'; 
import './App.css';
import logoImage from './images/logo-modified.png'

function App() {
  const [showProfile, setShowProfile] = useState(false); 

  const toggleProfile = () => {
    setShowProfile(!showProfile); 
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo-container">
            <Link to="/about" onClick={closeProfile}> 
              <img src={logoImage} alt="Logo" className="header-logo" />
            </Link>
            <div className="logo" onClick={closeProfile}> 
              <div>TRAVEL</div>
              <div>BUDDY</div>
            </div>
          </div>
          <nav>
            <Link to="/" onClick={closeProfile}>Home</Link>
            <Link to="/travelbuddy" onClick={closeProfile}>Travel Buddy</Link>
            <Link to="/destinations" onClick={closeProfile}>Popular Destinations</Link>
            <Link to="/travelpackage" onClick={closeProfile}>Travel Package</Link>
            <Link to="/events" onClick={closeProfile}>Popular Events</Link>
            <Link to="/bookatrip" onClick={closeProfile}>Book a Trip</Link>
            <Link to="/contact" onClick={closeProfile}>Contact Us</Link>
          </nav>
          <div className="profile-icon" onClick={toggleProfile}>👤</div>
        </header>
        
        {showProfile && <Profile />} 

        <Routes>
          <Route path="/" element={<TravelBuddy />} />
          <Route path="/travelbuddy" element={<TravelBuddy />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/destinations" element={<PopularDestinations />} />
          <Route path="/events" element={<PopularEvents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; */


// About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Travel Buddy</h1>
      <p>Welcome to Travel Buddy, your travel companion!</p>
      <p>Our mission is to provide you with the best travel experiences.</p>
    </div>
  );
}

export default About;
