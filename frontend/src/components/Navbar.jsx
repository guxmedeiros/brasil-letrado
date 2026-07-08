import React, { useState } from 'react';
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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="nav-link"
                onClick={handleLinkClick}
                style={{ textDecoration: 'none', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <i className="pi pi-sign-in" />
                Entrar
              </NavLink>
              <NavLink
                to="/cadastro"
                className="nav-link"
                onClick={handleLinkClick}
                style={{ textDecoration: 'none', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--amber)', color: 'var(--navy)', borderRadius: '8px', marginBottom: '1rem' }}
              >
                <i className="pi pi-user-plus" />
                Cadastrar
              </NavLink>
            </>
          ) : (
            <>
              {instituicao?.nome && (
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <i className="pi pi-building" />
                    <span style={{ fontWeight: 700 }}>{instituicao.nome}</span>
                  </div>
                </div>
              )}
              {authenticatedMenuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  onClick={handleLinkClick}
                  style={{ textDecoration: 'none', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <i className={item.icon} />
                  {item.label}
                </NavLink>
              ))}
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                <button
                  id="logout-btn"
                  className="btn-logout"
                  onClick={handleLogout}
                  title="Sair da conta"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem', marginTop: '0.5rem' }}
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
