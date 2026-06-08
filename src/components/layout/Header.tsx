import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { utilizador } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {utilizador && (
              <p className="text-sm text-gray-600 mt-1">
                Bem-vindo, {utilizador.nome} ({utilizador.tipo})
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString('pt-PT', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xs text-gray-600">
                {new Date().toLocaleTimeString('pt-PT')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
