import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { companyConfig } from '../../data/config';

export const FloatingActions: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const location = useLocation();

  // Hide on booking page to avoid overlapping the sticky vehicle bar and bottom actions
  const isBookingFlow = location.pathname === '/book';

  return (
    <div className="no-print">
      {/* Floating Buttons (Desktop & Tablet) */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3.5 hidden sm:flex">
        {/* WhatsApp Floating Button */}
        <div className="relative group">
          <a
            href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hello%20Vijaya%20Travels,%20I%20would%20like%20to%20check%20vehicle%20availability.`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white/20"
            aria-label="Chat with Chauffeur Dispatch on WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A227] rounded-full border-2 border-[#0B1220] flex items-center justify-center text-[9px] font-bold text-[#0B1220]">
              1
            </span>
          </a>
          
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute right-16 top-2.5 bg-[#0B1220] text-white text-xs py-1.5 px-3 rounded-lg border border-[#C9A227]/40 shadow-2xl whitespace-nowrap animate-fade-in font-medium">
              Chat 24/7 on WhatsApp
            </div>
          )}
        </div>

        {/* Quick Call Button */}
        <a
          href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
          className="w-12 h-12 rounded-full bg-[#0E1729] text-[#C9A227] flex items-center justify-center shadow-xl border border-[#C9A227]/40 hover:bg-[#C9A227] hover:text-[#0B1220] hover:scale-105 active:scale-95 transition-all group"
          aria-label="Call Vijaya Travels Dispatch Desk"
          title={`Call ${companyConfig.phone}`}
        >
          <Phone className="w-5 h-5 group-hover:animate-bounce-subtle" />
        </a>
      </div>

      {/* Sticky Bottom Bar on Mobile (Only when NOT on /book page so /book has its own dedicated sticky bar) */}
      {!isBookingFlow && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B1220]/95 backdrop-blur-lg border-t border-[#C9A227]/25 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <a
            href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/10"
          >
            <Phone className="w-4 h-4 text-[#C9A227]" />
            Call Chauffeur
          </a>

          <a
            href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hello%20Vijaya%20Travels,%20I%20would%20like%20to%20book%20a%20vehicle.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <Link
            to="/book"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#E3BD46] text-[#0B1220] font-bold text-xs shadow-md shadow-[#C9A227]/30"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Now
          </Link>
        </div>
      )}
    </div>
  );
};
