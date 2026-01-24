import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    localStorage.removeItem("user");
    navigate("/");
  };

  const events = [
    {
      id: 1,
      name: "Pelatihan Web Development",
      description: "Belajar HTML, CSS, JavaScript, React sampai siap kerja",
      duration: "3 Bulan",
      schedule: "Setiap Sabtu",
      cost: "Rp 2.500.000",
      image: "/images/WEb Development.jpeg",
    },
    {
      id: 2,
      name: "UI / UX Design",
      description: "Belajar desain antarmuka dan pengalaman pengguna",
      duration: "2 Bulan",
      schedule: "Setiap Minggu",
      cost: "Rp 2.000.000",
      image: "/images/UI UX.jpeg",
    },
    {
      id: 3,
      name: "Cyber Security",
      description: "Fundamental keamanan sistem dan jaringan",
      duration: "3 Bulan",
      schedule: "Setiap Sabtu",
      cost: "Rp 3.000.000",
      image: "/images/Cyber.jpeg",
    },
    {
      id: 4,
      name: "Data Science",
      description: "Pengolahan data, analisis, dan visualisasi",
      duration: "3 Bulan",
      schedule: "Setiap Minggu",
      cost: "Rp 3.500.000",
      image: "/images/Data.jpeg",
    },
    {
      id: 5,
      name: "Mobile Development",
      description: "Membangun aplikasi Android & iOS",
      duration: "3 Bulan",
      schedule: "Setiap Sabtu",
      cost: "Rp 3.000.000",
      image: "/images/Mobile App.jpeg",
    },
    {
      id: 6,
      name: "Artificial Intelligence",
      description: "Pengenalan AI dan Machine Learning",
      duration: "4 Bulan",
      schedule: "Setiap Minggu",
      cost: "Rp 4.000.000",
      image: "/images/AI.jpeg",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
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
                  <button
                    className="profile-btn"
                    onClick={() => navigate("/profil")}
                  >
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

        <h2 className="page-title">Daftar Pelatihan</h2>
        <hr />

        <div className="filter">
          <label className="filter-label">Pencarian</label>
          <input
            type="text"
            placeholder="Cari pelatihan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="training-grid">
          {filteredEvents.map((event) => (
            <div className="training-card" key={event.id}>
              <img src={event.image} alt={event.name} />

              <div className="training-content">
                <h5>{event.name}</h5>

                {/* DESKRIPSI MUNCUL DI CARD */}
                <p className="training-desc">{event.description}</p>

                <button
                  className="training-btn"
                  onClick={() =>
                    navigate("/TrainingDetail", {
                      state: { training: event },
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
