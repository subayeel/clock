import React, { useEffect, useState } from "react";

const AnalogClock = ({ vibrateval }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getRotation = (unit, max) => {
    const deg = (unit / max) * 360;
    return `rotateZ(${deg}deg)`;
  };

  const hh = time.getHours();
  const mm = time.getMinutes();
  const ss = time.getSeconds();

  return (
    <div className="clock">
      <div
        className="hour"
        style={{ transform: getRotation(hh + mm / 60, 12) }}
      ></div>
      <div className="min" style={{ transform: getRotation(mm, 60) }}></div>
      <div className="sec" style={{ transform: getRotation(ss, 60) }}></div>
    </div>
  );
};

export default AnalogClock;
