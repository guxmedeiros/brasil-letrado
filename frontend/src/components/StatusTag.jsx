import React from 'react';

const NIVEL_CONFIG = {
  INICIANTE: {
    label: 'Iniciante',
    icon: 'pi pi-circle',
    className: 'iniciante',
  },
  INTERMEDIARIO: {
    label: 'Intermediário',
    icon: 'pi pi-circle-fill',
    className: 'intermediario',
  },
  AVANCADO: {
    label: 'Avançado',
    icon: 'pi pi-check-circle',
    className: 'avancado',
  },
};

const TURNO_CONFIG = {
  MANHA: { label: 'Manhã', icon: 'pi pi-sun', className: 'manha' },
  TARDE: { label: 'Tarde', icon: 'pi pi-cloud', className: 'tarde' },
  NOITE: { label: 'Noite', icon: 'pi pi-moon', className: 'noite' },
};

export function NivelTag({ nivel }) {
  const config = NIVEL_CONFIG[nivel];
  if (!config) return <span>{nivel}</span>;
  return (
    <span className={`nivel-tag ${config.className}`}>
      <i className={config.icon} style={{ fontSize: '0.75rem' }} />
      {config.label}
    </span>
  );
}

export function TurnoTag({ turno }) {
  const config = TURNO_CONFIG[turno];
  if (!config) return <span>{turno}</span>;
  return (
    <span className={`turno-tag ${config.className}`}>
      <i className={config.icon} style={{ fontSize: '0.75rem' }} />
      {config.label}
    </span>
  );
}
