import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for demonstration
const mockComplaints = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Website Issue',
    message: 'Cannot access the website',
    category: 'Technical Issue',
    status: 'Pending',
    date: '2024-03-20',
  },
  // Add more mock data as needed
];

// Custom pagination actions component
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <Tooltip title="First Page">
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous Page">
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Tooltip>
      <Tooltip title="Next Page">
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Tooltip>
      <Tooltip title="Last Page">
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

function AdminDashboard() {
  const [complaints, setComplaints] = useState(mockComplaints);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, status: newStatus }
          : complaint
      )
    );
  };

  const handleDelete = (complaintId) => {
    setComplaints(complaints.filter((complaint) => complaint.id !== complaintId));
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats data
  const stats = {
    total: complaints.length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    inReview: complaints.filter((c) => c.status === 'In Review').length,
  };

  const chartData = [
    { name: 'Resolved', value: stats.resolved },
    { name: 'Pending', value: stats.pending },
    { name: 'In Review', value: stats.inReview },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Complaints
              </Typography>
              <Typography variant="h5">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Resolved
              </Typography>
              <Typography variant="h5">{stats.resolved}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h5">{stats.pending}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Review
              </Typography>
              <Typography variant="h5">{stats.inReview}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Paper sx={{ p: 2, mb: 4 }} className="chart-container">
        <Typography variant="h6" gutterBottom>
          Complaint Status Distribution
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Review">In Review</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Complaints Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComplaints
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.name}</TableCell>
                  <TableCell>{complaint.email}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>
                    <Select
                      value={complaint.status}
                      size="small"
                      onChange={(e) =>
                        handleStatusChange(complaint.id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Review">In Review</MenuItem>
                      <MenuItem value="Resolved">Resolved</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDelete(complaint.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredComplaints.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count}`
          }
        />
      </TableContainer>
    </Container>
  );
}

export default AdminDashboard; 