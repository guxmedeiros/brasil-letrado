import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import logo from '../assets/logo.svg';

const EMPTY_FORM = { nome: '', cnpj: '', email: '', senha: '', confirmarSenha: '' };

export default function RegisterPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: null }));
    if (error) setError('');
  };

  const validar = () => {
    const errs = {};
    if (!form.nome.trim())  errs.nome  = 'Nome da instituição é obrigatório';
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    if (!form.senha)        errs.senha = 'Senha é obrigatória';
    if (form.senha.length > 0 && form.senha.length < 6) errs.senha = 'A senha deve ter ao menos 6 caracteres';
    if (form.senha !== form.confirmarSenha) errs.confirmarSenha = 'As senhas não coincidem';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) { setFieldErrors(errs); return; }

    setLoading(true);
    setError('');
    try {
      await authService.register({ nome: form.nome, cnpj: form.cnpj, email: form.email, senha: form.senha });
      // Auto-login após cadastro
      await login(form.email, form.senha);
      navigate('/educadores');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Erro ao cadastrar. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ id, label, field, type = 'text', placeholder }) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <InputText
        id={id}
        type={type}
        value={form[field]}
        onChange={e => onChange(field, e.target.value)}
        placeholder={placeholder}
        className={fieldErrors[field] ? 'p-invalid' : ''}
      />
      {fieldErrors[field] && <small className="p-error">{fieldErrors[field]}</small>}
    </div>
  );

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
          <Field id="reg-nome" label="Nome da instituição *" field="nome" placeholder="ONG Sementes do Saber" />
          <Field id="reg-cnpj" label="CNPJ (opcional)" field="cnpj" placeholder="00.000.000/0001-00" />
          <Field id="reg-email" label="E-mail *" field="email" type="email" placeholder="contato@instituicao.org" />
          <Field id="reg-senha" label="Senha *" field="senha" type="password" placeholder="Mínimo 6 caracteres" />
          <Field id="reg-confirmar" label="Confirmar senha *" field="confirmarSenha" type="password" placeholder="Repita a senha" />

          <button
            id="register-submit-btn"
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <ProgressSpinner style={{ width: '18px', height: '18px' }} strokeWidth="4" />
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
