import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const [pendingEvents, setPendingEvents] = useState(() => {
    const storedPendingEvents = localStorage.getItem('pendingEvents');
    return storedPendingEvents ? JSON.parse(storedPendingEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('pendingEvents', JSON.stringify(pendingEvents));
  }, [pendingEvents]);

  const createEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setPendingEvents([...pendingEvents, newEvent]);
  };

  const updateEvent = (eventId, updatedData, isPending = true) => {
    if (isPending) {
      setPendingEvents(pendingEvents.map(event =>
        event.id === eventId ? { ...event, ...updatedData } : event
      ));
    } else {
      setEvents(events.map(event =>
        event.id === eventId ? { ...event, ...updatedData } : event
      ));
    }
  };

  const deleteEvent = (eventId, isPending = true) => {
    if (isPending) {
      setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
    } else {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const approveEvent = (eventId) => {
    const eventToApprove = pendingEvents.find(event => event.id === eventId);
    if (eventToApprove) {
      setEvents([...events, { ...eventToApprove, status: 'approved' }]);
      setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
    }
  };

  const rejectEvent = (eventId) => {
    setPendingEvents(pendingEvents.map(event =>
      event.id === eventId ? { ...event, status: 'rejected' } : event
    ));
  };

  return (
    <EventContext.Provider value={{
      events,
      pendingEvents,
      createEvent,
      updateEvent,
      deleteEvent,
      approveEvent,
      rejectEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
