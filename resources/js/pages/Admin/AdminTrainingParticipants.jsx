import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { 
  Search, Trash2, Users, Info, Award, 
  CheckCircle, Mail, BookOpen, 
  Calendar, Zap, ChevronRight, Phone, UserCheck
} from "lucide-react";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import "../../../css/app.css";

export default function AdminTrainingParticipants() {
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

  // --- DATA MOCK PESERTA ---
  const [participants] = useState([
    { 
      id: 1, name: "Ahmad Budi", email: "budi@example.com", 
      training: "Web Dev Bootcamp 2026", status: "Terdaftar", cert: "Belum",
      joinedAt: "12 Feb 2026", phone: "081234567890" 
    },
    { 
      id: 2, name: "Siti Sarah", email: "sarah@design.id", 
      training: "UI/UX Advanced Design", status: "Lulus", cert: "Sudah",
      joinedAt: "10 Jan 2026", phone: "089988776655" 
    },
    { 
      id: 3, name: "Reza Pratama", email: "reza.p@security.com", 
      training: "Cyber Security Pro", status: "Terdaftar", cert: "Belum",
      joinedAt: "01 Mar 2026", phone: "085544332211" 
    }
  ]);

  const [selectedParticipant, setSelectedParticipant] = useState(null);

  // Penyesuaian class badge untuk dark mode
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Lulus": return "status-lulus";
      case "Tidak Lulus": return "status-tidaklulus";
      default: return "status-terdaftar";
    }
  };

  return (
    <>
      <style>{`
        :root {
          --bg-card: #ffffff;
          --bg-app: #f6f7fb;
          --text-main: #111827;
          --text-muted: #6b7280;
          --border-color: #e5e7eb;
          --bg-table-head: #f9fafb;
          --bg-hover: #f9fafb;
          --bg-info: #f8fafc;
        }

        .dark-theme {
          --bg-card: #1e293b;
          --bg-app: #0f172a;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --bg-table-head: #0f172a;
          --bg-hover: #0f172a;
          --bg-info: rgba(59, 130, 246, 0.05);
        }

        .participants-table-container { background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .participants-table { width: 100%; border-collapse: collapse; }
        .participants-table th { padding: 16px 24px; font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; text-align: left; background: var(--bg-table-head); border-bottom: 1px solid var(--border-color); }
        .participants-table td { padding: 18px 24px; border-bottom: 1px solid var(--border-color); font-size: 14px; color: var(--text-main); }
        .participants-table tbody tr { transition: background 0.2s; }
        .participants-table tbody tr:hover { background-color: var(--bg-hover); }
        
        .status-pill { padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; }
        .status-lulus { background-color: rgba(16, 185, 129, 0.15); color: #10b981; }
        .status-tidaklulus { background-color: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .status-terdaftar { background-color: rgba(59, 130, 246, 0.15); color: #3b82f6; }

        .cert-badge { display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: 12px; }
        .cert-sudah { color: #10b981; }
        .cert-belum { color: #9ca3af; }

        .btn-blue-primary { width: 100%; justify-content: center; background: #3b82f6; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-blue-primary:hover { background: #2563eb; transform: translateY(-1px); }
        
        .btn-white-outline { width: 100%; justify-content: center; background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-white-outline:hover { background: var(--bg-hover); border-color: var(--text-muted); }

        .detail-panel { background: var(--bg-card); border-radius: 16px; padding: 28px; border: 1px solid var(--border-color); position: sticky; top: 24px; }
        .info-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 4px; display: block; }
        .info-value { font-size: 14px; font-weight: 600; color: var(--text-main); margin-bottom: 16px; display: block; }
        
        .history-box { background: var(--bg-info); padding: 16px; border-radius: 12px; border: 1px solid var(--border-color); margin-top: 20px; }
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
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Data Peserta</h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Kelola kelulusan dan generate sertifikat secara langsung</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '32px', alignItems: 'start' }}>
            
            {/* --- KOLOM KIRI: LIST PESERTA --- */}
            <div>
              <div className="participants-table-container">
                <table className="participants-table">
                  <thead>
                    <tr>
                      <th>Nama Peserta</th>
                      <th>Pelatihan</th>
                      <th>Status</th>
                      <th>Sertifikat</th>
                      <th style={{ textAlign: 'center' }}>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{p.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.email}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{p.training}</div>
                        </td>
                        <td>
                          <span className={`status-pill ${getStatusBadgeClass(p.status)}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <div className={`cert-badge ${p.cert === 'Sudah' ? 'cert-sudah' : 'cert-belum'}`}>
                            {p.cert === 'Sudah' ? <Award size={14}/> : <Info size={14}/>}
                            {p.cert}
                          </div>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            onClick={() => setSelectedParticipant(p)}
                            style={{ padding: '8px', background: 'transparent', color: '#3b82f6', border: 'none', cursor: 'pointer' }}
                          >
                            <ChevronRight size={22} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- KOLOM KANAN: DETAIL & AKSI (STICKY) --- */}
            <div>
              {selectedParticipant ? (
                <div className="detail-panel shadow-lg animate-fade-in">
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <FiUser size={20} className="text-blue-500" /> Detail Peserta
                  </h3>

                  <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
                    <span className="info-label">Nama Lengkap</span>
                    <span className="info-value">{selectedParticipant.name}</span>
                    
                    <span className="info-label">Email Aktif</span>
                    <span className="info-value">{selectedParticipant.email}</span>

                    <span className="info-label">Nomor WhatsApp</span>
                    <span className="info-value">{selectedParticipant.phone}</span>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <h4 className="info-label">Pelatihan Saat Ini</h4>
                    <div className="history-box">
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#3b82f6' }}>{selectedParticipant.training}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Mendaftar pada: {selectedParticipant.joinedAt}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="btn-blue-primary shadow-md">
                      <UserCheck size={18}/> Tandai Lulus
                    </button>
                    
                    <button className="btn-white-outline" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                      <Zap size={18} fill="#10b981" color="#10b981"/> Generate Sertifikat
                    </button>

                    <button 
                      className="btn-white-outline" 
                      style={{ border: 'none', color: '#ef4444', marginTop: '8px', fontWeight: 700, background: 'transparent' }}
                      onClick={() => setSelectedParticipant(null)}
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '60px 32px', border: '2px dashed var(--border-color)', borderRadius: '16px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-table-head)' }}>
                  <Users size={48} style={{ margin: '0 auto 20px', opacity: 0.2 }} />
                  <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.6' }}>
                    Pilih peserta di tabel sebelah kiri untuk mengelola status kelulusan dan sertifikat.
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