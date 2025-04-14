import React, { useEffect, useState } from "react";
import { getUsuarios, crearUsuario, editarUsuario } from "../api/usuarios";
import UsuarioForm from "../components/UsuarioForm";

function Dashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modo, setModo] = useState("crear");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario")); // Traemos al usuario logueado

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  const handleGuardarUsuario = async (usuario) => {
    try {
      if (modo === "crear") {
        await crearUsuario(usuario);
      } else {
        await editarUsuario(usuarioSeleccionado.id, usuario);
      }
      await cargarUsuarios();
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error guardando usuario:", error);
    }
  };

  const handleEditarUsuario = (usuario) => {
    setModo("editar");
    setUsuarioSeleccionado(usuario);
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setUsuarioSeleccionado(null);
    setModo("crear");
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.nombre} ${usuario.apellido} ${usuario.correo} ${usuario.rol}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    if (usuario?.rol === "administrador") {
      cargarUsuarios();
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Bienvenido, {usuario?.nombre}</h2>

      {/* Solo administradores pueden ver el listado */}
      {usuario?.rol === "administrador" ? (
        <>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Buscar usuario..."
              value={busqueda}
              autoComplete="off"
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button
              className="btn btn-primary ms-3"
              onClick={() => {
                setModo("crear");
                setUsuarioSeleccionado(null);
                setMostrarFormulario(true);
              }}
            >
              Crear Usuario
            </button>
          </div>

          <table className="table table-bordered text-center">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Fecha de Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.apellido}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.rol}</td>
                    <td>{usuario.created_at}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditarUsuario(usuario)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No se encontraron usuarios</td>
                </tr>
              )}
            </tbody>
          </table>

          {mostrarFormulario && (
            <UsuarioForm
              usuarioActual={usuarioSeleccionado}
              onGuardar={handleGuardarUsuario}
              modo={modo}
              onCerrar={handleCerrarFormulario}
            />
          )}
        </>
      ) : (
        <div className="alert alert-info">
          No tienes permisos para ver el listado de usuarios.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
