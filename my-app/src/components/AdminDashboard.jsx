import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('content');
  
  const [content, setContent] = useState({
    events: [
      { id: 1, title: 'Tech Conference 2024', date: '2024-06-15' },
      { id: 2, title: 'AI Workshop', date: '2024-07-01' }
    ],
    users: [
      { id: 1, email: 'user@example.com', role: 'user' },
      { id: 2, email: 'admin@example.com', role: 'admin' }
    ]
  });

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
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
            className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            Content Management
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button
            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Event Management
          </button>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'content' && (
          <div className="content-management">
            <h3>Content Management</h3>
            <div className="content-tools">
              <button className="add-button">Add New Content</button>
              <input type="search" placeholder="Search content..." />
            </div>
            {/* Add your content management interface here */}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="user-management">
            <h3>User Management</h3>
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content.users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="edit-button">Edit</button>
                      <button className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="event-management">
            <h3>Event Management</h3>
            <div className="events-list">
              {content.events.map(event => (
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p>Date: {event.date}</p>
                  <div className="event-actions">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
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

export default AdminDashboard;
