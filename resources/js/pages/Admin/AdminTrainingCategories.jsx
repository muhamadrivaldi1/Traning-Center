import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  Plus, Search, Trash2, Edit2, Tag, Info, 
  Layers, CheckCircle, AlertCircle, ChevronRight
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminTrainingCategories() {
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

  // --- DATA MOCK (Untuk Auto Count) ---
  const trainings = [
    { id: 1, name: "Web Dev Bootcamp 2026", category: "Web Dev" },
    { id: 2, name: "UI/UX Advanced Design", category: "Design" },
    { id: 3, name: "React Framework Master", category: "Web Dev" },
    { id: 4, name: "Cyber Security Pro", category: "Security" },
  ];

  const [categories, setCategories] = useState([
    { id: 1, name: "Web Dev", desc: "Pelatihan pengembangan website dan backend.", status: "Aktif" },
    { id: 2, name: "Design", desc: "Cakupan UI/UX, Graphic Design, dan Product Design.", status: "Aktif" },
    { id: 3, name: "Security", desc: "Keamanan siber dan jaringan komputer.", status: "Nonaktif" },
  ]);

  // --- LOGIC FORM ---
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditCategory = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <>
      <style>{`
        /* CSS VARIABEL TEMA */
        :root {
          --bg-card: #ffffff;
          --bg-app: #f6f7fb;
          --text-main: #111827;
          --text-muted: #6b7280;
          --border-color: #e5e7eb;
          --bg-table-head: #f9fafb;
          --bg-hover: #f9fafb;
          --input-bg: #ffffff;
          --info-bg: #f8fafc;
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
          --info-bg: rgba(59, 130, 246, 0.05);
        }

        .category-table-container { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .category-table { width: 100%; border-collapse: collapse; }
        .category-table th { padding: 16px 24px; font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; text-align: left; background: var(--bg-table-head); border-bottom: 1px solid var(--border-color); }
        .category-table td { padding: 20px 24px; border-bottom: 1px solid var(--border-color); }
        .category-table tbody tr { transition: background 0.2s; }
        .category-table tbody tr:hover { background-color: var(--bg-hover); }
        
        .count-badge { background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 800; border: 1px solid rgba(59, 130, 246, 0.2); display: inline-flex; align-items: center; gap: 6px; }
        
        .status-pill { padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-aktif { background: rgba(22, 163, 74, 0.15); color: #16a34a; }
        .status-nonaktif { background: rgba(220, 38, 38, 0.15); color: #dc2626; }

        .form-sticky { position: sticky; top: 24px; }
        
        .admin-form-card { 
            background: var(--bg-card); 
            border-radius: 16px; 
            padding: 32px; 
            border: 1px solid var(--border-color); 
        }

        .admin-form-title { 
            font-size: 16px; 
            font-weight: 700; 
            margin-bottom: 20px; 
            display: flex; 
            align-items: center; 
            gap: 10px; 
            color: var(--text-main); 
        }

        .admin-form-label { 
            display: block; 
            font-size: 12px; 
            font-weight: 700; 
            color: var(--text-muted); 
            margin-bottom: 8px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
        }

        .admin-form-input { 
            width: 100%; 
            box-sizing: border-box;
            padding: 12px 16px; 
            border: 1px solid var(--border-color); 
            border-radius: 10px; 
            font-size: 14px; 
            outline: none; 
            transition: 0.2s; 
            background: var(--input-bg); 
            color: var(--text-main);
        }

        .admin-form-input:focus { 
            border-color: #3b82f6; 
            box-shadow: 0 0 0 3px rgba(59,130,246,0.1); 
        }

        .btn-blue-primary { 
          background: #3b82f6; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 10px; 
          font-weight: 600; 
          font-size: 14px; 
          cursor: pointer; 
          outline: none; 
          transition: 0.2s; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          width: 100%;
          margin-bottom: 10px;
          justify-content: center;
        }

        .btn-blue-primary:hover { 
          background: #2563eb; 
          transform: translateY(-1px); 
        }

        .btn-white-outline { 
          background: var(--bg-card); 
          color: var(--text-main); 
          border: 1px solid var(--border-color); 
          padding: 10px 18px; 
          border-radius: 10px; 
          font-weight: 600; 
          font-size: 13px; 
          cursor: pointer; 
          transition: 0.2s; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          width: 100%;
          justify-content: center;
        }

        .btn-white-outline:hover { 
          background: var(--bg-hover); 
          border-color: var(--text-muted); 
        }
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
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Kategori Pelatihan</h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Kelola pengelompokan jenis pelatihan yang tersedia</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
            
            {/* --- KOLOM KIRI: TABEL KATEGORI --- */}
            <div>
              <div className="category-table-container">
                <table className="category-table">
                  <thead>
                    <tr>
                      <th>Nama Kategori</th>
                      <th style={{ textAlign: 'center' }}>Jumlah Pelatihan</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => {
                      const trainingCount = trainings.filter(t => t.category === cat.name).length;
                      return (
                        <tr key={cat.id}>
                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '14.5px' }}>{cat.name}</div>
                            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>{cat.desc}</div>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <span className="count-badge">
                              <Layers size={14}/>
                              {trainingCount} Materi
                            </span>
                          </td>
                          <td>
                            <span className={`status-pill ${cat.status === 'Aktif' ? 'status-aktif' : 'status-nonaktif'}`}>
                              {cat.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                              <button 
                                onClick={() => handleEditCategory(cat)}
                                style={{ padding: '8px', border: 'none', background: 'transparent', color: '#3b82f6', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                <Edit2 size={18}/>
                              </button>
                              <button 
                                style={{ padding: '8px', border: 'none', background: 'transparent', color: '#ef4444', borderRadius: '8px', cursor: 'pointer' }}
                              >
                                <Trash2 size={18}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- KOLOM KANAN: FORM (STICKY) --- */}
            <div className="form-sticky">
              <div className="admin-form-card shadow-lg" style={{ border: selectedCategory ? '1.5px solid #fbbf24' : '1px solid var(--border-color)' }}>
                <h2 className="admin-form-title" style={{ fontSize: '18px' }}>
                  {selectedCategory ? <Edit2 size={20} className="text-amber-500" /> : <Plus size={20} className="text-blue-500" />}
                  {selectedCategory ? 'Edit Kategori' : 'Kategori Baru'}
                </h2>
                
                <div style={{ marginTop: '24px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label className="admin-form-label">Nama Kategori</label>   
                    <input 
                      className="admin-form-input" 
                      placeholder="Misal: Web Dev, Mobile..." 
                      defaultValue={selectedCategory?.name || ''} 
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label className="admin-form-label">Deskripsi</label>
                    <textarea 
                      className="admin-form-input" 
                      rows="4" 
                      placeholder="Jelaskan cakupan kategori..." 
                      defaultValue={selectedCategory?.desc || ''}
                    ></textarea>
                  </div>
                  
                  <div style={{ marginBottom: '28px' }}>
                    <label className="admin-form-label">Status</label>
                    <select className="admin-form-input" defaultValue={selectedCategory?.status || 'Aktif'}>
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="btn-blue-primary w-full justify-center shadow-md">
                      {selectedCategory ? 'Simpan Perubahan' : 'Tambah Kategori'}
                    </button>
                    {selectedCategory && (
                      <button 
                        className="btn-white-outline w-full justify-center" 
                        onClick={() => setSelectedCategory(null)}
                      >
                        Batal Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* TIPS INFO */}
              {!selectedCategory && (
                <div style={{ marginTop: '20px', padding: '16px', background: 'var(--info-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
                  <Info size={20} className="text-blue-400" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                    Jumlah pelatihan dihitung otomatis berdasarkan pelatihan yang terdaftar menggunakan nama kategori ini.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}