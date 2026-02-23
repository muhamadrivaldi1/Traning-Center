import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Pastikan file api.js kamu sudah benar base URL-nya
import "bootstrap/dist/css/bootstrap.min.css";
import "../app.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    try {
      // 1. Kirim request login ke Laravel
      const res = await api.post("/login", {
        email,
        password,
      });

      // ============================================================
      // PERBAIKAN DI SINI:
      // Simpan token secara terpisah agar mudah dipanggil di Header API
      // ============================================================
      localStorage.setItem("token", res.data.token); 
      
      // Simpan data user (tanpa token di dalamnya agar rapi)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 2. Arahkan ke dashboard setelah sukses
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah");
    }
  };

  // Bersihkan class background jika ada
  useEffect(() => {
    document.body.classList.remove("bg-light", "bg-dark");
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 login-bg">
      <div className="card shadow-lg p-4 login-card" style={{ width: "100%", maxWidth: "380px" }}>
        
        {/* Logo Training Center */}
        <div className="text-center mb-3">
          <img
            src="/images/TCF_Logo.png"
            alt="Logo FILKOM"
            className="logo-unpam"
            style={{ maxWidth: "80px", width: "50%", height: "auto" }}
          />
        </div>

        <h3 className="text-center mb-4 text-primary fw-bold" style={{ fontSize: "1.4rem" }}>
          Training Center FILKOM
        </h3>

        {/* Pesan Error jika login gagal */}
        {error && <div className="alert alert-danger p-2 text-center" style={{ fontSize: "14px" }}>{error}</div>}

        {/* Form Login */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold mt-2">
            Masuk Sekarang
          </button>

          <p className="text-center mt-3" style={{ fontSize: "14px" }}>
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#0d6efd", cursor: "pointer", fontWeight: "600" }}
            >
              Daftar di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}