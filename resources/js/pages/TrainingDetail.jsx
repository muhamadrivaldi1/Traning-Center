import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function TrainingDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const training = location.state?.training;

  if (!training) {
    return (
      <div>
        <p>Training data not found. Please go back to the home page.</p>
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom`}>
        <div className="container navbar-padding">
          <div className="navbar-brand d-flex align-items-center gap-3">
            <span className="menu-icon" onClick={() => navigate("/home")}>&#9776;</span>
            <img
              src="/images/unpam (2).png"
              className="navbar-logo"
              alt="UNPAM"
            />
            <span className="fw-bold">Training Center UNPAM</span>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={false} />

      <div className="sidebar-open" style={{ padding: "120px 60px", background: "#f8f9fa", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          <button
            onClick={() => navigate("/home")}
            style={{
              background: "var(--primary-purple)",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "30px"
            }}
          >
            ← Back to Home
          </button>

          <div style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <div style={{ padding: "40px" }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <h1 style={{ color: "var(--primary-purple)", marginBottom: "10px" }}>{training.title}</h1>
                <p style={{ color: "#666", fontSize: "1.1rem" }}>Pelatihan intensif untuk meningkatkan kompetensi Anda</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "40px" }}>
                <div>
                  <h3 style={{ color: "var(--primary-purple)", marginBottom: "15px", borderBottom: "2px solid var(--primary-purple)", paddingBottom: "5px" }}>Deskripsi Program</h3>
                  <p style={{ lineHeight: "1.7", color: "#555" }}>{training.description}</p>
                </div>

                <div>
                  <h3 style={{ color: "var(--primary-purple)", marginBottom: "15px", borderBottom: "2px solid var(--primary-purple)", paddingBottom: "5px" }}>Manfaat yang Didapat</h3>
                  <ul style={{ lineHeight: "1.8", color: "#555", paddingLeft: "20px" }}>
                    <li>Meningkatkan keterampilan teknis yang dibutuhkan industri</li>
                    <li>Mendapatkan sertifikat resmi dari Training Center UNPAM</li>
                    <li>Pelatihan langsung dari instruktur berpengalaman</li>
                    <li>Materi pembelajaran yang selalu up-to-date</li>
                    <li>Networking dengan peserta dari berbagai latar belakang</li>
                  </ul>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", marginBottom: "40px" }}>
                <div style={{ textAlign: "center", padding: "20px", background: "#f8f9fa", borderRadius: "10px" }}>
                  <h4 style={{ color: "var(--primary-purple)", marginBottom: "10px" }}>Durasi</h4>
                  <p style={{ color: "#555", fontSize: "1.1rem", fontWeight: "500" }}>3 Bulan</p>
                  <p style={{ color: "#777", fontSize: "0.9rem" }}>12 Pertemuan</p>
                </div>

                <div style={{ textAlign: "center", padding: "20px", background: "#f8f9fa", borderRadius: "10px" }}>
                  <h4 style={{ color: "var(--primary-purple)", marginBottom: "10px" }}>Jadwal</h4>
                  <p style={{ color: "#555", fontSize: "1.1rem", fontWeight: "500" }}>Setiap Sabtu</p>
                  <p style={{ color: "#777", fontSize: "0.9rem" }}>09:00 - 12:00 WIB</p>
                </div>

                <div style={{ textAlign: "center", padding: "20px", background: "#f8f9fa", borderRadius: "10px" }}>
                  <h4 style={{ color: "var(--primary-purple)", marginBottom: "10px" }}>Biaya</h4>
                  <p style={{ color: "#555", fontSize: "1.1rem", fontWeight: "500" }}>Rp 2.500.000</p>
                  <p style={{ color: "#777", fontSize: "0.9rem" }}>Termasuk Materi & Sertifikat</p>
                </div>
              </div>

              <div style={{ background: "var(--primary-purple)", color: "white", padding: "30px", borderRadius: "10px", marginBottom: "30px" }}>
                <h3 style={{ marginBottom: "15px" }}>Informasi Tambahan</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <p><strong>Lokasi:</strong> Kampus Pusat UNPAM</p>
                    <p><strong>Alamat:</strong> Jl. Surya Kencana No.1, Pamulang Barat</p>
                  </div>
                  <div>
                    <p><strong>Mulai:</strong> 15 Januari 2024</p>
                    <p><strong>Kontak:</strong> training@unpam.ac.id</p>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  style={{
                    background: "var(--primary-purple)",
                    color: "white",
                    border: "none",
                    padding: "16px 40px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    fontWeight: "600"
                  }}
                  onClick={() => navigate("/pembayaran")}
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
