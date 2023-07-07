import React, { useState, useEffect } from 'react';
import '../index.css';

const getTimeByTimezoneOffset = (timezoneOffset) => {
  const currentTime = new Date();
  const offsetMilliseconds = timezoneOffset * 60 * 1000;
  const cityTime = new Date(currentTime.getTime() + offsetMilliseconds);
  return cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
};

const CityTime = ({ cityName, timezoneOffset }) => {
  const [cityTime, setCityTime] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCityTime(getTimeByTimezoneOffset(timezoneOffset));
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, [timezoneOffset]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  
  return (
    <>
      <div className="cardContainer">
        <div className="cityName">
          <div>{cityName}</div>
          <div>
            <i
              className={`fa-heart ${isFavorite ? 'fa-solid' : 'fa-regular'}`}
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={toggleFavorite}
            ></i>
          </div>
        </div>
        <div className="cityTime">
          <div>{cityTime}</div>
        </div>
      </div>
    </>
  );
};

export default CityTime;