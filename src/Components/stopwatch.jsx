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
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor(((ms % 60000) % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div class="container">
      <p class="time">{formatTime(time)}</p>
      {isStoped && (
        <>
          <button class="btn reset" onClick={reset}>Reset</button>
          <button class="btn start" onClick={start}>Start</button>
        </>
      )}
      {isStarted && (
        <>
          <button class="btn lap" onClick={recordLap}>Lap</button>
          <button class="btn stop" onClick={stop}>Stop</button>
        </>
      )}
      {laps.length > 0 && (
        <div class="lap-field">
          <table>
            <tr>
              <th>LAP</th>
              <th>TIME</th>
            </tr>
            {laps.map((lap) => (
              <tr key={lap.lapNumber}>
                <td>{lap.lapNumber}</td>
                <td> {formatTime(lap.lapTime)}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
