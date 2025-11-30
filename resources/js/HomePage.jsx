import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

// Komponen Card Program (ditempatkan di luar atau diimpor jika file terpisah)
const ProgramCard = ({ title, icon, description, link, theme }) => (
    <div 
        className={`card shadow-sm h-100 ${
            theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white"
        }`}
    >
        <div className="card-body text-center">
            <i className={`bi bi-${icon} display-5 mb-3 text-primary`}></i>
            <h4 className="card-title fw-bold">{title}</h4>
            <p className="card-text text-muted">{description}</p>
            <button 
                onClick={() => window.location.href=link}
                className="btn btn-sm btn-outline-primary mt-2"
            >
                Lihat Detail
            </button>
        </div>
    </div>
);

function HomePage() {
    const [theme, setTheme] = useState("light"); 
    const navigate = useNavigate();

    // Data Program Unggulan sesuai Proposal FILKOM
    const featuredPrograms = [
        { id: 1, title: 'Rekayasa Perangkat Lunak', icon: 'code-slash', desc: 'Fokus pada pengembangan aplikasi dan pemrograman modern.', link: '/program/ti' },
        { id: 
            2, title: 'Analisis Bisnis & SI', icon: 'bar-chart-fill', desc: 'Membangun kemampuan analitis berbasis teknologi untuk bisnis modern.', link: '/program/si' },
        { id: 3, title: 'Keamanan Siber', icon: 'shield-lock-fill', desc: 'Pelatihan spesifik untuk mengamankan jaringan dan sistem informasi.', link: '/program/keamanan' },
    ];


    useEffect(() => {
        // Efek untuk mengubah tema pada <body>
        if (theme === "dark") {
            document.body.classList.add("bg-dark", "text-white");
            document.body.classList.remove("bg-light", "text-dark");
        } else {
            document.body.classList.add("bg-light", "text-dark");
            document.body.classList.remove("bg-dark", "text-white");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleLogout = () => {
        // logic logout
        navigate("/login"); 
    };

    return (
        <div>
            <nav
                className={`navbar navbar-expand-lg ${
                    theme === "dark" ? "navbar-dark bg-dark" : "navbar-dark bg-primary"
                } px-4 shadow-sm`}
            >
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-white" href="/">
                        FILKOM Training Center
                    </a>

                    {/* Navigasi Utama */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/program">Program</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/jadwal">Jadwal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/tentang">Tentang Kami</a>
                            </li>
                        </ul>
                    </div>

                    {/* User Menu & Theme Toggle */}
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center"
                                    href="#"
                                    id="userMenu"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle fs-5 me-2"></i>
                                    <span className="text-white">Akun</span>
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="userMenu"
                                >
                                    <li>
                                        <button className="dropdown-item" onClick={toggleTheme}>
                                            Mode {theme === "light" ? "Gelap" : "Terang"}
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section className="text-center py-5 hero-bg"> 
                <div className="container py-5">
                    <h1 className={`display-4 fw-bolder mb-3 ${theme === "dark" ? "text-warning" : "text-white"}`}>
                        Upgrade Kompetensimu. Dapatkan Sertifikasi Resmi.
                    </h1>
                    <p className={`lead mb-4 ${theme === "dark" ? "text-light" : "text-white"}`}>
                        Platform pelatihan terpusat untuk mahasiswa **Teknik Informatika** & **Sistem Informasi**, siap bersaing di dunia profesional.
                    </p>
                    
                    <button 
                        onClick={() => navigate("/jadwal")} 
                        className="btn btn-warning btn-lg me-3 fw-bold"
                    >
                        LIHAT JADWAL PELATIHAN 📅
                    </button>
                    
                    <button 
                        onClick={() => navigate("/registrasi")} 
                        className={`btn btn-outline-${theme === 'dark' ? 'warning' : 'light'} btn-lg`}
                    >
                        Daftar Sekarang
                    </button>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h2 className={`text-center fw-bold mb-5 ${theme === "dark" ? "text-white" : "text-primary"}`}>
                        Program Unggulan TI & SI
                    </h2>
                    <div className="row g-4">
                        {featuredPrograms.map(program => (
                            <div key={program.id} className="col-md-4">
                                <ProgramCard {...program} theme={theme} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <footer className={`mt-5 py-3 ${theme === "dark" ? "bg-dark text-light border-top border-secondary" : "bg-light text-dark border-top"}`}>
                <div className="container text-center">
                    <p className="mb-1">&copy; {new Date().getFullYear()} FILKOM Training Center UNPAM. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default HomePage;