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
  //   let currentTimer = "00:00:00";

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setRemainingTime(totalSeconds);
    setTimerActive(true);
    handleCloseModal();

    // Start the timer countdown
    const timerInterval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when the timer is completed
    setTimeout(() => {
      clearInterval(timerInterval);
      setTimerActive(false);
      alert("Timer completed!");
    }, totalSeconds * 1000);
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
        {timerActive && <p className="timer-title">{title}</p>}
        {/* <h2>{`${hours} : ${minutes} : ${seconds}`}</h2> */}
        {timerActive ? (
          <div>
            <p className="timer">{formatTime(remainingTime)}</p>
          </div>
        ) : (
          <div>
            <p className="timer">{`00:00:00`}</p>
          </div>
        )}
        <div>
          {timerActive ? (
            <>
              <div className="btn-container">
                <div>
                  <button className="timer-btn">Edit Timer</button>
                </div>
                <div>
                  <button className="timer-btn" disabled={timerActive}>
                    Reset
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
        <form className="modal-form" onSubmit={handleSubmit}>
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
              Start Timer
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Timer;
