/* import React from 'react';
import './PopularEvents.css';

function PopularEvents() {
  return (
    <div className="component-container">
      <h2>POPULAR EVENTS</h2>
      <div className="event">
        <div className="image-placeholder"></div>
        <div className="event-info">
          <h3>Alan Walker</h3>
          <p>Forum Mall</p>
          <div className="rating">4.2 ⭐</div>
        </div>
      </div>
    </div>
  );
}

export default PopularEvents;
 */

import React, { useState, useEffect } from 'react';
import './PopularEvents.css';
import { FaHeart } from 'react-icons/fa';
import PHEONIXMALL from '../images/phoenix.jpg';
import PESU_RR_CAMPUS from '../images/PESFEST.jpg';

function PopularEvents() {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [index]: !prevFavorites[index],
    }));
  };

  const destinations = [
    { 
      name: 'PHEONIX MALL', 
      location: 'Whitefield', 
      imgUrl: PHEONIXMALL,
      description: "Phoenix Mall, located in the bustling heart of Bangalore, is one of the city's premier shopping and entertainment destinations. With its vast array of stores, it offers everything from high-end fashion brands to local boutiques, making it a paradise for shoppers. The mall features a state-of-the-art cinema, where visitors can enjoy the latest blockbusters in comfort, and a variety of dining options that cater to all tastes, from fast food to fine dining. Phoenix Mall also houses an expansive gaming zone, perfect for families and friends looking for fun and excitement. The modern architecture of the mall, combined with its spacious layout, creates a welcoming atmosphere. Its strategic location, easily accessible from different parts of the city, ensures a steady stream of visitors. Whether you're shopping, dining, or simply relaxing, Phoenix Mall offers an all-in-one experience that captures the essence of contemporary lifestyle in Bangalore.",
      rating: 4.5
    },
    { 
      name: 'PESU-RR-CAMPUS', 
      location: 'Ringroad', 
      imgUrl: PESU_RR_CAMPUS,
      description: "The PES University RR Campus Fest is one of the most anticipated events in Bangalore, drawing students and faculty from across the region. Held annually at the university’s sprawling RR campus, this fest is a vibrant celebration of culture, creativity, and talent. The event features a wide variety of activities, including music performances, dance battles, theater performances, and art exhibitions, showcasing the diverse skills of the students. In addition to cultural events, the fest also hosts academic competitions, quizzes, and sports challenges, ensuring there is something for everyone. The campus is transformed into a lively hub of excitement, with food stalls, interactive sessions, and workshops that foster creativity and innovation. It is a platform for students to collaborate, network, and showcase their abilities while enjoying the festive spirit. The PESU RR Campus Fest not only celebrates the talents of the student body but also strengthens the sense of community within the university.",
      rating: 4.2
    }
  ];

  return (
    <div className="component-container">
      <h2>POPULAR EVENTS</h2>
      {destinations.map((destination, index) => (
        <div key={index} className="destination">
          <img src={destination.imgUrl} alt={destination.name} className="destination-image" />
          <div className="destination-info">
            <div className="destination-header">
              <h3>{destination.name}</h3>
              <FaHeart 
                className="heart-icon" 
                onClick={() => toggleFavorite(index)}
                color={favorites[index] ? 'red' : 'gray'} 
                style={{ cursor: 'pointer' }}
                aria-label={favorites[index] ? 'Remove from favorites' : 'Add to favorites'} // Accessibility
              />
            </div>
            <p className="destination-location">{destination.location}</p>
            <p className="destination-description">{destination.description}</p>
            <div className="destination-rating">
              <span>Rating: {destination.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopularEvents;