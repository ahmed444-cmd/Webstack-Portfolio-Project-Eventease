import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faMapMarkerAlt,
  faClock,
  faUser,
  faUsers,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { format as formatDate } from 'date-fns/format';

const EventModal = ({ event, onClose, onRegister }) => {
  if (!event) return null;

  const handleRegister = () => {
    onRegister(event.id);
    onClose();
  };

  const isEventFull = event.registered >= event.capacity;
  const remainingSpots = event.capacity - event.registered;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className={`event-type-badge ${event.type}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </div>

        <h2 className="event-title">{event.title}</h2>

        <div className="event-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>{formatDate(new Date(event.date), 'MMMM d, yyyy')}</span>
          </div>

          <div className="detail-item">
            <FontAwesomeIcon icon={faClock} />
            <span>{formatDate(new Date(event.date), 'h:mm a')} ({event.duration})</span>
          </div>

          <div className="detail-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>{event.location}</span>
          </div>

          {event.speaker && (
            <div className="detail-item">
              <FontAwesomeIcon icon={faUser} />
              <span>{event.speaker}</span>
            </div>
          )}

          <div className="detail-item">
            <FontAwesomeIcon icon={faUsers} />
            <span>
              {event.registered} / {event.capacity} registered
              {!isEventFull && ` (${remainingSpots} spots remaining)`}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className={`register-button ${isEventFull ? 'disabled' : ''}`}
            onClick={handleRegister}
            disabled={isEventFull}
          >
            {isEventFull ? 'Event Full' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
