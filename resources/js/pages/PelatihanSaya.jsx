import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import api from "../api";
import "../../css/app.css";

export default function PelatihanSaya() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD USER & THEME
  // ===============================
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  // ===============================
  // LOAD MY TRAININGS
  // ===============================
  useEffect(() => {
    api
      .get("/my-trainings")
      .then((res) => {
        const data = res.data.map((item) => {
          const training = item.training;

          return {
            id: item.id,
            title: training?.name || "Pelatihan",
            status: item.status,
            progress: item.progress,
            startDate: item.start_date,
            endDate: item.end_date,
            training: training,

            image: training?.image
              ? `http://127.0.0.1:8000/storage/${training.image}`
              : "/images/default.jpg",
          };
        });

        setTrainings(data);
      })
      .catch((err) => {
        console.error("Gagal mengambil pelatihan:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // ===============================
  // HELPERS
  // ===============================
  const toggleTheme = () => {
    const mode = !isDarkMode;
    setIsDarkMode(mode);

    if (mode) {
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

  const getStatusColor = (status) => {
    if (status === "Aktif") return "#28a745";
    if (status === "Selesai") return "#007bff";
    if (status === "Pending") return "#ffc107";
    return "#6c757d";
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
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
                  <p className="fw-bold mb-0">{user?.name}</p>
                  <p className="text-muted small">{user?.email}</p>
                  <hr />
                  <button onClick={() => navigate("/profil")}>
                    Data Pribadi
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="page-title">Pelatihan Saya</h2>
        <hr />

        {loading && <p>Loading...</p>}

        {!loading && trainings.length === 0 && (
          <div className="no-trainings">
            <h3>Belum ada pelatihan</h3>
            <button
              className="register-btn"
              onClick={() => navigate("/dashboard")}
            >
              Jelajahi Pelatihan
            </button>
          </div>
        )}

        <div className="training-grid">
          {trainings.map((training) => (
            <div className="training-card" key={training.id}>
              <img
                src={training.image}
                alt={training.title}
                onError={(e) => {
                  e.target.src = "/images/default.jpg";
                }}
              />

              <div className="training-content">
                <h5>{training.title}</h5>

                <span
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusColor(training.status),
                  }}
                >
                  {training.status}
                </span>

                <div className="training-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${training.progress}%`,
                      }}
                    />
                  </div>
                  <span>{training.progress}%</span>
                </div>

                <small>
                  {training.startDate} — {training.endDate}
                </small>

                <button
                  className="training-btn"
                  onClick={() =>
                    navigate("/TrainingDetail", {
                      state: { training: training.training },
                    })
                  }
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
