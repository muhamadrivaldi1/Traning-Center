import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser, FiChevronDown } from "react-icons/fi";
import "../../css/app.css";
import api from "../api";

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snapReady, setSnapReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false); // 🔥 lock bayar
  const [selectedMethod, setSelectedMethod] = useState("bca"); // default VA

  // ===============================
  // LOAD SNAP.JS
  // ===============================
  useEffect(() => {
    if (window.snap) {
      setSnapReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    script.onload = () => setSnapReady(true);
    script.onerror = () => console.error("Gagal load Snap.js");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ===============================
  // LOAD USER
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
  // FETCH PAYMENTS
  // ===============================
  const fetchPayments = async (currentUser) => {
    setLoading(true);
    try {
      const res = await api.get("/my-trainings", {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      const data = res.data.map((item) => ({
        id: item.id,
        training: item.training?.name || "Pelatihan",
        price: item.training?.price || 0,
        status: item.payment_status?.toLowerCase() || "unpaid",
        date: item.created_at,
      }));
      setPayments(data);
    } catch (err) {
      console.error("Fetch error:", err.response || err);
      alert("Gagal memuat data pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // HANDLE PAYMENT
  // ===============================
  const handlePayment = async (registrationId) => {
    if (!snapReady || !window.snap) {
      alert("Snap belum siap. Refresh halaman.");
      return;
    }
    if (isPaying) {
      alert("Transaksi sedang diproses. Tunggu sebentar.");
      return;
    }
    setIsPaying(true);

    try {
      // request snap token dari backend, termasuk method
      const res = await api.get(
        `/snap-token/${registrationId}?method=${selectedMethod}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const token = res.data?.snap_token;
      if (!token) {
        alert("Token pembayaran tidak tersedia.");
        setIsPaying(false);
        return;
      }

      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("SUCCESS:", result);
          alert("Pembayaran berhasil!");
          fetchPayments(user);
          setIsPaying(false);
        },
        onPending: (result) => {
          console.log("PENDING:", result);
          alert(
            selectedMethod.startsWith("va")
              ? `Pembayaran pending, silakan bayar Virtual Account ${result.va_numbers?.[0]?.va_number || ""}`
              : "Pembayaran pending, silakan scan QRIS."
          );
          fetchPayments(user);
          setIsPaying(false);
        },
        onError: (result) => {
          console.log("ERROR:", result);
          alert("Pembayaran gagal.");
          setIsPaying(false);
        },
        onClose: () => {
          console.log("Popup ditutup");
          setIsPaying(false);
        },
      });
    } catch (err) {
      console.error("Midtrans error:", err.response || err);
      alert(
        err.response?.data?.message ||
          "Terjadi kesalahan saat memproses pembayaran."
      );
      setIsPaying(false);
    }
  };

  // ===============================
  // STATUS COLOR
  // ===============================
  const statusColor = (status) => {
    if (status === "success") return "#22c55e";
    if (status === "pending") return "#f59e0b";
    if (status === "unpaid") return "#ef4444";
    return "#6b7280";
  };

  if (!user) return <p>Loading...</p>;

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
                  <th>Metode</th>
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
                      <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="form-select form-select-sm"
                      >
                        <option value="bca">BCA VA</option>
                        <option value="bni">BNI VA</option>
                        <option value="mandiri">Mandiri VA</option>
                        <option value="bri">BRI VA</option>
                        <option value="permata">Permata VA</option>
                        <option value="qris">QRIS</option>
                      </select>
                    </td>
                    <td>
                      {item.status === "unpaid" || item.status === "pending" ? (
                        <button
                          className="btn btn-sm btn-warning text-white"
                          onClick={() => handlePayment(item.id)}
                          disabled={isPaying}
                        >
                          {isPaying ? "Sedang Bayar..." : "Bayar"}
                        </button>
                      ) : (
                        <span className="text-success fw-bold">Lunas</span>
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
