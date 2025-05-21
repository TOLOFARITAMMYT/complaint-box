import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: 'Tammy',
    password: ' admin123'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate credentials against your backend
    // For demo purposes, we'll use a simple check
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store admin status in localStorage
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="content">
      <div className="form-container">
        <h1 className="form-title">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 