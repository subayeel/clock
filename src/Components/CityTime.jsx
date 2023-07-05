import React, { useState, useEffect } from 'react';
import '../index.css'

const getTimeByTimezoneOffset = (timezoneOffset) => {
  const currentTime = new Date();
  console.log(timezoneOffset);
  const offsetMilliseconds = timezoneOffset * 60 * 1000;
  const cityTime = new Date(currentTime.getTime() + offsetMilliseconds);
  return cityTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
};

const CityTime = ({ cityName, timezoneOffset }) => {
  const [cityTime, setCityTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCityTime(getTimeByTimezoneOffset(timezoneOffset));
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, [timezoneOffset]);

  return (
    <>
        <div class="cardContainer">
          <div>{cityName}</div>
           <hr></hr>
             <div class="cityTime">
             <div>{cityTime}</div>
           </div>
        </div>

        
    </>
  );
};

export default CityTime