import React from 'react';

export default function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="field">
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {error && <small className="p-error">{error}</small>}
    </div>
  );
}
