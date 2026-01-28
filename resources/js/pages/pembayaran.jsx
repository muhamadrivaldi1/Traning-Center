import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser, FiSearch, FiDownload } from "react-icons/fi";
import { FaCheckCircle, FaClock, FaTimesCircle, FaCreditCard } from "react-icons/fa";
import "../../css/app.css";
// 1. PASTIKAN IMPORT INI ADA
import api from "../api"; 

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [payments, setPayments] = useState([]); 

  // FUNGSI PEMBAYARAN
  const handlePayment = (snapToken) => {
    if (!snapToken) {
      alert("Token pembayaran tidak ditemukan. Silakan hubungi admin.");
      return;
    }

    window.snap.pay(snapToken, {
      onSuccess: () => {
        alert("Pembayaran Berhasil! Terima kasih.");
        window.location.reload(); 
      },
      onPending: () => alert("Pendaftaran tercatat. Silakan selesaikan pembayaran Anda."),
      onError: () => alert("Pembayaran Gagal. Silakan coba beberapa saat lagi."),
      onClose: () => alert("Anda menutup halaman pembayaran sebelum selesai.")
    });
  };

  // LOAD DATA (TEMA, USER, & DATA API)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }

    const fetchPayments = async () => {
      try {
        const response = await api.get("/my-trainings"); 
        
        const formattedData = response.data.map(item => ({
          id: item.id,
          training: item.training?.name || "Pelatihan",
          invoice: `INV-${item.id}`,
          amount: item.training?.cost || 0,
          status: item.status.toLowerCase(), 
          date: item.created_at,
          snap_token: item.snap_token, 
          code: item.snap_token ? "MID-SNAP" : "-"
        }));

        setPayments(formattedData);
      } catch (err) {
        console.error("Gagal memuat riwayat pembayaran:", err);
      }
    };

    fetchPayments();

    return () => document.body.classList.remove("dark-theme");
  }, [navigate]);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    document.body.classList.toggle("dark-theme", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredPayments = payments.filter((payment) => {
    const matchSearch = payment.training.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       payment.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPayments = payments.length;
  const lunasCount = payments.filter(p => p.status === "lunas" || p.status === "success").length;
  const pendingCount = payments.filter(p => p.status === "pending").length;
  const totalAmount = payments
    .filter(p => p.status === "lunas" || p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      lunas: { icon: <FaCheckCircle />, label: "Lunas", color: "#10b981", bg: "#d1fae5" },
      success: { icon: <FaCheckCircle />, label: "Lunas", color: "#10b981", bg: "#d1fae5" },
      pending: { icon: <FaClock />, label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
      gagal: { icon: <FaTimesCircle />, label: "Gagal", color: "#ef4444", bg: "#fee2e2" }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", color: config.color, backgroundColor: config.bg }}>
        {config.icon} {config.label}
      </span>
    );
  };

  return (
    <>
      <Sidebar isOpen={isOpen} />
      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR (Tetap Sama) */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span></span><span></span><span></span>
          </button>
          <div className="topbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>{isDarkMode ? <FiSun /> : <FiMoon />}</button>
            <div className="user-menu-container">
              <button className="user-menu-btn" onClick={() => setShowUserMenu(!showUserMenu)}><FiUser /></button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{user?.name || "User"}</p>
                    <p className="user-email">{user?.email || "-"}</p>
                  </div>
                  <hr />
                  <button className="profile-btn" onClick={() => navigate("/profil")}>Data Pribadi</button>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid py-4">
          <h2 className="page-title mb-4">Riwayat Pembayaran</h2>

          {/* STATS CARDS */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
               <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "20px", borderRadius: "12px", color: "white" }}>
                <div>Total Pembayaran</div>
                <div className="fs-2 fw-bold">{totalPayments}</div>
              </div>
            </div>
            <div className="col-md-3">
               <div style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "20px", borderRadius: "12px", color: "white" }}>
                <div>Lunas</div>
                <div className="fs-2 fw-bold">{lunasCount}</div>
              </div>
            </div>
            <div className="col-md-3">
               <div style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", padding: "20px", borderRadius: "12px", color: "white" }}>
                <div>Pending</div>
                <div className="fs-2 fw-bold">{pendingCount}</div>
              </div>
            </div>
            <div className="col-md-3">
               <div style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", padding: "20px", borderRadius: "12px", color: "white" }}>
                <div>Total Terbayar</div>
                <div className="fs-4 fw-bold">{formatCurrency(totalAmount)}</div>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTER */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="position-relative">
                <FiSearch className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" />
                <input type="text" className="form-control ps-5" placeholder="Cari pelatihan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="lunas">Lunas</option>
              </select>
            </div>
          </div>

          {/* LIST PAYMENTS */}
          <div className="row g-4">
            {filteredPayments.map((payment) => (
              <div className="col-lg-6" key={payment.id}>
                <div className="card border-0 shadow-sm rounded-3">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <div>
                        <h5 className="fw-bold mb-0">{payment.training}</h5>
                        <small className="text-muted">{payment.invoice}</small>
                      </div>
                      <StatusBadge status={payment.status} />
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted d-block">Total</small>
                        <span className="fw-bold text-primary">{formatCurrency(payment.amount)}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block">Tanggal</small>
                        <span>{new Date(payment.date).toLocaleDateString("id-ID")}</span>
                      </div>
                    </div>

                    <div className="border-top pt-3">
                      {payment.status === "pending" && (
                        <button 
                          className="btn btn-warning text-white btn-sm"
                          onClick={() => handlePayment(payment.snap_token)} // Tombol berfungsi!
                        >
                          Bayar Sekarang
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-5 opacity-50">
              <FaCreditCard size={48} />
              <p className="mt-2">Belum ada riwayat pembayaran.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}