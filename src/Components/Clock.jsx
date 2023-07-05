import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Card from "./Card";
import music1 from "../asset/music2.mp3";
const Clock = ({ show, AlarmData }) => {
  // const [index, setIndex] = useState(0);

  var index = 0;
  let id = 0;
  var audioElement = new Audio();
  audioElement.src = music1;
  audioElement.loop = true;
  let isActive = true;
  const [date, setDate] = useState(new Date());
  // const [alaram, setalaram] = useState({
  //   hour: 0,
  //   min: 0,
  //   sound: "",
  //   title: "",
  // });
  const [arr, setarr] = useState([]);
  useEffect(() => {
    const timerId = setInterval(() => {
      const check = date.toLocaleTimeString();
      // console.log(check.substring(0, 5) == HandleTime());

      checkAlarm();
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);
  function checkAlarm() {
    index = index + 1;
    id = index;
    const check = new Date();
    const str = check.toLocaleTimeString().split(" ")[0];
    console.log(str.substring(0, str.length - 3), HandleTime());
    console.log(check.toLocaleTimeString().substring(8, 10), HandleType());
    if (
      str.substring(0, str.length - 3) == HandleTime() &&
      check.toLocaleTimeString().substring(8, 10) == HandleType()
    ) {
      console.log("came here");
      audioElement.play();
      alert("Close");
      audioElement.pause();

      // RemoveElemFrom(id);
    }
  }
  function HandleTime() {
    console.log(AlarmData, index);
    if (index >= AlarmData.length || AlarmData.length == 1) {
      index = 0;
    }
    return `${AlarmData[index]?.Hour}:${
      AlarmData[index]?.Minute < 10 ? "0" : ""
    }${AlarmData[index]?.Minute}`;
  }
  function HandleType() {
    if (index >= AlarmData.length || AlarmData.length == 1) {
      index = 0;
    }
    return `${AlarmData[index]?.Type}`;
  }
  // function RemoveElemFrom(id) {
  //   let arr = JSON.parse(localStorage.getItem("item") || "[]");
  //   arr = arr.filter((item, indd) => {
  //     if (indd == id) {
  //       return item;
  //     }
  //   });
  //   localStorage.setItem("item", JSON.stringify(arr));
  // }
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const formattedTime = date.toLocaleTimeString();
  const handlealaram = () => {
    // setarr([...arr, alaram]);
    // setalaram({
    //   hour: 0,
    //   min: 0,
    //   sound: "",
    //   title: "",
    // });
  };

  function handleSoundChange() {}
  return (
    <>
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
