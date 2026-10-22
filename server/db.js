import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'travel_booking.db');
const db = new Database(dbPath);

// Enable WAL mode for better performance & concurrent reads
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    trip_type TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    drop_location TEXT NOT NULL,
    pickup_date TEXT NOT NULL,
    pickup_time TEXT NOT NULL,
    return_date TEXT,
    passengers INTEGER NOT NULL,
    selected_vehicle_id TEXT NOT NULL,
    selected_vehicle_name TEXT NOT NULL,
    selected_vehicle_category TEXT,
    selected_vehicle_image TEXT,
    estimated_km REAL,
    estimated_hours REAL,
    base_fare REAL,
    driver_allowance REAL,
    toll_taxes_estimated REAL,
    discount_amount REAL,
    total_amount REAL NOT NULL,
    advance_amount_paid REAL NOT NULL,
    balance_due REAL NOT NULL,
    payment_method TEXT,
    payment_status TEXT NOT NULL,
    booking_status TEXT NOT NULL,
    driver_name TEXT,
    driver_phone TEXT,
    driver_rating REAL,
    driver_plate_number TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    passengers_count INTEGER,
    special_requests TEXT,
    has_gst_invoice INTEGER DEFAULT 0,
    company_name TEXT,
    gst_number TEXT,
    raw_json TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    travel_date TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New'
  );
