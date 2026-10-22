import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Car, Shield, Star, Filter, SlidersHorizontal, ArrowUpDown,
  Check, Eye, ChevronRight, Fuel, Sparkles
} from 'lucide-react';
import { vehiclesData } from '../data/vehicles';
import { Vehicle } from '../types';

export const FleetPage: React.FC = () => {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minSeats, setMinSeats] = useState<number>(0);
  const [acFilter, setAcFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);

  // Apply filtering
  const filteredVehicles = vehiclesData.filter((v) => {
    if (selectedCategory !== 'all' && v.category !== selectedCategory) return false;
    if (minSeats > 0 && v.seats < minSeats) return false;
    if (acFilter === 'ac' && !v.isAC) return false;
    return true;
  });

  // Apply sorting
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.rates.outstationPerKm - b.rates.outstationPerKm;
    }
    if (sortBy === 'price-high') {
      return b.rates.outstationPerKm - a.rates.outstationPerKm;
    }
    if (sortBy === 'seats') {
      return b.seats - a.seats;
    }
    // Default recommended
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#C9A227] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Spotless & Inspected Fleet
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Vehicle Fleet
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Compare rates, seating configurations and luxury amenities across our fleet of executive sedans, Innovas, Force Urbanias and multi-axle coaches.
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="bg-[#111827] rounded-xl border border-white/10 p-5 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'sedan', label: 'Sedan (4+1)' },
                { id: 'suv', label: 'SUV & Innova (7+1)' },
                { id: 'tempo', label: 'Tempo & Urbania (10-17)' },
                { id: 'minibus', label: 'Mini Bus (26)' },
                { id: 'luxury-bus', label: 'Volvo Coach (45+)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-[#C9A227] text-[#0B1220] font-bold shadow-md'
                      : 'bg-[#0B1220] text-gray-300 hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort & Secondary Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="uppercase text-[11px] font-bold">Seats:</span>
                <select
                  value={minSeats}
                  onChange={(e) => setMinSeats(parseInt(e.target.value, 10))}
                  className="bg-[#0B1220] border border-white/10 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C9A227]"
                >
                  <option value={0}>Any Seats</option>
                  <option value={4}>4+ Seats</option>
                  <option value={7}>7+ Seats</option>
                  <option value={10}>10+ Seats</option>
                  <option value={20}>20+ Seats</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C9A227]" />
                <span className="uppercase text-[11px] font-bold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0B1220] border border-white/10 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="seats">Max Capacity</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-6 px-1">
          <span>Showing <strong>{sortedVehicles.length}</strong> verified commercial vehicles</span>
          <span className="text-[#C9A227] font-medium">All vehicles include background-verified highway chauffeur</span>
        </div>

        {/* Fleet Grid (Automotive Card standard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group rounded-xl overflow-hidden bg-[#111827] border border-white/10 hover:border-[#C9A227]/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 16:9 Image with subtle zoom */}
                <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                  {vehicle.badge && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black bg-[#C9A227] text-[#0B1220] shadow-md">
                      {vehicle.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-[#0B1220]/80 backdrop-blur-md text-[11px] font-bold text-[#C9A227] border border-[#C9A227]/30">
                    {vehicle.categoryLabel}
                  </span>
                </div>

                {/* Below image details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#C9A227] transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{vehicle.tagline}</p>
                  </div>

                  {/* Specs: Seats, AC, Luggage */}
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
                      <Fuel className="w-3.5 h-3.5 text-[#C9A227]" />
                      <span>{vehicle.luggage} Bags</span>
                    </div>
                  </div>

                  {/* Pricing Matrix */}
                  <div className="pt-1 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase">Starting from</span>
                      <div className="text-xl font-black text-white">
                        ₹{vehicle.rates.outstationPerKm}
                        <span className="text-xs font-normal text-gray-400"> / km</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <div>Local: <strong className="text-white">₹{vehicle.rates.local8hr80km}</strong></div>
                      <div>Airport: <strong className="text-white">₹{vehicle.rates.airportFlatRate}</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions: VIEW VEHICLE & BOOK */}
              <div className="p-5 pt-0 flex gap-2">
                <Link
                  to={`/fleet/${vehicle.id}`}
                  className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold uppercase tracking-wider text-center border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  VIEW VEHICLE
                </Link>
                <Link
                  to={`/book?vehicle=${vehicle.id}`}
                  className="flex-1 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 shadow-md shadow-[#C9A227]/20 transition-all"
                >
                  <span>BOOK NOW</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
