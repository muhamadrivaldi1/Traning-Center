import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic"; 
import Footer from "./components/Footer"; 
import { Calendar, User, ArrowRight } from "lucide-react";
import "./app.css";

export default function BeritaPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- MOCK DATA BERITA ---
  const [news] = useState([
    {
      id: 1, title: "Pendaftaran Bootcamp Web Dev 2026 Resmi Dibuka", 
      category: "Pengumuman", date: "12 Feb 2026", author: "Admin TCF",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&fit=crop",
      excerpt: "Training Center FILKOM kembali mengadakan bootcamp intensif selama satu bulan. Tersedia kuota terbatas, segera daftarkan dirimu dan tingkatkan skill programming-mu ke level industri!"
    },
    {
      id: 2, title: "5 Tips Lulus Sertifikasi Cyber Security", 
      category: "Tips & Trik", date: "05 Feb 2026", author: "Budi Santoso",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&fit=crop",
      excerpt: "Sertifikasi cyber security membutuhkan persiapan matang. Berikut adalah 5 tips jitu untuk lulus di percobaan pertama."
    },
    {
      id: 3, title: "Workshop UI/UX Design Bersama Expert", 
      category: "Event", date: "28 Jan 2026", author: "Humas FILKOM",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&fit=crop",
      excerpt: "Intip keseruan workshop UI/UX minggu lalu yang dihadiri oleh ratusan mahasiswa dengan pemateri langsung dari startup unicorn."
    },
    {
      id: 4, title: "Tren Data Science di Tahun 2026", 
      category: "Artikel", date: "15 Jan 2026", author: "Dr. Anton",
      image: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?w=600&fit=crop",
      excerpt: "Bagaimana perkembangan AI dan Machine Learning mengubah lanskap karir seorang Data Scientist? Simak ulasan pakar berikut ini."
    }
  ]);

  const [activeFilter, setActiveFilter] = useState("Semua");
  const categories = ["Semua", "Pengumuman", "Event", "Tips & Trik", "Artikel"];

  const filteredNews = activeFilter === "Semua" ? news : news.filter(n => n.category === activeFilter);
  
  // Pisahkan berita pertama untuk dijadikan Headline
  const featuredNews = filteredNews[0]; 
  const gridNews = filteredNews.slice(1);

  return (
    <div className="bg-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <NavbarPublic />

      <main style={{ flex: 1 }}>
        <div className="news-header-bg">
          <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px', marginTop: '30px' }}>Kabar Terkini</h1>
          <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
            Informasi terbaru seputar kegiatan, artikel, dan pengumuman dari Training Center FILKOM.
          </p>
        </div>

        {/* Kategori Filter */}
        <div className="filter-tags">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`tag-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>
          
          {filteredNews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
              <h3>Belum ada berita di kategori ini.</h3>
            </div>
          ) : (
            <>
              {/* FEATURED NEWS (Berita Paling Atas) */}
              {featuredNews && (
                <div className="featured-card" onClick={() => navigate(`/berita/${featuredNews.id}`)}>
                  <img src={featuredNews.image} alt={featuredNews.title} className="featured-img" />
                  <div className="featured-body">
                    <div><span className="category-badge">{featuredNews.category}</span></div>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', lineHeight: '1.3' }}>
                      {featuredNews.title}
                    </h2>
                    <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
                      {featuredNews.excerpt}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                      <span className="meta-text"><Calendar size={14}/> {featuredNews.date}</span>
                      <span className="meta-text"><User size={14}/> {featuredNews.author}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* GRID BERITA LAINNYA */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
                {gridNews.map((n) => (
                  <div key={n.id} className="news-card" onClick={() => navigate(`/berita/${n.id}`)}>
                    <img src={n.image} alt={n.title} className="news-img" />
                    <div className="news-body">
                      <div><span className="category-badge">{n.category}</span></div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', lineHeight: '1.4' }}>
                        {n.title}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                        {n.excerpt}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                        <span className="meta-text"><Calendar size={14}/> {n.date}</span>
                        <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          Baca <ArrowRight size={14}/>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}