import React, { useState, useEffect } from 'react';
import EventCalendar from './EventCalendar';
import EventModal from './EventModal';
import * as mockApi from '../services/mockApi';

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await mockApi.getCalendarEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleRegister = async (eventId) => {
    try {
      const result = await mockApi.registerForEvent(eventId);
      if (result.success) {
        // Update the events list with the new registration count
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === eventId
              ? { ...event, registered: event.registered + 1 }
              : event
          )
        );
      }
    } catch (error) {
      console.error('Failed to register for event:', error);
    }
  };

  if (loading) {
    return (
      <div className="schedule-loading">
        <div className="loading-spinner"></div>
        <p>Loading schedule...</p>
      </div>
    );
  }

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
            events={events}
            onEventClick={handleEventClick}
          />
        </div>

        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onRegister={handleRegister}
        />
      </div>
    </section>
  );
};

export default Schedule;
