import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, CreditCard, FileText } from "lucide-react";
import "./Sidebar.css"; 

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Pelatihan",
      path: "/pelatihan-saya",
      icon: Calendar
    },
    {
      label: "Pembayaran",
      path: "/pembayaran",
      icon: CreditCard
    },
    {
      label: "Sertifikat",
      path: "/sertifikat",
      icon: FileText
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar ${isOpen ? "active" : ""}`}>

      <div className="sidebar-logo">
        <div className="logo-container">
          <img
            src="/images/TCF_Logo.png"
            alt="Training Center FILKOM"
            className="sidebar-logo-img"
          />
        </div>
      </div>

      <div className="sidebar-top-menu">
        <div
          className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard className="sidebar-icon" size={20} />
          <span>Dashboard</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="menu-label">APLIKASI</div>

        {menuItems
          .filter(item => item.path !== "/dashboard")
          .map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="sidebar-icon" size={20} />
                <span>{item.label}</span>
              </div>
            );
          })}
      </div>
    </aside>
  );
}