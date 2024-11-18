// src/FormValidation.js
import React, { useState } from 'react';
import './FormValidation.css'; // Importing the CSS file

const FormValidation = () => {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
  };

  const initialErrors = {
    username: '',
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Password validation with regex to check strong password
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  // Username validation (only letters and numbers, no special characters)
  const validateUsername = (username) => {
    const regex = /^[A-Za-z0-9]+$/; // Only letters and numbers, no special characters
    return regex.test(username);
  };

  // Validation rules
  const validate = () => {
    const newErrors = {};
    let isValid = true;

    // Username validation
    if (!formData.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must contain only alphabets and numbers (no special characters)';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitted(true);
      console.log('Form data submitted:', formData);
      setSuccessMessage('Form submitted successfully!');
    } else {
      setIsSubmitted(false);
      setSuccessMessage('');  // Clear success message if validation fails
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setIsSubmitted(false);
    setSuccessMessage('');  // Clear success message on reset
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
        <button type="button" onClick={handleReset} className="reset-button">Reset</button>
      </form>

      {/* Display success message */}
      {successMessage && !Object.values(errors).some((error) => error) && (
        <p className="success">{successMessage}</p>
      )}
    </div>
  );
};

export default FormValidation;
