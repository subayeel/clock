import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Timer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [title, setTitle] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState("");
  const [preset, setPreset] = useState(false);
  //   let currentTimer = "00:00:00";

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const resetTimer = (event) => {
    event.preventDefault();
    setRemainingTime(0);
    setSubmitted(false);
  };

  const setTimer = (event) => {
    event.preventDefault();
    setTotalSeconds(
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    );
    setRemainingTime(totalSeconds);
    setSubmitted(true);
    handleCloseModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    startTimer(totalSeconds);
  };

  const startTimer = (totalSeconds) => {
    setRemainingTime(totalSeconds);
    setTimerActive(true);

    // Start the timer countdown
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when the timer is completed
    setTimerTimeout(timerInterval, totalSeconds * 1000);
  };

  const setTimerTimeout = (timerInterval, timeoutDuration) => {
    setTimeout(() => {
      clearInterval(timerInterval);
      setTimerActive(false);
      setSubmitted(false);
      console.log("Timer completed!");
    }, timeoutDuration);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="main-timer-container">
        {submitted && <p className="timer-title">{title}</p>}
        {/* <h2>{`${hours} : ${minutes} : ${seconds}`}</h2> */}
        {submitted ? (
          <div>
            <p className="timer">{formatTime(remainingTime)}</p>
          </div>
        ) : (
          <div>
            <p className="timer">{`00:00:00`}</p>
          </div>
        )}
        <div className="preset">
          <div className={`preset-ten ${timerActive ? 'active' : ''}`}>00:10:00</div>
          <div className="preset-twenty">00:20:00</div>
        </div>
        <div>
          {submitted ? (
            <>
              <div className="btn-container">
                <div>
                  <button className="timer-btn">Edit</button>
                </div>
                <div>
                  <button onClick={resetTimer} className="timer-btn">
                    Reset
                  </button>
                </div>
                <div>
                  <button onClick={handleSubmit} className="timer-btn">
                    Start
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="btn-container">
                <button className="timer-btn" onClick={handleOpenModal}>
                  Set Timer
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        className="modal-content"
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
      >
        <div className="modal-header">
          <h2>Form Modal</h2>
          <span className="modal-close" onClick={handleCloseModal}>
            &times;
          </span>
        </div>
        <form className="modal-form" onSubmit={setTimer}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <label>
            Hours:
            <select
              name="hours"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
            >
              {Array.from(Array(24), (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Minutes:
            <select
              name="minutes"
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
            >
              {Array.from(Array(60), (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Seconds:
            <select
              name="seconds"
              value={seconds}
              onChange={(event) => setSeconds(event.target.value)}
            >
              {Array.from(Array(60), (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>
          <br />
          <div className="modal-footer">
            <button className="timer-btn" type="submit">
              Set Timer
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Timer;
