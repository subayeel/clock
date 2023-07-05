import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
<<<<<<< HEAD
import Alarm from "./Components/Alarm";
=======
import Timer from "./Components/Timer";
import Stopwatch from "./Components/stopwatch";

import Layout from "./Components/Layout";
>>>>>>> 785c5db5cb2ac0de23f611b858f482dd9f474be8

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/subayeel" element={<Subayeel />}></Route>
          <Route path="/alarm" element={<Alarm />}></Route>
=======
          {/* Add your Components here */}

          <Route path="/" element={<Layout />}>
            <Route path="/Stopwatch" element={<Stopwatch />}></Route>
            <Route path="/subayeel" element={<Subayeel />}></Route>
            <Route path="/timer" element={<Timer />}></Route>
          </Route>
>>>>>>> 785c5db5cb2ac0de23f611b858f482dd9f474be8
        </Routes>
      </Router>
    </div>
  );
}

export default App;
