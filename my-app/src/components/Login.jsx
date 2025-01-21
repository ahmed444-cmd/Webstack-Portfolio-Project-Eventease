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
      // This is a mock login - replace with your actual authentication logic
      if (email === 'admin@example.com' && password === 'admin123') {
        login({ email, role: 'admin' });
        navigate('/admin/dashboard');
      } else if (email === 'user@example.com' && password === 'user123') {
        login({ email, role: 'user' });
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
