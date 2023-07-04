import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Timer from "./Components/Timer";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}
          <Route path="/subayeel" element={<Subayeel />}></Route>
          <Route path="/timer" element={<Timer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
