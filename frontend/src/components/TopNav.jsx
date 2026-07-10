import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function TopNav() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();
  const active = 'text-primary border-b-2 border-primary pb-1 font-bold font-label-md text-label-md';
  const inactive = 'text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md';

  const isActive = (path) => loc.pathname === path ? active : inactive;

  return (
    <header className="fixed top-0 z-50 w-full h-20 bg-surface/80 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,74,198,0.05)]">
      <nav className="flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto h-full">
        <Link to="/" className="flex items-center gap-2">
          <span className="msym text-primary text-4xl">water_drop</span>
          <span className="font-display-lg text-[22px] md:text-[28px] text-primary tracking-tight">AquaShield AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
          <Link to="/history" className={isActive('/history')}>History</Link>
          <Link to="/chat" className={isActive('/chat')}>AI Chat</Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:block text-label-md text-on-surface-variant">Hi, {user.username}</span>
              <button
                onClick={() => { logout(); nav('/'); }}
                className="bg-surface-container-high text-on-surface px-5 py-2 rounded-full font-label-md text-label-md hover:opacity-80 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all duration-200 shadow-lg"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
