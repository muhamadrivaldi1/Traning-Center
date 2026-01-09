import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../../css/app.css";

export default function Sertifikat() {
  const [isOpen, setIsOpen] = useState(false);

  const certificates = [
    {
      id: 1,
      title: "(nama Pelatihan)",
      course: "...",
      completionDate: "tanggal",
      status: "belum selesai",
      certificateUrl: "#"
    },
    {
      id: 2,
      title: "(nama pelatihan)",
      course: "...",
      completionDate: "tanggal",
      status: "selesai",
      certificateUrl: "#"
    },
    {
      id: 3,
      title: "(nama pelatihan)",
      course: "...",
      completionDate: "tanggal",
      status: "selesai",
      certificateUrl: "#"
    }
  ];

  const handleDownload = (certificate) => {

    alert(`Downloading certificate: ${certificate.title}`);
  };

  const handleSave = (certificate) => {

    alert(`Certificate saved: ${certificate.title}`);
  };

  return (
    <>

      <button
        className={`toggle-btn ${isOpen ? 'sidebar-open' : ''}`}
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

          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Nama Pelatihan</th>
                  <th>Kursus</th>
                  <th>Tanggal Selesai</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td>{cert.title}</td>
                    <td>{cert.course}</td>
                    <td>{cert.completionDate}</td>
                    <td>
                      <span
                        style={{
                          color: cert.status === "selesai" ? "#28a745" : "#ffc107",
                          fontWeight: "600",
                        }}
                      >
                        {cert.status === "selesai" ? "✓ Selesai" : "Belum Selesai"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDownload(cert)}
                        style={{
                          background: "linear-gradient(135deg, #131D78, #2f3dbf)",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "600",
                          marginRight: "8px",
                        }}
                      >
                        📥 Unduh
                      </button>
                      <button
                        onClick={() => handleSave(cert)}
                        style={{
                          background: "linear-gradient(135deg, #131D78, #2f3dbf)",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        💾 Simpan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
