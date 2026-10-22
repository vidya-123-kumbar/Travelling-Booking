import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  MapPin, Calendar, Clock, Users, Car, CheckCircle2, ChevronRight,
  ChevronLeft, Shield, Award, Fuel, Info, Sparkles, CreditCard,
  QrCode, ArrowRight, Printer, MessageCircle, AlertCircle, Eye,
  Check, Phone, Mail, Building, Star, CheckCheck, RefreshCw,
  Navigation
} from 'lucide-react';
import { vehiclesData } from '../data/vehicles';
import { TripType, Vehicle, BookingDetails } from '../types';
import { estimateRoute, saveBooking } from '../services/storage';
import { companyConfig } from '../data/config';
import { RouteMapVisualizer } from '../components/common/RouteMapVisualizer';
import { useToast } from '../components/common/Toast';

export const BookPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  // Current Step: 1 = Journey, 2 = Select Vehicle, 3 = Summary & Fare, 4 = Passenger Details, 5 = Confirm & Receipt
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [tripType, setTripType] = useState<TripType>(
    (searchParams.get('tripType') as TripType) || 'outstation-round'
  );
  const [pickupLocation, setPickupLocation] = useState(
    searchParams.get('pickup') || 'Bengaluru Airport (BLR)'
  );
  const [dropLocation, setDropLocation] = useState(
    searchParams.get('drop') || 'Madikeri, Coorg'
  );
  
  // Tomorrow's date default
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const returnDef = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const [pickupDate, setPickupDate] = useState(searchParams.get('date') || tomorrow);
  const [pickupTime, setPickupTime] = useState(searchParams.get('time') || '06:00 AM');
  const [returnDate, setReturnDate] = useState(returnDef);
  const [passengers, setPassengers] = useState<number>(
    parseInt(searchParams.get('passengers') || '4', 10)
  );

  // Vehicle Selection
  const initialVehicleId = searchParams.get('vehicle') || 'innova-crysta';
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    vehiclesData.find(v => v.id === initialVehicleId) || vehiclesData[0]
  );
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState<string>('all');
  const [viewDetailsVehicle, setViewDetailsVehicle] = useState<Vehicle | null>(null);

  // Passenger & Billing Info
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [hasGstInvoice, setHasGstInvoice] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Payment Options
  const [paymentOption, setPaymentOption] = useState<'advance' | 'full' | 'pickup'>('advance');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Promo Code
  const [promoInput, setPromoInput] = useState('VIJAYA10');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>({
    code: 'VIJAYA10',
    discountPercent: 10
  });

  // Created Booking state for Step 5
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  // Route calculation
  const { estimatedKm, estimatedDuration } = estimateRoute(pickupLocation, dropLocation, tripType);

  // Calculate pricing based on tripType and vehicle
  const calculatePricing = () => {
    if (!selectedVehicle) {
      return { baseFare: 0, driverAllowance: 0, tollTaxesEstimated: 0, discount: 0, total: 0, advance: 0, balance: 0 };
    }

    let base = 0;
    let allowance = 0;
    let toll = 0;

    if (tripType === 'local') {
      base = selectedVehicle.rates.local8hr80km;
      allowance = 0;
      toll = 100;
    } else if (tripType === 'airport') {
      base = selectedVehicle.rates.airportFlatRate;
      allowance = 0;
      toll = 150;
    } else {
      // Outstation round or one-way
      const days = tripType === 'outstation-round' ? 3 : 1;
      const billedKm = Math.max(estimatedKm, selectedVehicle.rates.minKmPerDay * days);
      base = billedKm * selectedVehicle.rates.outstationPerKm;
      allowance = selectedVehicle.rates.driverAllowancePerDay * days;
      toll = Math.round(billedKm * 1.5);
    }

    const discountAmount = appliedPromo ? Math.round((base * appliedPromo.discountPercent) / 100) : 0;
    const total = Math.max(0, base + allowance + toll - discountAmount);
    
    let advance = 0;
    if (paymentOption === 'advance') {
      advance = Math.round(total * 0.25);
    } else if (paymentOption === 'full') {
      advance = total;
    } else {
      advance = 0;
    }
    const balance = total - advance;

    return {
      baseFare: base,
      driverAllowance: allowance,
      tollTaxesEstimated: toll,
      discount: discountAmount,
      total,
      advance,
      balance
    };
  };

  const pricing = calculatePricing();

  // Navigation handlers with scroll restoration
  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupLocation.trim() || !dropLocation.trim()) {
      showToast('Please specify both pickup and drop locations', 'error');
      return;
    }
    goToStep(2);
  };

  const handleProceedToStep3 = () => {
    if (!selectedVehicle) {
      showToast('Please choose a vehicle from the fleet', 'error');
      return;
    }
    goToStep(3);
  };

  const handleProceedToStep4 = () => {
    goToStep(4);
  };

  // Final confirmation and local persistence
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim() || !email.trim()) {
      showToast('Please fill in required passenger details', 'error');
      return;
    }
    if (!agreedTerms) {
      showToast('Please accept the booking terms & conditions', 'error');
      return;
    }

    const randomIdNumber = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `TRV-${randomIdNumber}`;

    const newBooking: BookingDetails = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      tripType,
      pickupLocation,
      dropLocation,
      pickupDate,
      pickupTime,
      returnDate: tripType === 'outstation-round' ? returnDate : undefined,
      passengers,
      selectedVehicleId: selectedVehicle?.id || 'innova-crysta',
      selectedVehicleName: selectedVehicle?.name || 'Toyota Innova Crysta',
      selectedVehicleCategory: selectedVehicle?.category || 'suv',
      selectedVehicleImage: selectedVehicle?.image || '',
      estimatedKm,
      estimatedHours: 6,
      baseFare: pricing.baseFare,
      driverAllowance: pricing.driverAllowance,
      tollTaxesEstimated: pricing.tollTaxesEstimated,
      discountAmount: pricing.discount,
      totalAmount: pricing.total,
      advanceAmountPaid: pricing.advance,
      balanceDue: pricing.balance,
      paymentMethod: paymentOption === 'pickup' ? 'pay_on_pickup' : paymentMethod,
      paymentStatus: paymentOption === 'full' ? 'Paid' : paymentOption === 'advance' ? 'Advance Paid' : 'Pay on Pickup',
      bookingStatus: 'Confirmed',
      assignedDriver: {
        name: 'Ramesh Gowda',
        phone: '+91 98451 98765',
        rating: 4.95,
        vehiclePlateNumber: 'KA 01 MJ 4492'
      },
      customer: {
        fullName,
        mobileNumber,
        email,
        passengersCount: passengers,
        specialRequests,
        hasGstInvoice,
        companyName: hasGstInvoice ? companyName : undefined,
        gstNumber: hasGstInvoice ? gstNumber : undefined
      }
    };

    saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setCurrentStep(5);

    // Celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    showToast(`Booking ${bookingId} confirmed! Details sent to your mobile.`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'VIJAYA10') {
      setAppliedPromo({ code: 'VIJAYA10', discountPercent: 10 });
      showToast('Promo code applied: 10% Gold Discount!', 'success');
    } else if (promoInput.trim().toUpperCase() === 'FIRST500') {
      setAppliedPromo({ code: 'FIRST500', discountPercent: 8 });
      showToast('Promo code applied: 8% Welcome Discount!', 'success');
    } else {
      showToast('Invalid promo code. Try VIJAYA10', 'error');
    }
  };

  // Filter fleet
  const filteredVehicles = vehiclesData.filter((v) => {
    if (vehicleCategoryFilter === 'all') return true;
    return v.category === vehicleCategoryFilter;
  });

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#C9A227] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Executive Chauffeur Booking Engine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Reserve Your Journey
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Sanitized luxury vehicles, transparent per-km billing, and background-verified highway chauffeurs.
          </p>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="max-w-4xl mx-auto mb-10">
          {/* Desktop Progress Bar (5 Steps) */}
          <div className="hidden sm:grid grid-cols-5 relative gap-2">
            {/* Connecting Track */}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-white/10 z-0"></div>
            <div
              className="absolute top-5 left-8 h-0.5 bg-gradient-to-r from-[#C9A227] to-[#E3BD46] z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / 4) * 82}%` }}
            ></div>

            {[
              { num: 1, label: '01 JOURNEY' },
              { num: 2, label: '02 VEHICLE' },
              { num: 3, label: '03 FARE' },
              { num: 4, label: '04 DETAILS' },
              { num: 5, label: '05 CONFIRM' },
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => s.num < currentStep && goToStep(s.num)}
                  disabled={s.num >= currentStep}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    currentStep === s.num
                      ? 'bg-[#C9A227] text-[#0B1220] ring-4 ring-[#C9A227]/25 shadow-lg scale-105'
                      : currentStep > s.num
                      ? 'bg-emerald-500 text-white cursor-pointer hover:scale-105'
                      : 'bg-[#111827] text-gray-400 border border-white/10'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : `0${s.num}`}
                </button>
                <span
                  className={`mt-2 text-[11px] font-semibold tracking-wider uppercase text-center ${
                    currentStep === s.num ? 'text-[#C9A227]' : currentStep > s.num ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Compact Progress Bar */}
          <div className="sm:hidden bg-[#111827] p-3.5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold uppercase tracking-wider text-[#C9A227]">
                STEP 0{currentStep} OF 05
              </span>
              <span className="font-semibold text-white uppercase">
                {currentStep === 1 && 'JOURNEY'}
                {currentStep === 2 && 'VEHICLE'}
                {currentStep === 3 && 'FARE'}
                {currentStep === 4 && 'DETAILS'}
                {currentStep === 5 && 'CONFIRM'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#0B1220] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C9A227] transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* STEP 1: JOURNEY DETAILS */}
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto bg-[#111827] rounded-xl border border-[#C9A227]/20 p-6 sm:p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <span className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">01 JOURNEY</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Journey Configuration</h2>
                <p className="text-xs text-gray-400 mt-1">Specify your travel route, schedule and party size</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30">
                Live Fare Matrix
              </span>
            </div>

            <form onSubmit={handleProceedToStep2} className="space-y-6">
              {/* Trip Type Tabs */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Trip Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    { id: 'outstation-round', label: 'Outstation Round' },
                    { id: 'outstation-oneway', label: 'One Way Drop' },
                    { id: 'local', label: 'Local Hourly' },
                    { id: 'airport', label: 'Airport Transfer' },
                    { id: 'corporate', label: 'Corporate' },
                    { id: 'package', label: 'Tour Package' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTripType(t.id as TripType)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center ${
                        tripType === t.id
                          ? 'bg-[#C9A227] text-[#0B1220] shadow-md shadow-[#C9A227]/20'
                          : 'bg-[#0B1220] text-gray-300 hover:bg-[#1A2B4C] border border-white/5'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Route Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    PICKUP LOCATION
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Bengaluru Airport (BLR) or Indiranagar"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] text-sm"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {['Bengaluru Airport (BLR)', 'Indiranagar, BLR', 'Koramangala, BLR', 'Mysuru Hub'].map((chip) => (
                      <button
                        type="button"
                        key={chip}
                        onClick={() => setPickupLocation(chip)}
                        className="text-[11px] text-gray-300 hover:text-[#C9A227] bg-[#0B1220] hover:bg-[#172033] px-2.5 py-1 rounded-md border border-white/10 transition-colors"
                      >
                        +{chip}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                    DROP LOCATION
                  </label>
                  <input
                    type="text"
                    required
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    placeholder="e.g. Madikeri, Coorg, Ooty, Mysore"
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] text-sm"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {['Madikeri, Coorg', 'Chikmagalur', 'Ooty Hills', 'Mysuru Palace', 'Goa Coast'].map((chip) => (
                      <button
                        type="button"
                        key={chip}
                        onClick={() => setDropLocation(chip)}
                        className="text-[11px] text-gray-300 hover:text-[#C9A227] bg-[#0B1220] hover:bg-[#172033] px-2.5 py-1 rounded-md border border-white/10 transition-colors"
                      >
                        +{chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Date, Time, Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                    TRAVEL DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                    PICKUP TIME
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] text-sm"
                  >
                    {[
                      '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM',
                      '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM',
                      '06:00 PM', '08:00 PM', '10:00 PM', '11:30 PM'
                    ].map((t) => (
                      <option key={t} value={t} className="bg-[#0B1220] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C9A227]" />
                    PASSENGERS
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-3 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 17, 26, 35, 45].map((num) => (
                      <option key={num} value={num} className="bg-[#0B1220] text-white">
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              {/* Route Map Preview */}
              <div className="mt-4">
                <RouteMapVisualizer
                  pickup={pickupLocation}
                  drop={dropLocation}
                  distanceKm={estimatedKm}
                  duration={estimatedDuration}
                  tripType={tripType}
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A227] to-[#E3BD46] text-[#0B1220] font-extrabold text-sm flex items-center justify-center gap-2 hover:from-[#E3BD46] hover:to-[#C9A227] shadow-xl shadow-[#C9A227]/25 transition-all"
                >
                  <span>Select Available Vehicles</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: SELECT VEHICLE */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in pb-24">
            {/* Header and Filter Bar */}
            <div className="bg-[#111827] p-5 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">02 VEHICLE</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Select Your Vehicle</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Route: <strong className="text-white">{pickupLocation}</strong> → <strong className="text-white">{dropLocation}</strong> ({estimatedKm} km) • {passengers} Guests
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Fleet' },
                  { id: 'suv', label: 'Innova & SUVs' },
                  { id: 'tempo', label: 'Tempo & Urbania' },
                  { id: 'sedan', label: 'Sedans' },
                  { id: 'minibus', label: 'Mini Buses' },
                  { id: 'luxury-bus', label: 'Luxury Coaches' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setVehicleCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      vehicleCategoryFilter === cat.id
                        ? 'bg-[#C9A227] text-[#0B1220] font-bold shadow-md'
                        : 'bg-[#0B1220] text-gray-300 hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => {
                const isSelected = selectedVehicle?.id === vehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    className={`rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#111827] border-2 border-[#C9A227] shadow-xl shadow-[#C9A227]/20 ring-1 ring-[#C9A227]/30 scale-[1.01]'
                        : 'bg-[#111827] border border-white/10 hover:border-[#C9A227]/40 hover:shadow-lg'
                    }`}
                  >
                    <div>
                      {/* Vehicle Image (16:9 ratio, subtle zoom) */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
                        {vehicle.badge && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C9A227] text-[#0B1220] shadow-md">
                            {vehicle.badge}
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-[#0B1220]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                          {vehicle.availabilityStatus}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-4">
                        <div>
                          <div className="text-[11px] font-bold text-[#C9A227] uppercase tracking-wider">
                            {vehicle.categoryLabel}
                          </div>
                          <h3 className="text-lg font-bold text-white mt-0.5">{vehicle.name}</h3>
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

                        {/* Rate presentation */}
                        <div className="flex items-baseline justify-between pt-1">
                          <div>
                            <span className="text-[11px] text-gray-400">Starting from</span>
                            <div className="text-2xl font-black text-white">
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

                    {/* Actions */}
                    <div className="p-5 pt-0 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setViewDetailsVehicle(vehicle)}
                        className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#C9A227] text-[#0B1220] shadow-md shadow-[#C9A227]/30'
                            : 'bg-[#0B1220] hover:bg-[#1A2B4C] text-white border border-white/10'
                        }`}
                      >
                        {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STICKY BOTTOM ACTION BAR FOR STEP 2 */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#111827]/95 backdrop-blur-xl border-t border-[#C9A227]/30 px-4 sm:px-8 py-3 pb-4 sm:pb-3.5 shadow-2xl">
              <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-12 h-10 rounded-lg object-cover border border-white/10 hidden sm:block"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#C9A227] tracking-wider block">Selected Vehicle</span>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>{selectedVehicle.name}</span>
                      <span className="text-[11px] text-gray-400 font-normal">({selectedVehicle.seats} Seats • ₹{selectedVehicle.rates.outstationPerKm}/km)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="px-3 sm:px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Back to Journey</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleProceedToStep3}
                    className="px-5 sm:px-7 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#C9A227]/25 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Proceed to Fare Summary</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: TRIP SUMMARY & FARE BREAKDOWN */}
        {currentStep === 3 && selectedVehicle && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-[#111827] rounded-xl border border-[#C9A227]/20 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">03 FARE</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Trip Summary & Fare Breakdown</h2>
                  <p className="text-xs text-gray-400 mt-1">Itemized professional invoice with transparent charges</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Fixed Per-Km Rate
                </span>
              </div>

              {/* Journey Overview Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl bg-[#0B1220] border border-white/10 mb-6">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#C9A227] mb-3">Itinerary Route</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                      <div>
                        <span className="text-[11px] text-gray-400 block uppercase font-medium">Pickup Location</span>
                        <strong className="text-white">{pickupLocation}</strong>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#C9A227] mt-1.5 shrink-0"></div>
                      <div>
                        <span className="text-[11px] text-gray-400 block uppercase font-medium">Destination Drop</span>
                        <strong className="text-white">{dropLocation}</strong>
                      </div>
                    </div>
                    <div className="pt-2 text-xs text-gray-300 grid grid-cols-2 gap-2 border-t border-white/10">
                      <div>Date: <strong className="text-white">{pickupDate}</strong></div>
                      <div>Time: <strong className="text-white">{pickupTime}</strong></div>
                      <div>Trip Type: <strong className="text-white capitalize">{tripType.replace('-', ' ')}</strong></div>
                      <div>Passengers: <strong className="text-white">{passengers} Guests</strong></div>
                    </div>
                  </div>
                </div>

                {/* Selected Vehicle Snippet */}
                <div className="border-t md:border-t-0 md:border-l border-white/10 md:pl-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#C9A227] mb-2">Selected Vehicle</h4>
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        className="w-16 h-14 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white">{selectedVehicle.name}</h4>
                        <div className="text-xs text-gray-400">{selectedVehicle.categoryLabel} • {selectedVehicle.seats} Seats</div>
                        <div className="text-xs text-emerald-400 mt-0.5">Rating: {selectedVehicle.rating}★ ({selectedVehicle.reviewCount} reviews)</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-300 flex items-center justify-between">
                    <span>Est. Travel Distance:</span>
                    <strong className="text-white text-sm">{estimatedKm} km</strong>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="p-4 rounded-xl bg-[#0B1220] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C9A227]" />
                  <div>
                    <span className="text-xs font-bold text-white">Have a Corporate / Seasonal Voucher?</span>
                    <span className="text-[11px] text-gray-400 block">Use coupon code <strong className="text-[#C9A227]">VIJAYA10</strong> for 10% instant discount</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter Coupon"
                    className="px-3 py-2 rounded-lg bg-[#111827] border border-white/10 text-white text-xs uppercase font-bold focus:outline-none focus:border-[#C9A227] w-32"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Professional Itemized Fare Invoice Breakdown */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0B1220]">
                <div className="bg-[#111827] px-5 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-gray-300">
                    Itemized Fare Invoice
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                    GST Inclusive • INR
                  </span>
                </div>
                <div className="p-5 space-y-3.5 text-xs sm:text-sm">
                  {/* Base Charter */}
                  <div className="flex items-center justify-between text-gray-300">
                    <span className="flex items-center gap-1.5">
                      <span>Base Charter</span>
                      <span className="text-xs text-gray-500">({estimatedKm} billed km)</span>
                    </span>
                    <span className="font-semibold text-white">₹{pricing.baseFare.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Driver Batta */}
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Driver Batta</span>
                    <span className="font-semibold text-white">
                      {pricing.driverAllowance > 0 ? `₹${pricing.driverAllowance.toLocaleString('en-IN')}` : 'Included'}
                    </span>
                  </div>

                  {/* Toll / FASTag */}
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Toll / FASTag</span>
                    <span className="font-semibold text-white">
                      {pricing.tollTaxesEstimated > 0 ? `₹${pricing.tollTaxesEstimated.toLocaleString('en-IN')}` : 'At actuals'}
                    </span>
                  </div>

                  {/* Additional Charges */}
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Additional Charges</span>
                    <span className="font-semibold text-emerald-400">₹0 (Zero Markup)</span>
                  </div>

                  {/* Discount */}
                  {pricing.discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400 pt-1 border-t border-white/5">
                      <span className="flex items-center gap-1.5">
                        <span>Discount</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">
                          {appliedPromo?.code}
                        </span>
                      </span>
                      <span className="font-bold">-₹{pricing.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {/* Final Total */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Final Total</span>
                      <span className="text-[11px] text-gray-500">Includes fuel, driver allowance, GST</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#C9A227]">
                      ₹{pricing.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs sm:text-sm font-semibold flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Change Vehicle
                </button>

                <button
                  type="button"
                  onClick={handleProceedToStep4}
                  className="px-7 py-3 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#C9A227]/25"
                >
                  <span>Continue to Passenger Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PASSENGER DETAILS & PAYMENT PREFERENCE */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto bg-[#111827] rounded-xl border border-[#C9A227]/20 p-6 sm:p-8 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <span className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">04 DETAILS</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Passenger & Payment Details</h2>
                <p className="text-xs text-gray-400 mt-1">Booking confirmation voucher and chauffeur dispatch will be sent via WhatsApp and SMS</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/30">
                Secure 256-bit SSL
              </span>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-8">
              {/* GROUP 1: CONTACT DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                    1. CONTACT DETAILS
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      PRIMARY PASSENGER FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Arvind Hegde"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      MOBILE NUMBER (10 DIGITS) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-[#C9A227] font-bold">+91</span>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="9845012345"
                        maxLength={10}
                        className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      EMAIL ADDRESS (FOR GST TAX INVOICE & VOUCHER) *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="arvind.hegde@hospital.org"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* GROUP 2: TRAVEL DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                    2. TRAVEL DETAILS
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      NUMBER OF PASSENGERS
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={selectedVehicle?.seats || 20}
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                      SPECIAL TRAVEL REQUESTS / CHAUFFEUR INSTRUCTIONS (OPTIONAL)
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Flight landing at Terminal 2, baby seat needed, senior citizen travel, roof carrier required."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0B1220] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A227] text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* GROUP 3: BILLING DETAILS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                    3. BILLING DETAILS
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B1220] border border-white/10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasGstInvoice}
                      onChange={(e) => setHasGstInvoice(e.target.checked)}
                      className="rounded bg-[#111827] border-white/20 text-[#C9A227] focus:ring-[#C9A227]"
                    />
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#C9A227]" />
                      I require a Corporate GST Tax Invoice for business reimbursement
                    </span>
                  </label>

                  {hasGstInvoice && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10 animate-fade-in">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                          COMPANY REGISTERED NAME
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Zenith Tech Solutions Pvt Ltd"
                          className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                          15-DIGIT GSTIN NUMBER
                        </label>
                        <input
                          type="text"
                          value={gstNumber}
                          onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                          placeholder="29AABCU9603R1ZM"
                          maxLength={15}
                          className="w-full px-3 py-2 rounded-lg bg-[#111827] border border-white/10 text-white text-xs uppercase"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* GROUP 4: PAYMENT */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                    4. PAYMENT SCHEDULE & MODE
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentOption('advance')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      paymentOption === 'advance'
                        ? 'bg-[#17243B] border-[#C9A227] text-white shadow-lg'
                        : 'bg-[#0B1220] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Pay 25% Advance</span>
                      {paymentOption === 'advance' && <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />}
                    </div>
                    <div className="text-xl font-black text-[#C9A227]">₹{pricing.advance.toLocaleString('en-IN')}</div>
                    <p className="text-[10px] text-gray-400 mt-1">Balance ₹{pricing.balance.toLocaleString('en-IN')} to chauffeur on pickup</p>
                  </div>

                  <div
                    onClick={() => setPaymentOption('full')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      paymentOption === 'full'
                        ? 'bg-[#17243B] border-[#C9A227] text-white shadow-lg'
                        : 'bg-[#0B1220] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Pay 100% In Advance</span>
                      {paymentOption === 'full' && <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />}
                    </div>
                    <div className="text-xl font-black text-[#C9A227]">₹{pricing.total.toLocaleString('en-IN')}</div>
                    <p className="text-[10px] text-gray-400 mt-1">Hassle-free zero payment on journey day</p>
                  </div>

                  <div
                    onClick={() => setPaymentOption('pickup')}
                    className={`p-4 rounded-xl cursor-pointer border transition-all ${
                      paymentOption === 'pickup'
                        ? 'bg-[#17243B] border-[#C9A227] text-white shadow-lg'
                        : 'bg-[#0B1220] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Pay to Driver</span>
                      {paymentOption === 'pickup' && <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />}
                    </div>
                    <div className="text-xl font-black text-white">₹0 Now</div>
                    <p className="text-[10px] text-gray-400 mt-1">Pay full amount in cash/UPI to chauffeur</p>
                  </div>
                </div>

                {/* If digital payment selected */}
                {paymentOption !== 'pickup' && (
                  <div className="p-4 rounded-xl bg-[#0B1220] border border-white/10 space-y-3">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300">
                      Payment Mode (Instant Bank Gateway Simulation)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { id: 'upi', label: 'UPI / GooglePay / PhonePe / Paytm', icon: QrCode },
                        { id: 'card', label: 'Credit / Debit Card (Visa/Mastercard/RuPay)', icon: CreditCard },
                        { id: 'netbanking', label: 'Net Banking (All Major Indian Banks)', icon: Building },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id as any)}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                            paymentMethod === m.id
                              ? 'bg-[#C9A227] text-[#0B1220]'
                              : 'bg-[#111827] text-gray-300 hover:bg-white/5 border border-white/10'
                          }`}
                        >
                          <m.icon className="w-3.5 h-3.5" />
                          <span>{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Agreement checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-400">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded bg-[#0B1220] border-white/20 text-[#C9A227] focus:ring-[#C9A227]"
                  />
                  <span>
                    I confirm that the travel details are accurate and I accept Vijaya Travels' standard{' '}
                    <span className="text-[#C9A227] underline">Cancellation & Refund Policy</span>. Free cancellation up to 6 hours before journey start.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs sm:text-sm font-semibold flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#C9A227]/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Confirm Booking & Generate Voucher</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 5: BOOKING CONFIRMATION & RECEIPT */}
        {currentStep === 5 && confirmedBooking && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Success Card */}
            <div className="bg-[#111827] rounded-xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-xl shadow-emerald-500/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                Booking ID: {confirmedBooking.id}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-serif">
                YOUR JOURNEY IS CONFIRMED
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{confirmedBooking.customer.fullName}</strong>. Your chauffeur and vehicle have been reserved. An official digital voucher has been generated.
              </p>

              {/* Printable Luxury Voucher Card */}
              <div className="mt-8 text-left bg-[#0B1220] rounded-xl border border-white/10 p-6 space-y-5" id="printable-booking-receipt">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-[#C9A227] uppercase tracking-widest font-bold">Official Travel Voucher</span>
                    <h3 className="text-lg font-bold text-white tracking-wide">{companyConfig.name}</h3>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <div>Issued: {new Date(confirmedBooking.createdAt).toLocaleDateString()}</div>
                    <div className="text-emerald-400 font-bold">{confirmedBooking.paymentStatus}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Passenger</span>
                    <strong className="text-white text-sm">{confirmedBooking.customer.fullName}</strong>
                    <span className="text-gray-400 block text-[11px]">+91 {confirmedBooking.customer.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Vehicle</span>
                    <strong className="text-white text-sm">{confirmedBooking.selectedVehicleName}</strong>
                    <span className="text-[#C9A227] block text-[11px]">{confirmedBooking.selectedVehicleCategory.toUpperCase()} • Climate AC</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Date & Time</span>
                    <strong className="text-white text-sm">{confirmedBooking.pickupDate} at {confirmedBooking.pickupTime}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Chauffeur (Demo Assigned)</span>
                    <strong className="text-white text-sm">{confirmedBooking.assignedDriver?.name}</strong>
                    <span className="text-emerald-400 block text-[11px]">Plate: {confirmedBooking.assignedDriver?.vehiclePlateNumber}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#111827] border border-white/5 text-xs space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider w-16">Pickup:</span>
                    <span className="text-white font-medium">{confirmedBooking.pickupLocation}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#C9A227] font-bold uppercase text-[10px] tracking-wider w-16">Drop:</span>
                    <span className="text-white font-medium">{confirmedBooking.dropLocation}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-300 uppercase tracking-wider">Amount</span>
                  <span className="text-xl text-[#C9A227]">₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                {confirmedBooking.balanceDue > 0 && (
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Balance Due to Chauffeur on Pickup</span>
                    <span className="text-white font-semibold">₹{confirmedBooking.balanceDue.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {/* Explicit Prototype Demo Notice */}
                <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500 text-center uppercase tracking-widest">
                  * Prototype Demo Booking Voucher • Chauffeur details and vehicle plates are simulated for prototype preview
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <Printer className="w-4 h-4 text-[#C9A227]" />
                  PRINT / SAVE PDF
                </button>

                <a
                  href={`https://wa.me/${companyConfig.whatsappNumber}?text=Hello%20Vijaya%20Travels,%20I%20have%20confirmed%20booking%20${confirmedBooking.id}%20for%20${confirmedBooking.pickupDate}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-[#25D366] text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WHATSAPP DETAILS
                </a>

                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#C9A227]/20"
                >
                  <span>VIEW MY BOOKINGS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Modal: View Vehicle Details */}
        {viewDetailsVehicle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0E1729] max-w-2xl w-full rounded-2xl border border-[#C9A227]/30 overflow-hidden shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
              <div className="relative h-60">
                <img
                  src={viewDetailsVehicle.image}
                  alt={viewDetailsVehicle.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setViewDetailsVehicle(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider">
                    {viewDetailsVehicle.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{viewDetailsVehicle.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{viewDetailsVehicle.description}</p>
                </div>

                {/* Key specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#142038] border border-white/5">
                    <span className="text-gray-400 block">Seating</span>
                    <strong className="text-white">{viewDetailsVehicle.seats} Captain Seats</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#142038] border border-white/5">
                    <span className="text-gray-400 block">Luggage</span>
                    <strong className="text-white">{viewDetailsVehicle.luggage} Suitcases</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#142038] border border-white/5">
                    <span className="text-gray-400 block">Transmission</span>
                    <strong className="text-white">{viewDetailsVehicle.transmission}</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#142038] border border-white/5">
                    <span className="text-gray-400 block">Fuel Type</span>
                    <strong className="text-white">{viewDetailsVehicle.fuelType}</strong>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Amenities & Equipment</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    {viewDetailsVehicle.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C9A227]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rate Card */}
                <div className="p-4 rounded-xl bg-[#142038] border border-white/10 text-xs">
                  <h4 className="font-bold text-white mb-2">Official Rate Card</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>Outstation: <strong className="text-[#C9A227]">₹{viewDetailsVehicle.rates.outstationPerKm}/km</strong></div>
                    <div>Local (8h/80k): <strong className="text-[#C9A227]">₹{viewDetailsVehicle.rates.local8hr80km}</strong></div>
                    <div>Airport Flat: <strong className="text-[#C9A227]">₹{viewDetailsVehicle.rates.airportFlatRate}</strong></div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => setViewDetailsVehicle(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 text-xs font-semibold"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVehicle(viewDetailsVehicle);
                      setViewDetailsVehicle(null);
                      goToStep(3);
                    }}
                    className="px-6 py-2 rounded-xl bg-[#C9A227] text-[#0B1220] font-bold text-xs hover:bg-[#E3BD46]"
                  >
                    Select this Vehicle
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
