import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import Clock from "./Clock";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Card from "./Card";
import "../styles/alarm.css";
const initialState = { Hour: 11, Minute: 15, Type: "am" };
const reducer = (state, action) => {
  let newState;
  if (action.type === "IncrementHour") {
    if (state.Hour >= 12) {
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
        Minute: 60,
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
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("item") || "[]")
  );
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAlarm = () => {
    let time = `${state.Hour}:${state.Minute}:${state.Type}`;
    console.log(time);
    data.push(time);
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
        {console.log(state, data)}
        <div className="modal_container">
          <div
            className="single_modal_card"
            style={{ display: show ? "block" : "none" }}
          >
            <div className="action_container">
              <div className="Hour_container">
                <div
                  className="up_arrow"
                  onClick={() => dispatch({ type: "IncrementHour" })}
                >
                  <KeyboardArrowUpIcon />
                </div>
                <div className="display_hour">{state.Hour}</div>
                <div
                  className="down_arrow"
                  onClick={() => dispatch({ type: "DecrementHour" })}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>
              <div className="minute_container">
                <div
                  className="up_arrow"
                  onClick={() => dispatch({ type: "IncrementMinute" })}
                >
                  <KeyboardArrowUpIcon />
                </div>
                <div className="display_hour">{state.Minute}</div>
                <div
                  className="down_arrow"
                  onClick={() => dispatch({ type: "DecrementMinute" })}
                >
                  <KeyboardArrowDownIcon />
                </div>
              </div>
              <div className="type_container">
                <span className="spaninp">
                  <input
                    className="radio-btn"
                    type="radio"
                    id=""
                    name="test"
                    onClick={() => dispatch({ type: "setAM" })}
                    checked={state.Type === "am"}
                  />
                  Am
                </span>
                <span className="spaninp">
                  {" "}
                  <input
                    className="radio-btn"
                    type="radio"
                    id=""
                    name="test"
                    checked={state.Type === "pm"}
                    onClick={() => dispatch({ type: "setPM" })}
                  />
                  Pm
                </span>
              </div>
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
      <div className="alarm_container">
        <div className="left_container">
          <Clock show={handleShow} AlarmData={data} />
        </div>
        <div className="right_containerr">
          <div className="alarm_card_containerr">
            <h1 className="heading_myalarm">My Alarm</h1>
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
    </>
  );
};

export default Alarm;
