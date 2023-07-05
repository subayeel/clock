import { Routes, Route, BrowserRouter as Router, } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Timer from "./Components/Time";


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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
