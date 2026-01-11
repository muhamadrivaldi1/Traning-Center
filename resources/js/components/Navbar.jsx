import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiSun, FiMoon } from "react-icons/fi";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="navbar-custom">
        <div className="container">
          <div className="navbar-padding">
            <div className="d-flex justify-content-between align-items-center">
              <span
                className="menu-icon"
                onClick={() => setIsOpen(!isOpen)}
                style={{ cursor: "pointer", fontSize: "24px" }}
              >
                &#9776;
              </span>

              <div className="d-flex align-items-center gap-3">
                {/* Theme Toggle Button */}
                <button
                  className="theme-toggle-btn"
                  onClick={toggleTheme}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    cursor: "pointer",
                    padding: "8px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {isDarkMode ? <FiSun style={{ color: 'white' }} /> : <FiMoon style={{ color: 'white' }} />}
                </button>

                {/* Profile Button */}
                <div style={{ position: "relative" }}>
                  <button
                    className="profile-nav-btn"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "20px",
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FiUser />
                  </button>

                  {showProfileMenu && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50px",
                        right: "0",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        minWidth: "120px"
                      }}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sidebar isOpen={isOpen} />


    </>
  );
}