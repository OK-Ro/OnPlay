import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import CategoriesPage from "./components/CategoriesPage";
import AllChannelsPage from "./components/AllChannelsPage";
import AllNewsPage from "./components/AllNewsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/all" element={<AllChannelsPage />} />
          <Route path="/all-news" element={<AllNewsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
