import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { 
  PlusCircle, Edit, Trash2, ArrowLeft, Image as ImageIcon, 
  Save, CheckCircle, Clock, Search, Filter, Eye, Calendar, Tag, BarChart2, X, Menu, Type
} from "lucide-react";
import "../../../css/app.css";

// ============================================
// STYLE GENERATOR - Mendukung Dark Mode
// ============================================
const getStyles = (isDark) => ({
  dashboardContainer: { padding: "24px", backgroundColor: isDark ? "#0f172a" : "transparent", minHeight: "100vh" },
  dashboardHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    gap: "24px", paddingBottom: "24px", marginBottom: "24px",
    borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, flexWrap: "wrap",
  },
  dashboardTitleSection: { flex: 1 },
  // Judul dipertebal (fontWeight 800)
  dashboardTitle: { fontSize: "28px", fontWeight: "800", color: isDark ? "#f8fafc" : "#1f2937", margin: "0 0 8px 0" },
  dashboardSubtitle: { fontSize: "14px", color: isDark ? "#94a3b8" : "#6b7280", margin: 0 },
  actionButtons: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "flex-end" },
  
  btn: {
    display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 20px",
    border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: "600",
    cursor: "pointer", transition: "all 0.2s",
  },
  btnPrimary: { backgroundColor: "#3b82f6", color: "#ffffff" },
  btnSecondary: { backgroundColor: isDark ? "#1e293b" : "#ffffff", color: isDark ? "#e2e8f0" : "#1f2937", border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}` },
  btnIconOnly: { padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "center" },

  card: { backgroundColor: isDark ? "#1e293b" : "#ffffff", borderRadius: "16px", border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" },
  cardContent: { padding: "24px" },

  searchFilterBar: { display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginBottom: "24px" },
  searchWrapper: { position: "relative", flex: "1 1 250px" },
  searchInput: { width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 40px", border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, borderRadius: "10px", fontSize: "14px", backgroundColor: isDark ? "#0f172a" : "#f8fafc", color: isDark ? "#f8fafc" : "#1f2937", outline: "none", transition: "all 0.2s" },
  filterSelect: { padding: "10px 16px", border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, borderRadius: "10px", fontSize: "14px", backgroundColor: isDark ? "#1e293b" : "#ffffff", color: isDark ? "#f8fafc" : "#1f2937", outline: "none", cursor: "pointer" },

  tableWrapper: { overflowX: "auto", borderRadius: "12px", border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}` },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", backgroundColor: isDark ? "#0f172a" : "#f8fafc", borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}` },
  td: { padding: "16px", fontSize: "14px", color: isDark ? "#e2e8f0" : "#1f2937", borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, verticalAlign: "middle" },
  tableRow: { transition: "backgroundColor 0.2s" },

  badge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" },
  badgePublish: { backgroundColor: isDark ? "rgba(22, 163, 74, 0.2)" : "#dcfce7", color: isDark ? "#4ade80" : "#16a34a" },
  badgeDraft: { backgroundColor: isDark ? "rgba(217, 119, 6, 0.2)" : "#fef3c7", color: isDark ? "#fbbf24" : "#d97706" },
  badgeSchedule: { backgroundColor: isDark ? "rgba(59, 130, 246, 0.2)" : "#dbeafe", color: isDark ? "#60a5fa" : "#2563eb" },

  iconBtn: { padding: "8px", border: "none", borderRadius: "8px", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },
  
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px" },
  formGridMain: { gridColumn: "span 2" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" },
  label: { fontSize: "13px", fontWeight: "700", color: isDark ? "#cbd5e1" : "#475569", textTransform: "uppercase", letterSpacing: "0.5px" },
  formInput: { width: "100%", boxSizing: "border-box", padding: "12px 16px", border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: "10px", fontSize: "14px", backgroundColor: isDark ? "#0f172a" : "#f8fafc", color: isDark ? "#f8fafc" : "#0f172a", outline: "none", transition: "all 0.2s" },
  formTextarea: { width: "100%", boxSizing: "border-box", padding: "12px 16px", border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`, borderRadius: "10px", fontSize: "14px", backgroundColor: isDark ? "#0f172a" : "#f8fafc", color: isDark ? "#f8fafc" : "#0f172a", outline: "none", resize: "vertical", minHeight: "200px", fontFamily: "inherit" },
  
  editorToolbar: { display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: isDark ? "#0f172a" : "#f8fafc", borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}` },
  editorButton: { padding: "6px 12px", border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`, borderRadius: "6px", backgroundColor: isDark ? "#1e293b" : "#ffffff", color: isDark ? "#cbd5e1" : "#475569", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "all 0.2s" },
  
  fileUpload: { border: `2px dashed ${isDark ? '#475569' : '#cbd5e1'}`, borderRadius: "12px", padding: "32px", textAlign: "center", cursor: "pointer", backgroundColor: isDark ? "#0f172a" : "#f8fafc", transition: "all 0.2s" },
  
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: isDark ? "#f8fafc" : "#1f2937", paddingBottom: "16px", marginBottom: "16px", borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, margin: 0 },
  
  // Custom Styles untuk Tags & Analytics
  tagPill: { display: "inline-flex", alignItems: "center", gap: "4px", backgroundColor: isDark ? "rgba(59, 130, 246, 0.2)" : "#eff6ff", color: isDark ? "#60a5fa" : "#1d4ed8", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500" },
  statFooter: { display: "flex", alignItems: "center", gap: "16px", padding: "12px 16px", backgroundColor: isDark ? "#0f172a" : "#f3f4f6", borderTop: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`, fontSize: "12px", color: isDark ? "#94a3b8" : "#6b7280", fontWeight: "500" }
});

