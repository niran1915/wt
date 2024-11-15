import React from 'react';
import './BusModels.css';  // Import the CSS specific for this page

// Importing images directly
import bus1 from '../images/starbus.jpg';
import bus2 from '../images/ALcheetah.jpg';
import bus3 from '../images/starbusultra.jpg';
import bus4 from '../images/switchMob.jpg';
import bus5 from '../images/sml.jpg';

const busModels = [
  { name: 'bus1', description: 'Description for Bus Model 1', image: bus1 },
  { name: 'bus2', description: 'Description for Bus Model 2', image: bus2 },
  { name: 'bus3', description: 'Description for Bus Model 3', image: bus3 },
  { name: 'bus4', description: 'Description for Bus Model 4', image: bus4 },
  { name: 'bus5', description: 'Description for Bus Model 5', image: bus5 },
];

const BusModels = () => {
  return (
    <div className="bus-models-page">
      <h2>Bus Models</h2>
      <div className="bus-models-list">
        {busModels.map((bus, index) => (
          <div key={index} className="bus-model">
            <img src={bus.image} alt={bus.name} className="bus-model-image" />
            <h3>{bus.name}</h3>
            <p>{bus.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusModels;
