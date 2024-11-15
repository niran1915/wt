const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json());

// Sample booking data (this would be replaced with real data)
const bookingHistory = [
  {
    id: 1,
    selectedPackage: { name: 'Beach Getaway', description: 'Relax on a tropical beach for 5 days' },
    peopleCount: 4,
    pickupTime: '2024-11-25 10:00 AM',
    totalCost: 20000,
    selectedGuide: { name: 'John Doe', bio: 'Experienced local guide with 5 years of experience.' },
  },
  {
    id: 2,
    selectedPackage: { name: 'Mountain Adventure', description: 'Trek through the mountain ranges' },
    peopleCount: 2,
    pickupTime: '2024-12-10 6:00 AM',
    totalCost: 12000,
    selectedGuide: { name: 'Jane Smith', bio: 'Expert mountaineer and survivalist guide.' },
  },
];

// Sample trip details data (replace with actual trip data)
const tripDetails = [
  {
    id: 1,
    name: 'Beach Getaway',
    pickupPoint: 'Miami',
    dropPoint: 'Bahamas',
    modeOfTransport: 'Flight',
    totalPeople: 4,
  },
  {
    id: 2,
    name: 'Mountain Adventure',
    pickupPoint: 'Denver',
    dropPoint: 'Rocky Mountains',
    modeOfTransport: 'Bus',
    totalPeople: 2,
  },
];

// Fetch booking details (for travel history)
app.get('/api/booking', (req, res) => {
  res.json(bookingHistory);
});

// Fetch trip details by ID
app.get('/api/trips/:id', (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const trip = tripDetails.find(t => t.id === tripId);
  if (trip) {
    res.json(trip);
  } else {
    res.status(404).send('Trip not found');
  }
});

// Start the server
app.listen(5002, () => {
  console.log('Travel History Server running on port 5002');
});
