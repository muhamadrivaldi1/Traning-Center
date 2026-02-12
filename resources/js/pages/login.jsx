import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
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
      const res = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data.user,
          token: res.data.token,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah");
    }
  };

  // Hapus background default bootstrap jika ada
  useEffect(() => {
    document.body.classList.remove("bg-light", "bg-dark");
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 login-bg">
      <div className="card shadow-lg p-4 login-card" style={{ width: "100%", maxWidth: "380px" }}>
        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="/images/TCF_Logo.png"
            alt="UNPAM"
            className="logo-unpam"
            style={{ maxWidth: "80px", width: "50%", height: "auto" }}
          />
        </div>

        <h3 className="text-center mb-4 text-primary fw-bold" style={{ fontSize: "1.4rem" }}>
          Training Center FILKOM
        </h3>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Form Login */}
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-100">
            Masuk
          </button>

          <p className="text-center mt-3" style={{ fontSize: "14px" }}>
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#0d6efd", cursor: "pointer", fontWeight: "600" }}
            >
              Klik di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
