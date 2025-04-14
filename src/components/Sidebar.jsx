import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const sidebarWidth = isOpen ? '250px' : '80px';

  return (
    <div
      className="bg-primary text-white p-2 position-fixed d-flex flex-column align-items-start"
      style={{ top: 0, left: 0, bottom: 0, width: sidebarWidth, zIndex: 1000, transition: 'width 0.3s' }}
    >
      <button
        className="btn btn-link text-white mb-3 ms-auto me-2"
        onClick={toggleSidebar}
      >
        <i className={`bi ${isOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
      </button>

      <ul className="list-unstyled w-100">
        <li className="mb-3">
          <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center">
            <i className="bi bi-speedometer2 me-2 fs-5"></i>
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/tasks" className="text-white text-decoration-none d-flex align-items-center">
            <i className="bi bi-list-task me-2 fs-5"></i>
            {isOpen && <span>Tareas</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
