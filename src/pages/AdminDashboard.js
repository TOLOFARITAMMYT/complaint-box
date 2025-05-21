import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../components/Sidebar.css';

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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = complaints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(complaints.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Stats
  const total = 120;
  const pending = 45;
  const inReview = 25;
  const resolved = 50;

  // Pie chart data (hardcoded for now)
  const pieData = [
    { label: 'Staff', value: 1, color: '#1976d2' },
    { label: 'Facilities', value: 3, color: '#64b5f6' },
    { label: 'Safety', value: 1, color: '#90caf9' },
  ];
  // Line chart data (hardcoded for now)
  const lineData = [0, 1, 2, 3, 4, 6];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2.5rem 2rem' }}>
        <h1 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Dashboard</h1>
        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ ...statStyle, background: '#1976d2', color: '#fff', marginRight: 0 }}>
            <div style={{ fontSize: '1rem', fontWeight: 500 }}>Total Complaints</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{total}</div>
          </div>
          <div style={{ ...statStyle, background: '#fff', color: '#1976d2', border: '1px solid #e3e8f0' }}>
            <div style={{ fontSize: '1rem', fontWeight: 500 }}>Pending</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{pending}</div>
          </div>
          <div style={{ ...statStyle, background: '#fff', color: '#1976d2', border: '1px solid #e3e8f0' }}>
            <div style={{ fontSize: '1rem', fontWeight: 500 }}>In Review</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{inReview}</div>
          </div>
          <div style={{ ...statStyle, background: '#fff', color: '#1976d2', border: '1px solid #e3e8f0' }}>
            <div style={{ fontSize: '1rem', fontWeight: 500 }}>Resolved</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{resolved}</div>
          </div>
        </div>
        {/* Main Content Row */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Recent Complaints Table */}
          <div style={{ flex: 2 }}>
            <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Complaints</div>
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f5f7fa' }}>
                  <tr style={{ background: '#f5f7fa' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#888', fontWeight: 500 }}>Subject</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#888', fontWeight: 500 }}>Category</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#888', fontWeight: 500 }}>Date</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#888', fontWeight: 500 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((c, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '0.75rem' }}>{c.subject}</td>
                      <td style={{ padding: '0.75rem' }}>{c.department}</td>
                      <td style={{ padding: '0.75rem' }}>{c.date}</td>
                      <td style={{ padding: '0.75rem', color: c.status === 'Resolved' ? '#388e3c' : c.status === 'Pending' ? '#f57c00' : '#1976d2', fontWeight: 600 }}>{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
              <a href="#" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none' }}>View All &rarr;</a>
            </div>
          </div>
          {/* Charts */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Pie Chart */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>Complaints by Category</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <svg width="90" height="90" viewBox="0 0 32 32">
                  <circle r="16" cx="16" cy="16" fill="#e3e8f0" />
                  <path d="M16 16 L16 0 A16 16 0 0 1 31.2 22.4 Z" fill="#1976d2" />
                  <path d="M16 16 L31.2 22.4 A16 16 0 0 1 8 30.9 Z" fill="#64b5f6" />
                  <path d="M16 16 L8 30.9 A16 16 0 0 1 16 0 Z" fill="#90caf9" />
                </svg>
                <div>
                  {pieData.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
                      <span style={{ display: 'inline-block', width: 12, height: 12, background: d.color, borderRadius: '50%' }}></span>
                      <span style={{ color: '#333', fontWeight: 500 }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Line Chart */}
            <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '1.5rem' }}>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>Complaints Overview</div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888', marginTop: 4 }}>
                {months.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 