import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Calendar, Clock, Users, Car, ShieldCheck,
  Sparkles, ChevronRight, Star, ArrowRight,
  CheckCircle2, Compass, HeartHandshake, Zap, ChevronDown, Check,
  Navigation, Eye
} from 'lucide-react';
import { companyConfig } from '../data/config';
import { vehiclesData } from '../data/vehicles';
import { toursData } from '../data/tours';
import { servicesData } from '../data/services';
import { testimonialsData } from '../data/testimonials';
import { TripType } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Hero Search Panel State
  const [activeTripTab, setActiveTripTab] = useState<TripType>('outstation-round');
  const [pickup, setPickup] = useState('Bengaluru Airport (BLR)');
  const [drop, setDrop] = useState('Madikeri, Coorg');
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [date, setDate] = useState(tomorrow);
  const [passengers, setPassengers] = useState('4');

  // Fleet Section Category Tab
  const [fleetCategory, setFleetCategory] = useState<string>('all');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Live Availability Checker state
  const [availChecked, setAvailChecked] = useState(false);
  const [availDate, setAvailDate] = useState(tomorrow);
  const [availType, setAvailType] = useState('suv');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      tripType: activeTripTab,
      pickup,
      drop,
      date,
      passengers,
    }).toString();
    navigate(`/book?${query}`);
  };

  const filteredFleet = vehiclesData.filter((v) => {
    if (fleetCategory === 'all') return true;
    if (fleetCategory === 'suv') return v.category === 'suv';
    if (fleetCategory === 'sedan') return v.category === 'sedan';
    if (fleetCategory === 'tempo') return v.category === 'tempo';
    if (fleetCategory === 'bus') return v.category === 'minibus' || v.category === 'luxury-bus';
    return true;
  });

  const faqs = [
    {
      q: "What is included in outstation per-kilometer rates?",
      a: "Our rates include the dedicated vehicle, commercial fuel, chauffeur allowances, and bottled drinking water. Tolls, interstate permits, and parking are settled transparently via FASTag at actual receipts with zero markup."
    },
    {
      q: "Are the chauffeurs verified and trained for hill driving?",
      a: "Yes. Every chauffeur undergoes identity and criminal record verification, license validity checks, and specialized hill-driving orientation for Western Ghats and highway routes."
    },
    {
      q: "Can I cancel or reschedule my booking if plans change?",
      a: "Yes. We offer free cancellation up to 6 hours before scheduled departure. Any advance deposit is credited back directly to your payment source."
    },
    {
      q: "How does airport pickup meet-and-greet work at Kempegowda Airport (BLR)?",
      a: "Your chauffeur arrives 30 minutes prior to landing, tracks your flight for delays, and waits with a customized name paging board at the arrival gate. 45 minutes of complimentary post-landing wait time is included."
    },
    {
      q: "Do you provide corporate GST tax invoices for business reimbursement?",
      a: "Yes. All invoices include 15-digit GSTIN with complete HSN/SAC codes for seamless input tax credit (ITC) reconciliation for businesses and tech firms."
    }
  ];

  return (
    <div className="bg-[#0B1220] text-[#F7F5F0] overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION (85-90vh) */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-24 pb-28 px-4 sm:px-6 lg:px-8">
        {/* Luxury Backdrop Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Highway Transportation"
            className="w-full h-full object-cover object-center filter brightness-[0.34] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/65 to-[#0B1220]/40"></div>
        </div>

        <div className="relative z-10 max-w-5xl w-full mx-auto text-center mt-4">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827]/80 border border-[#C9A227]/30 text-[#C9A227] text-xs font-semibold tracking-widest uppercase mb-5 animate-fade-in backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chauffeur Mobility & Tour Charter</span>
          </div>

          {/* Main Cinematic Heading */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto uppercase">
            Travel Beyond Ordinary.
          </h1>

          {/* Subheading */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Premium cars, tempo travellers and buses for local, airport, corporate and outstation journeys.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="px-8 py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-[#C9A227]/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Book Your Journey</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </Link>
            <Link
              to="/fleet"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-[#C9A227]/40 backdrop-blur-md transition-all"
            >
              Explore Our Fleet
            </Link>
          </div>

          {/* Overlapping Booking Widget */}
          <div className="mt-12 max-w-4xl mx-auto bg-[#111827]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-5 sm:p-6 text-left">
            {/* Trip Type Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-white/10 scrollbar-none">
              {[
                { id: 'outstation-round', label: 'Outstation Round Trip' },
                { id: 'outstation-oneway', label: 'One Way Drop' },
                { id: 'local', label: 'Local Hourly' },
                { id: 'airport', label: 'Airport Transfer' },
                { id: 'corporate', label: 'Corporate' },
                { id: 'package', label: 'Tour Package' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTripTab(tab.id as TripType)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTripTab === tab.id
                      ? 'bg-[#C9A227] text-[#0B1220] font-bold shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Bengaluru Airport (BLR)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                  Drop Destination
                </label>
                <input
                  type="text"
                  required
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="e.g. Madikeri, Coorg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                  Travel Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  min={tomorrow}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/25 h-[42px] transition-all"
                >
                  <span>Search Vehicles</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Free Cancellation (up to 6 hrs)
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Live GPS Tracking
                </span>
              </div>
              <span className="text-[#C9A227] font-medium text-xs hidden sm:inline">
                Instant Confirmation Voucher
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS BAR (Benchmark Performance Indicators) */}
      <section className="bg-[#111827] py-12 border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {companyConfig.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#C9A227] font-heading">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US (4 Feature Cards with Whitespace) */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
            The Chauffeur Benchmark
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Why Discerning Travelers Choose Vijaya
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            We don't operate generic unvetted aggregator rides. Every vehicle in our fleet is owned, mechanically inspected, and captained by career highway chauffeurs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Safe & Verified Drivers",
              desc: "Verified highway chauffeurs with extensive driving pedigree. Courteous, well-groomed, and trained for Western Ghats routes.",
              icon: ShieldCheck,
            },
            {
              title: "Well-Maintained Fleet",
              desc: "Every vehicle completes a multi-point mechanical and sanitization audit before each departure. Deep-cleaned upholstery guaranteed.",
              icon: Car,
            },
            {
              title: "Transparent Pricing",
              desc: "Clear per-kilometer rate matrices with zero surprise surcharges or surge fees. FASTag tolls settled with official receipts.",
              icon: Sparkles,
            },
            {
              title: "24/7 Dedicated Support",
              desc: "Round-the-clock operations team continuously monitoring highway routes, weather advisories, and flight schedules.",
              icon: HeartHandshake,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[#111827] border border-white/10 hover:border-[#C9A227]/40 hover:bg-[#142038] transition-all duration-300 group shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227] mb-5 group-hover:scale-105 group-hover:bg-[#C9A227] group-hover:text-[#0B1220] transition-all">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VEHICLE FLEET SHOWCASE */}
      <section className="py-24 sm:py-28 bg-[#111827] border-t border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
                Fleet Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Choose Your Perfect Ride
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
                From executive sedans for solo business trips to 45-seater Volvo coaches for corporate events and destination weddings.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'suv', label: 'Innova & SUVs' },
                { id: 'tempo', label: 'Tempo & Urbania' },
                { id: 'sedan', label: 'Executive Sedans' },
                { id: 'bus', label: 'Buses & Coaches' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFleetCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    fleetCategory === cat.id
                      ? 'bg-[#C9A227] text-[#0B1220] font-bold shadow-sm'
                      : 'bg-[#0B1220] text-gray-300 hover:bg-white/5 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid (16:9 ratio, clean radius) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFleet.slice(0, 6).map((vehicle) => (
              <div
                key={vehicle.id}
                className="group rounded-xl overflow-hidden bg-[#0B1220] border border-white/10 hover:border-[#C9A227]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image with subtle zoom */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-black/50">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent"></div>
                    {vehicle.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black bg-[#C9A227] text-[#0B1220] shadow-md">
                        {vehicle.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#0B1220]/80 backdrop-blur-md text-[11px] font-bold text-[#C9A227] border border-[#C9A227]/30">
                      {vehicle.categoryLabel}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{vehicle.tagline}</p>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-xs text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>{vehicle.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>{vehicle.isAC ? 'Climate AC' : 'Non-AC'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-[#C9A227] fill-[#C9A227]" />
                        <span>{vehicle.rating} ({vehicle.reviewCount})</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="pt-1 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-gray-400">Starting from</span>
                        <div className="text-xl font-black text-white">
                          ₹{vehicle.rates.outstationPerKm}
                          <span className="text-xs font-normal text-gray-400"> / km</span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-400">
                        <div>Local: <strong className="text-white">₹{vehicle.rates.local8hr80km}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <Link
                    to={`/fleet/${vehicle.id}`}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold text-center border border-white/10 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Vehicle</span>
                  </Link>
                  <Link
                    to={`/book?vehicle=${vehicle.id}`}
                    className="flex-1 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] text-xs font-bold text-center uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View Entire Fleet CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#0B1220] hover:bg-[#152238] text-[#C9A227] border border-[#C9A227]/40 font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <span>Explore Entire Fleet Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SERVICES OVERVIEW */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
            Tailored Transportation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Comprehensive Chauffeur Services
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            From seamless airport terminal pickups to dedicated corporate shuttles and family vacation road trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="rounded-xl overflow-hidden bg-[#111827] border border-white/10 hover:border-[#C9A227]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/30 to-transparent"></div>
                  <span className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 rounded bg-[#0B1220]/90 text-[#C9A227] border border-[#C9A227]/30">
                    {svc.startingPrice}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{svc.shortDesc}</p>

                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    {svc.features.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/services#${svc.id}`}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-[#C9A227] hover:text-[#0B1220] text-gray-300 text-xs font-bold uppercase tracking-wider text-center border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED TOUR PACKAGES (Aspirational Destinational Layout) */}
      <section className="py-24 sm:py-28 bg-[#111827] border-t border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
                Curated Road Escapes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                Handcrafted Holiday Tours
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
                Experience South India's coffee hills, royal palaces, and pristine coastlines in the luxury of your private chauffeur-driven vehicle.
              </p>
            </div>

            <Link
              to="/tours"
              className="text-xs font-bold text-[#C9A227] hover:underline flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>Explore All Tour Packages</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toursData.slice(0, 3).map((tour) => (
              <div
                key={tour.id}
                className="group rounded-xl overflow-hidden bg-[#0B1220] border border-white/10 hover:border-[#C9A227]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={tour.heroImage}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#0B1220]/80 text-[#C9A227] border border-[#C9A227]/30">
                      {tour.duration}
                    </div>
                    <div className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                      {tour.destination}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-[#C9A227] transition-colors leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">{tour.tagline}</p>

                    <div className="pt-2 border-t border-white/10 space-y-1">
                      {tour.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-gray-300">
                          <Compass className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase">Starting Package</span>
                        <div className="text-xl font-black text-[#C9A227]">
                          ₹{tour.startingPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                      {tour.discountedFrom && (
                        <span className="text-xs text-gray-500 line-through">
                          ₹{tour.discountedFrom.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <Link
                    to={`/tours/${tour.id}`}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold text-center border border-white/10"
                  >
                    View Tour
                  </Link>
                  <Link
                    to={`/book?tripType=package&drop=${encodeURIComponent(tour.destination)}`}
                    className="flex-1 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] text-xs font-bold uppercase tracking-wider text-center"
                  >
                    Book Tour
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REALISTIC TESTIMONIALS (Clearly Framed Customer Feedback) */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
            Guest Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Words from Our Travellers
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Representative reviews from corporate executives and family holidaymakers traveling across Karnataka and South India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-xl bg-[#111827] border border-white/10 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#C9A227]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A227]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-bold text-white">{item.customerName}</h4>
                <p className="text-[11px] text-gray-400">{item.location} • {item.vehicleUsed}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-24 bg-[#111827] border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#0B1220] border border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#C9A227]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C9A227] transition-transform duration-300 shrink-0 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONCIERGE CTA */}
      <section className="py-20 bg-[#0B1220] border-t border-[#C9A227]/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
            Concierge Support
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Plan Your Next Journey?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Reserve online with instant confirmation voucher, or contact our 24/7 chauffeur dispatch desk directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/book"
              className="px-8 py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Reserve Vehicle
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider border border-white/20"
            >
              Contact Dispatch Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
