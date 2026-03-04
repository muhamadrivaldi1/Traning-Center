import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic"; 
import Footer from "./components/Footer"; 
import { Search, Calendar, Users, ArrowRight, Globe, Building } from "lucide-react";
import "../css/app.css";

export default function PelatihanPage() {
  const navigate = useNavigate();

  // Scroll to top saat halaman dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- MOCK DATA PELATIHAN ---
  const [trainings] = useState([
    { 
      id: 1, title: "Web Development Bootcamp 2026", category: "Web Dev", 
      date: "15 Feb - 20 Mar 2026", quota: 30, filled: 12, 
      type: "Berbayar", price: 500000, target: "Umum",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&fit=crop" 
    },
    { 
      id: 2, title: "Fundamental UI/UX Design", category: "Design", 
      date: "10 Jan - 15 Jan 2026", quota: 40, filled: 40, 
      type: "Gratis", price: 0, target: "Internal Kampus",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&fit=crop" 
    },
    { 
      id: 3, title: "Cyber Security: Penetration Testing", category: "Security", 
      date: "01 Mar - 10 Mar 2026", quota: 25, filled: 10, 
      type: "Berbayar", price: 750000, target: "Umum",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&fit=crop" 
    },
    { 
      id: 4, title: "Data Science with Python", category: "Data", 
      date: "20 Apr - 30 Apr 2026", quota: 50, filled: 5, 
      type: "Gratis", price: 0, target: "Umum",
      image: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?w=600&fit=crop" 
    },
  ]);

  // STATE FILTER
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [filterTarget, setFilterTarget] = useState("Semua");

  const filteredTrainings = trainings.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "Semua" || (filterType === "Gratis" && t.price === 0) || (filterType === "Berbayar" && t.price > 0);
    const matchTarget = filterTarget === "Semua" || t.target === filterTarget;
    return matchSearch && matchType && matchTarget;
  });

  return (
    <div className="bg-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarPublic />
      <main style={{ flex: 1 }}>
        {/* 1. HERO SECTION */}
        <div className="hero-training">
          <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px', marginTop: '20px',letterSpacing: '-1px' }}>Program Pelatihan</h1>
          <p style={{ fontSize: '16px', color: '#bfdbfe', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Tingkatkan kompetensi Anda bersama pelatihan resmi dari Training Center Fakultas Ilmu Komputer Universitas Pamulang.
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="filter-bar relative z-10">
          <div style={{ flex: '1 1 250px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}/>
            <input 
              type="text" className="filter-input" placeholder="Cari nama pelatihan..." 
              style={{ width: '100%', paddingLeft: '44px', boxSizing: 'border-box' }}
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select className="filter-input" style={{ flex: '1 1 150px' }} value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="Semua">Semua Harga</option>
            <option value="Gratis">Gratis</option>
            <option value="Berbayar">Berbayar</option>
          </select>
          <select className="filter-input" style={{ flex: '1 1 150px' }} value={filterTarget} onChange={e => setFilterTarget(e.target.value)}>
            <option value="Semua">Semua Jalur</option>
            <option value="Umum">Umum</option>
            <option value="Internal Kampus">Internal Kampus</option>
          </select>
        </div>

        {/* 2. CARD GRID */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>
          
          {filteredTrainings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
              <Search size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }}/>
              <h3>Pelatihan tidak ditemukan</h3>
              <p>Coba gunakan kata kunci atau filter lain.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
              {filteredTrainings.map((t) => (
                <div key={t.id} className="training-card">
                  <div className="card-img-wrapper">
                    <img src={t.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className={`card-badge ${t.target === 'Umum' ? 'badge-umum' : 'badge-internal'}`}>
                      {t.target === 'Umum' ? <Globe size={12}/> : <Building size={12}/>} {t.target}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', marginBottom: '8px', display: 'block' }}>{t.category}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', lineHeight: '1.4' }}>{t.title}</h3>
                    
                    <div style={{ marginBottom: 'auto' }}>
                      <div className="info-row"><Calendar size={16} /> {t.date}</div>
                      <div className="info-row">
                        <Users size={16} /> Kuota: <span style={{ fontWeight: 700, color: t.filled >= t.quota ? '#ef4444' : '#10b981' }}>{t.filled}/{t.quota}</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px dashed #e2e8f0', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className={`price-tag ${t.price === 0 ? 'price-gratis' : 'price-berbayar'}`}>
                        {t.price === 0 ? "Gratis" : `Rp ${(t.price).toLocaleString('id-ID')}`}
                      </div>
                    </div>

                    <button className="btn-detail" onClick={() => navigate(`/pelatihan/${t.id}`)}>
                      Lihat Detail <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}