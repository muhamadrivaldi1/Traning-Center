import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


// halaman utama
import HomePage from "./HomePage";
import PelatihanPage from './PelatihanPage';
import PelatihanDetail from './PelatihanDetail';
import BeritaPage from './BeritaPage';
import BeritaDetail from './BeritaDetail';
import GaleriPage from './GaleriPage';
import GaleriDetail from './GaleriDetail';
import Login from "./pages/Login"; 

// halaman user
import Dashboard from "./pages/User/Dashboard";
import Pembayaran from "./pages/User/Pembayaran";
import Sertifikat from "./pages/User/Sertifikat"; 
import Profil from "./pages/User/Profil";
import Register from "./pages/User/Register";
import TrainingDetail from "./pages/User/TrainingDetail";
import PelatihanSaya from "./pages/User/PelatihanSaya";
import PendaftaranPelatihan from "./pages/User/PendaftaranPelatihan";
import Pembelajaran from "./pages/User/Pembelajaran"; 

//halaman admin
import AdminDashboard from "./pages/Admin/AdminDashboard"; 
import AdminPages from "./pages/Admin/AdminPages";
import AdminNews from "./pages/Admin/AdminNews";
import AdminGallery from "./pages/Admin/AdminGallery";
import AdminAllTrainings from "./pages/Admin/AdminAllTrainings";
import AdminTrainingCategories from "./pages/Admin/AdminTrainingCategories"; 
import AdminTrainingParticipants from "./pages/Admin/AdminTrainingParticipants";
import AdminCertificateTemplate from "./pages/Admin/AdminCertificateTemplate";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminRolePermission from "./pages/Admin/AdminRolePermission";
import AdminSettings from "./pages/Admin/AdminSettings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Publik */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pelatihan" element={<PelatihanPage />} />
        <Route path="/pelatihan/:id" element={<PelatihanDetail />} />
        <Route path="/berita" element={<BeritaPage />} />
        <Route path="/berita/:id" element={<BeritaDetail />} />
        <Route path="/galeri" element={<GaleriPage />} />
        <Route path="/galeri/:id" element={<GaleriDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route User Dashboard */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/pelatihan-saya" element={<PelatihanSaya />} />
        <Route path="/Pembayaran" element={<Pembayaran />} />
        <Route path="/sertifikat" element={<Sertifikat />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/TrainingDetail" element={<TrainingDetail />} />
        <Route path="/pendaftaran-pelatihan" element={<PendaftaranPelatihan />} />
        
        {/* Route Pembelajaran dengan ID Pendaftaran */}
        <Route path="/pembelajaran/:id" element={<Pembelajaran />} />

        {/* Route Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/konten/pages" element={<AdminPages />} />
        <Route path="/admin/konten/berita" element={<AdminNews />} />
        <Route path="/admin/konten/galeri" element={<AdminGallery />} />
        <Route path="/admin/pelatihan/semua" element={<AdminAllTrainings />} />
        <Route path="/admin/pelatihan/kategori" element={<AdminTrainingCategories />} />
        <Route path="/admin/pelatihan/peserta" element={<AdminTrainingParticipants />} />
        <Route path="/admin/sertifikat" element={<AdminCertificateTemplate />} />
        <Route path="/admin/pengguna/admin" element={<AdminUsers />} />
        <Route path="/admin/pengguna/role-permission" element={<AdminRolePermission />} />
        <Route path="/admin/pengaturan" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}

// Render ke elemen dengan ID 'app'
const rootElement = document.getElementById("app");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}