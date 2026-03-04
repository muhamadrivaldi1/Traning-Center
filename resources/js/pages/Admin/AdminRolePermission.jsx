import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  ShieldCheck, Key, Save, AlertTriangle, 
  Check, X, Layers, Lock, Info, ChevronRight
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminRolePermission() {
  const navigate = useNavigate();

  // --- STATE NAVBAR & THEME ---
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // --- MOCK DATA ROLES & MODULES ---
  const roles = ["Super Admin", "Admin Pelatihan", "Admin Berita", "Assessor", "Guest"];
  
  const modules = [
    { id: "dashboard", name: "Dashboard & Analitik" },
    { id: "konten", name: "Konten Website (Pages, Berita)" },
    { id: "pelatihan", name: "Manajemen Pelatihan" },
    { id: "peserta", name: "Data Peserta & Nilai" },
    { id: "sertifikat", name: "Sertifikat & Template" },
    { id: "pengguna", name: "Manajemen Akun" },
    { id: "pengaturan", name: "Pengaturan Sistem" }
  ];

  const actions = ["View", "Create", "Edit", "Delete"];

  // --- STATE PERMISSIONS ---
  const [selectedRole, setSelectedRole] = useState("Admin Pelatihan");
  
  // Simulasi data permission yang tersimpan di database
  const [permissions, setPermissions] = useState({
    "Admin Pelatihan": {
      dashboard: ["View"],
      pelatihan: ["View", "Create", "Edit", "Delete"],
      peserta: ["View", "Create", "Edit", "Delete"],
      sertifikat: ["View", "Create", "Edit"],
      konten: [], pengguna: [], pengaturan: []
    },
    "Admin Berita": {
      dashboard: ["View"],
      konten: ["View", "Create", "Edit", "Delete"],
      pelatihan: [], peserta: [], sertifikat: [], pengguna: [], pengaturan: []
    },
    "Assessor": {
      dashboard: ["View"],
      peserta: ["View", "Edit"], // Bisa melihat dan edit nilai/status kelulusan
      pelatihan: ["View"],
      sertifikat: [], konten: [], pengguna: [], pengaturan: []
    },
    "Guest": {
      dashboard: ["View"], pelatihan: ["View"], peserta: ["View"], konten: ["View"],
      sertifikat: [], pengguna: [], pengaturan: []
    }
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
  const handleTogglePermission = (moduleId, action) => {
    if (selectedRole === "Super Admin") return; 

    setPermissions(prev => {
      const rolePerms = prev[selectedRole] || {};
      const modPerms = rolePerms[moduleId] || [];
      
      let newModPerms;
      if (modPerms.includes(action)) {
        newModPerms = modPerms.filter(a => a !== action);
      } else {
        newModPerms = [...modPerms, action];
        if (action !== "View" && !newModPerms.includes("View")) {
          newModPerms.push("View");
        }
      }

      return {
        ...prev,
        [selectedRole]: { ...rolePerms, [moduleId]: newModPerms }
      };
    });
  };

  const handleSave = () => {
    console.log(`Menyimpan permission untuk ${selectedRole}:`, permissions[selectedRole]);
    alert(`Hak akses untuk ${selectedRole} berhasil diperbarui!`);
  };

  const isChecked = (moduleId, action) => {
    if (selectedRole === "Super Admin") return true;
    const rolePerms = permissions[selectedRole];
    return rolePerms && rolePerms[moduleId] && rolePerms[moduleId].includes(action);
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
          --bg-hover: #f8fafc;
          --bg-active: #eff6ff;
          --border-table: #e2e8f0;
          --checkbox-bg: #ffffff;
        }

        .dark-theme {
          --bg-card: #1e293b;
          --bg-app: #0f172a;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --bg-hover: rgba(255, 255, 255, 0.05);
          --bg-active: rgba(59, 130, 246, 0.15);
          --border-table: #334155;
          --checkbox-bg: #0f172a;
        }

        .role-list-card { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); padding: 24px; }
        .role-item { padding: 16px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 12px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: space-between; }
        .role-item:hover { border-color: #3b82f6; background: var(--bg-hover); }
        .role-item.active { border-color: #3b82f6; background: var(--bg-active); box-shadow: 0 4px 12px rgba(59,130,246,0.1); }
        .role-title { font-size: 14px; font-weight: 700; color: var(--text-main); }
        .role-desc { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

        .matrix-card { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .matrix-table { width: 100%; border-collapse: collapse; margin-top: 24px; }
        .matrix-table th { padding: 12px 16px; font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; border-bottom: 2px solid var(--border-table); text-align: center; }
        .matrix-table th:first-child { text-align: left; }
        .matrix-table td { padding: 16px; border-bottom: 1px solid var(--border-table); vertical-align: middle; }
        
        .module-name { font-size: 14px; font-weight: 600; color: var(--text-main); display: flex; align-items: center; gap: 8px; }

        /* Custom Checkbox Toggle Stylings */
        .perm-checkbox { display: none; }
        .perm-label { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; border: 2px solid var(--border-color); cursor: pointer; transition: 0.2s; background: var(--checkbox-bg); }
        .perm-checkbox:checked + .perm-label { background: #3b82f6; border-color: #3b82f6; color: white; }
        .perm-label.locked { background: var(--border-color); border-color: var(--border-color); color: var(--text-muted); cursor: not-allowed; }
        .perm-checkbox:checked + .perm-label.locked { background: var(--text-muted); border-color: var(--text-muted); color: white; }

        .btn-primary { width: 100%; background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
        .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
        
        /* Modifikasi Alert agar Dark Mode Friendly */
        .alert-box { padding: 16px; border-radius: 12px; display: flex; gap: 12px; font-size: 13px; line-height: 1.5; margin-bottom: 24px; color: var(--text-main); }
        .alert-info { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); }
        .alert-warning { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); }
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
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Role & Permission</h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Atur hak akses secara detail (Create, Read, Update, Delete) untuk setiap Role</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '32px', alignItems: 'start' }}>
            
            {/* --- KOLOM KIRI: LIST ROLES --- */}
            <div className="role-list-card">
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                Pilih Role
              </h3>
              
              {roles.map(role => (
                <div 
                  key={role} 
                  className={`role-item ${selectedRole === role ? 'active' : ''}`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div>
                    <div className="role-title">{role}</div>
                    <div className="role-desc">
                      {role === "Super Admin" ? "Akses tidak terbatas" : `Kustomisasi akses modul`}
                    </div>
                  </div>
                  {role === "Super Admin" ? <Lock size={16} className="text-gray-400" /> : <ChevronRight size={16} className={selectedRole === role ? 'text-blue-500' : 'text-gray-400'} />}
                </div>
              ))}
            </div>

            {/* --- KOLOM KANAN: PERMISSION MATRIX --- */}
            <div className="matrix-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={28} className="text-blue-500"/> Akses: {selectedRole}
                </h2>
                {selectedRole !== "Super Admin" && (
                  <button className="btn-primary" style={{ width: 'auto', padding: '10px 20px' }} onClick={handleSave}>
                    <Save size={18}/> Simpan Hak Akses
                  </button>
                )}
              </div>

              {selectedRole === "Super Admin" ? (
                <div className="alert-box alert-warning" style={{ marginTop: '24px' }}>
                  <Lock size={20} className="shrink-0 text-amber-500"/>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px', color: '#f59e0b' }}>Akses Terkunci (Sistem)</strong>
                    Role Super Admin memiliki akses penuh ke seluruh modul sistem dan tidak dapat dimodifikasi untuk mencegah kehilangan akses tingkat tinggi.
                  </div>
                </div>
              ) : (
                <div className="alert-box alert-info" style={{ marginTop: '24px' }}>
                  <Info size={20} className="shrink-0 text-blue-500"/>
                  <div>Centang kotak di bawah untuk memberikan izin pada role <strong>{selectedRole}</strong>. Pengguna yang memiliki role ini akan otomatis mengikuti aturan matriks berikut saat login.</div>
                </div>
              )}

              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Modul Sistem</th>
                    {actions.map(a => <th key={a}>{a}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {modules.map(mod => (
                    <tr key={mod.id}>
                      <td>
                        <div className="module-name">
                          <Layers size={16} className="text-slate-400"/> {mod.name}
                        </div>
                      </td>
                      {actions.map(action => {
                        const checked = isChecked(mod.id, action);
                        const isLocked = selectedRole === "Super Admin";
                        
                        return (
                          <td key={`${mod.id}-${action}`} style={{ textAlign: 'center' }}>
                            <label style={{ display: 'inline-block' }}>
                              <input 
                                type="checkbox" 
                                className="perm-checkbox"
                                checked={checked}
                                onChange={() => handleTogglePermission(mod.id, action)}
                                disabled={isLocked}
                              />
                              <div className={`perm-label ${isLocked ? 'locked' : ''}`}>
                                {checked && <Check size={14} />}
                              </div>
                            </label>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}