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
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);

    if (next) {
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
      title: "UI UX Design",
      course: "Design",
      completionDate: "2025-01-10",
      status: "selesai",
    },
  ];

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* PAGE WRAPPER (TOPBAR + CONTENT SATU BACKGROUND) */}
        <div className="page-wrapper">

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
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </button>

              <div className="user-menu-container">
                <button
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <FiUser />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <p className="user-name">{user?.name}</p>
                      <p className="user-email">{user?.email}</p>
                    </div>
                    <hr />
                    <button
                      className="profile-btn"
                      onClick={() => navigate("/profil")}
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
          <div className="container py-4">
            <h1 className="page-title">Sertifikat Peserta</h1>

            <div className="certificate-card">
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
                          <span className="status-success">✓ Selesai</span>
                        ) : (
                          <span className="status-pending">Belum Selesai</span>
                        )}
                      </td>
                      <td>
                        {c.status === "selesai" ? (
                          <button className="download-btn">
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
