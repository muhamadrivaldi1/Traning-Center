import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiUser, FiSun, FiMoon, FiLogOut, FiStar } from "react-icons/fi";

export default function Profil() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    setShowUserMenu(false);
    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div
        className={`main-content ${isOpen ? "sidebar-open" : ""}`}
        style={{
          minHeight: "100vh",
          padding: "30px",
          background: isDarkMode
            ? "linear-gradient(135deg, #1F2937, #111827)"
            : "linear-gradient(135deg, #E0F2FE, #BAE6FD)",
          transition: "0.5s",
        }}
      >
        {/* ================= TOPBAR ================= */}
        <div
          className="topbar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: isDarkMode ? "#fff" : "#1F2937",
            }}
          >
            ☰
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* THEME */}
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "22px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
                color: isDarkMode ? "#fff" : "#1F2937",
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* USER */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "22px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "50%",
                  color: isDarkMode ? "#fff" : "#1F2937",
                }}
              >
                <FiUser />
              </button>

              {showUserMenu && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "35px",
                    background: isDarkMode ? "#1F2937" : "#fff",
                    color: isDarkMode ? "#fff" : "#111",
                    borderRadius: "12px",
                    minWidth: "200px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                    zIndex: 999,
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "15px", textAlign: "center" }}>
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #6366F1, #A78BFA)",
                        margin: "0 auto 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#fff",
                      }}
                    >
                      {user?.name?.[0] || "U"}
                    </div>
                    <b>{user?.name || "User"}</b>
                    <p style={{ fontSize: "12px", marginTop: "5px" }}>
                      {user?.email || "-"}
                    </p>
                  </div>

                  <hr />

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      transition: "0.3s",
                      color: "inherit",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = isDarkMode
                        ? "#FEE2E2)"
                        : "#FEE2E2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= PROFIL CARD ================= */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              maxWidth: "600px",
              width: "100%",
              padding: "50px 30px",
              borderRadius: "25px",
              textAlign: "center",
              backdropFilter: "blur(15px)",
              background: isDarkMode
                ? "rgba(31,41,55,0.85)"
                : "rgba(255,255,255,0.85)",
              color: isDarkMode ? "#fff" : "#111",
              boxShadow: isDarkMode
                ? "0 20px 60px rgba(0,0,0,0.3)"
                : "0 20px 60px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                margin: "0 auto 25px",
                background: "linear-gradient(135deg,#6366F1,#A78BFA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                color: "#fff",
              }}
            >
              {user?.name?.[0] || "U"}
            </div>

            <h1>{user?.name || "Mahasiswa"}</h1>
            <p style={{ opacity: 0.8 }}>{user?.email || "email@example.com"}</p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "25px",
              }}
            >
              {[
                { label: "Status", value: "Aktif", icon: <FiUser /> },
                { label: "Role", value: "Peserta Training", icon: <FiStar /> },
                { label: "Kursus", value: "3/5", icon: <FiStar /> },
                { label: "Progress", value: "60%", icon: <FiStar /> },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 120px",
                    padding: "20px",
                    borderRadius: "20px",
                    background: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {item.icon}
                  <b>{item.label}</b>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
