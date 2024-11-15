import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../images/logo-modified.png';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState(null); // State to store user profile
  const [error, setError] = useState('');
  const [fetchEmail, setFetchEmail] = useState(''); // State to store email for fetching profile
  const [fetchedProfile, setFetchedProfile] = useState(null); // Store the fetched profile
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
      navigate('/login'); // Redirect to home if already logged in
    }
  }, [navigate]);

  // Handle login (POST)
  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post('http://localhost:5000/api/login', { email, password });

        const { userProfile } = response.data;
        setUserProfile(userProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile)); // Store user profile

        navigate('/home'); // Redirect to home page after successful login
      } catch (error) {
        setError(error.response?.data?.message || 'Invalid email or password');
      }
    } else {
      alert('Please enter both email and password');
    }
  };

  // Handle fetching user profile by email (GET)
  const handleFetchProfile = async () => {
    if (fetchEmail) {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${fetchEmail}`);
        setFetchedProfile(response.data); // Store the fetched profile
        alert('Profile fetched successfully!');
      } catch (error) {
        setError('Profile not found');
      }
    } else {
      alert('Please enter an email to fetch the profile.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <img src={logoImage} alt="Logo" className="auth-logo" />
        <h1>TRAVELBUDDY</h1>
      </div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      <p>New here? <Link to="/signup">Sign Up</Link></p>

      {/* Fetch Profile Section */}
      <div>
        <h3>Fetch Profile</h3>
        <input
          type="email"
          placeholder="Enter your email to fetch profile"
          value={fetchEmail}
          onChange={(e) => setFetchEmail(e.target.value)}
        />
        <button onClick={handleFetchProfile}>Proceed</button>
      </div>

      {/* Display fetched profile */}
      {fetchedProfile && (
        <div className="profile-details">
          <h3>Profile Details</h3>
          <p><strong>Name:</strong> {fetchedProfile.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {fetchedProfile.email}</p>
          <p><strong>Gender:</strong> {fetchedProfile.gender || 'Not provided'}</p>
          <p><strong>Date of Birth:</strong> {fetchedProfile.dob || 'Not provided'}</p>
          {fetchedProfile.image && (
            <img
              src={`http://localhost:5000/uploads/${fetchedProfile.image}`}
              alt="Profile"
              className="profile-photo"
            />
          )}
        </div>
      )}

      {/* Display user profile if logged in */}
      {userProfile && (
        <div>
          <h3>Welcome, {userProfile.name}</h3>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone}</p>
        </div>
      )}
    </div>
  );
};

export default Login;

