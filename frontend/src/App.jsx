import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import TopNav    from './components/TopNav';
import Footer    from './components/Footer';
import LandingPage    from './pages/LandingPage';
import UploadPage     from './pages/UploadPage';
import ResultsPage    from './pages/ResultsPage';
import ChatPage       from './pages/ChatPage';
import DashboardPage  from './pages/DashboardPage';
import HistoryPage    from './pages/HistoryPage';
import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="msym text-primary text-[48px] animate-spin">autorenew</span>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/login"     element={<LoginPage />} />
        <Route path="/register"  element={<RegisterPage />} />
        <Route path="/upload"    element={<PrivateRoute><UploadPage /></PrivateRoute>} />
        <Route path="/results/:id" element={<PrivateRoute><ResultsPage /></PrivateRoute>} />
        <Route path="/chat"      element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/history"   element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
