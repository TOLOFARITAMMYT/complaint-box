import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TrackComplaint from './pages/TrackComplaint';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">Technoville Complaint Box</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/track-complaint" className="nav-link">Track Complaint</Link>
            <Link to="/admin" className="nav-link">Admin Login</Link>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/track-complaint" element={<TrackComplaint />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 