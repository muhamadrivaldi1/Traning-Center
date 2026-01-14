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
    document.body.classList.toggle("dark-theme", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  const totalPelatihan = 6;
  const pelatihanBerjalan = 2;
  const pelatihanSelesai = 4;

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
            : "linear-gradient(135deg, #E0F2FE, #BAE6FD)", // lebih cerah di light mode
          transition: "0.5s",
        }}
      >
        {/* TOPBAR */}
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
            className="sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              color: isDarkMode ? "#fff" : "#1F2937",
              fontSize: "24px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            ☰
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* Toggle Theme */}
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                color: isDarkMode ? "#fff" : "#1F2937",
                fontSize: "22px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* User Menu */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: isDarkMode ? "#fff" : "#1F2937",
                  fontSize: "22px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "50%",
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
                        background: "linear-gradient(135deg, #6366F1, #A78BFA)",
                        margin: "0 auto 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "#fff",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                        transition: "0.3s",
                      }}
                    >
                      {user?.name?.[0] || "U"}
                    </div>
                    <b>{user?.name || "User"}</b>
                    <p style={{ fontSize: "12px", margin: "5px 0 0" }}>{user?.email || "-"}</p>
                  </div>
                  <hr />
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      padding: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "center",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FECACA")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              backdropFilter: "blur(15px)",
              background: isDarkMode
                ? "rgba(31,41,55,0.85)"
                : "rgba(255,255,255,0.85)",
              borderRadius: "25px",
              padding: "50px 30px",
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
              boxShadow: isDarkMode
                ? "0 20px 60px rgba(0,0,0,0.3)"
                : "0 20px 60px rgba(0,0,0,0.1)",
              color: isDarkMode ? "#fff" : "#111",
              transition: "0.5s",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: isDarkMode
                  ? "linear-gradient(135deg,#6366F1,#A78BFA)"
                  : "linear-gradient(135deg,#4F46E5,#3B82F6)",
                margin: "0 auto 25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                fontWeight: "bold",
                boxShadow: isDarkMode
                  ? "0 10px 30px rgba(0,0,0,0.5)"
                  : "0 10px 30px rgba(0,0,0,0.2)",
                transition: "0.3s",
                color: "#fff",
              }}
            >
              {user?.name?.[0] || "U"}
            </div>

            <h1 style={{ margin: "0 0 10px", fontSize: "30px" }}>{user?.name || "Mahasiswa"}</h1>
            <p style={{ margin: "0 0 25px", fontSize: "14px", opacity: 0.8 }}>
              {user?.email || "email@example.com"}
            </p>

            {/* INFO & BADGES */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "25px",
              }}
            >
              {[
                { label: "Status", value: "Aktif", icon: <FiUser /> },
                { label: "Role", value: "Peserta Training", icon: <FiStar /> },
                { label: "Kursus Selesai", value: "3/5", icon: <FiStar /> },
                { label: "Progress", value: "60%", icon: <FiStar /> },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 120px",
                    padding: "20px",
                    borderRadius: "20px",
                    background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    backdropFilter: "blur(8px)",
                    transition: "0.3s",
                    cursor: "pointer",
                    color: isDarkMode ? "#fff" : "#111",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = isDarkMode
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(0,0,0,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)")
                  }
                >
                  {item.icon}
                  <p style={{ margin: 0, fontWeight: "600", opacity: 0.9 }}>{item.label}</p>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* PROGRESS BAR */}
            <div>
              <p style={{ marginBottom: "10px", fontWeight: "600", opacity: 0.9 }}>Progress Learning</p>
              <div
                style={{
                  height: "14px",
                  borderRadius: "10px",
                  background: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    background: isDarkMode
                      ? "linear-gradient(135deg,#6366F1,#A78BFA)"
                      : "linear-gradient(135deg,#4F46E5,#3B82F6)",
                    borderRadius: "10px",
                    transition: "width 1s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
