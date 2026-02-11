import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import api from "../api";
import "../../css/app.css";

// Pastikan Snap.js sudah include di public/index.html
// <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="YOUR_CLIENT_KEY"></script>

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
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    fetchPayments(parsedUser);
  }, [navigate]);

  // ===============================
  // FETCH PAYMENTS FUNCTION
  // ===============================
  const fetchPayments = async (currentUser) => {
    setLoading(true);
    try {
      // Pastikan Authorization header dikirim
      const res = await api.get("/my-trainings", {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });

      // Sesuaikan struktur data dari backend
      const data = res.data.map((item) => ({
        id: item.id,
        training: item.training?.name || "Pelatihan",
        price: item.training?.price || 0,
        status: item.status?.toLowerCase() || "pending",
        date: item.created_at,
      }));

      setPayments(data);
    } catch (err) {
      console.error("Error fetching payments:", err.response || err);
      alert(
        err.response?.data?.message ||
          "Gagal memuat data pembayaran. Pastikan login dan backend tersedia."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // MIDTRANS PAYMENT
  // ===============================
  const handlePayment = async (paymentId) => {
    if (!user) {
      alert("User tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      // 1️⃣ Request snap token dari backend
      const res = await api.get(`/snap-token/${paymentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const token = res.data.snap_token;

      if (!token) {
        alert("Token pembayaran tidak tersedia.");
        return;
      }

      // 2️⃣ Panggil Midtrans Snap JS
      if (!window.snap) {
        alert("Snap.js belum dimuat!");
        return;
      }

      window.snap.pay(token, {
        onSuccess: () => fetchPayments(user),
        onPending: () => {
          alert("Pembayaran pending");
          fetchPayments(user);
        },
        onError: () => alert("Pembayaran gagal"),
        onClose: () => alert("Pembayaran dibatalkan"),
      });
    } catch (err) {
      console.error("Gagal memproses pembayaran:", err.response || err);
      alert(
        err.response?.data?.message ||
          "Gagal memproses pembayaran. Pastikan token valid."
      );
    }
  };

  // ===============================
  // STATUS WARNA
  // ===============================
  const statusColor = (status) => {
    if (status === "success" || status === "lunas") return "#22c55e";
    if (status === "pending") return "#f59e0b";
    if (status === "cancel") return "#ef4444";
    return "#6b7280";
  };

  // ===============================
  // RENDER
  // ===============================
  if (!user) return <p>Loading user...</p>;

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button
            className="sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
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

        {!loading && payments.length === 0 && <p>Tidak ada data pembayaran.</p>}

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
                      {item.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
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
                    <td>{new Date(item.date).toLocaleDateString("id-ID")}</td>
                    <td>
                      {item.status === "pending" ? (
                        <button
                          className="btn btn-sm btn-warning text-white"
                          onClick={() => handlePayment(item.id)}
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
