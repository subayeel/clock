import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Alarm from "./Components/Alarm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/subayeel" element={<Subayeel />}></Route>
          <Route path="/alarm" element={<Alarm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
