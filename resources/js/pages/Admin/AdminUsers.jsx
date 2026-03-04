import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  Search, Plus, Edit2, Trash2, ShieldCheck, 
  UserCog, Mail, Clock, Key, AlertCircle, Save, X
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminUsers() {
  const navigate = useNavigate();

  // --- STATE NAVBAR & THEME ---
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Simulasi Role user yang sedang login
  const loggedInUserRole = "Super Admin"; 

  // --- STATE DATA PENGGUNA ---
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua Role");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // MOCK DATA
  const [usersData] = useState([
    { id: 1, name: "Intan Maharani", email: "intan@tcf.id", role: "Super Admin", status: "Aktif", lastLogin: "Hari ini, 08:30" },
    { id: 2, name: "Lorem Ipsum", email: "lorem@tcf.id", role: "Admin Pelatihan", status: "Aktif", lastLogin: "Kemarin, 14:15" },
    { id: 3, name: "Budi Santoso", email: "budi.s@tcf.id", role: "Admin Berita", status: "Nonaktif", lastLogin: "12 Feb 2026" },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", 
    role: "Admin Pelatihan",
    status: "Aktif"
  });

  // --- THEME LOGIC ---
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark-theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // --- HANDLERS ---
  const handleEditClick = (u) => {
    setSelectedUser(u);
    setShowResetPassword(false);
    setFormData({ name: u.name, email: u.email, password: "", role: u.role, status: u.status });
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    setShowResetPassword(false);
    setFormData({ name: "", email: "", password: "", role: "Admin Pelatihan", status: "Aktif" });
  };

  const handleResetPassword = () => {
    if (loggedInUserRole !== "Super Admin") {
      alert("Hanya Super Admin yang dapat mereset password pengguna!");
      return;
    }
    const newPass = prompt(`Masukkan password baru untuk ${selectedUser.name}:`);
    if (newPass) {
      alert(`Password untuk ${selectedUser.email} berhasil direset!`);
    }
  };

  const filteredUsers = usersData.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "Semua Role" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  // Class dinamis untuk badge yang bersahabat dengan dark mode
  const getRoleBadge = (role) => {
    switch(role) {
      case "Super Admin": return "role-super";
      case "Admin Pelatihan": return "role-pelatihan";
      case "Admin Berita": return "role-berita";
      default: return "role-default";
    }
  };

  return (
    <>
      <style>{`
        /* CSS VARIABEL TEMA */
        :root {
          --bg-card: #ffffff;
          --bg-app: #f6f7fb;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --bg-table-head: #f9fafb;
          --bg-hover: #f1f5f9;
          --input-bg: #f8fafc;
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

        .admin-table-card { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { padding: 16px 24px; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; text-align: left; background: var(--bg-table-head); border-bottom: 2px solid var(--border-color); }
        .admin-table td { padding: 18px 24px; border-bottom: 1px solid var(--border-color); font-size: 14px; color: var(--text-main); vertical-align: middle; }
        .admin-table tbody tr { transition: background 0.2s; }
        .admin-table tbody tr:hover { background: var(--bg-hover); }
        
        .role-badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid; display: inline-flex; align-items: center; gap: 4px; }
        .role-super { background-color: rgba(168, 85, 247, 0.15); color: #a855f7; border-color: rgba(168, 85, 247, 0.3); }
        .role-pelatihan { background-color: rgba(59, 130, 246, 0.15); color: #3b82f6; border-color: rgba(59, 130, 246, 0.3); }
        .role-berita { background-color: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3); }
        .role-default { background-color: rgba(100, 116, 139, 0.15); color: #64748b; border-color: rgba(100, 116, 139, 0.3); }

        .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .status-aktif { background-color: #10b981; }
        .status-nonaktif { background-color: #ef4444; }

        .btn-icon { width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; transition: 0.2s; border: none; cursor: pointer; background: transparent; }
        .btn-icon.edit { color: #3b82f6; }
        .btn-icon.edit:hover { background: rgba(59, 130, 246, 0.1); }
        .btn-icon.delete { color: #ef4444; }
        .btn-icon.delete:hover { background: rgba(239, 68, 68, 0.1); }

        .form-sticky { position: sticky; top: 24px; background: var(--bg-card); border-radius: 16px; padding: 28px; border: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .form-label { display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; outline: none; transition: 0.2s; background: var(--input-bg); color: var(--text-main); }
        .form-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        
        .btn-primary { width: 100%; background: #3b82f6; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
        .btn-primary:hover { background: #2563eb; }
        .btn-outline { width: 100%; background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
        .btn-outline:hover { background: var(--bg-hover); }
        .btn-danger-outline { width: 100%; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px dashed #f87171; padding: 10px; border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
        .btn-danger-outline:hover { background: rgba(239, 68, 68, 0.2); }

        .search-wrapper { position: relative; flex: 1; }
        .search-wrapper input { width: 100%; padding: 12px 16px 12px 42px; border: 1px solid var(--border-color); border-radius: 12px; font-size: 13px; outline: none; background: var(--input-bg); color: var(--text-main); }
        .search-wrapper svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .filter-select { padding: 0 16px; border: 1px solid var(--border-color); border-radius: 12px; font-size: 13px; outline: none; min-width: 180px; background: var(--bg-card); color: var(--text-main); cursor: pointer; }
      `}</style>

      <SidebarAdmin isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`} style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
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
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Akun Administrator</h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Kelola data akun, role penugasan, dan reset kredensial login</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>
            
            {/* --- KOLOM KIRI: TABEL AKUN --- */}
            <div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div className="search-wrapper">
                  <Search size={18} />
                  <input type="text" placeholder="Cari nama atau email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <select className="filter-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option>Semua Role</option>
                  <option>Super Admin</option>
                  <option>Admin Pelatihan</option>
                  <option>Admin Berita</option>
                </select>
              </div>

              <div className="admin-table-card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Info Akun</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Log Terakhir</th>
                      <th style={{ textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{u.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}><Mail size={12}/> {u.email}</div>
                        </td>
                        <td><span className={`role-badge ${getRoleBadge(u.role)}`}><ShieldCheck size={12}/> {u.role}</span></td>
                        <td>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: u.status === 'Aktif' ? '#10b981' : '#ef4444' }}>
                            <span className={`status-dot ${u.status === 'Aktif' ? 'status-aktif' : 'status-nonaktif'}`}></span>{u.status}
                          </div>
                        </td>
                        <td><div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {u.lastLogin}</div></td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="btn-icon edit" onClick={() => handleEditClick(u)} title="Edit Pengguna"><Edit2 size={16} /></button>
                          <button className="btn-icon delete" title="Nonaktifkan"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- KOLOM KANAN: FORM AKUN (STICKY) --- */}
            <div className="form-sticky">
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {selectedUser ? <><Edit2 size={20} className="text-blue-500"/> Edit Akun</> : <><Plus size={20} className="text-blue-500"/> Buat Akun Baru</>}
              </h2>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Nama Lengkap</label>
                <input className="form-input" placeholder="Misal: Intan Maharani" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="form-label">Email Login</label>
                <input type="email" className="form-input" placeholder="admin@tcf.id" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Assign Role</label>
                <select className="form-input" style={{ cursor: 'pointer', fontWeight: 600 }} value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin Pelatihan">Admin Pelatihan</option>
                  <option value="Admin Berita">Admin Berita</option>
                </select>
                <p style={{fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px'}}>*Izin akses diatur terpisah di menu Role & Permission.</p>
              </div>

              {/* LOGIKA PASSWORD */}
              {!selectedUser ? (
                <div style={{ marginBottom: '24px' }}>
                  <label className="form-label">Password Awal</label>
                  <input type="password" className="form-input" placeholder="Buat password login..." value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
                </div>
              ) : (
                <div style={{ marginBottom: '24px', padding: '16px', background: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : '#f8fafc', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Key size={16} className="text-amber-500"/>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)' }}>Keamanan Akun</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>Jika pengguna lupa password, Anda dapat melakukan reset. (Khusus Super Admin)</p>
                  <button className="btn-danger-outline" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </div>
              )}

              <div style={{ marginBottom: '32px' }}>
                <label className="form-label">Status Akun</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 600, color: 'var(--text-main)' }}>
                    <input type="radio" checked={formData.status === 'Aktif'} onChange={() => setFormData({...formData, status: 'Aktif'})} /> Aktif
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', color: '#ef4444', fontWeight: 600 }}>
                    <input type="radio" checked={formData.status === 'Nonaktif'} onChange={() => setFormData({...formData, status: 'Nonaktif'})} /> Suspend
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="btn-primary shadow-md">
                  <Save size={18}/> {selectedUser ? "Simpan Perubahan" : "Buat Akun"}
                </button>
                {selectedUser && (
                  <button className="btn-outline" onClick={handleCancelEdit}>
                    <X size={16}/> Batal Edit
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}