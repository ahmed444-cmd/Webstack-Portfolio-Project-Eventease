import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import EventForm from './EventForm';
import EventCalendar from './EventCalendar';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { events, pendingEvents, deleteEvent } = useEvents();
  const [activeTab, setActiveTab] = useState('myEvents');
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const userEvents = events.filter(event => event.userId === user.email);
  const userPendingEvents = pendingEvents.filter(event => event.userId === user.email);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (eventId, isPending) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId, isPending);
    }
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
            className={`tab-button ${activeTab === 'pendingEvents' ? 'active' : ''}`}
            onClick={() => setActiveTab('pendingEvents')}
          >
            Pending Events
          </button>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      <main className="dashboard-content">
        <div className="content-header">
          <h3>{activeTab === 'myEvents' ? 'My Events' : 'Pending Events'}</h3>
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedEvent(null);
              setShowEventForm(true);
            }}
          >
            Create New Event
          </button>
        </div>

        {showEventForm && (
          <div className="modal">
            <EventForm
              event={selectedEvent}
              onClose={() => {
                setShowEventForm(false);
                setSelectedEvent(null);
              }}
            />
          </div>
        )}

        <div className="events-list">
          {activeTab === 'myEvents' ? (
            userEvents.length > 0 ? (
              userEvents.map(event => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Status: {event.status}</p>
                  <div className="event-actions">
                    <button onClick={() => handleEditEvent(event)}>Edit</button>
                    <button onClick={() => handleDeleteEvent(event.id, false)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No approved events yet</p>
            )
          ) : (
            userPendingEvents.length > 0 ? (
              userPendingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Status: {event.status}</p>
                  <div className="event-actions">
                    <button onClick={() => handleEditEvent(event)}>Edit</button>
                    <button onClick={() => handleDeleteEvent(event.id, true)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending events</p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
