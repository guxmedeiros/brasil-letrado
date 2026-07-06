import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Navbar({ darkMode, onToggleDark }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <img src={logo} alt="Logo" className="brand-icon" style={{ height: '42px', width: '42px' }} />
        <span>
          Brasil Letrado
          <span className="brand-sub">Alfabetização de Adultos</span>
        </span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/educadores"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <i className="pi pi-graduation-cap" />
          Educadores
        </NavLink>

        <NavLink
          to="/turmas"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <i className="pi pi-users" />
          Turmas
        </NavLink>

        <NavLink
          to="/alunos"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <i className="pi pi-user" />
          Alunos
        </NavLink>
      </div>

      <div className="navbar-actions">
        <button
          id="dark-mode-toggle"
          className="p-button p-button-text p-button-rounded"
          onClick={onToggleDark}
          title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            transition: 'background 0.2s'
          }}
        >
          <i className={`pi ${darkMode ? 'pi-sun' : 'pi-moon'}`} />
        </button>
      </div>
    </nav>
  );
}
