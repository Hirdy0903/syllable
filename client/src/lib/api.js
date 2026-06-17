const BASE = import.meta.env.VITE_API_URL

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })
  const data = await res.json()
  if (!data.success) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

// Auth
export const api = {
  auth: {
    register: (email, password) =>
      request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
    login: (email, password) =>
      request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    me: () => request('/auth/me'),
  },
  roadmaps: {
    list: () => request('/roadmaps'),
    get: (id) => request(`/roadmaps/${id}`),
    create: (title, description) =>
      request('/roadmaps', { method: 'POST', body: JSON.stringify({ title, description }) }),
    delete: (id) => request(`/roadmaps/${id}`, { method: 'DELETE' }),
  },
  ai: {
    generate: (goal) =>
      request('/ai/generate', { method: 'POST', body: JSON.stringify({ goal }) }),
  },
}
