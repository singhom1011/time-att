import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Attendance() {
  const [form, setForm] = useState({ name: '', id: '', checkIn: '', checkOut: '' });
  const [records, setRecords] = useState([
    { name: 'John Doe', id: 'EMP001', checkIn: '09:00', checkOut: '17:00' },
    { name: 'Jane Smith', id: 'EMP002', checkIn: '09:10', checkOut: '17:05' },
  ]);
  const [useCurrentTime, setUseCurrentTime] = useState({ checkIn: true, checkOut: true });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeToggle = (field) => {
    setUseCurrentTime({ ...useCurrentTime, [field]: !useCurrentTime[field] });
    if (!useCurrentTime[field]) {
      // If switching to current time, set the current time
      const now = new Date();
      const timeString = now.toTimeString().slice(0, 5);
      setForm({ ...form, [field]: timeString });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.id || !form.checkIn || !form.checkOut) return;
    
    // If using current time, update the times before submitting
    const finalForm = { ...form };
    if (useCurrentTime.checkIn) {
      const now = new Date();
      finalForm.checkIn = now.toTimeString().slice(0, 5);
    }
    if (useCurrentTime.checkOut) {
      const now = new Date();
      finalForm.checkOut = now.toTimeString().slice(0, 5);
    }
    
    setRecords([...records, finalForm]);
    setForm({ name: '', id: '', checkIn: '', checkOut: '' });
  };

  return (
    <div className="full-page-container">
      <div className="attendance-entry-title">Attendance Entry</div>
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="attendance-form-row">
          <div style={{ flex: 1, minWidth: 160 }}>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Employee Name" required />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label>ID</label>
            <input name="id" value={form.id} onChange={handleChange} placeholder="Employee ID" required />
          </div>
        </div>
        
        <div className="attendance-form-row">
          <div style={{ flex: 1, minWidth: 200 }}>
            <label>Check In Time</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <button 
                type="button" 
                onClick={() => handleTimeToggle('checkIn')}
                style={{ 
                  padding: '4px 8px', 
                  fontSize: '0.8rem', 
                  background: useCurrentTime.checkIn ? '#1976d2' : '#f5f5f5',
                  color: useCurrentTime.checkIn ? '#fff' : '#666',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faClock} style={{ marginRight: 4 }} />
                Current Time
              </button>
              <button 
                type="button" 
                onClick={() => handleTimeToggle('checkIn')}
                style={{ 
                  padding: '4px 8px', 
                  fontSize: '0.8rem', 
                  background: !useCurrentTime.checkIn ? '#1976d2' : '#f5f5f5',
                  color: !useCurrentTime.checkIn ? '#fff' : '#666',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: 4 }} />
                Manual Time
              </button>
            </div>
            <input 
              name="checkIn" 
              value={form.checkIn} 
              onChange={handleChange} 
              placeholder="09:00" 
              required 
              type="time"
              disabled={useCurrentTime.checkIn}
              style={{ opacity: useCurrentTime.checkIn ? 0.6 : 1 }}
            />
          </div>
          
          <div style={{ flex: 1, minWidth: 200 }}>
            <label>Check Out Time</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <button 
                type="button" 
                onClick={() => handleTimeToggle('checkOut')}
                style={{ 
                  padding: '4px 8px', 
                  fontSize: '0.8rem', 
                  background: useCurrentTime.checkOut ? '#1976d2' : '#f5f5f5',
                  color: useCurrentTime.checkOut ? '#fff' : '#666',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faClock} style={{ marginRight: 4 }} />
                Current Time
              </button>
              <button 
                type="button" 
                onClick={() => handleTimeToggle('checkOut')}
                style={{ 
                  padding: '4px 8px', 
                  fontSize: '0.8rem', 
                  background: !useCurrentTime.checkOut ? '#1976d2' : '#f5f5f5',
                  color: !useCurrentTime.checkOut ? '#fff' : '#666',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: 4 }} />
                Manual Time
              </button>
            </div>
            <input 
              name="checkOut" 
              value={form.checkOut} 
              onChange={handleChange} 
              placeholder="17:00" 
              required 
              type="time"
              disabled={useCurrentTime.checkOut}
              style={{ opacity: useCurrentTime.checkOut ? 0.6 : 1 }}
            />
          </div>
        </div>
        
        <button type="submit">
          <FontAwesomeIcon icon={faUserCheck} style={{ marginRight: 6 }} /> Insert
        </button>
      </form>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Attendance Records</div>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <tr key={i}>
              <td>{rec.name}</td>
              <td>{rec.id}</td>
              <td>{rec.checkIn}</td>
              <td>{rec.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 