import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faClock, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const allEmployeeHistory = [
  { id: 'EMP001', name: 'John Doe', date: '2024-06-01', checkIn: '09:01', checkOut: '17:00', status: 'Present', department: 'IT' },
  { id: 'EMP002', name: 'Jane Smith', date: '2024-06-01', checkIn: '09:05', checkOut: '17:02', status: 'Present', department: 'HR' },
  { id: 'EMP003', name: 'Mike Johnson', date: '2024-06-01', checkIn: '09:00', checkOut: '16:55', status: 'Present', department: 'Sales' },
  { id: 'EMP004', name: 'Sarah Wilson', date: '2024-06-01', checkIn: '-', checkOut: '-', status: 'Absent', department: 'Marketing' },
  { id: 'EMP005', name: 'David Brown', date: '2024-06-01', checkIn: '09:30', checkOut: '17:00', status: 'Late', department: 'IT' },
  { id: 'EMP001', name: 'John Doe', date: '2024-05-31', checkIn: '08:55', checkOut: '17:05', status: 'Present', department: 'IT' },
  { id: 'EMP002', name: 'Jane Smith', date: '2024-05-31', checkIn: '09:10', checkOut: '17:00', status: 'Late', department: 'HR' },
  { id: 'EMP003', name: 'Mike Johnson', date: '2024-05-31', checkIn: '09:00', checkOut: '16:50', status: 'Present', department: 'Sales' },
  { id: 'EMP004', name: 'Sarah Wilson', date: '2024-05-31', checkIn: '08:45', checkOut: '17:00', status: 'Present', department: 'Marketing' },
  { id: 'EMP005', name: 'David Brown', date: '2024-05-31', checkIn: '-', checkOut: '-', status: 'Absent', department: 'IT' },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredHistory = allEmployeeHistory.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || record.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="full-page-container">
      <h2>Employee Attendance History</h2>
      
      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.6rem 1rem 0.6rem 2.5rem', 
              border: '1px solid #ddd', 
              borderRadius: 6, 
              fontSize: '1rem' 
            }}
          />
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ 
            padding: '0.6rem 1rem', 
            border: '1px solid #ddd', 
            borderRadius: 6, 
            fontSize: '1rem',
            background: '#fff'
          }}
        >
          <option value="all">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((row, i) => (
            <tr key={i}>
              <td style={{ fontWeight: 500 }}>{row.id}</td>
              <td style={{ fontWeight: 500 }}>{row.name}</td>
              <td>{row.department}</td>
              <td>{row.date}</td>
              <td>{row.checkIn}</td>
              <td>{row.checkOut}</td>
              <td>
                {row.status === 'Present' ? (
                  <span style={{ color: '#43a047', fontWeight: 600 }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 6 }} /> Present
                  </span>
                ) : row.status === 'Late' ? (
                  <span style={{ color: '#f57c00', fontWeight: 600 }}>
                    <FontAwesomeIcon icon={faClock} style={{ marginRight: 6 }} /> Late
                  </span>
                ) : (
                  <span style={{ color: '#e53935', fontWeight: 600 }}>
                    <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: 6 }} /> Absent
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredHistory.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          No records found matching your search criteria.
        </div>
      )}
    </div>
  );
} 