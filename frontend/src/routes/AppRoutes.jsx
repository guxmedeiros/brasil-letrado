import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import EducadoresPage from '../pages/EducadoresPage';
import TurmasPage from '../pages/TurmasPage';
import AlunosPage from '../pages/AlunosPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/educadores" replace />} />
      <Route path="/educadores" element={<EducadoresPage />} />
      <Route path="/turmas" element={<TurmasPage />} />
      <Route path="/alunos" element={<AlunosPage />} />
    </Routes>
  );
}
