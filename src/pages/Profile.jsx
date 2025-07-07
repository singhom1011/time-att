import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCog, faUsers, faShieldAlt, faBell } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('company');
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Tech Solutions Inc.',
    address: '123 Business Street, Tech City, TC 12345',
    phone: '+1 (555) 123-4567',
    email: 'admin@techsolutions.com',
    website: 'www.techsolutions.com'
  });
  const [systemSettings, setSystemSettings] = useState({
    workStartTime: '09:00',
    workEndTime: '17:00',
    lateThreshold: '09:15',
    notifications: true,
    autoLogout: false
  });

  const handleCompanySave = () => {
    // Save company info
    alert('Company information updated successfully!');
  };

  const handleSettingsSave = () => {
    // Save system settings
    alert('System settings updated successfully!');
  };

  return (
    <div className="full-page-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <FontAwesomeIcon icon={faCog} style={{ color: '#1976d2', fontSize: 32 }} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 600 }}>Company Settings</div>
          <div style={{ color: '#888', fontSize: 15 }}>Manage company information and system settings</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #e3e8ee' }}>
        <button 
          onClick={() => setActiveTab('company')}
          style={{ 
            padding: '0.8rem 1.5rem', 
            background: activeTab === 'company' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'company' ? '#fff' : '#666',
            border: 'none',
            borderRadius: '6px 6px 0 0',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8 }} />
          Company Info
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{ 
            padding: '0.8rem 1.5rem', 
            background: activeTab === 'settings' ? '#1976d2' : '#f5f5f5',
            color: activeTab === 'settings' ? '#fff' : '#666',
            border: 'none',
            borderRadius: '6px 6px 0 0',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          <FontAwesomeIcon icon={faCog} style={{ marginRight: 8 }} />
          System Settings
        </button>
      </div>

      {/* Company Information Tab */}
      {activeTab === 'company' && (
        <div style={{ background: '#f6f8fa', borderRadius: 12, padding: '2rem', border: '1px solid #e3e8ee' }}>
          <h3 style={{ marginTop: 0, marginBottom: 24, color: '#1976d2' }}>Company Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Company Name</label>
              <input 
                value={companyInfo.name} 
                onChange={e => setCompanyInfo({...companyInfo, name: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
              <input 
                value={companyInfo.email} 
                onChange={e => setCompanyInfo({...companyInfo, email: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Phone</label>
              <input 
                value={companyInfo.phone} 
                onChange={e => setCompanyInfo({...companyInfo, phone: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Website</label>
              <input 
                value={companyInfo.website} 
                onChange={e => setCompanyInfo({...companyInfo, website: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Address</label>
              <textarea 
                value={companyInfo.address} 
                onChange={e => setCompanyInfo({...companyInfo, address: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }}
              />
            </div>
          </div>
          <button onClick={handleCompanySave} style={{ marginTop: 24 }}>
            Save Company Information
          </button>
        </div>
      )}

      {/* System Settings Tab */}
      {activeTab === 'settings' && (
        <div style={{ background: '#f6f8fa', borderRadius: 12, padding: '2rem', border: '1px solid #e3e8ee' }}>
          <h3 style={{ marginTop: 0, marginBottom: 24, color: '#1976d2' }}>System Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Work Start Time</label>
              <input 
                type="time"
                value={systemSettings.workStartTime} 
                onChange={e => setSystemSettings({...systemSettings, workStartTime: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Work End Time</label>
              <input 
                type="time"
                value={systemSettings.workEndTime} 
                onChange={e => setSystemSettings({...systemSettings, workEndTime: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Late Threshold</label>
              <input 
                type="time"
                value={systemSettings.lateThreshold} 
                onChange={e => setSystemSettings({...systemSettings, lateThreshold: e.target.value})}
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input 
                type="checkbox"
                checked={systemSettings.notifications} 
                onChange={e => setSystemSettings({...systemSettings, notifications: e.target.checked})}
                style={{ width: 18, height: 18 }}
              />
              <label style={{ fontWeight: 500 }}>Enable Notifications</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input 
                type="checkbox"
                checked={systemSettings.autoLogout} 
                onChange={e => setSystemSettings({...systemSettings, autoLogout: e.target.checked})}
                style={{ width: 18, height: 18 }}
              />
              <label style={{ fontWeight: 500 }}>Auto Logout</label>
            </div>
          </div>
          <button onClick={handleSettingsSave} style={{ marginTop: 24 }}>
            Save System Settings
          </button>
        </div>
      )}
    </div>
  );
} 