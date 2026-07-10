import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('aq_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authApi.me(token)
        .then(u => setUser(u))
        .catch(() => { localStorage.removeItem('aq_token'); setToken(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const form = new FormData();
    form.append('username', username);
    form.append('password', password);
    const data = await authApi.login(form);
    localStorage.setItem('aq_token', data.access_token);
    setToken(data.access_token);
    const me = await authApi.me(data.access_token);
    setUser(me);
    return me;
  };

  const register = async (payload) => {
    await authApi.register(payload);
    return login(payload.username, payload.password);
  };

  const logout = () => {
    localStorage.removeItem('aq_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
