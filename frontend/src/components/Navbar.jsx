import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const { isAuthenticated, instituicao, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand" onClick={handleLogoClick}>
          <img src={logo} alt="Logo Brasil Letrado" className="brand-icon" />
          <span>
            Brasil Letrado
            <span className="brand-sub">Alfabetização de Adultos</span>
          </span>
        </NavLink>

        <div className="navbar-actions">
          <NavLink to="/login" className="btn-logout" style={{ textDecoration: 'none' }}>
            Entrar
          </NavLink>
          <NavLink to="/cadastro" className="btn-primary" style={{
            background: 'var(--amber)',
            color: 'var(--navy)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.4rem 0.85rem',
            fontWeight: 700,
            fontSize: '0.82rem',
            textDecoration: 'none'
          }}>
            Cadastrar
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={handleLogoClick}>
        <img src={logo} alt="Logo Brasil Letrado" className="brand-icon" />
        <span>
          Brasil Letrado
          <span className="brand-sub">Alfabetização de Adultos</span>
        </span>
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <i className="pi pi-home" />
          Dashboard
        </NavLink>
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
        {instituicao?.nome && (
          <div className="navbar-inst">
            <i className="pi pi-building" />
            <span>{instituicao.nome}</span>
          </div>
        )}
        <button
          id="logout-btn"
          className="btn-logout"
          onClick={handleLogout}
          title="Sair da conta"
        >
          <i className="pi pi-sign-out" />
          Sair
        </button>
      </div>
    </nav>
  );
}
