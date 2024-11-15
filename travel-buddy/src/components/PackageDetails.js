import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PackageDetails.css';

// Import images for the travel packages
import BangaloreCityTourImage from '../images/bangalore-city-tour.jpg';
import NandiHillsImage from '../images/nandi-hills.jpg';
import RamanagaraClimbingImage from '../images/ramanagara-climbing.jpg';
import KabiniSafariImage from '../images/kabini-safari.jpg';

const PackageDetails = () => {
  const { packageId } = useParams();

  // Package data
  const packageDetails = {
    1: {
      name: 'Bangalore City Tour',
      description: 'Explore the best of Bangalore with a guided city tour covering major landmarks.',
      price: 3000,
      perPersonCost: 1000,
      facilities: ['Air-conditioned transport', 'Guide services', 'Lunch'],
      hotelDetails: 'Stay at a 3-star hotel in the heart of the city.',
      image: BangaloreCityTourImage,
    },
    2: {
      name: 'Nandi Hills Adventure',
      description: 'Trek up to Nandi Hills for a panoramic view and enjoy a picnic at the top.',
      price: 2000,
      perPersonCost: 500,
      facilities: ['Guided trek', 'Snacks at the top', 'Transport included'],
      hotelDetails: 'Stay at a local guest house or homestay.',
      image: NandiHillsImage,
    },
    3: {
      name: 'Ramanagara Rock Climbing',
      description: 'Adventure awaits you in Ramanagara with rock climbing and hiking activities.',
      price: 4000,
      perPersonCost: 1200,
      facilities: ['Safety equipment', 'Transport to site', 'Guide services'],
      hotelDetails: 'Stay in a nearby resort for a comfortable experience.',
      image: RamanagaraClimbingImage,
    },
    4: {
      name: 'Kabini Wildlife Safari',
      description: 'Embark on an exciting safari through Kabini forest and spot wildlife in their natural habitat.',
      price: 5000,
      perPersonCost: 1500,
      facilities: ['Safari jeep ride', 'Wildlife guide', 'Meals included'],
      hotelDetails: 'Stay at a luxury safari lodge in Kabini.',
      image: KabiniSafariImage,
    },
  };

  // Fetch the package details based on the packageId
  const pkg = packageDetails[packageId] || {};
  const [peopleCount, setPeopleCount] = useState(1);

  // Calculate the total cost based on the number of people
  const totalCost = pkg.price + (pkg.perPersonCost * (peopleCount - 1));

  useEffect(() => {
    if (!pkg.name) {
      // Redirect if the package doesn't exist
      window.location.href = '/'; // Redirect to homepage or an error page
    }
  }, [pkg]);

  return (
    <div className="package-details-container">
      <img src={pkg.image} alt={pkg.name} className="package-image" />
      <h1>{pkg.name}</h1>
      <p>{pkg.description}</p>
      <p><strong>Price per day:</strong> ₹{pkg.price}</p>
      <p><strong>Facilities:</strong> {pkg.facilities.join(', ')}</p>
      <p><strong>Hotel Details:</strong> {pkg.hotelDetails}</p>
      
      {/* Number of people selector */}
      <div>
        <label htmlFor="people-count">Number of People:</label>
        <input 
          type="number" 
          id="people-count" 
          value={peopleCount} 
          onChange={(e) => setPeopleCount(e.target.value)} 
          min="1"
        />
      </div>
      
      {/* Total cost calculation */}
      <p><strong>Total Cost for {peopleCount} person(s):</strong> ₹{totalCost}</p>
    </div>
  );
};

export default PackageDetails;
