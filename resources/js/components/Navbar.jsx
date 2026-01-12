import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { FiUser, FiSun, FiMoon } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const close = () => setShowProfileMenu(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const dropdown = showProfileMenu && btnRef.current
    ? ReactDOM.createPortal(
        (() => {
          const rect = btnRef.current.getBoundingClientRect();
          return (
            <div
              style={{
                position: "fixed",
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
                background: "white",
                borderRadius: "6px",
                boxShadow: "0 6px 20px rgba(0,0,0,.2)",
                zIndex: 99999,
                minWidth: "140px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                onClick={() => {
                  navigate("/profil");
                  setShowProfileMenu(false);
                }}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  color: "#333"
                }}
              >
                Profil
              </div>

              <div
                onClick={() => {
                  handleLogout();
                  setShowProfileMenu(false);
                }}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  color: "#333"
                }}
              >
                Logout
              </div>
            </div>
          );
        })(),
        document.body
      )
    : null;

  return (
    <>
      <div className="navbar-custom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">

            <span
              className="menu-icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              &#9776;
            </span>

            <div className="d-flex align-items-center gap-3">
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </button>

              <button
                ref={btnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer"
                }}
              >
                <FiUser />
              </button>
            </div>
          </div>
        </div>
      </div>

      {dropdown}

      <Sidebar isOpen={isOpen} />
    </>
  );
}
