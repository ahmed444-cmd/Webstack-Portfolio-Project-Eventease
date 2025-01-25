import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import logo from '../assets/images/logo-new.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Get registered users from localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if admin credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        login({ email, role: 'admin' });
        navigate('/admin/dashboard');
        return;
      }
      
      // Check registered user credentials
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        login({ email: user.email, role: user.role });
        navigate('/user/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Failed to log in');
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement social login logic here
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="login-container">
      <div className="auth-wrapper">
        <div className="auth-image">
          <div className="auth-image-content">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="auth-logo" />
            </Link>
            <h2>Welcome Back!</h2>
            <p>Join us for the most exciting tech conference of the year. Connect with industry leaders and explore cutting-edge technologies.</p>
          </div>
        </div>
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <Link to="/" className="logo-link">
              <img src={logo} alt="Logo" className="form-logo" />
            </Link>
            <h2>Sign In</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-button">Sign In</button>
            <p className="auth-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
            
            <div className="social-login">
              <p>Or continue with</p>
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

export default Login;
