// ReactJS
import React, { useEffect, useState } from "react";

// UI
import "./index.css";
import "rsuite/dist/rsuite.min.css";

// Router handler
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

// Parts
import Game from "./components/Game2.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Game />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
