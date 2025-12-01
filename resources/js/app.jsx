import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setshowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email dan password wajib diisi!");
            return;
        }

        // sementara: langsung arahkan ke halaman utama
        navigate("/home");
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 login-bg">
            <div className="card shadow-lg p-4 login-card">
                <h3 className="text-center mt-3 mb-1 text primary fw-bold">
                    Selamat Datang
                </h3>
                <h3 className="text-center mb-5 text-primary fw-bold">
                    Training Center FILKOM
                </h3>
                {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control input-custom"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control input-custom"
                            placeholder="Masukan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="cloudflare-box mb-3">
                    <div className="d-flex align-items-center gap-3">
                        <input 
                        type="checkbox" className="cloudflare-checkbox" 
                        placeholder="a"
                        />
                        <div className="flex-grow-1"></div>
                        <img 
                            src="/images/cloudflare.png" 
                            alt="cloudflare" 
                            className="cloudflare-logo"
                        />
                    </div>
                    </div>  


                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3 text-center" style={{ fontSize: "0.9em" }}>
                    Belum punya akun? <a href="#">Daftar di sini</a>
                </p>
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
            </Routes>
        </Router>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
