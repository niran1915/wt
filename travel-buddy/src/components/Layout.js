// src/components/Layout.js

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logoImage from '../images/logo-modified.png';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {/* Conditionally render the header */}
      {!isAuthPage && (
        <header>
          <div className="logo-container">
            <Link to="/">
              <img src={logoImage} alt="Logo" className="header-logo" />
            </Link>
            <div className="logo-text">
              <span>TRAVEL</span>
              <span>BUDDY</span>
            </div>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/destinations">Popular Destinations</Link>
            <Link to="/travelpackage">Travel Package</Link>
            <Link to="/events">Popular Events</Link>
            <Link to="/bookatrip">Book a Trip</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
          <Link to="/profile" className="profile-icon">👤</Link>
        </header>
      )}

      {/* Render the child routes */}
      <Outlet />

      {/* Conditionally render the footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default Layout;
