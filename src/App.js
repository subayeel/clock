
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Timer from "./Components/Timer";
import Stopwatch from "./Components/stopwatch";

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";

import Layout from "./Components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}
          <Route path="/Stopwatch" element={<Stopwatch />}></Route>
          <Route path="/subayeel" element={<Subayeel />}></Route>
          <Route path="/timer" element={<Timer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
