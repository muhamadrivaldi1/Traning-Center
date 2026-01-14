import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function Sertifikat() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  /* ======================
     INIT
  ====================== */
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

  const certificates = [
    {
      id: 1,
      title: "Web Development",
      course: "Frontend",
      completionDate: "-",
      status: "belum",
    },
    {
      id: 2,
      title: "UI / UX Design",
      course: "Design",
      completionDate: "2025-01-10",
      status: "selesai",
    },
  ];

  /* ======================
     RENDER
  ====================== */
  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* BACKGROUND WRAPPER (SAMA PERSIS PEMBAYARAN) */}
        <div
          style={{
            minHeight: "100vh",
            background: isDarkMode
              ? "linear-gradient(135deg, #1a1a2e, #16213e)"
              : "#fff",
            padding: "30px",
          }}
        >
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
                      className="profile-btn"
                      onClick={() => navigate("/profil")}
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

          {/* CONTENT */}
          <div className="container py-4">
            <h1 className="page-title">Sertifikat Peserta</h1>

            <div className="table-responsive certificate-card">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Pelatihan</th>
                    <th>Kursus</th>
                    <th>Tanggal Selesai</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((c) => (
                    <tr key={c.id}>
                      <td>{c.title}</td>
                      <td>{c.course}</td>
                      <td>{c.completionDate}</td>
                      <td>
                        {c.status === "selesai" ? (
                          <span style={{ color: "green" }}>✓ Selesai</span>
                        ) : (
                          <span style={{ color: "orange" }}>
                            Belum Selesai
                          </span>
                        )}
                      </td>
                      <td>
                        {c.status === "selesai" ? (
                          <button className="detail-btn">
                            Unduh Sertifikat
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
