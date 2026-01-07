import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        left: "0",
        width: "260px",
        height: "calc(100vh - 100px)",
        background: "#010742",
        padding: "30px 20px",
        zIndex: "99999",
        overflowY: "auto",
        borderRadius: "0 16px 16px 0",
        boxShadow: "8px 0 30px rgba(0,0,0,0.35)",
      }}
    >
      <a
        onClick={() => navigate("/dashboard")}
        style={{
          display: "block",
          padding: "12px 14px",
          borderRadius: "10px",
          color: "#ffffff",
          textDecoration: "none",
          marginBottom: "8px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, #1b2cc1, #6a5cff)";
          e.target.style.transform = "translateX(6px)";
          e.target.style.boxShadow = "0 6px 18px rgba(106, 92, 255, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Dashboard
      </a>

      <a
        onClick={() => navigate("/home")}
        style={{
          display: "block",
          padding: "12px 14px",
          borderRadius: "10px",
          color: "#ffffff",
          textDecoration: "none",
          marginBottom: "8px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, #1b2cc1, #6a5cff)";
          e.target.style.transform = "translateX(6px)";
          e.target.style.boxShadow = "0 6px 18px rgba(106, 92, 255, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Pelatihan
      </a>

      <a
        onClick={() => navigate("/pembayaran")}
        style={{
          display: "block",
          padding: "12px 14px",
          borderRadius: "10px",
          color: "#ffffff",
          textDecoration: "none",
          marginBottom: "8px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, #1b2cc1, #6a5cff)";
          e.target.style.transform = "translateX(6px)";
          e.target.style.boxShadow = "0 6px 18px rgba(106, 92, 255, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Pembayaran
      </a>

      <a
        onClick={() => navigate("/sertifikat")}
        style={{
          display: "block",
          padding: "12px 14px",
          borderRadius: "10px",
          color: "#ffffff",
          textDecoration: "none",
          marginBottom: "8px",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "linear-gradient(135deg, #1b2cc1, #6a5cff)";
          e.target.style.transform = "translateX(6px)";
          e.target.style.boxShadow = "0 6px 18px rgba(106, 92, 255, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
          e.target.style.transform = "translateX(0)";
          e.target.style.boxShadow = "none";
        }}
      >
        Sertifikat
      </a>
    </div>
  );
}
