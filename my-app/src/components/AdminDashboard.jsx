import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import { useMessages } from '../contexts/MessageContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { events, pendingEvents, approveEvent, rejectEvent, deleteEvent } = useEvents();
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [activeTab, setActiveTab] = useState('pendingEvents');

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleApproveEvent = (eventId) => {
    if (window.confirm('Are you sure you want to approve this event?')) {
      approveEvent(eventId);
    }
  };

  const handleRejectEvent = (eventId) => {
    if (window.confirm('Are you sure you want to reject this event?')) {
      rejectEvent(eventId);
    }
  };

  const handleDeleteEvent = (eventId, isPending) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId, isPending);
    }
  };

  const handleMarkAsRead = (messageId) => {
    markAsRead(messageId);
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(messageId);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <span className="user-email">{user.email}</span>
        </div>
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'pendingEvents' ? 'active' : ''}`}
            onClick={() => setActiveTab('pendingEvents')}
          >
            Pending Events
          </button>
          <button
            className={`tab-button ${activeTab === 'approvedEvents' ? 'active' : ''}`}
            onClick={() => setActiveTab('approvedEvents')}
          >
            Approved Events
          </button>
          <button
            className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="message-badge">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'pendingEvents' && (
          <div className="events-list">
            <h3>Pending Events</h3>
            {pendingEvents.length > 0 ? (
              pendingEvents.map(event => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Submitted by: {event.userId}</p>
                  <p>Status: {event.status}</p>
                  <div className="event-actions">
                    <button 
                      className="btn-success"
                      onClick={() => handleApproveEvent(event.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleRejectEvent(event.id)}
                    >
                      Reject
                    </button>
                    <button 
                      className="btn-secondary"
                      onClick={() => handleDeleteEvent(event.id, true)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending events to review</p>
            )}
          </div>
        )}

        {activeTab === 'approvedEvents' && (
          <div className="events-list">
            <h3>Approved Events</h3>
            {events.length > 0 ? (
              events.map(event => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>Submitted by: {event.userId}</p>
                  <p>Status: {event.status}</p>
                  <div className="event-actions">
                    <button 
                      className="btn-danger"
                      onClick={() => handleDeleteEvent(event.id, false)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No approved events</p>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-list">
            <h3>Contact Messages</h3>
            {messages.length === 0 ? (
              <p className="no-messages">No messages yet</p>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message-card ${message.status === 'unread' ? 'unread' : ''}`}
                >
                  <div className="message-header">
                    <h4>{message.subject}</h4>
                    <div className="message-actions">
                      {message.status === 'unread' && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="mark-read-button"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="message-info">
                    <p><strong>From:</strong> {message.name} ({message.email})</p>
                    <p><strong>Sent:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="message-body">
                    <p>{message.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
