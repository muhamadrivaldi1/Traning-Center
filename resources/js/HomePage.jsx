import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/app.css";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.remove("bg-light", "bg-dark");
    }, []);

    return (
        <div>
            {/* ================= NAVBAR ================= */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container navbar-padding">
                    <a className="navbar-brand d-flex align-items-center" href="#home">
                        <img
                            src="/images/unpam (2).png"
                            className="navbar-logo me-2"
                            alt="UNPAM"
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
                            <li className="nav-item">
                                <a className="nav-link" href="#home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#jadwal">Jadwal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#berita">Berita</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#galeri">Galeri</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* ================= HERO ================= */}
            <section id="home" className="hero-section">
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

            {/* ================= SCHEDULE ================= */}
            <section id="jadwal" className="schedule-section">
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
                    {[
                        ["jadwal1.jpg", "Web Development", "Belajar membangun website modern."],
                        ["jadwal2.jpg", "UI / UX Design", "Desain antarmuka yang efektif."],
                        ["jadwal3.jpg", "Cyber Security", "Keamanan sistem & jaringan."],
                        ["jadwal4.jpg", "Data Science", "Pengolahan data & analisis."],
                        ["jadwal5.jpg", "Mobile Development", "Aplikasi Android & iOS."],
                        ["jadwal6.jpg", "Artificial Intelligence", "Pengenalan AI dasar."]
                    ].map((item, index) => (
                        <div className="schedule-card" key={index}>
                            <img src={`/images/${item[0]}`} alt={item[1]} />
                            <h4>{item[1]}</h4>
                            <p>{item[2]}</p>
                            <button>Detail</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= NEWS ================= */}
            <section id="berita" className="news-section">
                <div className="news-header">
                    <h2>Berita & Informasi</h2>
                    <p>Update terbaru seputar Training Center FIKOM UNPAM</p>
                </div>

                <div className="news-grid">
                    {[
                        ["berita1.jpg", "Pembukaan Pelatihan Web Development"],
                        ["berita2.jpg", "Workshop Cyber Security"],
                        ["berita3.jpg", "Pelatihan UI / UX Design"],
                        ["berita4.jpg", "Seminar Artificial Intelligence"]
                    ].map((item, index) => (
                        <div className="news-card" key={index}>
                            <img src={`/images/${item[0]}`} alt={item[1]} />
                            <h4>{item[1]}</h4>
                            <p>
                                Kegiatan resmi Training Center Fakultas Ilmu Komputer
                                untuk meningkatkan kompetensi mahasiswa.
                            </p>
                            <button>Detail</button>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default HomePage;
