import React, { useState } from "react";
import "../styles/Timer.css";
import Modal from "react-modal";
import tenBeepSound from "../Assets/audio/tenSecBeep.mp3";
import threeBeepSound from "../Assets/audio/threeSecBeep.mp3";
import buzzerSound from "../Assets/audio/buzzer.mp3";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [title, setTitle] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const tenBeep = new Audio(tenBeepSound);
  const threeBeep = new Audio(threeBeepSound);
  const buzzer = new Audio(buzzerSound);
  //   let currentTimer = "00:00:00";

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const resetTimer = (event) => {
    event.preventDefault();
    clearInterval(timerInterval);
    setTotalSeconds(0)
    setSelectedOption("");
    setSubmitted(false);
  };

  const handleTimer = (event) => {
    event.preventDefault();
    setTotalSeconds(
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    );
    setSubmitted(true);
    handleCloseModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    startTimer(totalSeconds);
  };

  const startTimer = (totalSeconds) => {
    setTotalSeconds(totalSeconds);
    setTimerActive(true);

    // Start the timer countdown
    const interval = setInterval(() => {
      setTotalSeconds((prevTime) => {
        const newTime = prevTime - 1;

        // Play beep sound when the timer is near 10 seconds
        if (newTime <= 0) {
          clearInterval(interval);
          setTimerActive(false);
          tenBeep.pause();
          tenBeep.currentTime = 0;
          buzzer.play();
          setSubmitted(false);
          return 0;
          // setSubmitted(false);
        } else if (newTime > 0 && newTime <= 3) {
          threeBeep.play();
        } else if (newTime > 3 && newTime <= 10) {
          tenBeep.play();
        }
        console.log(newTime); // Threshold value below which the progress bar appears filled
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);
    setTimerInterval(interval);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedOption === selectedValue) {
      setSelectedOption("");
      setTotalSeconds(0);
      setSubmitted(false);
      console.log("entered");
    } else {
      setSelectedOption(selectedValue);
      setTotalSeconds(parseInt(selectedValue) * 60);
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className="main-timer-container">
        {submitted && <p className="timer-title">{title}</p>}
        {submitted ? (
          <div className="progress-bar-container">
            {/* <p className="timer">{formatTime(totalSeconds)}</p> */}
            <CircularProgressbar
              value={totalSeconds}
              text={formatTime(totalSeconds)}
              strokeWidth={2}
            />
          </div>
        ) : (
          <div className="progress-bar-container">
            {/* <p className="timer">{`00:00:00`}</p> */}
            <CircularProgressbar
              value={totalSeconds}
              text={`00:00:00`}
              strokeWidth={2}
            />
          </div>
        )}
        <div className="preset">
          {/* <div onClick={(event) => handlePresetTimer(event)} value='00:10:00' className={`preset-ten ${timerActive ? 'active' : ''}`}>00:10:00</div>
          <div className={`preset-twenty ${timerActive ? 'active' : ''}`}>00:20:00</div> */}

          <div>
            <input
              type="checkbox"
              id="preset-ten"
              value="10"
              checked={selectedOption === "10"}
              onChange={handleOptionChange}
              hidden
            />
            <label
              className={`${selectedOption === "10" ? "active" : ""}`}
              htmlFor="preset-ten"
            >
              00:10:00
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="preset-twenty"
              value="20"
              checked={selectedOption === "20"}
              onChange={handleOptionChange}
              hidden
            />
            <label
              className={`${selectedOption === "20" ? "active" : ""}`}
              htmlFor="preset-twenty"
            >
              00:20:00
            </label>
          </div>
        </div>
        <div>
          {submitted ? (
            <>
              <div className="btn-container">
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
          <h2>Set Timer</h2>
          <span className="modal-close" onClick={handleCloseModal}>
            &times;
          </span>
        </div>
        <form className="modal-form" onSubmit={handleTimer}>
          <label>
            Title: <br />
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <div className="time-input">
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
          </div>
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
