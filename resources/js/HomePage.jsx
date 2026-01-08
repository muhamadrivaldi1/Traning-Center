import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "../css/app.css";


function HomePage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove("bg-light", "bg-dark");
  }, []);

  return (
    <div>

      {/* NAVBAR ATAS */}
      <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom ${isOpen ? "sidebar-open" : ""}`}>
        <div className="container navbar-padding">
          <div className="navbar-brand d-flex align-items-center gap-3">
            <span className="menu-icon" onClick={() => setIsOpen(!isOpen)}>&#9776;</span>

            <img
              src="/images/unpam (2).png"
              className="navbar-logo"
              alt="UNPAM"
            />
            <span className="fw-bold">Training Center UNPAM</span>
          </div>

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

      {/* SIDEBAR */}
      <Sidebar isOpen={isOpen} />

      {/* MAIN CONTENT */}
      <div className={isOpen ? "sidebar-open" : ""}>

      {/* HERO */}
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
            onClick={() => {
              const jadwalSection = document.getElementById('jadwal');
              if (jadwalSection) {
                jadwalSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
            Belajar Sekarang
          </button>
        </div>
      </section>

      <div className="section-rectangle"></div>

      {/* JADWAL */}
      <section id="jadwal" className="schedule-section">
        <div className="schedule-header">
          <h2>Jadwal Pelatihan</h2>

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

      <div className="section-rectangle"></div>

      {/* BERITA */}
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

      <div className="section-rectangle"></div>

      {/* GALERI */}
      <section id="galeri" className="gallery-section">
        <div className="news-header">
          <h2>Galeri</h2>
          <p>Update dokumentasi kegiatan Training Center FIKOM UNPAM</p>
        </div>

        <div className="gallery-scroll">
          {[
            "berita1.jpg",
            "berita2.jpg",
            "berita3.jpg",
            "berita4.jpg",
            "berita1.jpg",
            "berita2.jpg"
          ].map((img, index) => (
            <div className="gallery-item" key={index}>
              <img src={`/images/${img}`} alt="Galeri" />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-header">
            <img
              src="/images/unpam (2).png"
              alt="Logo UNPAM"
              className="footer-logo"
            />
            <h3>Training Center Fakultas - Universitas Pamulang</h3>
          </div>

          <div className="footer-content">
            <div className="footer-item">
              <h4>Kampus Pusat</h4>
              <p>
                Jl. Surya Kencana No.1, Pamulang Barat,
                Tangerang Selatan, Banten 15417
              </p>
            </div>

            <div className="footer-item">
              <h4>Kampus Viktor</h4>
              <p>
                Jl. Raya Puspiptek, Buaran,
                Tangerang Selatan, Banten 15310
              </p>
            </div>

            <div className="footer-item">
              <h4>Kampus Witana Harja</h4>
              <p>
                Jl. Witana Harja No.18b,
                Tangerang Selatan, Banten 15417
              </p>
            </div>

            <div className="footer-item">
              <h4>Kampus Serang</h4>
              <p>
                Jl. Lintas Serang – Jakarta,
                Kota Serang, Banten 42183
              </p>
            </div>

            <p className="footer-email">E-mail: humas@unpam.ac.id</p>
          </div>
        </div>

        <div className="footer-bottom">
          © Training Center Fakultas Ilmu Komputer – All Rights Reserved.
        </div>
      </footer>

      </div> {/* END MAIN CONTENT */}

    </div>
  );
}

export default HomePage;
