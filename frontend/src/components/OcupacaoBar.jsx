import React from 'react';
import './OcupacaoBar.css';

export default function OcupacaoBar({ quantidade, capacidade }) {
  if (!capacidade || capacidade === 0) return <span className="ocupacao-empty">{quantidade} alunos</span>;
  const pct = Math.min((quantidade / capacidade) * 100, 100);
  const cls = pct >= 100 ? 'full' : pct >= 80 ? 'warning' : '';
  return (
    <div className="ocupacao-bar">
      <span className="ocupacao-text">{quantidade}/{capacidade}</span>
      <div className="ocupacao-track">
        <div className={`ocupacao-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="ocupacao-percent">{Math.round(pct)}%</span>
    </div>
  );
}
