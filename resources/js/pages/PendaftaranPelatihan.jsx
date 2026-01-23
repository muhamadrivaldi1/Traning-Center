import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function PendaftaranPelatihan() {
    const location = useLocation();
    const training = location.state?.training;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">

                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-4 p-md-5">

                            {/* HEADER */}
                            <div className="text-center mb-5">
                                <h3 className="fw-bold text-primary mb-1">
                                    Pendaftaran Pelatihan
                                </h3>

                                <p className="text-muted">
                                    {training?.name || "Pelatihan Web Development"}
                                </p>
                                <hr className="w-25 mx-auto" />
                            </div>

                            {/* FORM */}
                            <form>
                                <div className="row g-4">

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Nama lengkap"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            NIM
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="22101140xxxx"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            placeholder="email@gmail.com"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            No HP
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="08xxxxxxxx"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Jurusan
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Teknik Informatika"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Pelatihan
                                        </label>
                                        <select className="form-select form-select-lg">
                                            <option>
                                                {training?.name || "Pelatihan Web Development"}
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-semibold">
                                            Alamat
                                        </label>
                                        <textarea
                                            className="form-control form-control-lg"
                                            rows="4"
                                            placeholder="Alamat lengkap"
                                        />
                                    </div>

                                    {/* BUTTON AREA */}
                                    <div className="col-12 mt-4">
                                        <div className="d-flex flex-column align-items-center gap-3">

                                            <button
                                                type="submit"
                                                className="btn btn-primary px-5 py-2 fw-semibold"
                                            >
                                                Daftar Sekarang
                                            </button>

                                            <Link
                                                to="/dashboard"
                                                className="btn btn-outline-secondary px-5 py-2"
                                            >
                                                ← Kembali ke Dashboard
                                            </Link>

                                        </div>
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
