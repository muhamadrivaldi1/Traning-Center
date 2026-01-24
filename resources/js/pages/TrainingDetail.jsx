import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { FaArrowLeft, FaRegEdit, FaExclamationTriangle } from "react-icons/fa";
import "../../styles/TrainingDetail.css";

export default function TrainingDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const training = location.state?.training;

  // STATE
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.id) setUser(parsedUser);
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, []);

  const isLoggedIn = !!user;

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.body.classList.toggle("dark-theme", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!training) {
    return (
      <div className="center-fallback enhanced-fallback">
        <div className="fallback-card">
          <div className="fallback-icon">
            <FaExclamationTriangle />
          </div>
          <h3>
            Training tidak ditemukan
            <br />
            silahkan pilih pelatihan terlebih dahulu.
          </h3>
          <Link className="btn-purple btn-back" to="/home">
            <FaArrowLeft /> Kembali ke Home
          </Link>
        </div>
      </div>
    );
  }

  // ------------------------
  // Komponen reusable: TrainingContent
  // ------------------------
  const TrainingContent = ({ isGuest }) => (
    <div className="training-container">
      {/* HERO */}
      <div className="training-hero">
        <div className="hero-content">
          <h1>{training.name}</h1>
          <p>Pelatihan intensif untuk meningkatkan kompetensi dan kesiapan karier Anda</p>
        </div>
      </div>

      {/* CARD */}
      <div className="training-card">
        {/* DESKRIPSI */}
        <div className="grid-two">
          <div>
            <h3>Deskripsi Program</h3>
            <p>{training.description || "Deskripsi belum tersedia."}</p>
          </div>

          <div>
            <h3>Manfaat</h3>
            <ul>
              <li>Sertifikat resmi</li>
              <li>Instruktur berpengalaman</li>
              <li>Materi up-to-date</li>
              <li>Relasi & networking</li>
            </ul>
          </div>
        </div>

        {/* INFO */}
        <div className="grid-three">
          <div>
            <h4>Durasi</h4>
            <p>{training.duration || "3 Bulan"}</p>
          </div>
          <div>
            <h4>Jadwal</h4>
            <p>{training.schedule || "Setiap Sabtu"}</p>
          </div>
          <div>
            <h4>Biaya</h4>
            <p>{training.cost || "Rp 2.500.000"}</p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="d-flex flex-column align-items-center mt-4 gap-3">
          <Link
            to={isGuest ? "/login" : "/pendaftaran-pelatihan"}
            state={isGuest ? { redirectTo: "/pendaftaran-pelatihan", training } : { training }}
            className="btn btn-primary px-5 py-2 d-flex align-items-center gap-2"
          >
            <FaRegEdit />
            Daftar Sekarang
          </Link>

          <Link
            to={isGuest ? "/home" : "/dashboard"}
            className="btn btn-outline-secondary px-5 py-2 d-flex align-items-center gap-2"
          >
            <FaArrowLeft /> {isGuest ? "Kembali ke Home" : "Kembali ke Dashboard"}
          </Link>
        </div>
      </div>
    </div>
  );

  // ------------------------
  // RENDER
  // ------------------------
  return (
    <>
      {isLoggedIn ? (
        <>
          <Sidebar isOpen={isSidebarOpen} />

          <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
            {/* Topbar */}
            <div className="topbar">
              <button
                className="sidebar-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

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
                        <p className="user-name">{user?.name || "User"}</p>
                        <p className="user-email">{user?.email || "-"}</p>
                      </div>
                      <hr />
                      <button className="profile-btn" onClick={() => navigate("/profil")}>
                        Data Pribadi
                      </button>
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <TrainingContent isGuest={false} />
          </div>
        </>
      ) : (
        <>
          {/* Navbar untuk guest */}
          <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container navbar-padding">
              <Link className="navbar-brand d-flex align-items-center gap-3" to="/home">
                <img src="/images/unpam (2).png" className="navbar-logo" alt="UNPAM" />
                <span className="fw-bold">Training Center UNPAM</span>
              </Link>
            </div>
          </nav>

          <TrainingContent isGuest={true} />
        </>
      )}
    </>
  );
}