import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TurnoTag } from '../components/StatusTag';
import { turmaService } from '../services/turmaService';
import { educadorService } from '../services/educadorService';

const TURNO_OPTIONS = [
  { label: '☀️  Manhã', value: 'MANHA' },
  { label: '🌤  Tarde', value: 'TARDE' },
  { label: '🌙  Noite', value: 'NOITE' },
];

const EMPTY_FORM = { nome: '', turno: null, diasSemana: '', capacidadeMaxima: null, educadorId: null };

function OcupacaoBar({ quantidade, capacidade }) {
  if (!capacidade || capacidade === 0) return <span style={{ fontSize: '0.85rem' }}>{quantidade} alunos</span>;
  const pct = Math.min((quantidade / capacidade) * 100, 100);
  const cls = pct >= 100 ? 'full' : pct >= 80 ? 'warning' : '';
  return (
    <div className="ocupacao-bar">
      <span style={{ fontSize: '0.82rem', minWidth: '60px' }}>{quantidade}/{capacidade}</span>
      <div className="ocupacao-track">
        <div className={`ocupacao-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <span style={{ fontSize: '0.75rem', minWidth: '32px', color: '#718096' }}>{Math.round(pct)}%</span>
    </div>
  );
}

export default function TurmasPage() {
  const [turmas, setTurmas] = useState([]);
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
      const [t, e] = await Promise.all([turmaService.listar(), educadorService.listar()]);
      setTurmas(t);
      setEducadores(e.map(ed => ({ label: ed.nome, value: ed.id })));
    } catch {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar turmas.', life: 3000 });
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

  const abrirEdicao = (turma) => {
    setEditando(turma);
    setForm({
      nome: turma.nome || '',
      turno: turma.turno || null,
      diasSemana: turma.diasSemana || '',
      capacidadeMaxima: turma.capacidadeMaxima || null,
      educadorId: turma.educadorId || null,
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
        await turmaService.atualizar(editando.id, form);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Turma atualizada!', life: 3000 });
      } else {
        await turmaService.cadastrar(form);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Turma cadastrada!', life: 3000 });
      }
      fecharDialog();
      carregar();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Erro ao salvar turma.';
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const confirmarExclusao = (turma) => {
    confirmDialog({
      message: `Deseja excluir a turma "${turma.nome}"? Ela não pode ter alunos associados.`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: () => excluir(turma),
    });
  };

  const excluir = async (turma) => {
    try {
      await turmaService.excluir(turma.id);
      toast.current.show({ severity: 'success', summary: 'Excluída', detail: `"${turma.nome}" removida.`, life: 3000 });
      carregar();
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao excluir turma.';
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 });
    }
  };

  const turnoTemplate = (rowData) => <TurnoTag turno={rowData.turno} />;

  const ocupacaoTemplate = (rowData) => (
    <OcupacaoBar quantidade={rowData.quantidadeAlunos || 0} capacidade={rowData.capacidadeMaxima} />
  );

  const acoesTemplate = (rowData) => (
    <div className="action-buttons">
      <Button id={`edit-turma-${rowData.id}`} icon="pi pi-pencil" rounded text severity="info" onClick={() => abrirEdicao(rowData)} tooltip="Editar" tooltipOptions={{ position: 'top' }} />
      <Button id={`delete-turma-${rowData.id}`} icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmarExclusao(rowData)} tooltip="Excluir" tooltipOptions={{ position: 'top' }} />
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
          <h1 className="page-title"><i className="pi pi-users" style={{ marginRight: '0.5rem', color: '#1565c0' }} />Turmas</h1>
          <p className="page-subtitle">Gerencie as turmas e sua ocupação</p>
        </div>
        <Button id="nova-turma-btn" label="Nova Turma" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <div className="p-inputgroup" style={{ maxWidth: 340, marginBottom: '1rem' }}>
        <span className="p-inputgroup-addon"><i className="pi pi-search" /></span>
        <InputText placeholder="Buscar turma..." value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} />
      </div>

      {loading ? (
        <div className="loading-container">
          <ProgressSpinner style={{ width: 50, height: 50 }} />
          <span>Carregando turmas…</span>
        </div>
      ) : (
        <DataTable
          value={turmas}
          paginator rows={8}
          rowsPerPageOptions={[8, 16, 32]}
          globalFilter={globalFilter}
          globalFilterFields={['nome', 'diasSemana', 'educadorNome']}
          emptyMessage="Nenhuma turma encontrada."
          dataKey="id"
          stripedRows
          removableSort
          style={{ borderRadius: 12, overflow: 'hidden' }}
        >
          <Column field="nome" header="Nome da Turma" sortable />
          <Column field="turno" header="Turno" body={turnoTemplate} sortable />
          <Column field="diasSemana" header="Dias" />
          <Column field="educadorNome" header="Educador" sortable />
          <Column header="Ocupação" body={ocupacaoTemplate} style={{ minWidth: '180px' }} />
          <Column header="Ações" body={acoesTemplate} style={{ width: '7rem' }} />
        </DataTable>
      )}

      <Dialog
        id="dialog-turma"
        header={editando ? 'Editar Turma' : 'Nova Turma'}
        visible={dialogVisible}
        onHide={fecharDialog}
        style={{ width: '520px' }}
        modal
        footer={dialogFooter}
      >
        <div className="form-grid">
          <div className="field">
            <label htmlFor="turma-nome">Nome *</label>
            <InputText id="turma-nome" value={form.nome} onChange={e => onChange('nome', e.target.value)} className={errors.nome ? 'p-invalid' : ''} autoFocus />
            {errors.nome && <small className="p-error">{errors.nome}</small>}
          </div>
          <div className="field">
            <label htmlFor="turma-turno">Turno</label>
            <Dropdown id="turma-turno" value={form.turno} options={TURNO_OPTIONS} onChange={e => onChange('turno', e.value)} placeholder="Selecione o turno" />
          </div>
          <div className="field">
            <label htmlFor="turma-dias">Dias da Semana</label>
            <InputText id="turma-dias" value={form.diasSemana} onChange={e => onChange('diasSemana', e.target.value)} placeholder="Ex: Segunda, Quarta" />
          </div>
          <div className="field">
            <label htmlFor="turma-cap">Capacidade Máxima</label>
            <InputNumber id="turma-cap" value={form.capacidadeMaxima} onValueChange={e => onChange('capacidadeMaxima', e.value)} min={1} max={100} showButtons />
          </div>
          <div className="field">
            <label htmlFor="turma-educador">Educador</label>
            <Dropdown id="turma-educador" value={form.educadorId} options={educadores} onChange={e => onChange('educadorId', e.value)} placeholder="Selecione o educador" filter filterPlaceholder="Buscar educador..." showClear />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