`);

// Seed Initial Data if empty
const countBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;
if (countBookings === 0) {
  const seedBookings = [
    {
      id: "TRV-849201",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      tripType: "outstation-round",
      pickupLocation: "Indiranagar 100ft Road, Bengaluru",
      dropLocation: "Madikeri, Coorg (Resort Drop)",
      pickupDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupTime: "06:30 AM",
      returnDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passengers: 5,
      selectedVehicleId: "innova-crysta",
      selectedVehicleName: "Toyota Innova Crysta",
      selectedVehicleCategory: "suv",
      selectedVehicleImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      estimatedKm: 580,
      estimatedHours: 12,
      baseFare: 12180,
      driverAllowance: 1350,
      tollTaxesEstimated: 850,
      discountAmount: 500,
      totalAmount: 13880,
      advanceAmountPaid: 2776,
      balanceDue: 11104,
      paymentMethod: "upi",
      paymentStatus: "Advance Paid",
      bookingStatus: "Confirmed",
      assignedDriver: {
        name: "Ramesh Kumar Gowda",
        phone: "+91 98451 98765",
        rating: 4.95,
        vehiclePlateNumber: "KA 01 MJ 4492"
      },
      customer: {
        fullName: "Karthik Subramanian",
        mobileNumber: "9845012345",
        email: "karthik.s@example.com",
        passengersCount: 5,
        specialRequests: "Please bring 2 child booster cushions and cold drinking water bottles.",
        hasGstInvoice: true,
        companyName: "Zenith Cloud Solutions Pvt Ltd",
        gstNumber: "29AABCU9603R1ZM"
      }
    },
    {
      id: "TRV-736209",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      tripType: "airport",
      pickupLocation: "Kempegowda International Airport (BLR)",
      dropLocation: "Prestige Golfshire, Nandi Hills Road",
      pickupDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupTime: "11:15 PM",
      passengers: 2,
      selectedVehicleId: "honda-city",
      selectedVehicleName: "Honda City 5th Gen",
      selectedVehicleCategory: "sedan",
      selectedVehicleImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
      estimatedKm: 42,
      estimatedHours: 1.2,
      baseFare: 1750,
      driverAllowance: 0,
      tollTaxesEstimated: 160,
      discountAmount: 0,
      totalAmount: 1910,
      advanceAmountPaid: 1910,
      balanceDue: 0,
      paymentMethod: "card",
      paymentStatus: "Paid",
      bookingStatus: "Confirmed",
      assignedDriver: {
        name: "Pradeep Shetty",
        phone: "+91 97400 44321",
        rating: 4.9,
        vehiclePlateNumber: "KA 04 AC 8820"
      },
      customer: {
        fullName: "Anand Kulkarni",
        mobileNumber: "9886077123",
        email: "anand.k@globaltech.com",
        passengersCount: 2,
        specialRequests: "Flight 6E-512 landing at 11:00 PM. Name board requested.",
        hasGstInvoice: false
      }
    },
    {
      id: "TRV-521190",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      tripType: "outstation-round",
      pickupLocation: "Jayanagar 4th Block, Bengaluru",
      dropLocation: "Amba Vilas Palace, Mysuru",
      pickupDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupTime: "07:00 AM",
      returnDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passengers: 8,
      selectedVehicleId: "urbania-luxury-10",
      selectedVehicleName: "Force Urbania Executive Lounge",
      selectedVehicleCategory: "tempo",
      selectedVehicleImage: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
      estimatedKm: 340,
      estimatedHours: 6.5,
      baseFare: 10200,
      driverAllowance: 1000,
      tollTaxesEstimated: 640,
      discountAmount: 600,
      totalAmount: 11240,
      advanceAmountPaid: 11240,
      balanceDue: 0,
      paymentMethod: "upi",
      paymentStatus: "Paid",
      bookingStatus: "Completed",
      assignedDriver: {
        name: "Siddalingappa M",
        phone: "+91 94480 33112",
        rating: 5.0,
        vehiclePlateNumber: "KA 05 ER 9090"
      },
      customer: {
        fullName: "Deepa Nambiar",
        mobileNumber: "9448011223",
        email: "deepa.n@gmail.com",
        passengersCount: 8,
        specialRequests: "Smooth driving for grandparents.",
        hasGstInvoice: false
      }
    }
  ];

  const insertBooking = db.prepare(`
    INSERT INTO bookings (
      id, created_at, trip_type, pickup_location, drop_location, pickup_date, pickup_time, return_date,
      passengers, selected_vehicle_id, selected_vehicle_name, selected_vehicle_category, selected_vehicle_image,
      estimated_km, estimated_hours, base_fare, driver_allowance, toll_taxes_estimated, discount_amount,
      total_amount, advance_amount_paid, balance_due, payment_method, payment_status, booking_status,
      driver_name, driver_phone, driver_rating, driver_plate_number, customer_name, customer_phone,
      customer_email, passengers_count, special_requests, has_gst_invoice, company_name, gst_number, raw_json
    ) VALUES (
      @id, @createdAt, @tripType, @pickupLocation, @dropLocation, @pickupDate, @pickupTime, @returnDate,
      @passengers, @selectedVehicleId, @selectedVehicleName, @selectedVehicleCategory, @selectedVehicleImage,
      @estimatedKm, @estimatedHours, @baseFare, @driverAllowance, @tollTaxesEstimated, @discountAmount,
      @totalAmount, @advanceAmountPaid, @balanceDue, @paymentMethod, @paymentStatus, @bookingStatus,
      @driverName, @driverPhone, @driverRating, @driverPlateNumber, @customerName, @customerPhone,
      @customerEmail, @passengersCount, @specialRequests, @hasGstInvoice, @companyName, @gstNumber, @rawJson
    )
  `);

  for (const b of seedBookings) {
    insertBooking.run({
      id: b.id,
      createdAt: b.createdAt,
      tripType: b.tripType,
      pickupLocation: b.pickupLocation,
      dropLocation: b.dropLocation,
      pickupDate: b.pickupDate,
      pickupTime: b.pickupTime,
      returnDate: b.returnDate || null,
      passengers: b.passengers,
      selectedVehicleId: b.selectedVehicleId,
      selectedVehicleName: b.selectedVehicleName,
      selectedVehicleCategory: b.selectedVehicleCategory || null,
      selectedVehicleImage: b.selectedVehicleImage || null,
      estimatedKm: b.estimatedKm || 0,
      estimatedHours: b.estimatedHours || 0,
      baseFare: b.baseFare || 0,
      driverAllowance: b.driverAllowance || 0,
      tollTaxesEstimated: b.tollTaxesEstimated || 0,
      discountAmount: b.discountAmount || 0,
      totalAmount: b.totalAmount,
      advanceAmountPaid: b.advanceAmountPaid,
      balanceDue: b.balanceDue,
      paymentMethod: b.paymentMethod,
      paymentStatus: b.paymentStatus,
      bookingStatus: b.bookingStatus,
      driverName: b.assignedDriver?.name || null,
      driverPhone: b.assignedDriver?.phone || null,
      driverRating: b.assignedDriver?.rating || null,
      driverPlateNumber: b.assignedDriver?.vehiclePlateNumber || null,
      customerName: b.customer.fullName,
      customerPhone: b.customer.mobileNumber,
      customerEmail: b.customer.email,
      passengersCount: b.customer.passengersCount,
      specialRequests: b.customer.specialRequests || null,
      hasGstInvoice: b.customer.hasGstInvoice ? 1 : 0,
      companyName: b.customer.companyName || null,
      gstNumber: b.customer.gstNumber || null,
      rawJson: JSON.stringify(b)
    });
  }
}

const countInquiries = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;
if (countInquiries === 0) {
  const seedInquiries = [
    {
      id: "INQ-101",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      fullName: "Pooja Hegde",
      phone: "+91 97412 88440",
      email: "pooja.hegde@deloitte.com",
      service: "corporate-transportation",
      travelDate: "2026-10-15",
      message: "Need 4 Innova Crystas and 1 26-seater bus for our annual leadership conference at Taj West End.",
      status: "New"
    },
    {
      id: "INQ-102",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      fullName: "Vikram Singhania",
      phone: "+91 98801 55660",
      email: "vikram.s@weddings.in",
      service: "wedding-events",
      travelDate: "2026-11-20",
      message: "Inquiry for 3 luxury sedans and 2 Force Urbanias for a 3-day destination wedding in Palace Grounds.",
      status: "Contacted"
    }
  ];

  const insertInquiry = db.prepare(`
    INSERT INTO inquiries (id, created_at, full_name, phone, email, service, travel_date, message, status)
    VALUES (@id, @createdAt, @fullName, @phone, @email, @service, @travelDate, @message, @status)
  `);

  for (const inq of seedInquiries) {
    insertInquiry.run(inq);
  }
}

// Queries
export const getAllBookings = () => {
  const rows = db.prepare('SELECT raw_json FROM bookings ORDER BY created_at DESC').all();
  return rows.map(r => JSON.parse(r.raw_json));
};

export const getBookingById = (id) => {
  const row = db.prepare('SELECT raw_json FROM bookings WHERE LOWER(id) = LOWER(?)').get(id.trim());
  return row ? JSON.parse(row.raw_json) : null;
};

export const saveBooking = (b) => {
  const existing = getBookingById(b.id);
  const rawJson = JSON.stringify(b);

  if (existing) {
    db.prepare(`
      UPDATE bookings SET
        booking_status = ?,
        payment_status = ?,
        raw_json = ?
      WHERE id = ?
    `).run(b.bookingStatus, b.paymentStatus, rawJson, b.id);
  } else {
    db.prepare(`
      INSERT INTO bookings (
        id, created_at, trip_type, pickup_location, drop_location, pickup_date, pickup_time, return_date,
        passengers, selected_vehicle_id, selected_vehicle_name, selected_vehicle_category, selected_vehicle_image,
        estimated_km, estimated_hours, base_fare, driver_allowance, toll_taxes_estimated, discount_amount,
        total_amount, advance_amount_paid, balance_due, payment_method, payment_status, booking_status,
        driver_name, driver_phone, driver_rating, driver_plate_number, customer_name, customer_phone,
        customer_email, passengers_count, special_requests, has_gst_invoice, company_name, gst_number, raw_json
      ) VALUES (
        @id, @createdAt, @tripType, @pickupLocation, @dropLocation, @pickupDate, @pickupTime, @returnDate,
        @passengers, @selectedVehicleId, @selectedVehicleName, @selectedVehicleCategory, @selectedVehicleImage,
        @estimatedKm, @estimatedHours, @baseFare, @driverAllowance, @tollTaxesEstimated, @discountAmount,
        @totalAmount, @advanceAmountPaid, @balanceDue, @paymentMethod, @paymentStatus, @bookingStatus,
        @driverName, @driverPhone, @driverRating, @driverPlateNumber, @customerName, @customerPhone,
        @customerEmail, @passengersCount, @specialRequests, @hasGstInvoice, @companyName, @gstNumber, @rawJson
      )
    `).run({
      id: b.id,
      createdAt: b.createdAt || new Date().toISOString(),
      tripType: b.tripType,
      pickupLocation: b.pickupLocation,
      dropLocation: b.dropLocation,
      pickupDate: b.pickupDate,
      pickupTime: b.pickupTime,
      returnDate: b.returnDate || null,
      passengers: b.passengers || 1,
      selectedVehicleId: b.selectedVehicleId,
      selectedVehicleName: b.selectedVehicleName,
      selectedVehicleCategory: b.selectedVehicleCategory || null,
      selectedVehicleImage: b.selectedVehicleImage || null,
      estimatedKm: b.estimatedKm || 0,
      estimatedHours: b.estimatedHours || 0,
      baseFare: b.baseFare || 0,
      driverAllowance: b.driverAllowance || 0,
      tollTaxesEstimated: b.tollTaxesEstimated || 0,
      discountAmount: b.discountAmount || 0,
      totalAmount: b.totalAmount,
      advanceAmountPaid: b.advanceAmountPaid,
      balanceDue: b.balanceDue,
      paymentMethod: b.paymentMethod,
      paymentStatus: b.paymentStatus,
      bookingStatus: b.bookingStatus,
      driverName: b.assignedDriver?.name || null,
      driverPhone: b.assignedDriver?.phone || null,
      driverRating: b.assignedDriver?.rating || null,
      driverPlateNumber: b.assignedDriver?.vehiclePlateNumber || null,
      customerName: b.customer?.fullName || '',
      customerPhone: b.customer?.mobileNumber || '',
      customerEmail: b.customer?.email || '',
      passengersCount: b.customer?.passengersCount || b.passengers || 1,
      specialRequests: b.customer?.specialRequests || null,
      hasGstInvoice: b.customer?.hasGstInvoice ? 1 : 0,
      companyName: b.customer?.companyName || null,
      gstNumber: b.customer?.gstNumber || null,
      rawJson
    });
  }

  return b;
};

export const updateBookingStatus = (id, status) => {
  const current = getBookingById(id);
  if (!current) return false;

  current.bookingStatus = status;
  const rawJson = JSON.stringify(current);

  const res = db.prepare(`
    UPDATE bookings SET booking_status = ?, raw_json = ? WHERE id = ?
  `).run(status, rawJson, id);

  return res.changes > 0;
};

export const getAllInquiries = () => {
  return db.prepare(`
    SELECT
      id,
      created_at as createdAt,
      full_name as fullName,
      phone,
      email,
      service,
      travel_date as travelDate,
      message,
      status
    FROM inquiries
    ORDER BY created_at DESC
  `).all();
};

export const saveInquiry = (inq) => {
  db.prepare(`
    INSERT INTO inquiries (id, created_at, full_name, phone, email, service, travel_date, message, status)
    VALUES (@id, @createdAt, @fullName, @phone, @email, @service, @travelDate, @message, @status)
  `).run({
    id: inq.id,
    createdAt: inq.createdAt || new Date().toISOString(),
    fullName: inq.fullName,
    phone: inq.phone,
    email: inq.email,
    service: inq.service || '',
    travelDate: inq.travelDate || '',
    message: inq.message || '',
    status: inq.status || 'New'
  });
  return inq;
};

export const updateInquiryStatus = (id, status) => {
  const res = db.prepare(`
    UPDATE inquiries SET status = ? WHERE id = ?
  `).run(status, id);
  return res.changes > 0;
};

export default db;
