import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import axios from "axios";
import "../../css/app.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk menyimpan data harga dari database
  const [dbTrainings, setDbTrainings] = useState([]);

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

    // Ambil data dari PHP untuk sinkronisasi harga
    const fetchPrices = async () => {
      try {
        // Mengambil data dari API Laravel (Route: trainings)
        const response = await axios.get("http://127.0.0.1:8000/api/trainings");

        // Memastikan data adalah array (handle jika dibungkus objek 'data')
        const dataApi = Array.isArray(response.data) ? response.data : response.data.data;

        console.log("Data Harga dari DB:", dataApi);
        setDbTrainings(dataApi || []);
      } catch (error) {
        console.error("Gagal sinkron harga:", error);
      }
    };
    fetchPrices();
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

  // Data statis sesuai struktur kode kamu sebelumnya
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
        {/* TOPBAR SECTION */}
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

        {/* TRAINING GRID SECTION */}
        <div className="training-grid">
          {filteredEvents.map((event) => {
            // Mencocokkan ID dengan data database (dbItem.price)
            const dbItem = dbTrainings.find(db => db.id == event.id);
            const priceValue = dbItem ? Number(dbItem.price) : 0;
            const displayPrice = priceValue > 0
              ? `Rp ${priceValue.toLocaleString("id-ID")}`
              : "Rp 0";

            return (
              <div className="training-card" key={event.id}>
                <img src={event.image} alt={event.name} />

                <div className="training-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <h5>{event.name}</h5>
                  <p className="training-desc" style={{ flexGrow: 1 }}>{event.description}</p>

                  {/* Harga dan Tombol didekatkan di bagian bawah */}
                  <div className="training-footer" style={{ marginTop: '10px' }}>
                    <p className="fw-bold text-primary mb-2" style={{ fontSize: "1rem" }}>
                      {displayPrice}
                    </p>

                    <button
                      className="training-btn w-100"
                      onClick={() => {
                        const dbItem = dbTrainings.find(db => String(db.id) === String(event.id));

                        navigate("/TrainingDetail", {
                          state: {
                            training: {
                              ...event,
                              price: dbItem ? dbItem.price : 0,
                              duration: dbItem ? dbItem.duration : "-",
                              schedule: dbItem ? dbItem.schedule : "-",
                              // Logika: Pecah string koma menjadi array, lalu bersihkan spasi
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