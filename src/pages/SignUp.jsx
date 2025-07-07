import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sign up failed');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 96px)', background: '#f6f8fa' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(25,118,210,0.07)', padding: '2.5rem 2rem', minWidth: 320, maxWidth: 400, width: '100%' }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>Sign Up</h2>
        {error && <div style={{ color: '#e53935', marginBottom: 16, textAlign: 'center' }}>{error}</div>}
        <div style={{ marginBottom: 18 }}>
          <label>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bdbdbd', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bdbdbd', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bdbdbd', marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #bdbdbd', marginTop: 4 }}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', marginTop: 8 }} disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          Already have an account? <a href="/login" style={{ color: '#1976d2' }}>Login</a>
        </div>
      </form>
    </div>
  );
} 