import React, { useMemo } from 'react';
import { useData } from '../../contexts/DataContext';
import { PRIORIDADE_COLORS } from '../../constants';

const DashboardPage: React.FC = () => {
  const {
    pacientes,
    consultas,
    triagens,
    filaEspera,
    utilizadores,
  } = useData();

  const estatisticas = useMemo(() => {
    const hoje = new Date().toDateString();

    return {
      totalPacientes: pacientes.length,
      totalConsultasHoje: consultas.filter(
        c => c.data_hora.toDateString() === hoje
      ).length,
      consultasAgendadas: consultas.filter(c => c.estado === 'Agendada').length,
      consultasEmCurso: consultas.filter(c => c.estado === 'Em curso').length,
      consultasConcluidas: consultas.filter(c => c.estado === 'Concluída').length,
      pacientesEmFila: filaEspera.filter(f =>
        f.status === 'Aguardando Consulta' || f.status === 'Aguardando Triagem'
      ).length,
      triagensHoje: triagens.filter(
        t => t.data_hora.toDateString() === hoje
      ).length,
      utilizadoresActivos: utilizadores.filter(u => u.activo).length,
    };
  }, [pacientes, consultas, triagens, filaEspera, utilizadores]);

  // Agrupar pacientes em fila por prioridade
  const pacientesPorPrioridade = useMemo(() => {
    return filaEspera.reduce((acc, fila) => {
      acc[fila.prioridade] = (acc[fila.prioridade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filaEspera]);

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Pacientes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {estatisticas.totalPacientes}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Consultas Hoje</p>
              <p className="text-3xl font-bold text-primary-600 mt-2">
                {estatisticas.totalConsultasHoje}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Em Fila</p>
              <p className="text-3xl font-bold text-secondary-600 mt-2">
                {estatisticas.pacientesEmFila}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Triagens Hoje</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {estatisticas.triagensHoje}
              </p>
            </div>
            <div className="text-4xl"></div>
          </div>
        </div>
      </div>

      {/* Gráficos e Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultas por Estado */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Estado das Consultas</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Agendadas</span>
              <span className="font-semibold text-blue-600">
                {estatisticas.consultasAgendadas}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(estatisticas.consultasAgendadas / consultas.length) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Em Curso</span>
              <span className="font-semibold text-yellow-600">
                {estatisticas.consultasEmCurso}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full"
                style={{
                  width: `${(estatisticas.consultasEmCurso / consultas.length) * 100}%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700">Concluídas</span>
              <span className="font-semibold text-green-600">
                {estatisticas.consultasConcluidas}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${(estatisticas.consultasConcluidas / consultas.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Pacientes em Fila por Prioridade */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Fila por Prioridade</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(pacientesPorPrioridade).map(([prioridade, count]) => {
              const colors = PRIORIDADE_COLORS[prioridade as keyof typeof PRIORIDADE_COLORS];
              return (
                <div key={prioridade}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${colors.text}`}>
                      {prioridade}
                    </span>
                    <span className="font-bold">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${colors.badge}`}
                      style={{
                        width: `${(count / estatisticas.pacientesEmFila) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(pacientesPorPrioridade).length === 0 && (
              <p className="text-gray-600 text-center py-8">
                Não há pacientes em fila
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lista de Utilizadores Activos */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Utilizadores Activos</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Nome</th>
                <th className="table-header-cell">Email</th>
                <th className="table-header-cell">Tipo</th>
                <th className="table-header-cell">Telefone</th>
                <th className="table-header-cell">Estado</th>
              </tr>
            </thead>
            <tbody>
              {utilizadores.slice(0, 5).map((utilizador) => (
                <tr key={utilizador.id} className="table-row">
                  <td className="table-body-cell">{utilizador.nome}</td>
                  <td className="table-body-cell">{utilizador.email}</td>
                  <td className="table-body-cell">{utilizador.tipo}</td>
                  <td className="table-body-cell">{utilizador.telefone || '-'}</td>
                  <td className="table-body-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        utilizador.activo
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {utilizador.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consultas Recentes */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Consultas Recentes</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Paciente</th>
                <th className="table-header-cell">Médico</th>
                <th className="table-header-cell">Especialidade</th>
                <th className="table-header-cell">Data/Hora</th>
                <th className="table-header-cell">Estado</th>
              </tr>
            </thead>
            <tbody>
              {consultas.slice(0, 5).map((consulta) => {
                const paciente = pacientes.find(p => p.id === consulta.id_paciente);
                const medico = utilizadores.find(u => u.id === consulta.id_medico);

                return (
                  <tr key={consulta.id_consulta} className="table-row">
                    <td className="table-body-cell">
                      {paciente?.nome_completo || 'N/A'}
                    </td>
                    <td className="table-body-cell">
                      {medico?.nome || 'N/A'}
                    </td>
                    <td className="table-body-cell">{consulta.especialidade}</td>
                    <td className="table-body-cell">
                      {new Date(consulta.data_hora).toLocaleString('pt-PT')}
                    </td>
                    <td className="table-body-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          consulta.estado === 'Concluída'
                            ? 'bg-green-100 text-green-800'
                            : consulta.estado === 'Em curso'
                            ? 'bg-yellow-100 text-yellow-800'
                            : consulta.estado === 'Cancelada'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {consulta.estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
