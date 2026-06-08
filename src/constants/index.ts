import type { PrioridadeTriagem, Especialidade, TipoUtilizador } from '../types';

// Cores do Sistema baseadas em prioridades
export const PRIORIDADE_COLORS = {
  Vermelho: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    badge: 'bg-red-500',
  },
  Laranja: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    badge: 'bg-orange-500',
  },
  Amarelo: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    badge: 'bg-yellow-500',
  },
  Verde: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    badge: 'bg-green-500',
  },
  Azul: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    badge: 'bg-blue-500',
  },
};

// Descrições das Prioridades (Protocolo de Manchester)
export const PRIORIDADE_DESCRICAO: Record<PrioridadeTriagem, string> = {
  Vermelho: 'Emergência - Atenção imediata',
  Laranja: 'Muito urgente - Atenção dentro de 10 minutos',
  Amarelo: 'Urgente - Atenção dentro de 60 minutos',
  Verde: 'Pouco urgente - Atenção dentro de 120 minutos',
  Azul: 'Não urgente - Atenção dentro de 240 minutos',
};

// Lista de Especialidades
export const ESPECIALIDADES: Especialidade[] = [
  'Medicina Geral',
  'Pediatria',
  'Ginecologia',
  'Cardiologia',
  'Ortopedia',
];

// Tipos de Utilizador
export const TIPOS_UTILIZADOR: TipoUtilizador[] = [
  'Administrador',
  'Médico',
  'Enfermeiro',
  'Recepcionista',
];

// Rotas do Sistema
export const ROTAS = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',

  // Recepcionista
  REGISTRO_PACIENTE: '/recepcionista/registro-paciente',
  AGENDAMENTO_CONSULTA: '/rececionista/agendamento-consulta',
  GESTAO_FILA: '/rececionista/gestao-fila',

  // Enfermeiro
  TRIAGEM: '/enfermeiro/triagem',
  LISTA_TRIAGEM: '/enfermeiro/lista-triagem',

  // Médico
  LISTA_ESPERA: '/medico/lista-espera',
  REALIZAR_CONSULTA: '/medico/realizar-consulta/:id',
  EMISSAO_REFERENCIA: '/medico/emissao-referencia',
  HISTORICO_PACIENTE: '/medico/historico-paciente/:id',

  // Administrador
  ADMIN_DASHBOARD: '/administrador/dashboard',
  GESTAO_UTILIZADORES: '/administrador/gestao-utilizadores',
  RELATORIOS: '/administrador/relatorios',
};

// Configurações de Validação
export const VALIDACOES = {
  BI_MIN_LENGTH: 13,
  BI_MAX_LENGTH: 13,
  TELEFONE_MIN_LENGTH: 9,
  TELEFONE_MAX_LENGTH: 12,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  BI_REGEX: /^[0-9A-Za-z]+$/,

  // Valores normais para sinais vitais
  PRESSAO_SISTOLICA_MIN: 70,
  PRESSAO_SISTOLICA_MAX: 250,
  PRESSAO_DIASTOLICA_MIN: 40,
  PRESSAO_DIASTOLICA_MAX: 150,

  TEMPERATURA_MIN: 35,
  TEMPERATURA_MAX: 42,

  PESO_MIN: 2,
  PESO_MAX: 300,

  ALTURA_MIN: 50,
  ALTURA_MAX: 250,

  FREQUENCIA_CARDIACA_MIN: 40,
  FREQUENCIA_CARDIACA_MAX: 200,

  FREQUENCIA_RESPIRATORIA_MIN: 8,
  FREQUENCIA_RESPIRATORIA_MAX: 40,

  SATURACAO_OXIGENIO_MIN: 70,
  SATURACAO_OXIGENIO_MAX: 100,
};

// Mensagens de Erro
export const MENSAGENS_ERRO = {
  CAMPO_OBRIGATORIO: 'Este campo é obrigatório',
  BI_INVALIDO: 'Número de BI inválido. Deve conter 13 caracteres alfanuméricos',
  EMAIL_INVALIDO: 'Endereço de email inválido',
  TELEFONE_INVALIDO: 'Número de telefone inválido',
  DATA_NASCIMENTO_INVALIDA: 'Data de nascimento inválida',
  SENHA_CURTA: 'A senha deve ter pelo menos 6 caracteres',

  // Validações de sinais vitais
  PRESSAO_INVALIDA: 'Valores de pressão arterial inválidos',
  TEMPERATURA_INVALIDA: 'Temperatura corporal inválida',
  PESO_INVALIDO: 'Peso inválido',
  ALTURA_INVALIDA: 'Altura inválida',
  FREQUENCIA_CARDIACA_INVALIDA: 'Frequência cardíaca inválida',
  FREQUENCIA_RESPIRATORIA_INVALIDA: 'Frequência respiratória inválida',
  SATURACAO_INVALIDA: 'Saturação de oxigênio inválida',

  // Mensagens de sucesso
  PACIENTE_REGISTADO_SUCESSO: 'Paciente registado com sucesso',
  TRIAGEM_REGISTADA_SUCESSO: 'Triagem registada com sucesso',
  CONSULTA_CONCLUIDA_SUCESSO: 'Consulta concluída com sucesso',
  REFERENCIA_EMITIDA_SUCESSO: 'Referência emitida com sucesso',
  UTILIZADOR_CRIADO_SUCESSO: 'Utilizador criado com sucesso',
};

// Formatação de Data e Hora
export const FORMATOS_DATA = {
  DATA_HORA: 'DD/MM/YYYY HH:mm',
  DATA: 'DD/MM/YYYY',
  HORA: 'HH:mm',
};

// Unidades de Saúde para Referência
export const UNIDADES_SAUDE = [
  'Hospital Central de Maputo',
  'Hospital Geral de Machava',
  'Hospital Geral de José Macamo',
  'Centro de Saúde da 1ª Cidade',
  'Centro de Saúde da 2ª Cidade',
  'Centro de Saúde da 3ª Cidade',
  'Centro de Saúde da 4ª Cidade',
  'Centro de Saúde da 5ª Cidade',
  'Instituto do Coração',
  'Clínica Especializada de Ortopedia',
];

// Configurações da Aplicação
export const CONFIGURACOES_APP = {
  NOME_APP: 'SGCSP - Sistema de Gestão de Consultas de Saúde Primária',
  VERSAO: '1.0.0',
  TIMEOUT_SESSAO: 30 * 60 * 1000, // 30 minutos em milissegundos
};
