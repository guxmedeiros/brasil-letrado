import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function LoadingState({ message }) {
  return (
    <div className="loading-container">
      <ProgressSpinner style={{ width: 50, height: 50 }} />
      <span>{message}</span>
    </div>
  );
}
