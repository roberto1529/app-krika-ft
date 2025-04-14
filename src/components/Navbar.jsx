import React, { useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Asegúrate de tenerlo importado

function Navbar() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));



  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a
          className="navbar-brand text-primary fw-bold fs-4"
          href="#"
          data-bs-placement="bottom"
          title="Krika - Prueba técnica Roberto Molina"
        >
          Krika
        </a>

        <div className="d-flex ms-auto align-items-center">
          {usuario && (
            <span className="me-3 text-primary fw-semibold d-flex align-items-center">
              <i className="bi bi-person-circle me-2 fs-5"></i>
              {usuario.nombre} {usuario.apellido}
            </span>
          )}
          <button className="btn btn-primary text-while fw-bold" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
