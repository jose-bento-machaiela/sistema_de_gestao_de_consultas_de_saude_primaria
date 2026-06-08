import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { PRIORIDADE_COLORS } from '../../constants';

const GestaoFilaPage: React.FC = () => {
  const navigate = useNavigate();
  const { filaEspera, pacientes, triagens } = useData();

  // Separar pacientes por status
  const aguardandoTriagem = filaEspera.filter(f => f.status === 'Aguardando Triagem');
  const aguardandoConsulta = filaEspera.filter(f => f.status === 'Aguardando Consulta');
  const emConsulta = filaEspera.filter(f => f.status === 'Em Consulta');

  // Ordenar por prioridade
  const orderByPriority = (list: typeof filaEspera) => {
    return [...list].sort((a, b) => {
      const prioridadeOrder = ['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul'];
      return prioridadeOrder.indexOf(a.prioridade) - prioridadeOrder.indexOf(b.prioridade);
    });
  };

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aguardando Triagem</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {aguardandoTriagem.length}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aguardando Consulta</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {aguardandoConsulta.length}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Consulta</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {emConsulta.length}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>
      </div>

      {/* Fila de Espera */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Gestão de Fila de Espera</h2>
        </div>

        {filaEspera.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-gray-600 text-lg">Não há pacientes na fila</p>
            <button
              onClick={() => navigate('/rececionista/registro-paciente')}
              className="btn-primary mt-4"
            >
              Registar Novo Paciente
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Aguardando Triagem */}
            {orderByPriority(aguardandoTriagem).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2"></span>
                  Aguardando Triagem ({aguardandoTriagem.length})
                </h3>
                <div className="space-y-3">
                  {orderByPriority(aguardandoTriagem).map((fila) => {
                    const paciente = pacientes.find(p => p.id === fila.id_paciente);
                    const colors = PRIORIDADE_COLORS[fila.prioridade];

                    if (!paciente) return null;

                    return (
                      <div
                        key={fila.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold">{paciente.nome_completo}</h4>
                              <span className={`badge-priority ${colors.bg} ${colors.text}`}>
                                {fila.prioridade}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Chegada: {new Date(fila.hora_chegada).toLocaleTimeString('pt-PT')}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            Aguardando triagem...
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Aguardando Consulta */}
            {orderByPriority(aguardandoConsulta).length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2"></span>
                  Aguardando Consulta ({aguardandoConsulta.length})
                </h3>
                <div className="space-y-3">
                  {orderByPriority(aguardandoConsulta).map((fila) => {
                    const paciente = pacientes.find(p => p.id === fila.id_paciente);
                    const triagemInfo = triagens.find(t => t.id === fila.id_triagem);
                    const colors = PRIORIDADE_COLORS[fila.prioridade];

                    if (!paciente) return null;

                    return (
                      <div
                        key={fila.id}
                        className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${colors.border}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold">{paciente.nome_completo}</h4>
                              <span className={`badge-priority ${colors.bg} ${colors.text}`}>
                                {fila.prioridade}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                              <span>Chegada: {new Date(fila.hora_chegada).toLocaleTimeString('pt-PT')}</span>
                              {triagemInfo && (
                                <span>Temp: {triagemInfo.temperatura}°C • PA: {triagemInfo.pressao_arterial.sistolica}/{triagemInfo.pressao_arterial.diastolica} mmHg</span>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Aguardando consulta...
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Em Consulta */}
            {emConsulta.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="mr-2"></span>
                  Em Consulta ({emConsulta.length})
                </h3>
                <div className="space-y-3">
                  {emConsulta.map((fila) => {
                    const paciente = pacientes.find(p => p.id === fila.id_paciente);
                    const colors = PRIORIDADE_COLORS[fila.prioridade];

                    if (!paciente) return null;

                    return (
                      <div
                        key={fila.id}
                        className="border rounded-lg p-4 bg-green-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold">{paciente.nome_completo}</h4>
                              <span className={`badge-priority ${colors.bg} ${colors.text}`}>
                                {fila.prioridade}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                Em Consulta
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Início: {new Date(fila.hora_chegada).toLocaleTimeString('pt-PT')}
                            </p>
                          </div>
                          <div className="text-2xl"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GestaoFilaPage;
