import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiUser, FiSun, FiMoon } from "react-icons/fi";
import "../../css/app.css";

export default function Profil() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    const next = !isDarkMode;
    setIsDarkMode(next);

    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
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
            style={{ color: "white" }}   // 🔒 warna dikunci
          >
            ☰
          </button>

          <div className="topbar-right">
            {/* THEME */}
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                color: "white",           // 🔒
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* USER MENU */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",        // 🔒
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <FiUser />
              </button>

              {showUserMenu && (
                <div
                  className="user-dropdown"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "40px",
                    background: "white",
                    borderRadius: "6px",
                    minWidth: "150px",
                    boxShadow: "0 6px 20px rgba(0,0,0,.2)",
                    zIndex: 999,
                  }}
                >
                  <div style={{ padding: "10px" }}>
                    <b>{user?.name || "User"}</b>
                    <p style={{ fontSize: "12px", margin: 0 }}>
                      {user?.email || "-"}
                    </p>
                  </div>

                  <hr style={{ margin: 0 }} />

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      padding: "10px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
