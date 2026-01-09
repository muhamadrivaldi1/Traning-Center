import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import HomePage from "./HomePage";
import Dashboard from "./pages/dashboard";
import Pembayaran from "./pages/pembayaran";
import Sertifikat from "./pages/sertifikat";
import Register from "./pages/Register";
import TrainingDetail from "./pages/TrainingDetail";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Username dan password wajib diisi!");
      return;
    }

    // Simulate login
    login();
    navigate("/home");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 login-bg">
      <div className="card shadow-lg p-4 login-card">
        <div className="text-center mb-2">
          <img
            src="/images/unpam (2).png"
            className="logo-unpam"
            alt="UNPAM"
          />
        </div>

        <h3 className="text-center mb-4 text-primary fw-bold">
          Training Center FILKOM
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
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

          {/* LINK REGISTER */}
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#0d6efd",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Klik di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/sertifikat" element={<Sertifikat />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
