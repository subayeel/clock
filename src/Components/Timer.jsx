import React, { useState, useRef, useCallback, useContext } from "react";
import "../styles/Timer.css";
import Modal from "react-modal";
import tenBeepSound from "../Assets/Audio/tenSecBeep.mp3";
import threeBeepSound from "../Assets/Audio/threeSecBeep.mp3";
import buzzerSound from "../Assets/Audio/buzzer.mp3";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { ThemeContext } from "../Context/ThemeProvider";
import { margin } from "@mui/system";

const Timer = () => {
  const { dark, setDark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  // const [title, setTitle] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [timerInterval, setTimerInterval] = useState(null);
  const tenBeep = new Audio(tenBeepSound);
  const threeBeep = new Audio(threeBeepSound);
  const buzzer = new Audio(buzzerSound);
  const progressRef = useRef(100);
  const [pastTimers, setPastTimers] = useState([]);
  const visiblePastTimers = pastTimers.filter((timer) => timer.visible);
  const [presetTimers, setPresetTimers] = useState([
    {
      id: 1,
      presetHours: "0",
      presetMinutes: "10",
      presetSeconds: "0",
      totalSeconds: "600",
    },
    {
      id: 2,
      presetHours: "0",
      presetMinutes: "20",
      presetSeconds: "0",
      totalSeconds: "1200",
    },
    {
      id: 3,
      presetHours: "0",
      presetMinutes: "30",
      presetSeconds: "0",
      totalSeconds: "1800",
    },
  ]);
  //   let currentTimer = "00:00:00";

  const handleOpenModal = useCallback((context) => {
    setModalContext(context);
    setIsOpen(true);
  }, []);

  const handleCloseModal = () => {
    setModalContext(null);
    setIsOpen(false);
  };

  const addPresetTimers = (hours, minutes, seconds, totalSeconds) => {
    const newPresetTimer = {
      id: presetTimers.length + 1,
      presetHours: hours,
      presetMinutes: minutes,
      presetSeconds: seconds,
      totalSeconds: totalSeconds,
    };
    setPresetTimers((prevTimers) => [...prevTimers, newPresetTimer]);
  };

  const handlePastTimer = (totalSeconds) => {
    const exists = pastTimers.some(
      (pastTime) => pastTime.timeInSeconds === totalSeconds && pastTime.visible === true
    );
    console.log("EXIST: ",exists)
    if (!exists ) {
      const newPastTimer = {
        id: pastTimers.length + 1,
        timeInSeconds: totalSeconds,
        visible: true,
      };
      setPastTimers((prevTimers) => [...prevTimers, newPastTimer]);
    }
  };

  const handlePastTime = (event, pastTimer) => {
    if (event.target.className.includes("fa-circle-play")) {
      setTotalSeconds(pastTimer.timeInSeconds);
      setSubmitted(true);
      // if (timerActive) {
      //   setTotalSeconds(pastTimer.timeInSeconds);
      //   setSubmitted(true);
      // }
    } else {
      setPastTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.id === pastTimer.id
            ? { ...timer, visible: !timer.visible }
            : timer
        )
      );
    }
  };

  const resetTimer = (event) => {
    event.preventDefault();
    clearInterval(timerInterval);
    setTotalSeconds(0);
    setSelectedOption("");
    setTimerActive(false);
    progressRef.current = 100;
    setSubmitted(false);
  };

  const handleTimer = (event) => {
    event.preventDefault();
    const settingSeconds = handleTotalSeconds(hours, minutes, seconds);
    if (modalContext === "settimer") {
      setSubmitted(true);
      handleCloseModal();
    } else if (modalContext === "setpreset") {
      addPresetTimers(hours, minutes, seconds, settingSeconds);
    }
    handleCloseModal();
  };

  const handleTotalSeconds = (hours, minutes, seconds) => {
    setTotalSeconds(
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
    );
    return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    if (timerActive && submitted) {
      progressRef.current = 100;
      startTimer(totalSeconds);
    } else {
      startTimer(totalSeconds);
    }
  };

  const startTimer = (totalSeconds) => {
    setTotalSeconds(totalSeconds);
    setTimerActive(true);
    handlePastTimer(totalSeconds);
    // Start the timer countdown
    const interval = setInterval(() => {
      setTotalSeconds((prevTime) => {
        const newTime = prevTime - 1;

        // Calculate progress value
        const progressValue = (newTime / totalSeconds) * 100;
        progressRef.current = progressValue;

        // Play beep sound when the timer is near 10 seconds
        if (newTime <= 0) {
          clearInterval(interval);
          setTimerActive(false);
          setSelectedOption("");
          tenBeep.pause();
          tenBeep.currentTime = 0;
          buzzer.play();
          setSubmitted(false);
          progressRef.current = 100;
          return 0;
          // setSubmitted(false);
        } else if (newTime > 0 && newTime <= 3) {
          threeBeep.play();
        } else if (newTime > 3 && newTime <= 10) {
          tenBeep.play();
        } // Threshold value below which the progress bar appears filled
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

  const handleOptionChange = (presetTimer) => {
    const selectedValue = presetTimer.id;
    console.log("SO: ", selectedOption);
    console.log("SV: ", selectedValue);
    if (selectedOption === selectedValue) {
      setSelectedOption("");
      setTotalSeconds(0);
      setSubmitted(false);
      setTimerActive(false);
    } else {
      console.log("ACTIVE TIMER: ", timerActive);
      setSelectedOption(selectedValue);
      setTotalSeconds(parseInt(presetTimer.totalSeconds));
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="main-timer-container">
          <div className="progress-bar">
            {submitted ? (
              <div className="progress-bar-container">
                {/* <p className="timer">{formatTime(totalSeconds)}</p> */}
                <CircularProgressbar
                  value={progressRef.current}
                  text={formatTime(totalSeconds)}
                  strokeWidth={2}
                  styles={{
                    path: {
                      stroke: totalSeconds <= 3 && "red",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="progress-bar-container">
                {/* <p className="timer">{`00:00:00`}</p> */}
                <CircularProgressbar
                  value={0}
                  text={`00:00:00`}
                  strokeWidth={2}
                />
              </div>
            )}
          </div>
          <div className="preset">
            {presetTimers.map((presetTimer) => (
              <>
                <label
                  // style={{backgroundColor: dark ? "": "#0288D1"}}
                  htmlFor={`preset-${presetTimer.id}`}
                  className={`preset-label ${
                    selectedOption === presetTimer.id && submitted
                      ? "active"
                      : ""
                  }`}
                  key={presetTimer.id}
                  data-text={formatTime(presetTimer.totalSeconds)}
                >
                  <input
                    type="checkbox"
                    id={`preset-${presetTimer.id}`}
                    value={presetTimer.totalSeconds}
                    checked={selectedOption === presetTimer.id}
                    onChange={() => handleOptionChange(presetTimer)}
                    hidden
                  />
                  {/* {formatTime(presetTimer.totalSeconds)} */}
                </label>
              </>
            ))}
            <div
              onClick={() => handleOpenModal("setpreset")}
              className="add-container"
            >
              <div className="add-btn">
                <span>
                  <i
                    className="fa-sharp fa-solid fa-plus"
                    style={{ color: "#ffffff" }}
                  ></i>
                </span>
              </div>
            </div>
          </div>
          <div className="timer-buttons">
            {submitted ? (
              <>
                <div className="btn-container">
                  <div>
                    <button onClick={resetTimer} className="timer-btn">
                      <i
                        className="fa-sharp fa-solid fa-arrow-rotate-left fa-xl"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </button>
                  </div>
                  <div>
                    {timerActive ? (
                      <button onClick={handleSubmit} className="timer-btn">
                        <i
                          className="fa-solid fa-pause"
                          style={{ color: "#ffffff" }}
                        ></i>
                      </button>
                    ) : (
                      <button onClick={handleSubmit} className="timer-btn">
                        <i
                          className="fa-sharp fa-regular fa-circle-play fa-xl"
                          style={{ color: "#ffffff" }}
                        ></i>
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="btn-container">
                  <button
                    className="timer-btn"
                    onClick={() => handleOpenModal("settimer")}
                  >
                    Set Timer
                    <i
                      className="fa-sharp fa-regular fa-timer"
                      style={{ color: "#ffffff" }}
                    ></i>
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="pastTimerTable">
            {visiblePastTimers.length > 0 && (
              <MDBTable responsive hover>
                <MDBTableHead dark>
                  <tr>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {visiblePastTimers
                    .slice()
                    .reverse()
                    .map((pastTimer, index) => (
                      <>
                        <tr>
                          <td>{formatTime(pastTimer.timeInSeconds)}</td>
                          <td>
                            <i
                              onClick={(event) =>
                                handlePastTime(event, pastTimer)
                              }
                              className="fa-sharp fa-regular fa-circle-play"
                            ></i>
                            <i
                              onClick={(event) =>
                                handlePastTime(event, pastTimer)
                              }
                              style={{ marginLeft: "10px" }}
                              className="fa-solid fa-trash"
                            ></i>
                          </td>
                        </tr>
                      </>
                    ))}
                </MDBTableBody>
              </MDBTable>
            )}
          </div>
        </div>
      </div>

      <Modal
        className="modal-content"
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        overlayClassName={{
          base: "modal-overlay",
          afterOpen: "modal-overlay-open",
          beforeClose: "modal-overlay-close",
        }}
        closeTimeoutMS={300}
      >
        <div className="modal-header">
          <h2>Set Timer</h2>
          <span className="modal-close" onClick={handleCloseModal}>
            &times;
          </span>
        </div>
        <form className="modal-form" onSubmit={handleTimer}>
          {/* <label>
            Title: <br />
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br /> */}
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
