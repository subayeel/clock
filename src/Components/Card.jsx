import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const Card = ({cityname, api_city}) => {
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getTime = async () => {
        try {
          const response = await fetch(`http://worldtimeapi.org/api/timezone/Europe/${api_city}`);
          if (response.ok) {
            const data = await response.json();
            const datetime = moment.tz(data.datetime, data.timezone);
            setTime(datetime.format('HH:mm:ss'));
          } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      getTime();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return <div>{cityname }{time}</div>;
  };

export default Card