const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));  // Serve uploaded images

// Set up file upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve the saved profile data (from local storage)
app.get('/api/profile', (req, res) => {
  const profile = {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    gender: localStorage.getItem('gender'),
    dob: localStorage.getItem('dob'),
    image: localStorage.getItem('image'),
  };
  res.json(profile);
});

// Save the profile data to local storage
app.post('/api/profile', upload.single('image'), (req, res) => {
  const { name, email, gender, dob } = req.body;
  const image = req.file ? req.file.filename : null;

  // Save profile data to local storage (client-side)
  localStorage.setItem('name', name);
  localStorage.setItem('email', email);
  localStorage.setItem('gender', gender);
  localStorage.setItem('dob', dob);
  if (image) {
    localStorage.setItem('image', image);
  }

  res.send('Profile saved successfully');
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
