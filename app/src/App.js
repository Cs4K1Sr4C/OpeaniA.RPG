// ReactJS
import React, { useEffect, useState } from "react";

// UI
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import {
  Container,
  Header,
  Sidebar,
  Content,
  Navbar,
  Nav,
  Button,
  SelectPicker,
} from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import CogIcon from "@rsuite/icons/legacy/Cog";

// Router handler
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

// Language handler modules
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import "./i18n";

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
