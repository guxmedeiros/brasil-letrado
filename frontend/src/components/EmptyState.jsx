import React from 'react';

export default function EmptyState({ icon, message }) {
  return (
    <div className="edu-empty">
      <i className={icon} />
      {message}
    </div>
  );
}
