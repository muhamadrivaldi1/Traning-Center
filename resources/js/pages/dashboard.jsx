import React from "react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const userName = "(nama user)";

  return (
    <>
      <Sidebar />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#131D78",
          padding: "40px",
          paddingLeft: "300px", // 260 sidebar + jarak
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
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
              Hallo, {userName}
            </h1>
            <p style={{ marginTop: "10px", opacity: 0.9 }}>
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
            <h3 style={{ color: "#131D78" }}>Progres Belajar</h3>
            <p style={{ color: "#666" }}>
              Kurva progres akan ditampilkan di sini
            </p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ color: "#131D78" }}>
              Detail Keterangan Belajar
            </h3>
            <p><strong>Total Pelatihan:</strong> ...</p>
            <p><strong>Pelatihan Selesai:</strong> ...</p>
            <p><strong>Pelatihan Berlangsung:</strong> ...</p>
            <p><strong>Pelatihan Akan Datang:</strong> ...</p>
          </div>
        </div>
      </div>
    </>
  );
}
