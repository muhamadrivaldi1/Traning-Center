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
    if (!savedUser) {
      navigate("/login");
    } else {
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


  const totalPelatihan = 6;
  const pelatihanBerjalan = 2;
  const pelatihanSelesai = 4;

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className="topbar-right">
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            <div className="user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "50%",
                }}
              >
                <FiUser />
              </button>

              {showUserMenu && (
                <div
                  className="user-dropdown"
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="user-info">
                    <p className="user-name" style={{ color: "#333" }}>
                      {user?.name}
                    </p>
                    <p className="user-email" style={{ color: "#666" }}>
                      {user?.email}
                    </p>
                  </div>
                  <hr />
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "red",
                      padding: "10px",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>


        <div
          style={{
            minHeight: "80vh",
            padding: "30px",
            background: isDarkMode
              ? "linear-gradient(135deg, #1a1a2e, #16213e)"
              : "#f9fafb",
            borderRadius: "16px",
          }}
        >


        <div
          style={{
            background: isDarkMode ? "#1f2937" : "#ffffff",
            borderRadius: "16px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            textAlign: "center",          // 🔥 INI KUNCINYA
          }}
        >
          <h2 style={{ margin: 0 }}>
            👋 Hallo, {user?.name || "Mahasiswa"}
          </h2>
          <p
            style={{
              marginTop: "10px",
              color: isDarkMode ? "#cbd5f5" : "#555",
            }}
          >
            Mau belajar apa hari ini?
          </p>
        </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: isDarkMode ? "#1f2937" : "#ffffff",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <h1 style={{ margin: 0, fontSize: "40px" }}>
                {totalPelatihan}
              </h1>
              <p style={{ marginTop: "10px", color: "#6b7280" }}>
                Total Pelatihan
              </p>
            </div>

            <div
              style={{
                background: isDarkMode ? "#1f2937" : "#ffffff",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <h1
                style={{ margin: 0, fontSize: "40px", color: "#f59e0b" }}
              >
                {pelatihanBerjalan}
              </h1>
              <p style={{ marginTop: "10px", color: "#6b7280" }}>
                Pelatihan Berjalan
              </p>
            </div>

 
            <div
              style={{
                background: isDarkMode ? "#1f2937" : "#ffffff",
                borderRadius: "14px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            >
              <h1
                style={{ margin: 0, fontSize: "40px", color: "#10b981" }}
              >
                {pelatihanSelesai}
              </h1>
              <p style={{ marginTop: "10px", color: "#6b7280" }}>
                Pelatihan Selesai
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
