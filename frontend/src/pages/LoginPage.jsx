import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function LoginPage() {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container-low px-4 pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>
      <div className="glass-card p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="msym text-primary text-[36px]">water_drop</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Welcome Back</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Sign in to AquaShield AI</p>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-error-container/40 border border-error/30 rounded-xl text-error font-label-md flex items-center gap-2">
            <span className="msym">error</span> {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block font-label-md text-on-surface mb-2" htmlFor="username">Username</label>
            <div className="relative">
              <span className="msym text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 text-[20px]">person</span>
              <input
                id="username" type="text" required
                value={form.username} onChange={e => setForm(f => ({...f, username: e.target.value}))}
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-surface font-body-md focus:outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block font-label-md text-on-surface mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <span className="msym text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 text-[20px]">lock</span>
              <input
                id="password" type="password" required
                value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-surface font-body-md focus:outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:shadow-xl active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center font-label-md text-on-surface-variant mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">Register</Link>
        </p>
      </div>
    </main>
  );
}
