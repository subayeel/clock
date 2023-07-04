import { Routes, Route, Router } from "react-router-dom";
import Subayeel from "./Components/Subayeel";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your Components here */}
          <Route path="/subayeel" element={<Subayeel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
