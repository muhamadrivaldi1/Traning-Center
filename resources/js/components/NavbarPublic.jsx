import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function NavbarPublic() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // state untuk toggle menu mobile

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container navbar-padding d-flex justify-content-between align-items-center">

        {/* Logo + Title */}
        <div className="d-flex align-items-center gap-3">
          <img src="/images/unpam (2).png" className="navbar-logo" alt="UNPAM" />
          <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: '700' }}>Training Center UNPAM</span>
        </div>

        {/* Hamburger mobile di kanan */}
        <span
          className="menu-icon d-lg-none"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer", fontSize: "24px" }}
        >
          &#9776;
        </span>

        {/* Collapse Navbar */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto gap-4">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/pelatihan">Pelatihan</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/berita">Berita</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/galeri">Galeri</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={() => navigate("/login")}>Masuk</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}