import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Calendar, Clock, ChevronRight, Check, X,
  Compass, ShieldCheck, Star, Users, Phone, MessageCircle, Sparkles
} from 'lucide-react';
import { toursData } from '../data/tours';
import { companyConfig } from '../data/config';

export const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tour = toursData.find((t) => t.id === id) || toursData[0];

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <Link to="/tours" className="hover:text-white transition-colors">Tours</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[#C9A227] font-semibold">{tour.title}</span>
        </div>

        {/* Hero Banner */}
        <div className="relative h-[340px] sm:h-[440px] rounded-xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-transparent"></div>
          
          <div className="absolute bottom-8 left-6 sm:left-10 right-6 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#C9A227] text-[#0B1220] uppercase tracking-wider">
                {tour.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white border border-white/20">
                {tour.duration}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Dedicated Chauffeur Charter
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {tour.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              {tour.tagline}
            </p>
          </div>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 Cols): Itinerary, Inclusions */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tour Highlights */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C9A227]" />
                Key Tour Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-300">
                {tour.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0B1220] border border-white/5">
                    <Check className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#C9A227]" />
                  Day-by-Day Travel Itinerary
                </h3>
                <span className="text-xs text-gray-400">Paced for comfort & sightseeing</span>
              </div>

              <div className="space-y-4">
                {tour.itinerary.map((item) => (
                  <div
                    key={item.day}
                    className="p-5 rounded-lg bg-[#0B1220] border border-white/5 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-[#C9A227] text-[#0B1220] font-black text-xs flex items-center justify-center">
                        D{item.day}
                      </div>
                      <h4 className="text-base font-bold text-white">{item.title}</h4>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-11">
                      {item.description}
                    </p>

                    <div className="pl-11 flex flex-wrap gap-2 pt-1">
                      {item.activities.map((act, idx) => (
                        <span key={idx} className="text-[11px] px-2.5 py-1 rounded bg-[#111827] text-[#C9A227] border border-[#C9A227]/20 font-medium">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#111827] rounded-xl border border-emerald-500/20 p-6 space-y-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  What Is Included
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  {tour.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#111827] rounded-xl border border-red-500/20 p-6 space-y-4">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <X className="w-4 h-4" />
                  What Is Excluded
                </h3>
                <ul className="space-y-2.5 text-xs text-gray-300">
                  {tour.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-serif font-bold text-white">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {tour.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#0B1220] border border-white/5 space-y-1.5">
                    <h5 className="font-bold text-xs sm:text-sm text-white">{faq.question}</h5>
                    <p className="text-xs text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 Cols): Pricing & Booking Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111827] rounded-xl border border-[#C9A227]/30 p-6 space-y-6 sticky top-28 shadow-2xl">
              <div>
                <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold block">All-Inclusive Tour Charter</span>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-3xl font-black text-[#C9A227]">
                    ₹{tour.startingPrice.toLocaleString('en-IN')}
                  </span>
                  {tour.discountedFrom && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{tour.discountedFrom.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
                  * Rate includes vehicle charter for {tour.duration}, chauffeur batta, highway tolls, and state permits.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0B1220] border border-white/5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <strong className="text-white">{tour.duration}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Starting City:</span>
                  <strong className="text-white">Bengaluru (Doorstep)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Destination:</span>
                  <strong className="text-white">{tour.destination}</strong>
                </div>
              </div>

              <Link
                to={`/book?tripType=package&drop=${encodeURIComponent(tour.destination)}`}
                className="w-full py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#d4ad2e] text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#C9A227]/20 transition-all"
              >
                <span>Book This Tour Package</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <a
                  href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                  Call Tour Specialist
                </a>
                <a
                  href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hi,%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20package.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Customize on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
