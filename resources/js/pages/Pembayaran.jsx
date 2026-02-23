import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import "../../css/app.css";
import api from "../api"; // Pastikan file axios instance kamu sudah benar

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [now, setNow] = useState(new Date());

  // Timer untuk update sisa waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Load Midtrans Snap Script
  useEffect(() => {
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    if (window.snap) return;
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
    
    // Jalankan cleanup data kadaluarsa sebelum ambil data terbaru
    cleanupAndFetch();
  }, [navigate]);

  const cleanupAndFetch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Memanggil endpoint cleanup di Laravel
      await api.get("/my-trainings/cleanup", {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPayments();
    } catch (err) {
      fetchPayments();
    }
  };

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/my-trainings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Sorting: Pending & Belum Expired di urutan teratas
      const sortedData = res.data.sort((a, b) => {
        const isAActive = a.payment_status === 'pending' && !checkIsExpired(a.created_at);
        const isBActive = b.payment_status === 'pending' && !checkIsExpired(b.created_at);
        if (isAActive && !isBActive) return -1;
        if (!isAActive && isBActive) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });

      setPayments(sortedData.map(item => ({
        id: item.id,
        training: item.training?.name || "Pelatihan",
        price: item.training?.price || 0,
        status: item.payment_status?.toLowerCase() || "unpaid",
        createdAt: item.created_at,
      })));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkIsExpired = (createdAt) => {
    const expiryTime = new Date(createdAt).getTime() + 5 * 60 * 1000;
    return now.getTime() > expiryTime;
  };

  const getTimerInfo = (createdAt) => {
    const startTime = new Date(createdAt).getTime();
    const expiryTime = startTime + 5 * 60 * 1000; 
    const diff = expiryTime - now.getTime();
    if (diff <= 0) return { text: "KADALUARSA", isExpired: true };
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return { text: `${mins}:${secs < 10 ? "0" : ""}${secs}`, isExpired: false };
  };

  const handlePayment = async (registrationId) => {
    if (isPaying) return;
    setIsPaying(true);
    try {
      const token = localStorage.getItem("token");
      // Penyesuaian URL: Menambahkan /payments sesuai api.php kamu
      const res = await api.get(`/payments/snap-token/${registrationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      window.snap.pay(res.data.snap_token, {
        onSuccess: () => { fetchPayments(); setIsPaying(false); },
        onPending: () => { fetchPayments(); setIsPaying(false); },
        onClose: () => setIsPaying(false),
      });
    } catch (err) {
      alert(err.response?.data?.message || "Gagal memproses pembayaran.");
      setIsPaying(false);
    }
  };

  const formatTanggal = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (!user) return <div className="p-5 text-center">Memeriksa sesi...</div>;

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span /><span /><span />
          </button>
          <div className="topbar-right">
            <button className="theme-toggle-btn" onClick={() => {
                const next = !isDarkMode;
                setIsDarkMode(next);
                document.body.classList.toggle("dark-theme", next);
                localStorage.setItem("theme", next ? "dark" : "light");
              }}>
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </button>
            <div className="user-menu-container">
              <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <FiUser />
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <p className="fw-bold mb-0 p-2 text-center">{user?.name}</p>
                  <hr className="my-1" />
                  <button onClick={() => navigate("/profil")}>Profil</button>
                  <button onClick={() => { localStorage.clear(); navigate("/login"); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid py-4">
          <h2 className="page-title">Pembayaran</h2>
          
          <div className="alert alert-warning d-flex align-items-center shadow-sm border-0 mb-4" role="alert">
            <FiAlertCircle className="me-2 fs-4" />
            <div className="small">
              <strong>Peringatan:</strong> Batas waktu pembayaran adalah <strong>5 menit</strong>. Riwayat transaksi yang tidak dibayar akan dihapus otomatis setelah 24 jam.
            </div>
          </div>

          <div className="table-responsive shadow-sm card border-0 rounded-4 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">No</th>
                  <th>Pelatihan</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Sisa Waktu</th>
                  <th className="text-center">Dipesan Pada</th>
                  <th className="text-center pe-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                    <tr><td colSpan="6" className="text-center py-5 text-muted">Memuat data...</td></tr>
                ) : payments.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-5 text-muted">Belum ada transaksi</td></tr>
                ) : (
                    payments.map((item, index) => {
                      const timer = getTimerInfo(item.createdAt);
                      const isSuccess = item.status === "success" || item.status === "settlement";

                      return (
                          <tr key={item.id}>
                            <td className="ps-4 text-muted">{index + 1}</td>
                            <td>
                                <div className="fw-bold text-dark">{item.training}</div>
                                <div className="small text-primary fw-bold">Rp {item.price.toLocaleString('id-ID')}</div>
                            </td>
                            <td className="text-center">
                                <span className={`badge rounded-pill px-3 py-2 ${isSuccess ? "bg-success" : (timer.isExpired ? "bg-danger" : "bg-warning")}`}>
                                  {isSuccess ? "LUNAS" : (timer.isExpired ? "EXPIRED" : "PENDING")}
                                </span>
                            </td>
                            <td className="text-center">
                                {!isSuccess && !timer.isExpired ? (
                                  <span className="text-primary fw-bold d-inline-flex align-items-center">
                                      <FiClock className="me-1" /> {timer.text}
                                  </span>
                                ) : "-"}
                            </td>
                            <td className="text-center small text-muted">
                                {formatTanggal(item.createdAt)}
                            </td>
                            <td className="text-center pe-4">
                                {isSuccess ? (
                                  <span className="text-success small fw-bold"><FiCheckCircle className="me-1"/>SELESAI</span>
                                ) : timer.isExpired ? (
                                  <span className="text-danger small fw-bold">BATAL</span>
                                ) : (
                                  <button className="btn btn-primary btn-sm rounded-pill px-3 fw-bold" onClick={() => handlePayment(item.id)} disabled={isPaying}>
                                      {isPaying ? "..." : "Bayar Sekarang"}
                                  </button>
                                )}
                            </td>
                          </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}