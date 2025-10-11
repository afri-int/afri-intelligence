import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import styles from "../styles/home.module.css";
import { translatePage } from "../utils/translatePage";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useContext(UserContext)!;
  const [selectedLang, setSelectedLang] = useState("en");
  const overlayRef = useRef<HTMLDivElement>(null);

  const chooseRole = (role: "teacher" | "student") => {
    setSelectedRole(role);
    navigate("/register");
  };

  const handleLangChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLang(lang);

    if (overlayRef.current) {
      overlayRef.current.style.display = "flex";
    }

    await translatePage(lang);

    if (overlayRef.current) {
      overlayRef.current.style.display = "none";
    }
  };

  return (
    <div className={styles.home}>
      {/* Loading Overlay */}
      <div
        id="loadingOverlay"
        ref={overlayRef}
        style={{ display: "none" }}
        className="overlay"
      >
        <div className="spinner"></div>
        <p data-i18n>Translating, please wait...</p>
      </div>

      {/* Language Selector */}
      <div className="language-selector" style={{ width: "fit-content", margin: "10px" }}>
        <label data-i18n htmlFor="language">Select Target Language:</label>
        <select
          id="language"
          className="lang-drop"
          value={selectedLang}
          onChange={handleLangChange}
        >
          <option value="en">English</option>
          <option value="zu">Zulu</option>
          <option value="xh">Xhosa</option>
          <option value="st">Sesotho</option>
          <option value="af">Afrikaans</option>
        </select>
      </div>

      {/* Page Content */}
      <img src="./assets/images/logo.jpg" alt="Logo" />
      <h1 data-i18n className={styles.heading}>Welcome to Afri-Intelligence</h1>
      <hr />
      <h2 data-i18n>
        Your AI powered translation assistant for African languages.
      </h2>
      <h1 data-i18n className={styles.title}>Choose Your Role</h1>

      <div className={styles.buttons}>
        <button data-i18n onClick={() => chooseRole("teacher")}>
          I am a Teacher
        </button>
        <button data-i18n onClick={() => chooseRole("student")}>
          I am a Student
        </button>
      </div>
    </div>
  );
};

export default Home;
