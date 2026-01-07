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

import HomePage from "./HomePage";
import Dashboard from "./pages/dashboard";
import Pembayaran from "./pages/pembayaran";
import Sertifikat from "./pages/sertifikat";


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }


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
            type="email"
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
        </form>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/sertifikat" element={<Sertifikat />} />
      </Routes>
    </Router>
  );
}


ReactDOM.createRoot(document.getElementById("app")).render(<App />);
