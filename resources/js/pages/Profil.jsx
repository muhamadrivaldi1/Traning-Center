import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FiUser, FiSun, FiMoon } from "react-icons/fi";
import "../../css/app.css";

export default function Profil() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          <div className="topbar-right">
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
            <FiUser />
          </div>
        </div>

        {/* CONTENT */}
        <div
          style={{
            background: "linear-gradient(135deg, #131D78, #2336DE)",
            padding: "40px",
            borderRadius: "16px",
            color: "white",
            minHeight: "80vh",
          }}
        >
          <h1>Profil Pengguna</h1>

          <div style={{ marginTop: "20px" }}>
            <p><b>Nama:</b> {user?.name || "Mahasiswa"}</p>
            <p><b>Email:</b> {user?.email || "email@example.com"}</p>
            <p><b>Status:</b> Aktif</p>
            <p><b>Role:</b> Peserta Training</p>
          </div>
        </div>
      </div>
    </>
  );
}
