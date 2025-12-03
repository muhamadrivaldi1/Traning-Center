import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

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
                onClick={() => window.location.href = link}
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

    const featuredPrograms = [
        { id: 1, title: 'Rekayasa Perangkat Lunak', icon: 'code-slash', desc: 'Fokus pada pengembangan aplikasi dan pemrograman modern.', link: '/program/ti' },
        { id: 2, title: 'Analisis Bisnis & SI', icon: 'bar-chart-fill', desc: 'Membangun kemampuan analitis berbasis teknologi untuk bisnis modern.', link: '/program/si' },
        { id: 3, title: 'Keamanan Siber', icon: 'shield-lock-fill', desc: 'Pelatihan spesifik untuk mengamankan jaringan dan sistem informasi.', link: '/program/keamanan' },
    ];

    useEffect(() => {
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
        navigate("/login"); 
    };

    return (
        <div>  
            <nav
                className={`navbar navbar-expand-lg ${
                    theme === "dark" ? "navbar-dark bg-transparent" : "navbar-dark bg-primary"
                } px-4 shadow-sm`}
            >
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold text-white" href="/">
                        <img
                            src="/images/unpam (2).png"
                            className="me-3 navbar-logo"
                            width="40"
                        />
                        Training Center UNPAM
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white fw-semibold" href="/profil">Profil</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white fw-semibold" href="/jadwal">Jadwal</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white fw-semibold" href="/informasi">Informasi</a>
                            </li>
                            <li className="nav-item mx-3">
                                <a className="nav-link text-white fw-semibold" href="/galeri">Galeri</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            {/* ---------------- HERO SECTION ---------------- */}
            <section className="text-center py-5 hero-bg">
                <div className="container py-5">
                    <h1 className={`display-4 fw-bolder mb-3 ${
                        theme === "dark" ? "text-warning" : "text-white"
                    }`}>
                        Upgrade Kompetensimu. Dapatkan Sertifikasi Resmi.
                    </h1>

                    <p className={`lead mb-4 ${
                        theme === "dark" ? "text-light" : "text-white"
                    }`}>
                        Platform pelatihan terpusat untuk mahasiswa Teknik Informatika & Sistem Informasi,
                        siap bersaing di dunia profesional.
                    </p>
                    
                    <button 
                        onClick={() => navigate("/jadwal")} 
                        className="btn btn-warning btn-lg me-3 fw-bold"
                    >
                        LIHAT JADWAL PELATIHAN 📅
                    </button>
                    
                    <button 
                        onClick={() => navigate("/registrasi")} 
                        className={`btn btn-outline-${
                            theme === 'dark' ? 'warning' : 'light'
                        } btn-lg`}
                    >
                        Daftar Sekarang
                    </button>
                </div>
            </section>


            {/* ---------------- PROGRAM SECTION ---------------- */}
            <section className="py-5">
                <div className="container">
                    <h2 className={`text-center fw-bold mb-5 ${
                        theme === "dark" ? "text-white" : "text-primary"
                    }`}>
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


            {/* ---------------- FOOTER ---------------- */}
            <footer className={`mt-5 py-3 ${
                theme === "dark" ? "bg-dark text-light border-top border-secondary" 
                                  : "bg-light text-dark border-top"
            }`}>
                <div className="container text-center">
                    <p className="mb-1">
                        © {new Date().getFullYear()} FILKOM Training Center UNPAM. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
    );
}

export default HomePage;
