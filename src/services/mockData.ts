import type { Paciente, Consulta, Utilizador, Triagem, FilaEspera, TipoUtilizador } from '../types';

// Utilizadores Mockados
export const MOCK_UTILIZADORES: Utilizador[] = [
  {
    id: '1',
    nome: 'Admin Sistema',
    email: 'admin@saude.gov.mz',
    senha: 'admin123',
    tipo: 'Administrador',
    activo: true,
    data_criacao: new Date('2026-01-01'),
    telefone: '+258 84 123 4567',
  },
  {
    id: '2',
    nome: 'Dr. Antonio Machava',
    email: 'medico1@saude.gov.mz',
    senha: 'medico123',
    tipo: 'Médico',
    activo: true,
    data_criacao: new Date('2026-01-15'),
    telefone: '+258 84 234 5678',
  },
  {
    id: '3',
    nome: 'Dr. Sofia Mutoca',
    email: 'medico2@saude.gov.mz',
    senha: 'medico123',
    tipo: 'Médico',
    activo: true,
    data_criacao: new Date('2026-02-01'),
    telefone: '+258 84 345 6789',
  },
  {
    id: '4',
    nome: 'Enf. Carlos Jamisse',
    email: 'enfermeiro1@saude.gov.mz',
    senha: 'enfermeiro123',
    tipo: 'Enfermeiro',
    activo: true,
    data_criacao: new Date('2026-01-20'),
    telefone: '+258 84 456 7890',
  },
  {
    id: '5',
    nome: 'Enf. Lucia Mondlane',
    email: 'enfermeiro2@saude.gov.mz',
    senha: 'enfermeiro123',
    tipo: 'Enfermeiro',
    activo: true,
    data_criacao: new Date('2026-02-10'),
    telefone: '+258 84 567 8901',
  },
  {
    id: '6',
    nome: 'Rec. Fernando Mabuiango',
    email: 'rececionista1@saude.gov.mz',
    senha: 'rececionista123',
    tipo: 'Recepcionista',
    activo: true,
    data_criacao: new Date('2026-01-25'),
    telefone: '+258 84 678 9012',
  },
  {
    id: '7',
    nome: 'Rec. Ana Zunguza',
    email: 'rececionista2@saude.gov.mz',
    senha: 'rececionista123',
    tipo: 'Recepcionista',
    activo: true,
    data_criacao: new Date('2026-02-15'),
    telefone: '+258 84 789 0123',
  },
];

// Pacientes Mockados
export const MOCK_PACIENTES: Paciente[] = [
  {
    id: '1',
    nome_completo: 'João Sitoe',
    data_nascimento: new Date('1985-05-15'),
    numero_bi: '1234567890123',
    contacto: '+258 84 123 4567',
    email: 'joao.sitoe@email.com',
    data_registo: new Date('2026-03-01'),
    endereco: 'Bairro Mahota, Maputo',
    historico_medico: 'Hipertensão arterial controlada',
  },
  {
    id: '2',
    nome_completo: 'Maria Macamo',
    data_nascimento: new Date('1990-08-20'),
    numero_bi: '9876543210123',
    contacto: '+258 84 234 5678',
    email: 'maria.macamo@email.com',
    data_registo: new Date('2026-03-05'),
    endereco: 'Bairro Mavalane, Maputo',
    historico_medico: 'Diabetes tipo 2',
  },
  {
    id: '3',
    nome_completo: 'Pedro Mussa',
    data_nascimento: new Date('1978-12-10'),
    numero_bi: '4567890123456',
    contacto: '+258 84 345 6789',
    data_registo: new Date('2026-03-10'),
    endereco: 'Bairro Hulene, Maputo',
  },
  {
    id: '4',
    nome_completo: 'Ana Cossa',
    data_nascimento: new Date('1995-03-25'),
    numero_bi: '7890123456789',
    contacto: '+258 84 456 7890',
    email: 'ana.cossa@email.com',
    data_registo: new Date('2026-03-15'),
    endereco: 'Bairro Laulane, Maputo',
    historico_medico: 'Asma brônquica',
  },
  {
    id: '5',
    nome_completo: 'Carlos Bila',
    data_nascimento: new Date('1982-07-08'),
    numero_bi: '2345678901234',
    contacto: '+258 84 567 8901',
    data_registo: new Date('2026-03-20'),
    endereco: 'Bairro Malhangalene, Maputo',
    historico_medico: 'Hipertensão e Diabetes',
  },
];

// Consultas Mockadas
export const MOCK_CONSULTAS: Consulta[] = [
  {
    id_consulta: '1',
    id_paciente: '1',
    id_medico: '2',
    data_hora: new Date('2026-06-06T10:00:00'),
    estado: 'Agendada',
    especialidade: 'Medicina Geral',
  },
  {
    id_consulta: '2',
    id_paciente: '2',
    id_medico: '3',
    data_hora: new Date('2026-06-06T11:30:00'),
    estado: 'Em curso',
    especialidade: 'Pediatria',
    diagnostico: 'Gastroenterite viral',
    prescricao: 'Hidratação oral, repouso e dieta leve',
  },
  {
    id_consulta: '3',
    id_paciente: '3',
    id_medico: '2',
    data_hora: new Date('2026-06-06T09:00:00'),
    estado: 'Concluída',
    especialidade: 'Cardiologia',
    diagnostico: 'Hipertensão arterial estágio 1',
    prescricao: 'Losartan 50mg 1x/dia, restrição de sódio',
    data_conclusao: new Date('2026-06-06T09:45:00'),
  },
  {
    id_consulta: '4',
    id_paciente: '4',
    id_medico: '3',
    data_hora: new Date('2026-06-06T14:00:00'),
    estado: 'Agendada',
    especialidade: 'Ginecologia',
  },
];

