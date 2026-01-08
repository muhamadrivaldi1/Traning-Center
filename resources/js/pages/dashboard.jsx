import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../../css/app.css";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const userName = "(nama user)";

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
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #010742, #2336DE)",
              borderRadius: "16px",
              padding: "40px",
              marginBottom: "30px",
              color: "white",
              textAlign: "center",
            }}
          >
            <h1 style={{ margin: 0, fontWeight: "800" }}>
              Hallo, {userName}
            </h1>
            <p style={{ marginTop: "10px", opacity: 0.9 }}>
              Selamat datang kembali di Dashboard
            </p>
          </div>

          {/* Progress Chart Section */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "30px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ color: "#131D78", margin: 0 }}>📈 Progres Belajar</h3>
              <select style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "white",
                color: "#666"
              }}>
                <option>7 Hari Terakhir</option>
                <option>30 Hari Terakhir</option>
                <option>3 Bulan Terakhir</option>
              </select>
            </div>

            {/* Simple Progress Chart */}
            <div style={{ marginBottom: "30px" }}>
              <div style={{
                display: "flex",
                alignItems: "end",
                height: "200px",
                gap: "8px",
                padding: "20px 0",
                borderBottom: "2px solid #f0f0f0"
              }}>
                {[65, 45, 80, 60, 90, 75, 85].map((height, index) => (
                  <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "40px",
                        height: `${height}%`,
                        background: `linear-gradient(180deg, #131D78 ${height}%, #e0e0e0 ${height}%)`,
                        borderRadius: "4px 4px 0 0",
                        transition: "all 0.3s ease",
                        position: "relative"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scaleY(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scaleY(1)";
                      }}
                    >
                      <div style={{
                        position: "absolute",
                        top: "-25px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#131D78",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        opacity: 0,
                        transition: "opacity 0.3s ease"
                      }}>
                        {height}%
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                      {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#131D78" }}>85%</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Rata-rata Mingguan</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>+12%</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Peningkatan</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>4.2h</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Waktu Belajar</div>
              </div>
            </div>
          </div>

          {/* Learning Details Section */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "30px" }}>
            {/* Current Learning */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ color: "#131D78", marginBottom: "20px" }}>
                🎯 Pelatihan Berlangsung
              </h3>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "#666" }}>React.js Development</span>
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "#131D78" }}>75%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: "75%",
                    height: "100%",
                    background: "linear-gradient(90deg, #131D78, #2f3dbf)",
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                  }}></div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", color: "#666" }}>Digital Marketing</span>
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "#131D78" }}>45%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: "45%",
                    height: "100%",
                    background: "linear-gradient(90deg, #ffc107, #ff8c00)",
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                  }}></div>
                </div>
              </div>

              <button style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #131D78, #2f3dbf)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #0f165f, #1a237e)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #131D78, #2f3dbf)";
              }}>
                Lanjutkan Belajar
              </button>
            </div>

            {/* Statistics Card */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ color: "#131D78", marginBottom: "20px" }}>
                📊 Statistik Belajar
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#666" }}>Total Pelatihan</span>
                  <span style={{ fontWeight: "bold", color: "#131D78" }}>8</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#666" }}>Pelatihan Selesai</span>
                  <span style={{ fontWeight: "bold", color: "#28a745" }}>5</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#666" }}>Pelatihan Berlangsung</span>
                  <span style={{ fontWeight: "bold", color: "#ffc107" }}>2</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#666" }}>Pelatihan Akan Datang</span>
                  <span style={{ fontWeight: "bold", color: "#6c757d" }}>1</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#666" }}>Total Jam Belajar</span>
                  <span style={{ fontWeight: "bold", color: "#131D78" }}>42.5 jam</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#666" }}>Sertifikat Didapat</span>
                  <span style={{ fontWeight: "bold", color: "#28a745" }}>3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities & Achievements */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            {/* Recent Activities */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ color: "#131D78", marginBottom: "20px" }}>
                🕒 Aktivitas Terbaru
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #28a745, #20c997)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "18px"
                  }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: "#131D78", fontSize: "14px" }}>
                      Menyelesaikan Modul React Hooks
                    </div>
                    <div style={{ color: "#666", fontSize: "12px" }}>2 jam yang lalu</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #ffc107, #ff8c00)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "18px"
                  }}>
                    📚
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: "#131D78", fontSize: "14px" }}>
                      Memulai Kursus Digital Marketing
                    </div>
                    <div style={{ color: "#666", fontSize: "12px" }}>1 hari yang lalu</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #131D78, #2f3dbf)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "18px"
                  }}>
                    🏆
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: "#131D78", fontSize: "14px" }}>
                      Mendapatkan Sertifikat Web Development
                    </div>
                    <div style={{ color: "#666", fontSize: "12px" }}>3 hari yang lalu</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 style={{ color: "#131D78", marginBottom: "20px" }}>
                🏅 Pencapaian
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
                <div style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                  borderRadius: "12px",
                  color: "#131D78"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>🚀</div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>Pembelajar Cepat</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>5 kursus selesai</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "linear-gradient(135deg, #e91e63, #f06292)",
                  borderRadius: "12px",
                  color: "white"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>💪</div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>Konsisten</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>7 hari berturut</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "linear-gradient(135deg, #9c27b0, #ba68c8)",
                  borderRadius: "12px",
                  color: "white"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>🎯</div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>Target Master</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>100% completion</div>
                </div>

                <div style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "linear-gradient(135deg, #00bcd4, #4dd0e1)",
                  borderRadius: "12px",
                  color: "white"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "5px" }}>⭐</div>
                  <div style={{ fontWeight: "bold", fontSize: "14px" }}>Top Student</div>
                  <div style={{ fontSize: "12px", opacity: 0.8 }}>Nilai tertinggi</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
