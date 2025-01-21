import { useState, useEffect } from 'react';
import * as mockApi from '../services/mockApi';

export const useDashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState({
    user: true,
    events: true,
    notifications: true,
    schedule: true,
    statistics: true
  });
  const [error, setError] = useState({
    user: null,
    events: null,
    notifications: null,
    schedule: null,
    statistics: null
  });

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await mockApi.getCurrentUser();
        setUser(userData);
        setLoading(prev => ({ ...prev, user: false }));
      } catch (err) {
        setError(prev => ({ ...prev, user: err.message }));
        setLoading(prev => ({ ...prev, user: false }));
      }
    };
    fetchUser();
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await mockApi.getEvents();
        setEvents(eventsData);
        setLoading(prev => ({ ...prev, events: false }));
      } catch (err) {
        setError(prev => ({ ...prev, events: err.message }));
        setLoading(prev => ({ ...prev, events: false }));
      }
    };
    fetchEvents();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsData = await mockApi.getNotifications();
        setNotifications(notificationsData);
        setLoading(prev => ({ ...prev, notifications: false }));
      } catch (err) {
        setError(prev => ({ ...prev, notifications: err.message }));
        setLoading(prev => ({ ...prev, notifications: false }));
      }
    };
    fetchNotifications();
  }, []);

  // Fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const scheduleData = await mockApi.getSchedule(today);
        setSchedule(scheduleData);
        setLoading(prev => ({ ...prev, schedule: false }));
      } catch (err) {
        setError(prev => ({ ...prev, schedule: err.message }));
        setLoading(prev => ({ ...prev, schedule: false }));
      }
    };
    fetchSchedule();
  }, []);

  // Fetch statistics
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const statisticsData = await mockApi.getStatistics();
        setStatistics(statisticsData);
        setLoading(prev => ({ ...prev, statistics: false }));
      } catch (err) {
        setError(prev => ({ ...prev, statistics: err.message }));
        setLoading(prev => ({ ...prev, statistics: false }));
      }
    };
    fetchStatistics();
  }, []);

  // Action handlers
  const actions = {
    updateUserPreferences: async (preferences) => {
      try {
        const updatedUser = await mockApi.updateUserPreferences(preferences);
        setUser(updatedUser);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    updateUserProfile: async (profile) => {
      try {
        const updatedUser = await mockApi.updateUserProfile(profile);
        setUser(updatedUser);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    registerForEvent: async (eventId) => {
      try {
        const updatedEvent = await mockApi.registerForEvent(eventId);
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === eventId ? updatedEvent : event
          )
        );
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    searchEvents: async (query) => {
      try {
        const searchResults = await mockApi.searchEvents(query);
        return { success: true, data: searchResults };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    markNotificationAsRead: async (notificationId) => {
      try {
        const updatedNotification = await mockApi.markNotificationAsRead(notificationId);
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification.id === notificationId ? updatedNotification : notification
          )
        );
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    },

    getScheduleForDate: async (date) => {
      try {
        const scheduleData = await mockApi.getSchedule(date);
        setSchedule(scheduleData);
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  };

  return {
    user,
    events,
    notifications,
    schedule,
    statistics,
    loading,
    error,
    actions
  };
};
