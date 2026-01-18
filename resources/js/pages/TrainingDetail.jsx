import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TrainingDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const training = location.state?.training;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!training) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4f6f9"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3>Training tidak ditemukan</h3>
          <button
            onClick={() => navigate("/home")}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "var(--primary-purple)",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <nav className="navbar navbar-dark fixed-top navbar-custom">
        <div className="container">
          <div
            className="navbar-brand d-flex align-items-center gap-3"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/home")}
          >
            <span style={{ fontSize: "1.5rem" }}>&#9776;</span>
            <img
              src="/images/unpam (2).png"
              alt="UNPAM"
              style={{ height: "40px" }}
            />
            <span className="fw-bold">Training Center UNPAM</span>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px"
          }}
        >

          <button
            onClick={() => navigate("/home")}
            style={{
              background: "var(--primary-purple)",
              color: "#fff",
              border: "none",
              padding: "10px 22px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "28px"
            }}
          >
            ← Back to Home
          </button>

          <div
            style={{
              height: "320px",
              borderRadius: "18px",
              overflow: "hidden",
              backgroundImage: `url("/images/timage.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              marginBottom: "35px"
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.6))"
              }}
            />
            <div
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "#fff",
                padding: "0 20px"
              }}
            >
              <h1 style={{ fontSize: "2.4rem", fontWeight: "700" }}>
                (Nama Pelatihan)
              </h1>
              <p style={{ maxWidth: "700px" }}>
                Pelatihan intensif untuk meningkatkan kompetensi dan kesiapan
                karier Anda
              </p>
            </div>
          </div>

          {/* CARD */}
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
              padding: "45px"
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                marginBottom: "45px"
              }}
            >
              <div>
                <h3 style={{ color: "var(--primary-purple)" }}>
                  Deskripsi Program
                </h3>
                <p style={{ lineHeight: "1.8", color: "#555" }}>
                  {training.description || "Deskripsi belum tersedia."}
                </p>
              </div>

              <div>
                <h3 style={{ color: "var(--primary-purple)" }}>Manfaat</h3>
                <ul style={{ lineHeight: "1.9", color: "#555" }}>
                  <li>Sertifikat resmi</li>
                  <li>Instruktur berpengalaman</li>
                  <li>Materi up-to-date</li>
                  <li>Relasi & networking</li>
                </ul>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "30px",
                marginBottom: "45px"
              }}
            >
              {[
                { title: "Durasi", value: "3 Bulan" },
                { title: "Jadwal", value: "Setiap Sabtu" },
                { title: "Biaya", value: "Rp 2.500.000" }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f4f6f9",
                    borderRadius: "14px",
                    padding: "25px",
                    textAlign: "center"
                  }}
                >
                  <h4 style={{ color: "var(--primary-purple)" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontWeight: "600" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {user && (
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => navigate("/pembayaran")}
                  style={{
                    background: "var(--primary-purple)",
                    color: "#fff",
                    border: "none",
                    padding: "16px 45px",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                >
                  Daftar Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
