import React from 'react';
import { MapPin, Navigation, Compass, Shield } from 'lucide-react';

interface RouteMapVisualizerProps {
  pickup: string;
  drop: string;
  distanceKm: number;
  duration: string;
  tripType: string;
}

export const RouteMapVisualizer: React.FC<RouteMapVisualizerProps> = ({
  pickup,
  drop,
  distanceKm,
  duration,
  tripType,
}) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#C9A227]/30 bg-[#0E1729] shadow-xl">
      {/* Map Header bar */}
      <div className="bg-[#142038] px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#C9A227]">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span className="font-semibold tracking-wide uppercase">Route Intelligence & Toll Matrix</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>FASTag Express Corridor</span>
        </div>
      </div>

      {/* Styled Vector Map Canvas Simulation */}
      <div className="relative h-44 sm:h-52 bg-[#09101d] overflow-hidden p-6 flex flex-col justify-between">
        {/* Subtle grid and road lines pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Curved Highway Graphic */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current" preserveAspectRatio="none" viewBox="0 0 400 200">
          <path
            d="M 50 150 C 140 150, 160 50, 350 60"
            fill="none"
            stroke="#1E2E4E"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 50 150 C 140 150, 160 50, 350 60"
            fill="none"
            stroke="#C9A227"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="animate-pulse"
          />
        </svg>

        {/* Origin Marker */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/30 animate-bounce-subtle">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="bg-[#0B1220]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30 text-xs">
            <span className="text-[10px] text-emerald-400 block font-bold uppercase tracking-wider">Pickup Point</span>
            <span className="text-white font-medium truncate max-w-[200px] block">{pickup || "Enter Pickup Location"}</span>
          </div>
        </div>

        {/* Route Stats Badge (Middle) */}
        <div className="relative z-10 self-center bg-[#111A2E]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#C9A227]/40 shadow-xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Navigation className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Est. Distance:</span>
            <strong className="text-white">{distanceKm} km</strong>
          </div>
          <div className="w-px h-3 bg-white/20"></div>
          <div className="text-gray-300">
            <span>Duration:</span> <strong className="text-[#C9A227]">{duration}</strong>
          </div>
        </div>

        {/* Destination Marker */}
        <div className="relative z-10 flex items-center gap-3 justify-end">
          <div className="bg-[#0B1220]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#C9A227]/30 text-xs text-right">
            <span className="text-[10px] text-[#C9A227] block font-bold uppercase tracking-wider">Destination</span>
            <span className="text-white font-medium truncate max-w-[200px] block">{drop || "Enter Drop Destination"}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#C9A227]/20 border-2 border-[#C9A227] flex items-center justify-center text-[#C9A227] shadow-lg shadow-[#C9A227]/30">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-[#111A2E] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
        <span>Includes NHAI Expressways & State Highway corridor routing</span>
        <span className="text-[#C9A227] font-medium capitalize">{tripType.replace('-', ' ')}</span>
      </div>
    </div>
  );
};
