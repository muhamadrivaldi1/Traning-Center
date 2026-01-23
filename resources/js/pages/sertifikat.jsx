import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser, FiDownload, FiEye } from "react-icons/fi";
import { FaAward, FaCertificate, FaCheckCircle, FaClock } from "react-icons/fa";
import "../../css/app.css";

export default function Sertifikat() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    // Theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    // User
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, [navigate]);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    document.body.classList.toggle("dark-theme", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const certificates = [
    {
      id: 1,
      title: "Pelatihan Web Development",
      course: "Frontend Development",
      completionDate: "2024-12-15",
      status: "selesai",
      grade: "A",
      duration: "3 Bulan",
      instructor: "Dr. Ahmad Fauzi, M.Kom",
      template: "/images/Sertifikat.jpeg" // template gambar
    },
    {
      id: 2,
      title: "UI / UX Design",
      course: "Design Thinking & Prototyping",
      completionDate: "2025-01-10",
      status: "selesai",
      grade: "A-",
      duration: "2 Bulan",
      instructor: "Siti Nurhaliza, S.Sn, M.Des",
      template: "/images/Sertifikat.jpeg"
    },
    {
      id: 3,
      title: "Cyber Security",
      course: "Network Security Fundamentals",
      completionDate: "-",
      status: "belum",
      grade: "-",
      duration: "3 Bulan",
      instructor: "Ir. Budi Santoso, M.T",
      template: "/images/Sertifikat.jpeg"
    },
    {
      id: 4,
      title: "Data Science",
      course: "Data Analysis & Visualization",
      completionDate: "-",
      status: "proses",
      grade: "-",
      duration: "3 Bulan",
      instructor: "Prof. Dr. Linda Wijaya",
      template: "/images/Sertifikat.jpeg"
    },
  ];

  // Generate certificate canvas
  const generateCertificate = (cert) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = cert.template;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw template image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Add text data
        ctx.fillStyle = "#1a1a2e";
        ctx.textAlign = "center";

        // Name
        ctx.font = "bold 48px Georgia";
        ctx.fillText(user?.name || "Nama Peserta", canvas.width / 2, canvas.height / 2);

        // Course title
        ctx.font = "bold 36px Georgia";
        ctx.fillText(cert.title, canvas.width / 2, canvas.height / 2 + 60);

        // Instructor
        ctx.font = "24px Arial";
        ctx.fillText(`Instruktur: ${cert.instructor}`, canvas.width / 2, canvas.height / 2 + 100);

        // Completion date
        if (cert.completionDate && cert.completionDate !== "-") {
          ctx.fillText(
            `Tanggal: ${new Date(cert.completionDate).toLocaleDateString("id-ID")}`,
            canvas.width / 2,
            canvas.height / 2 + 140
          );
        }

        resolve(canvas);
      };
    });
  };

  // Download certificate
  const handleDownload = async (cert) => {
    const canvas = await generateCertificate(cert);
    const link = document.createElement("a");
    link.download = `Sertifikat_${cert.title.replace(/\s+/g, "_")}_${user?.name.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Preview certificate
  const handlePreview = async (cert) => {
    const canvas = await generateCertificate(cert);
    setSelectedCertificate(canvas);
    setShowPreview(true);
  };

  // Status badge
  const StatusBadge = ({ status }) => {
    const config = {
      selesai: { icon: <FaCheckCircle />, label: "Selesai", color: "#10b981", bg: "#d1fae5" },
      proses: { icon: <FaClock />, label: "Dalam Proses", color: "#f59e0b", bg: "#fef3c7" },
      belum: { icon: <FaClock />, label: "Belum Selesai", color: "#6b7280", bg: "#f3f4f6" }
    };
    const c = config[status] || config.belum;
    return (
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        color: c.color,
        backgroundColor: c.bg,
      }}>
        {c.icon} {c.label}
      </span>
    );
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
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

        {/* CONTENT */}
        <div className="container-fluid py-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            <FaCertificate size={32} color="#667eea" />
            <h2 className="page-title mb-0">Sertifikat Saya</h2>
          </div>

          {/* Certificate Cards */}
          <div className="row g-4">
            {certificates.map((cert) => (
              <div className="col-lg-6" key={cert.id}>
                <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontWeight: 700 }}>{cert.title}</h5>
                        <p className="text-muted">{cert.course}</p>
                      </div>
                      <StatusBadge status={cert.status} />
                    </div>

                    {cert.status === "selesai" ? (
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary flex-fill" onClick={() => handleDownload(cert)}>
                          <FiDownload /> Unduh Sertifikat
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => handlePreview(cert)}>
                          <FiEye /> Preview
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-outline-secondary w-100" disabled>
                        {cert.status === "proses" ? "Pelatihan Sedang Berlangsung" : "Belum Tersedia"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedCertificate && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.8)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999
        }} onClick={() => setShowPreview(false)}>
          <div style={{ background: "white", borderRadius: "12px", padding: "20px", maxWidth: "1000px", width: "100%" }}
               onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Preview Sertifikat</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowPreview(false)}>Tutup</button>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src={selectedCertificate.toDataURL()} alt="Certificate Preview"
                   style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}/>
            </div>
            <div className="mt-3 text-center">
              <button className="btn btn-primary" onClick={() => {
                const cert = certificates.find(c => c.template === selectedCertificate.src);
                handleDownload(cert);
              }}>
                <FiDownload /> Unduh Sertifikat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
