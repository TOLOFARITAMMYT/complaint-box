import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../components/Sidebar.css';
import '../components/Topbar.css';
import './AdminDashboard.css';

const statStyle = {
  background: '#1976d2',
  color: '#fff',
  borderRadius: '10px',
  padding: '1.5rem',
  fontWeight: 'bold',
  fontSize: '2rem',
  textAlign: 'center',
  flex: 1,
  marginRight: '1rem',
};

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    // Here you would typically fetch complaints from your backend
    // For demo purposes, we'll use mock data
    const mockComplaints = Array.from({ length: 20 }, (_, index) => ({
      id: `COMP${index + 1}`,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      department: ['IT', 'HR', 'Finance', 'Operations'][Math.floor(Math.random() * 4)],
      subject: `Complaint ${index + 1}`,
      description: `This is complaint description ${index + 1}`,
      status: ['Pending', 'Under Review', 'Resolved'][Math.floor(Math.random() * 3)],
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));

    setComplaints(mockComplaints);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === complaintId
          ? { ...complaint, status: newStatus }
          : complaint
      )
    );
  };

  // Calculate unique users who have submitted complaints
  const uniqueUsers = new Set(complaints.map(complaint => complaint.email)).size;

  // Stats
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inReview = complaints.filter(c => c.status === 'Under Review').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = complaints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(complaints.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pie chart data
  const pieData = [
    { label: 'Staff', value: complaints.filter(c => c.department === 'IT').length, color: '#1976d2' },
    { label: 'Facilities', value: complaints.filter(c => c.department === 'HR').length, color: '#64b5f6' },
    { label: 'Safety', value: complaints.filter(c => c.department === 'Finance').length, color: '#90caf9' },
  ];
  // Line chart data (hardcoded for now)
  const lineData = [0, 1, 2, 3, 4, 6];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'];

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-main">
        <Topbar onLogout={handleLogout} />
        <div className="admin-dashboard-content">
          <h1 className="admin-dashboard-title">Dashboard</h1>
          {/* Stat Cards */}
          <div className="admin-dashboard-stats">
            <div className="stat-card stat-total">
              <div className="stat-label">Total Complaints</div>
              <div className="stat-value">{total}</div>
            </div>
            <div className="stat-card stat-users">
              <div className="stat-label">Unique Users</div>
              <div className="stat-value">{uniqueUsers}</div>
            </div>
            <div className="stat-card stat-pending">
              <div className="stat-label">Pending</div>
              <div className="stat-value">{pending}</div>
            </div>
            <div className="stat-card stat-inreview">
              <div className="stat-label">In Review</div>
              <div className="stat-value">{inReview}</div>
            </div>
            <div className="stat-card stat-resolved">
              <div className="stat-label">Resolved</div>
              <div className="stat-value">{resolved}</div>
            </div>
          </div>
          {/* Main Content Row */}
          <div className="admin-dashboard-row">
            {/* Recent Complaints Table */}
            <div className="admin-dashboard-table">
              <div className="table-title">Recent Complaints</div>
              <div className="table-card">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((c, i) => (
                      <tr key={i}>
                        <td>{c.subject}</td>
                        <td>{c.department}</td>
                        <td>{c.date}</td>
                        <td className={`status-${c.status.replace(/\s/g, '').toLowerCase()}`}>{c.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <a href="#" className="table-link">View All &rarr;</a>
              </div>
            </div>
            {/* Charts */}
            <div className="admin-dashboard-charts">
              {/* Pie Chart */}
              <div className="chart-card">
                <div className="chart-title">Complaints by Category</div>
                <div className="chart-pie-row">
                  <svg width="90" height="90" viewBox="0 0 32 32">
                    <circle r="16" cx="16" cy="16" fill="#e3e8f0" />
                    <path d="M16 16 L16 0 A16 16 0 0 1 31.2 22.4 Z" fill="#1976d2" />
                    <path d="M16 16 L31.2 22.4 A16 16 0 0 1 8 30.9 Z" fill="#64b5f6" />
                    <path d="M16 16 L8 30.9 A16 16 0 0 1 16 0 Z" fill="#90caf9" />
                  </svg>
                  <div>
                    {pieData.map((d, i) => (
                      <div key={i} className="pie-legend-row">
                        <span className="pie-legend-color" style={{ background: d.color }}></span>
                        <span className="pie-legend-label">{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Line Chart */}
              <div className="chart-card">
                <div className="chart-title">Complaints Overview</div>
                <svg width="180" height="70" style={{ background: '#f5f7fa', borderRadius: 8 }}>
                  <polyline
                    fill="none"
                    stroke="#1976d2"
                    strokeWidth="3"
                    points="0,60 36,50 72,40 108,30 144,20 180,10"
                  />
                  {lineData.map((v, i) => (
                    <circle key={i} cx={i * 36} cy={60 - v * 10} r="3.5" fill="#1976d2" />
                  ))}
                </svg>
                <div className="chart-months-row">
                  {months.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 