import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  User, 
  PhoneCall, 
  CheckCircle2, 
  Car, 
  Wrench, 
  ArrowRight,
  MessageSquare,
  Building2,
  Truck,
  RotateCcw
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function BookingTracker({ activeBooking }) {
  const [searchInput, setSearchInput] = useState('');
  const [trackingMode, setTrackingMode] = useState('garage-transit'); // 'onsite' or 'garage-transit'

  const [currentBooking, setCurrentBooking] = useState(
    activeBooking || {
      id: "FW-BLR-8924",
      service: "Major Car Engine & AC Cooling System Overhaul",
      customerName: "Praveen Sharma",
      phone: "+91 98860 11420",
      area: "Beside Shobha City, Chokkana Halli, Bengaluru - 64",
      status: "In Garage Bay #03",
      technician: {
        name: "Manjunath S.",
        role: "Senior Automobile & Electrical Lead",
        rating: 4.9,
        reviews: 214,
        badgeId: "FW-PRO-402",
        phone: "+91 98801 84210",
        vehicle: "FixWow Transit Tow / Mobile Unit (KA-04-MB-1029)",
        eta: "14 Minutes"
      },
      price: 1499,
      dateSlot: "Today Express",
      providerType: "FixWow Certified In-House Staff"
    }
  );

  const onsiteSteps = [
    { title: "Booking Confirmed", desc: "Request received & slotted", completed: true },
    { title: "Expert Assigned", desc: "Manjunath S. allocated", completed: true },
    { title: "On The Way (ETA 14m)", desc: "En route to your location", completed: true, active: true },
    { title: "Doorstep Repair", desc: "Front-of-eyes repair with OEM spares", completed: false },
    { title: "Quality Guarantee", desc: "Digital bill & 30-day warranty", completed: false }
  ];

  const garageTransitSteps = [
    { title: "1. Doorstep Pickup", desc: "Safely picked up from your home", completed: true },
    { title: "2. In FixWow Mega Garage", desc: "Chokkana Halli Hub - Bay #03", completed: true, active: true },
    { title: "3. Heavy Machine Repairs", desc: "Engine overhaul & PCB diagnostic", completed: false },
    { title: "4. 40-Point Quality Test", desc: "Dyno test & safety check", completed: false },
    { title: "5. Free Return Drop", desc: "Delivered back to your doorstep", completed: false }
  ];

  const currentSteps = trackingMode === 'onsite' ? onsiteSteps : garageTransitSteps;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentBooking(prev => ({
        ...prev,
        id: searchInput.toUpperCase()
      }));
    }
  };

  return (
    <section className="tracker-section" id="booking-tracker">
      <div className="container">
        {/* Header */}
        <div className="section-header-row">
          <div>
            <div className="badge badge-orange mb-2">Live Status & Transit Portal</div>
            <h2 className="section-title">
              Track Your <span className="gradient-text-orange">Doorstep & Garage Repair</span> Status
            </h2>
            <p className="section-subtitle">
              Whether performed on-site at your doorstep or inside the FixWow Central Mega Garage — monitor live technician ETA, diagnostic progress, bay servicing, and free return delivery.
            </p>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="tracker-search-form">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Enter Booking ID (e.g. FW-BLR-8924)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Track
            </button>
          </form>
        </div>

        {/* Tracking Mode Switcher Tabs */}
        <div className="tracker-mode-pills">
          <button 
            className={`tracker-pill-btn ${trackingMode === 'garage-transit' ? 'active' : ''}`}
            onClick={() => setTrackingMode('garage-transit')}
          >
            <Building2 size={16} />
            <span>🏢 FixWow Mega Garage Transit & Return Drop</span>
          </button>
          <button 
            className={`tracker-pill-btn ${trackingMode === 'onsite' ? 'active' : ''}`}
            onClick={() => setTrackingMode('onsite')}
          >
            <Wrench size={16} />
            <span>🏠 On-Site Doorstep Resolution</span>
          </button>
        </div>

        {/* Tracker Card */}
        <div className="tracker-card glass-card">
          {/* Top Booking ID & Status Bar */}
          <div className="tracker-top-bar">
            <div className="tracker-id-wrap">
              <span className="tracker-id-tag">Booking ID:</span>
              <strong className="booking-ref-number text-orange">{currentBooking.id}</strong>
              <span className="live-pulse-badge">
                <span className="live-dot pulse"></span> 
                {trackingMode === 'garage-transit' ? 'In Mega Garage Bay #03' : 'Live Doorstep Dispatch'}
              </span>
            </div>

            <div className="tracker-service-meta">
              <strong>{currentBooking.service}</strong>
              <span>📍 {currentBooking.area}</span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="stepper-horizontal">
            {currentSteps.map((step, idx) => (
              <div 
                key={idx} 
                className={`step-node ${step.completed ? 'completed' : ''} ${step.active ? 'active-pulse' : ''}`}
              >
                <div className="step-marker">
                  {step.completed ? <CheckCircle2 size={20} /> : <span>{idx + 1}</span>}
                </div>
                <div className="step-text">
                  <strong className="step-title">{step.title}</strong>
                  <span className="step-desc">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technician Details & Central Garage info */}
          <div className="tracker-details-grid">
            {/* Technician Profile Card */}
            <div className="pro-profile-card">
              <div className="pro-badge-header">
                <ShieldCheck size={16} className="text-orange" />
                <span>Assigned Fixer / Transit Driver</span>
              </div>

              <div className="pro-person-row">
                <div className="pro-avatar">
                  <User size={32} />
                </div>
                <div className="pro-info">
                  <h4>{currentBooking.technician.name}</h4>
                  <p>{currentBooking.technician.role}</p>
                  <div className="pro-rating-pill">
                    ⭐ {currentBooking.technician.rating} ({currentBooking.technician.reviews} reviews) • ID: {currentBooking.technician.badgeId}
                  </div>
                </div>
              </div>

              <div className="pro-movement-box">
                <div className="movement-row">
                  <Car size={16} className="text-blue" />
                  <span><strong>Transit Vehicle:</strong> {currentBooking.technician.vehicle}</span>
                </div>
                <div className="movement-row">
                  <Clock size={16} className="text-orange" />
                  <span><strong>Current ETA:</strong> <span className="eta-badge">{currentBooking.technician.eta}</span></span>
                </div>
              </div>

              <div className="pro-actions-row">
                <a 
                  href={`tel:${currentBooking.technician.phone}`} 
                  className="btn btn-secondary btn-sm flex-1"
                >
                  <PhoneCall size={15} />
                  <span>Call Pro</span>
                </a>
                <a 
                  href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Need%20update%20on%20${currentBooking.id}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline btn-sm flex-1"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Video</span>
                </a>
              </div>
            </div>

            {/* Garage Facility Node Info */}
            <div className="dispatch-hub-card">
              <div className="pro-badge-header">
                <Building2 size={16} className="text-blue" />
                <span>FixWow Central Service Centre & Garage</span>
              </div>

              <div className="hub-route-info">
                <p>
                  Active Facility: <strong>FixWow Central Mega Workshop</strong>: <br />
                  <span className="text-muted">117, Vijayaraja Estates, Beside Shobha City, Chokkana Halli, Bengaluru - 64</span>
                </p>
                <div className="hub-metrics-grid">
                  <div className="hub-metric">
                    <span>Assigned Bay</span>
                    <strong className="text-orange">Bay #03 (Hydraulic Lift)</strong>
                  </div>
                  <div className="hub-metric">
                    <span>Job Card</span>
                    <strong className="text-green">✓ Video Logged & Approved</strong>
                  </div>
                  <div className="hub-metric">
                    <span>Return Delivery</span>
                    <strong className="text-green">✓ 100% Free Doorstep Drop</strong>
                  </div>
                </div>
              </div>

              <div className="hub-safety-note">
                <ShieldCheck size={18} className="text-orange" />
                <span>Safe Transit Insurance up to ₹10 Lakhs is automatically activated for all garage transit items.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
