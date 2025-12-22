import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/app.css";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("bg-light", "bg-dark");
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container navbar-padding">
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <img
                            src="/images/unpam (2).png"
                            className="navbar-logo me-2"
                        />
                        <span className="fw-bold">Training Center UNPAM</span>
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
                        <ul className="navbar-nav ms-auto gap-4">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#">
                                    Profil
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#">
                                    Jadwal
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#">
                                    Berita
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#">
                                    Galeri
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Sistem Training Center Fakultas Ilmu Komputer
                    </h1>
                    <p className="hero-subtitle">
                        Meningkatkan skill, membangun masa depan
                    </p>
                    <button
                        className="hero-btn"
                        onClick={() => navigate("/registrasi")}
                    >
                        Belajar Sekarang
                    </button>
                </div>
            </section>

                        <section className="schedule-section">
                <div className="schedule-header">
                    <h2>Jadwal Pelatihan</h2>

                    <div className="schedule-tabs">
                        <span className="active">Jadwal</span>
                        <span>Event</span>
                        <span>Kegiatan</span>
                        <span>Lainnya</span>
                    </div>
                </div>

                <div className="schedule-grid">
                    <div className="schedule-card">
                        <img src="/images/jadwal1.jpg" alt="" />
                        <h4>Web Development</h4>
                        <p>Belajar membangun website modern.</p>
                        <button>Detail</button>
                    </div>

                    <div className="schedule-card">
                        <img src="/images/jadwal2.jpg" alt="" />
                        <h4>UI / UX Design</h4>
                        <p>Desain antarmuka yang efektif.</p>
                        <button>Detail</button>
                    </div>

                    <div className="schedule-card">
                        <img src="/images/jadwal3.jpg" alt="" />
                        <h4>Cyber Security</h4>
                        <p>Keamanan sistem & jaringan.</p>
                        <button>Detail</button>
                    </div>

                    <div className="schedule-card">
                        <img src="/images/jadwal4.jpg" alt="" />
                        <h4>Data Science</h4>
                        <p>Pengolahan data & analisis.</p>
                        <button>Detail</button>
                    </div>

                    <div className="schedule-card">
                        <img src="/images/jadwal5.jpg" alt="" />
                        <h4>Mobile Development</h4>
                        <p>Aplikasi Android & iOS.</p>
                        <button>Detail</button>
                    </div>

                    <div className="schedule-card">
                        <img src="/images/jadwal6.jpg" alt="" />
                        <h4>Artificial Intelligence</h4>
                        <p>Pengenalan AI dasar.</p>
                        <button>Detail</button>
                    </div>
                </div>
            </section>
            <section className="news-section">
    <div className="news-header">
        <h2>Berita & Informasi</h2>
        <p>Update terbaru seputar Training Center FIKOM UNPAM</p>
    </div>

    <div className="news-grid">
        <div className="news-card">
            <img src="/images/berita1.jpg" alt="Berita 1" />
            <h4>Pembukaan Pelatihan Web Development</h4>
            <p>
                Training Center resmi membuka pelatihan Web Development
                untuk mahasiswa Fakultas Ilmu Komputer.
            </p>
            <button>Detail</button>
        </div>

        <div className="news-card">
            <img src="/images/berita2.jpg" alt="Berita 2" />
            <h4>Workshop Cyber Security</h4>
            <p>
                Workshop keamanan sistem dan jaringan dengan mentor
                profesional dari industri.
            </p>
            <button>Detail</button>
        </div>

        <div className="news-card">
            <img src="/images/berita3.jpg" alt="Berita 3" />
            <h4>Pelatihan UI/UX Design</h4>
            <p>
                Meningkatkan kemampuan desain antarmuka dan pengalaman
                pengguna.
            </p>
            <button>Detail</button>
        </div>

        <div className="news-card">
            <img src="/images/berita4.jpg" alt="Berita 4" />
            <h4>Seminar Artificial Intelligence</h4>
            <p>
                Seminar pengenalan AI dan penerapannya di dunia industri
                modern.
            </p>
            <button>Detail</button>
        </div>
    </div>
</section>

        </div>

        
    );
}

export default HomePage;
