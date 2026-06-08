import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';

// Recepcionista Pages
import RegistroPacientePage from './pages/rececionista/RegistroPacientePage';
import GestaoFilaPage from './pages/rececionista/GestaoFilaPage';

// Enfermeiro Pages
import TriagemPage from './pages/enfermeiro/TriagemPage';

// Médico Pages
import ListaEsperaSimplePage from './pages/medico/ListaEsperaSimplePage';
import RealizarConsultaPage from './pages/medico/ListaEsperaPage';

// Administrador Pages
import DashboardPage from './pages/administrador/DashboardPage';

// Componente de Proteção de Rota
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedTypes?: string[] }> = ({
  children,
  allowedTypes,
}) => {
  const { isAuthenticated, isLoading, utilizador } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && utilizador && !allowedTypes.includes(utilizador.tipo)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Componente de Redirecionamento por Tipo de Utilizador
const RedirectToDashboard: React.FC = () => {
  const { utilizador, isAuthenticated } = useAuth();

  if (!isAuthenticated || !utilizador) {
    return <Navigate to="/login" replace />;
  }

  switch (utilizador.tipo) {
    case 'Administrador':
      return <Navigate to="/administrador/dashboard" replace />;
    case 'Médico':
      return <Navigate to="/medico/lista-espera" replace />;
    case 'Enfermeiro':
      return <Navigate to="/enfermeiro/triagem" replace />;
    case 'Recepcionista':
      return <Navigate to="/rececionista/gestao-fila" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Rota Pública */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rota Principal - Redireciona conforme o tipo de utilizador */}
            <Route path="/" element={<RedirectToDashboard />} />

            {/* Rotas do Rececionista */}
            <Route
              path="/rececionista/registro-paciente"
              element={
                <ProtectedRoute allowedTypes={['Recepcionista']}>
                  <MainLayout title="Registo de Paciente">
                    <RegistroPacientePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/rececionista/gestao-fila"
              element={
                <ProtectedRoute allowedTypes={['Recepcionista']}>
                  <MainLayout title="Gestão de Fila">
                    <GestaoFilaPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Rotas do Enfermeiro */}
            <Route
              path="/enfermeiro/triagem"
              element={
                <ProtectedRoute allowedTypes={['Enfermeiro']}>
                  <MainLayout title="Triagem">
                    <TriagemPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Rotas do Médico */}
            <Route
              path="/medico/lista-espera"
              element={
                <ProtectedRoute allowedTypes={['Médico']}>
                  <MainLayout title="Lista de Espera">
                    <ListaEsperaSimplePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/medico/realizar-consulta/:id"
              element={
                <ProtectedRoute allowedTypes={['Médico']}>
                  <MainLayout title="Realizar Consulta">
                    <RealizarConsultaPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Rotas do Administrador */}
            <Route
              path="/administrador/dashboard"
              element={
                <ProtectedRoute allowedTypes={['Administrador']}>
                  <MainLayout title="Dashboard">
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            {/* Rota 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
