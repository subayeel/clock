import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import clock from "../Assets/Images/clock.png";
import { Alarm, AvTimer, DarkMode, Language, Timer } from "@mui/icons-material";
import styled from "styled-components";
import { ThemeContext } from "../Context/ThemeProvider";

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
const StyledDarkMode = styled(DarkMode)`
  color: white;
  height: 36px;
  width: 36px;
  &:hover {
    color: grey;
    cursor: pointer;
  }
`;
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setDark, dark } = useContext(ThemeContext);

  const toggleTheme = () => {
    setDark(!dark);
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
          </ul>
        </header>
      </nav>
      <aside
        style={dark ? { background: "#2d4356" } : { background: "#0288d1" }}
      >
        <ul>
          <li
            style={
              location.pathname.includes("/alarm") ? { background: "grey" } : {}
            }
            onClick={() => navigate("/alarm")}
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
        </ul>
      </aside>
      <div
        style={{
          height: "calc(100vh - 80px) ",
          overflow: "auto",
          marginLeft: "107px",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
