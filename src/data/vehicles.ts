import { Vehicle } from '../types';

export const vehiclesData: Vehicle[] = [
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "suv",
    categoryLabel: "Executive 7-Seater SUV",
    tagline: "The gold standard in outstation and corporate travel comfort",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 7,
    luggage: 4,
    isAC: true,
    hasDriver: true,
    transmission: "Automatic",
    fuelType: "Diesel",
    rating: 4.9,
    reviewCount: 412,
    rates: {
      outstationPerKm: 21,
      minKmPerDay: 300,
      local8hr80km: 3200,
      extraKmRate: 21,
      extraHourRate: 250,
      airportFlatRate: 2400,
      driverAllowancePerDay: 450,
      nightAllowance: 300
    },
    features: [
      "Captain Seats with Recline",
      "Dual-Zone Climate Control AC",
      "Spacious Boot Space for 4 Bags",
      "Rear Armrests & Cup Holders",
      "Phone Fast Charger in Every Row",
      "Trained Highway Chauffeur"
    ],
    amenities: {
      wifi: true,
      waterBottles: true,
      phoneCharger: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      luggageCarrier: true
    },
    availabilityStatus: "Available",
    badge: "Most Popular",
    description: "Toyota Innova Crysta is India's most trusted executive family and corporate cruiser. Renowned for its pillow-soft ride over rough highways, spacious legroom, and refined captain seats."
  },
  {
    id: "innova-hycross",
    name: "Toyota Innova HyCross Hybrid",
    category: "suv",
    categoryLabel: "Ultra-Luxury Hybrid SUV",
    tagline: "Whisper-quiet hybrid journey with ottoman executive lounge seats",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 7,
    luggage: 5,
    isAC: true,
    hasDriver: true,
    transmission: "Automatic",
    fuelType: "Hybrid",
    rating: 5.0,
    reviewCount: 189,
    rates: {
      outstationPerKm: 25,
      minKmPerDay: 300,
      local8hr80km: 3900,
      extraKmRate: 25,
      extraHourRate: 300,
      airportFlatRate: 2900,
      driverAllowancePerDay: 500,
      nightAllowance: 350
    },
    features: [
      "Panoramic Sunroof",
      "Ottoman Powered Footrests",
      "JBL 9-Speaker Audio System",
      "Whisper Silent EV Hybrid Drive",
      "Ventilated Leather Seats",
      "ADAS Radar Safety Features"
    ],
    amenities: {
      wifi: true,
      waterBottles: true,
      phoneCharger: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      luggageCarrier: false
    },
    availabilityStatus: "Available",
    badge: "Flagship Luxury",
    description: "The HyCross brings private jet-style comfort to South Indian highways. With powered calf supports, ambient lighting, and whisper-silent hybrid propulsion, every trip feels effortless."
  },
  {
    id: "maruti-dzire",
    name: "Maruti Suzuki Dzire",
    category: "sedan",
    categoryLabel: "Compact Executive Sedan",
    tagline: "Smooth, cost-effective elegance for couples and business solo travelers",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 4,
    luggage: 3,
    isAC: true,
    hasDriver: true,
    transmission: "Manual",
    fuelType: "Petrol",
    rating: 4.8,
    reviewCount: 520,
    rates: {
      outstationPerKm: 13,
      minKmPerDay: 250,
      local8hr80km: 1900,
      extraKmRate: 13,
      extraHourRate: 150,
      airportFlatRate: 1350,
      driverAllowancePerDay: 400,
      nightAllowance: 250
    },
    features: [
      "Chilled Air Conditioning",
      "Ergonomic Rear Cushioning",
      "Dedicated 378L Trunk Space",
      "Tinted UV-Cut Privacy Windows",
      "Uniformed Chauffeur",
      "Luggage Loading Assistance"
    ],
    amenities: {
      waterBottles: true,
      phoneCharger: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true
    },
    availabilityStatus: "Available",
    badge: "Best Value",
    description: "Perfect for airport runs, city business appointments, and weekend couple escapes to Mysore or Hassan. Reliable, spotless, and easy on the pocket."
  },
  {
    id: "honda-city",
    name: "Honda City 5th Gen",
    category: "sedan",
    categoryLabel: "Premium Luxury Sedan",
    tagline: "Supreme rear-seat legroom and sophisticated executive presence",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 4,
    luggage: 3,
    isAC: true,
    hasDriver: true,
    transmission: "Automatic",
    fuelType: "Petrol",
    rating: 4.9,
    reviewCount: 245,
    rates: {
      outstationPerKm: 16,
      minKmPerDay: 250,
      local8hr80km: 2400,
      extraKmRate: 16,
      extraHourRate: 180,
      airportFlatRate: 1750,
      driverAllowancePerDay: 400,
      nightAllowance: 250
    },
    features: [
      "Plush Leatherette Seats",
      "Rear Sunshade & Reading Lamps",
      "Generous 506L Trunk Volume",
      "Smooth CVT Transmission",
      "Corporate Billing Ready",
      "English-speaking Chauffeur"
    ],
    amenities: {
      wifi: true,
      waterBottles: true,
      phoneCharger: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true
    },
    availabilityStatus: "Available",
    description: "The preferred choice for corporate dignitaries, wedding guest VIP transit, and executive outstation trips."
  },
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner Legender 4x4",
    category: "suv",
    categoryLabel: "VIP Luxury SUV",
    tagline: "Commanding road authority and unmatched security for dignitaries",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 7,
    luggage: 4,
    isAC: true,
    hasDriver: true,
    transmission: "Automatic",
    fuelType: "Diesel",
    rating: 5.0,
    reviewCount: 167,
    rates: {
      outstationPerKm: 34,
      minKmPerDay: 300,
      local8hr80km: 5500,
      extraKmRate: 34,
      extraHourRate: 400,
      airportFlatRate: 3800,
      driverAllowancePerDay: 600,
      nightAllowance: 400
    },
    features: [
      "Commanding Stance & Tinted Glass",
      "Black & Maroon Premium Leather",
      "4x4 Capability for Hilly Terrains",
      "Experienced Hill Chauffeur",
      "VIP Escort Protocol Ready"
    ],
    amenities: {
      wifi: true,
      waterBottles: true,
      phoneCharger: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true
    },
    availabilityStatus: "Available",
    badge: "VIP Choice",
    description: "Designed for leaders, celebrities, and families traveling into steep ghats of Coorg, Wayanad, and Chikmagalur with absolute peace of mind."
  },
  {
    id: "urbania-luxury-10",
    name: "Force Urbania Executive Lounge",
    category: "tempo",
    categoryLabel: "Ultra-Luxury 10-Seater Van",
    tagline: "European styling with individual reclining bucket seats & aircraft-style vents",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 10,
    luggage: 10,
    isAC: true,
    hasDriver: true,
    transmission: "Manual",
    fuelType: "Diesel",
    rating: 4.95,
    reviewCount: 310,
    rates: {
      outstationPerKm: 30,
      minKmPerDay: 300,
      local8hr80km: 4800,
      extraKmRate: 30,
      extraHourRate: 350,
      airportFlatRate: 3600,
      driverAllowancePerDay: 500,
      nightAllowance: 350
    },
    features: [
      "Individual Aircraft Style AC Vents",
      "Plush Reclining 1x1 Bucket Seats",
      "Panoramic Sealed Glass Windows",
      "Ambient Multi-Color LED Mood Lighting",
      "Spacious Walk-Through Aisle",
      "Large Dedicated Rear Luggage Hold"
    ],
    amenities: {
      wifi: true,
      waterBottles: true,
      phoneCharger: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      ledTV: true
    },
    availabilityStatus: "Available",
    badge: "Customer Favorite",
    description: "Force Urbania represents the next generation in luxury group mobility. Offering car-like ride suspension, individual reading lamps, and high headroom, it outclasses traditional tempo vans."
  },
  {
    id: "tempo-traveller-12",
    name: "Tempo Traveller Executive 12-Seater",
    category: "tempo",
    categoryLabel: "12+1 Seater AC Chauffeur Van",
    tagline: "The timeless favourite for extended family vacations and temple tours",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 12,
    luggage: 12,
    isAC: true,
    hasDriver: true,
    transmission: "Manual",
    fuelType: "Diesel",
    rating: 4.85,
    reviewCount: 780,
    rates: {
      outstationPerKm: 26,
      minKmPerDay: 300,
      local8hr80km: 4200,
      extraKmRate: 26,
      extraHourRate: 300,
      airportFlatRate: 3200,
      driverAllowancePerDay: 500,
      nightAllowance: 350
    },
    features: [
      "2x1 Pushback Seats with Armrests",
      "Surround Powerful Roof AC Blowers",
      "LED Android Entertainment Screen",
      "Rooftop Waterproof Carrier Box",
      "Curtains on All Windows",
      "Highway-Trained Professional Chauffeur"
    ],
    amenities: {
      waterBottles: true,
      phoneCharger: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      luggageCarrier: true,
      ledTV: true
    },
    availabilityStatus: "Available",
    description: "Spacious, comfortable, and reliable for South Indian routes like Tirupati, Ooty, Kodaikanal, and temple circuits."
  },
  {
    id: "tempo-traveller-17",
    name: "Tempo Traveller Maharaja 17-Seater",
    category: "tempo",
    categoryLabel: "17+1 Seater Maharaja Luxury",
    tagline: "Grand interiors with calf rests and premium audio for large family clans",
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 17,
    luggage: 15,
    isAC: true,
    hasDriver: true,
    transmission: "Manual",
    fuelType: "Diesel",
    rating: 4.88,
    reviewCount: 460,
    rates: {
      outstationPerKm: 32,
      minKmPerDay: 300,
      local8hr80km: 5000,
      extraKmRate: 32,
      extraHourRate: 350,
      airportFlatRate: 3800,
      driverAllowancePerDay: 550,
      nightAllowance: 350
    },
    features: [
      "Maharaja Style Extra-Padded Pushback Seats",
      "Full Chilled Air-Conditioning",
      "Separate Microphone for Tour Guide",
      "Rear Extended Luggage Compartment",
      "Smooth Air-Suspension System"
    ],
    amenities: {
      waterBottles: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      luggageCarrier: true,
      ledTV: true
    },
    availabilityStatus: "Available",
    description: "Crafted specifically for extended family weddings, college reunions, and corporate department offsites."
  },
  {
    id: "minibus-26",
    name: "Eicher Skyline Pro 26-Seater AC",
    category: "minibus",
    categoryLabel: "26-Seater Executive Mini Bus",
    tagline: "Pneumatic suspension and whisper quiet cabin for company outings",
    image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 26,
    luggage: 22,
    isAC: true,
    hasDriver: true,
    transmission: "Manual",
    fuelType: "Diesel",
    rating: 4.87,
    reviewCount: 310,
    rates: {
      outstationPerKm: 42,
      minKmPerDay: 350,
      local8hr80km: 6800,
      extraKmRate: 42,
      extraHourRate: 500,
      airportFlatRate: 5200,
      driverAllowancePerDay: 600,
      nightAllowance: 400
    },
    features: [
      "High Back Deluxe Pushback Seats",
      "Air Suspension for Highway Stability",
      "Overhead Aircraft Type Luggage Racks",
      "Underfloor Large Luggage Dickey",
      "PA System & Bluetooth Audio",
      "Speed Governor (80 km/h) Certified"
    ],
    amenities: {
      waterBottles: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      ledTV: true
    },
    availabilityStatus: "Available",
    description: "Engineered for optimal comfort on inter-city expressways. Ideal for 20-25 member teams travelling together with luggage."
  },
  {
    id: "luxury-coach-45",
    name: "BharatBenz / Volvo 9600 Luxury Coach 45-Seater",
    category: "luxury-bus",
    categoryLabel: "45-Seater Multi-Axle Intercity Coach",
    tagline: "Unrivalled luxury charter for weddings, conferences and grand tours",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
    ],
    seats: 45,
    luggage: 45,
    isAC: true,
    hasDriver: true,
    transmission: "Automatic",
    fuelType: "Diesel",
    rating: 4.96,
    reviewCount: 195,
    rates: {
      outstationPerKm: 65,
      minKmPerDay: 400,
      local8hr80km: 11500,
      extraKmRate: 65,
      extraHourRate: 800,
      airportFlatRate: 8500,
      driverAllowancePerDay: 800,
      nightAllowance: 500
    },
    features: [
      "Electronically Controlled Air Suspension",
      "Ultra-Plush Semi-Sleeper Velvet Seats",
      "Individual USB Charging Sockets",
      "Underbelly Massive 8.5 cu.m Storage",
      "Two Chauffeurs for Night Routes",
      "Certified Fire Detection & Suppression System"
    ],
    amenities: {
      wifi: true,
      waterBottles: true,
      phoneCharger: true,
      pushbackSeats: true,
      musicSystem: true,
      firstAid: true,
      gpsTracking: true,
      ledTV: true
    },
    availabilityStatus: "Available",
    badge: "Grand Charter",
    description: "The peak of group highway travel in South India. Features state-of-the-art electronically controlled air suspension, dual drivers for overnight journeys, and pristine cabin hygiene."
  }
];
