import React from "react";
import sidebar from "../components/Sidebar";

export default function Dashboard() {
  const userName = "(nama user)"; 

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#131D78", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {sidebar()}
        <div
          style={{
            background: "linear-gradient(135deg, #010742 0%, #2336DE 100%)",
            borderRadius: "16px",
            padding: "40px",
            marginBottom: "30px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", margin: "0", fontWeight: "800" }}>
            Hallo, {userName}
          </h1>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.1rem", opacity: "0.9" }}>
            Selamat datang kembali di Dashboard
          </p>
        </div>


        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3 style={{ color: "#131D78", marginTop: "0", marginBottom: "20px" }}>
            Progres Belajar
          </h3>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "#666", fontSize: "1rem" }}>
              Kurva progres akan ditampilkan di sini (Backend Integration)
            </p>
          </div>
        </div>


        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <h3 style={{ color: "#131D78", marginTop: "0", marginBottom: "20px" }}>
            Detail Keterangan Belajar
          </h3>
          <div style={{ color: "#555", lineHeight: "1.8" }}>
            <p>
              <strong>Total Pelatihan:</strong> ...
            </p>
            <p>
              <strong>Pelatihan Selesai:</strong> ...
            </p>
            <p>
              <strong>Pelatihan Berlangsung:</strong> ...
            </p>
            <p>
              <strong>Pelatihan Akan Datang:</strong> ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}