import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { MENSAGENS_ERRO, VALIDACOES } from '../../constants';
import type { FormularioRegistroPaciente } from '../../types';

const RegistroPacientePage: React.FC = () => {
  const navigate = useNavigate();
  const { adicionarPaciente } = useData();

  const [formData, setFormData] = useState<FormularioRegistroPaciente>({
    nome_completo: '',
    data_nascimento: '',
    numero_bi: '',
    contacto: '',
    email: '',
    endereco: '',
    historico_medico: '',
  });

  const [erros, setErros] = useState<Partial<Record<keyof FormularioRegistroPaciente, string>>>({});
  const [loading, setLoading] = useState(false);

  const validarFormulario = (): boolean => {
    const novosErros: Partial<Record<keyof FormularioRegistroPaciente, string>> = {};

    // Validação do nome
    if (!formData.nome_completo.trim()) {
      novosErros.nome_completo = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
    } else if (formData.nome_completo.trim().length < 3) {
      novosErros.nome_completo = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validação da data de nascimento
    if (!formData.data_nascimento) {
      novosErros.data_nascimento = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
    } else {
      const dataNasc = new Date(formData.data_nascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNasc.getFullYear();

      if (idade < 0 || idade > 150) {
        novosErros.data_nascimento = 'Data de nascimento inválida';
      }
    }

    // Validação do BI
    if (!formData.numero_bi) {
      novosErros.numero_bi = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
    } else if (formData.numero_bi.length !== VALIDACOES.BI_MIN_LENGTH) {
      novosErros.numero_bi = MENSAGENS_ERRO.BI_INVALIDO;
    } else if (!VALIDACOES.BI_REGEX.test(formData.numero_bi)) {
      novosErros.numero_bi = MENSAGENS_ERRO.BI_INVALIDO;
    }

    // Validação do contacto
    if (!formData.contacto) {
      novosErros.contacto = MENSAGENS_ERRO.CAMPO_OBRIGATORIO;
    } else if (
      formData.contacto.length < VALIDACOES.TELEFONE_MIN_LENGTH ||
      formData.contacto.length > VALIDACOES.TELEFONE_MAX_LENGTH
    ) {
      novosErros.contacto = MENSAGENS_ERRO.TELEFONE_INVALIDO;
    }

    // Validação do email (opcional, mas se preenchido deve ser válido)
    if (formData.email && !VALIDACOES.EMAIL_REGEX.test(formData.email)) {
      novosErros.email = MENSAGENS_ERRO.EMAIL_INVALIDO;
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setLoading(true);

    try {
      await adicionarPaciente({
        nome_completo: formData.nome_completo,
        data_nascimento: new Date(formData.data_nascimento),
        numero_bi: formData.numero_bi,
        contacto: formData.contacto,
        email: formData.email || undefined,
        endereco: formData.endereco || undefined,
        historico_medico: formData.historico_medico || undefined,
      });

      alert(MENSAGENS_ERRO.PACIENTE_REGISTADO_SUCESSO);
      navigate('/rececionista/gestao-fila');
    } catch (error) {
      alert('Erro ao registar paciente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpar erro do campo quando o utilizador começa a digitar
    if (erros[name as keyof FormularioRegistroPaciente]) {
      setErros(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Registo de Novo Paciente</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="md:col-span-2">
              <label htmlFor="nome_completo" className="input-label">
                Nome Completo *
              </label>
              <input
                type="text"
                id="nome_completo"
                name="nome_completo"
                value={formData.nome_completo}
                onChange={handleChange}
                className={erros.nome_completo ? 'input border-red-500' : 'input'}
                placeholder="Insira o nome completo do paciente"
                required
              />
              {erros.nome_completo && (
                <p className="input-error">{erros.nome_completo}</p>
              )}
            </div>

            {/* Data de Nascimento */}
            <div>
              <label htmlFor="data_nascimento" className="input-label">
                Data de Nascimento *
              </label>
              <input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                className={erros.data_nascimento ? 'input border-red-500' : 'input'}
                required
              />
              {erros.data_nascimento && (
                <p className="input-error">{erros.data_nascimento}</p>
              )}
            </div>

            {/* Número do BI */}
            <div>
              <label htmlFor="numero_bi" className="input-label">
                Número do Bilhete de Identidade *
              </label>
              <input
                type="text"
                id="numero_bi"
                name="numero_bi"
                value={formData.numero_bi}
                onChange={handleChange}
                className={erros.numero_bi ? 'input border-red-500' : 'input'}
                placeholder="13 caracteres alfanuméricos"
                maxLength={13}
                required
              />
              {erros.numero_bi && (
                <p className="input-error">{erros.numero_bi}</p>
              )}
            </div>

            {/* Contacto */}
            <div>
              <label htmlFor="contacto" className="input-label">
                Contacto Telefónico *
              </label>
              <input
                type="tel"
                id="contacto"
                name="contacto"
                value={formData.contacto}
                onChange={handleChange}
                className={erros.contacto ? 'input border-red-500' : 'input'}
                placeholder="+258 XX XXX XXXX"
                required
              />
              {erros.contacto && (
                <p className="input-error">{erros.contacto}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="input-label">
                Email (Opcional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={erros.email ? 'input border-red-500' : 'input'}
                placeholder="paciente@email.com"
              />
              {erros.email && (
                <p className="input-error">{erros.email}</p>
              )}
            </div>

            {/* Endereço */}
            <div className="md:col-span-2">
              <label htmlFor="endereco" className="input-label">
                Endereço (Opcional)
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="input"
                placeholder="Bairro, Cidade, Província"
              />
            </div>

            {/* Histórico Médico */}
            <div className="md:col-span-2">
              <label htmlFor="historico_medico" className="input-label">
                Histórico Médico (Opcional)
              </label>
              <textarea
                id="historico_medico"
                name="historico_medico"
                value={formData.historico_medico}
                onChange={handleChange}
                className="input"
                rows={4}
                placeholder="Doenças crónicas, alergias, medicações em curso, etc."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/rececionista/gestao-fila')}
              className="btn-outline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Registando...' : 'Registar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroPacientePage;
