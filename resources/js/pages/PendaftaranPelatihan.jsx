import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import api from "../api";
import "../../css/app.css";

export default function PendaftaranPelatihan() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [trainingId, setTrainingId] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    email: "",
    phone: "",
    fakultas: "",
    alamat: ""
  });
  const [loadingTrainings, setLoadingTrainings] = useState(true);

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
  // LOAD TRAININGS
  // ===============================
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));

        const res = await api.get("/training", {
          headers: {
            Authorization: `Bearer ${savedUser?.token || ""}`,
          },
        });

        console.log("Trainings fetched:", res.data);
        setTrainings(res.data);
      } catch (err) {
        console.error("Error fetching trainings:", err);
        alert("Gagal mengambil data pelatihan. Periksa koneksi atau token.");
      } finally {
        setLoadingTrainings(false);
      }
    };

    fetchTrainings();
  }, []);

  // ===============================
  // FORM
  // ===============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trainingId) {
      alert("Pilih pelatihan");
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      await api.post(
        `/training/${trainingId}/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${savedUser?.token || ""}` }
        }
      );

      alert("✅ Pendaftaran berhasil");
      navigate("/pelatihan-saya");
    } catch (err) {
      console.error("Error registering training:", err);
      alert(err.response?.data?.message || "Gagal daftar pelatihan");
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* ================= TOPBAR ================= */}
        <div className="topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="topbar-right">
            <button
              className="theme-toggle-btn"
              onClick={() => {
                const mode = !isDarkMode;
                setIsDarkMode(mode);
                document.body.classList.toggle("dark-theme");
                localStorage.setItem("theme", mode ? "dark" : "light");
              }}
            >
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
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <h2 className="page-title">Pendaftaran Pelatihan</h2>
        <hr />

        <div className="container py-4" style={{ maxWidth: 600 }}>
          {loadingTrainings ? (
            <p>Loading daftar pelatihan...</p>
          ) : trainings.length === 0 ? (
            <p>Tidak ada pelatihan tersedia</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-2"
                name="nama"
                placeholder="Nama Lengkap"
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="nim"
                placeholder="NIM"
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="phone"
                placeholder="No HP"
                onChange={handleChange}
                required
              />

              <select
                className="form-select mb-3"
                value={trainingId}
                onChange={(e) => setTrainingId(e.target.value)}
                required
              >
                <option value="">Pilih Pelatihan</option>
                {trainings.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <button className="btn btn-primary w-100 py-2">
                Daftar Pelatihan
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
