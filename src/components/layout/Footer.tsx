import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Award, Heart, MessageCircle } from 'lucide-react';
import { companyConfig } from '../../data/config';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070D18] text-gray-300 border-t border-[#C9A227]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C9A227] to-[#8E7017] p-0.5">
                <div className="w-full h-full bg-[#0B1220] rounded-[7px] flex items-center justify-center">
                  <span className="font-heading font-black text-xl text-[#C9A227]">V</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold tracking-wider text-xl text-white">
                  VIJAYA TRAVELS
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#C9A227] font-semibold uppercase">
                  LUXURY CHAUFFEUR SERVICES
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              South India's most trusted executive chauffeur and fleet rental company. Providing immaculate sedans, Innova Crystas, luxury Force Urbanias, and coach buses for discerning corporate and leisure travellers.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
                Govt. RTO Registered
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10">
                <Award className="w-3.5 h-3.5 text-[#C9A227]" />
                GST Compliant
              </span>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-400 font-semibold mb-2">Branch Hubs:</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {companyConfig.branches.map((b) => (
                  <span key={b.city} className="px-2.5 py-1 rounded-md bg-[#111A2E] text-gray-300 border border-white/5">
                    {b.city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C9A227]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/book" className="hover:text-[#C9A227] transition-colors">Book a Vehicle</Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-[#C9A227] transition-colors">Our Vehicle Fleet</Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-[#C9A227] transition-colors">Tour Packages</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C9A227] transition-colors">Services Overview</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9A227] transition-colors">About Us & Safety</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#C9A227] transition-colors">Customer Dashboard</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#C9A227] transition-colors">Admin Control Desk</Link>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C9A227]">
              Holiday Tours
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tours/coorg-escape" className="hover:text-[#C9A227] transition-colors">Coorg Highlands (3D/2N)</Link>
              </li>
              <li>
                <Link to="/tours/chikmagalur-getaway" className="hover:text-[#C9A227] transition-colors">Chikmagalur Coffee Trail</Link>
              </li>
              <li>
                <Link to="/tours/mysore-heritage-trip" className="hover:text-[#C9A227] transition-colors">Royal Mysore & Srirangapatna</Link>
              </li>
              <li>
                <Link to="/tours/hampi-heritage-tour" className="hover:text-[#C9A227] transition-colors">Hampi UNESCO Heritage</Link>
              </li>
              <li>
                <Link to="/tours/goa-coastal-cruise" className="hover:text-[#C9A227] transition-colors">Goa Coastal Highway Trip</Link>
              </li>
              <li>
                <Link to="/tours/ooty-wayanad-circuit" className="hover:text-[#C9A227] transition-colors">Ooty & Wayanad Rainforest</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#C9A227]">
              24/7 Helpline
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#C9A227] mt-0.5 group-hover:scale-110 transition-transform" />
                <span>{companyConfig.phone}</span>
              </a>
              <a
                href={`https://wa.me/${companyConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-[#25D366] hover:underline"
              >
                <MessageCircle className="w-4 h-4 mt-0.5" />
                <span>WhatsApp Chauffeur Desk</span>
              </a>
              <a
                href={`mailto:${companyConfig.email}`}
                className="flex items-start gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C9A227] mt-0.5" />
                <span>{companyConfig.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-xs text-gray-400">
                <MapPin className="w-4 h-4 text-[#C9A227] mt-0.5 shrink-0" />
                <span>{companyConfig.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>24x7 Operations & Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {companyConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#C9A227]">Safety Policy</Link>
            <Link to="/about" className="hover:text-[#C9A227]">Terms & Conditions</Link>
            <Link to="/about" className="hover:text-[#C9A227]">Cancellation & Refund</Link>
            <Link to="/contact" className="hover:text-[#C9A227]">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
