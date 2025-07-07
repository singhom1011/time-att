import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarTimes, faPercent, faUsers, faUserCheck, faUserTimes, faBuilding } from '@fortawesome/free-solid-svg-icons';

const companyName = 'Tech Solutions Inc.';
const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// Mock company data
const companyStats = {
  totalEmployees: 45,
  presentToday: 42,
  absentToday: 3,
  attendancePercent: 93,
  lateToday: 2,
  onLeave: 1
};

const recentActivities = [
  { employee: 'John Doe', action: 'Checked In', time: '09:15', status: 'Late' },
  { employee: 'Jane Smith', action: 'Checked Out', time: '17:30', status: 'On Time' },
  { employee: 'Mike Johnson', action: 'Checked In', time: '08:45', status: 'On Time' },
  { employee: 'Sarah Wilson', action: 'Checked Out', time: '17:00', status: 'On Time' },
  { employee: 'David Brown', action: 'Checked In', time: '09:30', status: 'Late' },
];

export default function Dashboard() {
  return (
    <div className="full-page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <FontAwesomeIcon icon={faBuilding} style={{ color: '#1976d2', fontSize: 32 }} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>{companyName}</div>
          <div style={{ color: '#888', fontSize: 15 }}>Employee Attendance Dashboard - {today}</div>
        </div>
      </div>

      {/* Company Overview Cards */}
      <div className="dashboard-cards" style={{ marginTop: 32, marginBottom: 32 }}>
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faUsers} size="2x" style={{ color: '#1976d2', marginBottom: 8 }} />
          <div className="value">{companyStats.totalEmployees}</div>
          <div>Total Employees</div>
        </div>
        <div className="dashboard-card">
          <FontAwesomeIcon icon={faUserCheck} size="2x" style={{ color: '#43a047', marginBottom: 8 }} />
          <div className="value">{companyStats.presentToday}</div>
          <div>Present Today</div>
        </div>
        <div className="dashboard-card absent">
          <FontAwesomeIcon icon={faUserTimes} size="2x" style={{ color: '#e53935', marginBottom: 8 }} />
          <div className="value">{companyStats.absentToday}</div>
          <div>Absent Today</div>
        </div>
        <div className="dashboard-card percent">
          <FontAwesomeIcon icon={faPercent} size="2x" style={{ color: '#43a047', marginBottom: 8 }} />
          <div className="value">{companyStats.attendancePercent}%</div>
          <div>Attendance Rate</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ background: '#fff3e0', padding: '1rem 1.5rem', borderRadius: 8, border: '1px solid #ffcc02' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#f57c00' }}>{companyStats.lateToday}</div>
          <div style={{ color: '#666' }}>Late Today</div>
        </div>
        <div style={{ background: '#e8f5e9', padding: '1rem 1.5rem', borderRadius: 8, border: '1px solid #4caf50' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#2e7d32' }}>{companyStats.onLeave}</div>
          <div style={{ color: '#666' }}>On Leave</div>
        </div>
      </div>

      {/* Recent Employee Activities */}
      <div style={{ fontWeight: 600, marginBottom: 12, fontSize: 18 }}>Recent Employee Activities</div>
      <div style={{ background: '#fafbfc', borderRadius: 10, padding: '1rem', border: '1px solid #e3e8ee' }}>
        {recentActivities.map((activity, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '0.8rem 0',
            borderBottom: i < recentActivities.length - 1 ? '1px solid #eee' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FontAwesomeIcon 
                icon={activity.action.includes('In') ? faUserCheck : faUserTimes} 
                style={{ color: activity.action.includes('In') ? '#43a047' : '#e53935' }} 
              />
              <div>
                <div style={{ fontWeight: 500 }}>{activity.employee}</div>
                <div style={{ fontSize: 14, color: '#666' }}>{activity.action}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 500 }}>{activity.time}</div>
              <div style={{ 
                fontSize: 12, 
                color: activity.status === 'On Time' ? '#43a047' : '#f57c00',
                fontWeight: 500
              }}>
                {activity.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 