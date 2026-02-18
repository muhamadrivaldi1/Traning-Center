import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { 
  FiPlayCircle, FiArrowLeft, FiBookOpen, 
  FiVideo, FiFileText, FiHelpCircle, FiChevronDown, FiMenu, FiCalendar, FiExternalLink 
} from "react-icons/fi";
import "../../css/app.css";

export default function Pembelajaran() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk Tab Navigasi Atas
  const [activeTab, setActiveTab] = useState("Materi");

  // Data Navigasi Atas
  const topModules = ["Materi", "Tugas", "Referensi", "Diskusi"];

  // Data Jadwal Live (Disesuaikan hari)
  const liveSessions = [
    { day: "Senin", time: "10:00 - 12:00", type: "Zoom", title: "Live Review Aljabar Matriks", link: "#" },
    { day: "Selasa", time: "13:00 - 15:00", type: "YouTube", title: "Streaming Bedah Soal UTS", link: "#" },
    { day: "Rabu", time: "09:00 - 11:00", type: "Zoom", title: "Q&A Sesi Invers Matriks", link: "#" }
  ];

  // Data Konten (Sama seperti sebelumnya)
  const sections = [
    {
      title: "General",
      items: [{ id: 101, type: "text", title: "Kontrak Perkuliahan", content: "Selamat datang..." }]
    },
    {
      title: "Pertemuan 1",
      items: [
        { id: 1, type: "quiz", title: "Pretest Pertemuan 1", content: "Silahkan kerjakan...", link: "#" },
        { id: 2, type: "text", title: "Buku Materi ISBN", content: "Ini adalah modul..." },
        { id: 3, type: "video", title: "Video Ajar: Matriks Dasar", video_url: "https://www.youtube.com/embed/NBZ7VfK10S8" }
      ]
    }
  ];

  const [activeContent, setActiveContent] = useState(sections[1].items[0]);

  return (
    <div className="d-flex bg-light min-vh-100">
      <Sidebar isOpen={isOpen} />
      
      <div className={`main-content w-100 ${isOpen ? "sidebar-open" : ""}`}>
        
        {/* TOPBAR & NAVIGATION MODULES */}
        <div className="bg-white border-bottom sticky-top shadow-sm" style={{ zIndex: 1000 }}>
          {/* Header Bar */}
          <div className="p-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-light d-lg-none" onClick={() => setIsOpen(!isOpen)}>
                <FiMenu />
              </button>
              <button className="btn btn-sm btn-outline-secondary rounded-pill d-flex align-items-center gap-2" onClick={() => navigate(-1)}>
                <FiArrowLeft /> Kembali
              </button>
              <h6 className="mb-0 fw-bold">Aljabar Linier</h6>
            </div>
          </div>

          {/* Module Tabs (Navigasi Atas) */}
          <div className="px-3 d-flex gap-4">
            {topModules.map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveTab(mod)}
                className={`btn border-0 py-3 px-2 fw-bold small transition-all ${
                  activeTab === mod 
                    ? "text-primary border-bottom border-primary border-3" 
                    : "text-muted"
                }`}
                style={{ borderRadius: 0 }}
              >
                {mod}
              </button>
            ))}
          </div>
        </div>

        <div className="container-fluid py-4">
          <div className="row g-4">
            
            {/* AREA KONTEN UTAMA (Kiri) */}
            <div className="col-lg-8">
              
              {/* SEKSI JADWAL LIVE (Berdasarkan Hari) */}
              <div className="mb-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <FiCalendar className="text-primary" /> Jadwal Live Pekan Ini
                </h6>
                <div className="row g-2">
                  {liveSessions.map((session, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="card border-0 shadow-sm rounded-3 bg-white h-100">
                        <div className={`p-1 text-center text-white small rounded-top ${session.type === 'Zoom' ? 'bg-info' : 'bg-danger'}`}>
                          {session.day}
                        </div>
                        <div className="p-3">
                          <div className="small fw-bold mb-1">{session.title}</div>
                          <div className="text-muted extra-small mb-2">{session.time}</div>
                          <a href={session.link} className="btn btn-sm btn-light w-100 border extra-small d-flex align-items-center justify-content-center gap-1">
                            {session.type} Live <FiExternalLink />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AREA DISPLAY MATERI */}
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="card-header bg-white p-4 border-0">
                   <h3 className="fw-bold h4 mb-0">{activeContent.title}</h3>
                </div>

                <div className="card-body p-4 pt-0">
                  {activeContent.type === 'video' && (
                    <div className="ratio ratio-16x9 bg-black rounded-3 overflow-hidden">
                      <iframe src={activeContent.video_url} title="Video" allowFullScreen></iframe>
                    </div>
                  )}

                  {activeContent.type === 'text' && (
                    <div className="p-4 border rounded-3 bg-white">
                      <p className="lh-lg">{activeContent.content}</p>
                    </div>
                  )}

                  {activeContent.type === 'quiz' && (
                    <div className="p-5 text-center border rounded-3 bg-danger-subtle">
                      <FiHelpCircle size={40} className="text-danger mb-2" />
                      <h5>Evaluasi Materi</h5>
                      <button className="btn btn-danger rounded-pill px-4 mt-2">Mulai Kuis</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AREA DAFTAR MODUL (Kanan) */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 sticky-top" style={{ top: '150px' }}>
                <div className="card-header bg-white py-3 border-bottom">
                  <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                    <FiBookOpen className="text-primary" /> Daftar Isi Materi
                  </h6>
                </div>
                
                <div className="p-3 custom-scrollbar" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {sections.map((section, sIdx) => (
                    <div key={sIdx} className="mb-3">
                      <div className="fw-bold text-uppercase extra-small text-muted mb-2">{section.title}</div>
                      <div className="list-group">
                        {section.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setActiveContent(item)}
                            className={`list-group-item list-group-item-action border-0 mb-1 rounded-2 d-flex align-items-center gap-2 p-2 transition-all ${
                              activeContent.id === item.id ? 'bg-primary text-white' : 'bg-white text-dark border'
                            }`}
                          >
                            {item.type === 'video' ? <FiPlayCircle /> : <FiFileText />}
                            <span className="extra-small fw-medium">{item.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .extra-small { font-size: 0.75rem; }
        .bg-danger-subtle { background-color: #fff5f5; }
        .sticky-top { transition: top 0.3s ease; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}