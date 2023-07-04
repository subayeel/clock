import { Routes, Route,  BrowserRouter as Router, } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Time from "./Components/Time";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}
          <Route path="/subayeel" element={<Subayeel />}></Route>
          <Route path="/time" element={<Time />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
