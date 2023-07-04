import { Routes, Route, BrowserRouter as Router  } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Stopwatch from "./Components/stopwatch";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}
          <Route path="/Stopwatch" element={<Stopwatch />}></Route>
          <Route path="/subayeel" element={<Subayeel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
