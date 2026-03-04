import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  Settings, Globe, Mail, Award, Save, Upload, 
  Send, Server, Shield, Hash, RefreshCw
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminSettings() {
  const navigate = useNavigate();
  const logoInputRef = useRef(null);

  // --- STATE NAVBAR & THEME ---
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // --- STATE TABS & FORM DATA ---
  const [activeTab, setActiveTab] = useState("umum");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Tab Umum
    namaInstansi: "Training Center Filkom",
    deskripsi: "Pusat pelatihan IT dan pengembangan skill profesional berstandar industri.",
    logoPreview: "/images/TCF_Logo.png", // Mockup logo awal
    logoFile: null,

    // Tab Email (SMTP)
    smtpHost: "smtp.googlemail.com",
    smtpPort: "465",
    smtpUser: "admin@tcf.id",
    smtpPass: "********",
    smtpCrypto: "SSL",

    // Tab Format Sertifikat
    certPrefix: "TCF",
    useAutoYear: true,
    resetYearly: true
  });

  // --- LOGIC THEME ---
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
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, logoFile: file, logoPreview: reader }));
    }
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Pengaturan sistem berhasil disimpan!");
    }, 800);
  };

  const handleTestEmail = () => {
    alert(`Mencoba mengirim email tes via ${formData.smtpHost}:${formData.smtpPort}...\n(Silakan cek console untuk log)`);
    console.log("Test Email Config:", { host: formData.smtpHost, port: formData.smtpPort, user: formData.smtpUser });
  };

  // Logic Preview Sertifikat
  const currentYear = new Date().getFullYear();
  const certPreview = `${formData.certPrefix}/${formData.useAutoYear ? currentYear : 'YYYY'}/001`;

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
          --input-bg: #ffffff;
          --tab-bg: #f8fafc;
        }

        .dark-theme {
          --bg-card: #1e293b;
          --bg-app: #0f172a;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --bg-hover: #0f172a;
          --input-bg: #0f172a;
          --tab-bg: #0f172a;
        }

        .settings-card { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.03); overflow: hidden; transition: 0.2s; }
        
        .tabs-header { display: flex; border-bottom: 1px solid var(--border-color); background: var(--tab-bg); }
        .tab-btn { flex: 1; padding: 18px; font-size: 14px; font-weight: 700; color: var(--text-muted); background: transparent; border: none; border-bottom: 3px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.2s; }
        .tab-btn:hover { color: #3b82f6; background: var(--bg-card); }
        .tab-btn.active { color: #3b82f6; border-bottom-color: #3b82f6; background: var(--bg-card); }

        .tab-content { padding: 32px; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 12px; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        
        .form-input, .form-textarea { width: 100%; box-sizing: border-box; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; outline: none; transition: 0.2s; background: var(--input-bg); color: var(--text-main); }
        .form-input:focus, .form-textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
        .form-textarea { min-height: 100px; resize: vertical; }

        .btn-primary { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
        
        .btn-secondary { background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-secondary:hover { background: var(--bg-hover); border-color: var(--text-muted); }

        .toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--border-color); transition: .3s; border-radius: 24px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
        input:checked + .slider { background-color: #10b981; }
        input:checked + .slider:before { transform: translateX(20px); }

        /* Dark Mode Friendly Boxes */
        .preview-box { padding: 16px; background: rgba(59, 130, 246, 0.1); border: 1px dashed rgba(59, 130, 246, 0.3); border-radius: 10px; text-align: center; margin-top: 12px; }
        .alert-yellow { background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 16px; border-radius: 12px; margin-bottom: 24px; display: flex; gap: 12px; }
        .alert-green { margin-top: 24px; padding: 16px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; display: flex; gap: 12px; }
      `}</style>

      <SidebarAdmin isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`} style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
        {/* TOPBAR */}
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

        <div style={{ padding: '32px 40px', maxWidth: '1000px', margin: '0 auto' }}>
          <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Pengaturan Sistem</h1>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Konfigurasi identitas, email server, dan format sertifikat aplikasi.</p>
            </div>
            <button className="btn-primary shadow-md" onClick={handleSave} disabled={isLoading}>
              <Save size={18} /> {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
            </button>
          </header>

          <div className="settings-card">
            {/* TABS NAVIGATION */}
            <div className="tabs-header">
              <button className={`tab-btn ${activeTab === 'umum' ? 'active' : ''}`} onClick={() => setActiveTab('umum')}>
                <Globe size={18} /> Informasi Umum
              </button>
              <button className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`} onClick={() => setActiveTab('email')}>
                <Mail size={18} /> SMTP & Email
              </button>
              <button className={`tab-btn ${activeTab === 'sertifikat' ? 'active' : ''}`} onClick={() => setActiveTab('sertifikat')}>
                <Award size={18} /> Format Sertifikat
              </button>
            </div>

            {/* TAB CONTENT: UMUM */}
            {activeTab === 'umum' && (
              <div className="tab-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                  
                  {/* Logo Upload Section */}
                  <div>
                    <label className="form-label">Logo Instansi</label>
                    <div style={{ border: '2px dashed var(--border-color)', borderRadius: '16px', padding: '24px', textAlign: 'center', background: 'var(--bg-hover)' }}>
                      <div style={{ width: '120px', height: '120px', margin: '0 auto 16px', background: 'var(--bg-card)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                        {formData.logoPreview ? (
                          <img src={formData.logoPreview} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                          <Globe size={40} color="var(--text-muted)" />
                        )}
                      </div>
                      <input type="file" ref={logoInputRef} hidden onChange={handleLogoUpload} accept="image/*" />
                      <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => logoInputRef.current.click()}>
                        <Upload size={16} /> Ubah Logo
                      </button>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>Format: PNG transparan. Maks: 2MB.</p>
                    </div>
                  </div>

                  {/* Text Information Section */}
                  <div>
                    <div className="form-group">
                      <label className="form-label">Nama Training Center</label>
                      <input type="text" className="form-input" name="namaInstansi" value={formData.namaInstansi} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Deskripsi Singkat</label>
                      <textarea className="form-textarea" name="deskripsi" value={formData.deskripsi} onChange={handleInputChange} placeholder="Deskripsi ini akan muncul di footer atau meta tag website..."></textarea>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB CONTENT: EMAIL / SMTP */}
            {activeTab === 'email' && (
              <div className="tab-content">
                <div className="alert-yellow">
                  <Server size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <p style={{ fontSize: '13px', color: 'var(--text-main)', margin: 0 }}>Konfigurasi ini digunakan oleh sistem untuk mengirim email notifikasi pendaftaran, reset password, dan pengiriman sertifikat PDF kepada peserta.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">SMTP Host</label>
                    <input type="text" className="form-input" name="smtpHost" value={formData.smtpHost} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SMTP Port</label>
                    <input type="text" className="form-input" name="smtpPort" value={formData.smtpPort} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email / Username</label>
                    <input type="text" className="form-input" name="smtpUser" value={formData.smtpUser} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password / App Password</label>
                    <input type="password" className="form-input" name="smtpPass" value={formData.smtpPass} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Enkripsi</label>
                    <select className="form-input" name="smtpCrypto" value={formData.smtpCrypto} onChange={handleInputChange}>
                      <option value="SSL">SSL</option>
                      <option value="TLS">TLS</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '16px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                  <button className="btn-secondary" onClick={handleTestEmail}>
                    <Send size={16} className="text-blue-500" /> Test Koneksi SMTP
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FORMAT SERTIFIKAT */}
            {activeTab === 'sertifikat' && (
              <div className="tab-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                  
                  {/* Settings */}
                  <div>
                    <div className="form-group">
                      <label className="form-label flex items-center gap-2"><Hash size={16}/> Prefix Nomor Sertifikat</label>
                      <input type="text" className="form-input" name="certPrefix" value={formData.certPrefix} onChange={handleInputChange} placeholder="Misal: TCF atau KODE-INSTANSI" />
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>Teks yang selalu muncul di bagian awal nomor sertifikat.</p>
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-hover)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>Gunakan Tahun Otomatis</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Menambahkan tahun saat ini (ex: {currentYear}) ke dalam nomor.</div>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" name="useAutoYear" checked={formData.useAutoYear} onChange={handleInputChange} />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-hover)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)' }}>Reset Counter Tiap Tahun</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Nomor urut (001) akan direset setiap pergantian tahun baru.</div>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" name="resetYearly" checked={formData.resetYearly} onChange={handleInputChange} />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Live Preview Penomoran</h3>
                    <div className="preview-box">
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Contoh Nomor Sertifikat:</div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 800, color: '#3b82f6', letterSpacing: '1px' }}>
                        {certPreview}
                      </div>
                    </div>
                    
                    <div className="alert-green">
                      <RefreshCw size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                      <p style={{ fontSize: '12px', color: 'var(--text-main)', margin: 0, lineHeight: '1.5' }}>
                        Perubahan format ini hanya akan berlaku untuk sertifikat yang <strong>dibuat setelah pengaturan disimpan</strong>. Sertifikat lama tidak akan berubah.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}