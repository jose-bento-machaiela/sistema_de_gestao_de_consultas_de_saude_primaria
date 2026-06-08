import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CONFIGURACOES_APP, ROTAS } from '../../constants';

const Sidebar: React.FC = () => {
  const { utilizador, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROTAS.LOGIN);
  };

  const getLinksByTipo = (tipo: string) => {
    switch (tipo) {
      case 'Administrador':
        return [
          { path: ROTAS.ADMIN_DASHBOARD, label: 'Dashboard', icon: '' },
          { path: ROTAS.GESTAO_UTILIZADORES, label: 'Gestão de Utilizadores', icon: '' },
          { path: ROTAS.RELATORIOS, label: 'Relatórios', icon: '' },
        ];
      case 'Médico':
        return [
          { path: ROTAS.LISTA_ESPERA, label: 'Lista de Espera', icon: '' },
          { path: ROTAS.EMISSAO_REFERENCIA, label: 'Emitir Referência', icon: '' },
        ];
      case 'Enfermeiro':
        return [
          { path: ROTAS.TRIAGEM, label: 'Triagem', icon: '' },
          { path: ROTAS.LISTA_TRIAGEM, label: 'Histórico de Triagens', icon: '' },
        ];
      case 'Recepcionista':
        return [
          { path: ROTAS.REGISTRO_PACIENTE, label: 'Registo de Paciente', icon: '' },
          { path: ROTAS.AGENDAMENTO_CONSULTA, label: 'Agendar Consulta', icon: '' },
          { path: ROTAS.GESTAO_FILA, label: 'Gestão de Fila', icon: '' },
        ];
      default:
        return [];
    }
  };

  const links = utilizador ? getLinksByTipo(utilizador.tipo) : [];

  return (
    <div className={`sidebar ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
      <div className="flex items-center justify-between p-6 border-b border-primary-600">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold">{CONFIGURACOES_APP.NOME_APP}</h1>
            <p className="text-sm text-primary-200">Versão {CONFIGURACOES_APP.VERSAO}</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-primary-200 focus:outline-none"
        >
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      <nav className="mt-6">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? 'sidebar-item-active' : ''} ${
                collapsed ? 'justify-center px-4' : ''
              }`
            }
          >
            <span className="text-2xl mr-3">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-primary-600">
        {utilizador && (
          <div className="mb-4">
            {!collapsed && (
              <>
                <p className="font-semibold">{utilizador.nome}</p>
                <p className="text-sm text-primary-200">{utilizador.tipo}</p>
              </>
            )}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {collapsed ? '🚪' : 'Sair'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
