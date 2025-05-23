import React from 'react';
import './Topbar.css';

const Topbar = ({ onLogout }) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn">
          <i className="fas fa-bars"></i>
        </button>
        <div className="topbar-search">
          <i className="fas fa-search search-icon"></i>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </div>
        <button className="topbar-logout" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
        <div className="topbar-avatar">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default Topbar; 