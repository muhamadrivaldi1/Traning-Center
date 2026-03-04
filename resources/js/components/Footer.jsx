import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-header">
          <img src="/images/unpam (2).png" alt="Logo UNPAM" className="footer-logo" />
          <h3>Training Center Fakultas - Universitas Pamulang</h3>
        </div>

        <div className="footer-content">
          <div className="footer-item">
            <h4>Kampus Pusat</h4>
            <p>Jl. Surya Kencana No.1, Pamulang Barat, Tangerang Selatan, Banten 15417</p>
          </div>
          <div className="footer-item">
            <h4>Kampus Viktor</h4>
            <p>Jl. Raya Puspiptek, Buaran, Tangerang Selatan, Banten 15310</p>
          </div>
          <div className="footer-item">
            <h4>Kampus Witana Harja</h4>
            <p>Jl. Witana Harja No.18b, Tangerang Selatan, Banten 15417</p>
          </div>
          <div className="footer-item">
            <h4>Kampus Serang</h4>
            <p>Jl. Lintas Serang – Jakarta, Kota Serang, Banten 42183</p>
          </div>

          {/* Bagian email aktif */}
          <div className="footer-item">
            <h4>Email</h4>
            <a
              href="mailto:humas@unpam.ac.id"
              className="footer-email-link"
            >
              humas@unpam.ac.id
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © Training Center Fakultas Ilmu Komputer – By Rivaldi, Jiwa, Intan, dan Andini, {new Date().getFullYear()}
      </div>
    </footer>
  );
}