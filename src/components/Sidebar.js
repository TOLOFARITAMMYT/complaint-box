import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-icon">
          <i className="fas fa-inbox-in fa-2x"></i>
        </div>
        <div className="sidebar-title">Complaint Box</div>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin/dashboard" className={`sidebar-link${location.pathname === '/admin/dashboard' ? ' active' : ''}`}> 
          <i className="sidebar-link-icon fas fa-chart-line"></i>
          Dashboard
        </Link>
        <Link to="/admin/complaints" className={`sidebar-link${location.pathname === '/admin/complaints' ? ' active' : ''}`}> 
          <i className="sidebar-link-icon fas fa-clipboard-list"></i>
          Complaints
        </Link>
        <Link to="/admin/users" className={`sidebar-link${location.pathname === '/admin/users' ? ' active' : ''}`}> 
          <i className="sidebar-link-icon fas fa-users"></i>
          Users
        </Link>
        <Link to="/admin/settings" className={`sidebar-link${location.pathname === '/admin/settings' ? ' active' : ''}`}> 
          <i className="sidebar-link-icon fas fa-cog"></i>
          Settings
        </Link>
        <Link to="/admin/profile" className={`sidebar-link${location.pathname === '/admin/profile' ? ' active' : ''}`}> 
          <i className="sidebar-link-icon fas fa-user-circle"></i>
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar; 