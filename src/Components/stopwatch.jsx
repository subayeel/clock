import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isStoped, setIsStoped] = useState(true);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIsRunning(true);
      setIsStarted(true);
      setIsStoped(false);
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
    <div className="container">
      <p className="time">{formatTime(time)}</p>
      {isStoped && (
        <>
          <button className="btn reset" onClick={reset}>Reset</button>
          <button className="btn start" onClick={start}>Start</button>
        </>
      )}
      {isStarted && (
        <>
          <button className="btn lap" onClick={recordLap}>Lap</button>
          <button className="btn stop" onClick={stop}>Stop</button>
        </>
      )}
      {laps.length > 0 && (
        <div className="lap-field">
          <table>
            <tbody>
              <tr>
                <th>LAP</th>
                <th>TIME</th>
              </tr>
              {laps.slice().reverse().map((lap, index) => (
                <tr key={index}>
                  <td>{lap.lapNumber}</td>
                  <td> {formatTime(lap.lapTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
