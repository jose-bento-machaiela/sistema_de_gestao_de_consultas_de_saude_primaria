import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CONFIGURACOES_APP, TIPOS_UTILIZADOR } from '../../constants';
import type { TipoUtilizador } from '../../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<TipoUtilizador>('Médico');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validação básica
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    const sucesso = await login(email, senha, tipo);

    if (sucesso) {
      // Redirecionar para a dashboard apropriada
      switch (tipo) {
        case 'Administrador':
          navigate('/administrador/dashboard');
          break;
        case 'Médico':
          navigate('/medico/lista-espera');
          break;
        case 'Enfermeiro':
          navigate('/enfermeiro/triagem');
          break;
        case 'Recepcionista':
          navigate('/rececionista/registro-paciente');
          break;
      }
    } else {
      setErro('Credenciais inválidas ou tipo de utilizador incorrecto');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4"></div>
            <h1 className="text-3xl font-bold text-gray-900">{CONFIGURACOES_APP.NOME_APP}</h1>
            <p className="text-gray-600 mt-2">Sistema de Gestão de Consultas de Saúde Primária</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="tipo" className="input-label">
                Tipo de Utilizador
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoUtilizador)}
                className="input"
                required
              >
                {TIPOS_UTILIZADOR.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="seu.email@saude.gov.mz"
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="input-label">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            {erro && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner w-5 h-5 mr-2"></div>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-700 font-semibold mb-2">Credenciais de Teste:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>admin@saude.gov.mz / admin123 (Administrador)</p>
              <p>medico1@saude.gov.mz / medico123 (Médico)</p>
              <p>enfermeiro1@saude.gov.mz / enfermeiro123 (Enfermeiro)</p>
              <p>rececionista1@saude.gov.mz / rececionista123 (Rececionista)</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-white">
          <p className="text-sm">
            {CONFIGURACOES_APP.NOME_APP} v{CONFIGURACOES_APP.VERSAO}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
