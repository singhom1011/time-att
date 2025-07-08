import './App.css';
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
  const { isAuthenticated, user, logout, loading } = useAuth();

  if (loading) return null; // Hide UI until auth is checked

  return (
    <Router>
      <nav className="main-nav">
        <div className="nav-links">
          <span className="nav-logo">TimeAtt</span>
          {isAuthenticated ? <>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
            <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''}>Attendance</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
          </> : <>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
          </>}
        </div>
        <div className="nav-user-block">
          {isAuthenticated && user && (
            <span className="nav-user-info">
              {user.name} ({user.role})
            </span>
          )}
          {isAuthenticated && (
            <button className="logout-btn" onClick={logout}>Logout</button>
          )}
          <div className="navbar-time">
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
