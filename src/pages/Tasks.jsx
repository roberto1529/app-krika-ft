import React, { useEffect, useState } from "react";
import Select from 'react-select';
import api from "../api/axiosInstance";

function Tasks() {
  const [tareas, setTareas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: "",
    responsable: "",
    estado: "Por hacer",
  });
  const [modo, setModo] = useState("crear");
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    cargarTareas();
    cargarUsuarios();
  }, []);

  const cargarTareas = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const response = await api.post("/tareas/listar", { usuario });
      setTareas(response.data.tareas);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    }
  };

  const cargarUsuarios = async () => {
    try {
      const response = await api.get("/usuario/usuarios");
      const usuariosMapeados = response.data.usuarios.map(usuario => ({
        value: usuario.id,
        label: `${usuario.nombre} ${usuario.apellido}`,
      }));
      setUsuarios(usuariosMapeados);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleEditarTarea = (tarea) => {
    setTareaSeleccionada(tarea);
    setNuevaTarea({
      nombre: tarea.nombre,
      responsable: usuarios.find(user => user.label.includes(tarea.responsable))?.value || "",
      estado: tarea.estado,
    });
    setModo("editar");
  };

  const handleCrearTarea = async () => {
    try {
      await api.post("/tareas/crear", nuevaTarea);
      cargarTareas();
      setNuevaTarea({ nombre: "", responsable: "", estado: "Por hacer" });
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleActualizarTarea = async () => {
    try {
      await api.put(`/tareas/actualizar/${tareaSeleccionada.id}`, nuevaTarea);
      cargarTareas();
      setNuevaTarea({ nombre: "", responsable: "", estado: "Por hacer" });
      setModo("crear");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleEliminarTarea = async (id) => {
    try {
      await api.delete(`/tareas/eliminar/${id}`);
      cargarTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleActualizarEstado = async (id, estado) => {
    try {
      await api.put(`/tareas/estado/${id}`, { estado });
      cargarTareas();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({ ...nuevaTarea, [name]: value });
  };

  const handleResponsableChange = (selectedOption) => {
    setNuevaTarea({
      ...nuevaTarea,
      responsable: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSearchChange = (e) => {
    setFiltro(e.target.value.toLowerCase());
  };

  // Filtrar tareas por nombre, responsable o estado
  const tareasFiltradas = tareas.filter((tarea) => {
    const nombreMatch = tarea.nombre.toLowerCase().includes(filtro);
    const responsableMatch = tarea.responsable.toLowerCase().includes(filtro);
    const estadoMatch = tarea.estado.toLowerCase().includes(filtro);
    return nombreMatch || responsableMatch || estadoMatch;
  });

  return (
    <div className="container mt-5">
      <h2>Tareas</h2>

      {/* Buscador de alta velocidad */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Buscar por nombre, responsable o estado"
          value={filtro}
          onChange={handleSearchChange}
        />
      </div>

      {/* Tabla de tareas */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Responsable</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareasFiltradas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.nombre}</td>
              <td>{tarea.responsable}</td>
              <td>{tarea.estado}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditarTarea(tarea)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleEliminarTarea(tarea.id)}
                >
                  Eliminar
                </button>
                {usuario?.rol === "administrador" && (
                  <button
                    className="btn btn-info ms-2"
                    onClick={() => handleActualizarEstado(tarea.id, "Finalizado")}
                  >
                    Marcar como finalizado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario de creación de tarea debajo de la tabla */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nombre de la tarea"
          name="nombre"
          value={nuevaTarea.nombre}
          onChange={handleInputChange}
        />

        <Select
          className="mb-2"
          options={usuarios}
          onChange={handleResponsableChange}
          value={usuarios.find(user => user.value === nuevaTarea.responsable) || null}
          placeholder="Seleccionar responsable"
        />

        <select
          className="form-control mb-2"
          name="estado"
          value={nuevaTarea.estado}
          onChange={handleInputChange}
        >
          <option value="Por hacer">Por hacer</option>
          <option value="En progreso">En progreso</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        {modo === "crear" ? (
          <button
            className="btn btn-primary"
            onClick={handleCrearTarea}
          >
            Crear tarea
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={handleActualizarTarea}
          >
            Actualizar tarea
          </button>
        )}
      </div>
    </div>
  );
}

export default Tasks;
