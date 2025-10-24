import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email dan password wajib diisi!");
            return;
        }

        console.log("Login data:", { email, password });
        // TODO: Integrasi ke API Laravel (axios.post('/api/login', {...}))
        alert("Login berhasil (simulasi)!");
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "380px" }}>
                <h3 className="text-center mb-3 text-primary fw-bold">
                    Training Center FILKOM
                </h3>
                <h5 className="text-center mb-4 text-secondary">Login</h5>

                {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Masukkan email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9em" }}>
                    Belum punya akun? <a href="#">Daftar di sini</a>
                </p>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<LoginPage />);
