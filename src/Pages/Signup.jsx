import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          required 
        />
      </label>
      <br />
      <label>
        Last Name:
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          required 
        />
      </label>
      <br />
      <label>
        Email:
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input 
          type="tel" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          placeholder='Enter your number'
          onChange={handleChange} 
          required 
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Signup;