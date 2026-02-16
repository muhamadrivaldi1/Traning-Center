import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiPlayCircle, FiFileText, FiClipboard, FiLock, FiChevronLeft, FiYoutube, FiCheckCircle } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import api from "../api"; // Instance axios yang sudah kamu buat
import "../../css/app.css";

export default function Pembelajaran() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Ambil data training dari state navigasi
  const training = location.state?.training;

  const [isOpen, setIsOpen] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [currentDay] = useState("Senin"); // Bisa dinamis sesuai hari real: new Date().toLocaleDateString('id-ID', {weekday: 'Long'})

  // Data Materi (Bisa dipindah ke database nantinya)
  const scheduleData = [
    {
      day: "Senin",
      title: "Pertemuan 1: Pengenalan & Dasar",
      youtubeId: "dQw4w9WgXcQ", 
      moduleUrl: "#",
      pretestUrl: "https://forms.gle/test1",
      desc: "Membahas fundamental dan instalasi tools yang diperlukan."
    },
    {
      day: "Selasa",
      title: "Pertemuan 2: Praktik Lanjutan",
      youtubeId: "7P9Onh_S_E8",
      moduleUrl: "#",
      pretestUrl: "https://forms.gle/test2",
      desc: "Penerapan teori ke dalam kasus nyata secara mendalam."
    },
    {
      day: "Rabu",
      title: "Pertemuan 3: Final Project",
      youtubeId: "JmDshR8-NSc",
      moduleUrl: "#",
      pretestUrl: "https://forms.gle/test3",
      desc: "Evaluasi akhir dan penyelesaian proyek pelatihan."
    }
  ];

  useEffect(() => {
    // PROTEKSI: Jika training kosong (karena refresh), arahkan balik ke Pelatihan Saya
    if (!training) {
      alert("Sesi berakhir atau halaman di-refresh. Silakan pilih kembali pelatihan Anda.");
      navigate("/PelatihanSaya");
      return;
    }

    // Set materi default ke hari ini
    const today = scheduleData.find(s => s.day === currentDay);
    if (today) setActiveContent(today);
  }, [training, navigate]);

  // Jika training kosong, jangan render apapun (mencegah error .name)
  if (!training) return null;

  return (
    <>
      <Sidebar isOpen={isOpen} />
      
      <div className={`main-content ${isOpen ? "sidebar-open" : ""}`}>
        {/* TOPBAR */}
        <div className="topbar">
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            <span></span><span></span><span></span>
          </button>
          <div className="topbar-title">
            <h5 className="mb-0 fw-bold">{training.name || training.title}</h5>
          </div>
        </div>

        <div className="container-fluid p-4">
          <div className="row g-4">
            
            {/* SISI KIRI: KONTEN UTAMA */}
            <div className="col-lg-8">
              {activeContent ? (
                <div className="card border-0 shadow-sm rounded-4 p-4">
                  <h4 className="fw-bold mb-4">{activeContent.title}</h4>

                  {/* PRE-TEST BOX */}
                  <div className="alert alert-primary border-0 rounded-4 d-flex justify-content-between align-items-center p-3 mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <FiClipboard size={24} />
                      <div>
                        <h6 className="mb-0 fw-bold">Pre-Test {activeContent.day}</h6>
                        <small>Wajib dikerjakan sebelum melihat materi.</small>
                      </div>
                    </div>
                    <a href={activeContent.pretestUrl} target="_blank" rel="noreferrer" className="btn btn-primary rounded-pill px-4">Mulai</a>
                  </div>

                  {/* YOUTUBE VIDEO */}
                  <div className="ratio ratio-16x9 rounded-4 overflow-hidden mb-4 shadow-sm">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeContent.youtubeId}`}
                      title="Materi Pelatihan"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* MODUL */}
                  <div className="bg-light p-3 rounded-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <FiFileText className="text-primary" />
                      <span className="fw-medium">Modul Materi (PDF)</span>
                    </div>
                    <a href={activeContent.moduleUrl} className="btn btn-sm btn-outline-dark rounded-pill">Download</a>
                  </div>
                </div>
              ) : (
                <div className="text-center p-5">Memuat materi...</div>
              )}
            </div>

            {/* SISI KANAN: JADWAL */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h5 className="fw-bold mb-4">Daftar Pertemuan</h5>
                <div className="list-group list-group-flush">
                  {scheduleData.map((item, index) => {
                    const days = ["Senin", "Selasa", "Rabu"];
                    const isLocked = days.indexOf(item.day) > days.indexOf(currentDay);
                    const isActive = activeContent?.day === item.day;

                    return (
                      <button
                        key={index}
                        disabled={isLocked}
                        onClick={() => setActiveContent(item)}
                        className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center justify-content-between ${isActive ? 'bg-primary text-white' : 'bg-light'}`}
                      >
                        <div className="d-flex align-items-center gap-3">
                          {isLocked ? <FiLock /> : <FiYoutube />}
                          <div className="text-start">
                            <p className="mb-0 fw-bold small">{item.day}</p>
                            <small className={isActive ? 'text-white-50' : 'text-muted'}>{item.title}</small>
                          </div>
                        </div>
                        {!isLocked && isActive && <FiCheckCircle />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}