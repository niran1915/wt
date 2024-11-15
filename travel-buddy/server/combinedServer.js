const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));  // Serve uploaded images

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

// --- Fare Calculation ---
const calculateFare = (pickupPoint, dropPoint, modeOfTransport, totalPeople) => {
  const pickupCoords = locations[pickupPoint];
  const dropCoords = locations[dropPoint];

  if (!pickupCoords || !dropCoords) {
    return 0;
  }

  const distance = haversineDistance(pickupCoords.lat, pickupCoords.lon, dropCoords.lat, dropCoords.lon);
  const ratePerKm = transportRates[modeOfTransport] || 0;
  const baseFare = distance * ratePerKm;
  return baseFare * totalPeople;
};

// --- Multer Setup for Profile Image Upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// --- User Signup and Login ---

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Sample in-memory storage for users and profiles
let users = []; // Array to hold user data
let userProfiles = {}; // Object to hold user profiles (keyed by email)

// Signup route (POST)
app.post('/api/signup', (req, res) => {
  const { email, phone, password } = req.body;

  // Validate email format
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Validate password format
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
    });
  }

  // Ensure phone number is provided and valid
  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Please provide a valid 10-digit phone number.' });
  }

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists.' });
  }

  // Create new user and add to in-memory storage
  const newUser = { email, phone, password };
  users.push(newUser);
  console.log('New User Registered:', newUser);

  // Create an empty profile for the new user
  userProfiles[email] = { name: '', email, gender: '', dob: '', image: null };

  // Respond with success
  res.status(201).json({ message: 'User registered successfully!', email });
});

// Login route (POST)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Validate that email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Find user matching email and password
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    console.log('User logged in successfully:', user);

    // Return the user's profile
    const userProfile = userProfiles[email];
    if (userProfile) {
      res.status(200).json({ message: 'Login successful!', userProfile });
    } else {
      res.status(404).json({ message: 'Profile not found for this user.' });
    }
  } else {
    console.log('Invalid credentials for email:', email);
    res.status(401).json({ message: 'Invalid credentials.' });
  }
});

// Get User Profile (GET)
app.get('/api/user/:email', (req, res) => {
  const { email } = req.params;

  const userProfile = userProfiles[email];
  if (userProfile) {
    res.status(200).json(userProfile);
  } else {
    res.status(404).json({ message: 'Profile not found.' });
  }
});

// Update User Profile (PUT)
app.put('/api/user/:email', (req, res) => {
  const { email } = req.params;
  const { name, gender, dob, image } = req.body;

  const userProfile = userProfiles[email];
  if (!userProfile) {
    return res.status(404).json({ message: 'Profile not found.' });
  }

  // Update user profile data
  userProfile.name = name || userProfile.name;
  userProfile.gender = gender || userProfile.gender;
  userProfile.dob = dob || userProfile.dob;
  userProfile.image = image || userProfile.image;

  console.log('Profile Updated:', userProfile);
  res.status(200).json({ message: 'Profile updated successfully!', updatedProfile: userProfile });
});

// Delete User Account (DELETE)
app.delete('/api/user/:email', (req, res) => {
  const { email } = req.params;

  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  // Delete the user and their profile
  users.splice(userIndex, 1);
  delete userProfiles[email];

  console.log('Account Deleted:', email);
  res.status(200).json({ message: 'Account deleted successfully.' });
});


// --- Profile Management ---

// Route to get the profile data for a user
app.get('/api/profile/:email', (req, res) => {
  const { email } = req.params;
  const userProfile = userProfiles[email];

  if (userProfile) {
    return res.json(userProfile);
  } else {
    return res.status(404).json({ message: 'Profile not found for this email.' });
  }
});

// Route to save or update profile data
app.post('/api/profile/:email', upload.single('image'), (req, res) => {
  const { email } = req.params;
  const { name, gender, dob } = req.body;
  const image = req.file ? req.file.filename : null;

  // Update user profile or create a new one
  const updatedProfile = {
    name,
    email,
    gender,
    dob,
    image,
  };

  userProfiles[email] = updatedProfile;

  console.log('Profile saved/updated:', updatedProfile);
  res.status(200).json(updatedProfile);  // Return the updated profile to the client
});

// Route to delete user profile
app.delete('/api/profile/:email', (req, res) => {
  const { email } = req.params;

  if (userProfiles[email]) {
    delete userProfiles[email];
    console.log(`Profile for ${email} deleted successfully.`);
    res.status(200).json({ message: 'Profile deleted successfully.' });
  } else {
    console.log(`Profile for ${email} not found.`);
    res.status(404).json({ message: 'Profile not found.' });
  }
});

// --- Trip Booking ---

