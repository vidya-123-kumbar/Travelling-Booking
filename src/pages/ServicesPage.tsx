import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plane, MapPin, Clock, Briefcase, Heart, Compass, Check,
  ChevronRight, Phone, MessageCircle, Sparkles, Shield
} from 'lucide-react';
import { servicesData } from '../data/services';
import { companyConfig } from '../data/config';

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            End-to-End Mobility Solutions
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Chauffeur & Fleet Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Whether you need a punctual airport transfer at 3 AM or an entire fleet of 20 luxury vehicles for an international conference, Vijaya Travels delivers flawless execution.
          </p>
        </div>

        {/* Services In-Depth List */}
        <div className="space-y-10">
          {servicesData.map((svc, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="bg-[#111827] rounded-xl border border-white/10 hover:border-[#C9A227]/30 transition-all p-6 sm:p-10 shadow-xl"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image Column (5 Cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent"></div>
                      <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-[#0B1220]/90 text-xs font-bold text-[#C9A227] border border-[#C9A227]/30">
                        {svc.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Text Column (7 Cols) */}
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-wider">
                        Premium Service Division
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                        {svc.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {svc.fullDesc}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {svc.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Suitable for chips */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-gray-400 font-semibold">Recommended for:</span>
                      {svc.suitableFor.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-[#0B1220] text-gray-300 border border-white/5 text-[11px]">
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/book?tripType=${svc.id === 'airport-transfers' ? 'airport' : svc.id === 'local-rentals' ? 'local' : 'outstation-round'}`}
                        className="px-6 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#d4ad2e] text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#C9A227]/20 transition-all"
                      >
                        <span>Book {svc.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>

                      <Link
                        to={`/contact?service=${svc.id}`}
                        className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-colors"
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
