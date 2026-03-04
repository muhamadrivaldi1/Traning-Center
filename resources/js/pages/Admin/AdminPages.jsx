import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { 
  PlusCircle, Edit, Trash2, ArrowLeft, Image as ImageIcon, 
  Save, CheckCircle, Clock, Search, Filter, Eye
} from "lucide-react";
import "../../../css/app.css";

// ============================================
// STYLE GENERATOR - Mendukung Dark Mode
// ============================================
const getStyles = (isDark) => ({
  dashboardContainer: {
    padding: "24px",
    backgroundColor: isDark ? "#0f172a" : "transparent",
    minHeight: "100vh"
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "24px",
    paddingBottom: "24px",
    marginBottom: "24px",
    borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    flexWrap: "wrap",
  },
  dashboardTitleSection: {
    flex: 1,
  },
  dashboardTitle: {
    fontSize: "28px",
    fontWeight: "800", // Dipertebal sesuai permintaan
    color: isDark ? "#f8fafc" : "#1f2937",
    margin: "0 0 8px 0",
  },
  dashboardSubtitle: {
    fontSize: "14px",
    color: isDark ? "#94a3b8" : "#6b7280",
    margin: 0,
  },
  actionButtons: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  autoSaveIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: isDark ? "#94a3b8" : "#6b7280",
    padding: "8px 12px",
    backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
    borderRadius: "10px",
  },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  btnPrimary: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
  },
  btnSecondary: {
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    color: isDark ? "#e2e8f0" : "#1f2937",
    border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
  },
  btnIconOnly: {
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    borderRadius: "16px",
    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  cardContent: {
    padding: "24px",
  },
  searchFilterBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  searchWrapper: {
    position: "relative",
    flex: "1 1 250px",
  },
  searchInput: {
    width: "100%",
    padding: "10px 12px 10px 40px",
    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    borderRadius: "10px",
    fontSize: "14px",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    color: isDark ? "#f8fafc" : "#1f2937",
    transition: "all 0.2s",
    outline: "none",
  },
  filterSelect: {
    padding: "10px 16px",
    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    borderRadius: "10px",
    fontSize: "14px",
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    color: isDark ? "#f8fafc" : "#1f2937",
    cursor: "pointer",
    outline: "none",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "700",
    color: isDark ? "#94a3b8" : "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
  },
  td: {
    padding: "16px",
    fontSize: "14px",
    color: isDark ? "#e2e8f0" : "#1f2937",
    borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    verticalAlign: "middle",
  },
  tableRow: {
    transition: "backgroundColor 0.2s",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  badgePublish: {
    backgroundColor: isDark ? "rgba(22, 163, 74, 0.2)" : "#dcfce7",
    color: isDark ? "#4ade80" : "#16a34a",
  },
  badgeDraft: {
    backgroundColor: isDark ? "rgba(217, 119, 6, 0.2)" : "#fef3c7",
    color: isDark ? "#fbbf24" : "#d97706",
  },
  iconBtn: {
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  iconBtnEdit: { color: "#3b82f6" },
  iconBtnDelete: { color: "#ef4444" },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "24px",
  },
  formGridMain: { gridColumn: "span 2" },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "24px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "700",
    color: isDark ? "#cbd5e1" : "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  formInput: {
    width: "100%",             // <-- Tambahkan ini
    boxSizing: "border-box",   // <-- Tambahkan ini agar padding rapi
    padding: "12px 16px",
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    borderRadius: "10px",
    fontSize: "14px",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    color: isDark ? "#f8fafc" : "#0f172a",
    transition: "all 0.2s",
    outline: "none",
  },
  formTextarea: {
    width: "100%",             // <-- Tambahkan ini
    boxSizing: "border-box",   // <-- Tambahkan ini 
    padding: "12px 16px",
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
    borderRadius: "10px",
    fontSize: "14px",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    color: isDark ? "#f8fafc" : "#0f172a",
    resize: "vertical",
    minHeight: "200px",
    fontFamily: "inherit",
    outline: "none",
  },
  editorToolbar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
  },
  editorButton: {
    padding: "6px 12px",
    border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
    borderRadius: "6px",
    backgroundColor: isDark ? "#1e293b" : "#ffffff",
    color: isDark ? "#cbd5e1" : "#475569",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  fileUpload: {
    border: `2px dashed ${isDark ? '#475569' : '#cbd5e1'}`,
    borderRadius: "12px",
    padding: "32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    borderRadius: "12px",
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
  },
  seoPreview: {
    backgroundColor: isDark ? "#0f172a" : "#f8fafc",
    padding: "16px",
    borderRadius: "12px",
    border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
  },
  seoPreviewUrl: {
    fontSize: "12px",
    color: isDark ? "#94a3b8" : "#6b7280",
    marginBottom: "8px",
    wordBreak: "break-word",
  },
  seoPreviewTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: isDark ? "#60a5fa" : "#1e40af",
    marginBottom: "8px",
    cursor: "pointer",
  },
  seoPreviewDesc: {
    fontSize: "13px",
    color: isDark ? "#cbd5e1" : "#475569",
    lineHeight: "1.5",
  },
  counter: {
    fontSize: "12px",
    color: isDark ? "#94a3b8" : "#6b7280",
    textAlign: "right",
    marginTop: "4px",
  },
  counterWarning: { color: "#ef4444" },
  stickySidebar: {
    position: "sticky",
    top: "100px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: isDark ? "#f8fafc" : "#1f2937",
    paddingBottom: "16px",
    marginBottom: "16px",
    borderBottom: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
    margin: 0,
  },
  sectionSubtitle: {
    fontSize: "12px",
    color: isDark ? "#94a3b8" : "#6b7280",
    marginTop: "4px",
    fontWeight: "normal"
  },
});