// Route to create a new trip booking
app.post('/api/trips', (req, res) => {
  const { name, pickupPoint, dropPoint, modeOfTransport, model, totalPeople } = req.body;

  const newTrip = {
    id: trips.length + 1,
    name,
    pickupPoint,
    dropPoint,
    modeOfTransport,
    model,
    totalPeople,
  };

  trips.push(newTrip);
  console.log('New Trip Booked:', newTrip);
  res.status(201).json(newTrip);
});

// Route to fetch a trip by ID
app.get('/api/trips/:id', (req, res) => {
  const trip = trips.find(t => t.id === parseInt(req.params.id));
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  console.log('Trip Details Fetched:', trip);
  res.json(trip);
});

// Route to update a trip by ID (PUT)
app.put('/api/trips/:id', (req, res) => {
  const tripId = parseInt(req.params.id);
  const { name, pickupPoint, dropPoint, modeOfTransport, model, totalPeople } = req.body;

  const trip = trips.find(t => t.id === tripId);
  if (trip) {
    trip.name = name || trip.name;
    trip.pickupPoint = pickupPoint || trip.pickupPoint;
    trip.dropPoint = dropPoint || trip.dropPoint;
    trip.modeOfTransport = modeOfTransport || trip.modeOfTransport;
    trip.model = model || trip.model;
    trip.totalPeople = totalPeople || trip.totalPeople;

    console.log('Trip Updated:', trip);
    return res.status(200).json(trip);
  } else {
    console.log('Trip not found:', tripId);
    return res.status(404).json({ message: 'Trip not found' });
  }
});

// Route to delete a trip by ID (DELETE)
app.delete('/api/trips/:id', (req, res) => {
  const tripId = parseInt(req.params.id);
  const tripIndex = trips.findIndex(t => t.id === tripId);

  if (tripIndex > -1) {
    const deletedTrip = trips.splice(tripIndex, 1);
    console.log('Trip Deleted:', deletedTrip);
    res.status(200).json({ message: 'Trip deleted successfully.' });
  } else {
    console.log('Trip not found:', tripId);
    res.status(404).json({ message: 'Trip not found' });
  }
});

// --- Fare Calculation ---

// Route to calculate fare
app.post('/api/fare', (req, res) => {
  const { modeOfTransport, pickupPoint, dropPoint, totalPeople } = req.body;
  const fare = calculateFare(pickupPoint, dropPoint, modeOfTransport, totalPeople);
  console.log('Fare Calculated:', { modeOfTransport, pickupPoint, dropPoint, totalPeople, fare });
  res.json({ fare });
});

// --- Payment Simulation ---

app.post('/api/payment', (req, res) => {
  const { fare, paymentMethod } = req.body;

  console.log('Received Payment Request:', { fare, paymentMethod });

  // Simulate payment success/failure based on fare value
  if (fare > 0) {
    // Simulate a successful payment process
    console.log('Payment Successful:', { fare, paymentMethod });
    res.json({ status: 'success', message: 'Payment Successful' });
  } else {
    // Simulate a failed payment process
    console.log('Payment Failed:', { fare, paymentMethod });
    res.json({ status: 'failed', message: 'Payment Failed' });
  }
});

// --- Booking History and Trip Details ---
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

// Route to fetch booking history
app.get('/api/booking', (req, res) => {
  res.json(bookingHistory);
  console.log('Booking History Fetched:', bookingHistory);
});

// Route to fetch trip details by ID
app.get('/api/trips/:id', (req, res) => {
  const tripId = parseInt(req.params.id, 10);
  const trip = tripDetails.find(t => t.id === tripId);
  if (trip) {
    res.json(trip);
    console.log('Trip Details Fetched:', trip);
  } else {
    res.status(404).send('Trip not found');
  }
});

// Mock Order and Payment Verification (For Simulating Order and Payment)
app.post('/create-order', (req, res) => {
  const { amount, packageName } = req.body;
  const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;
  console.log(`Created mock order: ${orderId}`);
  res.json({ orderId, packageName });
});

app.post('/verify-payment', (req, res) => {
  const { orderId, paymentStatus } = req.body;
  if (paymentStatus === 'success') {
    console.log(`Payment for order ${orderId} was successful.`);
    res.json({ status: 'success', message: 'Payment was successful!' });
  } else {
    console.log(`Payment for order ${orderId} failed.`);
    res.json({ status: 'failed', message: 'Payment failed. Please try again!' });
  }
});

// --- Contact Form Submission ---

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
  console.log('Received request body:', req.body);  // Log the incoming data

  const { name, phone, email, message } = req.body;

  // Basic validation checks
  if (!name || !phone || !email || !message) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  // Phone number validation (must be 10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).send({ message: 'Please enter a valid 10-digit phone number.' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: 'Please enter a valid email address.' });
  }

  // Log the valid data
  console.log('Valid contact submission:', { name, phone, email, message });

  // Simulate saving data (e.g., database or file)
  // Example: Here you would save it to a database if needed
  
  // Respond back with a success message
  res.status(200).send({ message: 'Your message has been submitted successfully.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
