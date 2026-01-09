import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../../css/app.css";

export default function Pembayaran() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TOGGLE BUTTON */}
      <button
        className={`toggle-btn ${isOpen ? 'sidebar-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        &#9776;
      </button>

      <Sidebar isOpen={isOpen} />

      <div
        className={isOpen ? "sidebar-open" : ""}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #131D78, #2336DE)",
          padding: "40px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <div className="container py-4">
          <h1 style={{ color: "white" }}>Pembayaran</h1>
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>Nama Pelatihan</th>
                  <th>Chanel Bayar</th>
                  <th>Kode Pembayaran</th>
                  <th>Total Harga</th>
                  <th>Status Pembayaran</th>
                  <th>Tanggal Bayar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>(nama pelatihan)</td>
                  <td>...</td>
                  <td>123456789</td>
                  <td>Rp ...</td>
                  <td>Lunas</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>(nama pelatihan)</td>
                  <td>...</td>
                  <td>987654321</td>
                  <td>Rp ...</td>
                  <td>Pending</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>(nama pelatihan)</td>
                  <td>...</td>
                  <td>456789123</td>
                  <td>Rp ...</td>
                  <td>Lunas</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
