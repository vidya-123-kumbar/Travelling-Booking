import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, MapPin, Calendar, Clock, ChevronRight, Check, Sparkles,
  ArrowRight
} from 'lucide-react';
import { toursData } from '../data/tours';

export const ToursPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTours = toursData.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated South Indian Holidays
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Chauffeur-Driven Tour Packages
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Enjoy complete peace of mind. Every holiday package includes dedicated vehicle charter, seasoned highway chauffeur, toll & interstate permits, and flexible daily sightseeing.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'hill station', label: 'Hill Stations (Coorg & Ooty)' },
              { id: 'heritage', label: 'UNESCO Heritage & Palaces' },
              { id: 'coastal', label: 'Coastal Highway (Goa)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#C9A227] text-[#0B1220] shadow-md shadow-[#C9A227]/25 font-bold'
                    : 'bg-[#111827] text-gray-300 hover:bg-white/5 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="group rounded-xl overflow-hidden bg-[#111827] border border-white/10 hover:border-[#C9A227]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#0B1220]/90 text-[#C9A227] border border-[#C9A227]/30 backdrop-blur-md">
                    {tour.duration}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 px-3 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>{tour.destination}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-wider">
                      {tour.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#C9A227] transition-colors mt-1 leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {tour.tagline}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-white/10">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tour Highlights</h4>
                    {tour.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-semibold">Starting From</span>
                      <div className="text-2xl font-black text-[#C9A227]">
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

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <Link
                  to={`/tours/${tour.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold uppercase tracking-wider text-center border border-white/10 transition-colors"
                >
                  View Tour
                </Link>
                <Link
                  to={`/book?tripType=package&drop=${encodeURIComponent(tour.destination)}`}
                  className="flex-1 py-2.5 rounded-xl bg-[#C9A227] text-[#0B1220] hover:bg-[#d4ad2e] text-xs font-bold uppercase tracking-wider text-center shadow-lg shadow-[#C9A227]/20 flex items-center justify-center gap-1 transition-all"
                >
                  <span>Book Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tour Box */}
        <div className="mt-16 p-8 rounded-xl bg-[#111827] border border-[#C9A227]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white">Need a Custom Pan-South India Itinerary?</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
              Travelling with a 20+ member family clan, college batch, or corporate executive delegation? Our tour planning specialists design bespoke multi-city itineraries with custom hotel and coach bookings.
            </p>
          </div>
          <Link
            to="/contact?service=custom-tour"
            className="px-8 py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#d4ad2e] text-[#0B1220] font-bold text-xs uppercase tracking-wider whitespace-nowrap shadow-lg transition-colors"
          >
            Request Custom Quotation
          </Link>
        </div>
      </div>
    </div>
  );
};
