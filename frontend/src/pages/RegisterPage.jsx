import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]   = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await register({ username: form.username, email: form.email, password: form.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const fields = [
    { id:'username', label:'Username', icon:'person',   type:'text',     placeholder:'Choose a username'  },
    { id:'email',    label:'Email',    icon:'email',    type:'email',    placeholder:'your@email.com'      },
    { id:'password', label:'Password', icon:'lock',     type:'password', placeholder:'Create a password'   },
    { id:'confirm',  label:'Confirm',  icon:'lock_reset',type:'password',placeholder:'Confirm your password'},
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container-low px-4 py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>
      <div className="glass-card p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="msym text-primary text-[36px]">person_add</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Create Account</h1>
          <p className="font-body-md text-on-surface-variant mt-1">Join AquaShield AI Platform</p>
        </div>

        {error && (
          <div className="mb-5 p-4 bg-error-container/40 border border-error/30 rounded-xl text-error font-label-md flex items-center gap-2">
            <span className="msym">error</span> {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {fields.map(f => (
            <div key={f.id}>
              <label className="block font-label-md text-on-surface mb-2" htmlFor={f.id}>{f.label}</label>
              <div className="relative">
                <span className="msym text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2 text-[20px]">{f.icon}</span>
                <input
                  id={f.id} type={f.type} required
                  value={form[f.id]} onChange={e => setForm(fm => ({...fm, [f.id]: e.target.value}))}
                  placeholder={f.placeholder}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-surface font-body-md focus:outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          ))}
          <button
            type="submit" disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-headline-md text-headline-md hover:shadow-xl active:scale-95 transition-all disabled:opacity-60 mt-2"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center font-label-md text-on-surface-variant mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
        </p>
      </div>
    </main>
  );
}
