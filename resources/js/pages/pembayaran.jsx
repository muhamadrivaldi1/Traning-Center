import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../../css/app.css";

export default function Pembayaran() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TOGGLE BUTTON */}
      <button
        className="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        &#9776;
      </button>

      <Sidebar isOpen={isOpen} />

      <div
        className={isOpen ? "sidebar-open" : ""}
        style={{
          minHeight: "100vh",
          backgroundColor: "#131D78",
          padding: "40px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className="container py-4">
          <h1 style={{ color: "white" }}>Pembayaran</h1>
          <p style={{ color: "white" }}>Halaman pembayaran masih kosong.</p>
        </div>
      </div>
    </>
  );
}
