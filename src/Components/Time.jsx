import React, { useState, useEffect } from 'react';
import CityTime from './CityTime';

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const optionsTime = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  const formattedTime = currentTime.toLocaleTimeString(undefined, optionsTime);

  const optionsDate = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = currentTime.toLocaleDateString(undefined, optionsDate);
  return (
         <>
            <h1>Time now</h1>
            <div>{formattedTime}</div>
            <div>{formattedDate}</div>
            <div>  
                <ul>
                    <CityTime cityName="New York" timezoneOffset={-570} />
                    <CityTime cityName="Chicago" timezoneOffset={-630} />
                    <CityTime cityName="Denver" timezoneOffset={-690} />
                    <CityTime cityName="Los Angeles" timezoneOffset={-750} />
                    <CityTime cityName="Phoenix" timezoneOffset={-750} />
                    <CityTime cityName="Alaska" timezoneOffset={-810} />
                    <CityTime cityName="Hawaii" timezoneOffset={-930} />
                    <CityTime cityName="London" timezoneOffset={-270} />
                    <CityTime cityName="Sydney" timezoneOffset={270} />
                    <CityTime cityName="Philippines" timezoneOffset={150} />
                    <CityTime cityName="Singapore" timezoneOffset={150} />
                    <CityTime cityName="Japan" timezoneOffset={210} />
                    <CityTime cityName="Shanghai" timezoneOffset={150} />
                    <CityTime cityName="Germany" timezoneOffset={-210} />
                </ul>
            </div>
         </>
  );
};

export default Time;