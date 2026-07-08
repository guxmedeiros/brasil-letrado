import React from 'react';
import { InputText } from 'primereact/inputtext';
import './SearchBar.css';

export default function SearchBar({ placeholder, value, onChange, style, className }) {
  return (
    <div className={`p-inputgroup searchbar-wrapper ${className}`} style={style}>
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
