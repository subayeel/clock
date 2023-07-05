import React, { useEffect, useReducer, useState } from "react";
import Clock from "./Clock";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Card from "./Card";
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
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("item") || [])
  );
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleAlarm = () => {
    data.push(state);
    setData(data);
    localStorage.setItem("item", JSON.stringify(data));
  };

  const addelem = () => {
    let data = [{ Hour: 11, Minute: 15, Type: "am", Id: 0 }];
    localStorage.setItem("item", JSON.stringify(data));
  };
  useEffect(() => {
    addelem();
  }, []);
  return (
    <>
      {console.log(state, data)}
      <div className="modal_container">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                <span>
                  <input
                    type="radio"
                    id=""
                    name="test"
                    onClick={() => dispatch({ type: "setAM" })}
                    checked={state.Type === "am"}
                  />
                  AM
                </span>
                <span>
                  {" "}
                  <input
                    type="radio"
                    id=""
                    name="test"
                    checked={state.Type === "pm"}
                    onClick={() => dispatch({ type: "setPM" })}
                  />
                  PM
                </span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleAlarm();
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="alarm_container">
        <div className="left_container">
          <Clock show={handleShow} AlarmData={data} />
        </div>
        <div className="right_containerr">
          <h1 className="heading_myalarm">My Alarm</h1>
          {data && (
            <div className="right_container">
              {data?.map((obj, i) => {
                if (i != 0)
                  return (
                    <Card
                      key={i}
                      id={i}
                      data={data}
                      setData={setData}
                      {...obj}
                    />
                  );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Alarm;
