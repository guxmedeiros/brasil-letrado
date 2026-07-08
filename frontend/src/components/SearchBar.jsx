import React from 'react';
import { InputText } from 'primereact/inputtext';

export default function SearchBar({ placeholder, value, onChange, style }) {
  return (
    <div className="p-inputgroup" style={{ maxWidth: 340, marginBottom: '1rem', ...style }}>
      <span className="p-inputgroup-addon">
        <i className="pi pi-search" />
      </span>
      <InputText
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
