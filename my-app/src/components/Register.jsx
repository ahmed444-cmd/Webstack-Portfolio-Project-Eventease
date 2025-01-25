import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import logo from '../assets/images/logo-new.svg';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      if (email && password) {
        // Store user credentials in localStorage
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
          setError('User with this email already exists');
          return;
        }

        users.push({ email, password, role: 'user' });
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Log the user in after successful registration
        login({ email, role: 'user' });
        navigate('/user/dashboard');
      } else {
        setError('Please fill in all fields');
      }
    } catch (error) {
      setError('Failed to register');
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Registering with ${provider}`);
  };

  return (
    <div className="login-container">
      <div className="auth-wrapper">
        <div className="auth-image">
          <div className="auth-image-content">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="auth-logo" />
            </Link>
            <h2>Join Our Community</h2>
            <p>Create an account to unlock exclusive features, register for events, and connect with fellow tech enthusiasts.</p>
          </div>
        </div>
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="form-logo" />
            </Link>
            <h2>Create Account</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="login-button">Create Account</button>
            <p className="auth-link">
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
            
            <div className="social-login">
              <p>Or register with</p>
              <div className="social-buttons">
                <button
                  type="button"
                  className="social-button"
                  onClick={() => handleSocialLogin('google')}
                >
                  <FaGoogle /> Google
                </button>
                <button
                  type="button"
                  className="social-button"
                  onClick={() => handleSocialLogin('github')}
                >
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
