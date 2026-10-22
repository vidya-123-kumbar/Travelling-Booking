import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: "airport-transfers",
    title: "Airport Chauffeur Transfers",
    shortDesc: "Punctual, stress-free pickups and drops to Kempegowda International Airport (BLR) & regional airports.",
    fullDesc: "Never miss a flight or wait in taxi queues again. Our flight-monitored chauffeur service tracks your flight status in real time, offers meet-and-greet at terminal arrival gates, and provides luggage assistance with flat transparent pricing.",
    icon: "Plane",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    features: [
      "Real-time flight delay tracking",
      "Complimentary 45-minute wait time post landing",
      "Chauffeur meets you with name paging board",
      "Express toll plaza fastag enabled",
      "Clean sanitized car with mineral water bottles"
    ],
    suitableFor: ["Solo executives", "Families with heavy baggage", "International visitors"],
    startingPrice: "₹1,350 Flat"
  },
  {
    id: "outstation-trips",
    title: "Outstation Round & One-Way Trips",
    shortDesc: "Comfortable intercity travel across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh & Goa.",
    fullDesc: "Turn long highway journeys into relaxing experiences. Travel on your own schedule with veteran highway drivers who know the cleanest highway food stops, scenic photography vistas, and safest ghat routes.",
    icon: "MapPin",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    features: [
      "Per km transparent billing with zero hidden surcharges",
      "Experienced highway chauffeurs with verified records",
      "Interstate permits and RTO compliance guaranteed",
      "Round trip and convenient one-way drop options",
      "Flexible halts for tea, coffee, and dining"
    ],
    suitableFor: ["Family vacations", "Temple pilgrimages", "Weekend escapes", "Emergency travel"],
    startingPrice: "₹13 / km"
  },
  {
    id: "local-rentals",
    title: "Hourly Local City Rentals",
    shortDesc: "Flexible 4-Hour / 8-Hour / 12-Hour city packages for meetings, shopping, and family functions.",
    fullDesc: "Navigate busy metropolitan traffic without the stress of parking, surge pricing, or hailing multiple cabs. Have an executive sedan or SUV at your beck and call throughout the day.",
    icon: "Clock",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    features: [
      "Packages: 4hr/40km, 8hr/80km, 12hr/120km",
      "Chauffeur handles all parking and waiting",
      "Freedom to visit multiple locations on your schedule",
      "Pristine AC cabin with mobile fast chargers"
    ],
    suitableFor: ["Corporate client meetings", "Wedding shopping & ceremonies", "Medical appointments"],
    startingPrice: "₹1,900 for 8hr/80km"
  },
  {
    id: "corporate-transportation",
    title: "Corporate & Executive Mobility",
    shortDesc: "Dedicated fleet management, VIP delegation transit, and monthly corporate employee commutes.",
    fullDesc: "Vijaya Travels is the trusted mobility partner to leading tech companies, MNCs, and executive consultancies across Bangalore and Karnataka. Benefit from centralized GST billing, digital log sheets, and SLA-backed punctuality.",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    features: [
      "Dedicated corporate relationship manager",
      "Itemized monthly billing with complete GST compliance",
      "English-speaking uniformed chauffeurs with NDA adherence",
      "Live GPS tracking portal with geofencing",
      "Fleet backup guarantee within 30 minutes"
    ],
    suitableFor: ["Tech park shuttles", "Visiting board members & investors", "Annual conferences"],
    startingPrice: "Custom Contract Rates"
  },
  {
    id: "wedding-events",
    title: "Luxury Wedding & Event Chauffeurs",
    shortDesc: "Immaculate premium convoys, vintage luxury cars, and guest bus logistics for celebrations.",
    fullDesc: "Add regal elegance to your special day. From Mercedes and Fortuners for the bridal entry to fleets of Innova Crystas and Tempo Travellers ensuring every guest is picked up and transported comfortably.",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    features: [
      "Uniformed chauffeurs in traditional or formal attire",
      "Flower decoration coordination available",
      "Dedicated on-ground coordinator for large venues",
      "Airport guest reception desk and luggage handling"
    ],
    suitableFor: ["Destination weddings", "Pre-wedding functions", "VIP guest transport"],
    startingPrice: "Custom Event Packages"
  },
  {
    id: "tour-packages",
    title: "Customized Holiday Tour Packages",
    shortDesc: "End-to-end bespoke road holiday itineraries across South India with trusted chauffeurs.",
    fullDesc: "Explore Coorg, Chikmagalur, Mysore, Hampi, Ooty, and Goa with curated routes. Our travel specialists design customized daily itineraries matching your family's pace and interests.",
    icon: "Compass",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80",
    features: [
      "Customizable stops and flexible timings",
      "Handpicked family-friendly verified restaurants",
      "Resort booking assistance upon request",
      "Transparent all-inclusive pricing with zero surprises"
    ],
    suitableFor: ["Family holidays", "Senior citizen pilgrimages", "Group offsites"],
    startingPrice: "From ₹9,800"
  }
];
