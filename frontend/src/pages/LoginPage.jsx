import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useRef(null);

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.senha) {
      setError('Preencha o e-mail e a senha.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.senha);
      navigate('/educadores');
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
            <label htmlFor="login-email">E-mail da instituição</label>
            <InputText
              id="login-email"
              type="email"
              value={form.email}
              onChange={e => onChange('email', e.target.value)}
              placeholder="contato@instituicao.org"
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="field">
            <label htmlFor="login-senha">Senha</label>
            <InputText
              id="login-senha"
              type="password"
              value={form.senha}
              onChange={e => onChange('senha', e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <ProgressSpinner style={{ width: '18px', height: '18px' }} strokeWidth="4" />
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
