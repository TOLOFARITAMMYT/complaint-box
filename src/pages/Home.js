import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const categories = [
  'Technical Issue',
  'Service Complaint',
  'Billing Issue',
  'General Inquiry',
  'Other',
];

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  category: Yup.string().required('Category is required'),
});

function Home() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      category: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Here you would typically send the data to your backend
      console.log(values);
      // For now, we'll just show a success message
      alert('Complaint submitted successfully!');
      formik.resetForm();
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Submit a Complaint
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="category"
            name="category"
            select
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            margin="normal"
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            id="subject"
            name="subject"
            label="Subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
            margin="normal"
          />
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
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
            Submit Complaint
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Home; 