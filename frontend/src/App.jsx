
import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import './index.css';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/' && !isAuthenticated;

  if (isLandingPage) {
    return (
      <>
        <Navbar />
        <AppRoutes />
        <BackToTop />
      </>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-content">
        <AppRoutes />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}
