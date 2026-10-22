import React, { useState, useEffect } from 'react';
import {
  Shield, TrendingUp, Calendar, Car, Users, DollarSign,
  CheckCircle2, Clock, AlertCircle, X, Search, Filter,
  Phone, Mail, MapPin, Eye, Check, Edit3
} from 'lucide-react';
import { BookingDetails, Inquiry, Vehicle } from '../types';
import {
  getStoredBookings,
  fetchBookings,
  updateBookingStatus,
  getStoredInquiries,
  fetchInquiries,
  updateInquiryStatus
} from '../services/storage';
import { vehiclesData } from '../data/vehicles';
import { useToast } from '../components/common/Toast';

export const AdminPage: React.FC = () => {
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'bookings' | 'fleet' | 'inquiries'>('dashboard');

  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initial fast load from local cache
    setBookings(getStoredBookings());
    setInquiries(getStoredInquiries());

    // Live sync from Express + SQLite database
    fetchBookings().then(data => setBookings(data));
    fetchInquiries().then(data => setInquiries(data));
  }, []);

  const handleStatusChange = async (bookingId: string, newStatus: BookingDetails['bookingStatus']) => {
    await updateBookingStatus(bookingId, newStatus);
    const updated = await fetchBookings();
    setBookings(updated);
    showToast(`Booking ${bookingId} status updated to ${newStatus}`, 'success');
  };

  const handleInquiryStatusChange = async (inquiryId: string, newStatus: Inquiry['status']) => {
    await updateInquiryStatus(inquiryId, newStatus);
    const updated = await fetchInquiries();
    setInquiries(updated);
    showToast(`Inquiry status updated to ${newStatus}`, 'success');
  };

  const toggleVehicleAvailability = (vehicleId: string) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId
          ? { ...v, availabilityStatus: v.availabilityStatus === 'Available' ? 'Booked' : 'Available' }
          : v
      )
    );
    showToast('Vehicle fleet availability toggled', 'info');
  };

  // Metrics
  const totalRevenue = bookings
    .filter(b => b.bookingStatus !== 'Cancelled')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingCount = bookings.filter(b => b.bookingStatus === 'Pending' || b.bookingStatus === 'Confirmed').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-[#0B1220] text-gray-200 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-[#111827] rounded-xl border border-[#C9A227]/30 p-6 sm:p-8 mb-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B1220] border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-widest text-[#C9A227] uppercase">
                Operations Management Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight mt-0.5">
                Admin Dispatch & Fleet Control
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Real-time booking confirmations, chauffeur roster, vehicle status, and revenue telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 font-medium">
              Prototype Mode
            </span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Overview Metrics' },
            { id: 'bookings', label: `Manage Bookings (${bookings.length})` },
            { id: 'fleet', label: `Fleet Management (${vehicles.length})` },
            { id: 'inquiries', label: `Customer Enquiries (${newInquiriesCount} New)` },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeSection === sec.id
                  ? 'bg-[#C9A227] text-[#0B1220] font-bold shadow-sm'
                  : 'bg-[#111827] text-gray-300 hover:bg-white/5 border border-white/5'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: OVERVIEW METRICS */}
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-[#111827] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Bookings</span>
                  <Calendar className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="text-3xl font-black text-white">{bookings.length}</div>
                <div className="text-xs text-emerald-400 font-semibold">{pendingCount} Active & Upcoming</div>
              </div>

              <div className="p-6 rounded-xl bg-[#111827] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-[#C9A227]">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-400 font-semibold">100% Tax Invoiced</div>
              </div>

              <div className="p-6 rounded-xl bg-[#111827] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Fleet Available</span>
                  <Car className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {vehicles.filter(v => v.availabilityStatus === 'Available').length} / {vehicles.length}
                </div>
                <div className="text-xs text-gray-400 font-semibold">Ready for deployment</div>
              </div>

              <div className="p-6 rounded-xl bg-[#111827] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Pending Quotes</span>
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white">{newInquiriesCount}</div>
                <div className="text-xs text-[#C9A227] font-semibold">Requires callback within 15m</div>
              </div>
            </div>

            {/* Recent Bookings Quick Table */}
            <div className="bg-[#111827] rounded-xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Recent Real-Time Bookings</h3>
                <button
                  onClick={() => setActiveSection('bookings')}
                  className="text-xs text-[#C9A227] hover:underline font-semibold"
                >
                  View All & Manage
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#142038] text-gray-400 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3">Pickup Date</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono font-bold text-[#C9A227]">{b.id}</td>
                        <td className="p-3 font-semibold text-white">{b.customer.fullName}</td>
                        <td className="p-3">{b.selectedVehicleName}</td>
                        <td className="p-3">{b.pickupDate}</td>
                        <td className="p-3 truncate max-w-[180px]">{b.pickupLocation} → {b.dropLocation}</td>
                        <td className="p-3 font-bold text-white">₹{b.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              b.bookingStatus === 'Confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : b.bookingStatus === 'Completed'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {b.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: MANAGE BOOKINGS */}
        {activeSection === 'bookings' && (
          <div className="bg-[#0E1729] rounded-2xl border border-white/10 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">All Client Reservations</h3>
                <p className="text-xs text-gray-400">Update status, assign drivers, or review customer notes</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, name, city..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#142038] border border-white/10 text-white text-xs focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#142038] text-gray-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">ID & Date</th>
                    <th className="p-3">Customer & Contact</th>
                    <th className="p-3">Vehicle</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {bookings
                    .filter((b) =>
                      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      b.dropLocation.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((b) => (
                      <tr key={b.id} className="hover:bg-white/5">
                        <td className="p-3">
                          <span className="font-mono font-bold text-[#C9A227] block">{b.id}</span>
                          <span className="text-[11px] text-gray-400">{b.pickupDate} ({b.pickupTime})</span>
                        </td>
                        <td className="p-3">
                          <strong className="text-white block">{b.customer.fullName}</strong>
                          <span className="text-gray-400 text-[11px]">{b.customer.mobileNumber}</span>
                        </td>
                        <td className="p-3">
                          <div className="font-medium text-white">{b.selectedVehicleName}</div>
                          <div className="text-[10px] text-gray-400">{b.passengers} Passengers</div>
                        </td>
                        <td className="p-3 max-w-[200px]">
                          <div className="truncate text-white">To: {b.dropLocation}</div>
                          <div className="truncate text-gray-400 text-[11px]">From: {b.pickupLocation}</div>
                        </td>
                        <td className="p-3">
                          <strong className="text-white text-sm">₹{b.totalAmount.toLocaleString('en-IN')}</strong>
                          <div className="text-[10px] text-emerald-400">{b.paymentStatus}</div>
                        </td>
                        <td className="p-3">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                            className="bg-[#142038] border border-white/10 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#C9A227]"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <a
                            href={`https://wa.me/91${b.customer.mobileNumber}?text=Hello%20${encodeURIComponent(b.customer.fullName)},%20this%20is%20Vijaya%20Travels%20regarding%20booking%20${b.id}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#25D366]/20 text-[#25D366] font-bold text-[11px] hover:bg-[#25D366]/30 inline-flex items-center gap-1"
                          >
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: FLEET MANAGEMENT */}
        {activeSection === 'fleet' && (
          <div className="bg-[#0E1729] rounded-2xl border border-white/10 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Vehicle Fleet Inventory</h3>
                <p className="text-xs text-gray-400">Toggle real-time availability status for online search radar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => (
                <div key={v.id} className="p-4 rounded-xl bg-[#142038] border border-white/5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={v.image} alt={v.name} className="w-16 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{v.name}</h4>
                      <p className="text-[11px] text-gray-400">{v.categoryLabel} • {v.seats} Seats</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-300 flex items-center justify-between pt-2 border-t border-white/10">
                    <span>Outstation: <strong>₹{v.rates.outstationPerKm}/km</strong></span>
                    <span>Local: <strong>₹{v.rates.local8hr80km}</strong></span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        v.availabilityStatus === 'Available'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {v.availabilityStatus}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleVehicleAvailability(v.id)}
                      className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                    >
                      Toggle Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: INQUIRIES */}
        {activeSection === 'inquiries' && (
          <div className="bg-[#0E1729] rounded-2xl border border-white/10 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Customer Web Inquiries</h3>
              <p className="text-xs text-gray-400">Leads captured from Contact Page and Custom Tour builder</p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-xl bg-[#142038] border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#C9A227]">{inq.id}</span>
                      <strong className="text-white text-sm">{inq.fullName}</strong>
                      <span className="text-xs text-gray-400">({inq.phone} • {inq.email})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                        className="bg-[#0B1220] border border-white/10 text-white rounded-lg px-2 py-1 text-xs"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                      <a
                        href={`tel:${inq.phone.replace(/[^0-9+]/g, '')}`}
                        className="p-1.5 rounded-lg bg-[#C9A227] text-[#0B1220]"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 bg-[#0B1220] p-3 rounded-lg border border-white/5">
                    "{inq.message}"
                  </p>

                  <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1">
                    <span>Service: <strong className="text-white capitalize">{inq.service.replace('-', ' ')}</strong></span>
                    <span>Received: {new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
