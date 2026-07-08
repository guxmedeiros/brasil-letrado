import React, { useState, useEffect, useRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { educadorService } from '../services/educadorService';
import { turmaService } from '../services/turmaService';
import { alunoService } from '../services/alunoService';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

export default function DashboardPage() {
  const [educadores, setEducadores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [eduData, turmaData, alunoData] = await Promise.all([
        educadorService.listar(),
        turmaService.listar(),
        alunoService.listar(),
      ]);
      setEducadores(eduData);
      setTurmas(turmaData);
      setAlunos(alunoData);
    } catch {
      toast.current?.show({
        severity: 'error', summary: 'Erro', detail: 'Falha ao carregar dados do dashboard.', life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Cálculo das métricas
  const totalEducadores = educadores.length;
  const totalTurmas = turmas.length;
  const totalAlunos = alunos.length;
  const capacidadeTotal = turmas.reduce((acc, turma) => acc + (turma.capacidadeMaxima || 0), 0);
  const capacidadeUtilizadaPercent = capacidadeTotal > 0 ? Math.round((totalAlunos / capacidadeTotal) * 100) : 0;

  // Distribuição por nível
  const alunosPorNivel = alunos.reduce((acc, aluno) => {
    const nivel = aluno.nivelAlfabetizacao || 'INICIANTE';
    acc[nivel] = (acc[nivel] || 0);
    acc[nivel]++;
    return acc;
  }, {});

  const alunosIniciante = alunosPorNivel.INICIANTE || 0;
  const alunosIntermediario = alunosPorNivel.INTERMEDIARIO || 0;
  const alunosAvancado = alunosPorNivel.AVANCADO || 0;

  const percentIniciante = totalAlunos > 0 ? Math.round((alunosIniciante / totalAlunos) * 100) : 0;
  const percentIntermediario = totalAlunos > 0 ? Math.round((alunosIntermediario / totalAlunos) * 100) : 0;
  const percentAvancado = totalAlunos > 0 ? Math.round((alunosAvancado / totalAlunos) * 100) : 0;

  if (loading) {
    return (
      <div className="loading-container">
        <ProgressSpinner className="dashboard-spinner" />
        <span>Carregando dashboard…</span>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <Toast ref={toast} position="top-right" />

      <div className="page-header">
        <div>
          <h1 className="page-title">
            <i className="pi pi-home dashboard-home-icon" />
            Dashboard
          </h1>
          <p className="page-subtitle">Visão geral do seu programa de alfabetização</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="stat-card-content">
            <div className="stat-card-info">
              <p className="stat-card-label">Alunos Atendidos</p>
              <h2 className="stat-card-value">{totalAlunos}</h2>
              <Link to="/alunos" className="stat-card-link">
                Gerenciar alunos <i className="pi pi-arrow-right" />
              </Link>
            </div>
            <div className="stat-card-icon stat-card-icon-alunos">
              <i className="pi pi-users" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-content">
            <div className="stat-card-info">
              <p className="stat-card-label">Turmas Ativas</p>
              <h2 className="stat-card-value">{totalTurmas}</h2>
              <Link to="/turmas" className="stat-card-link">
                Gerenciar turmas <i className="pi pi-arrow-right" />
              </Link>
            </div>
            <div className="stat-card-icon stat-card-icon-turmas">
              <i className="pi pi-building" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-content">
            <div className="stat-card-info">
              <p className="stat-card-label">Educadores</p>
              <h2 className="stat-card-value">{totalEducadores}</h2>
              <Link to="/educadores" className="stat-card-link">
                Gerenciar educadores <i className="pi pi-arrow-right" />
              </Link>
            </div>
            <div className="stat-card-icon stat-card-icon-educadores">
              <i className="pi pi-graduation-cap" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-card-content">
            <div className="stat-card-info">
              <p className="stat-card-label">Capacidade Total</p>
              <h2 className="stat-card-value">{totalAlunos} <span className="stat-value-secondary">/ {capacidadeTotal}</span></h2>
              <div className="stat-capacity-bar">
                <div 
                  className="stat-capacity-fill" 
                  style={{ 
                    width: `${capacidadeUtilizadaPercent}%`,
                    background: capacidadeUtilizadaPercent > 90 ? '#e53935' : capacidadeUtilizadaPercent > 70 ? '#f5a623' : '#1E5631'
                  }} 
                />
              </div>
              <p className="stat-capacity-percent">{capacidadeUtilizadaPercent}% de vagas preenchidas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="dashboard-lower">
        {/* Nível de Alfabetização */}
        <div className="dashboard-section-card">
          <div className="section-card-header">
            <div className="section-card-title">
              <i className="pi pi-chart-bar dashboard-chart-icon" />
              <h3>Nível de Alfabetização dos Alunos</h3>
            </div>
            <p className="section-card-subtitle">Distribuição pedagógica atual em todos os projetos sociais.</p>
          </div>

          <div className="nivel-list">
            <div className="nivel-item">
              <div className="nivel-item-left">
                <span className="nivel-dot nivel-dot-iniciante" />
                <span className="nivel-name">Iniciante (Primeiros passos)</span>
              </div>
              <div className="nivel-item-right">
                <span className="nivel-count">{alunosIniciante} alunos ({percentIniciante}%)</span>
              </div>
            </div>
            <div className="nivel-progress-bar">
              <div className="nivel-progress-fill" style={{ width: `${percentIniciante}%`, background: '#F5A623' }} />
            </div>

            <div className="nivel-item">
              <div className="nivel-item-left">
                <span className="nivel-dot nivel-dot-intermediario" />
                <span className="nivel-name">Intermediário (Silábico-Alfabético)</span>
              </div>
              <div className="nivel-item-right">
                <span className="nivel-count">{alunosIntermediario} alunos ({percentIntermediario}%)</span>
              </div>
            </div>
            <div className="nivel-progress-bar">
              <div className="nivel-progress-fill" style={{ width: `${percentIntermediario}%`, background: '#1E3A5F' }} />
            </div>

            <div className="nivel-item">
              <div className="nivel-item-left">
                <span className="nivel-dot nivel-dot-avancado" />
                <span className="nivel-name">Avançado (Autônomo / Leitura Crítica)</span>
              </div>
              <div className="nivel-item-right">
                <span className="nivel-count">{alunosAvancado} alunos ({percentAvancado}%)</span>
              </div>
            </div>
            <div className="nivel-progress-bar">
              <div className="nivel-progress-fill" style={{ width: `${percentAvancado}%`, background: '#1E5631' }} />
            </div>
          </div>
        </div>

        {/* Quote / Info Card */}
        <div className="dashboard-quote-card">
          <div className="quote-content">
            <i className="pi pi-quote-left quote-icon" />
            <p className="quote-text">
              "A educação não transforma o mundo. A educação muda pessoas. Pessoas transformam o mundo."
            </p>
            <div className="quote-footer">
              <span className="quote-author">PAULO FREIRE</span>
              <span className="quote-source">BRASIL LETRADO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
