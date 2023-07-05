import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Time from "./Components/Time";

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
            <Route path="/subayeel" element={<Subayeel />}></Route>
            <Route path="/timer" element={<Timer />}></Route>
          </Route>
          <Route path="/time" element={<Time />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
