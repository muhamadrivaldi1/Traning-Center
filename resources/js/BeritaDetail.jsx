import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic"; 
import Footer from "./components/Footer"; 
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

export default function BeritaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);

  // Mockup Data (Fetch dari API di real app)
  const article = { 
    id: id, title: "Pendaftaran Bootcamp Web Dev 2026 Resmi Dibuka", 
    category: "Pengumuman", date: "12 Februari 2026", author: "Admin TCF",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&fit=crop",
    content: `
      <p>Training Center FILKOM Universitas Pamulang kembali mengadakan program unggulan tahunan: <strong>Web Development Bootcamp 2026</strong>. Program ini dirancang khusus untuk menjembatani kesenjangan antara kurikulum akademis dengan kebutuhan industri teknologi saat ini.</p>
      <br/>
      <h3>Kenapa Harus Ikut Bootcamp Ini?</h3>
      <p>Dalam era digital yang serba cepat, memiliki keahlian membuat website yang interaktif dan responsif adalah sebuah keharusan. Bootcamp ini tidak hanya mengajarkan teori, tetapi 80% adalah praktik langsung (Hands-on Labs).</p>
      <ul>
        <li>Mentoring langsung dari praktisi industri.</li>
        <li>Review CV dan Portofolio.</li>
        <li>Sertifikat kompetensi resmi dari Universitas.</li>
      </ul>
      <br/>
      <p>Jangan lewatkan kesempatan berharga ini. Kuota sangat terbatas, hanya untuk 30 pendaftar pertama yang lolos seleksi administrasi. Segera cek halaman Pelatihan untuk mendaftar!</p>
    `
  };

  return (
    <div className="bg-public" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavbarPublic />

      <main style={{ flex: 1, marginTop: '80px', paddingBottom: '80px' }}>
        
        {/* CONTAINER BACA (Lebih sempit agar nyaman dibaca) */}
        <article style={{ backgroundColor: '#ffffff', maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          
          <button 
            onClick={() => navigate('/berita')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginBottom: '32px', padding: 0 }}
          >
            <ArrowLeft size={16}/> Kembali ke Daftar Berita
          </button>

          <span style={{ background: '#eff6ff', color: '#3b82f6', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {article.category}
          </span>
          
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '16px 0 24px', lineHeight: '1.3' }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '24px', color: '#64748b', fontSize: '14px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16}/> {article.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16}/> Ditulis oleh: <strong style={{ color: '#0f172a' }}>{article.author}</strong></span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
              <Share2 size={16}/> Bagikan
            </button>
          </div>

          <img 
            src={article.image} 
            alt={article.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '450px', objectFit: 'cover', borderRadius: '16px', marginBottom: '40px' }} 
          />

          {/* KONTEN ARTIKEL */}
          {/* Untuk render HTML murni dari string, gunakan dangerouslySetInnerHTML */}
          <div 
            style={{ color: '#334155', fontSize: '16px', lineHeight: '1.8' }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

        </article>

      </main>

      <Footer />
    </div>
  );
}