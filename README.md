# SGCSP - Sistema de Gestão de Consultas de Saúde Primária

Sistema web para gestão de consultas médicas em unidades de saúde primária, desenvolvido como projecto académico de Engenharia de Software.

## 📋 Visão Geral

O SGCSP é uma aplicação web completa que permite gerir o fluxo de pacientes numa unidade de saúde, desde o registo inicial até à conclusão da consulta médica. O sistema utiliza o **Protocolo de Manchester** para triagem de pacientes e oferece diferentes funcionalidades consoante o tipo de utilizador.

## 🎯 Funcionalidades Implementadas

### Perfil: Recepcionista
- ✅ **Registo de Pacientes**: Cadastro completo com dados pessoais, contacto e histórico médico
- ✅ **Gestão de Fila de Espera**: Visualização e gestão da fila de pacientes em tempo real
- ✅ **Agendamento de Consultas**: Marcação de consultas para diferentes especialidades
- ✅ **Validação de Dados**: Validação de BI, email e telefone com feedback visual

### Perfil: Enfermeiro
- ✅ **Triagem de Pacientes**: Registo completo de sinais vitais e avaliação de prioridade
- ✅ **Protocolo de Manchester**: Classificação automática por cores (Vermelho, Laranja, Amarelo, Verde, Azul)
- ✅ **Sinais Vitais**: Pressão arterial, temperatura, peso, altura, frequência cardíaca, respiratória e saturação
- ✅ **Queixas Principais**: Registo detalhado dos sintomas apresentados
- ✅ **Validações Clínicas**: Validação de valores normais para sinais vitais

### Perfil: Médico
- ✅ **Lista de Espera**: Visualização de pacientes aguardando consulta, ordenados por prioridade
- ✅ **Realização de Consultas**: Registo de diagnóstico, prescrição e observações
- ✅ **Histórico do Paciente**: Acesso a informações do paciente e triagem realizada
- ✅ **Gestão de Estado**: Actualização do estado da consulta (Agendada → Em curso → Concluída)
- ✅ **Emissão de Referências**: Encaminhamento para outras especialidades/unidades (preparado)

### Perfil: Administrador
- ✅ **Dashboard Global**: Visualização de estatísticas em tempo real
- ✅ **Métricas**: Total de pacientes, consultas hoje, consultas agendadas/em curso/concluídas
- ✅ **Gestão de Utilizadores**: Interface preparada para gestão de contas (preparado)

### Funcionalidades Comuns
- ✅ **Autenticação**: Sistema de login com validação de credenciais
- ✅ **Protecção de Rotas**: Acesso controlado por tipo de utilizador
- ✅ **Redirecionamento Inteligente**: Cada perfil é redirecionado para a dashboard apropriada
- ✅ **Layout Consistente**: Sidebar, Header e MainLayout com design unificado

## 🏗️ Arquitetura

### Estrutura do Projecto

```
src/
├── components/
│   └── layout/
│       ├── MainLayout.tsx    # Layout principal com Sidebar e Header
│       ├── Sidebar.tsx         # Menu de navegação lateral
│       └── Header.tsx          # Cabeçalho com título e informações
│
├── contexts/
│   ├── AuthContext.tsx         # Contexto de autenticação
│   └── DataContext.tsx          # Contexto de dados compartilhados
│
├── pages/
│   ├── auth/
│   │   └── LoginPage.tsx       # Página de login
│   │
│   ├── rececionista/
│   │   ├── RegistroPacientePage.tsx    # Registo de novos pacientes
│   │   └── GestaoFilaPage.tsx          # Gestão da fila de espera
│   │
│   ├── enfermeiro/
│   │   └── TriagemPage.tsx             # Realização de triagem
│   │
│   ├── medico/
│   │   ├── ListaEsperaSimplePage.tsx   # Lista simples de espera
│   │   └── ListaEsperaPage.tsx         # Realização de consultas
│   │
│   └── administrador/
│       └── DashboardPage.tsx           # Dashboard administrativo
│
├── services/
│   └── mockData.ts             # Dados mockados para demonstração
│
├── types/
│   └── index.ts                # Definições de tipos TypeScript
│
├── constants/
│   └── index.ts                # Constantes e configurações
│
├── App.tsx                     # Configuração de rotas
├── main.tsx                    # Ponto de entrada
└── index.css                   # Estilos globais + Tailwind
```

### Tipos Definidos

