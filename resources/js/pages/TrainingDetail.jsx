import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { FiSun, FiMoon, FiUser, FiClock, FiCalendar, FiTag, FiCheckCircle, FiStar, FiAward } from "react-icons/fi";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import "../../styles/TrainingDetail.css";

export default function TrainingDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const training = location.state?.training;

  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false); // <--- State baru untuk cek status

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      checkEnrollmentStatus(); // <--- Panggil fungsi cek status saat load
    }

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, []);

  // Fungsi untuk cek apakah pelatihan ini sudah dibayar/lunas
  const checkEnrollmentStatus = async () => {
    if (!training) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/my-trainings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Cari apakah ID pelatihan ini ada di daftar "success" atau "settlement"
      const alreadyOwned = response.data.some(item =>
        item.training_id === training.id &&
        (item.payment_status === "success" || item.payment_status === "settlement")
      );

      setIsEnrolled(alreadyOwned);
    } catch (error) {
      console.error("Gagal cek status:", error);
    }
  };

  const isLoggedIn = !!user;

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
    localStorage.removeItem("token");
    navigate("/");
  };

  const handlePayment = async () => {
    // Jika sudah LUNAS, arahkan ke Pembelajaran.jsx
    if (isEnrolled) {
      navigate(`/pembelajaran/${training.id}`, {
        state: { training: training }
      });
      return;
    }

    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk mendaftar.");
      navigate("/login", { state: { redirectTo: "/training-detail", training } });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8000/api/checkout`,
        { training_id: training.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        }
      );

      alert("Berhasil membuat pesanan!");
      navigate("/pembayaran");
    } catch (error) {
      console.error("Detail Error:", error.response?.data);
      const message = error.response?.data?.message || "Gagal memproses pendaftaran.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  if (!training) {
    return (
      <div className="center-fallback d-flex align-items-center justify-content-center vh-100">
        <div className="card border-0 shadow-lg p-5 text-center rounded-5">
          <FaExclamationTriangle className="text-warning display-1 mb-4 animate-bounce" />
          <h2 className="fw-bold">Oops! Data tidak ditemukan</h2>
          <Link className="btn btn-primary rounded-pill px-4 mt-3" to="/dashboard">Kembali ke Dashboard</Link>
        </div>
      </div>
    );
  }

  const TrainingContent = ({ isGuest }) => (
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-5 overflow-hidden mx-auto border-top border-5 border-primary" style={{ maxWidth: "1050px" }}>

        <div className="position-relative overflow-hidden" style={{ height: "480px" }}>
          <img
            src={training.image}
            alt={training.name}
            className="w-100 h-100 transition-scale"
            style={{ objectFit: "cover" }}
            onError={(e) => e.target.src = "/images/default.jpg"}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-5"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 70%)" }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold shadow-sm" style={{ fontSize: '10px' }}>
                <FiStar className="me-1" /> BEST SELLER
              </span>
              <span className="badge bg-primary px-3 py-2 rounded-pill fw-bold shadow-sm" style={{ fontSize: '10px' }}>
                <FiAward className="me-1" /> CERTIFIED
              </span>
            </div>
            <h1 className="text-white fw-bolder display-4 mb-2 text-uppercase letter-spacing-1">{training.name}</h1>
            <p className="text-white-50 fs-5 mb-0 max-w-700">Tingkatkan keahlianmu bersama para profesional di bidangnya.</p>
          </div>
        </div>

        <div className="card-body p-4 p-md-5">
          <div className="row g-5">
            <div className="col-lg-7">
              <section className="mb-5">
                <h4 className="fw-bold text-primary mb-4 d-flex align-items-center gap-2">
                  <span className="bg-primary rounded-circle" style={{ width: '6px', height: '25px' }}></span>
                  Tentang Program
                </h4>
                <p className="text-muted fs-6 lh-lg" style={{ textAlign: 'justify' }}>
                  {training.description || "Program pelatihan komprehensif ini dirancang untuk membekali Anda dengan keterampilan praktis."}
                </p>
              </section>

              <section>
                <h6 className="fw-bold mb-4 text-uppercase small text-primary">Benefit Peserta:</h6>
                <div className="row g-3">
                  {/* Cek jika data benefits tersedia dan merupakan array */}
                  {training.benefits && training.benefits.length > 0 ? (
                    training.benefits.map((item, i) => (
                      <div className="col-sm-6" key={i}>
                        <div className="p-2 rounded-3 border bg-light d-flex align-items-center gap-2 transition-hover">
                          <FiCheckCircle className="text-success small" />
                          <span className="small fw-medium text-dark">{item}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Tampilan jika data benefit di database kosong
                    <div className="col-12">
                      <p className="text-muted small italic">Informasi benefit belum tersedia.</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="col-lg-5">
              <div className="p-4 rounded-5 border-0 shadow-sm sticky-top"
                style={{ backgroundColor: isDarkMode ? "#252525" : "#f8f9fa", top: "20px" }}>
                <h6 className="fw-bold mb-4 text-center text-uppercase small letter-spacing-1 text-muted">Ringkasan Info</h6>

                <div className="list-group list-group-flush mb-4 bg-transparent">
                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2 border-bottom">
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <FiClock className="text-primary" /> <span>Durasi</span>
                    </div>
                    {/* Mengambil data dari PHP yang sudah dikirim lewat state */}
                    <span className="fw-bold small">{training.duration || "-"}</span>
                  </div>

                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2 border-bottom">
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <FiCalendar className="text-primary" /> <span>Jadwal</span>
                    </div>
                    {/* Mengambil data dari PHP yang sudah dikirim lewat state */}
                    <span className="fw-bold small">{training.schedule || "-"}</span>
                  </div>

                  <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-3 border-0">
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <FiTag className="text-primary" />
                      <span className="fw-bold">Investasi</span>
                    </div>
                    <span className="text-primary fw-bold small">
                      {isEnrolled ? "SUDAH LUNAS" : (training.price ? `Rp ${Number(training.price).toLocaleString('id-ID')}` : "Rp 0")}
                    </span>
                  </div>
                </div>

                <div className="d-grid gap-2">
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className={`btn py-3 fw-bold rounded-pill shadow-sm border-0 btn-glow ${isEnrolled ? 'btn-success' : 'btn-primary'}`}
                    style={{ fontSize: '14px' }}
                  >
                    {loading ? "Menghubungkan..." : (isEnrolled ? "Mulai Sekarang" : "Daftar Sekarang")}
                  </button>
                  <Link
                    to={isGuest ? "/home" : "/dashboard"}
                    className="btn btn-link btn-sm text-decoration-none text-muted mt-2"
                  >
                    <FaArrowLeft className="me-2" /> Kembali ke Katalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
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
        <div className="container-fluid">
          <TrainingContent isGuest={!isLoggedIn} />
        </div>
      </div>
    </>
  );
}