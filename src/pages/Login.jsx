import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 96px)', background: '#f6f8fa' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(25,118,210,0.07)', padding: '2.5rem 2rem', minWidth: 320, maxWidth: 400, width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Login</h2>
        {error && <div style={{ color: '#e53935', marginBottom: 16, textAlign: 'center' }}>{error}</div>}
        <div style={{ marginBottom: 18 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bdbdbd', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bdbdbd', marginTop: 4 }} />
        </div>
        <button type="submit" style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', marginTop: 8 }} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          Don&apos;t have an account? <a href="/signup" style={{ color: '#1976d2' }}>Sign Up</a>
        </div>
      </form>
    </div>
  );
} 