import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
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

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>

        <div
          style={{
            minHeight: "100vh",
            background: isDarkMode
              ? "linear-gradient(135deg, #1a1a2e, #16213e)"
              : "linear-gradient(135deg, white)",
            padding: "30px",
          }}
        >

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
                        {user?.name || "User"}
                      </p>
                      <p className="user-email" style={{ color: "#666" }}>
                        {user?.email || "-"}
                      </p>
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
                        padding: "10px",
                        width: "100%",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      Data Pribadi
                    </button>

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

          <div className="container py-4">
            <h1 classname="page-title pembayaran-title"
            >
              Pembayaran Peserta
            </h1>

            <div
              className="table-responsive payment-card"
            >
              <table className="table table-striped">
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
                    <td style={{ color: "green" }}>Lunas</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>UI / UX Design</td>
                    <td>E-Wallet</td>
                    <td>987654321</td>
                    <td>Rp 350.000</td>
                    <td style={{ color: "orange" }}>Pending</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Cyber Security</td>
                    <td>Transfer Bank</td>
                    <td>456789123</td>
                    <td>Rp 700.000</td>
                    <td style={{ color: "green" }}>Lunas</td>
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
