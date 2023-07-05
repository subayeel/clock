import React, { useState, useRef } from 'react';
import { VscDebugStart } from 'react-icons/vsc';
import { BsStop } from 'react-icons/bs';
import { LuTimerReset } from 'react-icons/lu';
import { PiFlagPennant } from 'react-icons/pi';
import '../styles/stopwatchstyle.css'

function Stopwatch() {
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

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(((ms % 60000) % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='container'>
      <div className='watch'>
        <div className='outer-circle' id={isAnimation ? 'animation-bg' : ''}>
          <div className='inner-circle'>
            <p className="time">{formatTime(time)}</p>
          </div>
        </div>
        <div className='button-wrapper'>
          {isStoped && (
            <>
              <button className="btn reset" onClick={reset}><LuTimerReset size='25px' color='blue' /></button>
              <button className="btn start" onClick={start}><VscDebugStart size='25px' color='blue' /></button>
            </>
          )}
          {isStarted && (
            <>
              <button className="btn lap" onClick={recordLap}><PiFlagPennant size='25px' color='blue' /></button>
              <button className="btn stop" onClick={stop}><BsStop size='25px' color='blue' /></button>
            </>
          )}
        </div>
        {laps.length > 0 && (
          <>
            <div className='lap-heading'>
              <span className='lap-name'>LAP</span>
              <span className='time-name'>TIME</span>
            </div>
            <ul className='laps'>
              {laps.slice().reverse().map((lap, index) => (
                <li className='lap-items' key={index}>
                  <span className='number'>{lap.lapNumber}</span>
                  <span className='time-stamp'>{formatTime(lap.lapTime)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
