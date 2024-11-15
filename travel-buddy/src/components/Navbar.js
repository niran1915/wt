import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have some navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* This should take the user to login page on clicking the logo */}
        <Link to="/home">TRAVELBUDDY</Link> 
      </div>
      <ul className="navbar-links">
        {/* This should take the user to the home page */}
        <li><Link to="/home">Home</Link></li> 
        <li><Link to="/destinations">Popular Destinations</Link></li>
        <li><Link to="/packages">Travel Package</Link></li>
        <li><Link to="/events">Popular Events</Link></li>
        <li><Link to="/book">Book a Trip</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li>
          <Link to="/profile">
            <img src="path-to-profile-icon.png" alt="Profile" className="profile-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




