import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2,
  Building, Sparkles, Navigation, Info
} from 'lucide-react';
import { companyConfig } from '../data/config';
import { saveInquiry } from '../services/storage';
import { useToast } from '../components/common/Toast';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(searchParams.get('service') || 'outstation-trips');
  const [travelDate, setTravelDate] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    const inquiryId = `INQ-${Math.floor(100 + Math.random() * 900)}`;
    saveInquiry({
      id: inquiryId,
      createdAt: new Date().toISOString(),
      fullName,
      phone,
      email,
      service,
      travelDate,
      message,
      status: 'New'
    });

    setIsSubmitted(true);
    showToast('Inquiry sent! Our dispatch desk will contact you within 15 minutes.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            24/7 Chauffeur Dispatch Desk
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Contact Vijaya Travels
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Have questions regarding vehicle suitability, multi-day interstate itineraries, or corporate contracts? Our travel desk is always at your service.
          </p>
        </div>

        {/* 2-Column Split: Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left: Contact Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 space-y-5 shadow-xl">
              <h3 className="text-lg font-serif font-bold text-white">Direct Connect Lines</h3>

              <div className="space-y-3.5">
                <a
                  href={`tel:${companyConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#0B1220] hover:bg-white/5 border border-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">24/7 Helpline & Dispatch</span>
                    <strong className="text-white text-sm tracking-wide">{companyConfig.phone}</strong>
                    <div className="text-[11px] text-[#C9A227] mt-0.5">Alt: {companyConfig.alternatePhone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hello%20Vijaya%20Travels,%20I%20have%20an%20inquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#25D366] block font-bold uppercase tracking-wider">Instant WhatsApp Desk</span>
                    <strong className="text-white text-sm tracking-wide">{companyConfig.whatsappDisplay}</strong>
                    <div className="text-[11px] text-gray-400 mt-0.5">Average reply time: under 3 mins</div>
                  </div>
                </a>

                <a
                  href={`mailto:${companyConfig.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#0B1220] hover:bg-white/5 border border-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider">Corporate & Booking Email</span>
                    <strong className="text-white text-sm">{companyConfig.email}</strong>
                    <div className="text-[11px] text-gray-400 mt-0.5">{companyConfig.supportEmail}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Headquarters & Hours */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 space-y-4 shadow-xl">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A227] shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Central Operations Headquarters</h4>
                  <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                    {companyConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs text-gray-300">
                <Clock className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span><strong>Business Hours:</strong> {companyConfig.workingHours}</span>
              </div>
            </div>

            {/* Notice regarding demo/placeholder */}
            <div className="p-4 rounded-xl bg-[#0B1220] border border-white/5 flex items-start gap-3 text-xs text-gray-400">
              <Info className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
              <p>
                <strong>Business Note:</strong> Dispatch hours and phone numbers reflect our active customer service center in Bengaluru, Karnataka.
              </p>
            </div>
          </div>

          {/* Right: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Enquiry Received Successfully!</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your requirement has been assigned to our senior tour coordinator. We will contact you at <strong>{phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#d4ad2e] text-[#0B1220] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">Send Us An Inquiry</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Fill in your details and we will provide a comprehensive quotation with all taxes included.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anand Murthy"
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98450 12345"
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Service Requirement
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] text-xs sm:text-sm"
                    >
                      <option value="outstation-trips">Outstation Chauffeur Drive</option>
                      <option value="local-rentals">Local 8h/80km Charter</option>
                      <option value="airport-transfers">KIA Bengaluru Airport Transfer</option>
                      <option value="corporate-travel">Corporate Employee Transport</option>
                      <option value="wedding-transport">Wedding Fleet Convoys</option>
                      <option value="custom-tour">Custom Holiday Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Anticipated Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Requirements & Itinerary Notes
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details such as pickup locality, number of passengers, luggage quantity, or specific vehicle preferences (e.g. Innova Hycross / Tempo 12-Seater)..."
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-xs sm:text-sm leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#d4ad2e] text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#C9A227]/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry For Instant Quote</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
