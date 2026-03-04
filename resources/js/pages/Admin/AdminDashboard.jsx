import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { Users, BookOpen, Award, FileText } from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import "../../../css/app.css";

// --- DATA DUMMY GRAFIK ---
const dataPesertaBulan = [
  { name: 'Jan', peserta: 120 }, { name: 'Feb', peserta: 250 },
  { name: 'Mar', peserta: 180 }, { name: 'Apr', peserta: 300 },
  { name: 'Mei', peserta: 280 }, { name: 'Jun', peserta: 420 },
];

const dataKategori = [
  { name: 'Web Dev', value: 45 }, { name: 'UI/UX', value: 25 },
  { name: 'Data Sci', value: 20 }, { name: 'Security', value: 10 },
];
const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']; 

export default function AdminDashboard() {
  const navigate = useNavigate();

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
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.body.classList.toggle("dark-theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{`
        :root {
          --bg-card: #ffffff;
          --bg-app: #f6f7fb;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --icon-bg: #eff6ff;
        }

        .dark-theme {
          --bg-card: #1e293b;
          --bg-app: #0f172a;
          --text-main: #f8fafc;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --icon-bg: rgba(59, 130, 246, 0.15);
        }

        .dashboard-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
          transition: all 0.3s ease;
          
          /* INI PENAMBAHAN AGAR KONTEN KE TENGAH */
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
          border-color: #3b82f6;
        }

        .stat-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--icon-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          margin-bottom: 16px;
        }

        .btn-custom { padding: 12px 24px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary { background: #3b82f6; color: white; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); }
        .btn-primary:hover { background: #2563eb; transform: translateY(-2px); }
        .btn-secondary { background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); }
        .btn-secondary:hover { background: var(--border-color); transform: translateY(-2px); }
      `}</style>

      <SidebarAdmin isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`} style={{ backgroundColor: 'var(--bg-app)', minHeight: '100vh' }}>
        
        {/* NAVBAR */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}><span></span><span></span><span></span></button>
          <div className="topbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>{isDarkMode ? <FiSun /> : <FiMoon />}</button>
            <div className="user-menu-container">
              <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}><FiUser /></button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name" style={{ fontWeight: 'bold' }}>Super Admin</p>
                    <p className="user-email" style={{ fontSize: '12px', color: '#64748b' }}>admin@tcf.id</p>
                  </div>
                  <hr style={{ margin: '10px 0', borderColor: '#e2e8f0' }} />
                  <button className="logout-btn" onClick={handleLogout} style={{ width: '100%', background: '#ef4444', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ padding: '32px 40px' }}>
          
          {/* HEADER & QUICK ACTIONS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Dashboard Overview</h1>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginTop: '6px' }}>Ringkasan kondisi sistem Training Center FILKOM</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-custom btn-primary" onClick={() => navigate('/admin/pelatihan/semua')}>
                <BookOpen size={18}/> Tambah Pelatihan
              </button>
              <button className="btn-custom btn-secondary" onClick={() => navigate('/admin/sertifikat')}>
                <Award size={18}/> Buat Sertifikat
              </button>
            </div>
          </div>

          {/* STAT CARDS (4 Kolom) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
            <div className="dashboard-card">
              <div className="stat-icon-box"><Users size={24} /></div>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>1.2k</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Total Peserta</p>
            </div>
            <div className="dashboard-card">
              <div className="stat-icon-box" style={{ color: '#10b981', background: isDarkMode ? 'rgba(16, 185, 129, 0.15)' : '#dcfce7' }}><BookOpen size={24} /></div>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>12</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Pelatihan Aktif</p>
            </div>
            <div className="dashboard-card">
              <div className="stat-icon-box" style={{ color: '#f59e0b', background: isDarkMode ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7' }}><Award size={24} /></div>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>850</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Sertifikat Terbit</p>
            </div>
            <div className="dashboard-card">
              <div className="stat-icon-box" style={{ color: '#8b5cf6', background: isDarkMode ? 'rgba(139, 92, 246, 0.15)' : '#ede9fe' }}><FileText size={24} /></div>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px 0' }}>45</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>Total Berita</p>
            </div>
          </div>

          {/* CHARTS SECTION (2 Kolom Bersebelahan) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            
            {/* Chart 1: Bar Chart */}
            <div className="dashboard-card">
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Grafik Peserta per Bulan</h3>
              <div style={{ height: '320px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataPesertaBulan} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: isDarkMode ? '#334155' : '#f8fafc'}} 
                      contentStyle={{backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? '#f8fafc' : '#0f172a'}} 
                    />
                    <Bar dataKey="peserta" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Chart 2: Pie Chart */}
            <div className="dashboard-card">
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>Pelatihan per Kategori</h3>
              <div style={{ height: '320px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={dataKategori} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={80} 
                      outerRadius={120} 
                      paddingAngle={5} 
                      dataKey="value"
                      stroke="none"
                    >
                      {dataKategori.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', borderRadius: '8px', border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`, color: isDarkMode ? '#f8fafc' : '#0f172a'}} 
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '13px', color: 'var(--text-muted)'}}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}