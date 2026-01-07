import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {


    navigate("/"); 
  };

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "260px",
        height: "100vh",
        background: "#010742",
        padding: "30px 20px",
        borderRadius: "0 16px 16px 0",
        boxShadow: "8px 0 30px rgba(0,0,0,0.35)",
        zIndex: 1000,

        display: "flex",
        flexDirection: "column", 
      }}
    >
      <div>
        {[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Pelatihan", path: "/home" },
          { label: "Pembayaran", path: "/pembayaran" },
          { label: "Sertifikat", path: "/sertifikat" },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              color: "#ffffff",
              marginBottom: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #1b2cc1, #6a5cff)";
              e.currentTarget.style.transform = "translateX(6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateX(0)";
            }}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div
        onClick={handleLogout}
        style={{
          marginTop: "auto",
          padding: "12px 14px",
          borderRadius: "10px",
          color: "#ff6b6b",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 107, 107, 0.15)";
          e.currentTarget.style.transform = "translateX(6px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        Logout
      </div>
    </aside>
  );
}
