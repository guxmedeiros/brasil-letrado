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
import { TurnoTag } from '../components/StatusTag';
import { turmaService } from '../services/turmaService';
import { educadorService } from '../services/educadorService';
import { required, minLength, maxLength, minNumber, maxNumber, validate, trim } from '../utils/validators';
import OcupacaoBar from '../components/OcupacaoBar';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import FormField from '../components/FormField';

const TURNO_OPTIONS = [
  { label: '☀️  Manhã', value: 'MANHA' },
  { label: '🌤  Tarde', value: 'TARDE' },
  { label: '🌙  Noite', value: 'NOITE' },
];

const EMPTY_FORM = { nome: '', turno: null, diasSemana: '', capacidadeMaxima: null, educadorId: null };

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
    errs.nome = validate(form.nome, [
      (v) => required(v, 'O nome é obrigatório'),
      (v) => minLength(3)(v, 'Nome deve ter pelo menos 3 caracteres'),
      (v) => maxLength(100)(v, 'Nome deve ter no máximo 100 caracteres')
    ]);
    errs.diasSemana = validate(form.diasSemana, [
      (v) => maxLength(100)(v, 'Dias da semana devem ter no máximo 100 caracteres')
    ]);
    errs.capacidadeMaxima = validate(form.capacidadeMaxima, [
      (v) => minNumber(1)(v, 'Capacidade mínima é 1'),
      (v) => maxNumber(100)(v, 'Capacidade máxima é 100')
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
        ...form,
        nome: trim(form.nome),
        diasSemana: trim(form.diasSemana)
      };
      if (editando) {
        await turmaService.atualizar(editando.id, payload);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Turma atualizada!', life: 3000 });
      } else {
        await turmaService.cadastrar(payload);
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

      <SearchBar
        placeholder="Buscar turma..."
        value={globalFilter}
        onChange={setGlobalFilter}
      />

      {loading ? (
        <LoadingState message="Carregando turmas…" />
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
          <FormField label="Nome *" htmlFor="turma-nome" error={errors.nome}>
            <InputText
              id="turma-nome"
              value={form.nome}
              onChange={e => onChange('nome', e.target.value)}
              placeholder="Nome da turma"
              className={errors.nome ? 'p-invalid' : ''}
              autoFocus
            />
          </FormField>
          <FormField label="Turno" htmlFor="turma-turno">
            <Dropdown
              id="turma-turno"
              value={form.turno}
              options={TURNO_OPTIONS}
              onChange={e => onChange('turno', e.value)}
              placeholder="Selecione o turno"
            />
          </FormField>
          <FormField label="Dias da Semana" htmlFor="turma-dias" error={errors.diasSemana}>
            <InputText
              id="turma-dias"
              value={form.diasSemana}
              onChange={e => onChange('diasSemana', e.target.value)}
              placeholder="Ex: Segunda, Quarta"
              className={errors.diasSemana ? 'p-invalid' : ''}
            />
          </FormField>
          <FormField label="Capacidade Máxima" htmlFor="turma-cap" error={errors.capacidadeMaxima}>
            <InputNumber
              id="turma-cap"
              value={form.capacidadeMaxima}
              onValueChange={e => onChange('capacidadeMaxima', e.value)}
              min={1}
              max={100}
              showButtons
              className={errors.capacidadeMaxima ? 'p-invalid' : ''}
            />
          </FormField>
          <FormField label="Educador" htmlFor="turma-educador">
            <Dropdown
              id="turma-educador"
              value={form.educadorId}
              options={educadores}
              onChange={e => onChange('educadorId', e.value)}
              placeholder="Selecione o educador"
              filter
              filterPlaceholder="Buscar educador..."
              showClear
            />
          </FormField>
        </div>
      </Dialog>
    </div>
  );
}
