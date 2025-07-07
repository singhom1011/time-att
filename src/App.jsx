import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import History from './pages/History';
import Profile from './pages/Profile';
import { useState, useEffect } from 'react';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Router>
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100, minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span className="nav-logo">TimeAtt</span>
          {isAuthenticated ? <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>Dashboard</NavLink>
            <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>Attendance</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>History</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
          </> : <>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>Login</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
          </>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {isAuthenticated && user && (
            <span style={{ color: '#1976d2', fontWeight: 500, marginRight: 12 }}>
              {user.name} ({user.role})
            </span>
          )}
          {isAuthenticated && (
            <button onClick={logout} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
          )}
          <div className="navbar-time" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1976d2', letterSpacing: 1, minWidth: 100, textAlign: 'right' }}>
            {timeString}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
