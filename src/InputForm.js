import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InputForm.css';

function InputForm({ onSubmit }) {
  const [resource, setResource] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (location && !/^\d{5}$/.test(location)) {
      setError('Please enter a valid 5-digit zip code.');
      return;
    }

    if (!resource) {
      setError('Please select a resource.');
      return; 
    }

    onSubmit({ resource, location });
    navigate('/results');
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="form-input"
      />
      <select
        value={resource}
        onChange={(e) => setResource(e.target.value)}
        className="form-select"
      >
        <option value="" disabled>Select Resource</option>
        <option value="youth">Children/Youth Resources</option>
        <option value="culture">Culture Specific Agencies</option>
        <option value="elderly">Elder Services</option>
        <option value="housing">Housing/Unhoused Resources</option>
      </select>
      <button type="submit" className="form-button">
        Search
      </button>
      
      {error && <p className="error-message">{error}</p>} {}

    </form>
  );
}

export default InputForm;
