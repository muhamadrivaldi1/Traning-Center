import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic"; 
import Footer from "./components/Footer"; 
import { ArrowLeft, ZoomIn, X, Calendar, Image as ImageIcon } from "lucide-react";
import "./app.css";

export default function GaleriDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);

  // Mockup Data Album (Biasanya di-fetch berdasarkan ID)
  const albumInfo = { 
    id: id, title: "Web Dev Bootcamp 2026", 
    date: "15 Februari 2026", count: 8,
    desc: "Dokumentasi kegiatan bootcamp pengembangan web modern yang diikuti oleh 30 peserta."
  };

  // Mockup Daftar Foto di dalam Album
  const photos = [
    { id: 101, url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200" },
    { id: 102, url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200" },
    { id: 103, url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200" },
    { id: 104, url: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200" },
    { id: 105, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200" },
    { id: 106, url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200" },
    { id: 107, url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200" },
    { id: 108, url: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=1200" }
  ];

  // State untuk fitur Lightbox (Zoom gambar)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Kunci scroll window saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? 'hidden' : 'unset';
  }, [selectedPhoto]);

  return (
    <div className="bg-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarPublic />
      <main style={{ flex: 1 }}>
        {/* HEADER ALBUM */}
        <div className="album-header-box">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button 
              onClick={() => navigate('/galeri')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', fontWeight: 700, cursor: 'pointer', marginBottom: '24px', padding: 0 }}
            >
              <ArrowLeft size={16}/> Kembali ke Daftar Album
            </button>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>{albumInfo.title}</h1>
            <p style={{ fontSize: '15px', color: '#475569', maxWidth: '800px', marginBottom: '20px', lineHeight: '1.6' }}>{albumInfo.desc}</p>
            <div style={{ display: 'flex', gap: '20px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={18}/> {albumInfo.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ImageIcon size={18}/> {albumInfo.count} Foto Terlampir</span>
            </div>
          </div>
        </div>

        {/* GRID FOTO */}
        <div className="photo-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card" onClick={() => setSelectedPhoto(photo.url)}>
              <img src={photo.url} alt="Gallery item" className="photo-img" loading="lazy" />
              <div className="photo-overlay">
                <ZoomIn size={36} />
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div className="lightbox-bg" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            <X size={28} />
          </button>
          <img src={selectedPhoto} alt="Zoomed View" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}