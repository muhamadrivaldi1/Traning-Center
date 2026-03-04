import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  Upload, Save, RotateCcw, Eye, Layout, Info, 
  Image as ImageIcon, ChevronRight, Users,
  QrCode, 
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminCertificateTemplate() {
  const navigate = useNavigate();
  const bgInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const ttd1InputRef = useRef(null);
  const ttd2InputRef = useRef(null);

  // --- STATE NAVBAR & THEME ---
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // --- STATE TEMPLATE ---
  const [templateSettings, setTemplateSettings] = useState({
    formatNomor: "TCF/{{YYYY}}/{{ID}}",
    bgPreview: null,
    logoPreview: null,
    ttd1_nama: "Nama, M.Kom",
    ttd1_jabatan: "Direktur Filkom",
    ttd1_preview: null,
    ttd2_nama: "Nama, S.T",
    ttd2_jabatan: "Instruktur Pelatihan",
    ttd2_preview: null
  });

  // --- LOGIC THEME & SESSION ---
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

  const previewValues = {
    NAMA: "Intan",
    PELATIHAN: "Fullstack Laravel Bootcamp",
    TANGGAL: "28 Feb 2026",
    ID: "001",
    YYYY: "2026",
  };
  
  const formattedNomor = templateSettings.formatNomor.replace(/\{\{(\w+)\}\}/g, (_, key) => previewValues[key] || `{{${key}}}`);

  // --- HANDLERS ---
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = URL.createObjectURL(file);
      setTemplateSettings(prev => ({ ...prev, [`${type}Preview`]: reader }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Menyimpan template:", templateSettings);
    alert("Template berhasil disimpan!");
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
          --input-bg: #ffffff;
          --bg-hover: #f8fafc;
        }

        .dark-theme {
          --bg-card: #1e293b;
          --bg-app: #0f172a;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --input-bg: #0f172a;
          --bg-hover: #0f172a;
        }

        .admin-form-card { background: var(--bg-card); border-radius: 16px; padding: 28px; border: 1px solid var(--border-color); margin-bottom: 24px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .admin-form-label { display: block; font-size: 11px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .admin-form-input { width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; outline: none; background: var(--input-bg); color: var(--text-main); transition: 0.2s; }
        .admin-form-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        
        .btn-blue-primary { width: 100%; justify-content: center; background: #3b82f6; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; outline: none; }
        .btn-blue-primary:hover { background: #2563eb; }

        .preview-sticky { position: sticky; top: 24px; }
        
        /* Area Sertifikat Sengaja Dikunci Tetap Terang/Putih */
        .cert-preview-wrapper { 
          width: 100%; 
          aspect-ratio: 1.414 / 1; 
          background: #ffffff !important; 
          border-radius: 12px; 
          position: relative; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          padding: 30px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .cert-bg-layer { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 1; background-color: #f8fafc; }
        .cert-content-layer { position: relative; z-index: 3; text-align: center; width: 90%; height: 100%; display: flex; flex-direction: column; align-items: center; }
        
        .signature-img { height: 50px; object-fit: contain; margin-bottom: 5px; }
        .qr-placeholder { width: 60px; height: 60px; background: #fff; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; padding: 5px; }
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
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Template Sertifikat</h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Konfigurasi aset visual dan detail penandatangan sertifikat</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '32px', alignItems: 'start' }}>

            {/* --- EDITOR PANEL --- */}
            <div>
              <div className="admin-form-card">
                <h3 className="flex items-center gap-2 font-bold mb-6" style={{ color: 'var(--text-main)' }}>Assets & Format</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  
                  {/* Upload BG Box */}
                  <div 
                    onClick={() => bgInputRef.current.click()} 
                    style={{ 
                      border: '2px dashed #3b82f6', 
                      borderRadius: '12px', 
                      padding: '16px', 
                      textAlign: 'center', 
                      background: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      minHeight: '80px',
                      gap: '6px',
                      transition: '0.2s'
                    }}
                  >
                    <Upload size={20} className="text-blue-500" />
                    {templateSettings.bgPreview && (
                      <img src={templateSettings.bgPreview} style={{ maxHeight: '40px', borderRadius: '6px' }} />
                    )}
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6' }}>
                      {templateSettings.bgPreview ? "Ganti BG" : "Upload BG"}
                    </span>
                    <input type="file" ref={bgInputRef} hidden onChange={(e) => handleFileChange(e, 'bg')} />
                  </div>

                  {/* Upload Logo Box */}
                  <div 
                    onClick={() => logoInputRef.current.click()} 
                    style={{ 
                      border: '2px dashed #10b981', 
                      borderRadius: '12px', 
                      padding: '16px', 
                      textAlign: 'center', 
                      background: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : '#ecfdf5', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      minHeight: '80px',
                      gap: '6px',
                      transition: '0.2s'
                    }}
                  >
                    <Upload size={20} className="text-green-500" />
                    {templateSettings.logoPreview && (
                      <img src={templateSettings.logoPreview} style={{ maxHeight: '40px', borderRadius: '6px' }} />
                    )}
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#10b981' }}>
                      {templateSettings.logoPreview ? "Ganti Logo" : "Upload Logo"}
                    </span>
                    <input type="file" ref={logoInputRef} hidden onChange={(e) => handleFileChange(e, 'logo')} />
                  </div>
                </div>

                <label className="admin-form-label">Format Nomor Sertifikat</label>
                <input 
                  className="admin-form-input" 
                  name="formatNomor"
                  value={templateSettings.formatNomor} 
                  onChange={handleInputChange}
                />
              </div>

              {/* EDITOR TANDA TANGAN */}
              <div className="admin-form-card">
                <h3 className="flex items-center gap-2 font-bold mb-6" style={{ color: 'var(--text-main)' }}>Penandatangan</h3>
                
                {/* TTD 1 */}
                <div style={{ marginBottom: '20px', padding: '15px', background: 'var(--bg-hover)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                      <label className="admin-form-label">Nama & Jabatan TTD 1</label>
                      <input className="admin-form-input mb-2" name="ttd1_nama" value={templateSettings.ttd1_nama} onChange={handleInputChange} placeholder="Nama Lengkap"/>
                      <input className="admin-form-input" name="ttd1_jabatan" value={templateSettings.ttd1_jabatan} onChange={handleInputChange} placeholder="Jabatan"/>
                    </div>
                    <div onClick={() => ttd1InputRef.current.click()} style={{ width: '80px', height: '80px', border: '1px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'var(--bg-card)' }}>
                      {templateSettings.ttd1Preview ? <img src={templateSettings.ttd1Preview} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <Upload size={16} color="var(--text-muted)"/>}
                      <input type="file" ref={ttd1InputRef} hidden onChange={(e) => handleFileChange(e, 'ttd1')}/>
                    </div>
                  </div>
                </div>

                {/* TTD 2 */}
                <div style={{ padding: '15px', background: 'var(--bg-hover)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div className="flex gap-4">
                    <div style={{ flex: 1 }}>
                      <label className="admin-form-label">Nama & Jabatan TTD 2</label>
                      <input className="admin-form-input mb-2" name="ttd2_nama" value={templateSettings.ttd2_nama} onChange={handleInputChange} placeholder="Nama Lengkap"/>
                      <input className="admin-form-input" name="ttd2_jabatan" value={templateSettings.ttd2_jabatan} onChange={handleInputChange} placeholder="Jabatan"/>
                    </div>
                    <div onClick={() => ttd2InputRef.current.click()} style={{ width: '80px', height: '80px', border: '1px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'var(--bg-card)' }}>
                      {templateSettings.ttd2Preview ? <img src={templateSettings.ttd2Preview} style={{maxWidth:'100%', maxHeight:'100%'}}/> : <Upload size={16} color="var(--text-muted)"/>}
                      <input type="file" ref={ttd2InputRef} hidden onChange={(e) => handleFileChange(e, 'ttd2')}/>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-blue-primary shadow-lg" onClick={handleSave}>
                <Save size={18}/> Simpan Template
              </button>
            </div>

            {/* --- PREVIEW PANEL --- */}
            <div className="preview-sticky">
              <div className="cert-preview-wrapper shadow-xl">
                <div className="cert-bg-layer" style={{ backgroundImage: `url(${templateSettings.bgPreview || ''})` }}></div>
                <div className="cert-content-layer">
                  <div style={{ marginTop: '10px', height: '50px' }}>
                    {templateSettings.logoPreview && <img src={templateSettings.logoPreview} style={{height:'100%'}}/>}
                  </div>

                  <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#1e293b', tracking: '2px', textTransform: 'uppercase', marginTop: '20px' }}>Sertifikat Pelatihan</h2>
                  <p style={{ fontSize: '8px', color: '#64748b', fontWeight: 800, marginBottom: '20px' }}>No: {formattedNomor}</p>
                  
                  <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>Diberikan kepada:</p>
                  <h3 style={{ fontSize: '28px', color: '#1e40af', fontWeight: 800, borderBottom: '2px solid #f1f5f9', paddingBottom: '5px', marginBottom: '15px', width: '100%' }}>{previewValues.NAMA}</h3>
                  
                  <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>Telah menyelesaikan pelatihan <strong>{previewValues.PELATIHAN}</strong><br/>pada tanggal {previewValues.TANGGAL}</p>

                  {/* AREA TANDA TANGAN & QR CODE */}
                  <div style={{ marginTop: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', paddingBottom: '20px' }}>
                    {/* TTD KIRI */}
                    <div style={{ textAlign: 'center', width: '150px' }}>
                      {templateSettings.ttd1Preview && <img src={templateSettings.ttd1Preview} className="signature-img"/>}
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>{templateSettings.ttd1_nama}</div>
                      <div style={{ width: '100%', borderBottom: '1px solid #cbd5e1', margin: '2px 0 4px' }}></div>
                      <span style={{ fontSize: '8px', fontWeight: 700, color: '#94a3b8' }}>{templateSettings.ttd1_jabatan}</span>
                    </div>

                    {/* QR CODE DI TENGAH */}
                    <div className="qr-placeholder shadow-sm">
                      <QrCode size={45} color="#1e293b" />
                    </div>

                    {/* TTD KANAN */}
                    <div style={{ textAlign: 'center', width: '150px' }}>
                      {templateSettings.ttd2Preview && <img src={templateSettings.ttd2Preview} className="signature-img"/>}
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>{templateSettings.ttd2_nama}</div>
                      <div style={{ width: '100%', borderBottom: '1px solid #cbd5e1', margin: '2px 0 4px' }}></div>
                      <span style={{ fontSize: '8px', fontWeight: 700, color: '#94a3b8' }}>{templateSettings.ttd2_jabatan}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}