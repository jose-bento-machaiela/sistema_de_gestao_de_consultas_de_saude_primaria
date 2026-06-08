import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { MENSAGENS_ERRO, VALIDACOES, PRIORIDADE_DESCRICAO } from '../../constants';
import type { FormularioTriagem, PrioridadeTriagem } from '../../types';

const TriagemPage: React.FC = () => {
  const navigate = useNavigate();
  const { adicionarTriagem, adicionarFilaEspera, pacientes } = useData();
  const { utilizador } = useAuth();

  const [pacienteSelecionado, setPacienteSelecionado] = useState('');
  const [formData, setFormData] = useState<FormularioTriagem>({
    pressao_sistolica: '',
    pressao_diastolica: '',
    temperatura: '',
    peso: '',
    altura: '',
    frequencia_cardiaca: '',
    frequencia_respiratoria: '',
    saturacao_oxigenio: '',
    queixas_principais: '',
    prioridade: 'Verde',
    observacoes: '',
  });

  const [erros, setErros] = useState<Partial<Record<keyof FormularioTriagem, string>>>({});
  const [loading, setLoading] = useState(false);

  const validarFormulario = (): boolean => {
    const novosErros: Partial<Record<keyof FormularioTriagem, string>> = {};

    // Validação de pressão arterial
    const sistolica = parseInt(formData.pressao_sistolica);
    const diastolica = parseInt(formData.pressao_diastolica);

    if (!formData.pressao_sistolica || !formData.pressao_diastolica) {
      novosErros.pressao_sistolica = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
      novosErros.pressao_diastolica = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
    } else if (
      isNaN(sistolica) ||
      isNaN(diastolica) ||
      sistolica < VALIDACOES.PRESSAO_SISTOLICA_MIN ||
      sistolica > VALIDACOES.PRESSAO_SISTOLICA_MAX ||
      diastolica < VALIDACOES.PRESSAO_DIASTOLICA_MIN ||
      diastolica > VALIDACOES.PRESSAO_DIASTOLICA_MAX
    ) {
      novosErros.pressao_sistolica = MENSAGENS_ERRO.PRESSAO_INVALIDA;
      novosErros.pressao_diastolica = MENSAGENS_ERRO.PRESSAO_INVALIDA;
    }

    // Validação de temperatura
    const temperatura = parseFloat(formData.temperatura);
    if (!formData.temperatura || isNaN(temperatura) ||
      temperatura < VALIDACOES.TEMPERATURA_MIN ||
      temperatura > VALIDACOES.TEMPERATURA_MAX) {
      novosErros.temperatura = MENSAGENS_ERRO.TEMPERATURA_INVALIDA;
    }

    // Validação de peso
    const peso = parseFloat(formData.peso);
    if (!formData.peso || isNaN(peso) ||
      peso < VALIDACOES.PESO_MIN ||
      peso > VALIDACOES.PESO_MAX) {
      novosErros.peso = MENSAGENS_ERRO.PESO_INVALIDO;
    }

    // Validação de queixas principais
    if (!formData.queixas_principais.trim()) {
      novosErros.queixas_principais = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
    }

    // Validações opcionais (se preenchido)
    if (formData.altura) {
      const altura = parseFloat(formData.altura);
      if (isNaN(altura) || altura < VALIDACOES.ALTURA_MIN || altura > VALIDACOES.ALTURA_MAX) {
        novosErros.altura = MENSAGENS_ERRO.ALTURA_INVALIDA;
      }
    }

    if (formData.frequencia_cardiaca) {
      const fc = parseInt(formData.frequencia_cardiaca);
      if (isNaN(fc) || fc < VALIDACOES.FREQUENCIA_CARDIACA_MIN || fc > VALIDACOES.FREQUENCIA_CARDIACA_MAX) {
        novosErros.frequencia_cardiaca = MENSAGENS_ERRO.FREQUENCIA_CARDIACA_INVALIDA;
      }
    }

    if (formData.saturacao_oxigenio) {
      const sat = parseInt(formData.saturacao_oxigenio);
      if (isNaN(sat) || sat < VALIDACOES.SATURACAO_OXIGENIO_MIN || sat > VALIDACOES.SATURACAO_OXIGENIO_MAX) {
        novosErros.saturacao_oxigenio = MENSAGENS_ERRO.SATURACAO_INVALIDA;
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!pacienteSelecionado) {
      alert('Por favor, selecione um paciente');
      return;
    }

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      const idTriagem = Date.now().toString();

      await adicionarTriagem({
        id_paciente: pacienteSelecionado,
        id_enfermeiro: utilizador?.id || '',
        pressao_arterial: {
          sistolica: parseInt(formData.pressao_sistolica),
          diastolica: parseInt(formData.pressao_diastolica),
        },
        temperatura: parseFloat(formData.temperatura),
        peso: parseFloat(formData.peso),
        altura: formData.altura ? parseFloat(formData.altura) : undefined,
        frequencia_cardiaca: formData.frequencia_cardiaca ? parseInt(formData.frequencia_cardiaca) : undefined,
        frequencia_respiratoria: formData.frequencia_respiratoria ? parseInt(formData.frequencia_respiratoria) : undefined,
        saturacao_oxigenio: formData.saturacao_oxigenio ? parseInt(formData.saturacao_oxigenio) : undefined,
        queixas_principais: formData.queixas_principais,
        prioridade: formData.prioridade,
        observacoes: formData.observacoes || undefined,
      });

      await adicionarFilaEspera({
        id_paciente: pacienteSelecionado,
        id_triagem: idTriagem,
        prioridade: formData.prioridade,
        status: 'Aguardando Consulta',
      });

      alert(MENSAGENS_ERRO.TRIAGEM_REGISTADA_SUCESSO);
      navigate('/enfermeiro/triagem');
    } catch (error) {
      alert('Erro ao registar triagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (erros[name as keyof FormularioTriagem]) {
      setErros(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const prioridades: PrioridadeTriagem[] = ['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul'];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Triagem - Protocolo de Manchester</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seleção de Paciente */}
          <div>
            <label htmlFor="paciente" className="input-label">
              Paciente *
            </label>
            <select
              id="paciente"
              value={pacienteSelecionado}
              onChange={(e) => setPacienteSelecionado(e.target.value)}
              className="input"
              required
            >
              <option value="">Selecione um paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome_completo} - {paciente.numero_bi}
                </option>
              ))}
            </select>
          </div>

          {/* Sinais Vitais */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Sinais Vitais</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pressão Arterial */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pressao_sistolica" className="input-label">
                    Pressão Sistólica (mmHg) *
                  </label>
                  <input
                    type="number"
                    id="pressao_sistolica"
                    name="pressao_sistolica"
                    value={formData.pressao_sistolica}
                    onChange={handleChange}
                    className={erros.pressao_sistolica ? 'input border-red-500' : 'input'}
                    placeholder="120"
                    min={VALIDACOES.PRESSAO_SISTOLICA_MIN}
                    max={VALIDACOES.PRESSAO_SISTOLICA_MAX}
                    required
                  />
                  {erros.pressao_sistolica && (
                    <p className="input-error">{erros.pressao_sistolica}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="pressao_diastolica" className="input-label">
                    Pressão Diastólica (mmHg) *
                  </label>
                  <input
                    type="number"
                    id="pressao_diastolica"
                    name="pressao_diastolica"
                    value={formData.pressao_diastolica}
                    onChange={handleChange}
                    className={erros.pressao_diastolica ? 'input border-red-500' : 'input'}
                    placeholder="80"
                    min={VALIDACOES.PRESSAO_DIASTOLICA_MIN}
                    max={VALIDACOES.PRESSAO_DIASTOLICA_MAX}
                    required
                  />
                  {erros.pressao_diastolica && (
                    <p className="input-error">{erros.pressao_diastolica}</p>
                  )}
                </div>
              </div>

              {/* Temperatura */}
              <div>
                <label htmlFor="temperatura" className="input-label">
                  Temperatura (°C) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="temperatura"
                  name="temperatura"
                  value={formData.temperatura}
                  onChange={handleChange}
                  className={erros.temperatura ? 'input border-red-500' : 'input'}
                  placeholder="36.5"
                  min={VALIDACOES.TEMPERATURA_MIN}
                  max={VALIDACOES.TEMPERATURA_MAX}
                  required
                />
                {erros.temperatura && (
                  <p className="input-error">{erros.temperatura}</p>
                )}
              </div>

              {/* Peso */}
              <div>
                <label htmlFor="peso" className="input-label">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  id="peso"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  className={erros.peso ? 'input border-red-500' : 'input'}
                  placeholder="70.5"
                  min={VALIDACOES.PESO_MIN}
                  max={VALIDACOES.PESO_MAX}
                  required
                />
                {erros.peso && (
                  <p className="input-error">{erros.peso}</p>
                )}
              </div>

              {/* Altura */}
              <div>
                <label htmlFor="altura" className="input-label">
                  Altura (cm) - Opcional
                </label>
                <input
                  type="number"
                  id="altura"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                  className={erros.altura ? 'input border-red-500' : 'input'}
                  placeholder="175"
                  min={VALIDACOES.ALTURA_MIN}
                  max={VALIDACOES.ALTURA_MAX}
                />
                {erros.altura && (
                  <p className="input-error">{erros.altura}</p>
                )}
              </div>

              {/* Frequência Cardíaca */}
              <div>
                <label htmlFor="frequencia_cardiaca" className="input-label">
                  Frequência Cardíaca (bpm) - Opcional
                </label>
                <input
                  type="number"
                  id="frequencia_cardiaca"
                  name="frequencia_cardiaca"
                  value={formData.frequencia_cardiaca}
                  onChange={handleChange}
                  className={erros.frequencia_cardiaca ? 'input border-red-500' : 'input'}
                  placeholder="72"
                  min={VALIDACOES.FREQUENCIA_CARDIACA_MIN}
                  max={VALIDACOES.FREQUENCIA_CARDIACA_MAX}
                />
                {erros.frequencia_cardiaca && (
                  <p className="input-error">{erros.frequencia_cardiaca}</p>
                )}
              </div>

              {/* Saturação de Oxigênio */}
              <div>
                <label htmlFor="saturacao_oxigenio" className="input-label">
                  SpO2 (%) - Opcional
                </label>
                <input
                  type="number"
                  id="saturacao_oxigenio"
                  name="saturacao_oxigenio"
                  value={formData.saturacao_oxigenio}
                  onChange={handleChange}
                  className={erros.saturacao_oxigenio ? 'input border-red-500' : 'input'}
                  placeholder="98"
                  min={VALIDACOES.SATURACAO_OXIGENIO_MIN}
                  max={VALIDACOES.SATURACAO_OXIGENIO_MAX}
                />
                {erros.saturacao_oxigenio && (
                  <p className="input-error">{erros.saturacao_oxigenio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Avaliação Clínica */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Avaliação Clínica</h3>

            <div className="space-y-4">
              {/* Queixas Principais */}
              <div>
                <label htmlFor="queixas_principais" className="input-label">
                  Queixas Principais *
                </label>
                <textarea
                  id="queixas_principais"
                  name="queixas_principais"
                  value={formData.queixas_principais}
                  onChange={handleChange}
                  className={erros.queixas_principais ? 'input border-red-500' : 'input'}
                  rows={3}
                  placeholder="Descreva os sintomas e queixas principais do paciente"
                  required
                />
                {erros.queixas_principais && (
                  <p className="input-error">{erros.queixas_principais}</p>
                )}
              </div>

              {/* Prioridade de Manchester */}
              <div>
                <label htmlFor="prioridade" className="input-label">
                  Classificação de Prioridade (Protocolo de Manchester) *
                </label>
                <select
                  id="prioridade"
                  name="prioridade"
                  value={formData.prioridade}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  {prioridades.map((prioridade) => (
                    <option key={prioridade} value={prioridade}>
                      {prioridade} - {PRIORIDADE_DESCRICAO[prioridade]}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-600 mt-1">
                  {PRIORIDADE_DESCRICAO[formData.prioridade]}
                </p>
              </div>

              {/* Observações */}
              <div>
                <label htmlFor="observacoes" className="input-label">
                  Observações Adicionais
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  className="input"
                  rows={3}
                  placeholder="Qualquer outra observação relevante"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/enfermeiro/triagem')}
              className="btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Registando...' : 'Registar Triagem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TriagemPage;
