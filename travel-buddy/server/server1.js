// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS to allow requests from React app
app.use(bodyParser.json()); // Parse incoming JSON requests

// Store trips temporarily (in-memory storage)
let trips = [];

// Route to handle trip bookings (POST)
app.post('/api/trips', (req, res) => {
  const { name, pickupPoint, dropPoint, modeOfTransport, totalPeople } = req.body;

  const newTrip = { 
    id: trips.length + 1,  // Simple ID generation
    name,
    pickupPoint,
    dropPoint,
    modeOfTransport,
    totalPeople,
  };

  trips.push(newTrip);  // Store the new trip data

  console.log("Trip Booked:", newTrip);  // Log the trip details to the terminal

  // Send the trip back in the response
  res.status(201).json(newTrip);
});

// Route to fetch a trip by ID (GET)
app.get('/api/trips/:id', (req, res) => {
  const trip = trips.find(t => t.id === parseInt(req.params.id));
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  res.json(trip);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
