import React from 'react';

export default function OcupacaoBar({ quantidade, capacidade }) {
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
