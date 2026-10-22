import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, MapPin, Car, Shield, CheckCircle2, AlertCircle, X,
  Printer, Phone, MessageCircle, ArrowRight, User, Clock,
  FileText, Download, ChevronRight
} from 'lucide-react';
import { BookingDetails } from '../types';
import { getStoredBookings, fetchBookings, updateBookingStatus } from '../services/storage';
import { companyConfig } from '../data/config';
import { useToast } from '../components/common/Toast';

export const DashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<BookingDetails | null>(null);
  const [cancelModalBooking, setCancelModalBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    // Initial fast load from local cache
    setBookings(getStoredBookings());

    // Live sync from Express + SQLite database
    fetchBookings().then(data => setBookings(data));
  }, []);

  const handleCancelBooking = async (id: string) => {
    await updateBookingStatus(id, 'Cancelled');
    const updated = await fetchBookings();
    setBookings(updated);
    setCancelModalBooking(null);
    showToast(`Booking ${id} has been cancelled. Any advance will be refunded.`, 'info');
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending';
    if (activeTab === 'completed') return b.bookingStatus === 'Completed';
    if (activeTab === 'cancelled') return b.bookingStatus === 'Cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Header Banner */}
        <div className="bg-[#111827] rounded-xl border border-white/10 p-6 sm:p-8 mb-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">
                Customer Travel Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-0.5">
                My Bookings & Journeys
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Track your reserved vehicles, driver assignments, and download official travel vouchers.
              </p>
            </div>
          </div>

          <Link
            to="/book"
            className="px-6 py-3 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#C9A227]/20 whitespace-nowrap"
          >
            <span>Book New Vehicle</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tab Filters: Upcoming, Completed, Cancelled */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'upcoming', label: `Upcoming (${bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Pending').length})` },
            { id: 'completed', label: `Completed (${bookings.filter(b => b.bookingStatus === 'Completed').length})` },
            { id: 'cancelled', label: `Cancelled (${bookings.filter(b => b.bookingStatus === 'Cancelled').length})` },
            { id: 'all', label: `All Trips (${bookings.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#C9A227] text-[#0B1220] font-bold shadow-sm'
                  : 'bg-[#111827] text-gray-300 hover:bg-white/5 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-[#111827] rounded-xl border border-white/10 p-12 text-center space-y-4">
            <Car className="w-12 h-12 text-gray-500 mx-auto" />
            <h3 className="text-lg font-bold text-white font-serif">No Trips in this Category</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
              You do not have any trips listed under {activeTab}. Plan your next road journey with our verified chauffeur fleet.
            </p>
            <Link
              to="/book"
              className="inline-block px-6 py-2.5 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider"
            >
              Search Vehicles
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#111827] rounded-xl border border-white/10 hover:border-[#C9A227]/30 transition-all p-5 sm:p-6 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#C9A227] bg-[#C9A227]/10 px-2.5 py-1 rounded border border-[#C9A227]/25">
                      {b.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        b.bookingStatus === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : b.bookingStatus === 'Completed'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                    <span className="text-xs text-gray-400 capitalize hidden sm:inline">
                      • {b.tripType.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Total:</span>
                    <span className="text-lg font-black text-white">₹{b.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Vehicle details (4 Cols) */}
                  <div className="md:col-span-4 flex items-center gap-3">
                    <img
                      src={b.selectedVehicleImage}
                      alt={b.selectedVehicleName}
                      className="w-16 h-14 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{b.selectedVehicleName}</h4>
                      <p className="text-[11px] text-[#C9A227]">{b.passengers} Guests Reserved</p>
                      {b.assignedDriver && (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Chauffeur: <strong className="text-white">{b.assignedDriver.name}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Route details (5 Cols) */}
                  <div className="md:col-span-5 space-y-1.5 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                      <span className="text-white truncate">From: {b.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#C9A227] shrink-0"></div>
                      <span className="text-white truncate">To: {b.dropLocation}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 pt-1">
                      <span>Date: <strong className="text-white">{b.pickupDate}</strong></span>
                      <span>Time: <strong className="text-white">{b.pickupTime}</strong></span>
                    </div>
                  </div>

                  {/* Action buttons (3 Cols) */}
                  <div className="md:col-span-3 flex flex-wrap md:flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingForModal(b)}
                      className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/10 flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#C9A227]" />
                      View Voucher
                    </button>

                    {b.bookingStatus === 'Confirmed' && (
                      <button
                        type="button"
                        onClick={() => setCancelModalBooking(b)}
                        className="flex-1 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider border border-red-500/20"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: View Full Voucher */}
        {selectedBookingForModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111827] max-w-xl w-full rounded-xl border border-[#C9A227]/30 p-6 space-y-5 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] text-[#C9A227] uppercase tracking-widest font-bold">Official Travel Voucher</span>
                  <h3 className="text-lg font-bold text-white tracking-wide">{selectedBookingForModal.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedBookingForModal(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-[#0B1220] border border-white/5">
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Vehicle</span>
                    <strong className="text-white text-sm">{selectedBookingForModal.selectedVehicleName}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Booking Status</span>
                    <strong className="text-emerald-400 font-bold">{selectedBookingForModal.bookingStatus}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Date & Time</span>
                    <strong className="text-white">{selectedBookingForModal.pickupDate} ({selectedBookingForModal.pickupTime})</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px] uppercase tracking-wider">Total Fare</span>
                    <strong className="text-[#C9A227] text-sm">₹{selectedBookingForModal.totalAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="space-y-2 p-3.5 rounded-lg bg-[#0B1220] border border-white/5">
                  <div><span className="text-gray-400 font-medium">Pickup:</span> <strong className="text-white ml-1">{selectedBookingForModal.pickupLocation}</strong></div>
                  <div><span className="text-gray-400 font-medium">Destination:</span> <strong className="text-white ml-1">{selectedBookingForModal.dropLocation}</strong></div>
                  {selectedBookingForModal.customer.specialRequests && (
                    <div className="pt-1 text-gray-400">
                      <span>Notes: </span> {selectedBookingForModal.customer.specialRequests}
                    </div>
                  )}
                </div>

                {selectedBookingForModal.assignedDriver && (
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">Assigned Chauffeur (Demo Assigned)</span>
                      <strong className="text-white text-sm">{selectedBookingForModal.assignedDriver.name}</strong>
                      <span className="text-gray-400 block text-[11px]">Plate: {selectedBookingForModal.assignedDriver.vehiclePlateNumber}</span>
                    </div>
                    <a
                      href={`tel:${selectedBookingForModal.assignedDriver.phone}`}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-[#0B1220] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Chauffeur
                    </a>
                  </div>
                )}

                <div className="text-[10px] text-gray-500 text-center uppercase tracking-widest pt-2">
                  * Prototype Demo Voucher • Verified for Chauffeur Mobilization
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 border border-white/10"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C9A227]" />
                  Print Voucher
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBookingForModal(null)}
                  className="px-5 py-2 rounded-lg bg-[#C9A227] hover:bg-[#B58F1F] text-[#0B1220] font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Confirm Cancel Booking */}
        {cancelModalBooking && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#111827] max-w-md w-full rounded-xl border border-red-500/30 p-6 space-y-4 shadow-2xl animate-fade-in">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <h3 className="text-lg font-bold text-white">Cancel Booking {cancelModalBooking.id}?</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Are you sure you want to cancel this booking for {cancelModalBooking.pickupDate}? Since it is more than 6 hours prior to departure, any advance paid will be credited back in full.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setCancelModalBooking(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 text-xs font-semibold"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleCancelBooking(cancelModalBooking.id)}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
