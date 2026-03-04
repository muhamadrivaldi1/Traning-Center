import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic";
import Footer from "./components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../css/app.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex < 2) setStartIndex(startIndex + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const trainings = [
    { image: "Web Development.jpeg", title: "Web Development", description: "Belajar membangun website modern dengan teknologi terkini seperti HTML, CSS, JavaScript, dan framework populer." },
    { image: "UI UX.jpeg", title: "UI / UX Design", description: "Desain antarmuka yang efektif dan pengalaman pengguna yang menarik menggunakan tools desain profesional." },
    { image: "Cyber.jpeg", title: "Cyber Security", description: "Pelajari teknik keamanan sistem dan jaringan untuk melindungi data dan infrastruktur digital." },
    { image: "Data.jpeg", title: "Data Science", description: "Teknik pengolahan data dan analisis menggunakan Python, R, dan machine learning algorithms." },
    { image: "Mobile App.jpeg", title: "Mobile Development", description: "Pengembangan aplikasi mobile untuk platform Android dan iOS dengan React Native dan Flutter." },
    { image: "AI.jpeg", title: "Artificial Intelligence", description: "Pengenalan konsep AI, machine learning, dan deep learning untuk aplikasi praktis." }
  ];

  useEffect(() => {
    document.body.classList.remove("bg-light", "bg-dark");
  }, []);

  return (
    <>
      <NavbarPublic />
      <div className="bg-public">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <span className="hero-badge">Pusat Pelatihan IT Resmi</span>
            <h1 className="hero-title">
              Sistem Training Center <br /> Fakultas Ilmu Komputer
            </h1>
            <p className="hero-subtitle">
              Meningkatkan skill dan membangun masa depan cerah bersama kami melalui program pelatihan intensif berstandar industri.
            </p>
            <div className="hero-actions">
              <button className="btn-hero-primary" onClick={() => navigate('/pelatihan')}>
                Jelajahi Pelatihan
              </button>
              <button className="btn-hero-outline" onClick={() => navigate('/register')}>
                Daftar Sekarang
              </button>
            </div>
          </div>
        </section>

        {/* Pelatihan Section */}
        <section id="jadwal" className="schedule-section">
          <div className="schedule-header">
            <h2>Pelatihan</h2>
            <p>Detail Pelatihan Training Center FILKOM yang tersedia</p>
          </div>
          <div className="carousel-wrapper">
            <button 
              className="chevron-btn left" 
              onClick={handlePrev}
              disabled={startIndex === 0}
              style={{ opacity: startIndex === 0 ? 0.3 : 1, cursor: startIndex === 0 ? "default" : "pointer" }}
            >
              <ChevronLeft size={24} />
            </button>
            <div className="schedule-grid">
              {trainings.slice(startIndex, startIndex + 4).map((training, index) => (
                <div className="schedule-card" key={index}>
                  <img src={`/images/${training.image}`} alt={training.title} />
                  <h4>{training.title}</h4>
                  <p>{training.description}</p>
                  <button onClick={() => navigate("/pelatihan", { state: { training } })}>Detail</button>
                </div>
              ))}
            </div>
            <button 
              className="chevron-btn right" 
              onClick={handleNext}
              disabled={startIndex === 2}
              style={{ opacity: startIndex === 2 ? 0.3 : 1, cursor: startIndex === 2 ? "default" : "pointer" }}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* Berita Section */}
        <section id="berita" className="news-section">
          <div className="news-header">
            <h2>Berita & Informasi</h2>
            <p>Update terbaru seputar Training Center FIKOM UNPAM</p>
          </div>

          <div className="news-grid">
            {[
              ["timage.jpg", "Pembukaan Pelatihan Web Development"],
              ["timage.jpg", "Workshop Cyber Security"],
              ["timage.jpg", "Pelatihan UI / UX Design"],
              ["timage.jpg", "Seminar Artificial Intelligence"]
            ].map((item, index) => (
              <div className="news-card" key={index}>
                <img src={`/images/${item[0]}`} alt={item[1]} />
                <h4>{item[1]}</h4>
                <p>Kegiatan resmi Training Center Fakultas Ilmu Komputer untuk meningkatkan kompetensi mahasiswa.</p>
                <button 
                  onClick={() => navigate('/berita', { 
                    state: { 
                      image: item[0], 
                      title: item[1] 
                    } 
                  })}
                >
                  Detail
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Galeri Section */}
        <section id="galeri" className="gallery-section">
          <div className="news-header">
            <h2>Galeri</h2>
            <p>Update dokumentasi kegiatan Training Center FIKOM UNPAM</p>
          </div>

          <div className="gallery-wrapper">
            <div className="gallery-track">
              {["timage.jpg", "timage.jpg", "timage.jpg", "timage.jpg", "timage.jpg", "timage.jpg"].map((img, index) => (
                <div className="gallery-item" key={index}><img src={`/images/${img}`} alt="Galeri" /></div>
              ))}
              {/* Duplikat untuk looping */}
              {["timage.jpg", "timage.jpg", "timage.jpg", "timage.jpg", "timage.jpg", "timage.jpg"].map((img, index) => (
                <div className="gallery-item" key={`dup-${index}`}><img src={`/images/${img}`} alt="Galeri" /></div>
              ))}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}