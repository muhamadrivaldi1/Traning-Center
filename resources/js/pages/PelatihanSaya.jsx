import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../css/app.css";

export default function PelatihanSaya() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.body.classList.add("dark-theme");
        }

        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        // MOCK DATA (FINAL)
        const mockTrainings = [
            {
                id: 1,
                title: "Pelatihan Web Development",
                image: "/images/Web Development.jpeg",
                status: "Aktif",
                progress: 75,
                startDate: "2024-01-15",
                endDate: "2024-02-15",
            },
            {
                id: 2,
                title: "UI / UX Design",
                image: "/images/UI UX.jpeg",
                status: "Selesai",
                progress: 100,
                startDate: "2023-12-01",
                endDate: "2024-01-01",
            },
            {
                id: 3,
                title: "Cyber Security",
                image: "/images/Cyber.jpeg",
                status: "Aktif",
                progress: 45,
                startDate: "2024-01-20",
                endDate: "2024-02-20",
            },
        ];

        setTrainings(mockTrainings);
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

    const getStatusColor = (status) => {
        switch (status) {
            case "Aktif":
                return "#28a745";
            case "Selesai":
                return "#007bff";
            case "Pending":
                return "#ffc107";
            default:
                return "#6c757d";
        }
    };

    return (
        <>
            <Sidebar isOpen={isOpen} />

            <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
                {/* TOPBAR */}
                <div className="topbar">
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className="topbar-right">
                        <button className="theme-toggle-btn" onClick={toggleTheme}>
                            {isDarkMode ? <FiSun /> : <FiMoon />}
                        </button>

                        <div className="user-menu-container">
                            <button
                                className="user-menu-btn"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <FiUser />
                            </button>

                            {showUserMenu && (
                                <div className="user-dropdown">
                                    <div className="user-info">
                                        <p className="user-name">
                                            {user?.name || "User"}
                                        </p>
                                        <p className="user-email">
                                            {user?.email || "-"}
                                        </p>
                                    </div>

                                    <hr />

                                    <button
                                        className="profile-btn"
                                        onClick={() => {
                                            navigate("/profil");
                                            setShowUserMenu(false);
                                        }}
                                    >
                                        Data Pribadi
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
                <h2 className="page-title">Pelatihan Saya</h2>
                <hr />

                {/* TRAINING GRID */}
                <div className="training-grid">
                    {trainings.map((training) => (
                        <div className="training-card" key={training.id}>
                            <img
                                src={training.image}
                                alt={training.title}
                            />

                            <div className="training-content">
                                <h5>{training.title}</h5>

                                <span
                                    className="status-badge"
                                    style={{
                                        backgroundColor: getStatusColor(
                                            training.status
                                        ),
                                    }}
                                >
                                    {training.status}
                                </span>

                                <div className="training-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${training.progress}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="progress-text">
                                        {training.progress}%
                                    </span>
                                </div>

                                <small>
                                    {training.startDate} - {training.endDate}
                                </small>

                                {/* TOMBOL DETAIL (FINAL) */}
                                <button
                                    className="training-btn"
                                    onClick={() =>
                                        navigate("/TrainingDetail", {
                                            state: {
                                                training: {
                                                    name: training.title,
                                                    description:
                                                        "Detail pelatihan belum tersedia.",
                                                    duration: "1 Bulan",
                                                    schedule: "Menyesuaikan",
                                                    cost: "Gratis",
                                                },
                                            },
                                        })
                                    }
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {trainings.length === 0 && (
                    <div className="no-trainings">
                        <h3>Belum ada pelatihan yang didaftarkan</h3>
                        <p>
                            Daftar pelatihan untuk memulai perjalanan belajar
                            Anda!
                        </p>
                        <button
                            className="register-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Jelajahi Pelatihan
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
