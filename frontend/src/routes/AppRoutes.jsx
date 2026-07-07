import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../context/AuthContext';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import EducadoresPage from '../pages/EducadoresPage';
import TurmasPage from '../pages/TurmasPage';
import AlunosPage from '../pages/AlunosPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rota raiz - Landing Page para todos os usuários */}
      <Route path="/" element={<LandingPage />} />

      {/* Rotas públicas - não redirecionar se já autenticado, permitir acessar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      {/* Rotas privadas */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/educadores" element={<PrivateRoute><EducadoresPage /></PrivateRoute>} />
      <Route path="/turmas" element={<PrivateRoute><TurmasPage /></PrivateRoute>} />
      <Route path="/alunos" element={<PrivateRoute><AlunosPage /></PrivateRoute>} />

      {/* Redirecionar rotas não encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
