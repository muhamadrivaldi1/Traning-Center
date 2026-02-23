import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Import Halaman Utama
import HomePage from "./HomePage";
import Dashboard from "./pages/Dashboard";
import Pembayaran from "./pages/Pembayaran";
import Sertifikat from "./pages/Sertifikat"; 
import Profil from "./pages/Profil";
import Register from "./pages/Register";
import TrainingDetail from "./pages/TrainingDetail";
import PelatihanSaya from "./pages/PelatihanSaya";
import PendaftaranPelatihan from "./pages/PendaftaranPelatihan";
import Login from "./pages/Login"; 

// Import Halaman Baru yang ditambahkan
import Pembelajaran from "./pages/Pembelajaran"; 
import AdminDashboard from "./pages/AdminDashboard"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Publik */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
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

        {/* Route Admin Dashboard */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

// Render ke elemen dengan ID 'app'
const rootElement = document.getElementById("app");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}