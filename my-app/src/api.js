// Mock API Data

export const events = [
  {
    id: 1,
    title: "Web Development Workshop",
    description: "Learn modern web development techniques and best practices",
    date: "2025-01-15",
    time: "10:00 AM - 2:00 PM",
    location: "Virtual",
    category: "Workshop"
  },
  {
    id: 2,
    title: "AI in Business Conference",
    description: "Exploring the impact of AI on modern business landscapes",
    date: "2025-01-20",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Hub Center",
    category: "Conference"
  }
];

export const speakers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Software Architect",
    company: "Tech Innovations Inc.",
    bio: "15+ years experience in software architecture and cloud computing",
    image: "https://placeholder.com/150",
    topics: ["Cloud Architecture", "System Design"]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "AI Research Lead",
    company: "Future AI Labs",
    bio: "Pioneer in machine learning and artificial intelligence",
    image: "https://placeholder.com/150",
    topics: ["Artificial Intelligence", "Machine Learning"]
  }
];

export const schedule = [
  {
    day: "Day 1",
    date: "2025-01-15",
    sessions: [
      {
        time: "10:00 AM",
        title: "Opening Keynote",
        speaker: "Dr. Sarah Johnson",
        location: "Main Hall"
      },
      {
        time: "2:00 PM",
        title: "AI Workshop",
        speaker: "Michael Chen",
        location: "Workshop Room A"
      }
    ]
  }
];

export const faq = [
  {
    id: 1,
    question: "What are the event timings?",
    answer: "Events typically run from 9:00 AM to 5:00 PM, with breaks for networking and lunch."
  },
  {
    id: 2,
    question: "Is virtual attendance available?",
    answer: "Yes, all our events offer hybrid attendance options with virtual streaming available."
  }
];

// API Endpoints (for documentation purposes)
const endpoints = {
  events: '/api/events',     // GET: List all events
  speakers: '/api/speakers', // GET: List all speakers
  schedule: '/api/schedule', // GET: Get event schedule
  faq: '/api/faq'           // GET: Get FAQ list
};
