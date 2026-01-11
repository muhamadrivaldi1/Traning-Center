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
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (!user) navigate("/login");

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

  const certificates = [
    {
      id: 1,
      title: "Web Development",
      course: "Frontend",
      completionDate: "-",
      status: "belum selesai",
    },
    {
      id: 2,
      title: "UI UX Design",
      course: "Design",
      completionDate: "2025-01-10",
      status: "selesai",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

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
                textAlign: "center",
                marginBottom: "30px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Sertifikat Peserta
            </h1>

            <div
              className="table-responsive mt-4"
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <table className="table table-light table-striped">
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
                          <span style={{ color: "orange" }}>Belum Selesai</span>
                        )}
                      </td>
                      <td>
                        {c.status === "selesai" ? (
                          <button
                            style={{
                              background: "#007bff",
                              color: "white",
                              border: "none",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
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
