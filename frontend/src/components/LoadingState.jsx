import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import './LoadingState.css';

export default function LoadingState({ message }) {
  return (
    <div className="loading-container">
      <ProgressSpinner className="loading-state-spinner" />
      <span>{message}</span>
    </div>
  );
}
