import React, { useState, useEffect } from 'react';
import Card from './Card';

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
            <Card cityname={"New York"} api_city={"New_York"}/>
            <Card cityname={"Chicago, Illinois"} api_city={"Chicago"}/>
            <Card cityname={"Denver, Colorado"} api_city={"Denver"}/>
            <Card cityname={"Los Angeles, California"} api_city={"Los_Angeles"}/>
         </>
  );
};

export default Time;