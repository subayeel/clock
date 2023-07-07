import React, { useState, useEffect } from "react";
import "../styles/pendulum.css";

const PendulumClock = ({ vibrateval }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateClockHandsRotation = () => {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    const hDeg = h * 30 + m * (360 / 720);
    const mDeg = m * 6 + s * (360 / 3600);
    const sDeg = s * 6;

    return { hDeg, mDeg, sDeg };
  };

  const { hDeg, mDeg, sDeg } = calculateClockHandsRotation();

  return (
    <div className="vclock" id={vibrateval ? "vshake" : ""}>
      <div>
        <div className="vinfo vdate">{`${time.getDate()}/${
          time.getMonth() + 1
        }/${time.getFullYear()}`}</div>
        <div className="vinfo vday">
          {time.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
      </div>
      <div className="vdot"></div>
      <div>
        <div
          className="vhour-hand"
          style={{ transform: `rotate(${hDeg}deg)` }}
        ></div>
        <div
          className="vminute-hand"
          style={{ transform: `rotate(${mDeg}deg)` }}
        ></div>
        <div
          className="vsecond-hand"
          style={{ transform: `rotate(${sDeg}deg)` }}
        ></div>
      </div>
      <div>
        <span className="vh3 span">3</span>
        <span className="vh6 span">6</span>
        <span className="vh9 span">9</span>
        <span className="vh12 span">12</span>
      </div>
      <div className="vdiallines"></div>
    </div>
  );
};

export default PendulumClock;
