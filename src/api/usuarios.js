// src/api/usuarios.js
import api from './axiosInstance';

// Obtener usuarios
export const getUsuarios = async () => {
  const response = await api.get('/usuario/usuarios');
  return response.data;
};

// Crear usuario
export const crearUsuario = async (usuario) => {
  const response = await api.post('/usuario/registrar', usuario);
  return response.data;
};

// Actualizar usuario
export const editarUsuario = async (id, usuario) => {
  const response = await api.put(`/usuario/editar/${id}`, usuario);
  return response.data;
};
