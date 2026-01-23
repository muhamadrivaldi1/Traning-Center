import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PendaftaranPelatihan() {
    const location = useLocation();
    const navigate = useNavigate();

    // ===============================
    // Ambil user dari localStorage
    // ===============================
    let user = null;
    try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (parsed && parsed.id) user = parsed; // login hanya valid jika ada id
        }
    } catch (e) {
        console.error("Error parsing user:", e);
    }

    // Redirect ke login jika belum login
    useEffect(() => {
        if (!user) {
            navigate("/login", {
                state: { redirectTo: "/pendaftaran-pelatihan" },
            });
        }
    }, [user, navigate]);

    // ===============================
    // Ambil data pelatihan
    // Bisa dari state atau default array
    // ===============================
    const [selectedTraining, setSelectedTraining] = useState(
        location.state?.training || ""
    );

    const [trainingsList, setTrainingsList] = useState([
        { id: 1, name: "Pelatihan React JS" },
        { id: 2, name: "Pelatihan Node JS" },
        { id: 3, name: "Pelatihan UI/UX Design" },
        { id: 4, name: "Pelatihan Data Science" },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedTraining) {
            alert("Silahkan pilih pelatihan terlebih dahulu");
            return;
        }

        alert(`Pendaftaran berhasil untuk ${selectedTraining}`);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4 p-md-5">

                            {/* TITLE */}
                            <h3 className="text-center fw-bold text-primary mb-1">
                                Pendaftaran Pelatihan
                            </h3>

                            {/* FORM */}
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <label className="form-label">Nama Lengkap</label>
                                        <input type="text" className="form-control" required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">NIM</label>
                                        <input type="text" className="form-control" required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">No. Handphone</label>
                                        <input type="text" className="form-control" required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Fakultas</label>
                                        <input type="text" className="form-control" />
                                    </div>

                                    {/* SELECT TRAINING */}
                                    <div className="col-md-6">
                                        <label className="form-label">Pelatihan</label>
                                        <select
                                            className="form-select"
                                            value={selectedTraining}
                                            onChange={(e) => setSelectedTraining(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>
                                                Pilih pelatihan
                                            </option>
                                            {trainingsList.map((t) => (
                                                <option key={t.id} value={t.name}>
                                                    {t.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">Alamat</label>
                                        <textarea className="form-control" rows="4" />
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-5 py-2"
                                        >
                                            Daftar Sekarang
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* BACK */}
                            <div className="text-center mt-4">
                                <Link to="/home"
                                   className="btn btn-secondary px-5 py-2"
                                >
                                    ← Kembali ke Home
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
