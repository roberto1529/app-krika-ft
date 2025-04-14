import React, { useState, useEffect } from "react";

const UsuarioForm = ({ usuarioActual, onGuardar, modo, onCerrar }) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    rol: "usuario", // Valor por defecto
  });

  useEffect(() => {
    if (modo === "editar" && usuarioActual) {
      setUsuario({
        nombre: usuarioActual.nombre,
        apellido: usuarioActual.apellido,
        correo: usuarioActual.correo,
        contrasena: "",
        rol: usuarioActual.rol,
      });
    }
  }, [usuarioActual, modo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(usuario);
  };

  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{modo === "editar" ? "Editar Usuario" : "Crear Usuario"}</h5>
            <button type="button" className="btn-close" onClick={onCerrar}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  name="apellido"
                  value={usuario.apellido}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="correo"
                  value={usuario.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contraseña"
                  name="contrasena"
                  value={usuario.contrasena}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <select
                  name="rol"
                  className="form-control"
                  value={usuario.rol}
                  onChange={handleInputChange}
                >
                  <option value="usuario">Usuario</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCerrar}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {modo === "editar" ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsuarioForm;
