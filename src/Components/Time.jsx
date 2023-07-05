import React, { useState, useEffect } from 'react';
import CityTime from './CityTime';
import '../styles/time.css'


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
            <div className='centerContainer'>
              <div>
                  <div className='heading'>Time now</div>
                  <div className='formattedTime'>{formattedTime}</div>
                  <div className='formattedDate'>{formattedDate}</div>
              </div>
            </div>
            
            <div>  
                <ul>
                  <div className="cardContainerWrapper">
                    <CityTime cityName="New York" timezoneOffset={-570} />
                    <CityTime cityName="Chicago, illinois" timezoneOffset={-630} />
                    <CityTime cityName="Denver, Colorado" timezoneOffset={-690} />
                    <CityTime cityName="Los Angeles, California" timezoneOffset={-750} />
                    <CityTime cityName="Phoenix, Arizona" timezoneOffset={-750} />
                    <CityTime cityName="Anchorage, Alaska" timezoneOffset={-810} />
                    <CityTime cityName="Honolulu, Hawaii" timezoneOffset={-930} />
                    <CityTime cityName="London, United Kingdom" timezoneOffset={-270} />
                    <CityTime cityName="Sydney, Australia" timezoneOffset={270} />
                    <CityTime cityName="Manila, Philippines" timezoneOffset={150} />
                    <CityTime cityName="Singapore, Singapore" timezoneOffset={150} />
                    <CityTime cityName="Tokyo, Japan" timezoneOffset={210} />
                    <CityTime cityName="Shanghai, China" timezoneOffset={150} />
                    <CityTime cityName="Berlin, Germany" timezoneOffset={-210} />
                    
                  </div>
                </ul>
            </div>
         </>
  );
};

export default Time;