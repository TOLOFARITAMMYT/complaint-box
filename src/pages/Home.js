import React, { useState } from 'react';

const categories = [
  'Service',
  'Billing',
  'Product',
  'Staff',
  'Other',
];

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    details: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic will be added later
    alert('Complaint submitted!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      details: '',
      file: null,
    });
  };

  return (
    <div className="content">
      <div className="complaint-form-card">
        <h1 className="complaint-form-title">Complaint Form</h1>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number <span className="optional">(optional)</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Complaint Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="details">Complaint Details</label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                className="form-textarea"
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="file">File Attachment <span className="optional">(optional)</span></label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleChange}
                className="form-input"
              />
              <span className="file-chosen">{formData.file ? formData.file.name : 'No file chosen'}</span>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="form-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home; 