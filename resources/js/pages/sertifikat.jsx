import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import QRCode from "qrcode";
import { FiSun, FiMoon, FiUser, FiDownload, FiEye } from "react-icons/fi";
import { FaCertificate } from "react-icons/fa";
import "../../css/app.css";

export default function Sertifikat() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [completedTrainings, setCompletedTrainings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }

    const u = localStorage.getItem("user");
    if (!u) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(u));

    setCompletedTrainings([
      {
        id: 1,
        title: "Pelatihan Web Development",
        status: "selesai",
        completedDate: "2024-01-15",
      },
      {
        id: 2,
        title: "Pelatihan Database Management",
        status: "selesai",
        completedDate: "2024-01-20",
      },
    ]);
  }, [navigate]);

  /* ===============================
     KONSTANTA
  =============================== */
  const PRODI = "Teknik Informatika";
  const KETUA_PRODI = "Dr. Andi Wijaya, M.Kom";
  const KETUA_BAGIAN = "Prof. Budi Santoso, M.T";

  const generateNumber = (userId, trainingId) => {
    const year = new Date().getFullYear();
    return `TCF-${year}-${String(userId).padStart(3, "0")}${String(
      trainingId
    ).padStart(3, "0")}`;
  };

  /* ===============================
    GENERATE SERTIFIKAT
 =============================== */
  const generateCertificate = async (training) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const bg = new Image();
    bg.src = "/images/Sertif1.jpeg";

    await new Promise((res, rej) => {
      bg.onload = res;
      bg.onerror = rej;
    });

    const WIDTH = 3508;
    const HEIGHT = 2480;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

    const certNumber = generateNumber(user.id, training.id);

    ctx.textAlign = "center";

    /* ===============================
       NAMA PESERTA
    =============================== */
    ctx.font = "bold 90px Georgia";
    ctx.fillStyle = "#1a202c";
    ctx.fillText(
      user.name.toUpperCase(),
      WIDTH / 2,
      HEIGHT * 0.47
    );

    /* ===============================
       JUDUL
    =============================== */
    ctx.font = "bold 60px Georgia";
    ctx.fillText(
      training.title,
      WIDTH / 2,
      HEIGHT * 0.57
    );

    /* ===============================
       PROGRAM STUDI
    =============================== */
    ctx.font = "48px Arial";
    ctx.fillStyle = "#2d3748";
    ctx.fillText(
      `Program Studi ${PRODI}`,
      WIDTH / 2,
      HEIGHT * 0.66
    );

    /* ===============================
   TANDA TANGAN (SESUIAI BACKGROUND)
   GARIS SUDAH DARI GAMBAR
=============================== */

    ctx.textAlign = "center";

    /* === POSISI PRESISI === */
    const nameY = HEIGHT * 0.755;   // tepat di atas garis
    const titleY = HEIGHT * 0.795;  // tepat di bawah garis

    /* === POSISI HORIZONTAL === */
    const LEFT = WIDTH * 0.32;
    const RIGHT = WIDTH * 0.68;

    /* === NAMA PEJABAT === */
    ctx.font = "46px Arial";
    ctx.fillStyle = "#111";
    ctx.fillText(KETUA_PRODI, LEFT, nameY);
    ctx.fillText(KETUA_BAGIAN, RIGHT, nameY);

    /* === JABATAN === */
    ctx.font = "34px Arial";
    ctx.fillStyle = "#444";
    ctx.fillText("Ketua Program Studi", LEFT, titleY);
    ctx.fillText("Ketua Bagian", RIGHT, titleY);

    /* ===============================
       QR CODE
    =============================== */

    const qrData = await QRCode.toDataURL(
      `https://tcf.unpam.ac.id/verify/${certNumber}`
    );

    const qr = new Image();
    qr.src = qrData;
    await new Promise((r) => (qr.onload = r));

    const qrSize = 230;
    const qrX = WIDTH / 2 - qrSize / 2;
    const qrY = HEIGHT * 0.83;

    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

    /* ===============================
       NOMOR SERTIFIKAT
    =============================== */

    ctx.font = "30px Arial";
    ctx.fillStyle = "#444";
    ctx.fillText(
      `No Sertifikat : ${certNumber}`,
      WIDTH / 2,
      qrY + qrSize + 38
    );

    return canvas;
  };
  /* ===============================
     DOWNLOAD
  =============================== */
  const download = async (training) => {
    const canvas = await generateCertificate(training);
    const link = document.createElement("a");
    link.download = `Sertifikat-${training.title}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  /* ===============================
     PREVIEW
  =============================== */
  const previewCert = async (training) => {
    const canvas = await generateCertificate(training);
    setPreview(canvas.toDataURL());
  };

  if (!user) return null;

  return (
    <>
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        <h2 className="page-title">
          <FaCertificate /> Sertifikat Saya
        </h2>

        <div className="training-grid">
          {completedTrainings.map((t) => (
            <div key={t.id} className="training-card">
              <h5>{t.title}</h5>

              <button className="training-btn" onClick={() => download(t)}>
                <FiDownload /> Download
              </button>
              <br>
              </br>

              <button
                className="training-btn"
                style={{ background: "#6c757d" }}
                onClick={() => previewCert(t)}
              >
                <FiEye /> Preview
              </button>
            </div>
          ))}
        </div>

        {preview && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
            onClick={() => setPreview(null)}
          >
            <img
              src={preview}
              style={{
                maxWidth: "95%",
                maxHeight: "95vh",
                borderRadius: 12,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
