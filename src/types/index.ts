export type TripType = 'outstation-round' | 'outstation-oneway' | 'local' | 'airport' | 'corporate' | 'package';

export type VehicleCategory = 'sedan' | 'suv' | 'tempo' | 'minibus' | 'luxury-bus';

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  categoryLabel: string;
  tagline: string;
  image: string;
  gallery: string[];
  seats: number;
  luggage: number;
  isAC: boolean;
  hasDriver: boolean;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Diesel' | 'Petrol' | 'Hybrid' | 'Electric';
  rating: number;
  reviewCount: number;
  rates: {
    outstationPerKm: number;
    minKmPerDay: number;
    local8hr80km: number;
    extraKmRate: number;
    extraHourRate: number;
    airportFlatRate: number;
    driverAllowancePerDay: number;
    nightAllowance: number;
  };
  features: string[];
  amenities: {
    wifi?: boolean;
    waterBottles?: boolean;
    phoneCharger?: boolean;
    pushbackSeats?: boolean;
    musicSystem?: boolean;
    firstAid?: boolean;
    gpsTracking?: boolean;
    luggageCarrier?: boolean;
    ledTV?: boolean;
  };
  availabilityStatus: 'Available' | 'Limited' | 'Booked';
  badge?: string;
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  duration: string;
  durationDays: number;
  durationNights: number;
  destination: string;
  state: string;
  startingPrice: number;
  discountedFrom?: number;
  category: 'Hill Station' | 'Heritage' | 'Wildlife' | 'Coastal' | 'Pilgrimage';
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
    mealPlan?: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  suitableVehicles: string[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  features: string[];
  suitableFor: string[];
  startingPrice: string;
}

export interface BookingDetails {
  id: string;
  createdAt: string;
  tripType: TripType;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  passengers: number;
  selectedVehicleId: string;
  selectedVehicleName: string;
  selectedVehicleCategory: string;
  selectedVehicleImage: string;
  estimatedKm: number;
  estimatedHours?: number;
  baseFare: number;
  driverAllowance: number;
  tollTaxesEstimated: number;
  discountAmount: number;
  totalAmount: number;
  advanceAmountPaid: number;
  balanceDue: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'pay_on_pickup';
  paymentStatus: 'Paid' | 'Advance Paid' | 'Pay on Pickup';
  bookingStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  assignedDriver?: {
    name: string;
    phone: string;
    rating: number;
    vehiclePlateNumber: string;
  };
  customer: {
    fullName: string;
    mobileNumber: string;
    email: string;
    passengersCount: number;
    specialRequests?: string;
    hasGstInvoice: boolean;
    companyName?: string;
    gstNumber?: string;
  };
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  tripType: string;
  rating: number;
  review: string;
  date: string;
  vehicleUsed: string;
  verified: boolean;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  travelDate: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
}
