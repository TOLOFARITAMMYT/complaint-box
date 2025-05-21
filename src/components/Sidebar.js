import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2" fill="#fff"/><rect x="7" y="3" width="10" height="4" rx="1" fill="#fff"/></svg>
        </div>
        <div className="sidebar-title">Complaint Box</div>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin/dashboard" className={`sidebar-link${location.pathname === '/admin/dashboard' ? ' active' : ''}`}> 
          <span className="sidebar-link-icon">🏠</span> Dashboard
        </Link>
        <Link to="/admin/complaints" className={`sidebar-link${location.pathname === '/admin/complaints' ? ' active' : ''}`}> 
          <span className="sidebar-link-icon">📄</span> Complaints
        </Link>
        <Link to="/admin/profile" className={`sidebar-link${location.pathname === '/admin/profile' ? ' active' : ''}`}> 
          <span className="sidebar-link-icon">👤</span> Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 