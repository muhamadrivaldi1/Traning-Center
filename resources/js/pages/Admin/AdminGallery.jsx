import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { 
  PlusCircle, Trash2, ArrowLeft, Image as ImageIcon, 
  Search, Calendar, Edit, Save
} from "lucide-react";
import "../../../css/app.css";

export default function AdminGallery() {
  const navigate = useNavigate();

  // --- STATE NAVBAR & THEME ---
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // --- GALLERY LOGIC STATE ---
  const [activeTab, setActiveTab] = useState("pelatihan"); 
  const [viewMode, setViewMode] = useState("list"); // list, detail, form
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Form State untuk Tambah Album
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Dev",
    cover: null
  });

  // Data Dummy (Menggunakan picsum agar tidak mudah rusak tautannya)
  const [albumsPelatihan, setAlbumsPelatihan] = useState([
    { id: 1, title: "Web Dev Bootcamp 2026", count: 24, date: "2026-02-15", category: "Web Dev", cover: "https://picsum.photos/seed/webdev/400/240" },
    { id: 2, title: "Workshop UI/UX Mobile", count: 12, date: "2026-01-10", category: "UI/UX", cover: "https://picsum.photos/seed/uiux/400/240" },
    { id: 3, title: "Sertifikasi Cyber Security", count: 40, date: "2026-02-01", category: "Security", cover: "https://picsum.photos/seed/security/400/240" },
  ]);

  const getCurrentAlbums = () => (activeTab === "pelatihan" ? albumsPelatihan : []);

  const filteredAlbums = getCurrentAlbums().filter(album => {
    const matchSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !categoryFilter || album.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleOpenAlbum = (album) => {
    setSelectedAlbum(album);
    setViewMode("detail");
  };

  const handleDeleteAlbum = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Hapus album ini?")) {
      setAlbumsPelatihan(albumsPelatihan.filter(a => a.id !== id));
    }
  };

  // Handler Simpan Album Baru
  const handleSaveAlbum = () => {
    if (!formData.title) {
      alert("Judul album tidak boleh kosong!");
      return;
    }
    const newAlbum = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      count: 0,
      date: new Date().toISOString().split('T')[0],
      cover: `https://picsum.photos/seed/${Date.now()}/400/240` // Dummy cover generator
    };
    
    setAlbumsPelatihan([newAlbum, ...albumsPelatihan]);
    setFormData({ title: "", category: "Web Dev", cover: null });
    setViewMode("list");
    alert("Album berhasil ditambahkan!");
  };

  return (
    <>
      <style>{`
        :root {
          --primary-color: #3b82f6;
          --text-primary: #1f2937;
          --border-color: #e5e7eb;
          --bg-surface: #ffffff;
          --bg-input: #ffffff;
        }

        .dark-theme {
          --primary-color: #60a5fa;
          --text-primary: #f8fafc;
          --border-color: #334155;
          --bg-surface: #1e293b;
          --bg-input: #0f172a;
        }

        .tab-navigation { display: flex; gap: 16px; margin-bottom: 32px; border-bottom: 2px solid var(--border-color); }
        .tab-btn { padding: 12px 0; background: none; border: none; border-bottom: 3px solid transparent; font-size: 16px; font-weight: 600; cursor: pointer; color: #6b7280; transition: all 0.2s; margin-bottom: -2px; }
        .dark-theme .tab-btn { color: #94a3b8; }
        .tab-btn.active { color: var(--primary-color); border-bottom-color: var(--primary-color); }

        .btn-gallery { padding: 10px 16px; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease; }
        .btn-gallery-primary { background-color: #3b82f6; color: white; }
        .btn-gallery-primary:hover { background-color: #2563eb; }
        .btn-gallery-secondary { background-color: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border-color); }
        .btn-gallery-secondary:hover { background-color: var(--bg-input); }

        .gallery-input { width: 100%; padding: 10px 12px 10px 40px; border: 1px solid var(--border-color); border-radius: 8px; background-color: var(--bg-input); color: var(--text-primary); outline: none; transition: 0.2s; box-sizing: border-box; }
        .gallery-input:focus { border-color: var(--primary-color); }
        .gallery-select { padding: 10px 16px; border: 1px solid var(--border-color); border-radius: 8px; min-width: 180px; background-color: var(--bg-input); color: var(--text-primary); outline: none; cursor: pointer; }

        .album-card { background: var(--bg-surface); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .album-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); border-color: var(--primary-color); }
        .album-body { padding: 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: flex-end; gap: 8px; }
        .album-info-wrapper { flex: 1; min-width: 0; }
        .album-info-wrapper h3 { font-size: 14px; font-weight: 700; margin: 0 0 6px 0; line-height: 1.3; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .album-meta { display: flex; align-items: center; gap: 8px; color: #6b7280; font-size: 11px; }
        .dark-theme .album-meta { color: #94a3b8; }
        
        .btn-delete-card { background: none; border: none; color: #ef4444; cursor: pointer; padding: 8px; transition: 0.2s; display: flex; align-items: center; justify-content: center; border-radius: 50%; flex-shrink: 0; outline: none; }
        .btn-delete-card:hover { background-color: #fee2e2; }
        .dark-theme .btn-delete-card:hover { background-color: #7f1d1d; }

        .gallery-overlay-fixed { position: absolute; inset: 0; background-color: rgba(0, 0, 0, 0.4); opacity: 0; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .gallery-item-fixed:hover .gallery-overlay-fixed { opacity: 1; }
        .btn-action-overlay { width: 34px; height: 34px; border-radius: 9999px; background-color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.15); transition: 0.2s; border: none; outline: none; cursor: pointer; }
        .btn-action-overlay:hover { transform: scale(1.1); }
      `}</style>

      <SidebarAdmin isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`} style={{ backgroundColor: isDarkMode ? '#0f172a' : '#f6f7fb', minHeight: '100vh' }}>
        
        {/* NAVBAR */}
        <div className="topbar">
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span><span></span><span></span>
        </button>
        <div className="topbar-right">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <div className="user-menu-container">
            <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
              <FiUser />
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <p className="user-name">{user?.name || "Admin"}</p>
                  <p className="user-email">{user?.email || "-"}</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

        <div style={{ padding: '24px' }}>
          <div className="tab-navigation">
            <button className={`tab-btn ${activeTab === "pelatihan" ? "active" : ""}`} onClick={() => { setActiveTab("pelatihan"); setViewMode("list"); }}>Galeri Pelatihan</button>
            <button className={`tab-btn ${activeTab === "homepage" ? "active" : ""}`} onClick={() => { setActiveTab("homepage"); setViewMode("list"); }}>Galeri Homepage</button>
          </div>

          {/* HEADER SECTION */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                {viewMode === "list" ? (activeTab === "pelatihan" ? "Galeri Pelatihan" : "Galeri Homepage") : 
                 viewMode === "form" ? "Tambah Album Baru" : selectedAlbum?.title}
              </h1>
              <p style={{ fontSize: '14px', color: isDarkMode ? '#94a3b8' : '#6b7280', margin: 0 }}>
                {viewMode === "list" ? "Kelola album dokumentasi kegiatan pelatihan" : 
                 viewMode === "form" ? "Buat album baru untuk menyimpan foto kegiatan" : "Kelola foto-foto di dalam koleksi"}
              </p>
            </div>
            <div className="flex gap-3">
              {viewMode === "list" ? (
                <button className="btn-gallery btn-gallery-primary" onClick={() => setViewMode("form")}>
                  <PlusCircle size={18} /> Tambah Album
                </button>
              ) : (
                <button className="btn-gallery btn-gallery-secondary" onClick={() => setViewMode("list")}>
                   <ArrowLeft size={18} /> Kembali
                </button>
              )}
            </div>
          </div>

          {/* LIST VIEW */}
          {viewMode === "list" && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: isDarkMode ? '#64748b' : '#9ca3af' }} size={16} />
                  <input 
                    type="text" placeholder="Cari album..." 
                    className="gallery-input"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select className="gallery-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="">Semua Kategori</option>
                  <option value="Web Dev">Web Dev</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div className="album-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {filteredAlbums.map((album) => (
                  <div key={album.id} className="album-card" onClick={() => handleOpenAlbum(album)}>
                    {/* TINGGI GAMBAR DIPERBESAR JADI 180px + FALLBACK ERROR */}
                    <img 
                      src={album.cover} 
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                      alt="cover" 
                      onError={(e) => { e.target.src = `https://placehold.co/400x240/${isDarkMode ? '1e293b' : 'e2e8f0'}/${isDarkMode ? '475569' : '94a3b8'}?text=No+Image` }}
                    />
                    <div className="album-body">
                      <div className="album-info-wrapper">
                        <h3>{album.title}</h3>
                        <div className="album-meta">
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ImageIcon size={12}/> {album.count} Foto</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12}/> {album.date}</span>
                        </div>
                      </div>
                      <button className="btn-delete-card" onClick={(e) => { e.stopPropagation(); handleDeleteAlbum(e, album.id); }}>
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* FORM VIEW (TAMBAH ALBUM) */}
          {viewMode === "form" && (
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-color)', width: '100%' }}>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isDarkMode ? '#cbd5e1' : '#475569', marginBottom: '8px' }}>Judul Album</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="gallery-input" 
                  style={{ paddingLeft: '16px' }}
                  placeholder="Masukkan judul album..." 
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isDarkMode ? '#cbd5e1' : '#475569', marginBottom: '8px' }}>Kategori</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                  className="gallery-select"
                  style={{ width: '100%' }}
                >
                  <option value="Web Dev">Web Dev</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Security">Security</option>
                </select>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: isDarkMode ? '#cbd5e1' : '#475569', marginBottom: '8px' }}>Cover Album</label>
                <div style={{ border: `2px dashed ${isDarkMode ? '#475569' : '#cbd5e1'}`, borderRadius: '12px', padding: '32px', textAlign: 'center', cursor: 'pointer', backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc' }}>
                  <ImageIcon size={32} style={{ color: isDarkMode ? '#475569' : '#9ca3af', margin: '0 auto 8px' }} />
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: '#3b82f6' }}>Upload Cover</p>
                  <p style={{ margin: 0, fontSize: '11px', color: isDarkMode ? '#64748b' : '#9ca3af' }}>JPG, PNG max 2MB</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-gallery btn-gallery-primary" onClick={handleSaveAlbum}>
                  <Save size={18} /> Simpan Album
                </button>
                <button className="btn-gallery btn-gallery-secondary" onClick={() => setViewMode("list")}>
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* DETAIL VIEW */}
          {viewMode === "detail" && selectedAlbum && (
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Kelola Koleksi Foto</h3>
                <button className="btn-gallery btn-gallery-primary">
                  <PlusCircle size={18}/> Tambah Foto
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                {[...Array(selectedAlbum.count)].map((_, idx) => (
                  <div key={idx} className="gallery-item-fixed group" style={{ aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid var(--border-color)' }}>
                    <img src={`https://picsum.photos/seed/${selectedAlbum.id}${idx}/400/400`} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="gallery-overlay-fixed">
                       <button className="btn-action-overlay" style={{ color: '#ef4444' }} title="Hapus"><Trash2 size={16}/></button>
                       <button className="btn-action-overlay" style={{ color: '#3b82f6' }} title="Edit"><Edit size={16}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}