# Technoville Complaint Box

A modern complaint management system built with React and Material-UI.

## Features

### User Panel
- Submit complaints with name, email, subject, message, and category
- Track complaint status using a unique ID
- User-friendly interface

### Admin Dashboard
- Secure login system
- View all complaints in a paginated table
- Filter and search complaints
- Change complaint status (Pending, In Review, Resolved)
- Delete complaints
- View statistics with charts
- Total and resolved complaint counts

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd technoville-complaint-box
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### User Access
- Visit the home page to submit a new complaint
- Use the "Track Complaint" page to check the status of your complaint

### Admin Access
- Navigate to the admin login page
- Use the following credentials for demo:
  - Username: admin
  - Password: admin123

## Technologies Used

- React
- Material-UI
- Formik & Yup for form handling
- Recharts for data visualization
- React Router for navigation

## Project Structure

```
src/
  ├── components/
  │   └── Navbar.js
  ├── pages/
  │   ├── Home.js
  │   ├── AdminDashboard.js
  │   ├── AdminLogin.js
  │   └── TrackComplaint.js
  ├── App.js
  └── index.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 