/*  import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import ContactUs from './ContactUs';
import PopularDestinations from './PopularDestinations';
import PopularEvents from './PopularEvents';
import TravelBuddy from './TravelBuddy'; 
import Profile from './Profile'; 
import TravelPackage from './TravelPackage';
import BookATrip from './BookATrip';
import './App.css';
import logoImage from './images/logo-modified.png';

function App() {
  const [showProfile, setShowProfile] = useState(false); 
  const location = useLocation(); 

  const toggleProfile = () => {
    setShowProfile(!showProfile); 
  };

  const closeProfile = () => {
    setShowProfile(false); 
  };

  useEffect(() => {
    closeProfile(); 
  }, [location]); 

  return (
    <div className="App">
      <header>
        <div className="logo-container">
          <Link to="/" onClick={closeProfile}> 
            <img src={logoImage} alt="Logo" className="header-logo" />
          </Link>
          <div className="logo" onClick={closeProfile}> 
            <div>TRAVEL</div>
            <div>BUDDY</div>
          </div>
        </div>
        <nav>
          <Link to="/" onClick={closeProfile}>HOME</Link>
          <Link to="/travelbuddy" onClick={closeProfile}>Travel Buddy</Link>
          <Link to="/destinations" onClick={closeProfile}>Popular Destinations</Link>
          <Link to="/travelpackage" onClick={closeProfile}>Travel Package</Link>
          <Link to="/events" onClick={closeProfile}>Popular Events</Link>
          <Link to="/bookatrip" onClick={closeProfile}>Book a Trip</Link>
          <Link to="/contact" onClick={closeProfile}>Contact Us</Link>
        </nav>
        <div className="profile-icon" onClick={toggleProfile}>👤</div>
      </header>
      
     

      <Routes>
        <Route path="/" element={<TravelBuddy />} />
        <Route path="/travelbuddy" element={<TravelBuddy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/destinations" element={<PopularDestinations />} />
        <Route path="/events" element={<PopularEvents />} />
      </Routes>
    </div>
  );
}


const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;   */

// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import PopularDestinations from './components/PopularDestinations';
import DestinationDetail from './components/DestinationDetail';
import PopularEvents from './components/PopularEvents';
import Profile from './components/Profile';
import About from './components/About';
import TravelPackage from './components/TravelPackage';
import BookATrip from './components/BookATrip';
import PackageDetails from './components/PackageDetails';
import TripDetails from './components/TripDetails';
import TravelGuideDetails from './components/TravelGuideDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';  // Import Layout component
import PaymentPage from './components/PaymentPage';
import BookingConfirmation from './components/BookingConfirmation';
import PaymentConfirmation from './components/PaymentConfirmation';
import PaymentTransaction from './components/PaymentTransaction';
import TripFare from './components/TripFare';
import TripPayment from './components/TripPayment';
import TripPaymentConfirmation from './components/TripPaymentConfirmation';
import TravelHistory from './components/TravelHistoryPage';
import CarModels from './components/CarModels';
import BikeModels from './components/BikeModels';
import BusModels from './components/BusModels';

function App() {
  const [tripData, setTripData] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Redirect root to login page */}
        <Route path="/" element={<Navigate to="/login" />} /> 

        {/* Public routes: Login and Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes (wrapped with Layout component) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/destinations" element={<PopularDestinations />} />
          <Route path="/" element={<PopularDestinations />} />
          <Route path="/destinations/:destinationId" element={<DestinationDetail />} />
          <Route path="/events" element={<PopularEvents />} />
          <Route path="/travelpackage" element={<TravelPackage />} />
          <Route path="/bookatrip" element={<BookATrip setTripData={setTripData} />} />
          <Route path="/packagedetails/:packageId" element={<PackageDetails />} />
          <Route path="/trip-details/:id" element={<TripDetails />} />
          <Route path="/trip-fare" element={<TripFare />} />
          <Route path="/travel-guide-details/:guideName" element={<TravelGuideDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/bookingconfirmation" element={<BookingConfirmation />} />
          <Route path="/paymentconfirmation" element={<PaymentConfirmation />} />
          <Route path="/paymenttransaction" element={<PaymentTransaction />} />
          <Route path="/trip-payment" element={<TripPayment />} />
          <Route path="/payment-confirmation" element={<TripPaymentConfirmation/>} />
          <Route path="/travel-history" element={<TravelHistory />} />
          <Route path="/car-models" element={<CarModels />} />
          <Route path="/bike-models" element={<BikeModels />} />
          <Route path="/bus-models" element={<BusModels />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;


