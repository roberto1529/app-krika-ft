import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir automáticamente el token en cada petición
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
