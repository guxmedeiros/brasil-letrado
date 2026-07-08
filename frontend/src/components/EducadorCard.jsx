import React from 'react';
import { Button } from 'primereact/button';
import './EducadorCard.css';

export default function EducadorCard({ educador, onEditar, onExcluir }) {
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
          <div className="edu-info-row edu-card-empty-info">
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