// Triagens Mockadas
export const MOCK_TRIAGENS: Triagem[] = [
  {
    id: '1',
    id_paciente: '1',
    id_enfermeiro: '4',
    data_hora: new Date('2026-06-06T09:30:00'),
    pressao_arterial: { sistolica: 140, diastolica: 90 },
    temperatura: 36.5,
    peso: 75,
    altura: 175,
    frequencia_cardiaca: 78,
    frequencia_respiratoria: 18,
    saturacao_oxigenio: 98,
    queixas_principais: 'Dor de cabeça e tontura',
    prioridade: 'Amarelo',
    observacoes: 'Paciente refere stress no trabalho',
  },
  {
    id: '2',
    id_paciente: '2',
    id_enfermeiro: '5',
    data_hora: new Date('2026-06-06T10:15:00'),
    pressao_arterial: { sistolica: 120, diastolica: 80 },
    temperatura: 37.2,
    peso: 65,
    altura: 165,
    frequencia_cardiaca: 85,
    frequencia_respiratoria: 20,
    saturacao_oxigenio: 97,
    queixas_principais: 'Náuseas e vômitos',
    prioridade: 'Verde',
    observacoes: 'Paciente apresenta desidratação leve',
  },
  {
    id: '3',
    id_paciente: '3',
    id_enfermeiro: '4',
    data_hora: new Date('2026-06-06T08:45:00'),
    pressao_arterial: { sistolica: 160, diastolica: 100 },
    temperatura: 36.8,
    peso: 80,
    altura: 170,
    frequencia_cardiaca: 88,
    frequencia_respiratoria: 18,
    saturacao_oxigenio: 96,
    queixas_principais: 'Pressão alta e dor no peito',
    prioridade: 'Laranja',
    observacoes: 'Paciente com histórico de hipertensão',
  },
];

// Fila de Espera Mockada
export const MOCK_FILA_ESPERA: FilaEspera[] = [
  {
    id: '1',
    id_paciente: '1',
    id_triagem: '1',
    hora_chegada: new Date('2026-06-06T09:30:00'),
    prioridade: 'Amarelo',
    status: 'Aguardando Consulta',
  },
  {
    id: '2',
    id_paciente: '2',
    id_triagem: '2',
    hora_chegada: new Date('2026-06-06T10:15:00'),
    prioridade: 'Verde',
    status: 'Em Consulta',
  },
  {
    id: '3',
    id_paciente: '3',
    id_triagem: '3',
    hora_chegada: new Date('2026-06-06T08:45:00'),
    prioridade: 'Laranja',
    status: 'Concluído',
  },
  {
    id: '4',
    id_paciente: '4',
    hora_chegada: new Date('2026-06-06T10:30:00'),
    prioridade: 'Azul',
    status: 'Aguardando Triagem',
  },
];

// Funções Auxiliares para Dados Mockados
export const getUtilizadorByEmail = (email: string): Utilizador | undefined => {
  return MOCK_UTILIZADORES.find(u => u.email === email);
};

export const getUtilizadorByTipo = (tipo: TipoUtilizador): Utilizador[] => {
  return MOCK_UTILIZADORES.filter(u => u.tipo === tipo);
};

export const getPacienteById = (id: string): Paciente | undefined => {
  return MOCK_PACIENTES.find(p => p.id === id);
};

export const getConsultaById = (id: string): Consulta | undefined => {
  return MOCK_CONSULTAS.find(c => c.id_consulta === id);
};

export const getConsultasByPaciente = (pacienteId: string): Consulta[] => {
  return MOCK_CONSULTAS.filter(c => c.id_paciente === pacienteId);
};

export const getConsultasByMedico = (medicoId: string): Consulta[] => {
  return MOCK_CONSULTAS.filter(c => c.id_medico === medicoId);
};

export const getTriagemByPaciente = (pacienteId: string): Triagem | undefined => {
  return MOCK_TRIAGENS.find(t => t.id_paciente === pacienteId);
};

export const getFilaByPrioridade = (): FilaEspera[] => {
  return [...MOCK_FILA_ESPERA].sort((a, b) => {
    const prioridadeOrder = ['Vermelho', 'Laranja', 'Amarelo', 'Verde', 'Azul'];
    return prioridadeOrder.indexOf(a.prioridade) - prioridadeOrder.indexOf(b.prioridade);
  });
};

export const getEstatisticasDashboard = () => {
  return {
    total_pacientes: MOCK_PACIENTES.length,
    total_consultas_hoje: MOCK_CONSULTAS.filter(c =>
      c.data_hora.toDateString() === new Date().toDateString()
    ).length,
    consultas_agendadas: MOCK_CONSULTAS.filter(c => c.estado === 'Agendada').length,
    consultas_em_curso: MOCK_CONSULTAS.filter(c => c.estado === 'Em curso').length,
    consultas_concluidas: MOCK_CONSULTAS.filter(c => c.estado === 'Concluída').length,
    pacientes_em_fila: MOCK_FILA_ESPERA.filter(f => f.status !== 'Concluído').length,
    utilizadores_activos: MOCK_UTILIZADORES.filter(u => u.activo).length,
  };
};