// ============================================
// COMPONENT
// ============================================
export default function AdminNews() {
  const navigate = useNavigate();

  // STATE NAVBAR & THEME
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") { setIsDarkMode(true); document.body.classList.add("dark-theme"); }
    const savedUser = localStorage.getItem("user");
    if (savedUser) { setUser(JSON.parse(savedUser)); }
    return () => { document.body.classList.remove("dark-theme"); };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) { document.body.classList.add("dark-theme"); localStorage.setItem("theme", "dark"); } 
    else { document.body.classList.remove("dark-theme"); localStorage.setItem("theme", "light"); }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Generate styles based on dark mode state
  const styles = getStyles(isDarkMode);

  // STATE HALAMAN BERITA
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagInput, setTagInput] = useState("");

  const [news, setNews] = useState([
    { id: 1, title: "Pendaftaran Pelatihan Dibuka", category: "Pengumuman", author: "Admin TC", publishDate: "14 Feb 2026", status: "Publish", views: 1250, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop" },
    { id: 2, title: "Tips Belajar React JS", category: "Tutorial", author: "Ahmad Budi", publishDate: "20 Feb 2026", status: "Scheduled", views: 0, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop" },
    { id: 3, title: "Review Cyber Security 2026", category: "Review", author: "Admin TC", publishDate: "-", status: "Draft", views: 0, image: null },
  ]);

  const [formData, setFormData] = useState({
    title: "", content: "", category: "Pengumuman", tags: [], status: "Draft", scheduleDate: "", thumbnail: null
  });

  // Hitung Word Count & Estimasi Baca
  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200) || 1; // Rata-rata membaca 200 kata/menit

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSave = () => {
    alert(`Berita "${formData.title}" berhasil disimpan!`);
    setViewMode("table");
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus berita ini?")) { setNews(news.filter((n) => n.id !== id)); }
  };

  const filteredNews = news.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || n.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <SidebarAdmin isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        
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

        {/* --- CONTENT AREA --- */}
        <div style={styles.dashboardContainer}>
          
          {/* HEADER */}
          <div style={styles.dashboardHeader}>
            <div style={styles.dashboardTitleSection}>
              <h1 style={styles.dashboardTitle}>
                {viewMode === "table" ? "Kelola Berita" : "Tulis Berita Baru"}
              </h1>
              <p style={styles.dashboardSubtitle}>
                {viewMode === "table" ? "Manajemen artikel dan pengumuman" : "Buat konten menarik untuk pengunjung"}
              </p>
            </div>

            <div style={styles.actionButtons}>
              {viewMode === "table" ? (
                <button
                  style={{ ...styles.btn, ...styles.btnPrimary }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                  onClick={() => {
                    setFormData({ title: "", content: "", category: "Pengumuman", tags: [], status: "Draft", scheduleDate: "", thumbnail: null });
                    setViewMode("form");
                  }}
                >
                  <PlusCircle size={18} /> Tulis Berita
                </button>
              ) : (
                <>
                  <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={() => alert("Preview mode...")}>
                    <Eye size={18} /> Preview
                  </button>
                  <button 
                    style={{ ...styles.btn, ...styles.btnPrimary }} 
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                    onClick={handleSave}
                  >
                    <Save size={18} /> Simpan
                  </button>
                  <button style={{ ...styles.btn, ...styles.btnSecondary, ...styles.btnIconOnly }} onClick={() => setViewMode("table")}>
                    <ArrowLeft size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* TABEL VIEW */}
          {viewMode === "table" && (
            <div style={styles.card}>
              <div style={styles.cardContent}>
                {/* Search & Filter */}
                <div style={styles.searchFilterBar}>
                  <div style={styles.searchWrapper}>
                    <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: isDarkMode ? "#64748b" : "#94a3b8" }} />
                    <input 
                      type="text" 
                      placeholder="Cari judul berita..." 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      style={styles.searchInput} 
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e5e7eb")}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Filter size={18} style={{ color: isDarkMode ? "#64748b" : "#94a3b8" }} />
                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)} 
                      style={styles.filterSelect}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e5e7eb")}
                    >
                      <option value="All">Semua Status</option>
                      <option value="Publish">Publish</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Berita</th>
                        <th style={styles.th}>Kategori & Author</th>
                        <th style={styles.th}>Tanggal Publish</th>
                        <th style={styles.th}>Status</th>
                        <th style={{...styles.th, textAlign: "center"}}>Views</th>
                        <th style={{ ...styles.th, textAlign: "center" }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNews.map((n) => (
                        <tr 
                          key={n.id} 
                          style={styles.tableRow} 
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#0f172a" : "#f3f4f6")} 
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          {/* Col 1: Thumbnail + Title */}
                          <td style={styles.td}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              {n.image ? (
                                <img src={n.image} alt="thumb" style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover", border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}` }} />
                              ) : (
                                <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: isDarkMode ? "#0f172a" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}` }}>
                                  <ImageIcon size={20} color={isDarkMode ? "#475569" : "#9ca3af"} />
                                </div>
                              )}
                              <strong style={{ fontSize: "14px", color: isDarkMode ? "#f8fafc" : "#111827" }}>{n.title}</strong>
                            </div>
                          </td>

                          {/* Col 2: Category & Author */}
                          <td style={styles.td}>
                            <span style={{ display: "block", fontSize: "12px", fontWeight: "600", color: isDarkMode ? "#60a5fa" : "#3b82f6", marginBottom: "4px" }}>{n.category}</span>
                            <span style={{ fontSize: "12px", color: isDarkMode ? "#94a3b8" : "#6b7280" }}>Oleh: {n.author}</span>
                          </td>

                          {/* Col 3: Date */}
                          <td style={styles.td}>
                            <span style={{ fontSize: "13px", color: isDarkMode ? "#94a3b8" : "#6b7280" }}>{n.publishDate}</span>
                          </td>

                          {/* Col 4: Status */}
                          <td style={styles.td}>
                            <span style={{ ...styles.badge, ...(n.status === "Publish" ? styles.badgePublish : n.status === "Scheduled" ? styles.badgeSchedule : styles.badgeDraft) }}>
                              {n.status === "Publish" ? <CheckCircle size={12} /> : n.status === "Scheduled" ? <Calendar size={12} /> : <Clock size={12} />}
                              {n.status}
                            </span>
                          </td>

                          {/* Col 5: Views */}
                          <td style={{ ...styles.td, textAlign: "center", color: isDarkMode ? "#94a3b8" : "#6b7280" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                              <BarChart2 size={14} /> {n.views.toLocaleString()}
                            </div>
                          </td>

                          {/* Col 6: Action */}
                          <td style={{ ...styles.td, textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                              <button 
                                style={{ ...styles.iconBtn, ...styles.iconBtnEdit }} 
                                onClick={() => { setFormData({ ...formData, title: n.title, category: n.category, status: n.status }); setViewMode("form"); }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#1e3a8a" : "#eff6ff")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                style={{ ...styles.iconBtn, ...styles.iconBtnDelete }} 
                                onClick={() => handleDelete(n.id)}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#7f1d1d" : "#fef2f2")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FORM VIEW */}
          {viewMode === "form" && (
            <div style={styles.formGrid}>
              
              {/* KIRI: KONTEN UTAMA */}
              <div style={styles.formGridMain}>
                <div style={styles.card}>
                  <div style={styles.cardContent}>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Judul Berita <span style={{ color: "#ef4444" }}>*</span></label>
                      <input 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} 
                        placeholder="Masukkan judul..." 
                        style={{...styles.formInput, fontSize: "18px", fontWeight: "600"}} 
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                      />
                    </div>

                    <div style={{...styles.formGroup, marginBottom: 0}}>
                      <label style={styles.label}>Konten Berita</label>
                      <div style={{ border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`, borderRadius: "10px", overflow: "hidden" }}>
                        <div style={styles.editorToolbar}>
                          <button style={styles.editorButton}><strong>B</strong></button>
                          <button style={styles.editorButton}><em>I</em></button>
                          <button style={styles.editorButton}><u>U</u></button>
                          <div style={{ width: "1px", height: "24px", backgroundColor: isDarkMode ? "#334155" : "#e5e7eb", margin: "0 4px" }} />
                          <button style={styles.editorButton}>H1</button>
                          <button style={styles.editorButton}>H2</button>
                        </div>
                        <textarea
                          placeholder="Mulai menulis berita di sini..."
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          style={{ ...styles.formTextarea, border: "none", borderRadius: 0, minHeight: "350px" }}
                        />
                        {/* PRO UI TIP: Word Count & Read Time */}
                        <div style={styles.statFooter}>
                          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Type size={14} /> {wordCount} Kata</span>
                          <span>•</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={14} /> Estimasi baca {readTime} mnt</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* KANAN: PENGATURAN */}
              <div>
                <div style={{ ...styles.card, ...styles.stickySidebar }}>
                  <div style={styles.cardContent}>
                    <h3 style={styles.sectionTitle}>Pengaturan Berita</h3>

                    {/* Thumbnail */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Thumbnail</label>
                      <div 
                        style={styles.fileUpload}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = isDarkMode ? "#475569" : "#cbd5e1")}
                      >
                        <ImageIcon size={32} style={{ color: isDarkMode ? "#475569" : "#94a3b8", margin: "0 auto 8px" }} />
                        <p style={{ margin: "0 0 4px 0", fontSize: "13px", fontWeight: "600", color: isDarkMode ? "#60a5fa" : "#3b82f6" }}>Upload Gambar</p>
                        <p style={{ margin: 0, fontSize: "11px", color: isDarkMode ? "#64748b" : "#94a3b8" }}>JPG, PNG max 2MB</p>
                      </div>
                    </div>

                    {/* Kategori */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Kategori</label>
                      <select 
                        style={{...styles.formInput, cursor: 'pointer'}} 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                      >
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Review">Review Berita</option>
                        <option value="Event">Event Kampus</option>
                      </select>
                    </div>

                    {/* Tags */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Tags (Tekan Enter)</label>
                      <div style={{...styles.formInput, display: "flex", flexWrap: "wrap", gap: "6px", padding: "8px 12px", minHeight: "44px"}}>
                        {formData.tags.map((tag, idx) => (
                          <span key={idx} style={styles.tagPill}>
                            {tag} <X size={12} style={{cursor: "pointer"}} onClick={() => handleRemoveTag(tag)} />
                          </span>
                        ))}
                        <input 
                          type="text" 
                          value={tagInput} 
                          onChange={(e) => setTagInput(e.target.value)} 
                          onKeyDown={handleAddTag} 
                          placeholder={formData.tags.length === 0 ? "Ketik tag..." : ""}
                          style={{ border: "none", outline: "none", background: "transparent", flex: 1, minWidth: "80px", fontSize: "13px", color: isDarkMode ? "#f8fafc" : "#1f2937" }} 
                        />
                      </div>
                    </div>

                    <div style={{ height: "1px", backgroundColor: isDarkMode ? "#334155" : "#e5e7eb", margin: "20px 0" }} />

                    {/* Status Publish */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Status</label>
                      <select 
                        style={{...styles.formInput, cursor: 'pointer'}} 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                      >
                        <option value="Publish">Langsung Publish</option>
                        <option value="Draft">Simpan Draft</option>
                        <option value="Scheduled">Jadwalkan</option>
                      </select>
                    </div>

                    {/* Schedule Date (Hanya muncul jika status Scheduled) */}
                    {formData.status === "Scheduled" && (
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Tanggal Terbit</label>
                        <input 
                          type="datetime-local" 
                          style={styles.formInput} 
                          value={formData.scheduleDate} 
                          onChange={(e) => setFormData({...formData, scheduleDate: e.target.value})} 
                          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                          onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                        />
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}