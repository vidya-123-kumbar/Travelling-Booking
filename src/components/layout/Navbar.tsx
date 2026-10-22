import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Shield, User, ChevronRight } from 'lucide-react';
import { companyConfig } from '../../data/config';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Tours', path: '/tours' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
          isScrolled
            ? 'bg-[#0B1220]/95 backdrop-blur-md py-3.5 border-b border-white/10 shadow-2xl'
            : 'bg-gradient-to-b from-[#0B1220]/90 via-[#0B1220]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-[#111827] border border-[#C9A227]/40 p-0.5 shadow-md group-hover:border-[#C9A227] transition-all">
                <div className="w-full h-full bg-[#0B1220] rounded-[9px] flex items-center justify-center">
                  <span className="font-heading font-black text-xl text-[#C9A227] tracking-tight">V</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold tracking-wider text-lg sm:text-xl text-white group-hover:text-[#C9A227] transition-colors leading-none">
                  VIJAYA
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#C9A227] font-semibold uppercase mt-0.5">
                  TRAVELS & FLEET
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive(link.path)
                      ? 'text-[#C9A227] bg-[#C9A227]/10 border border-[#C9A227]/30 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Quick Actions (Right) */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Quick Action */}
              <a
                href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hello%20Vijaya%20Travels,%20I%20would%20like%20to%20inquire%20about%20vehicle%20booking.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>

              {/* Call Helpline */}
              <a
                href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 hover:border-[#C9A227]/40 transition-colors"
                title="Call 24/7 Helpline"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                <span className="hidden xl:inline">{companyConfig.phone}</span>
                <span className="xl:hidden">Call</span>
              </a>

              {/* User Dashboard */}
              <Link
                to="/dashboard"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#C9A227] border border-white/10"
                title="My Trips & Bookings"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Primary Book Now CTA */}
              <Link
                to="/book"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] shadow-md shadow-[#C9A227]/20 active:scale-95 transition-all"
              >
                <span>Book Now</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/book"
                className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md bg-[#C9A227] text-[#0B1220]"
              >
                Book Now
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#C9A227]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0B1220]/95 backdrop-blur-xl pt-20 px-6 pb-8 flex flex-col justify-between overflow-y-auto animate-fade-in no-print">
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-widest text-[#C9A227] font-bold px-3 pt-2">
              Navigation
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-[#C9A227]/15 text-[#C9A227] border border-[#C9A227]/30'
                    : 'text-gray-200 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-white/10 space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-200 hover:bg-white/5"
              >
                <User className="w-5 h-5 text-[#C9A227]" />
                <div>
                  <div className="font-semibold text-sm">Customer Dashboard</div>
                  <div className="text-xs text-gray-400">View upcoming & past trips</div>
                </div>
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-200 hover:bg-white/5"
              >
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-sm">Admin Control Center</div>
                  <div className="text-xs text-gray-400">Manage fleet & bookings</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Bottom Contact Actions */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <a
              href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 text-white font-semibold text-sm"
            >
              <Phone className="w-4 h-4 text-[#C9A227]" />
              Call {companyConfig.phone}
            </a>
            <a
              href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hello%20Vijaya%20Travels,%20I%20would%20like%20to%20book%20a%20vehicle.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-[#0B1220] font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
};
