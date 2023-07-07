import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import Alarm from "./Components/Alarm";
import Time from "./Components/Time";
import Layout from "./Components/Layout";
import Timer from "./Components/Timer";
import Holidays from "./Components/Holidays";
import Stopwatch from "./Components/stopwatch";
import { useContext } from "react";
import { ThemeContext } from "./Context/ThemeProvider";
import TodoEmail from "./Components/TodoEmail";

function App() {
  const { dark } = useContext(ThemeContext);
  return (
    <div style={dark ? { background: "#bbb" } : { background: "#eee" }} className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}

          <Route path="/" element={<Layout />}>
            <Route path="/Stopwatch" element={<Stopwatch />}></Route>
            <Route path="/timer" element={<Timer />}></Route>
            <Route path="/" element={<Alarm />}></Route>
            <Route path="/time" element={<Time />}></Route>
            <Route path="/holidays" element={<Holidays />}></Route>
            <Route path="/todo" element={<TodoEmail />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
