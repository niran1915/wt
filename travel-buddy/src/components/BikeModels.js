import React from 'react';
import './BikeModels.css';  // Import the CSS specific for this page

// Import images
import bike1 from '../images/splendor.jpg';
import bike2 from '../images/TVSraider.jpg';
import bike3 from '../images/raedon.jpg';
import bike4 from '../images/starcity.jpg';
import bike5 from '../images/tvsSport.jpg';

const bikeModels = [
  { name: 'splendour', description: 'The Hero Splendor is known for its excellent fuel efficiency and smooth ride, making it an ideal choice for long hours of city commuting as a bike taxi. Its lightweight design ensures ease of handling, providing a comfortable ride for both the rider and passenger.', image: bike1 },
  { name: 'TVS Raider', description: 'The TVS Raider offers a blend of power and performance with its stylish design, making it perfect for fast and efficient bike taxi rides in urban settings. Its modern features, such as a digital console and smooth handling, make it an enjoyable ride for both driver and passenger alike.', image: bike2 },
  { name: 'raedon', description: 'The Raedon is a compact and durable bike, designed for efficiency and reliability, making it suitable for navigating busy city streets with ease during bike taxi services. Its fuel efficiency and comfort-oriented features ensure a safe and smooth journey for passengers.', image: bike3 },
  { name: 'starcity', description: 'The Hero Star City is known for its fuel efficiency and comfort, ideal for short-to-medium city rides as a bike taxi. With its easy maneuverability and reliable performance, it offers a pleasant ride for both rider and passenger on crowded city streets.', image: bike4 },
  { name: 'TVS Sport', description: 'The TVS Sport is a lightweight and fuel-efficient bike, making it a great option for quick and economical bike taxi rides. With its easy handling and strong engine performance, it provides a reliable and comfortable ride for passengers in busy urban environments.', image: bike5 },
];

const BikeModels = () => {
  return (
    <div className="bike-models-page">
      <h2>Bike Models</h2>
      <div className="bike-models-list">
        {bikeModels.map((bike, index) => (
          <div key={index} className="bike-model">
            <img src={bike.image} alt={bike.name} className="bike-model-image" />
            <h3>{bike.name}</h3>
            <p>{bike.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BikeModels;
