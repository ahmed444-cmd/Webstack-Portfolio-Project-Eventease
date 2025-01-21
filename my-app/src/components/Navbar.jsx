import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/images/logo-new.svg';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="EventEase Logo" className="nav-logo" />
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/events" className="nav-link">Events</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-controls">
          <ThemeToggle />
          <LanguageSwitcher />
          
          {currentUser ? (
            <>
              <Link 
                to={`/${currentUser.role}/dashboard`} 
                className="nav-link dashboard-link"
              >
                Dashboard
              </Link>
              <button onClick={logout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-button login">
                Login
              </Link>
              <Link to="/register" className="nav-button register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
