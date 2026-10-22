import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  getAllBookings,
  getBookingById,
  saveBooking,
  updateBookingStatus,
  getAllInquiries,
  saveInquiry,
  updateInquiryStatus
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Travelling Booking Express & SQLite Backend is running',
    timestamp: new Date().toISOString()
  });
});

// --- BOOKINGS API ---

// Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = getAllBookings();
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve bookings' });
  }
});

// Get single booking by ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const booking = getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve booking' });
  }
});

// Create or update a booking
app.post('/api/bookings', (req, res) => {
  try {
    const bookingData = req.body;
    if (!bookingData || !bookingData.id || !bookingData.pickupLocation) {
      return res.status(400).json({ success: false, error: 'Missing required booking fields' });
    }

    const saved = saveBooking(bookingData);
    console.log(`✓ Booking saved: ${saved.id} for ${saved.customer?.fullName}`);
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ success: false, error: 'Failed to save booking' });
  }
});

// Update booking status
app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updated = updateBookingStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    console.log(`✓ Booking ${req.params.id} status changed to ${status}`);
    res.json({ success: true, message: `Booking status updated to ${status}` });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, error: 'Failed to update booking status' });
  }
});

// --- INQUIRIES API ---

// Get all inquiries
app.get('/api/inquiries', (req, res) => {
  try {
    const inquiries = getAllInquiries();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve inquiries' });
  }
});

// Submit a new inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const inquiryData = req.body;
    if (!inquiryData || !inquiryData.fullName || !inquiryData.phone) {
      return res.status(400).json({ success: false, error: 'Missing required inquiry fields' });
    }

    if (!inquiryData.id) {
      inquiryData.id = `INQ-${Date.now().toString().slice(-4)}`;
    }

    const saved = saveInquiry(inquiryData);
    console.log(`✓ Inquiry saved: ${saved.id} from ${saved.fullName}`);
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to save inquiry' });
  }
});

// Update inquiry status
app.patch('/api/inquiries/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updated = updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    console.log(`✓ Inquiry ${req.params.id} status changed to ${status}`);
    res.json({ success: true, message: `Inquiry status updated to ${status}` });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    res.status(500).json({ success: false, error: 'Failed to update inquiry status' });
  }
});

// Start listening
const server = app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
  console.log(`📦 Database: SQLite (server/data/travel_booking.db)`);
});

export default app;
