import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
// import CategoriesPage from "./components/CategoriesPage";
import OnPlayer from "./components/OnPlayer";
import AppTest from "./components/AppTest";

function App() {
  return (
    <Router>
      <div className="App">
        <AppTest />
        <Routes>
          {/* <Route path="/" element={<CategoriesPage />} /> */}
          <Route path="/onplayer" element={<OnPlayer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
