import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../images/logo-modified.png';
import './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  // Handle signup (POST)
  const handleSignup = async () => {
    if (!isValidPhone(phone)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    if (password === confirmPassword) {
      try {
        // Send signup request to the backend
        const response = await axios.post('http://localhost:5000/api/signup', { email, phone, password });
        console.log('Signup successful:', response.data);
        // Optionally, store the user profile in localStorage after successful signup
        localStorage.setItem('userProfile', JSON.stringify(response.data)); // Store the profile
        navigate('/login'); // Redirect to login page after successful signup
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred during signup');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  // Handle update profile (PUT)
  const handleProfileUpdate = async (updatedData) => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      try {
        const response = await axios.put(`http://localhost:5000/api/user/${storedProfile.email}`, updatedData);
        setUserProfile(response.data.updatedProfile);
        localStorage.setItem('userProfile', JSON.stringify(response.data.updatedProfile)); // Update in localStorage
        alert('Profile updated successfully');
      } catch (error) {
        alert('Error updating profile');
      }
    }
  };

  // Handle account deletion (DELETE)
  const handleAccountDeletion = async () => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/user/${storedProfile.email}`);
        localStorage.removeItem('userProfile'); // Clear localStorage
        setUserProfile(null);
        alert('Account deleted successfully');
        navigate('/signup'); // Redirect to signup page after deletion
      } catch (error) {
        alert('Error deleting account');
      }
    }
  };

  // Retrieve user profile from localStorage (if any)
  React.useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile)); // Set user profile from local storage
    }
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-header">
        <img src={logoImage} alt="Logo" className="auth-logo" />
        <h1>TRAVELBUDDY</h1>
      </div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p className="error-message">{error}</p>}

      {/* Display user profile if logged in */}
      {userProfile && (
        <div>
          <h3>Welcome, {userProfile.name}</h3>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone}</p>
          <button onClick={() => handleProfileUpdate({ name: 'Updated Name' })}>Update Profile</button>
          <button onClick={handleAccountDeletion}>Delete Account</button>
        </div>
      )}
    </div>
  );
};

export default Signup;






/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../images/logo-modified.png'; 
import './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password === confirmPassword) {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, phone, password }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Sign up successful! Please login.');
          navigate('/login'); 
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('Error signing up, please try again.');
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-header">
        <img src={logoImage} alt="Logo" className="auth-logo" />
        <h1>TRAVELBUDDY</h1>
      </div>
      <h2>Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup; */


