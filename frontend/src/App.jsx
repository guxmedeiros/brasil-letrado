import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

function toggleThemeLink(dark) {
  const link = document.getElementById('app-theme');
  if (link) {
    link.href = dark
      ? '/themes/lara-dark-blue/theme.css'
      : '/themes/lara-light-blue/theme.css';
  }
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    toggleThemeLink(darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
          <main className="app-content">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}
