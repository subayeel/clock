import React, { useContext, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import clock from "../Assets/Images/clock.png";
import { Alarm, AvTimer, DarkMode, Language, Timer } from "@mui/icons-material";
import styled from "styled-components";
import { ThemeContext } from "../Context/ThemeProvider";

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BiFullscreen, BiTask } from "react-icons/bi";

const StyledAlarm = styled(Alarm)`
  color: #eab2a0;
  height: 50px;
  width: 50px;
`;
const StyledTimer = styled(Timer)`
  color: #eab2a0;
  height: 50px;
  width: 50px;
`;
const StyledStopWatch = styled(AvTimer)`
  color: #eab2a0;
  height: 50px;
  width: 50px;
`;
const StyledWorldClock = styled(Language)`
  color: #eab2a0;
  height: 50px;
  width: 50px;
`;
const StyledTodo = styled(BiTask)`
  color: #eab2a0;
  height: 32px;
  width: 32px;
`;
const StyledDarkMode = styled(DarkMode)`
  color: white;
  height: 36px;
  width: 36px;
  &:hover {
    color: grey;
    cursor: pointer;
  }
`;
const StyledFullScreen = styled(BiFullscreen)`
  color: white;
  height: 28px;
  width: 28px;
  &:hover {
    color: grey;
    cursor: pointer;
  }
`;
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const handle = useFullScreenHandle();
  const cardRef = useRef(null);
  const { setDark, dark } = useContext(ThemeContext);

  console.log(location.pathname);
  const toggleTheme = () => {
    localStorage.setItem("dark", !dark);
    setDark(!dark);
  };

  const openFullscreen = () => {
    const cardElement = cardRef.current;

    if (cardElement.requestFullscreen) {
      cardElement.requestFullscreen();
    } else if (cardElement.webkitRequestFullscreen) {
      /* Safari */
      cardElement.webkitRequestFullscreen();
    } else if (cardElement.msRequestFullscreen) {
      /* IE11 */
      cardElement.msRequestFullscreen();
    }
  };
  return (
    <>
      <nav>
        <header
          style={dark ? { background: "#2d4356" } : { background: "#0288d1" }}
        >
          <span className="logo">
            <img src={clock} height="40px" />
            <p>Clock</p>
          </span>
          <ul>
            <li>
              <Link to="/holidays">Holidays</Link>
            </li>
            <li>
              <StyledDarkMode onClick={toggleTheme} />
            </li>
            <li>
              <StyledFullScreen onClick={openFullscreen} />
            </li>
          </ul>
        </header>
      </nav>
      <aside
        style={dark ? { background: "#2d4356" } : { background: "#0288d1" }}
      >
        <ul>
          <li
            style={location.pathname == "/" ? { background: "grey" } : {}}
            onClick={() => navigate("/")}
          >
            <StyledAlarm></StyledAlarm>
            <p>Alarm Clock</p>
          </li>
          <li
            style={
              location.pathname.includes("/timer") ? { background: "grey" } : {}
            }
            onClick={() => navigate("/timer")}
          >
            <StyledTimer />
            <p>Timer</p>
          </li>
          <li
            style={
              location.pathname.includes("/stopwatch")
                ? { background: "grey" }
                : {}
            }
            onClick={() => navigate("/stopwatch")}
          >
            <StyledStopWatch />
            <p>Stopwatch</p>
          </li>
          <li
            style={
              location.pathname.split("/").includes("time")
                ? { background: "grey" }
                : {}
            }
            onClick={() => navigate("/time")}
          >
            <StyledWorldClock />
            <p>World Clock</p>
          </li>
          <li
            style={
              location.pathname.split("/").includes("todo")
                ? { background: "grey" }
                : {}
            }
            onClick={() => navigate("/todo")}
          >
            <StyledTodo />
            <p>To Do</p>
          </li>
        </ul>
      </aside>

      <div ref={cardRef} className="outlet-container">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
