import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    height: '',
    weight: '',
    address: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Registration successful');
      document.getElementById('message').textContent = 'Registration successful!';
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('message').textContent = 'Registration failed!';
    }

    setFormData({
      name: '',
      email: '',
      dob: '',
      gender: '',
      height: '',
      weight: '',
      address: '',
      mobile: ''
    });
  };

  return (
    <div className="container">
      <h2>Patient Registration</h2>
      <form id="patientForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="height">Height:</label>
          <input type="text" id="height" name="height" value={formData.height} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight:</label>
          <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile no:</label>
          <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="submit" value="Register" />
        </div>
      </form>
      <div id="message"></div>
    </div>
  );
}

export default App;
