import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import clock from "../Assets/Images/clock.png";
function Layout() {
  const [isDark, setDark] = useState(localStorage.getItem("dark") || false);
  return (
    <>
      <nav>
        <header>
          <span className="logo">
            <img src={clock} height="40px" />
            <p>Clock</p>
          </span>
          <ul>
            <li>
              <Link to="/time">Time</Link>
            </li>
            <li>
              <Link to="/stopwatch">Stop Watch</Link>
            </li>
            <li>
              <Link to="/timer">Timer</Link>
            </li>
            <li>
              <Link to="/alarm">Alarmclock</Link>
            </li>
          </ul>
        </header>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
