import React from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Navigation, 
  Building2, 
  Wrench, 
  Package, 
  ArrowUpRight
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function FixWowHubSection() {
  return (
    <section className="hub-section" id="fixwow-hub">
      <div className="container">
        <div className="hub-card glass-card">
          <div className="hub-grid">
            {/* Left Content */}
            <div className="hub-text-col">
              <div className="badge badge-orange mb-2">Central Operations & Diagnostics Hub</div>
              <h2 className="hub-title">
                Visit or Contact <span className="gradient-text-orange">FixWow Central Hub</span>
              </h2>
              <p className="hub-desc">
                Our flagship headquarters and diagnostics center in Bengaluru coordinates all doorstep dispatches, technician KYC certifications, spare part logistics, and certified refurbished goods warranties.
              </p>

              <div className="hub-address-card">
                <div className="hub-pin-icon-wrap">
                  <MapPin size={28} className="text-orange" />
                </div>
                <div className="hub-address-details">
                  <h4>Official Headquarters Address:</h4>
                  <address className="official-address">
                    {companyInfo.address.line1}, <br />
                    <strong>{companyInfo.address.landmark}</strong>, <br />
                    {companyInfo.address.area}, {companyInfo.address.city} - {companyInfo.address.pincode} (Bengaluru - 64)
                  </address>
                </div>
              </div>

              {/* Quick Hub Hub Features */}
              <div className="hub-features-row">
                <div className="hub-feature-pill">
                  <Wrench size={14} className="text-orange" />
                  <span>Doorstep Fleet Dispatch</span>
                </div>
                <div className="hub-feature-pill">
                  <Package size={14} className="text-blue" />
                  <span>Central Spare Parts Depot</span>
                </div>
                <div className="hub-feature-pill">
                  <Building2 size={14} className="text-gold" />
                  <span>Walk-in Partner Onboarding</span>
                </div>
              </div>

              {/* Contact numbers row */}
              <div className="hub-contact-buttons">
                <a href={`tel:${companyInfo.phone}`} className="btn btn-primary">
                  <PhoneCall size={16} />
                  <span>Call Hub: {companyInfo.phone}</span>
                </a>

                <a 
                  href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20FixWow%20Team%20Chokkana%20Halli`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  💬 WhatsApp Helpdesk
                </a>

                <a 
                  href={`https://maps.google.com/?q=117+Vijayaraja+Estates+Shobha+City+Chokkana+Halli+Bengaluru`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  <Navigation size={16} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Right Map & Hours Card */}
            <div className="hub-visual-col">
              <div className="map-simulation-card">
                <div className="map-badge-overlay">
                  <span className="live-dot pulse"></span>
                  <strong>Live Operations Node #01</strong>
                </div>

                <div className="map-graphic-box">
                  <div className="radar-circle radar-1"></div>
                  <div className="radar-circle radar-2"></div>
                  <div className="radar-circle radar-3"></div>

                  <div className="map-center-pin">
                    <div className="pin-pulse"></div>
                    <div className="pin-icon">
                      <img src="/fixwow-logo.png" alt="FixWow Hub" className="pin-logo" />
                    </div>
                    <span className="pin-label">Chokkana Halli Hub</span>
                  </div>

                  <div className="service-radius-pill">
                    ⚡ 30-Min Rapid Doorstep Radius: Yelahanka, Thanisandra, Hebbal, Shobha City, Manyata & Beyond
                  </div>
                </div>

                <div className="hub-timings-strip">
                  <div className="timing-item">
                    <Clock size={16} className="text-orange" />
                    <div>
                      <strong>Operating Hours</strong>
                      <span>7:00 AM – 10:00 PM (Daily)</span>
                    </div>
                  </div>
                  <div className="timing-item">
                    <ShieldCheck size={16} className="text-green" />
                    <div>
                      <strong>Breakdown & RSA</strong>
                      <span>24x7 Emergency Help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
