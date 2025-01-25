import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { MessageProvider } from './contexts/MessageContext';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import Sponsors from './components/Sponsors';
import Speakers from './components/Speakers';
import logo from './assets/images/logo-new.svg';
import homeBackground from './assets/images/backgrounds/home.jpg';
import scheduleBackground from './assets/images/backgrounds/schedule.jpg';
import speakersBackground from './assets/images/backgrounds/speakers.jpg';
import sponsorsBackground from './assets/images/backgrounds/sponsors.jpg';
import faqBackground from './assets/images/backgrounds/faq.jpg';
import contactBackground from './assets/images/backgrounds/contact.jpg';
import './styles/dashboard.css';
import './styles.css';
import './styles/contact.css';
import './translations';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import ContactForm from './components/ContactForm';

const { BrowserRouter, Routes, Route, Link } = ReactRouterDOM;

const getBackgroundStyle = (image) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat'
});

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Optimized scroll handling
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Optimized intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-transition', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    // Only observe sections that are not yet visible
    document.querySelectorAll('section').forEach(section => {
      if (!section.classList.contains('visible')) {
        section.classList.add('section-transition');
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <AuthProvider>
      <EventProvider>
        <MessageProvider>
          <BrowserRouter>
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
                            <button className="menu-toggle" onClick={toggleMenu}>
                              <span className="menu-icon"></span>
                            </button>
                            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                              <li className="nav-item">
                                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} data-i18n="nav_home">Home</a>
                              </li>
                              <li className="nav-item">
                                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} data-i18n="nav_about">About</a>
                              </li>
                              <li className="nav-item">
                                <a href="#schedule" onClick={(e) => handleNavClick(e, 'schedule')} data-i18n="nav_schedule">Schedule</a>
                              </li>
                              <li className="nav-item">
                                <a href="#speakers" onClick={(e) => handleNavClick(e, 'speakers')} data-i18n="nav_speakers">Speakers</a>
                              </li>
                              <li className="nav-item">
                                <a href="#sponsors" onClick={(e) => handleNavClick(e, 'sponsors')} data-i18n="nav_sponsors">Sponsors</a>
                              </li>
                              <li className="nav-item">
                                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} data-i18n="nav_faq">FAQ</a>
                              </li>
                              <li className="nav-item">
                                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} data-i18n="nav_contact">Contact</a>
                              </li>
                            </ul>
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

                        <section id="home" className="hero" style={getBackgroundStyle(homeBackground)}>
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

                        <section id="about" className="about" style={getBackgroundStyle(homeBackground)}>
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
                        <section id="schedule" className="schedule" style={getBackgroundStyle(scheduleBackground)}>
                          <Schedule />
                        </section>

                        <section id="speakers" className="speakers" style={getBackgroundStyle(speakersBackground)}>
                          <h2 data-i18n="speakers_title">Our Speakers</h2>
                          <p data-i18n="speakers_description">Learn from industry experts and thought leaders</p>
                          <Speakers />
                        </section>

                        <section id="sponsors" className="sponsors" style={getBackgroundStyle(sponsorsBackground)}>
                          <h2 data-i18n="sponsors_title">Our Sponsors</h2>
                          <p data-i18n="sponsors_description">Join these industry leaders in supporting innovation</p>
                          <Sponsors />
                        </section>

                        <section id="faq" className="faq" style={getBackgroundStyle(faqBackground)}>
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

                        <section id="contact" className="contact-section" style={getBackgroundStyle(contactBackground)}>
                          <h2>Contact Us</h2>
                          <p className="contact-description">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                          <ContactForm />
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
                                <a href="#home" onClick={(e) => handleNavClick(e, 'home')} data-i18n="nav_home">Home</a>
                                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} data-i18n="nav_about">About</a>
                                <a href="#schedule" onClick={(e) => handleNavClick(e, 'schedule')} data-i18n="nav_schedule">Schedule</a>
                                <a href="#speakers" onClick={(e) => handleNavClick(e, 'speakers')} data-i18n="nav_speakers">Speakers</a>
                                <a href="#sponsors" onClick={(e) => handleNavClick(e, 'sponsors')} data-i18n="nav_sponsors">Sponsors</a>
                                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} data-i18n="nav_faq">FAQ</a>
                                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} data-i18n="nav_contact">Contact</a>
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
                      </>
                    }
                  />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </MessageProvider>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
