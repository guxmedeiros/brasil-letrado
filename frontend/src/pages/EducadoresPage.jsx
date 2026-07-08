import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { educadorService } from '../services/educadorService';
import { required, minLength, maxLength, email, telefone, url, validate, trim } from '../utils/validators';
import EducadorCard from '../components/EducadorCard';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import FormField from '../components/FormField';

const EMPTY_FORM = { nome: '', email: '', telefone: '', formacao: '', fotoUrl: '' };

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
    errs.nome = validate(form.nome, [
      (v) => required(v, 'O nome é obrigatório'),
      (v) => minLength(3)(v, 'Nome deve ter pelo menos 3 caracteres'),
      (v) => maxLength(100)(v, 'Nome deve ter no máximo 100 caracteres')
    ]);
    errs.email = validate(form.email, [
      (v) => required(v, 'O e-mail é obrigatório'),
      (v) => email(v)
    ]);
    errs.telefone = validate(form.telefone, [
      (v) => required(v, 'O telefone é obrigatório'),
      (v) => telefone(v)
    ]);
    errs.formacao = validate(form.formacao, [
      (v) => required(v, 'A formação é obrigatória'),
      (v) => maxLength(100)(v, 'Formação deve ter no máximo 100 caracteres')
    ]);
    errs.fotoUrl = validate(form.fotoUrl, [
      (v) => url(v, 'URL da foto inválida')
    ]);
    // Remove erros nulos
    Object.keys(errs).forEach(key => {
      if (!errs[key]) delete errs[key];
    });
    return errs;
  };

  const salvar = async () => {
    const errs = validar();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaving(true);
    try {
      const payload = {
        nome: trim(form.nome),
        email: trim(form.email),
        telefone: trim(form.telefone),
        formacao: trim(form.formacao),
        fotoUrl: trim(form.fotoUrl)
      };
      if (editando) {
        await educadorService.atualizar(editando.id, payload);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Educador atualizado!', life: 3000 });
      } else {
        await educadorService.cadastrar(payload);
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

      <SearchBar
        placeholder="Buscar educador..."
        value={search}
        onChange={setSearch}
      />

      {loading ? (
        <LoadingState message="Carregando educadores…" />
      ) : (
        <div className="cards-grid">
          {educadoresFiltrados.length === 0 ? (
            <EmptyState
              icon="pi pi-graduation-cap"
              message={search ? 'Nenhum educador encontrado para esta busca.' : 'Nenhum educador cadastrado ainda.'}
            />
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
          <FormField label="Nome *" htmlFor="edu-nome" error={errors.nome}>
            <InputText
              id="edu-nome"
              value={form.nome}
              onChange={e => onChange('nome', e.target.value)}
              placeholder="Nome completo do educador"
              className={errors.nome ? 'p-invalid' : ''}
              autoFocus
            />
          </FormField>
          <FormField label="E-mail *" htmlFor="edu-email" error={errors.email}>
            <InputText
              id="edu-email"
              value={form.email}
              onChange={e => onChange('email', e.target.value)}
              placeholder="educador@instituicao.org"
              className={errors.email ? 'p-invalid' : ''}
            />
          </FormField>
          <FormField label="Telefone *" htmlFor="edu-telefone" error={errors.telefone}>
            <InputText
              id="edu-telefone"
              value={form.telefone}
              onChange={e => onChange('telefone', e.target.value)}
              placeholder="(11) 99999-9999"
              className={errors.telefone ? 'p-invalid' : ''}
            />
          </FormField>
          <FormField label="Formação *" htmlFor="edu-formacao" error={errors.formacao}>
            <InputText
              id="edu-formacao"
              value={form.formacao}
              onChange={e => onChange('formacao', e.target.value)}
              placeholder="Licenciatura em Letras"
              className={errors.formacao ? 'p-invalid' : ''}
            />
          </FormField>
          <FormField label="URL da Foto (opcional)" htmlFor="edu-fotourl" error={errors.fotoUrl}>
            <InputText
              id="edu-fotourl"
              value={form.fotoUrl}
              onChange={e => onChange('fotoUrl', e.target.value)}
              placeholder="https://..."
              className={errors.fotoUrl ? 'p-invalid' : ''}
            />
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
          </FormField>
        </div>
      </Dialog>
    </div>
  );
}
