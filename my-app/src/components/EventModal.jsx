import React from 'react';

const EventModal = ({ event, onClose, onRegister }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="event-modal">
        <h3>{event.title}</h3>
        <div className="event-modal-content">
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          {event.time && <p><strong>Time:</strong> {event.time}</p>}
          {event.location && <p><strong>Location:</strong> {event.location}</p>}
          {event.description && <p><strong>Description:</strong> {event.description}</p>}
        </div>
        <div className="event-modal-actions">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => onRegister(event.id)}>Register</button>
        </div>
      </div>
    </>
  );
};

export default EventModal;
