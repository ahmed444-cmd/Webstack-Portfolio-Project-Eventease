// Mock user data
const users = {
  "user123": {
    id: "user123",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "attendee",
    avatar: "https://i.pravatar.cc/150?u=user123",
    registrationDate: "2024-12-15",
    ticketType: "VIP Pass",
    preferences: {
      notifications: true,
      newsletter: true,
      language: "en"
    }
  }
};

// Mock event data
const events = [
  {
    id: "evt001",
    title: "Keynote: Future of AI",
    speaker: "Dr. Sarah Johnson",
    date: "2025-02-15T09:00:00",
    location: "Main Hall",
    duration: "1 hour",
    type: "keynote",
    capacity: 500,
    registered: 423,
    status: "upcoming"
  },
  {
    id: "evt002",
    title: "Web Development Workshop",
    speaker: "Mike Chen",
    date: "2025-02-15T11:00:00",
    location: "Workshop Room A",
    duration: "2 hours",
    type: "workshop",
    capacity: 50,
    registered: 45,
    status: "upcoming"
  },
  {
    id: "evt003",
    title: "Networking Lunch",
    date: "2025-02-15T13:00:00",
    location: "Dining Hall",
    duration: "1.5 hours",
    type: "networking",
    capacity: 300,
    registered: 275,
    status: "upcoming"
  }
];

// Mock notifications
const notifications = [
  {
    id: "notif001",
    type: "reminder",
    title: "Event Starting Soon",
    message: "Keynote: Future of AI starts in 30 minutes",
    date: "2025-02-15T08:30:00",
    read: false
  },
  {
    id: "notif002",
    type: "update",
    title: "Schedule Update",
    message: "Web Development Workshop room changed to Workshop Room A",
    date: "2025-02-14T15:00:00",
    read: true
  },
  {
    id: "notif003",
    type: "announcement",
    title: "New Speaker Added",
    message: "We're excited to announce a surprise guest speaker!",
    date: "2025-02-13T10:00:00",
    read: true
  }
];

// Mock schedule
const schedule = {
  "2025-02-15": [
    {
      id: "evt001",
      title: "Keynote: Future of AI",
      startTime: "09:00",
      endTime: "10:00",
      location: "Main Hall",
      type: "keynote"
    },
    {
      id: "evt002",
      title: "Web Development Workshop",
      startTime: "11:00",
      endTime: "13:00",
      location: "Workshop Room A",
      type: "workshop"
    },
    {
      id: "evt003",
      title: "Networking Lunch",
      startTime: "13:00",
      endTime: "14:30",
      location: "Dining Hall",
      type: "networking"
    }
  ]
};

// Mock statistics
const statistics = {
  registeredAttendees: 1500,
  totalEvents: 25,
  workshopsBooked: 850,
  averageRating: 4.8
};

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const getCurrentUser = async () => {
  await delay(500);
  return users["user123"];
};

export const updateUserPreferences = async (preferences) => {
  await delay(300);
  users["user123"].preferences = { ...users["user123"].preferences, ...preferences };
  return users["user123"].preferences;
};

export const updateUserProfile = async (profile) => {
  await delay(300);
  users["user123"] = { ...users["user123"], ...profile };
  return users["user123"];
};

export const getEvents = async (filter = {}) => {
  await delay(400);
  let filteredEvents = [...events];
  if (filter.type) {
    filteredEvents = filteredEvents.filter(event => event.type === filter.type);
  }
  if (filter.status) {
    filteredEvents = filteredEvents.filter(event => event.status === filter.status);
  }
  return filteredEvents;
};

export const registerForEvent = async (eventId) => {
  await delay(300);
  const event = events.find(e => e.id === eventId);
  if (event && event.registered < event.capacity) {
    event.registered += 1;
    return { success: true, message: "Successfully registered for event" };
  }
  return { success: false, message: "Event is full" };
};

export const getSchedule = async (date) => {
  await delay(400);
  return schedule[date] || [];
};

export const getNotifications = async () => {
  await delay(300);
  return notifications;
};

export const markNotificationAsRead = async (notificationId) => {
  await delay(200);
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return { success: true };
  }
  return { success: false, message: "Notification not found" };
};

export const getStatistics = async () => {
  await delay(300);
  return statistics;
};

export const searchEvents = async (query) => {
  await delay(400);
  return events.filter(event => 
    event.title.toLowerCase().includes(query.toLowerCase()) ||
    event.speaker?.toLowerCase().includes(query.toLowerCase())
  );
};

export const getCalendarEvents = async () => {
  await delay(800);
  return [
    {
      id: 1,
      title: 'Keynote: Future of Tech',
      type: 'keynote',
      speaker: 'Jane Smith',
      date: '2025-01-10T09:00:00',
      location: 'Main Hall',
      duration: '2 hours',
      capacity: 500,
      registered: 423,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      type: 'workshop',
      speaker: 'Mike Johnson',
      date: '2025-01-10T14:00:00',
      location: 'Workshop Room A',
      duration: '3 hours',
      capacity: 50,
      registered: 45,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Networking Lunch',
      type: 'networking',
      speaker: null,
      date: '2025-01-10T12:00:00',
      location: 'Dining Hall',
      duration: '1.5 hours',
      capacity: 200,
      registered: 180,
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'AI in Practice',
      type: 'workshop',
      speaker: 'Sarah Lee',
      date: '2025-01-11T10:00:00',
      location: 'Workshop Room B',
      duration: '4 hours',
      capacity: 40,
      registered: 38,
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Closing Ceremony',
      type: 'keynote',
      speaker: 'Conference Team',
      date: '2025-01-12T17:00:00',
      location: 'Main Hall',
      duration: '1.5 hours',
      capacity: 500,
      registered: 350,
      status: 'upcoming'
    }
  ];
};

export const getCalendarSchedule = async (date) => {
  await delay(600);
  // Filter events for the specified date
  const dayStart = new Date(date);
  const dayEnd = new Date(date);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const dayEvents = [
    {
      id: 1,
      title: 'Keynote: Future of Tech',
      type: 'keynote',
      speaker: 'Jane Smith',
      date: '2025-01-10T09:00:00',
      location: 'Main Hall',
      duration: '2 hours',
      capacity: 500,
      registered: 423,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      type: 'workshop',
      speaker: 'Mike Johnson',
      date: '2025-01-10T14:00:00',
      location: 'Workshop Room A',
      duration: '3 hours',
      capacity: 50,
      registered: 45,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Networking Lunch',
      type: 'networking',
      speaker: null,
      date: '2025-01-10T12:00:00',
      location: 'Dining Hall',
      duration: '1.5 hours',
      capacity: 200,
      registered: 180,
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'AI in Practice',
      type: 'workshop',
      speaker: 'Sarah Lee',
      date: '2025-01-11T10:00:00',
      location: 'Workshop Room B',
      duration: '4 hours',
      capacity: 40,
      registered: 38,
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Closing Ceremony',
      type: 'keynote',
      speaker: 'Conference Team',
      date: '2025-01-12T17:00:00',
      location: 'Main Hall',
      duration: '1.5 hours',
      capacity: 500,
      registered: 350,
      status: 'upcoming'
    }
  ].filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= dayStart && eventDate < dayEnd;
  });

  return {
    date,
    events: dayEvents.sort((a, b) => new Date(a.date) - new Date(b.date))
  };
};
