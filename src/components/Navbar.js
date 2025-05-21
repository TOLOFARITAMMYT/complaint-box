import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Technoville Complaint Box
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mx: 1 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/track-complaint"
            sx={{ mx: 1 }}
          >
            Track Complaint
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin"
            sx={{ mx: 1 }}
          >
            Admin Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 