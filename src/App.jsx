import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Tasks from './pages/Tasks';

function App() {
  // Validar si hay sesión activa
  const isAuthenticated = !!localStorage.getItem('jwt');

  // Sidebar abierto o cerrado
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Ancho dinámico para el margen izquierdo
  const sidebarWidth = isOpen ? 250 : 80;

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            <>
              <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              <div style={{ marginLeft: sidebarWidth, transition: 'margin 0.3s' }}>
                <Navbar />
                <Dashboard />
              </div>
            </>
          ) : <Navigate to="/" />
        } 
      />
         <Route 
        path="/tasks" 
        element={
          isAuthenticated ? (
            <>
              <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              <div style={{ marginLeft: sidebarWidth, transition: 'margin 0.3s' }}>
                <Navbar />
                <Tasks />
              </div>
            </>
          ) : <Navigate to="/" />
        } 
      />
      
    </Routes>
  );
}

export default App;
