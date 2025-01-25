import React, { useState } from 'react';
import EventCalendar from './EventCalendar';
import EventModal from './EventModal';
import { useEvents } from '../contexts/EventContext';

const Schedule = () => {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Filter only approved events
  const approvedEvents = events.filter(event => event.status === 'approved').map(event => ({
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    description: event.description,
    location: event.location,
    registered: 0, // Initialize with 0 registrations
  }));

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleRegister = async (eventId) => {
    // Update the events list with the new registration
    const updatedEvents = approvedEvents.map(event =>
      event.id === eventId
        ? { ...event, registered: (event.registered || 0) + 1 }
        : event
    );
    // You might want to store registrations in a separate context or localStorage
  };

  return (
    <section id="schedule" className="schedule">
      <div className="section-container">
        <h2 className="section-title" data-i18n="schedule_title">Event Schedule</h2>
        <p className="section-description" data-i18n="schedule_description">
          Plan your conference experience with our comprehensive event schedule.
          Click on any event to see more details and register.
        </p>
        
        <div className="schedule-filters">
          <div className="filter-group">
            <span className="filter-label">Event Types:</span>
            <div className="filter-tags">
              <div className="filter-tag keynote">
                <span className="tag-dot"></span>
                <span className="tag-text">Keynotes</span>
              </div>
              <div className="filter-tag workshop">
                <span className="tag-dot"></span>
                <span className="tag-text">Workshops</span>
              </div>
              <div className="filter-tag networking">
                <span className="tag-dot"></span>
                <span className="tag-text">Networking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="calendar-wrapper">
          <EventCalendar
            events={approvedEvents}
            onEventClick={handleEventClick}
            selectable={false}
          />
        </div>

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
            onRegister={() => handleRegister(selectedEvent.id)}
          />
        )}
      </div>
    </section>
  );
};

export default Schedule;
