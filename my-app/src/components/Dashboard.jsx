import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faBell,
  faSignOutAlt,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import { useDashboard } from '../hooks/useDashboard';
import EventCalendar from './EventCalendar';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const {
    notifications,
    statistics,
    events,
    markNotificationAsRead,
    registerForEvent
  } = useDashboard();

  const [activeTab, setActiveTab] = useState('overview');
  const [eventStatuses, setEventStatuses] = useState({});

  const handleStatusChange = (eventId, newStatus) => {
    setEventStatuses(prev => ({
      ...prev,
      [eventId]: newStatus
    }));
  };

  const renderEventCard = (event) => {
    const currentStatus = eventStatuses[event.id] || 'interested';
    
    return (
      <div key={event.id} className="event-card">
        <div className="event-header">
          <h4>{event.title}</h4>
          <span className={`event-type ${event.type}`}>{event.type}</span>
        </div>
        
        <div className="event-details">
          <p><strong>Speaker:</strong> {event.speaker}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Duration:</strong> {event.duration}</p>
          <p><strong>Capacity:</strong> {event.registered}/{event.capacity}</p>
        </div>

        <div className="event-calendar">
          <EventCalendar
            events={[event]}
            onEventClick={() => {}}
            isSmall={false}
          />
        </div>

        <div className="event-actions">
          <select
            className="status-select"
            value={currentStatus}
            onChange={(e) => handleStatusChange(event.id, e.target.value)}
          >
            <option value="interested">Interested</option>
            <option value="registered">Registered</option>
            <option value="attended">Attended</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="avatar">
            <img src={currentUser.avatar || 'default-avatar.png'} alt="User Avatar" />
          </div>
          <div className="user-details">
            <h2>{currentUser.name}</h2>
            <p>{currentUser.role}</p>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="action-button">
            <FontAwesomeIcon icon={faCog} />
            Settings
          </button>
          <button className="action-button" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-nav">
        <button
          className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FontAwesomeIcon icon={faUser} />
          Overview
        </button>
        <button
          className={`nav-button ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
          Schedule
        </button>
        <button
          className={`nav-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FontAwesomeIcon icon={faBell} />
          Notifications
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="notification-badge">
              {notifications.filter(n => !n.read).length}
            </span>
          )}
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="statistics-grid">
              <div className="stat-card">
                <h3>Registered Events</h3>
                <p>{statistics.registeredEvents || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <p>{statistics.upcomingEvents || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Sessions</h3>
                <p>{statistics.totalSessions || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Conference Days</h3>
                <p>{statistics.conferenceDays || 0}</p>
              </div>
            </div>
            <div className="events-grid">
              {events.map(renderEventCard)}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="schedule-section">
            <h3>Your Events</h3>
            <div className="events-grid">
              {events.map(renderEventCard)}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-section">
            <h3>Notifications</h3>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : ''}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                  </div>
                  <div className="notification-time">
                    {new Date(notification.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
