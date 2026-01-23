import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FiSun, FiMoon, FiUser, FiSearch, FiDownload } from "react-icons/fi";
import { FaCheckCircle, FaClock, FaTimesCircle, FaCreditCard } from "react-icons/fa";
import "../../css/app.css";

export default function Pembayaran() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Data pembayaran dummy
  const [payments] = useState([
    {
      id: 1,
      training: "Pelatihan Web Development",
      channel: "Transfer Bank BCA",
      code: "PAY123456789",
      amount: 2500000,
      status: "lunas",
      date: "2024-01-15",
      invoice: "INV/2024/001"
    },
    {
      id: 2,
      training: "UI / UX Design",
      channel: "E-Wallet (GoPay)",
      code: "PAY987654321",
      amount: 2000000,
      status: "pending",
      date: "2024-01-20",
      invoice: "INV/2024/002"
    },
    {
      id: 3,
      training: "Cyber Security",
      channel: "Transfer Bank Mandiri",
      code: "PAY456789123",
      amount: 3000000,
      status: "lunas",
      date: "2024-01-10",
      invoice: "INV/2024/003"
    },
    {
      id: 4,
      training: "Data Science",
      channel: "E-Wallet (OVO)",
      code: "PAY789456123",
      amount: 3500000,
      status: "pending",
      date: "2024-01-22",
      invoice: "INV/2024/004"
    },
    {
      id: 5,
      training: "Mobile Development",
      channel: "Transfer Bank BNI",
      code: "PAY321654987",
      amount: 3000000,
      status: "gagal",
      date: "2024-01-18",
      invoice: "INV/2024/005"
    },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, []);

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

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const matchSearch = payment.training.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       payment.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Calculate statistics
  const totalPayments = payments.length;
  const lunas = payments.filter(p => p.status === "lunas").length;
  const pending = payments.filter(p => p.status === "pending").length;
  const totalAmount = payments
    .filter(p => p.status === "lunas")
    .reduce((sum, p) => sum + p.amount, 0);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      lunas: { icon: <FaCheckCircle />, label: "Lunas", color: "#10b981", bg: "#d1fae5" },
      pending: { icon: <FaClock />, label: "Pending", color: "#f59e0b", bg: "#fef3c7" },
      gagal: { icon: <FaTimesCircle />, label: "Gagal", color: "#ef4444", bg: "#fee2e2" }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600",
          color: config.color,
          backgroundColor: config.bg,
        }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

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
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="topbar-right">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
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
                  <div className="user-info">
                    <p className="user-name">{user?.name || "User"}</p>
                    <p className="user-email">{user?.email || "-"}</p>
                  </div>
                  <hr />
                  <button
                    className="profile-btn"
                    onClick={() => navigate("/profil")}
                  >
                    Data Pribadi
                  </button>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container-fluid py-4">
          <h2 className="page-title mb-4">Riwayat Pembayaran</h2>

          {/* STATISTICS CARDS */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                }}
              >
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Total Pembayaran</div>
                <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>
                  {totalPayments}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                }}
              >
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Lunas</div>
                <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>
                  {lunas}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                }}
              >
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Pending</div>
                <div style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>
                  {pending}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                <div style={{ fontSize: "14px", opacity: 0.9 }}>Total Terbayar</div>
                <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "8px" }}>
                  {formatCurrency(totalAmount)}
                </div>
              </div>
            </div>
          </div>

          {/* FILTER & SEARCH */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div style={{ position: "relative" }}>
                <FiSearch
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari pelatihan atau kode pembayaran..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: "36px" }}
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="lunas">Lunas</option>
                <option value="pending">Pending</option>
                <option value="gagal">Gagal</option>
              </select>
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <FiDownload /> Export Data
              </button>
            </div>
          </div>

          {/* PAYMENT CARDS */}
          <div className="row g-4">
            {filteredPayments.map((payment) => (
              <div className="col-lg-6" key={payment.id}>
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div style={{ flex: 1 }}>
                        <h5 className="mb-1" style={{ fontWeight: "700", fontSize: "18px" }}>
                          {payment.training}
                        </h5>
                        <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                          Invoice: {payment.invoice}
                        </p>
                      </div>
                      <StatusBadge status={payment.status} />
                    </div>

                    {/* Details */}
                    <div className="row g-3">
                      <div className="col-6">
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                          Channel Pembayaran
                        </div>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          <FaCreditCard style={{ marginRight: "6px", color: "#667eea" }} />
                          {payment.channel}
                        </div>
                      </div>

                      <div className="col-6">
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                          Kode Pembayaran
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            fontFamily: "monospace",
                          }}
                        >
                          {payment.code}
                        </div>
                      </div>

                      <div className="col-6">
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                          Total Pembayaran
                        </div>
                        <div style={{ fontWeight: "700", fontSize: "18px", color: "#667eea" }}>
                          {formatCurrency(payment.amount)}
                        </div>
                      </div>

                      <div className="col-6">
                        <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                          Tanggal Pembayaran
                        </div>
                        <div style={{ fontWeight: "600", fontSize: "14px" }}>
                          {new Date(payment.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3" style={{ borderTop: "1px solid #eee" }}>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        style={{ borderRadius: "8px" }}
                      >
                        Lihat Detail
                      </button>
                      {payment.status === "lunas" && (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          style={{ borderRadius: "8px" }}
                        >
                          <FiDownload /> Download Invoice
                        </button>
                      )}
                      {payment.status === "pending" && (
                        <button
                          className="btn btn-sm btn-warning text-white"
                          style={{ borderRadius: "8px" }}
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

          {/* Empty State */}
          {filteredPayments.length === 0 && (
            <div className="text-center py-5">
              <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.3 }}>
                <FaCreditCard />
              </div>
              <h5 className="text-muted">Tidak ada data pembayaran</h5>
              <p className="text-muted">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}