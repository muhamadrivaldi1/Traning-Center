import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../styles/TrainingDetail.css";
import { FaArrowLeft, FaRegEdit, FaExclamationTriangle } from "react-icons/fa";

export default function TrainingDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const training = location.state?.training;
    const user = JSON.parse(localStorage.getItem("user"));

    if (!training) {
        return (
            <div className="center-fallback enhanced-fallback">
                <div className="fallback-card">
                    <div className="fallback-icon">
                        <FaExclamationTriangle />
                    </div>
                    <h3>
                        Training tidak ditemukan,
                        <br />
                        silahkan mendaftar pelatihan terlebih dahulu.
                    </h3>
                    <Link className="btn-purple btn-back" to="/home">
                        <FaArrowLeft /> Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="training-detail">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container navbar-padding">
                    {/* Brand */}
                    <Link
                        className="navbar-brand d-flex align-items-center gap-3"
                        to="/home"
                    >
                        <img
                            src="/images/unpam (2).png"
                            className="navbar-logo"
                            alt="UNPAM"
                        />
                        <span className="fw-bold">Training Center UNPAM</span>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto gap-4">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#Pelatihan">
                                    Pelatihan
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/berita">
                                    Berita
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/galeri">
                                    Galeri
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-primary" to="/login">
                                    Masuk
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="training-container">
                <div className="training-hero">
                    <div className="hero-content">
                        <h1>{training.name || "(Nama Pelatihan)"}</h1>
                        <p>
                            Pelatihan intensif untuk meningkatkan kompetensi dan
                            kesiapan karier Anda
                        </p>
                    </div>
                </div>

                <div className="training-card">
                    <div className="grid-two">
                        <div>
                            <h3>Deskripsi Program</h3>
                            <p>
                                {training.description ||
                                    "Deskripsi belum tersedia."}
                            </p>
                        </div>
                        <div>
                            <h3>Manfaat</h3>
                            <ul>
                                <li>Sertifikat resmi</li>
                                <li>Instruktur berpengalaman</li>
                                <li>Materi up-to-date</li>
                                <li>Relasi & networking</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid-three">
                        {[
                            {
                                title: "Durasi",
                                value: training.duration || "3 Bulan",
                            },
                            {
                                title: "Jadwal",
                                value: training.schedule || "Setiap Sabtu",
                            },
                            {
                                title: "Biaya",
                                value: training.cost || "Rp 2.500.000",
                            },
                        ].map((item, index) => (
                            <div key={index}>
                                <h4>{item.title}</h4>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {user && (
                        <div className="btn-container">
                            <Link
                                className="btn-purple-large"
                                to="/pembayaran"
                            >
                                <FaRegEdit /> Daftar Sekarang
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}