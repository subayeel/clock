import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
import Stopwatch from "./Components/stopwatch";

import Layout from "./Components/Layout";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}
          <Route path="/" element={<Layout />}>
            <Route path="/stopwatch" element={<Stopwatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
