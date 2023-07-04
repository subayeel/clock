import {
  Routes,
  Route,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";

import Layout from "./Components/Layout";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Add your Components here */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
