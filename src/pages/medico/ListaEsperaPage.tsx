import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { MENSAGENS_ERRO, PRIORIDADE_COLORS } from '../../constants';
import type { FormularioConsulta } from '../../types';

const RealizarConsultaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { filaEspera, pacientes, triagens, actualizarEstadoConsulta } = useData();

  const [formData, setFormData] = useState<FormularioConsulta>({
    diagnostico: '',
    prescricao: '',
    observacoes: '',
  });

  const [loading, setLoading] = useState(false);

  // Encontrar o paciente e triagem associados
  const fila = filaEspera.find(f => f.id === id);
  const paciente = fila ? pacientes.find(p => p.id === fila.id_paciente) : null;
  const triagem = fila ? triagens.find(t => t.id === fila.id_triagem) : null;

  if (!fila || !paciente) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Paciente não encontrado na fila de espera.</p>
        <button
          onClick={() => navigate('/medico/lista-espera')}
          className="btn-primary mt-4"
        >
          Voltar à Lista de Espera
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.diagnostico.trim()) {
      alert('Por favor, insira um diagnóstico');
      return;
    }

    setLoading(true);

    try {
      // Actualizar o estado da consulta para concluída
      // (Na implementação real, você criaria a consulta aqui)
      await actualizarEstadoConsulta(fila.id, 'Concluída');

      alert(MENSAGENS_ERRO.CONSULTA_CONCLUIDA_SUCESSO);
      navigate('/medico/lista-espera');
    } catch (error) {
      alert('Erro ao concluir consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const prioridadeColors = PRIORIDADE_COLORS[fila.prioridade];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Informações do Paciente</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Nome do Paciente</p>
            <p className="text-lg font-semibold">{paciente.nome_completo}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Número do BI</p>
            <p className="text-lg font-semibold">{paciente.numero_bi}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Data de Nascimento</p>
            <p className="text-lg font-semibold">
              {new Date(paciente.data_nascimento).toLocaleDateString('pt-PT')}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Contacto</p>
            <p className="text-lg font-semibold">{paciente.contacto}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Prioridade de Triagem</p>
            <span className={`badge-priority ${prioridadeColors.bg} ${prioridadeColors.text}`}>
              {fila.prioridade}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-600">Hora de Chegada</p>
            <p className="text-lg font-semibold">
              {new Date(fila.hora_chegada).toLocaleTimeString('pt-PT')}
            </p>
          </div>
        </div>

        {triagem && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-3">Dados da Triagem</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Pressão Arterial</p>
                <p className="font-semibold">
                  {triagem.pressao_arterial.sistolica}/{triagem.pressao_arterial.diastolica} mmHg
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Temperatura</p>
                <p className="font-semibold">{triagem.temperatura}°C</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Peso</p>
                <p className="font-semibold">{triagem.peso} kg</p>
              </div>
              {triagem.altura && (
                <div>
                  <p className="text-sm text-gray-600">Altura</p>
                  <p className="font-semibold">{triagem.altura} cm</p>
                </div>
              )}
              {triagem.frequencia_cardiaca && (
                <div>
                  <p className="text-sm text-gray-600">Frequência Cardíaca</p>
                  <p className="font-semibold">{triagem.frequencia_cardiaca} bpm</p>
                </div>
              )}
              {triagem.saturacao_oxigenio && (
                <div>
                  <p className="text-sm text-gray-600">SpO2</p>
                  <p className="font-semibold">{triagem.saturacao_oxigenio}%</p>
                </div>
              )}
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">Queixas Principais</p>
              <p className="text-gray-900">{triagem.queixas_principais}</p>
            </div>
            {triagem.observacoes && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Observações</p>
                <p className="text-gray-900">{triagem.observacoes}</p>
              </div>
            )}
          </div>
        )}

        {paciente.historico_medico && (
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Histórico Médico</h3>
            <p className="text-gray-700">{paciente.historico_medico}</p>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Consulta Médica</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="diagnostico" className="input-label">
              Diagnóstico *
            </label>
            <textarea
              id="diagnostico"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              className="input"
              rows={4}
              placeholder="Insira o diagnóstico do paciente"
              required
            />
          </div>

          <div>
            <label htmlFor="prescricao" className="input-label">
              Prescrição Médica
            </label>
            <textarea
              id="prescricao"
              name="prescricao"
              value={formData.prescricao}
              onChange={handleChange}
              className="input"
              rows={4}
              placeholder="Insira a prescrição médica (medicamentos, dosagem, frequência)"
            />
          </div>

          <div>
            <label htmlFor="observacoes" className="input-label">
              Observações
            </label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              className="input"
              rows={3}
              placeholder="Quaisquer observações adicionais relevantes"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/medico/lista-espera')}
              className="btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Concluindo...' : 'Concluir Consulta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RealizarConsultaPage;
