import React, { useState, useRef, useContext } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { BsStop } from "react-icons/bs";
import { LuTimerReset } from "react-icons/lu";
import { PiFlagPennant } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { BsGear } from 'react-icons/bs';
import "../styles/stopwatchstyle.css";
import {ThemeContext} from "../Context/ThemeProvider"

function Stopwatch() {
  const {dark} = useContext(ThemeContext)
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isStoped, setIsStoped] = useState(true);
  const [isAnimation, setAnimation] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIsRunning(true);
      setIsStarted(true);
      setIsStoped(false);
      setAnimation(true);
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setIsStarted(false);
      setIsStoped(true);
      setAnimation(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    setIsStarted(false);
    setAnimation(false);
  };

  const recordLap = () => {
    const lapTime = time;
    const lapNumber = laps.length + 1;
    const newLap = { lapNumber, lapTime };
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  const deletelap = (lapId) => {
    setLaps((prevLaps) => prevLaps.filter((lap) => lap.lapNumber !== lapId));
  };

  const formatTime = (ms) => {
    const milliseconds = Math.floor(((ms % 60000) % 1000) / 10);
    const seconds = Math.floor((ms % 60000) / 1000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const hours = Math.floor(ms / 3600000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container-time">
      <div className="watch">
        <div className="outer-circle" id={isAnimation ? "animation-bg" : ""}>
          <div className="inner-circle">
            <p className="time">{formatTime(time)}</p>
          </div>
        </div>
        <div className="button-wrapper">
          {isStoped && (
            <>
              <button className={dark? "btn reset":"lightbtn reset"} onClick={reset}>
                <LuTimerReset size="25px" color="white" />
              </button>
              <button className={dark? "btn start":"lightbtn start"} onClick={start}>
                <VscDebugStart size="25px" color="white" />
              </button>
            </>
          )}
          {isStarted && (
            <>
              <button className={dark? "btn lap":"lightbtn lap"} onClick={recordLap}>
                <PiFlagPennant size="25px" color="white" />
              </button>
              <button className={dark? "btn stop":"lightbtn stop"} onClick={stop}>
                <BsStop size="25px" color="white" />
              </button>
            </>
          )}
        </div>
        {laps.length > 0 && (
          <>
            <div className="lap-heading">
              <span className="lap-name"> LAP</span>
              <span className="time-name">TIME</span>
              <span className="time-name">DELETE</span>
            </div>
            <ul className="laps">
              {laps
                .slice()
                .reverse()
                .map((lap, index) => (
                  <li className="lap-items" key={index}>
                    <span className="number">{laps.length - index}</span>
                    <span className="time-stamp">
                      {formatTime(lap.lapTime)}
                    </span>
                    <span>
                      <MdDeleteOutline
                        size="20px"
                        color="red"
                        onClick={() => deletelap(lap.lapNumber)}
                      />
                    </span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
      <div className={dark? "gears":"lightgears"}>
        <BsGear id={isAnimation ? 'spin' : ''}  size='350px' className='gear1'/>
        <BsGear id={isAnimation ? 'spin-back' : ''} size='250px' className='gear2'/>
        <BsGear id={isAnimation ? 'spin' : ''} size='150px' className='gear3'/>
        <BsGear id={isAnimation ? 'spin-back' : ''} size='220px' className='gear4'/>
      </div>
    </div>
  );
}

export default Stopwatch;
