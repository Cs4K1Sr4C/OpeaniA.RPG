// ReactJS
import React, { useEffect, useState } from "react";

// UI
import "./App.css";
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

// Language switcher functional component
import LanguageSwitcher from "./components/LanguageSwitcher";

// Parts
import Game from "./components/Game2.jsx";
import CharacterDrawer from "./components/CharacterDrawer";

/*function _Header() {
  return (<Header>
    <Navbar
      appearance="inverse"
      style={{
        backgroundColor: "black",
        boxShadow: "0px 0px 10px black",
        position: "relative",
      }}
    >
      <Nav pullRight>
        <Nav.Item>
          <SelectPicker
            data={selectableLanguages}
            style={{ width: 224 }}
            value={currentLanguage}
            onChange={(value) => {
              handleLanguageChange(value);
            } } />
        </Nav.Item>
        <Nav.Item>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => {
              localStorage.removeItem("character");
              document.location.reload();
            } }
          >
            {t("RESET_GAME")}
          </Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  </Header>)
}*/

function App() {
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const handleLanguageChange = (value) => {
    const language = value;
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };
  const selectableLanguages = [
    { label: "English", value: "en" },
    { label: "Hungarian", value: "hu" },
    { label: "Español", value: "es" },
    { label: "Français", value: "fr" },
  ].map((item) => ({ label: item.label, value: item.value }));

  const buy_me_a_coffe_link = () => {
    return `https://img.buymeacoffee.com/button-api/?text=${t(
      "BUY_ME_A_COFFE"
    )}&emoji=&slug=cs4k1sr4c&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff`;
  };

  const [character, setCharacter] = useState({});
  const [characterExists, setCharacterExists] = useState(false);

  useEffect(() => {
    const existingCharacter = localStorage.getItem("character");

    if (existingCharacter) {
      console.log("Character already exists", JSON.parse(existingCharacter));
      setCharacter(JSON.parse(existingCharacter));
      setCharacterExists(true);
    }
  }, []);

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
