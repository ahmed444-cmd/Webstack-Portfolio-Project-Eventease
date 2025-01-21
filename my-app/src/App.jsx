import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import logo from './assets/images/logo-new.svg';
import './styles/dashboard.css';
import './styles.css';
import './styles/contact.css';
import './translations';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import EventCalendar from './components/EventCalendar'; // Import EventCalendar component

const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: '2024-06-15',
      status: 'registered'
    },
    {
      id: 2,
      title: 'AI Workshop',
      date: '2024-07-01',
      status: 'interested'
    }
  ]);

  const handleDateSelect = (eventId, newDate) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, date: newDate.toISOString().split('T')[0] }
          : event
      )
    );
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, status: newStatus }
          : event
      )
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Dashboard */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* User Dashboard */}
              <Route
                path="/user/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <nav className="navbar">
                      <div className="navbar-container">
                        <Link to="/" className="navbar-logo">
                          <img src={logo} alt="Logo" className="nav-logo" />
                        </Link>
                        <div className="nav-menu">
                          <a href="#home" data-i18n="nav_home">Home</a>
                          <a href="#about" data-i18n="nav_about">About</a>
                          <a href="#schedule" data-i18n="nav_schedule">Schedule</a>
                          <a href="#speakers" data-i18n="nav_speakers">Speakers</a>
                          <a href="#sponsors" data-i18n="nav_sponsors">Sponsors</a>
                          <a href="#faq" data-i18n="nav_faq">FAQ</a>
                          <a href="#contact" data-i18n="nav_contact">Contact</a>
                        </div>
                        <div className="nav-controls">
                          <LanguageSwitcher />
                          <ThemeToggle />
                          <Link to="/login" className="nav-button login">Login</Link>
                          <Link to="/register" className="nav-button register">Register</Link>
                        </div>
                        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                        </button>
                      </div>
                    </nav>

                    <section id="home" className="hero">
                      <div className="hero-content">
                        <img src={logo} alt="EventEase Logo" className="hero-logo" />
                        <h1 data-i18n="hero_title">EventEase Tech Conference 2024</h1>
                        <p className="tagline" data-i18n="hero_tagline">Shaping the Future of Technology</p>
                        <p className="hero-description" data-i18n="hero_description">
                          Join us for a transformative experience where innovation meets opportunity. 
                          Connect with industry leaders, explore cutting-edge technologies, and shape the future of tech.
                        </p>
                        <Link to="/register" className="cta-button" data-i18n="hero_cta">Register Now</Link>
                      </div>
                    </section>

                    <section id="about" className="about">
                      <h2 data-i18n="about_title">About The Conference</h2>
                      <div className="about-content">
                        <div className="about-text">
                          <p data-i18n="about_text">
                            Join us for three days of cutting-edge technology, inspiring speakers, and networking opportunities. 
                            EventEase brings together industry leaders, innovators, and tech enthusiasts to explore the latest 
                            trends in AI, Web Development, Cloud Computing, and more.
                          </p>
                        </div>
                        <div className="stats">
                          <div className="stat-item">
                            <h3>3</h3>
                            <p data-i18n="about_days">Days</p>
                          </div>
                          <div className="stat-item">
                            <h3>50+</h3>
                            <p data-i18n="about_speakers">Speakers</p>
                          </div>
                          <div className="stat-item">
                            <h3>1000+</h3>
                            <p data-i18n="about_attendees">Attendees</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Schedule Section */}
                    <Schedule />

                    <section id="speakers" className="speakers">
                      <h2 data-i18n="speakers_title">Featured Speakers</h2>
                      <div className="speakers-grid">
                        <div className="speaker-card">
                          <div className="speaker-image">
                            <img src="https://via.placeholder.com/200" alt="John Doe" />
                          </div>
                          <h3>John Doe</h3>
                          <p className="speaker-role" data-i18n="speaker_role_ceo">CEO & Founder</p>
                          <p className="speaker-bio">Leading expert in artificial intelligence and machine learning with over 15 years of experience.</p>
                          <div className="speaker-social">
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                          </div>
                        </div>
                        <div className="speaker-card">
                          <div className="speaker-image">
                            <img src="https://via.placeholder.com/200" alt="Jane Smith" />
                          </div>
                          <h3>Jane Smith</h3>
                          <p className="speaker-role" data-i18n="speaker_role_cto">CTO</p>
                          <p className="speaker-bio">Pioneer in cloud computing and distributed systems architecture.</p>
                          <div className="speaker-social">
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="sponsors" className="sponsors">
                      <h2 data-i18n="sponsors_title">Our Sponsors</h2>
                      <p data-i18n="sponsors_description">Join these industry leaders in supporting innovation</p>
                      <div className="sponsor-tiers">
                        <div className="sponsor-tier">
                          <h3 data-i18n="sponsors_platinum">Platinum Sponsors</h3>
                          <div className="sponsor-grid">
                            {/* Sponsor logos */}
                          </div>
                        </div>
                        <div className="sponsor-tier">
                          <h3 data-i18n="sponsors_gold">Gold Sponsors</h3>
                          <div className="sponsor-grid">
                            {/* Sponsor logos */}
                          </div>
                        </div>
                        <div className="sponsor-tier">
                          <h3 data-i18n="sponsors_silver">Silver Sponsors</h3>
                          <div className="sponsor-grid">
                            {/* Sponsor logos */}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section id="faq" className="faq">
                      <h2 data-i18n="faq_title">Frequently Asked Questions</h2>
                      <div className="faq-grid">
                        <div className="faq-item">
                          <h3 data-i18n="faq_q1">When and where is the conference?</h3>
                          <p data-i18n="faq_a1">The conference will be held from September 15-17, 2024, in Silicon Valley, California.</p>
                        </div>
                        <div className="faq-item">
                          <h3 data-i18n="faq_q2">What's included in the ticket?</h3>
                          <p data-i18n="faq_a2">Your ticket includes access to all keynotes, workshops, networking events, and meals during the conference.</p>
                        </div>
                        <div className="faq-item">
                          <h3 data-i18n="faq_q3">Are there virtual attendance options?</h3>
                          <p data-i18n="faq_a3">Yes, we offer virtual tickets that give you access to live streams of all main stage talks and interactive Q&A sessions.</p>
                        </div>
                        <div className="faq-item">
                          <h3 data-i18n="faq_q4">What's the refund policy?</h3>
                          <p data-i18n="faq_a4">Full refunds are available up to 30 days before the event. After that, tickets can be transferred to another attendee.</p>
                        </div>
                      </div>
                    </section>

                    <section id="contact" className="contact-section">
                        <h2>Contact Us</h2>
                        <div className="contact-cards">
                            <div className="contact-card">
                                <i className="fas fa-envelope"></i>
                                <h3>Email Us</h3>
                                <p>Drop us a line anytime</p>
                                <p><a href="mailto:contact@example.com">contact@example.com</a></p>
                                <p><a href="mailto:support@example.com">support@example.com</a></p>
                            </div>
                            
                            <div className="contact-card">
                                <i className="fas fa-phone-alt"></i>
                                <h3>Call Us</h3>
                                <p>Mon-Fri from 8am to 5pm</p>
                                <p><a href="tel:+1234567890">+1 (234) 567-890</a></p>
                                <p><a href="tel:+1987654321">+1 (987) 654-321</a></p>
                            </div>
                            
                            <div className="contact-card">
                                <i className="fas fa-map-marker-alt"></i>
                                <h3>Visit Us</h3>
                                <p>Come say hello at our office</p>
                                <p>123 Event Street</p>
                                <p>City, Country 12345</p>
                            </div>
                        </div>

                        <div className="contact-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        placeholder="Your Email" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        placeholder="Your Message" 
                                        rows="4" 
                                        required 
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-button">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>

                    <footer className="footer">
                        <div className="footer-content">
                            <div className="footer-section brand">
                                <img src={logo} alt="EventEase Logo" className="footer-logo" />
                                <p className="footer-description" data-i18n="footer_description">
                                    Join us for the most innovative tech conference of 2024. Connect, learn, and shape the future.
                                </p>
                                <div className="social-links">
                                    <a href="#" className="social-link" aria-label="Twitter">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" className="social-link" aria-label="LinkedIn">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" className="social-link" aria-label="Instagram">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" className="social-link" aria-label="GitHub">
                                        <i className="fab fa-github"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="footer-section links">
                                <h3 data-i18n="footer_quick_links">Quick Links</h3>
                                <div className="footer-links">
                                    <a href="#home" data-i18n="nav_home">Home</a>
                                    <a href="#about" data-i18n="nav_about">About</a>
                                    <a href="#schedule" data-i18n="nav_schedule">Schedule</a>
                                    <a href="#speakers" data-i18n="nav_speakers">Speakers</a>
                                    <a href="#sponsors" data-i18n="nav_sponsors">Sponsors</a>
                                    <a href="#faq" data-i18n="nav_faq">FAQ</a>
                                    <a href="#contact" data-i18n="nav_contact">Contact</a>
                                </div>
                            </div>

                            <div className="footer-section contact">
                                <h3 data-i18n="footer_contact_us">Contact Us</h3>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <span>contact@eventease.com</span>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-phone"></i>
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>123 Tech Street, Silicon Valley, CA</span>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-section newsletter">
                                <h3 data-i18n="footer_newsletter">Newsletter</h3>
                                <p data-i18n="footer_newsletter_desc">Stay updated with the latest news and announcements</p>
                                <form className="newsletter-form">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        data-i18n="footer_newsletter_placeholder"
                                        required 
                                    />
                                    <button type="submit" data-i18n="footer_newsletter_button">Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="footer-bottom-content">
                                <p className="copyright" data-i18n="footer_copyright">
                                    2024 EventEase. All rights reserved.
                                </p>
                                <div className="footer-bottom-links">
                                    <a href="#" data-i18n="footer_privacy">Privacy Policy</a>
                                    <a href="#" data-i18n="footer_terms">Terms of Service</a>
                                    <a href="#" data-i18n="footer_cookies">Cookie Policy</a>
                                </div>
                            </div>
                        </div>
                    </footer>

                    <div className="dashboard-content">
                      <div className="my-events">
                        <h3>My Events</h3>
                        <div className="events-list">
                          {events.map(event => (
                            <div key={event.id} className="event-card">
                              <h4>{event.title}</h4>
                              <div className="calendar-wrapper">
                                <EventCalendar
                                  events={[event]}
                                  onEventClick={() => {}}
                                  onDateSelect={(date) => handleDateSelect(event.id, date)}
                                  selectable={true}
                                  initialDate={event.date}
                                />
                              </div>
                              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                              <p>Status: {event.status}</p>
                              <div className="event-actions">
                                <select 
                                  className="status-select"
                                  value={event.status}
                                  onChange={(e) => handleStatusChange(event.id, e.target.value)}
                                >
                                  <option value="interested">Interested</option>
                                  <option value="registered">Registered</option>
                                  <option value="attended">Attended</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
