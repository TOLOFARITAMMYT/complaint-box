import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" sx={{ background: '#fff', boxShadow: '0 1px 4px rgba(16,30,54,0.06)' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: '#1e293b',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <i className="fas fa-inbox-in"></i>
          Technoville Complaint Box
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ 
              mx: 1,
              color: '#64748b',
              '&:hover': { color: '#2563eb', background: '#f1f5f9' }
            }}
            startIcon={<i className="fas fa-home"></i>}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/track-complaint"
            sx={{ 
              mx: 1,
              color: '#64748b',
              '&:hover': { color: '#2563eb', background: '#f1f5f9' }
            }}
            startIcon={<i className="fas fa-search"></i>}
          >
            Track Complaint
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin"
            sx={{ 
              mx: 1,
              color: '#64748b',
              '&:hover': { color: '#2563eb', background: '#f1f5f9' }
            }}
            startIcon={<i className="fas fa-user-shield"></i>}
          >
            Admin Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 