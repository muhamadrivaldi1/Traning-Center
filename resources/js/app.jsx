import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./HomePage";
import Dashboard from "./pages/Dashboard";
import Pembayaran from "./pages/Pembayaran";
import Sertifikat from "./pages/sertifikat";
import Profil from "./pages/Profil";
import Register from "./pages/Register";
import TrainingDetail from "./pages/TrainingDetail";
import PelatihanSaya from "./pages/PelatihanSaya";
import PendaftaranPelatihan from "./pages/PendaftaranPelatihan";
import Login from "./pages/Login"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/pelatihan-saya" element={<PelatihanSaya />} />
        <Route path="/Pembayaran" element={<Pembayaran />} />
        <Route path="/sertifikat" element={<Sertifikat />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/TrainingDetail" element={<TrainingDetail />} />
        <Route path="/pendaftaran-pelatihan"element={<PendaftaranPelatihan />}
        />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);