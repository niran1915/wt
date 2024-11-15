import React from 'react';
import './CarModels.css';

import modelA from '../images/swift.jpg';
import modelB from '../images/wagonR.jpg';
import modelC from '../images/innova.jpg';
import modelD from '../images/i10.jpg';
import modelE from '../images/yaris.jpg';

const carModels = [
  { name: 'swift', description: 'The Maruti Suzuki Swift is an agile and fuel-efficient hatchback, perfect for city taxi services. Its compact size makes it ideal for navigating busy streets, while offering comfort for short to medium-distance rides', image: modelA },
  { name: 'wagon R', description: 'The Suzuki Wagon R is a practical and spacious hatchback, ideal for taxi services in urban areas. Its high roof and roomy cabin provide passengers with a comfortable ride, while its fuel efficiency makes it cost-effective for drivers.', image: modelB },
  { name: 'INNOVA', description: 'The Toyota Innova is a popular choice for premium taxi services, offering exceptional comfort and space for larger groups or family trips. With its reliable performance and smooth ride, it’s perfect for long-distance journeys or airport transfers.', image: modelC },
  { name: 'I10', description: 'The Hyundai i10 is a compact and economical car, well-suited for city taxi operations. Its small size and impressive fuel efficiency make it an excellent choice for short trips and navigating congested urban roads.', image: modelD },
  { name: 'YARIS', description: 'The Toyota Yaris is a stylish and fuel-efficient sedan, ideal for both budget-friendly and premium taxi services. Its smooth ride, modern features, and reliability make it a popular choice for urban commuting and airport transfers.', image: modelE },
];

const CarModels = () => {
  return (
    <div className="car-models-page">
      <h2>Car Models</h2>
      <div className="car-models-list">
        {carModels.map((car, index) => (
          <div key={index} className="car-model">
            <img src={car.image} alt={car.name} className="car-model-image" />
            <h3>{car.name}</h3>
            <p>{car.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarModels;
