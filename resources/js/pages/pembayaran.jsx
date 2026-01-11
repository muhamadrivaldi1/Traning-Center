import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  /* ======================
     INIT DATA
  ====================== */
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

  /* ======================
     FUNCTIONS
  ====================== */
  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);

    if (nextTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <>


      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} />

      {/* MAIN CONTENT */}
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
            {/* THEME TOGGLE */}
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

            {/* USER MENU */}
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
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user?.name || "User"}</p>
                    <p className="user-email">{user?.email || "-"}</p>
                  </div>
                  <hr />
                  <button
                    className="profile-btn"
                    onClick={() => {
                      navigate("/profil");
                      setShowUserMenu(false);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#333",
                      cursor: "pointer",
                      padding: "8px",
                      width: "100%",
                      textAlign: "left"
                    }}
                  >
                    Profil
                  </button>
                  <button className="logout-btn" onClick={handleLogout}>
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
            minHeight: "100vh",
            background: isDarkMode
              ? "linear-gradient(135deg, #1a1a2e, #16213e)"
              : "linear-gradient(135deg, #667eea, #764ba2)",
            padding: "40px",
            color: isDarkMode ? "white" : "#333",
          }}
        >
          <div className="container py-4">
            <h1
              style={{
                color: isDarkMode ? "white" : "#333",
                textAlign: "center",
                marginBottom: "30px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Pembayaran Peserta
            </h1>

            <div
              className="table-responsive mt-4"
              style={{
                background: isDarkMode ? "#2c2c54" : "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <table
                className={`table ${isDarkMode ? "table-dark" : "table-light"} table-striped`}
                style={{ borderRadius: "10px" }}
              >
                <thead>
                  <tr>
                    <th>Nama Pelatihan</th>
                    <th>Channel Bayar</th>
                    <th>Kode Pembayaran</th>
                    <th>Total Harga</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Web Development</td>
                    <td>Transfer Bank</td>
                    <td>123456789</td>
                    <td>Rp 500.000</td>
                    <td>
                      <span style={{ color: "green" }}>Lunas</span>
                    </td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>UI / UX Design</td>
                    <td>E-Wallet</td>
                    <td>987654321</td>
                    <td>Rp 350.000</td>
                    <td>
                      <span style={{ color: "orange" }}>Pending</span>
                    </td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Cyber Security</td>
                    <td>Transfer Bank</td>
                    <td>456789123</td>
                    <td>Rp 700.000</td>
                    <td>
                      <span style={{ color: "green" }}>Lunas</span>
                    </td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
