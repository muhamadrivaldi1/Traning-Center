import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

export default function PendaftaranPelatihan() {
    const location = useLocation();
    const navigate = useNavigate();

    // STATE
    const [user, setUser] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // ===============================
    // Ambil user dari localStorage & theme
    // ===============================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed && parsed.id) {
                    setUser(parsed);
                } else {
                    navigate("/login", {
                        state: { redirectTo: "/pendaftaran-pelatihan" },
                    });
                }
            } catch (e) {
                console.error("Error parsing user:", e);
                navigate("/login", {
                    state: { redirectTo: "/pendaftaran-pelatihan" },
                });
            }
        } else {
            navigate("/login", {
                state: { redirectTo: "/pendaftaran-pelatihan" },
            });
        }

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.body.classList.add("dark-theme");
        }

        return () => {
            document.body.classList.remove("dark-theme");
        };
    }, [navigate]);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        document.body.classList.toggle("dark-theme", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // ===============================
    // Ambil data pelatihan
    // ===============================
    const [selectedTraining, setSelectedTraining] = useState(
        location.state?.training?.name || ""
    );

    const [trainingsList] = useState([
        { id: 1, name: "Pelatihan Web Development" },
        { id: 2, name: "UI / UX Design" },
        { id: 3, name: "Cyber Security" },
        { id: 4, name: "Data Science" },
        { id: 5, name: "Mobile Development" },
        { id: 6, name: "Artificial Intelligence" },
    ]);

    // Form state
    const [formData, setFormData] = useState({
        nama: user?.name || "",
        nim: "",
        email: user?.email || "",
        phone: "",
        fakultas: "",
        alamat: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTraining) {
            alert("Silahkan pilih pelatihan terlebih dahulu");
            return;
        }

        // Simulasi pengiriman data
        console.log("Data Pendaftaran:", {
            ...formData,
            pelatihan: selectedTraining,
        });

        alert(`Pendaftaran berhasil untuk ${selectedTraining}!`);
        navigate("/dashboard");
    };

    if (!user) return null;

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} />

            <div className={`main-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
                {/* TOPBAR */}
                <div className="topbar">
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
                                        <p className="user-name">{user?.name || "User"}</p>
                                        <p className="user-email">{user?.email || "-"}</p>
                                    </div>
                                    <hr />
                                    <button
                                        className="profile-btn"
                                        onClick={() => navigate("/profil")}
                                    >
                                        Data Pribadi
                                    </button>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body p-4 p-md-5">
                                    {/* TITLE */}
                                    <h3 className="text-center fw-bold text-primary mb-4">
                                        Pendaftaran Pelatihan
                                    </h3>

                                    {/* FORM */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Nama Lengkap</label>
                                                <input
                                                    type="text"
                                                    name="nama"
                                                    className="form-control"
                                                    value={formData.nama}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">NIM</label>
                                                <input
                                                    type="text"
                                                    name="nim"
                                                    className="form-control"
                                                    value={formData.nim}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">No. Handphone</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Fakultas</label>
                                                <input
                                                    type="text"
                                                    name="fakultas"
                                                    className="form-control"
                                                    value={formData.fakultas}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            {/* SELECT TRAINING */}
                                            <div className="col-md-6">
                                                <label className="form-label">Pelatihan</label>
                                                <select
                                                    className="form-select"
                                                    value={selectedTraining}
                                                    onChange={(e) => setSelectedTraining(e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Pilih pelatihan
                                                    </option>
                                                    {trainingsList.map((t) => (
                                                        <option key={t.id} value={t.name}>
                                                            {t.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Alamat</label>
                                                <textarea
                                                    name="alamat"
                                                    className="form-control"
                                                    rows="4"
                                                    value={formData.alamat}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            <div className="col-12 text-center mt-4">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary px-5 py-2 me-3"
                                                >
                                                    Daftar Sekarang
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary px-5 py-2"
                                                    onClick={() => navigate("/dashboard")}
                                                >
                                                    <FaArrowLeft /> Kembali
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}