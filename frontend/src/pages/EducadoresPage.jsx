import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { educadorService } from '../services/educadorService';

const EMPTY_FORM = { nome: '', email: '', telefone: '', formacao: '', fotoUrl: '' };

function EducadorCard({ educador, onEditar, onExcluir }) {
  const initials = educador.nome
    ? educador.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
    : '?';

  return (
    <div className="edu-card">
      <div className="edu-card-header">
        {educador.fotoUrl ? (
          <img
            src={educador.fotoUrl}
            alt={`Foto de ${educador.nome}`}
            className="edu-avatar"
            onError={e => { e.target.style.display = 'none'; }}
          />
        ) : (
          <div className="edu-avatar-placeholder" aria-label={`Iniciais de ${educador.nome}`}>
            {initials}
          </div>
        )}
        <p className="edu-card-name">{educador.nome}</p>
      </div>

      <div className="edu-card-body">
        {educador.formacao && (
          <div className="edu-info-row">
            <i className="pi pi-book" />
            <span>{educador.formacao}</span>
          </div>
        )}
        {educador.email && (
          <div className="edu-info-row">
            <i className="pi pi-envelope" />
            <span>{educador.email}</span>
          </div>
        )}
        {educador.telefone && (
          <div className="edu-info-row">
            <i className="pi pi-phone" />
            <span>{educador.telefone}</span>
          </div>
        )}
        {!educador.formacao && !educador.email && !educador.telefone && (
          <div className="edu-info-row" style={{ color: '#c0c0c0', fontStyle: 'italic' }}>
            Sem informações adicionais
          </div>
        )}
      </div>

      <div className="edu-card-actions">
        <Button
          id={`edit-educador-${educador.id}`}
          icon="pi pi-pencil"
          rounded text severity="info"
          onClick={() => onEditar(educador)}
          tooltip="Editar"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          id={`delete-educador-${educador.id}`}
          icon="pi pi-trash"
          rounded text severity="danger"
          onClick={() => onExcluir(educador)}
          tooltip="Excluir"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    </div>
  );
}

export default function EducadoresPage() {
  const [educadores, setEducadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState('');
  const toast = useRef(null);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    setLoading(true);
    try {
      const data = await educadorService.listar();
      setEducadores(data);
    } catch {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar educadores.', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const educadoresFiltrados = educadores.filter(e => {
    const q = search.toLowerCase();
    return (
      e.nome?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.formacao?.toLowerCase().includes(q)
    );
  });

  const abrirNovo = () => {
    setEditando(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setDialogVisible(true);
  };

  const abrirEdicao = (educador) => {
    setEditando(educador);
    setForm({
      nome: educador.nome || '',
      email: educador.email || '',
      telefone: educador.telefone || '',
      formacao: educador.formacao || '',
      fotoUrl: educador.fotoUrl || '',
    });
    setErrors({});
    setDialogVisible(true);
  };

  const fecharDialog = () => { setDialogVisible(false); setErrors({}); };

  const onChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validar = () => {
    const errs = {};
    if (!form.nome.trim()) errs.nome = 'O nome é obrigatório';
    return errs;
  };

  const salvar = async () => {
    const errs = validar();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    try {
      if (editando) {
        await educadorService.atualizar(editando.id, form);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Educador atualizado!', life: 3000 });
      } else {
        await educadorService.cadastrar(form);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Educador cadastrado!', life: 3000 });
      }
      fecharDialog();
      carregar();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Erro ao salvar educador.';
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const confirmarExclusao = (educador) => {
    confirmDialog({
      message: `Deseja excluir o educador "${educador.nome}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: () => excluir(educador),
    });
  };

  const excluir = async (educador) => {
    try {
      await educadorService.excluir(educador.id);
      toast.current.show({ severity: 'success', summary: 'Excluído', detail: `"${educador.nome}" removido.`, life: 3000 });
      carregar();
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao excluir educador.';
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 });
    }
  };

  const dialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" text onClick={fecharDialog} disabled={saving} />
      <Button label={saving ? 'Salvando...' : 'Salvar'} icon="pi pi-check" onClick={salvar} loading={saving} />
    </>
  );

  return (
    <div>
      <Toast ref={toast} position="top-right" />
      <ConfirmDialog />

      <div className="page-header">
        <div>
          <h1 className="page-title">
            <i className="pi pi-graduation-cap" style={{ marginRight: '0.5rem' }} />
            Educadores
          </h1>
          <p className="page-subtitle">Gerencie os educadores das turmas de alfabetização</p>
        </div>
        <Button id="novo-educador-btn" label="Novo Educador" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <div className="p-inputgroup" style={{ maxWidth: 340, marginBottom: '1rem' }}>
        <span className="p-inputgroup-addon"><i className="pi pi-search" /></span>
        <InputText
          placeholder="Buscar educador..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <ProgressSpinner style={{ width: 50, height: 50 }} />
          <span>Carregando educadores…</span>
        </div>
      ) : (
        <div className="cards-grid">
          {educadoresFiltrados.length === 0 ? (
            <div className="edu-empty">
              <i className="pi pi-graduation-cap" />
              {search ? 'Nenhum educador encontrado para esta busca.' : 'Nenhum educador cadastrado ainda.'}
            </div>
          ) : (
            educadoresFiltrados.map(e => (
              <EducadorCard
                key={e.id}
                educador={e}
                onEditar={abrirEdicao}
                onExcluir={confirmarExclusao}
              />
            ))
          )}
        </div>
      )}

      <Dialog
        id="dialog-educador"
        header={editando ? 'Editar Educador' : 'Novo Educador'}
        visible={dialogVisible}
        onHide={fecharDialog}
        style={{ width: '480px' }}
        modal
        footer={dialogFooter}
      >
        <div className="form-grid">
          <div className="field">
            <label htmlFor="edu-nome">Nome *</label>
            <InputText id="edu-nome" value={form.nome} onChange={e => onChange('nome', e.target.value)} className={errors.nome ? 'p-invalid' : ''} autoFocus />
            {errors.nome && <small className="p-error">{errors.nome}</small>}
          </div>
          <div className="field">
            <label htmlFor="edu-email">E-mail</label>
            <InputText id="edu-email" value={form.email} onChange={e => onChange('email', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="edu-telefone">Telefone</label>
            <InputText id="edu-telefone" value={form.telefone} onChange={e => onChange('telefone', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="edu-formacao">Formação</label>
            <InputText id="edu-formacao" value={form.formacao} onChange={e => onChange('formacao', e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="edu-fotourl">URL da Foto (opcional)</label>
            <InputText id="edu-fotourl" value={form.fotoUrl} onChange={e => onChange('fotoUrl', e.target.value)} placeholder="https://..." />
            {form.fotoUrl && (
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img
                  src={form.fotoUrl}
                  alt="preview"
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <small style={{ color: '#718096' }}>Pré-visualização</small>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
