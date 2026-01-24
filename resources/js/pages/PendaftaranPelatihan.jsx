import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser, FiCheckCircle } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

export default function PendaftaranPelatihan() {
  const location = useLocation();
  const navigate = useNavigate();

  // ===============================
  // STATE
  // ===============================
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ===============================
  // USER & THEME
  // ===============================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed?.id) setUser(parsed);
      else navigate("/login");
    } else navigate("/login");

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    return () => document.body.classList.remove("dark-theme");
  }, [navigate]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ===============================
  // TRAINING DATA
  // ===============================
  const [selectedTraining, setSelectedTraining] = useState(
    location.state?.training?.name || ""
  );

  const trainingsList = [
    "Pelatihan Web Development",
    "UI / UX Design",
    "Cyber Security",
    "Data Science",
    "Mobile Development",
    "Artificial Intelligence",
  ];

  // ===============================
  // FORM DATA
  // ===============================
  const [formData, setFormData] = useState({
    nama: user?.name || "",
    nim: "",
    email: user?.email || "",
    phone: "",
    fakultas: "",
    alamat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ ...formData, pelatihan: selectedTraining });
    alert(`Pendaftaran berhasil untuk ${selectedTraining}`);
    navigate("/dashboard");
  };

  if (!user) return null;

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} />

      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
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
                  <p className="fw-bold mb-0">{user.name}</p>
                  <p className="text-muted small">{user.email}</p>
                  <hr />
                  <button onClick={() => navigate("/profil")}>Data Pribadi</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4 align-items-stretch">

            <div className="col-lg-5">
              <div className="card h-100 border-0 shadow-sm rounded-4 bg-primary text-white">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">{selectedTraining || "Pilih Pelatihan"}</h4>
                  <p className="opacity-75">
                    Pelatihan intensif untuk meningkatkan skill dan kesiapan kariermu dengan benefit:
                  </p>

                  <ul className="list-unstyled mt-4">
                    {[
                      "Sertifikat Resmi",
                      "Mentor Profesional",
                      "Project Nyata",
                      "Networking",
                    ].map((item, i) => (
                      <li key={i} className="mb-2">
                        <FiCheckCircle className="me-2" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-lg rounded-4">
                <div className="card-body p-4 p-md-5">
                  <h3 className="fw-bold text-center mb-1">Pendaftaran Pelatihan</h3>
                  <p className="text-muted text-center mb-4">
                    Lengkapi data diri untuk mengikuti pelatihan pilihanmu
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <input className="form-control" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama Lengkap" required />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control" name="nim" value={formData.nim} onChange={handleChange} placeholder="NIM" required />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="No Handphone" required />
                      </div>
                      <div className="col-md-6">
                        <input className="form-control" name="fakultas" value={formData.fakultas} onChange={handleChange} placeholder="Fakultas" />
                      </div>
                      <div className="col-md-6">
                        <select className="form-select" value={selectedTraining} onChange={(e) => setSelectedTraining(e.target.value)} required>
                          <option value="">Pilih Pelatihan</option>
                          {trainingsList.map((t, i) => (
                            <option key={i}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <textarea className="form-control" rows="3" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat Lengkap" />
                      </div>
                      <div className="col-12 mt-3">
                        <button className="btn btn-primary w-100 py-3 fw-semibold">Daftar Sekarang</button>
                        <button type="button" className="btn btn-link w-100 mt-2" onClick={() => navigate("/dashboard")}>
                          <FaArrowLeft /> Kembali
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
