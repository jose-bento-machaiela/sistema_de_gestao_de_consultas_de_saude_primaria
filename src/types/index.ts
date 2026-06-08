// Tipos de Utilizador (Perfis)
export type TipoUtilizador = 'Administrador' | 'Médico' | 'Enfermeiro' | 'Recepcionista';

// Estado da Consulta
export type EstadoConsulta = 'Agendada' | 'Em curso' | 'Concluída' | 'Cancelada';

// Prioridade de Triagem (Protocolo de Manchester)
export type PrioridadeTriagem = 'Vermelho' | 'Laranja' | 'Amarelo' | 'Verde' | 'Azul';

// Especialidade Médica
export type Especialidade = 'Medicina Geral' | 'Pediatria' | 'Ginecologia' | 'Cardiologia' | 'Ortopedia';

// Interface de Utilizador
export interface Utilizador {
  id: string;
  nome: string;
  email: string;
  senha: string; // Em produção, isso seria hash
  tipo: TipoUtilizador;
  activo: boolean;
  data_criacao: Date;
  telefone?: string;
}

// Interface de Paciente
export interface Paciente {
  id: string;
  nome_completo: string;
  data_nascimento: Date;
  numero_bi: string;
  contacto: string;
  email?: string;
  data_registo: Date;
  endereco?: string;
  historico_medico?: string;
}

// Interface de Consulta
export interface Consulta {
  id_consulta: string;
  id_paciente: string;
  id_medico: string;
  data_hora: Date;
  estado: EstadoConsulta;
  especialidade: Especialidade;
  diagnostico?: string;
  prescricao?: string;
  observacoes?: string;
  data_conclusao?: Date;
}

// Interface de Triagem
export interface Triagem {
  id: string;
  id_paciente: string;
  id_enfermeiro: string;
  data_hora: Date;
  pressao_arterial: {
    sistolica: number;
    diastolica: number;
  };
  temperatura: number;
  peso: number;
  altura?: number;
  frequencia_cardiaca?: number;
  frequencia_respiratoria?: number;
  saturacao_oxigenio?: number;
  queixas_principais: string;
  prioridade: PrioridadeTriagem;
  observacoes?: string;
}

// Interface de Referência (Encaminhamento)
export interface Referencia {
  id: string;
  id_paciente: string;
  id_medico_origem: string;
  id_consulta: string;
  data_emissao: Date;
  unidade_destino: string;
  especialidade_destino: Especialidade;
  motivo: string;
  urgencia: 'Baixa' | 'Média' | 'Alta';
  observacoes?: string;
}

// Interface de Fila de Espera
export interface FilaEspera {
  id: string;
  id_paciente: string;
  id_triagem?: string;
  hora_chegada: Date;
  prioridade: PrioridadeTriagem;
  status: 'Aguardando Triagem' | 'Aguardando Consulta' | 'Em Consulta' | 'Concluído';
}

// Estatísticas do Dashboard
export interface EstatisticasDashboard {
  total_pacientes: number;
  total_consultas_hoje: number;
  consultas_agendadas: number;
  consultas_em_curso: number;
  consultas_concluidas: number;
  pacientes_em_fila: number;
  utilizadores_activos: number;
}

// Types para Formulários
export interface FormularioRegistroPaciente {
  nome_completo: string;
  data_nascimento: string;
  numero_bi: string;
  contacto: string;
  email: string;
  endereco: string;
  historico_medico: string;
}

export interface FormularioTriagem {
  pressao_sistolica: string;
  pressao_diastolica: string;
  temperatura: string;
  peso: string;
  altura: string;
  frequencia_cardiaca: string;
  frequencia_respiratoria: string;
  saturacao_oxigenio: string;
  queixas_principais: string;
  prioridade: PrioridadeTriagem;
  observacoes: string;
}

export interface FormularioConsulta {
  diagnostico: string;
  prescricao: string;
  observacoes: string;
}

export interface FormularioAgendamento {
  id_paciente: string;
  id_medico: string;
  especialidade: Especialidade;
  data_hora: string;
}

// Types para Contexto de Autenticação
export interface AuthContextType {
  utilizador: Utilizador | null;
  login: (email: string, senha: string, tipo: TipoUtilizador) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Types para Contexto de Dados
export interface DataContextType {
  pacientes: Paciente[];
  consultas: Consulta[];
  triagens: Triagem[];
  utilizadores: Utilizador[];
  filaEspera: FilaEspera[];
  carregarDados: () => Promise<void>;
  adicionarPaciente: (paciente: Omit<Paciente, 'id' | 'data_registo'>) => Promise<void>;
  atualizarPaciente: (id: string, dados: Partial<Paciente>) => Promise<void>;
  removerPaciente: (id: string) => Promise<void>;
  adicionarConsulta: (consulta: Omit<Consulta, 'id_consulta' | 'estado'>) => Promise<void>;
  actualizarEstadoConsulta: (id: string, estado: EstadoConsulta) => Promise<void>;
  adicionarTriagem: (triagem: Omit<Triagem, 'id' | 'data_hora'>) => Promise<void>;
  adicionarFilaEspera: (fila: Omit<FilaEspera, 'id' | 'hora_chegada'>) => Promise<void>;
  actualizarFilaEspera: (id: string, status: FilaEspera['status']) => Promise<void>;
}
