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

const validationSchema = Yup.object({
  trackingId: Yup.string().required('Tracking ID is required'),
});

const TrackComplaint = () => {
  const [complaint, setComplaint] = useState(null);

  const formik = useFormik({
    initialValues: {
      trackingId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Simulated complaint data
      setComplaint({
        id: values.trackingId,
        status: 'Under Review',
        submittedDate: new Date().toLocaleDateString(),
        department: 'IT',
        subject: 'Sample Complaint',
        description: 'This is a sample complaint description.'
      });
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
            id="trackingId"
            name="trackingId"
            label="Tracking ID"
            value={formik.values.trackingId}
            onChange={formik.handleChange}
            error={formik.touched.trackingId && Boolean(formik.errors.trackingId)}
            helperText={formik.touched.trackingId && formik.errors.trackingId}
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
            Track Complaint
          </Button>
        </Box>

        {complaint && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Complaint Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography color="textSecondary">Tracking ID</Typography>
                  <Typography variant="body1">{complaint.id}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Status</Typography>
                  <Chip
                    label={complaint.status}
                    color={getStatusColor(complaint.status)}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box>
                  <Typography color="textSecondary">Submitted Date</Typography>
                  <Typography variant="body1">{complaint.submittedDate}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Department</Typography>
                  <Typography variant="body1">{complaint.department}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Subject</Typography>
                  <Typography variant="body1">{complaint.subject}</Typography>
                </Box>
                <Box>
                  <Typography color="textSecondary">Description</Typography>
                  <Typography variant="body1">{complaint.description}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default TrackComplaint; 