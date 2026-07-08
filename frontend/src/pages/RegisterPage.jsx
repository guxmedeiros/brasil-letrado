
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { required, email, minLength, cnpj, validate } from '../utils/validators';
import logo from '../assets/logo.svg';
import './RegisterPage.css';

const EMPTY_FORM = { nome: '', cnpj: '', email: '', senha: '', confirmarSenha: '' };

// Componente Field definido FORA para evitar recriação
const Field = ({ id, label, value, onChange, type = 'text', placeholder, error }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <InputText
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'p-invalid' : ''}
    />
    {error && <small className="p-error">{error}</small>}
  </div>
);

export default function RegisterPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }));
    }
    if (error) setError('');
  };

  const validar = () => {
    const errs = {};
    errs.nome = validate(form.nome, [
      (v) => required(v, 'Nome da instituição é obrigatório'),
      (v) => minLength(3)(v, 'Nome deve ter pelo menos 3 caracteres')
    ]);
    errs.cnpj = validate(form.cnpj, [
      (v) => cnpj(v)
    ]);
    errs.email = validate(form.email, [
      (v) => required(v, 'E-mail é obrigatório'),
      (v) => email(v)
    ]);
    errs.senha = validate(form.senha, [
      (v) => required(v, 'Senha é obrigatória'),
      (v) => minLength(6)(v, 'A senha deve ter pelo menos 6 caracteres')
    ]);
    errs.confirmarSenha = validate(form.confirmarSenha, [
      (v) => required(v, 'Confirmação de senha é obrigatória')
    ]);
    if (form.senha && form.confirmarSenha && form.senha !== form.confirmarSenha) {
      errs.confirmarSenha = 'As senhas não coincidem';
    }
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
      await authService.register({ 
        nome: form.nome.trim(), 
        cnpj: form.cnpj.trim(), 
        email: form.email.trim(), 
        senha: form.senha 
      });
      // Auto-login após cadastro
      await login(form.email.trim(), form.senha);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={logo} alt="Logo Brasil Letrado" />
          <h1>Brasil Letrado</h1>
          <p>Alfabetização de Adultos</p>
        </div>

        <h2 className="auth-title">Cadastrar instituição</h2>

        {error && (
          <div className="auth-error">
            <i className="pi pi-exclamation-circle" />
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Field
            id="reg-nome"
            label="Nome da instituição *"
            value={form.nome}
            onChange={handleInputChange('nome')}
            placeholder="ONG Sementes do Saber"
            error={fieldErrors.nome}
          />
          <Field
            id="reg-cnpj"
            label="CNPJ (opcional)"
            value={form.cnpj}
            onChange={handleInputChange('cnpj')}
            placeholder="00.000.000/0001-00"
            error={fieldErrors.cnpj}
          />
          <Field
            id="reg-email"
            label="E-mail *"
            type="email"
            value={form.email}
            onChange={handleInputChange('email')}
            placeholder="contato@instituicao.org"
            error={fieldErrors.email}
          />
          <Field
            id="reg-senha"
            label="Senha *"
            type="password"
            value={form.senha}
            onChange={handleInputChange('senha')}
            placeholder="Mínimo 6 caracteres"
            error={fieldErrors.senha}
          />
          <Field
            id="reg-confirmar"
            label="Confirmar senha *"
            type="password"
            value={form.confirmarSenha}
            onChange={handleInputChange('confirmarSenha')}
            placeholder="Repita a senha"
            error={fieldErrors.confirmarSenha}
          />

          <button
            id="register-submit-btn"
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-loading-wrapper">
                <ProgressSpinner className="auth-loading-spinner" strokeWidth="4" />
                Cadastrando...
              </span>
            ) : 'Criar conta'}
          </button>
        </form>

        <p className="auth-alt">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}

