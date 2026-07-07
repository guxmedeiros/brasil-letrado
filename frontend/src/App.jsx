import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="app-layout">
            <Navbar />
            <main className="app-content">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}
