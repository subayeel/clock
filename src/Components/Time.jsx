import React, { useState, useEffect } from 'react';
import CityTime from './CityTime';
import '../styles/time.css';
import citiesData from '../data/cities.json';
import countriesData from '../data/countries.json';
import Analog from './AnalogClock';
import '../styles/analogClock.css'

const Modal = ({ isOpen, onClose, handleCitySelect, countries }) => {
  const [selectedCountry, setSelectedCountry] = useState('Afghanistan');

  const handleCountryChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selected value: " +selectedValue);
    if (selectedValue !== null) {
      setSelectedCountry(selectedValue);
    }
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
          <select  onChange={handleCountryChange}>
            {<option disabled>Select a country</option>}
            {countries.map((country) => (
              <option key={country.countryName}>{country.countryName}</option>
            ))}
          </select>
          <div className="modal-buttons">
            <button className="add-button" onClick={handleAddClick}>
              Add
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Time = () => {
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCities, setSelectedCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000); // Update every second

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // const optionsTime = {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   hour12: true,
  // };
  // const formattedTime = currentTime.toLocaleTimeString(undefined, optionsTime);

  // const optionsDate = {
  //   weekday: 'short',
  //   month: 'short',
  //   day: 'numeric',
  //   year: 'numeric',
  // };
  // const formattedDate = currentTime.toLocaleDateString(undefined, optionsDate);

  const handleCitySelect = (city) => {
    setSelectedCities([...selectedCities, city]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="main">
        { <div className="centerContainer">
          <Analog/>
        </div> }
        
        <div>
          <div className="cardContainerWrapper">
            {citiesData.map((cityData) => (
              <CityTime
                key={cityData.cityName}
                cityName={cityData.cityName}
                timezoneOffset={cityData.timezoneOffset}
              />
            ))}
            
            {selectedCities.map((city) => {
              const countryData = countriesData.find(
                (country) => country.countryName === city
              );
              return (
                <CityTime
                  key={city}
                  cityName={city}
                  timezoneOffset={countryData ? countryData.timezoneOffset : 0}
                />
              );
            })}
            <div className="cardContainer">
              <div className="cityTime">
                <div>
                  <div className="modal-buttons center">
                    <button className="custom-button" onClick={handleOpenModal}>
                      Add
                    </button>
                  </div>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    handleCitySelect={handleCitySelect}
                    countries={countriesData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Time;