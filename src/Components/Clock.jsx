import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Card from "./Card";
import music1 from "../asset/music2.mp3";
import Alarm from "./Alarm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
let flag = true;
let globalData = [];
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
    globalData = JSON.parse(localStorage.getItem("item") || "[]");
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
    let type = temp.charAt(temp.length - 2) + "" + temp.charAt(temp.length - 1);
    console.log(
      checkElem((check.getHours() % 12) + ":" + check.getMinutes() + ":" + type)
    );
    type = type.toLowerCase();
    if (checkElem(temp.split(":")[0] + ":" + temp.split(":")[1] + ":" + type)) {
      console.log("Camh éere");
      if (flag) {
        console.log(isActive, "flag", flag);
        audioElement.play();
        handleShow(true);
      }
    }
  }
  const handlePause = (val) => {
    // handleShow();
    setShow(false);
    console.log("came here");
    if (val) {
      flag = false;
      setisActive(false);
      console.log(isActive);
      audioElement.pause();
      setShow(false);
    }
  };
  const checkElem = (time) => {
    console.log(time, "Chek elem");
    for (let i = 0; i < AlarmData.length; i++) {
      console.log(globalData[i] == time, globalData[i], time);
      if (
        globalData[i] == time ||
        globalData[globalData.length - 1 - i] == time
      ) {
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
      <div
        className={`${showw ? "alarmpopup_connnn" : "alarmclosepop"} `}
        // style={{ display: showw ? "block" : "none" }}
      >
        <div className="popup_title">Stop Alarm</div>
        <div className="alarmpop_foot">
          {/* <button variant="secondary" onClick={handleClose}>
            Close
          </button> */}
          <button
            class="stop_btn"
            onClick={() => {
              handleClose();
              handlePause(true);
            }}
          >
            Stop
          </button>
        </div>
      </div>
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
