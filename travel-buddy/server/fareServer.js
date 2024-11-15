const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// --- Trip Booking ---
let trips = [];

// --- Haversine Formula for Distance Calculation ---
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Returns distance in km
};

const toRadians = (degree) => {
  return degree * (Math.PI / 180);
};

// --- Transport Rates ---
const transportRates = {
  'Car': 20,
  'Bus': 10,
  'Bike': 15,
  'Auto': 12,
  'Cab': 25,
};

// --- Locations with Coordinates ---
const locations = {
  'Indiranagar': { lat: 12.9722, lon: 77.6412 },
  'MG Road': { lat: 12.9716, lon: 77.5955 },
  'Koramangala': { lat: 12.9295, lon: 77.6255 },
  'Whitefield': { lat: 12.9716, lon: 77.7499 },
  'Jayanagar': { lat: 12.9343, lon: 77.5884 },
  'BTM Layout': { lat: 12.9190, lon: 77.6143 }, // Approximate coordinates
  'Electronic City': { lat: 12.8619, lon: 77.7105 }, // Approximate coordinates
  'Hebbal': { lat: 13.0377, lon: 77.5909 }, // Approximate coordinates
  'Rajajinagar': { lat: 13.0063, lon: 77.5702 }, // Approximate coordinates
  'Banashankari': { lat: 12.9275, lon: 77.5832 }, // Approximate coordinates
};

const calculateFare = (pickupPoint, dropPoint, modeOfTransport, totalPeople) => {
  const distance = distances[`${pickupPoint}-${dropPoint}`] || 0; // Default to 0 if distance not found
  const ratePerKm = transportRates[modeOfTransport] || 0;  // Default to 0 if rate not found
  const baseFare = distance * ratePerKm;
  const farePerPerson = baseFare * totalPeople;  // Multiply by number of people
  return farePerPerson;
};

// Route to calculate fare (POST)
app.post('/api/fare', (req, res) => {
  const { modeOfTransport, pickupPoint, dropPoint, totalPeople } = req.body;
  const fare = calculateFare(pickupPoint, dropPoint, modeOfTransport, totalPeople);

  res.json({ fare });
});

app.listen(PORT, () => {
  console.log(`Fare server running on port ${PORT}`);
});
