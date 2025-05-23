import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../components/Sidebar.css';
import '../components/Topbar.css';
import './AdminDashboard.css';

const mockComplaints = Array.from({ length: 15 }, (_, index) => ({
  id: `COMP${index + 1}`,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  category: ['Service', 'Billing', 'Product', 'Staff'][Math.floor(Math.random() * 4)],
  details: `This is complaint details ${index + 1}`,
  status: ['Pending', 'In Review', 'Resolved'][Math.floor(Math.random() * 3)],
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
}));

const categories = ['All', 'Service', 'Billing', 'Product', 'Staff'];
const statuses = ['All', 'Pending', 'In Review', 'Resolved'];

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [date, setDate] = useState('');

  useEffect(() => {
    setComplaints(mockComplaints);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleDelete = (id) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  const filtered = complaints.filter(c =>
    (category === 'All' || c.category === category) &&
    (status === 'All' || c.status === status) &&
    (!date || c.date === date) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.details.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-main">
        <Topbar />
        <div className="admin-dashboard-content">
          <h1 className="admin-dashboard-title">Complaints Management</h1>
          <div className="complaints-filters-row">
            <input
              type="text"
              placeholder="Search by name, email, or details..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="complaints-search"
            />
            <select value={category} onChange={e => setCategory(e.target.value)} className="complaints-filter">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)} className="complaints-filter">
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="complaints-filter"
            />
          </div>
          <div className="table-card" style={{ marginTop: '1.5rem' }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', color: '#888' }}>No complaints found.</td></tr>
                ) : filtered.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.category}</td>
                    <td>{c.date}</td>
                    <td>
                      <select
                        value={c.status}
                        onChange={e => handleStatusChange(c.id, e.target.value)}
                        className={`status-select status-${c.status.replace(/\s/g, '').toLowerCase()}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Review">In Review</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      <button className="complaints-action-btn delete" onClick={() => handleDelete(c.id)} title="Delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaints; 