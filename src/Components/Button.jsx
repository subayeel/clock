import React, { useState } from 'react';
import CityTime from './CityTime';

const Modal = ({ isOpen, onClose, handleCitySelect }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleAddClick = () => {
    handleCitySelect(selectedCountry);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Choose Your Country</h2>
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          <div className="modal-buttons">
            <button className="add-button" onClick={handleAddClick}>Add</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados'
];

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCities([...selectedCities, city]);
  };

  return (
    <div>
      <div className="cardContainer">
        <div className="cityTime">
          <div>
                <div className="modal-buttons center">
                    <button className="custom-button" onClick={handleButtonClick}>Add</button>
                </div>
                <Modal isOpen={isOpen} onClose={handleCloseModal} handleCitySelect={handleCitySelect} />
          </div>
        </div>
    </div>
    
    {selectedCities && (
        <CityTime cityName={selectedCities} timezoneOffset={230} />
      )}
    </div>
  );
};

export default Button;