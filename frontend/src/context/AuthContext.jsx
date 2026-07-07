import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [instituicao, setInstituicao] = useState(authService.getInstituicao());

  const login = useCallback(async (email, senha) => {
    const data = await authService.login(email, senha);
    setIsAuthenticated(true);
    setInstituicao({ email: data.email, nome: data.nome });
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setInstituicao(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, instituicao, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