// ============================================
// COMPONENT
// ============================================
export default function AdminPages() {
  const navigate = useNavigate();

  // STATE NAVBAR & THEME
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

  // Panggil getStyles dengan state isDarkMode saat ini
  const styles = getStyles(isDarkMode);

  // STATE HALAMAN PAGES
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [autoSaveTime, setAutoSaveTime] = useState("");

  const [pages, setPages] = useState([
    { id: 1, title: "Tentang Kami", slug: "tentang-kami", status: "Publish", lastUpdate: "12 Feb 2026" },
    { id: 2, title: "Syarat & Ketentuan", slug: "syarat-ketentuan", status: "Publish", lastUpdate: "10 Feb 2026" },
    { id: 3, title: "Kebijakan Privasi", slug: "kebijakan-privasi", status: "Draft", lastUpdate: "01 Feb 2026" },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDesc: "",
    status: "Draft",
    banner: null,
  });

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    const slugVal = titleVal
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setFormData({ ...formData, title: titleVal, slug: slugVal, metaTitle: titleVal });
  };

  useEffect(() => {
    if (viewMode === "form" && formData.title) {
      const timer = setTimeout(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        setAutoSaveTime(`Draft tersimpan otomatis pukul ${hours}:${minutes}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formData, viewMode]);

  const handleSave = () => {
    alert(`Halaman "${formData.title}" berhasil disimpan!`);
    setViewMode("table");
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus halaman ini?")) {
      setPages(pages.filter((page) => page.id !== id));
    }
  };

  const handleEdit = (page) => {
    setFormData({
      title: page.title,
      slug: page.slug,
      content: "",
      metaTitle: page.title,
      metaDesc: "",
      status: page.status,
      banner: null,
    });
    setViewMode("form");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      metaTitle: "",
      metaDesc: "",
      status: "Draft",
      banner: null,
    });
    setAutoSaveTime("");
  };

  const filteredPages = pages.filter((page) => {
    const matchSearch =
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || page.status === statusFilter;
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

        {/* CONTENT AREA */}
        <div style={styles.dashboardContainer}>
          {/* HEADER */}
          <div style={styles.dashboardHeader}>
            <div style={styles.dashboardTitleSection}>
              <h1 style={styles.dashboardTitle}>
                {viewMode === "table" ? "Kelola Halaman" : "Tambah / Edit Halaman"}
              </h1>
              <p style={styles.dashboardSubtitle}>
                {viewMode === "table"
                  ? "Manajemen halaman statis website"
                  : "Lengkapi data konten dan SEO halaman"}
              </p>
            </div>

            <div style={styles.actionButtons}>
              {viewMode === "table" ? (
                <button
                  style={{ ...styles.btn, ...styles.btnPrimary }}
                  onClick={() => {
                    resetForm();
                    setViewMode("form");
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                >
                  <PlusCircle size={18} /> Tambah Halaman
                </button>
              ) : (
                <>
                  {autoSaveTime && <div style={styles.autoSaveIndicator}>{autoSaveTime}</div>}
                  <button
                    style={{ ...styles.btn, ...styles.btnSecondary }}
                    onClick={() => alert("Membuka tab preview...")}
                  >
                    <Eye size={18} /> Preview
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.btnPrimary }}
                    onClick={handleSave}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                  >
                    <Save size={18} /> Simpan
                  </button>
                  <button
                    style={{ ...styles.btn, ...styles.btnSecondary, ...styles.btnIconOnly }}
                    onClick={() => setViewMode("table")}
                  >
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
                    <Search
                      size={18}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: isDarkMode ? "#64748b" : "#94a3b8",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Cari judul atau slug..."
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
                    >
                      <option value="All">Semua Status</option>
                      <option value="Publish">Publish</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Judul Halaman</th>
                        <th style={styles.th}>Slug / URL</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Terakhir Update</th>
                        <th style={{ ...styles.th, textAlign: "center" }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPages.length > 0 ? (
                        filteredPages.map((page) => (
                          <tr
                            key={page.id}
                            style={styles.tableRow}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = isDarkMode ? "#0f172a" : "#f8fafc")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "transparent")
                            }
                          >
                            <td style={styles.td}>
                              <strong style={{ color: isDarkMode ? "#f8fafc" : "#111827" }}>{page.title}</strong>
                            </td>
                            <td style={styles.td}>
                              <code style={{ fontSize: "13px", color: isDarkMode ? "#60a5fa" : "#3b82f6" }}>
                                /{page.slug}
                              </code>
                            </td>
                            <td style={styles.td}>
                              <span
                                style={{
                                  ...styles.badge,
                                  ...(page.status === "Publish"
                                    ? styles.badgePublish
                                    : styles.badgeDraft),
                                }}
                              >
                                {page.status === "Publish" ? (
                                  <CheckCircle size={12} />
                                ) : (
                                  <Clock size={12} />
                                )}
                                {page.status}
                              </span>
                            </td>
                            <td style={styles.td}>{page.lastUpdate}</td>
                            <td style={{ ...styles.td, textAlign: "center" }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  gap: "8px",
                                }}
                              >
                                <button
                                  style={{
                                    ...styles.iconBtn,
                                    ...styles.iconBtnEdit,
                                  }}
                                  onClick={() => handleEdit(page)}
                                  title="Edit"
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = isDarkMode ? "#1e3a8a" : "#eff6ff")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "transparent")
                                  }
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  style={{
                                    ...styles.iconBtn,
                                    ...styles.iconBtnDelete,
                                  }}
                                  onClick={() => handleDelete(page.id)}
                                  title="Hapus"
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = isDarkMode ? "#7f1d1d" : "#fef2f2")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "transparent")
                                  }
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={styles.td}>
                            <div style={{ textAlign: "center", padding: "32px", color: isDarkMode ? "#64748b" : "#94a3b8" }}>
                              Data halaman tidak ditemukan.
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FORM VIEW */}
          {viewMode === "form" && (
            <div style={styles.formGrid}>
              {/* MAIN CONTENT */}
              <div style={styles.formGridMain}>
                <div style={styles.card}>
                  <div style={styles.cardContent}>
                    {/* Title */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        Judul Halaman <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="Masukkan judul halaman..."
                        style={styles.formInput}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                      />
                    </div>

                    {/* Slug */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Slug / URL</label>
                      <div style={{ display: "flex" }}>
                        <span
                          style={{
                            padding: "12px 16px",
                            backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                            borderRight: "none",
                            borderRadius: "10px 0 0 10px",
                            color: isDarkMode ? "#64748b" : "#94a3b8",
                          }}
                        >
                          /
                        </span>
                        <input
                          type="text"
                          value={formData.slug}
                          readOnly
                          style={{
                            ...styles.formInput,
                            borderRadius: "0 10px 10px 0",
                            flex: 1,
                            backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
                            color: isDarkMode ? "#94a3b8" : "#64748b",
                          }}
                        />
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Konten Editor</label>
                      <div
                        style={{
                          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <div style={styles.editorToolbar}>
                          <button style={styles.editorButton} title="Bold">
                            <strong>B</strong>
                          </button>
                          <button style={styles.editorButton} title="Italic">
                            <em>I</em>
                          </button>
                          <button style={styles.editorButton} title="Underline">
                            <u>U</u>
                          </button>
                          <div style={{ width: "1px", height: "24px", backgroundColor: isDarkMode ? "#334155" : "#e5e7eb", margin: "0 4px" }} />
                          <button style={styles.editorButton} title="Link">
                            Link
                          </button>
                        </div>
                        <textarea
                          placeholder="Mulai menulis konten di sini..."
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          style={{
                            ...styles.formTextarea,
                            border: "none",
                            borderRadius: 0,
                          }}
                        />
                      </div>
                    </div>

                    {/* Banner Upload */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Banner Halaman</label>
                      <div
                        style={styles.fileUpload}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = isDarkMode ? "#475569" : "#cbd5e1")}
                      >
                        <ImageIcon
                          size={40}
                          style={{
                            color: isDarkMode ? "#475569" : "#94a3b8",
                            marginBottom: "12px",
                          }}
                        />
                        <p style={{ margin: "0 0 4px 0", fontWeight: "600", color: isDarkMode ? "#60a5fa" : "#3b82f6" }}>
                          Klik untuk upload gambar
                        </p>
                        <p style={{ margin: 0, fontSize: "12px", color: isDarkMode ? "#64748b" : "#94a3b8" }}>
                          Format: JPG, PNG. Rekomendasi 1920x400px
                        </p>
                      </div>
                    </div>

                    {/* Status Toggle */}
                    <div style={styles.toggleContainer}>
                      <div>
                        <p style={{ margin: 0, fontWeight: "700", fontSize: "14px", color: isDarkMode ? "#f8fafc" : "#1e293b" }}>Status Publikasi</p>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: isDarkMode ? "#94a3b8" : "#64748b" }}>
                          Tentukan apakah halaman bisa diakses publik
                        </p>
                      </div>
                      <label style={{ position: "relative", display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={formData.status === "Publish"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              status: e.target.checked ? "Publish" : "Draft",
                            })
                          }
                          style={{
                            appearance: "none",
                            width: "56px",
                            height: "28px",
                            backgroundColor: formData.status === "Publish" ? "#3b82f6" : (isDarkMode ? "#334155" : "#e2e8f0"),
                            borderRadius: "20px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            position: "relative",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            left: formData.status === "Publish" ? "28px" : "2px",
                            width: "24px",
                            height: "24px",
                            backgroundColor: "#ffffff",
                            borderRadius: "50%",
                            transition: "all 0.2s",
                            pointerEvents: "none",
                          }}
                        />
                        <span style={{ marginLeft: "12px", fontWeight: "600", fontSize: "14px", color: isDarkMode ? "#f8fafc" : "#1e293b" }}>
                          {formData.status}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR - SEO & PREVIEW */}
              <div>
                <div style={{ ...styles.card, ...styles.stickySidebar }}>
                  <div style={styles.cardContent}>
                    <h3 style={styles.sectionTitle}>
                      Pengaturan SEO
                      <span style={{ display: 'block', fontSize: '12px', color: isDarkMode ? '#94a3b8' : '#64748b', marginTop: '4px', fontWeight: 'normal' }}>Optimasi mesin pencari</span>
                    </h3>

                    {/* Meta Title */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Meta Title</label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            metaTitle: e.target.value.substring(0, 60),
                          })
                        }
                        placeholder="Judul untuk SEO..."
                        style={styles.formInput}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                      />
                      <div style={{ ...styles.counter, ...(formData.metaTitle.length > 55 ? styles.counterWarning : {}) }}>
                        {formData.metaTitle.length} / 60
                      </div>
                    </div>

                    {/* Meta Description */}
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Meta Description</label>
                      <textarea
                        value={formData.metaDesc}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            metaDesc: e.target.value.substring(0, 160),
                          })
                        }
                        placeholder="Deskripsi singkat halaman..."
                        style={{
                          ...styles.formTextarea,
                          minHeight: "120px",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                        onBlur={(e) => (e.target.style.borderColor = isDarkMode ? "#334155" : "#e2e8f0")}
                      />
                      <div style={{ ...styles.counter, ...(formData.metaDesc.length > 150 ? styles.counterWarning : {}) }}>
                        {formData.metaDesc.length} / 160
                      </div>
                    </div>

                    {/* Google Preview */}
                    <div style={{ marginTop: "24px" }}>
                      <label style={styles.label}>Google Search Preview</label>
                      <div style={styles.seoPreview}>
                        <p style={styles.seoPreviewUrl}>
                          https://filkom.ac.id/ › {formData.slug || "slug"}
                        </p>
                        <h4 style={styles.seoPreviewTitle}>
                          {formData.metaTitle || "Judul Halaman"} | Training Center
                        </h4>
                        <p style={styles.seoPreviewDesc}>
                          {formData.metaDesc ||
                            "Silakan isi meta description untuk melihat preview teks yang akan muncul di hasil pencarian Google."}
                        </p>
                      </div>
                    </div>
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