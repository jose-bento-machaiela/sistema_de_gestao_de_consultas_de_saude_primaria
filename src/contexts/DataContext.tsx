import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  Paciente,
  Consulta,
  Triagem,
  Utilizador,
  FilaEspera,
  EstadoConsulta,
  DataContextType,
} from '../types';
import {
  MOCK_PACIENTES,
  MOCK_CONSULTAS,
  MOCK_TRIAGENS,
  MOCK_UTILIZADORES,
  MOCK_FILA_ESPERA,
} from '../services/mockData';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [triagens, setTriagens] = useState<Triagem[]>([]);
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [filaEspera, setFilaEspera] = useState<FilaEspera[]>([]);

  // Carregar dados iniciais
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    // Simular carregamento de dados
    await new Promise(resolve => setTimeout(resolve, 500));

    setPacientes(MOCK_PACIENTES);
    setConsultas(MOCK_CONSULTAS);
    setTriagens(MOCK_TRIAGENS);
    setUtilizadores(MOCK_UTILIZADORES);
    setFilaEspera(MOCK_FILA_ESPERA);
  };

  const adicionarPaciente = async (paciente: Omit<Paciente, 'id' | 'data_registo'>) => {
    const novoPaciente: Paciente = {
      ...paciente,
      id: Date.now().toString(),
      data_registo: new Date(),
    };
    setPacientes([...pacientes, novoPaciente]);
  };

  const atualizarPaciente = async (id: string, dados: Partial<Paciente>) => {
    setPacientes(pacientes.map(p => (p.id === id ? { ...p, ...dados } : p)));
  };

  const removerPaciente = async (id: string) => {
    setPacientes(pacientes.filter(p => p.id !== id));
  };

  const adicionarConsulta = async (consulta: Omit<Consulta, 'id_consulta' | 'estado'>) => {
    const novaConsulta: Consulta = {
      ...consulta,
      id_consulta: Date.now().toString(),
      estado: 'Agendada',
    };
    setConsultas([...consultas, novaConsulta]);
  };

  const actualizarEstadoConsulta = async (id: string, estado: EstadoConsulta) => {
    setConsultas(
      consultas.map(c =>
        c.id_consulta === id ? { ...c, estado } : c
      )
    );
  };

  const adicionarTriagem = async (triagem: Omit<Triagem, 'id' | 'data_hora'>) => {
    const novaTriagem: Triagem = {
      ...triagem,
      id: Date.now().toString(),
      data_hora: new Date(),
    };
    setTriagens([...triagens, novaTriagem]);
  };

  const adicionarFilaEspera = async (fila: Omit<FilaEspera, 'id' | 'hora_chegada'>) => {
    const novaFila: FilaEspera = {
      ...fila,
      id: Date.now().toString(),
      hora_chegada: new Date(),
    };
    setFilaEspera([...filaEspera, novaFila]);
  };

  const actualizarFilaEspera = async (id: string, status: FilaEspera['status']) => {
    setFilaEspera(
      filaEspera.map(f =>
        f.id === id ? { ...f, status } : f
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        pacientes,
        consultas,
        triagens,
        utilizadores,
        filaEspera,
        carregarDados,
        adicionarPaciente,
        atualizarPaciente,
        removerPaciente,
        adicionarConsulta,
        actualizarEstadoConsulta,
        adicionarTriagem,
        adicionarFilaEspera,
        actualizarFilaEspera,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
};
