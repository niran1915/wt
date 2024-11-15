import React from 'react';
import './Footer.css'; // Import the CSS for the Footer

const Footer = () => {
  return (
    <footer className="footer">
      {/* Travel Buddy Logo and Copyright */}
      <div className="footer-logo">
        <img src="" alt="Travel Buddy Logo" className="logo" />
        <p>&copy; 2024 Travel Buddy. All Rights Reserved.</p>
      </div>

      {/* Contact & Social Links */}
      <div className="footer-contact">
        <div className="contact-info">
          <p><strong>Contact Us</strong></p>
          <p>Phone: +91 9876543210</p> {/* Updated Phone Number */}
          <p>Email: support@travelbuddy.com</p>
          <p>Address: 123 MG Road, Bangalore, Karnataka, 560001</p> {/* Updated Address */}
        </div>

        {/* Social Media Links */}
        <div className="social-links">
          <p><strong>Follow Us</strong></p>
          <ul className="social-list">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
