import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("card");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };


  const events = [
    {
      title: "Pelatihan Web Development",
      image: "/images/WEb Development.jpeg",
    },
    {
      title: "UI / UX Design",
      image: "/images/UI UX.jpeg",
    },
    {
      title: "Cyber Security",
      image: "/images/Cyber.jpeg",
    },
    {
      title: "Data Science",
      image: "/images/Data.jpeg",
    },
    {
      title: "Mobile Development",
      image: "/images/Mobile App.jpeg",
    },
    {
      title: "Artificial Intelligence",
      image: "/images/AI.jpeg",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* HEADER */}
        <div className="topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div className="topbar-right">
            {/* Theme Toggle Button */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* User Menu */}
            <div className="user-menu-container">
              <button
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s ease, transform 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <FiUser />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user?.name || "User"}</p>
                    <p className="user-email">{user?.email || "-"}</p>
                  </div>

                  <hr />

                  <button
                    className="profile-btn"
                    onClick={() => {
                      navigate("/profil");
                      setShowUserMenu(false);
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#333",
                      cursor: "pointer",
                      padding: "8px",
                      width: "100%",
                      textAlign: "left"
                    }}
                  >
                    Profil
                  </button>

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="page-title">Daftar Pelatihan</h2>
        <hr />

        {/* TABS */}
        <div className="tabs">
          <span
            className={search === "card" ? "tab active" : "tab"}
            onClick={() => setSearch("card")}
          >
            CARD VIEW
          </span>
          <span
            className={search === "table" ? "tab active" : "tab"}
            onClick={() => setSearch("table")}
          >
            TABLE VIEW
          </span>
        </div>

        {/* SEARCH FILTER */}
        <div className="filter">
          <label className="filter-label">Pencarian</label>
          <input
            type="text"
            placeholder="Cari event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* EVENT CARD */}
        <div className="event-grid">
          {filteredEvents.map((item, index) => (
            <div
              className="event-card"
              key={index}
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                borderRadius: "10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <h5 style={{ margin: "10px 0 5px 0" }}>{item.title}</h5>

              {/* Tombol Detail */}
              <button
                className="detail-btn"
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => alert(`Detail untuk ${item.title}`)}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
              >
                Detail
              </button>
            </div>
          ))}
        </div>
        <button
          className="help-btn"
          onClick={() => window.open("https://helpdesk.unpam.ac.id", "_blank")}
        >
          💬 PUSAT BANTUAN
        </button>

      </div>
    </>
  );
}
