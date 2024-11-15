import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Fetch profile data on component mount
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (userProfile) {
      setEmail(userProfile.email);
      setName(userProfile.name || '');
      setGender(userProfile.gender || '');
      setDob(userProfile.dob || '');
      setImage(userProfile.image || null);
    } else {
      navigate('/login'); // Redirect to login if no profile exists
    }
  }, [navigate]);

  // Handle form input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleDobChange = (e) => setDob(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  // Handle profile save
  const handleSave = async () => {
    const updatedProfile = { name, email, gender, dob, image };

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('gender', gender);
      formData.append('dob', dob);
      if (image) formData.append('image', image);

      // Save to server (optional) and localStorage
      const response = await axios.put(`http://localhost:5000/api/user/${email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.setItem('userProfile', JSON.stringify(response.data.updatedProfile)); // Store updated profile
      alert('Profile saved successfully!');
    } catch (error) {
      alert('Error saving profile');
    }
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('userProfile'); // Clear local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="profile-page">
      <h2>MY PROFILE</h2>
      <div className="profile-container">
        <div className="profile-info">
          <label>Name:</label>
          <input type="text" value={name} onChange={handleNameChange} placeholder="Enter your name" />

          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" disabled />

          <label>Gender:</label>
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label>Date of Birth:</label>
          <input type="date" value={dob} onChange={handleDobChange} />

          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>

        <div className="profile-photo-section">
          <div className="profile-photo-placeholder">
            {image && <img src={`http://localhost:5000/uploads/${image}`} alt="Profile" className="profile-photo" />}
          </div>
          <input type="file" onChange={handleImageChange} />
        </div>
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
