import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  Plus, Search, Trash2, Info, 
  Calendar, ChevronRight, ChevronDown, ChevronUp, Filter, MoreVertical,
  CheckCircle, Save, Layout, Globe, MapPin, Clock, 
  DollarSign, Edit2, Zap, ShieldCheck
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminAllTrainings() {
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
    if (savedUser) setUser(JSON.parse(savedUser));
    return () => document.body.classList.remove("dark-theme");
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

  // --- LOGIC PELATIHAN & FORM UTAMA ---
  const [viewMode, setViewMode] = useState("list"); 
  const [activeTab, setActiveTab] = useState("informasi");
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isCertEnabled, setIsCertEnabled] = useState(false);
  const [priceType, setPriceType] = useState("Gratis");

  const trainings = [
    { id: 1, name: "Web Dev Bootcamp 2026", category: "Web Dev", date: "15 Feb 2026", quota: 30, filled: 25, status: "Open", price: 0, poster: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100" },
    { id: 2, name: "UI/UX Advanced Design", category: "Design", date: "10 Jan 2026", quota: 20, filled: 20, status: "Closed", price: 500000, poster: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100" },
    { id: 3, name: "Cyber Security Pro", category: "Security", date: "01 Mar 2026", quota: 50, filled: 10, status: "Draft", price: 0, poster: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100" },
    { id: 4, name: "Data Science Batch 5", category: "Data", date: "20 Des 2025", quota: 25, filled: 25, status: "Selesai", price: 1500000, poster: "https://images.unsplash.com/photo-1551288049-bbbda5366a7a?w=100" },
  ];

  const handleAddTraining = () => {
    setSelectedTraining(null);
    setPriceType("Gratis");
    setIsCertEnabled(false);
    setViewMode("form");
  };

  const handleEditTraining = (training) => {
    setSelectedTraining(training);
    setPriceType(training.price > 0 ? "Berbayar" : "Gratis");
    setIsCertEnabled(true); 
    setViewMode("form");
  };

  const handleOpenDetail = (training) => {
    setSelectedTraining(training);
    setViewMode("detail");
    setActiveTab("materi"); 
  };

  const handlePublish = () => {
    const trainingToView = selectedTraining || trainings[0];
    setSelectedTraining(trainingToView);
    setViewMode("detail");
    setActiveTab("materi");
  };

  // --- LOGIC TAB MATERI & JADWAL ---
  const [activeMateriForm, setActiveMateriForm] = useState("section"); 
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({ 1: true, 2: true });
  const [showJadwalForm, setShowJadwalForm] = useState(false);
  const [editingMateri, setEditingMateri] = useState(null);
  const [editJadwalData, setEditJadwalData] = useState(null);

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openMateriForm = (sectionId, e) => {
    e.stopPropagation();
    setSelectedSectionId(sectionId);
    setActiveMateriForm("materi");
    setExpandedSections(prev => ({ ...prev, [sectionId]: true }));
  };

  const openSectionForm = () => {
    setActiveMateriForm("section");
  };

  // HANDLER JADWAL
  const handleOpenAddJadwal = () => {
    setEditJadwalData(null);
    setShowJadwalForm(true);
  };

  const handleOpenEditJadwal = () => {
    setEditJadwalData({ id: 1, title: 'Section: General', status: 'Aktif' }); 
    setShowJadwalForm(true);
  };

  const syllabus = [
    {
      id: 1, title: "General", desc: "Pengenalan dasar dan persiapan tools.",
      items: [
        { id: 101, title: "Pengantar UI/UX Design", type: "Video", status: "Published", order: 1 },
        { id: 102, title: "Instalasi Figma", type: "Text", status: "Published", order: 2 },
        { id: 103, title: "Buku Panduan Shortcut", type: "PDF", status: "Draft", order: 3 },
      ]
    },
    {
      id: 2, title: "Pertemuan 1", desc: "Layout dan Hierarki Visual",
      items: [
        { id: 201, title: "Fundamental Grid System", type: "Video", status: "Published", order: 1 },
        { id: 202, title: "Quiz 1: Grid System", type: "Quiz", status: "Published", order: 2 },
      ]
    }
  ];

  return (
    <>
      <style>{`
        /* CSS VARIABEL UNTUK TEMA */
        :root {
          --bg-card: #ffffff;
          --bg-app: #f6f7fb;
          --text-main: #111827;
          --text-muted: #6b7280;
          --border-color: #e5e7eb;
          --bg-table-head: #f9fafb;
          --bg-hover: #f9fafb;
          --input-bg: #ffffff;
        }

        .dark-theme {
          --bg-card: #1e293b;
          --bg-app: #0f172a;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --bg-table-head: #0f172a;
          --bg-hover: #0f172a;
          --input-bg: #0f172a;
        }

        .training-table-container { width: 100%; background: var(--bg-card); border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow-x: auto; border: 1px solid var(--border-color); }
        .training-table { width: 100%; border-collapse: collapse; min-width: 900px; }
        
        .training-table th { 
          padding: 16px 32px; 
          font-size: 13px; 
          font-weight: 700; 
          color: var(--text-muted); 
          text-transform: uppercase; 
          text-align: left; 
          background: var(--bg-table-head); 
          border-bottom: 2px solid var(--border-color); 
          border-right: 1px solid var(--border-color); 
        }
        .training-table th:last-child { border-right: none; }
        
        .training-table td { padding: 16px 32px; vertical-align: middle; border-bottom: 1px solid var(--border-color); color: var(--text-main); }
        
        .status-pill { padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 600; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-open { background-color: rgba(22, 163, 74, 0.15) !important; color: #16a34a !important; }
        .status-closed { background-color: rgba(220, 38, 38, 0.15) !important; color: #dc2626 !important; }
        .status-draft { background-color: rgba(217, 119, 6, 0.15) !important; color: #d97706 !important; }
        .status-selesai { background-color: rgba(37, 99, 235, 0.15) !important; color: #3b82f6 !important; }
        
        /* TABS STYLING */
        .tab-nav-detail { display: flex; gap: 40px; border-bottom: 1px solid var(--border-color); padding: 0 32px; background: var(--bg-card); }
        .tab-item { padding: 20px 0; font-size: 15px; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent; color: var(--text-muted); transition: 0.3s; }
        .tab-item.active { color: #3b82f6; border-bottom-color: #3b82f6; }

        /* BUTTONS */
        .btn-blue-primary { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; outline: none; transition: 0.2s; display: flex; align-items: center; gap: 8px; }
        .btn-blue-primary:hover { background: #2563eb; }
        
        .btn-white-outline { background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); padding: 10px 18px; border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 8px; }
        .btn-white-outline:hover { background: var(--bg-hover); }

        .btn-sm-solid { background: #3b82f6; color: white; border: none; padding: 10px 16px; border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(59,130,246,0.3); }
        .btn-sm-solid:hover { background: #2563eb; transform: translateY(-1px); box-shadow: 0 4px 8px rgba(59,130,246,0.4); }

        /* FORM CUSTOM STYLING */
        .admin-form-card { background: var(--bg-card); border-radius: 16px; padding: 32px; margin-bottom: 24px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .admin-form-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; color: var(--text-main); }
        .admin-form-label { display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .admin-form-input { width: 100%; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; outline: none; transition: 0.2s; background: var(--input-bg); color: var(--text-main); }
        .admin-form-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        
        .publish-sidebar { background: var(--bg-card); border-radius: 16px; padding: 24px; border: 1px solid var(--border-color); position: sticky; top: 24px; }
      `}</style>

      <SidebarAdmin isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`} style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
        {/* NAVBAR / TOPBAR */}
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

        <div style={{ padding: '32px 40px' }}>
          {viewMode === "list" ? (
            <>
              {/* HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Semua Pelatihan</h1>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Kelola daftar kegiatan dan pendaftaran peserta pelatihan</p>
                </div>
                <button className="btn-blue-primary" onClick={handleAddTraining}>
                  <Plus size={18} /> Tambah Pelatihan
                </button>
              </div>

              {/* SEARCH & FILTER */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input type="text" placeholder="Cari nama pelatihan..." style={{ width: '100%', padding: '14px 14px 14px 50px', border: '1px solid var(--border-color)', borderRadius: '12px', fontSize: '15px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }} />
                </div>
                <select style={{ padding: '0 24px', border: '1px solid var(--border-color)', borderRadius: '12px', minWidth: '200px', fontSize: '15px', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }}>
                  <option>Semua Kategori</option>
                </select>
              </div>

              {/* TABLE LIST VIEW */}
              <div className="training-table-container">
                <table className="training-table">
                  <thead>
                    <tr>
                      <th>Pelatihan</th>
                      <th>Kategori</th>
                      <th>Tanggal</th>
                      <th>Kapasitas</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainings.map((t) => (
                      <tr key={t.id} style={{ transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img src={t.poster} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} alt="" />
                            <span style={{ fontWeight: 700, fontSize: '14.5px' }}>{t.name}</span>
                          </div>
                        </td>
                        <td style={{ fontSize: '14px' }}>{t.category}</td>
                        <td style={{ fontSize: '14px' }}>{t.date}</td>
                        <td style={{ fontSize: '13px', fontWeight: 600 }}>{t.filled}/{t.quota}</td>
                        <td><span className={`status-pill status-${t.status.toLowerCase()}`}>{t.status}</span></td>
                        <td>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button onClick={() => handleOpenDetail(t)} style={{ padding: '10px', color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', border: 'none', borderRadius: '10px', cursor: 'pointer' }} title="Lihat Detail">
                              <ChevronRight size={20} />
                            </button>
                            <button onClick={() => handleEditTraining(t)} style={{ padding: '10px', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', border: 'none', borderRadius: '10px', cursor: 'pointer' }} title="Edit Pelatihan">
                              <Edit2 size={20} />
                            </button>
                            <button style={{ padding: '10px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '10px', cursor: 'pointer' }} title="Hapus">
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : viewMode === "form" ? (
            /* === 🟦 FORM TAMBAH / EDIT PELATIHAN === */
            <div className="animate-fade-in">
              <button onClick={() => setViewMode("list")} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '24px', fontWeight: 600 }}>
                <ChevronRight className="rotate-180" size={18} /> Kembali ke List
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '24px' }}>
                <div>
                  <div className="admin-form-card">
                    <h2 className="admin-form-title text-blue-500"><Info size={20}/> 1. Informasi Dasar</h2>
                    <div style={{ marginBottom: '20px' }}>
                      <label className="admin-form-label">Judul Pelatihan</label>
                      <input className="admin-form-input" placeholder="contoh: UI/UX Design Bootcamp 2026" defaultValue={selectedTraining?.name || ''} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label className="admin-form-label">Kategori</label>
                        <select className="admin-form-input" defaultValue={selectedTraining?.category || 'UI/UX'}>
                          <option value="UI/UX">UI/UX</option>
                          <option value="Web Dev">Web Dev</option>
                          <option value="Data Science">Data Science</option>
                        </select>
                      </div>
                      <div>
                        <label className="admin-form-label">Status</label>
                        <select className="admin-form-input" defaultValue={selectedTraining?.status || 'Draft'}>
                          <option value="Draft">Draft</option>
                          <option value="Open">Open</option>
                          <option value="Closed">Closed</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <label className="admin-form-label">Deskripsi Singkat</label>
                      <textarea className="admin-form-input" rows="2" placeholder="Ringkasan isi pelatihan..."></textarea>
                    </div>
                    <div>
                      <label className="admin-form-label">Poster / Thumbnail</label>
                      <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '32px', textAlign: 'center', background: 'var(--bg-table-head)', cursor: 'pointer' }}>
                        <Plus className="mx-auto text-gray-400 mb-2" size={24}/>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Klik untuk upload Poster (JPG/PNG)</p>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-card">
                    <h2 className="admin-form-title text-orange-500"><Calendar size={20}/> 2. Jadwal Dasar & Kuota</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label className="admin-form-label">Tanggal Mulai</label>
                        <input type="date" className="admin-form-input" />
                      </div>
                      <div>
                        <label className="admin-form-label">Tanggal Selesai</label>
                        <input type="date" className="admin-form-input" />
                      </div>
                      <div>
                        <label className="admin-form-label">Lokasi</label>
                        <select className="admin-form-input">
                          <option>Offline</option>
                          <option>Online (Zoom)</option>
                        </select>
                      </div>
                      <div>
                        <label className="admin-form-label">Kuota Peserta</label>
                        <div style={{ position: 'relative' }}>
                          <input type="number" className="admin-form-input" placeholder="30" defaultValue={selectedTraining?.quota || ''} />
                          <span style={{ position: 'absolute', right: '12px', top: '10px', fontSize: '11px', fontWeight: 700, color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                            Terisi: {selectedTraining ? selectedTraining.filled : 0} / {selectedTraining ? selectedTraining.quota : 30}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="admin-form-card">
                    <h2 className="admin-form-title text-purple-500"><Layout size={20}/> 3. Detail Tambahan</h2>
                    <div style={{ marginBottom: '20px' }}>
                      <label className="admin-form-label">Nama Pengajar</label>
                      <input className="admin-form-input" placeholder="Nama instruktur..." />
                    </div>
                    <div>
                      <label className="admin-form-label">Biaya</label>
                      <select className="admin-form-input" value={priceType} onChange={(e) => setPriceType(e.target.value)}>
                        <option value="Gratis">Gratis</option>
                        <option value="Berbayar">Berbayar (Isi Nominal)</option>
                      </select>
                      {priceType === "Berbayar" && (
                        <div style={{ position: 'relative', marginTop: '12px' }}>
                          <span style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>Rp</span>
                          <input type="number" className="admin-form-input" style={{ paddingLeft: '44px' }} placeholder="Masukkan nominal..." defaultValue={selectedTraining?.price || ''} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="publish-sidebar">
                    <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Publish Control</h3>
                    <div style={{ marginBottom: '20px' }}>
                      <label className="admin-form-label" style={{ fontSize: '11px' }}>Auto-Generated Slug</label>
                      <input className="admin-form-input" style={{ background: 'var(--bg-table-head)', padding: '8px 12px' }} readOnly value="uiux-design-bootcamp-2026" />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                      <label className="admin-form-label" style={{ fontSize: '11px' }}>SEO Meta Description</label>
                      <textarea className="admin-form-input" rows="3"></textarea>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button onClick={handlePublish} className="btn-blue-primary !py-3" style={{ width: '100%', justifyContent: 'center' }}>
                        <CheckCircle size={18}/> {selectedTraining ? "Update Pelatihan" : "Publish Sekarang"}
                      </button>
                      <button className="btn-white-outline" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
                        Simpan Draft
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* === 3. DETAIL PAGE (TAB VIEW) === */
            <div className="animate-fade-in">
              <button onClick={() => setViewMode("list")} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '32px', fontWeight: 600, fontSize: '15px' }}>
                <ChevronRight className="rotate-180" size={20} /> Kembali ke Daftar
              </button>

              <div style={{ background: 'var(--bg-card)', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <div style={{ padding: '48px', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: 'white' }}>
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{selectedTraining?.category}</span>
                  <h2 style={{ fontSize: '36px', fontWeight: 800, marginTop: '16px', letterSpacing: '-0.5px' }}>{selectedTraining?.name}</h2>
                </div>

                {/* TABS MENU HORIZONTAL */}
                <div className="tab-nav-detail">
                  <div className={`tab-item ${activeTab === "informasi" ? "active" : ""}`} onClick={() => setActiveTab("informasi")}>Informasi Detail</div>
                  <div className={`tab-item ${activeTab === "materi" ? "active" : ""}`} onClick={() => setActiveTab("materi")}>Materi Silabus</div>
                  <div className={`tab-item ${activeTab === "jadwal" ? "active" : ""}`} onClick={() => setActiveTab("jadwal")}>Jadwal Sesi</div>
                  <div className={`tab-item ${activeTab === "peserta" ? "active" : ""}`} onClick={() => setActiveTab("peserta")}>Daftar Peserta</div>
                  <div className={`tab-item ${activeTab === "sertifikat" ? "active" : ""}`} onClick={() => setActiveTab("sertifikat")}>Pengaturan Sertifikat</div>
                </div>

                <div style={{ padding: '48px' }}>
                  {activeTab === "informasi" && <div style={{ padding: '60px', border: '2px dashed var(--border-color)', borderRadius: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>Panel Edit Informasi Pelatihan</div>}
                  
                  {/* TAB MATERI */}
                  {activeTab === "materi" && (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }} className="animate-fade-in">
                      
                      {/* BAGIAN KIRI: DAFTAR SILABUS */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>Struktur Silabus</h3>
                          <button className="btn-white-outline" onClick={() => openSectionForm()}>
                            <Plus size={16}/> Tambah Section
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {syllabus.map((section) => (
                            <div key={section.id} style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)' }}>
                              
                              <div 
                                style={{ padding: '20px', background: 'var(--bg-table-head)', borderBottom: expandedSections[section.id] ? '1px solid var(--border-color)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => toggleSection(section.id)}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{expandedSections[section.id] ? '▼' : '▶'}</span>
                                  <div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>{section.title}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{section.desc}</div>
                                    <div style={{ fontSize: '12px', color: '#3b82f6', marginTop: '4px' }}>{section.items.length} Materi</div>
                                  </div>
                                </div>
                                <button className="btn-sm-solid" onClick={(e) => openMateriForm(section.id, e)}>
                                  <Plus size={14} /> Tambah Materi
                                </button>
                              </div>

                              {expandedSections[section.id] && (
                                <div style={{ padding: '16px' }}>
                                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                    <thead>
                                      <tr>
                                        <th style={{ padding: '12px', textAlign: 'center', width: '40px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>⋮</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>Judul Materi</th>
                                        <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>Tipe</th>
                                        <th style={{ padding: '12px', textAlign: 'center', width: '60px', fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>Aksi</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {section.items.map((item) => (
                                        <tr key={item.id} style={{ transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                          <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid var(--border-color)', cursor: 'grab', color: 'var(--text-muted)' }}>⋮</td>
                                          <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                                            {item.title}
                                            {item.status === 'Draft' && <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(217, 119, 6, 0.15)', color: '#d97706', marginLeft: '8px' }}>Draft</span>}
                                          </td>
                                          <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)' }}>{item.type}</td>
                                          <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                              <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', borderRadius: '8px' }}>✎</button>
                                              <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', borderRadius: '8px' }}>🗑</button>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BAGIAN KANAN: FORM STICKY SECTION/MATERI */}
                      <div style={{ position: 'sticky', top: '24px' }}>
                        {activeMateriForm === "section" && (
                          <div className="admin-form-card" style={{ background: 'var(--bg-table-head)' }}>
                            <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Buat Section Baru</h4>
                            <div style={{ marginBottom: '20px' }}>
                              <label className="admin-form-label">Judul Section</label>
                              <input type="text" className="admin-form-input" placeholder="Contoh: General, Pertemuan 1..." />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                              <label className="admin-form-label">Deskripsi</label>
                              <textarea className="admin-form-input" rows="3" placeholder="Tujuan pembelajaran..."></textarea>
                            </div>
                            <button className="btn-blue-primary w-full justify-center">Simpan Section</button>
                          </div>
                        )}

                        {activeMateriForm === "materi" && (
                          <div className="admin-form-card" style={{ background: 'var(--bg-table-head)' }}>
                            <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Tambah Materi Baru</h4>
                            <div style={{ marginBottom: '20px' }}>
                              <label className="admin-form-label">Pilih Section</label>
                              <select className="admin-form-input" value={selectedSectionId || ''} onChange={(e) => setSelectedSectionId(e.target.value)}>
                                <option value="1">General</option>
                                <option value="2">Pertemuan 1</option>
                              </select>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                              <label className="admin-form-label">Judul Materi</label>
                              <input type="text" className="admin-form-input" placeholder="Judul konten..." />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                              <label className="admin-form-label">Tipe Materi</label>
                              <select className="admin-form-input">
                                <option>Video</option><option>Text</option><option>PDF</option><option>Quiz</option>
                              </select>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                              <label className="admin-form-label">Status</label>
                              <select className="admin-form-input">
                                <option>Published</option><option>Draft</option>
                              </select>
                            </div>
                            <button className="btn-blue-primary w-full justify-center">Simpan Materi</button>
                          </div>
                        )}

                        {activeMateriForm === "editMateri" && editingMateri && (
                          <div className="admin-form-card" style={{ background: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : '#fffbeb', border: '1px solid #fcd34d' }}>
                            <h4 className="font-bold mb-6 flex items-center gap-2 text-lg" style={{ color: isDarkMode ? '#fcd34d' : '#92400e' }}>
                              <Edit2 size={20}/> Edit Materi
                            </h4>
                            <div className="space-y-4">
                              <div style={{ marginBottom: '16px' }}>
                                <label className="admin-form-label">Judul Materi</label>
                                <input type="text" className="admin-form-input" defaultValue={editingMateri.title} />
                              </div>
                              <div style={{ marginBottom: '16px' }}>
                                <label className="admin-form-label">Tipe Materi</label>
                                <select className="admin-form-input" defaultValue={editingMateri.type}>
                                  <option value="Video">Video</option>
                                  <option value="Text">Text</option>
                                  <option value="PDF">PDF</option>
                                  <option value="Quiz">Quiz</option>
                                </select>
                              </div>
                              <div style={{ marginBottom: '24px' }}>
                                <label className="admin-form-label">Urutan</label>
                                <input type="number" className="admin-form-input" defaultValue={editingMateri.order} />
                              </div>
                              <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn-white-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveMateriForm("")}>Batal</button>
                                <button className="btn-blue-primary" style={{ flex: 1, justifyContent: 'center' }}>Simpan</button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {!activeMateriForm && (
                           <div style={{ padding: '40px', border: '2px dashed var(--border-color)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 500 }}>
                             Pilih "Tambah Section" atau "Tambah Materi"
                           </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* --- TAB JADWAL --- */}
                  {activeTab === "jadwal" && (
                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
                      
                      {/* KOLOM KIRI: TABEL JADWAL */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 24px 0' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>Kelola Jadwal Sesi</h3>
                          <button className="btn-blue-primary" onClick={() => handleOpenAddJadwal()}>
                            <Plus size={16}/> Tambah Jadwal
                          </button>
                        </div>

                        <div className="table-container" style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                          {/* PERHATIAN: Hapus className="table" agar tidak bentrok dengan Bootstrap */}
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead style={{ background: 'var(--bg-table-head)' }}>
                              <tr>
                                <th style={{ padding: '16px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Section / Materi Terkait</th>
                                <th style={{ padding: '16px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Waktu Pelaksanaan</th>
                                <th style={{ padding: '16px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Status</th>
                                <th style={{ padding: '16px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', fontWeight: 'bold', color: 'var(--text-main)' }}>General</td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                                  <div>20 Feb 2026, 09:00 - 12:00</div>
                                </td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                                  <span className="status-pill status-open">Aktif</span>
                                </td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
                                   <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                     <button 
                                      onClick={(e) => {
                                      e.stopPropagation(); 
                                      handleOpenEditJadwal();
                                    }}
                                       style={{ padding: '8px', border: 'none', background: 'transparent', color: '#3b82f6', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                       title="Edit"
                                     >
                                       ✎
                                     </button>
                                     <button 
                                       style={{ padding: '8px', border: 'none', background: 'transparent', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                       title="Hapus"
                                     >
                                       🗑
                                     </button>
                                   </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* KOLOM KANAN: FORM STICKY JADWAL */}
                      <div style={{ position: 'sticky', top: '24px' }}>
                        {showJadwalForm ? (
                          <div className="admin-form-card" style={{ background: isDarkMode ? 'rgba(217, 119, 6, 0.1)' : '#fef3c7', border: '1px solid #fcd34d', margin: 0 }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 700, color: isDarkMode ? '#fcd34d' : '#92400e', marginBottom: '20px' }}>
                              {editJadwalData ? "Edit Jadwal Sesi" : "Atur Jadwal Baru"}
                            </h4>
                            <div style={{ marginBottom: '16px' }}>
                              <label className="admin-form-label">Tautkan ke Section</label>
                              <select className="admin-form-input" defaultValue={editJadwalData ? "General" : ""}>
                                <option value="">-- Pilih Section --</option>
                                <option value="General">General</option>
                                <option value="Pertemuan 1">Pertemuan 1</option>
                              </select>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <label className="admin-form-label">Status Jadwal</label>
                              <select className="admin-form-input" defaultValue="Aktif">
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                              </select>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <label className="admin-form-label">Waktu Mulai</label>
                              <input type="datetime-local" className="admin-form-input" />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                              <label className="admin-form-label">Waktu Selesai</label>
                              <input type="datetime-local" className="admin-form-input" />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <button className="btn-white-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowJadwalForm(false)}>Batal</button>
                              <button className="btn-blue-primary" style={{ flex: 1, justifyContent: 'center' }}>Simpan</button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '40px', border: '2px dashed var(--border-color)', borderRadius: '12px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 500 }}>
                            Pilih "Tambah Jadwal" atau klik ikon Edit
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {activeTab === "peserta" && <div style={{ padding: '60px', border: '2px dashed var(--border-color)', borderRadius: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>Data Peserta Terdaftar</div>}
                  
                  {/* TAB SERTIFIKAT */}
                  {activeTab === "sertifikat" && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="animate-fade-in">
                      <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                          <Zap size={20}/> Mode Otomatis Aktif
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>Sistem akan men-generate sertifikat apabila peserta memenuhi syarat berikut:</p>
                        <ul style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 600, paddingLeft: '20px', marginBottom: '24px', lineHeight: '2' }}>
                          <li style={{ listStyleType: 'disc' }}>Status Kelulusan = <span style={{ color: '#10b981' }}>Lulus</span></li>
                          <li style={{ listStyleType: 'disc' }}>Kehadiran ≥ <span style={{ color: '#3b82f6' }}>80% (Batas Minimum)</span></li>
                        </ul>
                        <div style={{ background: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff', padding: '16px', borderRadius: '10px', fontSize: '13px', color: isDarkMode ? '#60a5fa' : '#1e40af', fontWeight: 500 }}>
                          ℹ️ Sertifikat otomatis masuk ke riwayat peserta dan siap diunduh.
                        </div>
                      </div>

                      <div style={{ border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                          <ShieldCheck size={20}/> Manual Override (Fallback)
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>Gunakan fitur ini jika terjadi error sistem, kesalahan status, atau keluhan dari peserta.</p>
                        <div style={{ background: 'var(--bg-table-head)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>Ahmad Budi</div>
                              <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600, marginTop: '4px' }}>Gagal Auto: Kehadiran 75%</div>
                            </div>
                            <button style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Generate</button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>Siti Sarah</div>
                              <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>Sertifikat: TCF-9021-X</div>
                            </div>
                            <button style={{ padding: '8px 16px', background: 'var(--bg-card)', color: 'var(--text-main)', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1px solid var(--border-color)', cursor: 'pointer' }}>Regenerate</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}