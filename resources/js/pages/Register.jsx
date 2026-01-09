import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

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
          Register
        </h3>

        <input
          className="form-control mb-3"
          placeholder="Username"
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
        />

        <button className="btn btn-primary w-100 mb-3">
          Daftar
        </button>

        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
