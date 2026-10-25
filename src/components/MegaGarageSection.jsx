import React, { useState } from 'react';
import { 
  Building2, 
  Wrench, 
  Truck, 
  Home, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Settings, 
  Sparkles, 
  Car, 
  Tv, 
  RotateCcw,
  Navigation,
  PhoneCall
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function MegaGarageSection({ openBookingModal }) {
  const [activeWorkflow, setActiveWorkflow] = useState('both'); // 'doorstep', 'garage', 'both'

  const garageCapabilities = [
    {
      title: "Automobile Mega Bays (Cars & Bikes)",
      icon: Car,
      color: "#ff6200",
      description: "Hydraulic lifts, computerized 3D wheel alignment, engine overhaul bays, and pressurized paint booth.",
      highlights: [
        "Major Engine & Transmission Overhauls",
        "Chassis & Frame Straightening",
        "Scratch Removal & Heated Paint Booth",
        "Computerized OBD-II Sensor Diagnostics"
      ]
    },
    {
      title: "Electronics & Appliance Repair Lab",
      icon: Tv,
      color: "#0062cc",
      description: "Chip-level diagnostic testing benches for AC inverter PCB boards, refrigerator compressors, and Smart TVs.",
      highlights: [
        "Inverter PCB Board Micro-soldering",
        "Heavy Compressor Coil Brazing & Vacuuming",
        "Washing Machine Tub & Bearing Extraction",
        "Smart TV Panel & Backlight Rebuilding"
      ]
    },
    {
      title: "Heavy Tools & Machining Workshop",
      icon: Settings,
      color: "#ffaa00",
      description: "Industrial lathe turning, drill boring, copper pipe bending, and heavy motor rewinding facility.",
      highlights: [
        "Electric Motor & Pump Armature Rewinding",
        "Precision Metal Lathe Turning",
        "High-Pressure Hose Crimping",
        "OEM Spare Parts Calibration"
      ]
    }
  ];

  return (
    <section className="garage-section" id="fixwow-garage">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <div>
            <div className="badge badge-orange mb-2">
              <Building2 size={13} /> FixWow Mega Garage & Advanced Workshop
            </div>
            <h2 className="section-title">
              At Your Doorstep or In Our Mega Garage — <br />
              <span className="gradient-text-orange">Free Pickup, Advanced Repairs & Return Delivery!</span>
            </h2>
            <p className="section-subtitle">
              If the repair is minor, our technician <strong>resolves it right at your home</strong>. 
              For major repairs requiring heavy machinery and service bays, we <strong>transport it to the FixWow Mega Garage via secure transit</strong>, perform precision repairs, and safely deliver it back to your doorstep!
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => openBookingModal({
              selectedService: { name: "Garage Inspection & Free Pickup Service", price: 399 },
              categoryName: "Garage & Service Centre"
            })}
          >
            <Truck size={18} />
            <span>Book Inspection / Garage Pickup</span>
          </button>
        </div>

        {/* Dual Delivery Model Explainer Card */}
        <div className="dual-delivery-card glass-card">
          <div className="dual-delivery-header">
            <h3>How Does The FixWow Dual Service Model Work?</h3>
            <p>No need to visit garages or workshops yourself — FixWow manages end-to-end doorstep logistics!</p>
          </div>

          <div className="dual-flow-grid">
            {/* Pathway A: Onsite Doorstep Repair */}
            <div className="flow-path-card path-onsite">
              <div className="flow-badge onsite-tag">
                <Home size={15} />
                <strong>Track 1: On-Site Doorstep Resolution</strong>
              </div>
              <h4>When Repairs Can Be Solved Onsite</h4>
              <p>For routine servicing and quick fixes, our technician arrives with a complete toolkit and genuine spare parts.</p>

              <div className="flow-steps-mini">
                <div className="step-bullet">
                  <span className="step-num">1</span>
                  <div>
                    <strong>Doorstep Arrival (30-45 mins):</strong>
                    <span>Technician arrives with certified equipment.</span>
                  </div>
                </div>
                <div className="step-bullet">
                  <span className="step-num">2</span>
                  <div>
                    <strong>Front-of-Eyes Repair:</strong>
                    <span>Oil change, puncture repair, tap leak, AC power jet wash, and MCB troubleshooting completed on the spot.</span>
                  </div>
                </div>
                <div className="step-bullet">
                  <span className="step-num">3</span>
                  <div>
                    <strong>Instant Testing & Digital Bill:</strong>
                    <span>30-Day warranty card and digital invoice handed over on-site.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pathway B: Service Centre / Garage Transit */}
            <div className="flow-path-card path-garage">
              <div className="flow-badge garage-tag">
                <Building2 size={15} />
                <strong>Track 2: FixWow Mega Garage Transit</strong>
              </div>
              <h4>When Heavy Machinery / Service Bays Are Required</h4>
              <p>For major engine overhauls, accidental denting & painting, or complex electronic PCB rebuilding requiring workshop infrastructure.</p>

              <div className="flow-steps-mini">
                <div className="step-bullet">
                  <span className="step-num">1</span>
                  <div>
                    <strong>On-Site Inspection & Safe Pickup:</strong>
                    <span>Technician inspects on-site, generates a digital job-card with photo proof, and safely transports via transit carrier.</span>
                  </div>
                </div>
                <div className="step-bullet">
                  <span className="step-num">2</span>
                  <div>
                    <strong>Mega Garage Precision Work:</strong>
                    <span>Hydraulic lifts, diagnostic scan benches, lathe turning, and climate-controlled paint booths operated by senior specialists.</span>
                  </div>
                </div>
                <div className="step-bullet">
                  <span className="step-num">3</span>
                  <div>
                    <strong>Quality Audit & Free Return Drop:</strong>
                    <span>After passing a strict 40-point quality checklist, your item or vehicle is safely returned right to your doorstep.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee bar */}
          <div className="dual-card-footer">
            <div className="footer-perk-item">
              <ShieldCheck size={18} className="text-orange" />
              <span>100% Genuine OEM Spare Parts Used</span>
            </div>
            <div className="footer-perk-item">
              <RotateCcw size={18} className="text-blue" />
              <span>Free Pickup & Drop Guarantee</span>
            </div>
            <div className="footer-perk-item">
              <Clock size={18} className="text-gold" />
              <span>Digital Video & Photo Updates of Garage Repair</span>
            </div>
          </div>
        </div>

        {/* Mega Garage Facilities Showcase */}
        <div className="garage-facilities-title text-center mt-5 mb-4">
          <h3 className="section-title">
            Inside The <span className="gradient-text-orange">FixWow Mega Garage & Advanced Workshop</span>
          </h3>
          <p className="section-subtitle mx-auto">
            State-of-the-art diagnostic machinery and dedicated bays at our Bengaluru Central Hub (117, Vijayaraja Estates, Chokkana Halli - 64) and certified partner workshop network:
          </p>
        </div>

        <div className="garage-capabilities-grid">
          {garageCapabilities.map((cap, idx) => {
            const IconComp = cap.icon;
            return (
              <div key={idx} className="capability-card glass-card">
                <div className="cap-icon-box" style={{ background: `${cap.color}15`, color: cap.color }}>
                  <IconComp size={24} />
                </div>
                <h4 className="cap-title">{cap.title}</h4>
                <p className="cap-desc">{cap.description}</p>

                <div className="cap-highlights-list">
                  {cap.highlights.map((h, hidx) => (
                    <div key={hidx} className="cap-highlight-row">
                      <CheckCircle2 size={15} style={{ color: cap.color }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Garage Location Badge Callout */}
        <div className="garage-location-callout glass-card mt-4">
          <div className="callout-content">
            <div className="callout-badge">
              <Navigation size={16} /> Flagship Workshop Hub: Bengaluru - 64
            </div>
            <h4>FixWow Central Garage & Diagnostics Center</h4>
            <p>
              <strong>117, Vijayaraja Estates, Beside Shobha City, Chokkana Halli, Bengaluru - 560064</strong>
              <br />
              (Direct customer vehicle walk-in allowed or call for Free Doorstep Flatbed Tow / Pickup)
            </p>
          </div>

          <div className="callout-actions">
            <a href={`tel:${companyInfo.phone}`} className="btn btn-secondary">
              <PhoneCall size={16} />
              <span>Call Garage Helpdesk</span>
            </a>
            <button 
              className="btn btn-primary"
              onClick={() => openBookingModal({
                selectedService: { name: "Major Garage Repair / Pickup Service", price: 599 },
                categoryName: "FixWow Mega Garage"
              })}
            >
              <span>Schedule Garage Pickup</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
