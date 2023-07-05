import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Alarm from "./Components/Alarm";
import Timer from "./Components/Timer";
import Stopwatch from "./Components/stopwatch";

import Layout from "./Components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* Add your Components here */}

          <Route path="/" element={<Layout />}>
            <Route path="/Stopwatch" element={<Stopwatch />}></Route>

            <Route path="/timer" element={<Timer />}></Route>
            <Route path="/alarm" element={<Alarm />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
