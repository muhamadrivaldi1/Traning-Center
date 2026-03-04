import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import axios from "axios";
import "../../../css/app.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk menyimpan data teknis dari database Laravel
  const [dbTrainings, setDbTrainings] = useState([]);

  useEffect(() => {
    // 1. Load Theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    // 2. Load User Data
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // 3. Ambil Data dari PHP (Laravel) menggunakan 127.0.0.1
    const fetchTrainingsFromDB = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/trainings");
        const dataApi = Array.isArray(response.data) ? response.data : response.data.data;
        setDbTrainings(dataApi || []);
      } catch (error) {
        console.error("Gagal terhubung ke API PHP:", error);
      }
    };
    fetchTrainingsFromDB();

    return () => {
      document.body.classList.remove("dark-theme");
    };
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
    localStorage.removeItem("token");
    navigate("/");
  };

  // Data Visual (Statis)
  const events = [
    { id: 1, name: "Pelatihan Web Development", description: "Belajar HTML, CSS, JavaScript, React sampai siap kerja", image: "/images/WEb Development.jpeg" },
    { id: 2, name: "UI / UX Design", description: "Belajar desain antarmuka dan pengalaman pengguna", image: "/images/UI UX.jpeg" },
    { id: 3, name: "Cyber Security", description: "Fundamental keamanan sistem dan jaringan", image: "/images/Cyber.jpeg" },
    { id: 4, name: "Data Science", description: "Pengolahan data, analisis, dan visualisasi", image: "/images/Data.jpeg" },
    { id: 5, name: "Mobile Development", description: "Membangun aplikasi Android & iOS", image: "/images/Mobile App.jpeg" },
    { id: 6, name: "Artificial Intelligence", description: "Pengenalan AI dan Machine Learning", image: "/images/AI.jpeg" },
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
                  <button className="profile-btn" onClick={() => navigate("/profil")}>Data Pribadi</button>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
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

        {/* GRID PELATIHAN */}
        <div className="training-grid">
          {filteredEvents.map((event) => {
            // SINKRONISASI: Cari data teknis (harga) dari database berdasarkan ID
            const dbItem = dbTrainings.find(db => String(db.id) === String(event.id));
            const priceValue = dbItem ? Number(dbItem.price) : 0;

            return (
              <div className="training-card" key={event.id}>
                <img src={event.image} alt={event.name} />

                <div className="training-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h5>{event.name}</h5>
                  <p className="training-desc" style={{ flexGrow: 1 }}>{event.description}</p>

                  <div className="training-footer" style={{ marginTop: '10px' }}>
                    <p className="fw-bold text-primary mb-2" style={{ fontSize: "1rem" }}>
                      {priceValue > 0 ? `Rp ${priceValue.toLocaleString("id-ID")}` : "Rp 0"}
                    </p>

                    <button
                      className="training-btn w-100"
                      onClick={() => {
                        // Kirim semua data (Statis + Database) ke halaman Detail
                        navigate("/TrainingDetail", {
                          state: {
                            training: {
                              ...event,
                              price: dbItem?.price || 0,
                              duration: dbItem?.duration || "-",
                              schedule: dbItem?.schedule || "-",
                              // Pecah string benefits menjadi array jika ada
                              benefits: dbItem?.benefits
                                ? dbItem.benefits.split(",").map(item => item.trim())
                                : []
                            }
                          },
                        });
                      }}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}