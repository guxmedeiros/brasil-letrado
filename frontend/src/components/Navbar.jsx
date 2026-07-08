import React, { useState } from 'react';
import './Navbar.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

// Shared menu configuration
const authenticatedMenuItems = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: 'pi pi-home'
  },
  {
    to: '/educadores',
    label: 'Educadores',
    icon: 'pi pi-graduation-cap'
  },
  {
    to: '/turmas',
    label: 'Turmas',
    icon: 'pi pi-users'
  },
  {
    to: '/alunos',
    label: 'Alunos',
    icon: 'pi pi-user'
  }
];

export default function Navbar() {
  const { isAuthenticated, instituicao, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setSidebarVisible(false);
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = () => {
    setSidebarVisible(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Hamburger Button */}
        <Button
          icon="pi pi-bars"
          className="p-button-text navbar-hamburger"
          aria-label="Abrir menu"
          onClick={() => setSidebarVisible(true)}
        />

        <NavLink to="/" className="navbar-brand" onClick={handleLogoClick}>
          <img src={logo} alt="Logo Brasil Letrado" className="brand-icon" />
          <span>
            Brasil Letrado
            <span className="brand-sub">Alfabetização de Adultos</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        {isAuthenticated && (
          <div className="navbar-links desktop-only">
            {authenticatedMenuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <i className={item.icon} />
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Desktop Actions */}
        <div className="navbar-actions desktop-only">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="btn-logout">
                Entrar
              </NavLink>
              <NavLink to="/cadastro" className="btn-primary-custom">
                Cadastrar
              </NavLink>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="left"
        className="p-sidebar-sm"
        aria-label="Menu de navegação"
      >
        <div className="sidebar-content-wrapper">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="nav-link sidebar-link"
                onClick={handleLinkClick}
              >
                <i className="pi pi-sign-in" />
                Entrar
              </NavLink>
              <NavLink
                to="/cadastro"
                className="nav-link sidebar-link sidebar-link-primary"
                onClick={handleLinkClick}
              >
                <i className="pi pi-user-plus" />
                Cadastrar
              </NavLink>
            </>
          ) : (
            <>
              {instituicao?.nome && (
                <div className="sidebar-inst-section">
                  <div className="sidebar-inst-wrapper">
                    <i className="pi pi-building" />
                    <span className="sidebar-inst-name">{instituicao.nome}</span>
                  </div>
                </div>
              )}
              {authenticatedMenuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link sidebar-link${isActive ? ' active' : ''}`}
                  onClick={handleLinkClick}
                >
                  <i className={item.icon} />
                  {item.label}
                </NavLink>
              ))}
              <div className="sidebar-logout-wrapper">
                <button
                  id="logout-btn"
                  className="btn-logout sidebar-logout-btn"
                  onClick={handleLogout}
                  title="Sair da conta"
                >
                  <i className="pi pi-sign-out" />
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </Sidebar>
    </>
  );
}
