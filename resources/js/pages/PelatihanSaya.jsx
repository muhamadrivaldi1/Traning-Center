import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import api from "../api";
import "../../css/app.css";

export default function PelatihanSaya() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sinkronisasi Tema
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    // Proteksi Route & Data User
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/my-trainings", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        // Filter: Hanya menampilkan pelatihan yang sudah LUNAS
        const filteredData = res.data.filter((item) => 
          item.payment_status === "success" || item.payment_status === "settlement"
        );

        const data = filteredData.map((item) => {
          const t = item.training;
          return {
            id: item.id,
            title: t?.name || "Pelatihan",
            description: t?.description || "Deskripsi pelatihan.",
            progress: item.progress || 0,
            status: item.progress > 0 ? (item.progress === 100 ? "Selesai" : "Berjalan") : "Belum Mulai",
            image: t?.image 
              ? `http://127.0.0.1:8000/storage/${t.image}` 
              : "/images/WEb Development.jpeg",
            rawTraining: t 
          };
        });
        setTrainings(data);
      })
      .catch((err) => {
        if (err.response?.status === 401) navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

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
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR SECTION - Identik dengan Dashboard */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span></span><span></span><span></span>
          </button>

          <div className="topbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            <div className="user-menu-container">
              <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
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

        <h2 className="page-title">Pelatihan Saya</h2>
        <hr />

        {loading ? (
          <div className="p-5 text-center">Memuat pelatihan Anda...</div>
        ) : (
          <div className={trainings.length === 0 ? "empty-state-container" : "training-grid"}>
            {trainings.length === 0 ? (
              <div className="text-center">
                <h4 className="text-muted mb-3">Anda belum mengikuti pelatihan apapun</h4>
                <button 
                  className="training-btn" 
                  style={{ width: "auto", padding: "10px 30px" }}
                  onClick={() => navigate("/dashboard")}
                >
                  Cari Pelatihan Sekarang
                </button>
              </div>
            ) : (
              trainings.map((item) => (
                <div className="training-card" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="training-content">
                    <h5>{item.title}</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="text-muted">Progress</span>
                        <span className="fw-bold">{item.progress}%</span>
                      </div>
                      <div className="progress" style={{ height: "6px", backgroundColor: "#e9ecef" }}>
                        <div 
                          className="progress-bar bg-primary" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="training-desc">{item.description}</p>
                    <button
                      className="training-btn"
                      onClick={() => navigate(`/pembelajaran/${item.id}`, { state: { training: item.rawTraining } })}
                    >
                      {item.progress === 0 ? "Mulai Pelatihan" : "Lanjutkan Belajar"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .empty-state-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 60vh;
          width: 100%;
        }
      `}</style>
    </>
  );
}