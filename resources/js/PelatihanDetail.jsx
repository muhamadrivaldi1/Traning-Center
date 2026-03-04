import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic"; 
import Footer from "./components/Footer"; 
import { Calendar, Users, Globe, Building, CheckCircle, Clock, MapPin, Award } from "lucide-react";

export default function PelatihanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);

  // Mockup Data (Biasanya fetch dari API menggunakan id)
  const training = { 
    id: id, title: "Web Development Bootcamp 2026", category: "Web Dev", 
    date: "15 Feb - 20 Mar 2026", schedule: "Sabtu & Minggu, 09:00 - 15:00 WIB",
    location: "Kampus Viktor UNPAM / Online via Zoom",
    quota: 30, filled: 12, type: "Berbayar", price: 500000, target: "Umum",
    organizer: "Training Center FILKOM",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&fit=crop",
    desc: "Bootcamp intensif selama 1 bulan untuk menguasai pengembangan web modern dari nol hingga mahir. Anda akan belajar HTML, CSS, JavaScript, React JS, hingga backend menggunakan Node.js.",
    learnings: ["Fundamental HTML, CSS, JS", "State Management di React", "Pembuatan REST API", "Deployment ke Server"],
    requirements: ["Laptop dengan RAM minimal 4GB", "Koneksi internet stabil", "Niat belajar yang tinggi"],
    benefits: ["Sertifikat Kelulusan Resmi", "Portfolio Project", "Grup Diskusi Alumni", "Materi & Rekaman Selamanya"]
  };

  const handleRegister = () => {
    // Mengecek apakah ada data user di localStorage
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Anda harus login terlebih dahulu untuk mendaftar pelatihan!");
      navigate("/login");
    } else {
      alert("Lanjut ke halaman form pendaftaran / konfirmasi pembayaran.");
    }
  };

  return (
    <div className="bg-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarPublic />
      <main style={{ flex: 1 }}>
        {/* BANNER BESAR */}
        <div className="banner-detail">
          <img src={training.image} alt="Banner" className="banner-img" />
          <div className="banner-overlay">
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
              <span style={{ background: '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{training.category}</span>
              <h1 style={{ fontSize: '42px', fontWeight: 900, color: 'white', marginTop: '16px', lineHeight: '1.2', maxWidth: '800px' }}>{training.title}</h1>
            </div>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="content-grid">
          
          {/* KOLOM KIRI (DESKRIPSI) */}
          <div className="main-content-box">
            <h2 className="section-title">Deskripsi Pelatihan</h2>
            <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '15px' }}>{training.desc}</p>

            <h2 className="section-title">Apa yang akan dipelajari?</h2>
            <div>
              {training.learnings.map((item, i) => (
                <div key={i} className="list-item"><CheckCircle size={20} className="text-blue-500 shrink-0"/> {item}</div>
              ))}
            </div>

            <h2 className="section-title">Persyaratan Peserta</h2>
            <div>
              {training.requirements.map((item, i) => (
                <div key={i} className="list-item"><CheckCircle size={20} className="text-amber-500 shrink-0"/> {item}</div>
              ))}
            </div>

            <h2 className="section-title">Fasilitas & Benefit</h2>
            <div>
              {training.benefits.map((item, i) => (
                <div key={i} className="list-item"><Award size={20} className="text-green-500 shrink-0"/> {item}</div>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN (ACTION & RINGKASAN INFO) */}
          <div>
            <div className="sidebar-sticky">
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Biaya Pendaftaran</span>
                <div style={{ fontSize: '32px', fontWeight: 900, color: training.price === 0 ? '#10b981' : '#0f172a', marginTop: '4px' }}>
                  {training.price === 0 ? "Gratis" : `Rp ${(training.price).toLocaleString('id-ID')}`}
                </div>
              </div>

              <div className="sidebar-info-row"><Calendar size={20} className="text-gray-400 shrink-0"/> <span>{training.date}</span></div>
              <div className="sidebar-info-row"><Clock size={20} className="text-gray-400 shrink-0"/> <span>{training.schedule}</span></div>
              <div className="sidebar-info-row"><MapPin size={20} className="text-gray-400 shrink-0"/> <span>{training.location}</span></div>
              
              <div className="sidebar-info-row" style={{ marginTop: '24px' }}>
                <Users size={20} className="text-gray-400 shrink-0"/> 
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                    <span>Sisa Kuota</span>
                    <span style={{ fontWeight: 700 }}>{training.quota - training.filled} kursi</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(training.filled / training.quota) * 100}%`, height: '100%', background: '#3b82f6' }}></div>
                  </div>
                </div>
              </div>

              <div className="sidebar-info-row" style={{ marginTop: '16px' }}>
                {training.target === 'Umum' ? <Globe size={20} className="text-blue-500 shrink-0"/> : <Building size={20} className="text-amber-500 shrink-0"/>}
                <span style={{ fontWeight: 700, color: '#1e293b' }}>Terbuka untuk {training.target}</span>
              </div>

              <button className="btn-daftar" onClick={handleRegister}>
                Daftar Sekarang
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
                Diselenggarakan oleh:<br/><strong style={{ color: '#475569' }}>{training.organizer}</strong>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}