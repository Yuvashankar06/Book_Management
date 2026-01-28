import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Book Details Page */}
        <Route path="/book/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
