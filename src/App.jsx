import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import History from './pages/History';
import Profile from './pages/Profile';

function App() {
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <Router>
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100, minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span className="nav-logo">TimeAtt</span>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>Dashboard</NavLink>
          <NavLink to="/attendance" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>Attendance</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''} style={{ marginRight: '1rem' }}>History</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
        </div>
        <div className="navbar-time" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1976d2', letterSpacing: 1, minWidth: 100, textAlign: 'right' }}>
          {timeString}
        </div>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App
