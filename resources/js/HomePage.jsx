import React from "react";

function HomePage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a className="navbar-brand fw-bold text-white" href="#">
          Training Center
        </a>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="userMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle fs-5 me-2"></i>
                <span>Akun</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userMenu"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Profil Saya
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Mode Gelap/Terang
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item text-danger" href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-5 bg-light">
        <div className="container">
          <h1 className="display-5 fw-bold text-primary">
            Selamat Datang di Training Center FILKOM 🚀
          </h1>
          <p className="lead mt-3">
            Belajar teknologi masa depan dengan instruktur berpengalaman.
          </p>
          <button className="btn btn-primary btn-lg mt-3">
            Mulai Belajar
          </button>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Fitur Unggulan</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h4>Kursus Online</h4>
                <p>Belajar kapan saja dengan materi interaktif.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h4>Instruktur Ahli</h4>
                <p>Dapatkan bimbingan dari profesional industri.</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm p-3">
                <h4>Sertifikat Resmi</h4>
                <p>Raih sertifikat untuk menambah nilai kariermu.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
