import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FiUser, FiSun, FiMoon, FiStar, FiEdit, FiX, FiBookOpen, FiAward } from "react-icons/fi";

export default function Profil() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // 1. Load Tema
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    // 2. Load User Data & Token dari LocalStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        password: ""
      });
    }
  }, []);

  // FUNGSI UPDATE KE BACKEND
  const handleUpdate = async (e) => {
    e.preventDefault();

    // AMBIL TOKEN DARI DALAM OBJEK USER (Sesuai cara Login kamu)
    const savedUser = localStorage.getItem("user");
    let token = "";

    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      token = parsedData.token; // Mengambil token dari dalam objek
    }

    try {
      const response = await axios.post("/api/user/update", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Data user baru dari Laravel
      const updatedUserFromBackend = response.data.user;

      // GABUNGKAN LAGI DENGAN TOKEN LAMA (Agar sesi tidak putus)
      const newUserRecord = {
        ...updatedUserFromBackend,
        token: token
      };

      // Update State & LocalStorage
      setUser(updatedUserFromBackend);
      localStorage.setItem("user", JSON.stringify(newUserRecord));

      setShowEditModal(false);
      alert("Profil Berhasil Diperbarui!");
      setFormData(prev => ({ ...prev, password: "" }));

    } catch (error) {
      console.error("Gagal update profil:", error);
      if (error.response?.status === 401) {
        alert("Sesi habis, silakan login kembali.");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Terjadi kesalahan saat update profil.");
      }
    }
  };

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div
        className={`main-content ${isOpen ? "sidebar-open" : ""}`}
        style={{
          minHeight: "100vh",
          padding: "30px",
          background: isDarkMode
            ? "linear-gradient(135deg, #1F2937, #111827)"
            : "linear-gradient(135deg, #F0F9FF, #E0F2FE)",
          transition: "0.5s",
        }}
      >
        {/* ================= TOPBAR (TEKS & IKON PUTIH) ================= */}
        <div
          className="topbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            paddingBottom: "15px",
            borderBottom: "2px solid #60A5FA", // Garis biru cerah tetap ada
            transition: "0.3s"
          }}
        >
          {/* Ikon Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#FFFFFF", // Diubah jadi Putih
            }}
          >
            ☰
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* Judul Halaman */}
            <span style={{
              fontWeight: "600",
              color: "#FFFFFF", // Diubah jadi Putih
              marginRight: "10px"
            }}>
              Profil Saya
            </span>

            {/* Tombol Theme (Sun/Moon) */}
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                color: "#FFFFFF", // Diubah jadi Putih
                display: "flex",
                alignItems: "center"
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* Tombol User */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                color: "#FFFFFF", // Diubah jadi Putih
                display: "flex",
                alignItems: "center"
              }}
            >
              <FiUser />
            </button>
          </div>
        </div>

        {/* PROFIL CARD */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <div style={{
            maxWidth: "800px", width: "100%", padding: "40px", borderRadius: "30px", textAlign: "center",
            background: isDarkMode ? "rgba(31,41,55,0.9)" : "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}>
            <div style={{ position: "relative", width: "130px", height: "130px", margin: "0 auto 20px" }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", color: "#fff"
              }}>
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                style={{ position: "absolute", bottom: "5px", right: "5px", background: "#6366F1", color: "#fff", border: "none", borderRadius: "50%", width: "35px", height: "35px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <FiEdit size={16} />
              </button>
            </div>
            <h2 style={{ color: isDarkMode ? "#fff" : "#1F2937", margin: "0" }}>{user?.name || "Memuat..."}</h2>
            <p style={{ color: "#6B7280", margin: "5px 0 20px" }}>{user?.email || "..."}</p>

            {/* STATS CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginTop: "30px" }}>
              {[
                { label: "Status", value: "Aktif", icon: <FiUser />, color: "#DBEAFE", iconColor: "#1E40AF" },
                { label: "Role", value: "Mahasiswa", icon: <FiStar />, color: "#F3E8FF", iconColor: "#6B21A8" },
                { label: "Total Kursus", value: "0", icon: <FiBookOpen />, color: "#DCFCE7", iconColor: "#166534" },
                { label: "Total Sertifikat", value: "0", icon: <FiAward />, color: "#FEF9C3", iconColor: "#854D0E" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "15px", padding: "20px", borderRadius: "20px",
                  background: isDarkMode ? "rgba(255,255,255,0.05)" : "#F9FAFB",
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #F3F4F6"
                }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "15px", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: item.iconColor, fontSize: "20px" }}>
                    {item.icon}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: isDarkMode ? "#fff" : "#1F2937" }}>{item.value}</div>
                    <div style={{ fontSize: "13px", color: "#9CA3AF" }}>{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL EDIT PROFIL */}
        {showEditModal && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(5px)" }}>
            <div style={{ background: isDarkMode ? "#1F2937" : "#fff", padding: "30px", borderRadius: "25px", width: "90%", maxWidth: "450px", position: "relative" }}>
              <button onClick={() => setShowEditModal(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#9CA3AF" }}><FiX /></button>
              <h3 style={{ marginBottom: "20px", color: isDarkMode ? "#fff" : "#1F2937" }}>Edit Profil</h3>

              <form onSubmit={handleUpdate}>
                <div style={{ marginBottom: "15px", textAlign: "left" }}>
                  <label style={{ fontSize: "14px", color: "#9CA3AF" }}>Nama Lengkap</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #E5E7EB", marginTop: "5px", color: "#333" }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "15px", textAlign: "left" }}>
                  <label style={{ fontSize: "14px", color: "#9CA3AF" }}>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #E5E7EB", marginTop: "5px", color: "#333" }}
                    required
                  />
                </div>
                <div style={{ marginBottom: "20px", textAlign: "left" }}>
                  <label style={{ fontSize: "14px", color: "#9CA3AF" }}>Ganti Password (Opsional)</label>
                  <input
                    type="password"
                    placeholder="Kosongkan jika tidak ingin ganti"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #E5E7EB", marginTop: "5px", color: "#333" }}
                  />
                </div>

                <button type="submit" style={{ width: "100%", padding: "12px", background: "#6366F1", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}