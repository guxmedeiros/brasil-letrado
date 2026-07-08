
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../context/AuthContext';
import { required, email, validate } from '../utils/validators';
import logo from '../assets/logo.svg';
import './LoginPage.css';

const EMPTY_FORM = { email: '', senha: '' };

export default function LoginPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    // Limpa erro do campo ao digitar
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }));
    }
    if (error) setError('');
  };

  const validar = () => {
    const errs = {};
    errs.email = validate(form.email, [
      (v) => required(v, 'E-mail é obrigatório'),
      (v) => email(v)
    ]);
    errs.senha = validate(form.senha, [
      (v) => required(v, 'Senha é obrigatória')
    ]);
    // Remove erros nulos
    Object.keys(errs).forEach(key => {
      if (!errs[key]) delete errs[key];
    });
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(form.email.trim(), form.senha);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Credenciais inválidas. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast ref={toast} position="top-right" />
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Logo Brasil Letrado" />
          <h1>Brasil Letrado</h1>
          <p>Alfabetização de Adultos</p>
        </div>

        <h2 className="auth-title">Entrar na plataforma</h2>

        {error && (
          <div className="auth-error">
            <i className="pi pi-exclamation-circle" />
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="login-email">E-mail da instituição *</label>
            <InputText
              id="login-email"
              type="email"
              value={form.email}
              onChange={handleInputChange('email')}
              placeholder="contato@instituicao.org"
              autoComplete="email"
              autoFocus
              className={fieldErrors.email ? 'p-invalid' : ''}
            />
            {fieldErrors.email && <small className="p-error">{fieldErrors.email}</small>}
          </div>
          <div className="field">
            <label htmlFor="login-senha">Senha *</label>
            <InputText
              id="login-senha"
              type="password"
              value={form.senha}
              onChange={handleInputChange('senha')}
              placeholder="••••••••"
              autoComplete="current-password"
              className={fieldErrors.senha ? 'p-invalid' : ''}
            />
            {fieldErrors.senha && <small className="p-error">{fieldErrors.senha}</small>}
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-loading-wrapper">
                <ProgressSpinner className="auth-loading-spinner" strokeWidth="4" />
                Entrando...
              </span>
            ) : 'Entrar'}
          </button>
        </form>

        <p className="auth-alt">
          Ainda não tem conta?{' '}
          <Link to="/cadastro">Cadastre sua instituição</Link>
        </p>
      </div>
    </div>
  );
}
