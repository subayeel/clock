import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import Clock from "./Clock";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Card from "./Card";
import "../styles/alarm.css";
import AnalogClock from "./AnalogClock";
const dd = new Date();
var ampm = dd.getHours() >= 12 ? "pm" : "am";

const initialState = {
  Hour: dd.getHours(),
  Minute: dd.getMinutes(),
  Type: ampm,
};

const reducer = (state, action) => {
  let newState;
  if (action.type === "IncrementHour") {
    if (state.Hour > 23) {
      newState = {
        ...state,
        Hour: 1,
      };
    } else {
      newState = {
        ...state,
        Hour: state.Hour + 1,
      };
    }
  } else if (action.type === "DecrementHour") {
    if (state.Hour <= 1) {
      newState = {
        ...state,
        Hour: 12,
      };
    } else {
      newState = {
        ...state,
        Hour: state.Hour - 1,
      };
    }
  } else if (action.type === "IncrementMinute") {
    if (state.Minute >= 60) {
      newState = {
        ...state,
        Minute: 1,
      };
    } else {
      newState = {
        ...state,
        Minute: state.Minute + 1,
      };
    }
  } else if (action.type === "DecrementMinute") {
    if (state.Minute <= 1) {
      newState = {
        ...state,
        Minute: 0,
      };
    } else {
      newState = {
        ...state,
        Minute: state.Minute - 1,
      };
    }
  } else if (action.type === "setAM") {
    newState = {
      ...state,
      Type: "am",
    };
  } else if (action.type === "setPM") {
    newState = {
      ...state,
      Type: "pm",
    };
  }
  return newState;
};

const Alarm = () => {
  const [loadAgain, setLoadAgain] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("item") || "[]")
  );
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAlarm = () => {
    let time = `${state.Hour}:${
      state.Minute < 10 ? "0" + state.Minute : state.Minute
    }`;
    let val = document.getElementById("time").value;
    console.log(val);
    data.push(val);
    setData(data);
    localStorage.setItem("item", JSON.stringify(data));
  };
  useEffect(
    () => {
      console.log(loadAgain);
    },
    [data],
    [loadAgain]
  );
  return (
    <>
      <div>
        {/* {console.log(state, data)} */}
        <div className="modal_container">
          <div
            className="single_modal_card"
            style={{ display: show ? "block" : "none" }}
          >
            <div className="action_container">
              <input type="time" id="time" />
            </div>
            <div className="mod_btn_con">
              <button className="btn1" onClick={handleClose}>
                Close
              </button>
              <button
                className="btn2"
                onClick={() => {
                  handleAlarm();
                  handleClose();
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* add */}
      <div className="left_right_clock">
        <div className="alarm_container">
          <div className="left_container">
            <Clock show={handleShow} AlarmData={data} vibratefun={setVibrate} />
          </div>
          <div className="right_containerr">
            <div className="alarm_card_containerr">
              <h1 className="heading_myalarm">
                {data.length > 0 ? "Existing Alarm" : "No Existing Alarm"}
              </h1>
              {data && (
                <div className="right_container">
                  {data?.map((obj, i) => {
                    return (
                      <Card
                        key={i}
                        time={obj}
                        id={i}
                        addata={setData}
                        arr={data}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pendulum_container">
          {/* <PendulumClock vibrateval={vibrate} /> */}
          <AnalogClock vibrateval={vibrate} />
        </div>
      </div>
    </>
  );
};

export default Alarm;
