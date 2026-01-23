import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../../styles/TrainingDetail.css";
import { FaArrowLeft, FaRegEdit, FaExclamationTriangle } from "react-icons/fa";

export default function TrainingDetail() {
  const location = useLocation();
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
      {!user && (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
          <div className="container navbar-padding">
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
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-4">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home#pelatihan">Pelatihan</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home#berita">Berita</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home#galeri">Galeri</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/login">Masuk</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <div className="training-container">
        <div className="training-hero">
          <div className="hero-content">
            <h1>{training.name || "(Nama Pelatihan)"}</h1>
            <p>
              Pelatihan intensif untuk meningkatkan kompetensi dan kesiapan karier Anda
            </p>
          </div>
        </div>

        <div className="training-card">
          <div className="grid-two">
            <div>
              <h3>Deskripsi Program</h3>
              <p>{training.description || "Deskripsi belum tersedia."}</p>
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
            <div>
              <h4>Durasi</h4>
              <p>{training.duration || "3 Bulan"}</p>
            </div>
            <div>
              <h4>Jadwal</h4>
              <p>{training.schedule || "Setiap Sabtu"}</p>
            </div>
            <div>
              <h4>Biaya</h4>
              <p>{training.cost || "Rp 2.500.000"}</p>
            </div>
          </div>

          {user && (
            <div className="btn-container">
              <Link className="btn-purple-large" to="/pembayaran">
                <FaRegEdit /> Daftar Sekarang
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
