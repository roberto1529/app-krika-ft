import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    api.post('/usuario/autenticar', { email, password })
      .then(res => {
        const { tk, datos } = res.data;
        localStorage.setItem('jwt', tk);
        localStorage.setItem('usuario', JSON.stringify(datos[0]));
        setMensaje('¡Login exitoso!');
        window.location.reload();
        navigate('/dashboard');
      })
      .catch(err => {
        console.error(err);
        setMensaje('Credenciales incorrectas.');
      });
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* Izquierda — Formulario */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="w-75">
            <h2 className="mb-4">Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input 
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
          </div>
        </div>

        {/* Derecha — Espacio libre */}
        <div className="col-md-6 bg-primary d-none d-md-block">
          {/* Aquí puedes agregar una imagen o dejarlo vacío */}
        </div>

      </div>
    </div>
  );
}

export default Login;
