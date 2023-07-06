import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Card from "./Card";
import music1 from "../asset/music2.mp3";
import Alarm from "./Alarm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
let flag = true;
const Clock = ({ show, AlarmData }) => {
  const [showw, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var index = 0;
  let id = 0;
  let audioElement = new Audio();
  audioElement.src = music1;
  audioElement.loop = true;
  // let isActive = true;
  const [isActive, setisActive] = useState(true);
  const [date, setDate] = useState(new Date());
  const [arr, setarr] = useState([]);
  // let flag = true;
  useEffect(() => {
    const timerId = setInterval(() => {
      const check = date.toLocaleTimeString();
      checkAlarm();
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  function checkAlarm() {
    const check = new Date();
    const seconds = check.getSeconds();
    if (seconds == 0 || seconds == "00") {
      console.log("after pausing caméhere");
      setisActive(true);
      flag = true;
    }
    // console.log(flag);
    if (!flag) audioElement.pause();
    const temp = check.toLocaleTimeString();
    const type =
      temp.charAt(temp.length - 2) + "" + temp.charAt(temp.length - 1);
    // console.log(
    //   checkElem((check.getHours() % 12) + ":" + check.getMinutes() + ":" + type)
    // );
    if (
      checkElem((check.getHours() % 12) + ":" + check.getMinutes() + ":" + type)
    ) {
      if (flag) {
        console.log(isActive, "flag", flag);
        audioElement.play();
        handleShow(true);
      }
    }
  }
  const handlePause = (val) => {
    handleShow(false);
    if (val) {
      flag = false;
      setisActive(false);
      console.log(isActive);
      audioElement.pause();
      setShow(false);
    }
  };
  const checkElem = (time) => {
    console.log(time);
    for (let i = 0; i < AlarmData.length; i++) {
      if (AlarmData[i] == time || AlarmData[AlarmData.length - 1 - i] == time) {
        return true;
      }
    }
    return false;
  };
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const formattedTime = date.toLocaleTimeString();
  return (
    <>
      <Modal show={showw} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Close Alarm</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // handleClose(true);
              handlePause(true);
            }}
          >
            Stop
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="alarm_con">
        <div className="alarm_time">{formattedTime}</div>
        <div className="alarm_day">{formattedDate}</div>
        <button onClick={() => show()} className="alarm_set_btn">
          Set Alarm
        </button>
      </div>
    </>
  );
};

export default Clock;
