// src/components/DestinationDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './DestinationDetail.css';

// Import images and destination data
import IskconImage from '../images/iskcon-temple.jpg';
import LalbaghImage from '../images/lalbagh.jpg';

const destinations = [
  {
    id: 1,
    name: 'ISKCON Temple',
    location: 'Rajajinagar',
    rating: 4.2,
    description: 'A famous temple in Rajajinagar known for its peaceful atmosphere.',
    image: IskconImage,
    externalLink: 'https://www.iskconbangalore.org/',
  },
  {
    id: 2,
    name: 'Lalbagh Botanical Garden',
    location: 'Bangalore',
    rating: 4.6,
    description: 'A beautiful botanical garden in Bangalore with a rich variety of flora.',
    image: LalbaghImage,
    externalLink: 'https://www.horticulture.kar.nic.in/lalbagh.htm',
  },
  // Add more destinations as needed
];

function DestinationDetail() {
  const { destinationId } = useParams();
  const destination = destinations.find(dest => dest.id.toString() === destinationId);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="destination-detail-container">
      <h2>{destination.name}</h2>
      <div
        className="destination-image"
        style={{ backgroundImage: `url(${destination.image})` }}
      ></div>
      <p><strong>Location:</strong> {destination.location}</p>
      <p><strong>Rating:</strong> {destination.rating} ⭐</p>
      <p>{destination.description}</p>
      <a href={destination.externalLink} target="_blank" rel="noopener noreferrer" className="external-link">
        More about {destination.name}
      </a>
    </div>
  );
}

export default DestinationDetail;
