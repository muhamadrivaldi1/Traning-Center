import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../../css/app.css";

export default function Sertifikat() {
  const [isOpen, setIsOpen] = useState(false);

  // Sample certificate data - in real app this would come from API
  const certificates = [
    {
      id: 1,
      title: "Pelatihan Digital Marketing",
      course: "Digital Marketing Fundamentals",
      completionDate: "15 Desember 2024",
      status: "completed",
      certificateUrl: "#"
    },
    {
      id: 2,
      title: "Pelatihan Web Development",
      course: "React.js Development",
      completionDate: "10 November 2024",
      status: "completed",
      certificateUrl: "#"
    },
    {
      id: 3,
      title: "Pelatihan Data Science",
      course: "Python for Data Analysis",
      completionDate: "5 Oktober 2024",
      status: "completed",
      certificateUrl: "#"
    }
  ];

  const handleDownload = (certificate) => {
    // In real app, this would trigger actual download
    alert(`Downloading certificate: ${certificate.title}`);
  };

  const handleSave = (certificate) => {
    // In real app, this would save to user's saved certificates
    alert(`Certificate saved: ${certificate.title}`);
  };

  return (
    <>
      {/* TOGGLE BUTTON */}
      <button
        className="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        &#9776;
      </button>

      <Sidebar isOpen={isOpen} />

      <div
        className={isOpen ? "sidebar-open" : ""}
        style={{
          minHeight: "100vh",
          backgroundColor: "#131D78",
          padding: "40px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #010742, #2336DE)",
              borderRadius: "16px",
              padding: "40px",
              marginBottom: "30px",
              color: "white",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: 0, fontWeight: "800" }}>
              Sertifikat Saya
            </h1>
            <p style={{ marginTop: "10px", opacity: 0.9 }}>
              Kelola dan unduh sertifikat pelatihan Anda
            </p>
          </div>

          {/* Certificates Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "24px",
              marginBottom: "30px",
            }}
          >
            {certificates.map((cert) => (
              <div
                key={cert.id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "30px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                }}
              >
                {/* Certificate Icon */}
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, #131D78, #2f3dbf)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 15px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "32px",
                        color: "white",
                      }}
                    >
                      🏆
                    </span>
                  </div>
                </div>

                {/* Certificate Details */}
                <h3
                  style={{
                    color: "#131D78",
                    fontWeight: "700",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  {cert.title}
                </h3>

                <div style={{ marginBottom: "20px" }}>
                  <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                    <strong>Kursus:</strong> {cert.course}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                    <strong>Tanggal Selesai:</strong> {cert.completionDate}
                  </p>
                  <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: "#28a745",
                        fontWeight: "600",
                      }}
                    >
                      ✓ Selesai
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexDirection: "column",
                  }}
                >
                  <button
                    onClick={() => handleDownload(cert)}
                    style={{
                      background: "linear-gradient(135deg, #131D78, #2f3dbf)",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #0f165f, #1a237e)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #131D78, #2f3dbf)";
                    }}
                  >
                    📥 Unduh Sertifikat
                  </button>

                  <button
                    onClick={() => handleSave(cert)}
                    style={{
                      background: "transparent",
                      color: "#131D78",
                      border: "2px solid #131D78",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#131D78";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#131D78";
                    }}
                  >
                    💾 Simpan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {certificates.length === 0 && (
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "60px 30px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: "64px",
                  marginBottom: "20px",
                  opacity: 0.5,
                }}
              >
                📜
              </div>
              <h3 style={{ color: "#131D78", marginBottom: "10px" }}>
                Belum Ada Sertifikat
              </h3>
              <p style={{ color: "#666" }}>
                Selesaikan pelatihan untuk mendapatkan sertifikat Anda
              </p>
            </div>
          )}

          {/* Info Section */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ color: "#131D78", marginBottom: "15px" }}>
              📋 Informasi Sertifikat
            </h3>
            <ul style={{ color: "#666", lineHeight: "1.6" }}>
              <li>Sertifikat akan tersedia setelah menyelesaikan pelatihan 100%</li>
              <li>Unduh sertifikat dalam format PDF untuk penyimpanan</li>
              <li>Sertifikat dapat dibagikan ke LinkedIn atau platform lainnya</li>
              <li>Simpan sertifikat untuk akses cepat di masa depan</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
