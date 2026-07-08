import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { NivelTag } from '../components/StatusTag';
import { alunoService } from '../services/alunoService';
import { turmaService } from '../services/turmaService';
import { required, minLength, maxLength, telefone, validate, trim } from '../utils/validators';
import SearchBar from '../components/SearchBar';
import LoadingState from '../components/LoadingState';
import FormField from '../components/FormField';

const NIVEL_OPTIONS = [
  { label: '⚪ Iniciante', value: 'INICIANTE' },
  { label: '🔵 Intermediário', value: 'INTERMEDIARIO' },
  { label: '✅ Avançado', value: 'AVANCADO' },
];

const EMPTY_FORM = { nome: '', dataNascimento: null, telefone: '', nivelAlfabetizacao: null, turmaId: null };

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
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
      const [a, t] = await Promise.all([alunoService.listar(), turmaService.listar()]);
      setAlunos(a);
      setTurmas(t.map(turma => ({ 
        label: turma.nome, 
        value: turma.id, 
        ...turma 
      })));
    } catch {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar alunos.', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const parseDate = (isoString) => isoString ? new Date(isoString + 'T00:00:00') : null;
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const abrirNovo = () => {
    setEditando(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setDialogVisible(true);
  };

  const abrirEdicao = (aluno) => {
    setEditando(aluno);
    setForm({
      nome: aluno.nome || '',
      dataNascimento: parseDate(aluno.dataNascimento),
      telefone: aluno.telefone || '',
      nivelAlfabetizacao: aluno.nivelAlfabetizacao || null,
      turmaId: aluno.turmaId || null,
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
    errs.telefone = validate(form.telefone, [
      (v) => telefone(v)
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
        telefone: trim(form.telefone),
        dataNascimento: formatDate(form.dataNascimento),
      };
      if (editando) {
        await alunoService.atualizar(editando.id, payload);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Aluno atualizado!', life: 3000 });
      } else {
        await alunoService.cadastrar(payload);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Aluno cadastrado!', life: 3000 });
      }
      fecharDialog();
      carregar();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Erro ao salvar aluno.';
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const confirmarExclusao = (aluno) => {
    confirmDialog({
      message: `Deseja excluir o aluno "${aluno.nome}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: () => excluir(aluno),
    });
  };

  const excluir = async (aluno) => {
    try {
      await alunoService.excluir(aluno.id);
      toast.current.show({ severity: 'success', summary: 'Excluído', detail: `"${aluno.nome}" removido.`, life: 3000 });
      carregar();
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao excluir aluno.';
      toast.current.show({ severity: 'error', summary: 'Erro', detail: msg, life: 4000 });
    }
  };

  const nivelTemplate = (rowData) => <NivelTag nivel={rowData.nivelAlfabetizacao} />;

  const dataNascimentoTemplate = (rowData) => {
    if (!rowData.dataNascimento) return '—';
    const [y, m, d] = rowData.dataNascimento.split('-');
    return `${d}/${m}/${y}`;
  };

  const acoesTemplate = (rowData) => (
    <div className="action-buttons">
      <Button id={`edit-aluno-${rowData.id}`} icon="pi pi-pencil" rounded text severity="info" onClick={() => abrirEdicao(rowData)} tooltip="Editar" tooltipOptions={{ position: 'top' }} />
      <Button id={`delete-aluno-${rowData.id}`} icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmarExclusao(rowData)} tooltip="Excluir" tooltipOptions={{ position: 'top' }} />
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
          <h1 className="page-title"><i className="pi pi-user" style={{ marginRight: '0.5rem', color: '#1565c0' }} />Alunos</h1>
          <p className="page-subtitle">Gerencie os alunos matriculados nas turmas de alfabetização</p>
        </div>
        <Button id="novo-aluno-btn" label="Novo Aluno" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <SearchBar
        placeholder="Buscar aluno..."
        value={globalFilter}
        onChange={setGlobalFilter}
      />

      {loading ? (
        <LoadingState message="Carregando alunos…" />
      ) : (
        <DataTable
          value={alunos}
          paginator rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          globalFilter={globalFilter}
          globalFilterFields={['nome', 'telefone', 'turmaNome']}
          emptyMessage="Nenhum aluno encontrado."
          dataKey="id"
          stripedRows
          removableSort
          style={{ borderRadius: 12, overflow: 'hidden' }}
        >
          <Column field="nome" header="Nome" sortable />
          <Column field="dataNascimento" header="Data de Nasc." body={dataNascimentoTemplate} sortable />
          <Column field="telefone" header="Telefone" />
          <Column field="nivelAlfabetizacao" header="Nível" body={nivelTemplate} sortable />
          <Column field="turmaNome" header="Turma" sortable />
          <Column header="Ações" body={acoesTemplate} style={{ width: '7rem' }} />
        </DataTable>
      )}

      <Dialog
        id="dialog-aluno"
        header={editando ? 'Editar Aluno' : 'Novo Aluno'}
        visible={dialogVisible}
        onHide={fecharDialog}
        style={{ width: '520px' }}
        modal
        footer={dialogFooter}
      >
        <div className="form-grid">
          <FormField label="Nome *" htmlFor="aluno-nome" error={errors.nome}>
            <InputText
              id="aluno-nome"
              value={form.nome}
              onChange={e => onChange('nome', e.target.value)}
              placeholder="Nome completo do aluno"
              className={errors.nome ? 'p-invalid' : ''}
              autoFocus
            />
          </FormField>
          <FormField label="Data de Nascimento" htmlFor="aluno-nasc">
            <Calendar
              id="aluno-nasc"
              value={form.dataNascimento}
              onChange={e => onChange('dataNascimento', e.value)}
              dateFormat="dd/mm/yy"
              showIcon
              yearNavigator
              yearRange="1930:2010"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
          <FormField label="Telefone" htmlFor="aluno-tel" error={errors.telefone}>
            <InputText
              id="aluno-tel"
              value={form.telefone}
              onChange={e => onChange('telefone', e.target.value)}
              placeholder="(11) 99999-9999"
              className={errors.telefone ? 'p-invalid' : ''}
            />
          </FormField>
          <FormField label="Nível de Alfabetização" htmlFor="aluno-nivel">
            <Dropdown
              id="aluno-nivel"
              value={form.nivelAlfabetizacao}
              options={NIVEL_OPTIONS}
              onChange={e => onChange('nivelAlfabetizacao', e.value)}
              placeholder="Selecione o nível"
              showClear
            />
          </FormField>
          <FormField label="Turma" htmlFor="aluno-turma">
            <Dropdown
              id="aluno-turma"
              value={form.turmaId}
              options={turmas}
              onChange={e => onChange('turmaId', e.value)}
              placeholder="Selecione a turma"
              filter
              filterPlaceholder="Buscar turma..."
              showClear
              itemTemplate={(option) => {
                const turma = turmas.find(t => t.value === option.value);
                const isFull = turma && turma.quantidadeAlunos >= turma.capacidadeMaxima;
                return (
                  <div style={{ opacity: isFull ? 0.6 : 1 }}>
                    {option.label}
                    {isFull && <span style={{ color: '#c0392b', marginLeft: '0.5rem' }}>(Lotada)</span>}
                  </div>
                );
              }}
              disabled={(option) => {
                const turma = turmas.find(t => t.value === option.value);
                return turma && turma.quantidadeAlunos >= turma.capacidadeMaxima;
              }}
            />
          </FormField>
        </div>
      </Dialog>
    </div>
  );
}
