const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(method, path, body, token) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let bodyInit;
  if (body instanceof FormData) {
    bodyInit = body;
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    bodyInit = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: bodyInit });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json();
}

export const api = {
  post:   (path, body, token) => request('POST',   path, body, token),
  get:    (path, token)       => request('GET',    path, null, token),
  delete: (path, token)       => request('DELETE', path, null, token),
};

// Auth
export const authApi = {
  login:    (data)        => api.post('/auth/token', data),
  register: (data)        => api.post('/auth/register', data),
  me:       (token)       => api.get('/auth/me', token),
};

// Predictions
export const predictApi = {
  upload:  (formData, token) => api.post('/predictions/upload', formData, token),
  history: (token)           => api.get('/predictions/', token),
  get:     (id, token)       => api.get(`/predictions/${id}`, token),
};

// Chat
export const chatApi = {
  send:    (data, token)     => api.post('/chat/', data, token),
  history: (token)           => api.get('/chat/', token),
};

// Dashboard
export const dashboardApi = {
  stats:   (token)           => api.get('/dashboard/stats', token),
};
