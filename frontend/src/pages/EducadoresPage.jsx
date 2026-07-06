import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { educadorService } from '../services/educadorService';

const EMPTY_FORM = { nome: '', email: '', telefone: '', formacao: '' };

export default function EducadoresPage() {
  const [educadores, setEducadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef(null);

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    setLoading(true);
    try {
      const data = await educadorService.listar();
      setEducadores(data);
    } catch {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar educadores.', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const abrirNovo = () => {
    setEditando(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setDialogVisible(true);
  };

  const abrirEdicao = (educador) => {
    setEditando(educador);
    setForm({ nome: educador.nome || '', email: educador.email || '', telefone: educador.telefone || '', formacao: educador.formacao || '' });
    setErrors({});
    setDialogVisible(true);
  };

  const fecharDialog = () => {
    setDialogVisible(false);
    setErrors({});
  };

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

  const acoesTemplate = (rowData) => (
    <div className="action-buttons">
      <Button id={`edit-educador-${rowData.id}`} icon="pi pi-pencil" rounded text severity="info" onClick={() => abrirEdicao(rowData)} tooltip="Editar" tooltipOptions={{ position: 'top' }} />
      <Button id={`delete-educador-${rowData.id}`} icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmarExclusao(rowData)} tooltip="Excluir" tooltipOptions={{ position: 'top' }} />
    </div>
  );

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
          <h1 className="page-title"><i className="pi pi-graduation-cap" style={{ marginRight: '0.5rem', color: '#1565c0' }} />Educadores</h1>
          <p className="page-subtitle">Gerencie os educadores das turmas de alfabetização</p>
        </div>
        <Button id="novo-educador-btn" label="Novo Educador" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <div className="p-inputgroup" style={{ maxWidth: 340, marginBottom: '1rem' }}>
        <span className="p-inputgroup-addon"><i className="pi pi-search" /></span>
        <InputText placeholder="Buscar educador..." value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} />
      </div>

      {loading ? (
        <div className="loading-container">
          <ProgressSpinner style={{ width: 50, height: 50 }} />
          <span>Carregando educadores…</span>
        </div>
      ) : (
        <DataTable
          value={educadores}
          paginator rows={8}
          rowsPerPageOptions={[8, 16, 32]}
          globalFilter={globalFilter}
          globalFilterFields={['nome', 'email', 'formacao']}
          emptyMessage="Nenhum educador encontrado."
          dataKey="id"
          stripedRows
          removableSort
          style={{ borderRadius: 12, overflow: 'hidden' }}
        >
          <Column field="nome" header="Nome" sortable />
          <Column field="email" header="E-mail" />
          <Column field="telefone" header="Telefone" />
          <Column field="formacao" header="Formação" />
          <Column header="Ações" body={acoesTemplate} style={{ width: '7rem' }} />
        </DataTable>
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
        </div>
      </Dialog>
    </div>
  );
}
