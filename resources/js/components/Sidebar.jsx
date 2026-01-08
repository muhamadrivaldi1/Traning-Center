import React from "react";
import { useNavigate } from "react-router-dom";
// pastikan CSS ada

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? "active" : ""}`}>
      <div className="sidebar-menu">
        {[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Pelatihan", path: "/home" },
          { label: "Pembayaran", path: "/pembayaran" },
          { label: "Sertifikat", path: "/sertifikat" },
        ].map((item) => (
          <div
            key={item.label}
            className="sidebar-item"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </div>
        ))}
      </div>

      <div
        className="sidebar-logout"
        onClick={() => navigate("/")}
      >
        Logout
      </div>
    </aside>
  );
}
