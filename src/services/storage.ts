import { BookingDetails, Inquiry } from '../types';

const BOOKINGS_KEY = 'vijaya_travels_bookings';
const INQUIRIES_KEY = 'vijaya_travels_inquiries';

const INITIAL_BOOKINGS: BookingDetails[] = [
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

const INITIAL_INQUIRIES: Inquiry[] = [
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

export const getStoredBookings = (): BookingDetails[] => {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BOOKINGS;
  }
};

// Async fetch directly from Express + SQLite backend
export const fetchBookings = async (): Promise<BookingDetails[]> => {
  try {
    const res = await fetch('/api/bookings');
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(json.data));
      return json.data;
    }
    return getStoredBookings();
  } catch (err) {
    console.warn('Backend unavailable, using cached bookings:', err);
    return getStoredBookings();
  }
};

export const saveBooking = async (booking: BookingDetails): Promise<void> => {
  const current = getStoredBookings();
  const updated = [booking, ...current.filter(b => b.id !== booking.id)];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));

  // Sync with Express backend SQLite database
  try {
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
  } catch (err) {
    console.warn('Could not sync booking with backend SQLite DB:', err);
  }
};

export const getBookingById = (id: string): BookingDetails | undefined => {
  const list = getStoredBookings();
  return list.find(b => b.id.toLowerCase() === id.toLowerCase().trim());
};

export const updateBookingStatus = async (id: string, status: BookingDetails['bookingStatus']): Promise<boolean> => {
  const current = getStoredBookings();
  const idx = current.findIndex(b => b.id === id);
  if (idx !== -1) {
    current[idx].bookingStatus = status;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(current));
  }

  // Sync with Express backend SQLite database
  try {
    const res = await fetch(`/api/bookings/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Could not sync status update with backend:', err);
    return idx !== -1;
  }
};

export const getStoredInquiries = (): Inquiry[] => {
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
};

// Async fetch directly from Express + SQLite backend
export const fetchInquiries = async (): Promise<Inquiry[]> => {
  try {
    const res = await fetch('/api/inquiries');
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(json.data));
      return json.data;
    }
    return getStoredInquiries();
  } catch (err) {
    console.warn('Backend unavailable, using cached inquiries:', err);
    return getStoredInquiries();
  }
};

export const saveInquiry = async (inquiry: Inquiry): Promise<void> => {
  const current = getStoredInquiries();
  const updated = [inquiry, ...current];
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));

  // Sync with Express backend SQLite database
  try {
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
  } catch (err) {
    console.warn('Could not sync inquiry with backend SQLite DB:', err);
  }
};

export const updateInquiryStatus = async (id: string, status: Inquiry['status']): Promise<void> => {
  const current = getStoredInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));

  // Sync with Express backend SQLite database
  try {
    await fetch(`/api/inquiries/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  } catch (err) {
    console.warn('Could not sync inquiry status update with backend:', err);
  }
};

// Route estimation helper
export const estimateRoute = (pickup: string, drop: string, tripType: string) => {
  const p = pickup.toLowerCase();
  const d = drop.toLowerCase();

  // Known distances from Bangalore
  let km = 280;
  let duration = "5 hrs 30 mins";

  if (p.includes('airport') || d.includes('airport')) {
    km = 45;
    duration = "1 hr 15 mins";
  } else if (p.includes('mysore') || d.includes('mysore') || p.includes('mysuru') || d.includes('mysuru')) {
    km = 145;
    duration = "2 hrs 45 mins";
  } else if (p.includes('coorg') || d.includes('coorg') || p.includes('madikeri') || d.includes('madikeri')) {
    km = 265;
    duration = "5 hrs 15 mins";
  } else if (p.includes('chikmagalur') || d.includes('chikmagalur')) {
    km = 245;
    duration = "4 hrs 50 mins";
  } else if (p.includes('hampi') || d.includes('hampi')) {
    km = 340;
    duration = "6 hrs 30 mins";
  } else if (p.includes('goa') || d.includes('goa')) {
    km = 580;
    duration = "10 hrs 30 mins";
  } else if (p.includes('ooty') || d.includes('ooty')) {
    km = 280;
    duration = "6 hrs 15 mins";
  } else if (tripType === 'local') {
    km = 80;
    duration = "8 hrs disposal";
  }

  // If round trip, double distance
  if (tripType === 'outstation-round') {
    km = km * 2;
  }

  return { estimatedKm: km, estimatedDuration: duration };
};
