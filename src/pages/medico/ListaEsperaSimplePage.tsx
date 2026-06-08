import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { PRIORIDADE_COLORS } from '../../constants';

const ListaEsperaSimplePage: React.FC = () => {
  const navigate = useNavigate();
  const { filaEspera, pacientes, triagens } = useData();

  // Ordenar fila por prioridade
  const filaOrdenada = [...filaEspera]
    .filter(f => f.status === 'Aguardando Consulta')
    .sort((a, b) => {
      const prioridadeOrder = ['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul'];
      return prioridadeOrder.indexOf(a.prioridade) - prioridadeOrder.indexOf(b.prioridade);
    });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Lista de Espera - Pacientes Triados</h2>
          <p className="text-sm text-gray-600">
            {filaOrdenada.length} paciente{filaOrdenada.length !== 1 ? 's' : ''} aguardando consulta
          </p>
        </div>

        {filaOrdenada.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-gray-600 text-lg">Não há pacientes aguardando consulta</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filaOrdenada.map((fila) => {
              const paciente = pacientes.find(p => p.id === fila.id_paciente);
              const triagem = triagens.find(t => t.id === fila.id_triagem);
              const colors = PRIORIDADE_COLORS[fila.prioridade];

              if (!paciente) return null;

              return (
                <div
                  key={fila.id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${colors.border}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-lg font-semibold">{paciente.nome_completo}</h3>
                        <span className={`badge-priority ${colors.bg} ${colors.text}`}>
                          {fila.prioridade}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">BI:</span> {paciente.numero_bi}
                        </div>
                        <div>
                          <span className="font-medium">Chegada:</span>{' '}
                          {new Date(fila.hora_chegada).toLocaleTimeString('pt-PT')}
                        </div>
                        <div>
                          <span className="font-medium">Contacto:</span> {paciente.contacto}
                        </div>
                      </div>

                      {triagem && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm">
                            <span className="font-medium">Queixas:</span> {triagem.queixas_principais}
                          </p>
                          <div className="flex space-x-4 mt-2 text-xs text-gray-600">
                            <span>PA: {triagem.pressao_arterial.sistolica}/{triagem.pressao_arterial.diastolica} mmHg</span>
                            <span>Temp: {triagem.temperatura}°C</span>
                            <span>Peso: {triagem.peso} kg</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <button
                        onClick={() => navigate(`/medico/realizar-consulta/${fila.id}`)}
                        className="btn-primary"
                      >
                        Atender
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaEsperaSimplePage;
