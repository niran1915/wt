// ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    { question: "What is your return policy?", answer: "You can return any item within 30 days for a full refund." },
    { question: "How can I contact support?", answer: "You can contact support via email at support@example.com." },
    { question: "Do you ship internationally?", answer: "Yes, we offer international shipping to select countries." },
  ];

  const handleSubmit = async () => {
    if (!name || !phone || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone, email, message })
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your message.");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="component-container">
      <h2>CONTACT US</h2>
      <div className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Phone No</label>
            <input 
              type="text" 
              placeholder="Your Phone Number" 
              value={phone} 
              onChange={handlePhoneChange} 
            />
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input 
              type="text" 
              placeholder="Your Email ID" 
              value={email} 
              onChange={handleEmailChange} 
            />
          </div>
        </div>
        <div className="form-group message-group">
          <label>Message</label>
          <textarea 
            placeholder="Your Message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          ></textarea>
        </div>
        
        <button type="button" onClick={handleSubmit}>Submit</button>

        <div className="faq">
          <h3>FAQ's</h3>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <p className="faq-question"><strong>Q: {faq.question}</strong></p>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;