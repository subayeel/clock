import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";

import Alarm from "./Components/Alarm";
import Time from "./Components/Time";
import Layout from "./Components/Layout"
import Timer from "./Components/Timer";


import Stopwatch from "./Components/stopwatch";


function App() {
  const {dark} = useContext(ThemeContext)
  return (
    <div style={dark ?{background:"#bbb"}:{background:"#eee"}} className="App">
      <Router>
        <Routes>

          {/* Add your Components here */}

          <Route path="/" element={<Layout />}>
            <Route path="/Stopwatch" element={<Stopwatch />}></Route>
            <Route path="/timer" element={<Timer />}></Route>
            <Route path="/alarm" element={<Alarm />}></Route>
            <Route path="/time" element={<Time />}></Route>
            <Route path="/holidays" element={<Holidays />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
