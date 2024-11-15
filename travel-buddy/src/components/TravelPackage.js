import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelPackage.css';

import BangaloreCityTourImage from '../images/bangalore-city-tour.jpg';
import NandiHillsImage from '../images/nandi-hills.jpg';
import RamanagaraClimbingImage from '../images/ramanagara-climbing.jpg';
import KabiniSafariImage from '../images/kabini-safari.jpg';

const TravelPackage = () => {
  const navigate = useNavigate();
  const [peopleCount, setPeopleCount] = useState(1);
  const [pickupTime, setPickupTime] = useState('8am');
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);  // State for selected guide

  const packages = [
    {
      id: 1,
      name: 'Bangalore City Tour',
      description: 'Explore the best of Bangalore with a guided city tour covering major landmarks.',
      image: BangaloreCityTourImage,
      price: 3000,
    },
    {
      id: 2,
      name: 'Nandi Hills Adventure',
      description: 'Trekking up to Nandi Hills for a panoramic view and enjoy a picnic at the top.',
      image: NandiHillsImage,
      price: 2000,
    },
    {
      id: 3,
      name: 'Ramanagara Rock Climbing',
      description: 'Adventure awaits you in Ramanagara with rock climbing and hiking activities.',
      image: RamanagaraClimbingImage,
      price: 4000,
    },
    {
      id: 4,
      name: 'Kabini Wildlife Safari',
      description: 'Embark on an exciting safari through Kabini forest and spot wildlife in their natural habitat.',
      image: KabiniSafariImage,
      price: 5000,
    },
  ];

  // Mock guides data
  const guides = [
    { id: 1, name: 'Guide A', bio: 'Experienced guide for city tours with 10 years of experience., contact: 93442xxxxx' },
    { id: 2, name: 'Guide B', bio: 'Nature enthusiast with deep knowledge of hiking and trekking, contact: 95534xxxxx.' },
    { id: 3, name: 'Guide C', bio: 'Wildlife expert, specializing in safaris and nature walks, contact: 95512xxxxx.' },
  ];

  // Handle package selection
  const handlePackageSelection = (event) => {
    setSelectedPackageId(event.target.value);
  };

  const totalCost = selectedPackageId
    ? packages.find(pkg => pkg.id === parseInt(selectedPackageId)).price * peopleCount
    : 0;

  // Navigate to the booking confirmation page with the selected details
  const handleBookNow = () => {
    if (!selectedPackageId || !selectedGuide) {
      alert('Please select a package and guide first.');
      return;
    }

    const selectedPackage = packages.find(pkg => pkg.id === parseInt(selectedPackageId));
    const guide = guides.find(g => g.id === selectedGuide.id);

    navigate('/bookingconfirmation', {
      state: {
        selectedPackage,
        peopleCount,
        pickupTime,
        totalCost,
        selectedGuide: guide, // Passing selected guide
      },
    });
  };

  return (
    <div className="travel-package-container">
      <h1>Travel Packages - Bangalore</h1>

      {/* Package Cards */}
      <div className="package-scroll">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <img src={pkg.image} alt={pkg.name} className="package-image" />
            <h3>{pkg.name}</h3>
            <p>{pkg.description}</p>
            <button onClick={() => navigate(`/packagedetails/${pkg.id}`)}>Package Details</button>
          </div>
        ))}
      </div>

      {/* Package Selection Form */}
      <div className="package-selection-form">
        <h2>Select Your Package</h2>

        {/* Package Dropdown */}
        <div className="dropdown-container">
          <label htmlFor="package-select">Choose a Package:</label>
          <select
            id="package-select"
            value={selectedPackageId || ''}
            onChange={handlePackageSelection}
          >
            <option value="">-- Select a Package --</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Guide Selection Dropdown */}
        <div className="dropdown-container">
          <label htmlFor="guide-select">Select a Travel Guide:</label>
          <select
            id="guide-select"
            value={selectedGuide?.id || ''}
            onChange={(e) => setSelectedGuide(guides.find(g => g.id === parseInt(e.target.value)))}
          >
            <option value="">-- Select a Guide --</option>
            {guides.map(guide => (
              <option key={guide.id} value={guide.id}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pickup Time Dropdown */}
        <div className="dropdown-container">
          <label htmlFor="pickup-time">Time of Pickup:</label>
          <select
            id="pickup-time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          >
            <option value="8am">8:00 AM</option>
            <option value="10am">10:00 AM</option>
            <option value="12pm">12:00 PM</option>
            <option value="2pm">2:00 PM</option>
            <option value="4pm">4:00 PM</option>
          </select>
        </div>

        {/* Number of People */}
        <div className="dropdown-container">
          <label htmlFor="people-count">Number of People:</label>
          <input
            type="number"
            id="people-count"
            min="1"
            max="20"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
          />
          <span>{peopleCount} person(s)</span>
        </div>

        {/* Total Cost */}
        {selectedPackageId && (
          <div className="cost-display">
            <p><strong>Total Cost:</strong> ₹{totalCost}</p>
          </div>
        )}

        {/* Book Now Button */}
        <div className="book-now-container">
          <button onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default TravelPackage;
