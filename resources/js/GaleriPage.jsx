import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic"; 
import Footer from "./components/Footer"; 
import { Calendar, Image as ImageIcon, Search } from "lucide-react";
import "./app.css";

export default function GaleriPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- MOCK DATA ALBUM ---
  const [albums] = useState([
    { id: 1, title: "Web Dev Bootcamp 2026", count: 24, date: "15 Feb 2026", category: "Web Dev", cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&fit=crop" },
    { id: 2, title: "Workshop UI/UX Mobile", count: 12, date: "10 Jan 2026", category: "UI/UX", cover: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&fit=crop" },
    { id: 3, title: "Sertifikasi Cyber Security", count: 40, date: "01 Feb 2026", category: "Security", cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&fit=crop" },
    { id: 4, title: "Seminar Karir IT Nasional", count: 150, date: "20 Des 2025", category: "Seminar", cover: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&fit=crop" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarPublic />
      <main style={{ flex: 1 }}>
        <div className="gallery-header">
          <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px', marginTop: '30px' }}>Galeri Dokumentasi</h1>
          <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
            Kumpulan momen dan kegiatan berharga di Training Center FILKOM.
          </p>
        </div>

        <div className="search-bar-container">
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Cari nama kegiatan atau album..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="album-grid">
          {filteredAlbums.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Album tidak ditemukan.</div>
          ) : (
            filteredAlbums.map((album) => (
              <div key={album.id} className="album-card" onClick={() => navigate(`/galeri/${album.id}`)}>
                <img src={album.cover} alt={album.title} className="album-cover" />
                <div className="album-body">
                  <h3 className="album-title">{album.title}</h3>
                  <div className="album-meta">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ImageIcon size={16}/> {album.count} Foto</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16}/> {album.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}