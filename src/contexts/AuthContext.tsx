import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Utilizador, TipoUtilizador, AuthContextType } from '../types';
import { getUtilizadorByEmail } from '../services/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [utilizador, setUtilizador] = useState<Utilizador | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe utilizador salvo no localStorage
    const savedUser = localStorage.getItem('utilizador');
    if (savedUser) {
      setUtilizador(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string, tipo: TipoUtilizador): Promise<boolean> => {
    setIsLoading(true);

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const user = getUtilizadorByEmail(email);

      if (user && user.senha === senha && user.tipo === tipo) {
        setUtilizador(user);
        localStorage.setItem('utilizador', JSON.stringify(user));
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUtilizador(null);
    localStorage.removeItem('utilizador');
  };

  const isAuthenticated = !!utilizador;

  return (
    <AuthContext.Provider
      value={{
        utilizador,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
