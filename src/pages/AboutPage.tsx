import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Award, HeartHandshake, Compass, Users, Check,
  ChevronRight, Sparkles, Building2, MapPin
} from 'lucide-react';
import { companyConfig } from '../data/config';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Our Heritage & Standards
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Setting the Benchmark in South Indian Travel
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Founded with a singular conviction: highway travel in India should be serene, secure, and impeccably managed.
          </p>
        </div>

        {/* Stats Grid (Clarified as Company Benchmarks) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {companyConfig.stats.map((s, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-[#111827] border border-white/10 text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#C9A227]">{s.value}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{s.label}</div>
              <div className="text-[11px] text-gray-400">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Brand Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-widest">
              The Chauffeur Difference
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              We Are Not An App. We Are True Chauffeur Specialists.
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              In an era dominated by anonymous gig-economy cab apps with unverified drivers and fluctuating surge rates, Vijaya Travels preserves the timeless elegance of dedicated private chauffeur transportation.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Every driver on our roster is personally interviewed, background-verified, and trained extensively in customer hospitality, ghat navigation, and emergency first aid.
            </p>

            <div className="pt-2 space-y-3">
              {[
                "100% Commercial RTO Tourist Permit compliance across 5 southern states",
                "Speed-limited vehicles preventing dangerous highway speeding",
                "Spotless white-glove sanitized cabins with daily air freshening",
                "Zero surge pricing or last-minute cancellation by drivers",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Check className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
              alt="Vijaya Travels Chauffeur Standards"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0B1220]/90 backdrop-blur-md border border-white/10 text-xs">
              <span className="text-[#C9A227] font-bold block mb-1 uppercase tracking-wider">Fleet Maintenance Protocol</span>
              <p className="text-gray-300">
                Every vehicle completes a mandatory 40-point technical checkup before departing on long outstation tours.
              </p>
            </div>
          </div>
        </div>

        {/* Chauffeur Code of Conduct */}
        <div className="bg-[#111827] rounded-xl border border-white/10 p-8 sm:p-12 mb-20 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold text-[#C9A227] uppercase tracking-widest">
              Hospitality & Ethics
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              The Chauffeur Code of Conduct
            </h3>
            <p className="text-xs text-gray-400">
              When you travel with Vijaya Travels, your chauffeur acts as a polite guardian of your comfort and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-[#0B1220] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Defensive Highway Driving</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Strict adherence to highway speed limits (80 km/h on expressways), zero aggressive tailgating, and scheduled rest intervals every 3 hours.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0B1220] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Polite Chauffeur Etiquette</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Courteous, neatly uniformed, bilingual (Kannada, Hindi, English, Tamil) drivers who respect passenger privacy and family discretion.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#0B1220] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#C9A227]/10 text-[#C9A227] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Local Route Expertise</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Deep mastery over hairpin bends, Western Ghat shortcuts, scenic stops, hygienic family highway restaurants, and clean restrooms.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-xl bg-gradient-to-r from-[#111827] to-[#1c273e] border border-[#C9A227]/30 text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Experience the Vijaya Travels Standard
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Book your next outstation family holiday or corporate retreat with Bengaluru's most trusted chauffeur team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="px-8 py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#d4ad2e] text-[#0B1220] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C9A227]/20 transition-all"
            >
              Book Your Journey
            </Link>
            <Link
              to="/fleet"
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-wider border border-white/10 transition-colors"
            >
              Explore Our Fleet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
