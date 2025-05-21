import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Mock data for demonstration
const mockComplaint = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Website Issue',
  message: 'Cannot access the website',
  category: 'Technical Issue',
  status: 'In Review',
  date: '2024-03-20',
};

const validationSchema = Yup.object({
  complaintId: Yup.string().required('Complaint ID is required'),
});

function TrackComplaint() {
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      complaintId: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Here you would typically fetch the complaint from your backend
      // For demo purposes, we'll use mock data
      if (values.complaintId === '1') {
        setComplaint(mockComplaint);
        setError('');
      } else {
        setComplaint(null);
        setError('Complaint not found');
      }
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'In Review':
        return 'info';
      case 'Resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Track Your Complaint
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="complaintId"
            name="complaintId"
            label="Complaint ID"
            value={formik.values.complaintId}
            onChange={formik.handleChange}
            error={formik.touched.complaintId && Boolean(formik.errors.complaintId)}
            helperText={formik.touched.complaintId && formik.errors.complaintId}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Track
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {complaint && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Complaint Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography color="textSecondary">Complaint ID</Typography>
                  <Typography variant="body1">{complaint.id}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Name</Typography>
                  <Typography variant="body1">{complaint.name}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Email</Typography>
                  <Typography variant="body1">{complaint.email}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Subject</Typography>
                  <Typography variant="body1">{complaint.subject}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Category</Typography>
                  <Typography variant="body1">{complaint.category}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Message</Typography>
                  <Typography variant="body1">{complaint.message}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Date Submitted</Typography>
                  <Typography variant="body1">{complaint.date}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Status</Typography>
                  <Chip
                    label={complaint.status}
                    color={getStatusColor(complaint.status)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
}

export default TrackComplaint; 