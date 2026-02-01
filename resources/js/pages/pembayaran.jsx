import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import api from "../api";
import "../../css/app.css";

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD DATA
  // ===============================
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));

    api
      .get("/my-trainings")
      .then((res) => {
        const data = res.data.map((item) => ({
          id: item.id,
          training: item.training?.name || "Pelatihan",
          price: item.training?.cost || 0,
          status: item.status?.toLowerCase(),
          snap_token: item.snap_token,
          date: item.created_at,
        }));
        setPayments(data);
      })
      .catch(() => alert("Gagal memuat data pembayaran"))
      .finally(() => setLoading(false));
  }, [navigate]);

  // ===============================
  // MIDTRANS
  // ===============================
  const handlePayment = (token) => {
    if (!token) {
      alert("Token pembayaran tidak tersedia.");
      return;
    }

    window.snap.pay(token, {
      onSuccess: () => window.location.reload(),
      onPending: () => alert("Pembayaran pending"),
      onError: () => alert("Pembayaran gagal"),
      onClose: () => alert("Pembayaran dibatalkan"),
    });
  };

  const statusColor = (status) => {
    if (status === "success" || status === "lunas") return "#22c55e";
    if (status === "pending") return "#f59e0b";
    if (status === "cancel") return "#ef4444";
    return "#6b7280";
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span />
            <span />
            <span />
          </button>

          <div className="topbar-right">
            <button
              className="theme-toggle-btn"
              onClick={() => {
                const next = !isDarkMode;
                setIsDarkMode(next);
                document.body.classList.toggle("dark-theme", next);
                localStorage.setItem("theme", next ? "dark" : "light");
              }}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>

            <div className="user-menu-container">
              <button
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FiUser />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <p className="fw-bold mb-0">{user?.name}</p>
                  <p className="text-muted small">{user?.email}</p>
                  <hr />
                  <button onClick={() => navigate("/profil")}>Profil</button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <h2 className="page-title">Pembayaran</h2>
        <hr />

        {loading && <p>Loading...</p>}

        {!loading && payments.length === 0 && (
          <p>Tidak ada data pembayaran.</p>
        )}

        {!loading && payments.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Pelatihan</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.training}</td>
                    <td>
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: "20px",
                          color: "white",
                          backgroundColor: statusColor(item.status),
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {new Date(item.date).toLocaleDateString("id-ID")}
                    </td>
                    <td>
                      {item.status === "pending" ? (
                        <button
                          className="btn btn-sm btn-warning text-white"
                          onClick={() => handlePayment(item.snap_token)}
                        >
                          Bayar
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
