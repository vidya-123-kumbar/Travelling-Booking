import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Users, Car, Shield, ShieldCheck, Award, Star, Fuel, Check,
  ChevronRight, Calendar, ArrowLeft, Phone, MessageCircle, MapPin,
  Sparkles, CheckCircle2, Clock
} from 'lucide-react';
import { vehiclesData } from '../data/vehicles';
import { companyConfig } from '../data/config';

export const VehicleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const vehicle = vehiclesData.find((v) => v.id === id) || vehiclesData[0];
  const [activeImage, setActiveImage] = useState<string>(vehicle.gallery[0] || vehicle.image);

  // Quick Availability widget on detail page
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [checkDate, setCheckDate] = useState(tomorrow);
  const [checkPickup, setCheckPickup] = useState('Bengaluru');
  const [checkDrop, setCheckDrop] = useState('Coorg / Ooty / Mysore');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAvailable(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/fleet" className="hover:text-white">Fleet</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#C9A227] font-semibold">{vehicle.name}</span>
        </div>

        {/* Top Split View: Gallery & Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[340px] sm:h-[450px] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
              <img
                src={activeImage}
                alt={vehicle.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent"></div>
              {vehicle.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#C9A227] text-[#0B1220] shadow-md">
                  {vehicle.badge}
                </div>
              )}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block">
                  {vehicle.categoryLabel}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {vehicle.name}
                </h1>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {vehicle.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img ? 'border-[#C9A227] scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Rate Matrix & Booking Trigger Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#111827] rounded-xl border border-[#C9A227]/30 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-1.5 text-[#C9A227]">
                    <Star className="w-4 h-4 fill-[#C9A227]" />
                    <span className="font-bold text-white text-sm">{vehicle.rating} / 5.0</span>
                    <span className="text-xs text-gray-400">({vehicle.reviewCount} verified reviews)</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready to Dispatch
                </span>
              </div>

              {/* Rate Card Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Official Rate Breakdown
                </h3>
                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#0B1220] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Outstation Intercity Travel</span>
                      <span className="text-gray-400 text-[11px]">Minimum {vehicle.rates.minKmPerDay} km / day billed</span>
                    </div>
                    <span className="text-base font-extrabold text-[#C9A227]">₹{vehicle.rates.outstationPerKm} / km</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0B1220] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Local City 8 Hours / 80 Km</span>
                      <span className="text-gray-400 text-[11px]">Extra ₹{vehicle.rates.extraKmRate}/km, ₹{vehicle.rates.extraHourRate}/hr</span>
                    </div>
                    <span className="text-base font-extrabold text-white">₹{vehicle.rates.local8hr80km}</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0B1220] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Airport Transfer (BLR Airport)</span>
                      <span className="text-gray-400 text-[11px]">Includes flight tracking & name board</span>
                    </div>
                    <span className="text-base font-extrabold text-white">₹{vehicle.rates.airportFlatRate}</span>
                  </div>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-[#0B1220] border border-white/5">
                  <span className="text-gray-400 block text-[11px] uppercase">Capacity</span>
                  <strong className="text-white text-sm">{vehicle.seats} Seats</strong>
                </div>
                <div className="p-3 rounded-lg bg-[#0B1220] border border-white/5">
                  <span className="text-gray-400 block text-[11px] uppercase">Luggage</span>
                  <strong className="text-white text-sm">{vehicle.luggage} Bags</strong>
                </div>
                <div className="p-3 rounded-lg bg-[#0B1220] border border-white/5">
                  <span className="text-gray-400 block text-[11px] uppercase">AC Cooling</span>
                  <strong className="text-white text-sm">{vehicle.isAC ? 'Climate AC' : 'Non-AC'}</strong>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                to={`/book?vehicle=${vehicle.id}`}
                className="w-full py-3.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md shadow-[#C9A227]/20 hover:scale-[1.01] transition-all"
              >
                <span>Book This {vehicle.name}</span>
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </Link>

              <div className="flex gap-2">
                <a
                  href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                  Call Chauffeur Desk
                </a>
                <a
                  href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hi,%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/30 flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Features and Amenities (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-8 space-y-3">
              <h3 className="text-lg font-bold text-white font-serif">Vehicle Overview & Cabin Features</h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            {/* Included Amenities Checklist */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white font-serif">Cabin Amenities & Equipment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-300">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0B1220] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0B1220] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complimentary Sealed Mineral Water</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0B1220] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GPS Tracking & Speed Governed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Availability Widget (1 Col) */}
          <div className="bg-[#111827] rounded-xl border border-[#C9A227]/20 p-6 space-y-5 h-fit shadow-xl">
            <div className="flex items-center gap-2 text-white font-bold text-base pb-3 border-b border-white/10">
              <Calendar className="w-4 h-4 text-[#C9A227]" />
              <span>Check Live Schedule</span>
            </div>

            <form onSubmit={handleCheckAvailability} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-semibold uppercase text-[11px]">Travel Date</label>
                <input
                  type="date"
                  value={checkDate}
                  min={tomorrow}
                  onChange={(e) => setCheckDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-semibold uppercase text-[11px]">Pickup City</label>
                <input
                  type="text"
                  value={checkPickup}
                  onChange={(e) => setCheckPickup(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-semibold uppercase text-[11px]">Destination</label>
                <input
                  type="text"
                  value={checkDrop}
                  onChange={(e) => setCheckDrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider"
              >
                Check Date Availability
              </button>
            </form>

            {isAvailable !== null && (
              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-2 animate-fade-in text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Check className="w-4 h-4" />
                  <span>Available on {checkDate}</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  This vehicle is positioned at Bengaluru Central Hub and can be mobilized for your itinerary.
                </p>
                <Link
                  to={`/book?vehicle=${vehicle.id}&date=${checkDate}&pickup=${encodeURIComponent(checkPickup)}&drop=${encodeURIComponent(checkDrop)}`}
                  className="block w-full text-center py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#0B1220] font-bold text-xs uppercase tracking-wider mt-2 transition-colors"
                >
                  Proceed with Reservation
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
