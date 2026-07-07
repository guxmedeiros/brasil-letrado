import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import EducadoresPage from '../pages/EducadoresPage';
import TurmasPage from '../pages/TurmasPage';
import AlunosPage from '../pages/AlunosPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login"   element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      {/* Rotas privadas */}
      <Route path="/educadores" element={<PrivateRoute><EducadoresPage /></PrivateRoute>} />
      <Route path="/turmas"     element={<PrivateRoute><TurmasPage /></PrivateRoute>} />
      <Route path="/alunos"     element={<PrivateRoute><AlunosPage /></PrivateRoute>} />

      {/* Redirecionar raiz */}
      <Route path="/" element={<Navigate to="/educadores" replace />} />
      <Route path="*" element={<Navigate to="/educadores" replace />} />
    </Routes>
  );
}
