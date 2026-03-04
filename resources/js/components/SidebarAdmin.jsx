import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, Globe, GraduationCap, Award, 
  Settings, ChevronDown, ChevronRight,
  FileText, Newspaper, Image as ImageIcon, BookOpen,
  Users, Bookmark, UserCog, Key, User
} from "lucide-react";
import "./Sidebar.css"; 

const SidebarAdmin = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk melacak dropdown yang terbuka (Sertifikat dihapus dari sini)
  const [openMenus, setOpenMenus] = useState({
    konten: false,
    pelatihan: false,
    pengguna: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname.includes(path);
  const isExactActive = (path) => location.pathname === path;

  return (
    <>
      <style>
        {`
          .sidebar-sub-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 15px 10px 48px; 
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none !important; 
            font-size: 13px;
            transition: all 0.3s ease;
            border-radius: 8px;
            margin-bottom: 4px;
            margin-left: 8px;
            margin-right: 8px;
          }

          .sidebar-sub-item:hover {
            color: white;
            background: linear-gradient(135deg, #1b2cc1, #6a5cff);
            transform: translateX(4px);
            box-shadow: 0 4px 12px rgba(106, 92, 255, 0.3);
          }

          .sidebar-sub-item.active {
            color: white;
            font-weight: 600;
            background: linear-gradient(135deg, #1b2cc1, #6a5cff);
            box-shadow: 0 4px 12px rgba(106, 92, 255, 0.4);
          }
          
          .sub-menu-container {
            display: flex;
            flex-direction: column;
            margin-top: 4px;
          }
        `}
      </style>

      <aside className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-container">
            <img 
               src="/images/TCF_Logo.png" 
               alt="Logo" 
               className="sidebar-logo-img"
            />
          </div>
        </div>

        <div className="sidebar-menu pb-10">
          <div className="menu-label">ADMIN PANEL</div>

          {/* 1. Dashboard */}
          <div 
            className={`sidebar-item ${isExactActive("/admin/dashboard") ? "active" : ""}`}
            onClick={() => navigate("/admin/dashboard")}
          >
            <LayoutDashboard size={20} className="sidebar-icon" />
            <span>Dashboard</span>
          </div>

          {/* 2. Konten Website */}
          <div className="menu-group">
            <div className={`sidebar-item ${isActive('/admin/konten') ? 'active' : ''}`} onClick={() => toggleMenu('konten')}>
              <Globe size={20} className="sidebar-icon" />
              <span className="flex-1">Konten Website</span>
              {openMenus.konten ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openMenus.konten && (
              <div className="sub-menu-container">
                <Link to="/admin/konten/pages" className={`sidebar-sub-item ${isExactActive('/admin/konten/pages') ? 'active' : ''}`}>
                  <FileText size={16} />
                  <span>Pages</span>
                </Link>
                <Link to="/admin/konten/berita" className={`sidebar-sub-item ${isExactActive('/admin/konten/berita') ? 'active' : ''}`}>
                  <Newspaper size={16} />
                  <span>Berita</span>
                </Link>
                <Link to="/admin/konten/galeri" className={`sidebar-sub-item ${isExactActive('/admin/konten/galeri') ? 'active' : ''}`}>
                  <ImageIcon size={16} />
                  <span>Galeri</span>
                </Link>
              </div>
            )}
          </div>

          {/* 3. Pelatihan */}
          <div className="menu-group">
            <div className={`sidebar-item ${isActive('/admin/pelatihan') ? 'active' : ''}`} onClick={() => toggleMenu('pelatihan')}>
              <GraduationCap size={20} className="sidebar-icon" />
              <span className="flex-1">Pelatihan</span>
              {openMenus.pelatihan ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openMenus.pelatihan && (
              <div className="sub-menu-container">
                <Link to="/admin/pelatihan/semua" className={`sidebar-sub-item ${isExactActive('/admin/pelatihan/semua') ? 'active' : ''}`}>
                  <BookOpen size={16} />
                  <span>Semua Pelatihan</span>
                </Link>
                <Link to="/admin/pelatihan/kategori" className={`sidebar-sub-item ${isExactActive('/admin/pelatihan/kategori') ? 'active' : ''}`}>
                  <Bookmark size={16} />
                  <span>Kategori</span>
                </Link>
                <Link to="/admin/pelatihan/peserta" className={`sidebar-sub-item ${isExactActive('/admin/pelatihan/peserta') ? 'active' : ''}`}>
                  <Users size={16} />
                  <span>Peserta</span>
                </Link>
              </div>
            )}
          </div>

          {/* 4. Sertifikat (Direct Link) */}
          <div 
            className={`sidebar-item ${isActive("/admin/sertifikat") ? "active" : ""}`} 
            onClick={() => navigate("/admin/sertifikat")}
          >
            <Award size={20} className="sidebar-icon" />
            <span>Sertifikat</span>
          </div>

          <div className="menu-label mt-4">SISTEM & PENGATURAN</div>

          {/* 5. Manajemen Pengguna */}
          <div className="menu-group">
            <div className={`sidebar-item ${isActive('/admin/pengguna') ? 'active' : ''}`} onClick={() => toggleMenu('pengguna')}>
              <UserCog size={20} className="sidebar-icon" />
              <span className="flex-1">Manajemen Akun</span>
              {openMenus.pengguna ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openMenus.pengguna && (
              <div className="sub-menu-container">
                <Link to="/admin/pengguna/admin" className={`sidebar-sub-item ${isExactActive('/admin/pengguna/admin') ? 'active' : ''}`}>
                  <User size={16} />
                  <span>Admin</span>
                </Link>
                <Link to="/admin/pengguna/role-permission" className={`sidebar-sub-item ${isExactActive('/admin/pengguna/role-permission') ? 'active' : ''}`}>
                  <Key size={16} />
                  <span>Role & Permission</span>
                </Link>
              </div>
            )}
          </div>

          {/* 6. Pengaturan */}
          <div 
            className={`sidebar-item ${isExactActive("/admin/pengaturan") ? "active" : ""}`} 
            onClick={() => navigate("/admin/pengaturan")}
          >
            <Settings size={20} className="sidebar-icon" />
            <span>Pengaturan</span>
          </div>
          
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;