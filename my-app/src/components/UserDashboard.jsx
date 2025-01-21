import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import EventCalendar from './EventCalendar';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('myEvents');
  
  const [userEvents, setUserEvents] = useState([
    { id: 1, title: 'Tech Conference 2024', date: '2024-06-15', status: 'registered' },
    { id: 2, title: 'AI Workshop', date: '2024-07-01', status: 'interested' }
  ]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleEventStatusChange = (eventId, newStatus) => {
    setUserEvents(events =>
      events.map(event =>
        event.id === eventId ? { ...event, status: newStatus } : event
      )
    );
  };

  const handleDateSelect = (eventId, newDate) => {
    setUserEvents(events =>
      events.map(event =>
        event.id === eventId 
          ? { ...event, date: newDate.toISOString().split('T')[0] }
          : event
      )
    );
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-header">
          <h2>User Dashboard</h2>
          <span className="user-email">{user.email}</span>
        </div>
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'myEvents' ? 'active' : ''}`}
            onClick={() => setActiveTab('myEvents')}
          >
            My Events
          </button>
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'myEvents' && (
          <div className="my-events">
            <h3>My Events</h3>
            <div className="events-list">
              {userEvents.map(event => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <div className="calendar-wrapper">
                    <EventCalendar
                      events={[event]}
                      onEventClick={() => {}}
                      onDateSelect={(date) => handleDateSelect(event.id, date)}
                      selectable={true}
                      initialDate={event.date}
                      isSmall={true}
                    />
                  </div>
                  <p>Status: {event.status}</p>
                  <div className="event-actions">
                    <select
                      value={event.status}
                      onChange={(e) => handleEventStatusChange(event.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="interested">Interested</option>
                      <option value="registered">Registered</option>
                      <option value="attended">Attended</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h3>Profile</h3>
            <div className="profile-info">
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
