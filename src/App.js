import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router and Routes
import CategoriesPage from "./components/CategoriesPage";
import AllNewsPage from "./components/AllNewsPage";
import AllEventsPage from "./components/AllEventsPage";
import Tv from "./components/Tv";
import AllMovies from "./components/AllMovies";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/all-news" element={<AllNewsPage />} />
          <Route path="/all-events" element={<AllEventsPage />} />
          <Route path="/all-movies" element={<AllMovies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