- **Utilizador**: Perfis do sistema (Administrador, Médico, Enfermeiro, Rececionista)
- **Paciente**: Dados completos do paciente
- **Consulta**: Consultas médicas com estados e diagnósticos
- **Triagem**: Avaliação de enfermagem com sinais vitais e prioridade
- **FilaEspera**: Gestão de pacientes em fila de espera
- **Referencia**: Encaminhamentos entre especialidades

### Constantes e Configurações

- **PRIORIDADE_COLORS**: Cores associadas a cada nível de prioridade
- **PRIORIDADE_DESCRICAO**: Descrições do Protocolo de Manchester
- **VALIDACOES**: Validações de formulários e valores clínicos
- **MENSAGENS_ERRO**: Mensagens padronizadas de erro/sucesso
- **ROTAS**: Definição de todas as rotas do sistema
- **UNIDADES_SAUDE**: Lista de unidades para referências

## 🎨 Design e UX

### Características Visuais
- **Gradiente de Fundo**: Cores primárias/secundárias para páginas públicas
- **Badge Colors**: Cores específicas para prioridades de triagem
- **Formulários Consistentes**: Classes reutilizáveis para inputs e botões
- **Feedback Visual**: Estados de loading, erro e sucesso
- **Responsividade**: Layout adaptável para diferentes tamanhos de ecrã

### Animações e Micro-interações
- **Spinner**: Indicadores de loading em operações assíncronas
- **Hover States**: Feedback visual em botões e links
- **Transições Suaves**: Mudanças de estado com animações CSS

## 🔐 Credenciais de Teste

O sistema dispõe de dados mockados para demonstração:

| Tipo de Utilizador | Email | Senha |
|---|---|---|
| Administrador | admin@saude.gov.mz | admin123 |
| Médico | medico1@saude.gov.mz | medico123 |
| Enfermeiro | enfermeiro1@saude.gov.mz | enfermeiro123 |
| Rececionista | rececionista1@saude.gov.mz | rececionista123 |

## 🚀 Tecnologias Utilizadas

- **React 19.2**: Framework frontend com React Compiler
- **TypeScript 6.0**: Tipagem estática para maior segurança
- **Vite 8.0**: Build tool ultra-rápido
- **React Router 7**: Navegação e gestão de rotas
- **Tailwind CSS 3.4**: Framework de utilitários CSS
- **Context API**: Gestão de estado global
- **LocalStorage**: Persistência de sessão

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 24.x ou superior
- npm ou yarn

### Passos

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd gestao_de_saude/frontend
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

4. **Aceda à aplicação**:
Abra o navegador em `http://localhost:5173`

### Outros Comandos

```bash
# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Linting
npm run lint
```

## 🔄 Fluxo de Trabalho

### Fluxo do Paciente

1. **Receção**: Registo do paciente pelo Rececionista
2. **Triagem**: Avaliação pelo Enfermeiro (sinais vitais + prioridade)
3. **Fila de Espera**: Paciente aguarda conforme prioridade (Protocolo de Manchester)
4. **Consulta**: Médico realiza consulta e regista diagnóstico/prescrição
5. **Conclusão**: Consulta finalizada e paciente libertado

### Protocolo de Manchester

| Cor | Prioridade | Tempo Máximo de Atendimento |
|---|---|---|
| 🟥 Vermelho | Emergência | Imediato |
| 🟧 Laranja | Muito Urgente | 10 minutos |
| 🟨 Amarelo | Urgente | 60 minutos |
| 🟩 Verde | Pouco Urgente | 120 minutos |
| 🟦 Azul | Não Urgente | 240 minutos |

## 📊 Estado do Projecto

### ✅ Implementado
- Sistema de autenticação completo
- Páginas para todos os perfis de utilizador
- Gestão de estado com Context API
- Validações de formulário
- Sistema de rotas protegido
- Layout consistente e responsivo
- Dados mockados para demonstração

### 🔄 Em Desenvolvimento
- Integração com API backend
- Sistema de notificações
- Relatórios e exportação de dados
- Histórico completo de pacientes

### 📌 Planejado
- Gestão de medicamentos e farmácia
- Sistema de faturação
- Integração com sistemas nacionais de saúde
- Mobile app para pacientes

## 👥 Equipa

Desenvolvido como projecto académico da disciplina de Engenharia de Software.

## 📝 Licença

Este projecto é exclusivamente para fins académicos.

---

**Versão**: 1.0.0  
**Última Actualização**: Junho 2026
