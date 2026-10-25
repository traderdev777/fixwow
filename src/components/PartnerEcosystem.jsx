import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Building2, 
  DollarSign, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  X, 
  Send,
  FileCheck
} from 'lucide-react';
import { bangaloreAreas, companyInfo } from '../data/companyInfo';

export default function PartnerEcosystem() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerType, setPartnerType] = useState('technician'); // 'technician', 'workshop', 'dealer'
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    trade: 'Electrician & Wiring',
    experience: '3-5 Years',
    area: bangaloreAreas[0],
    toolsOwned: 'Yes, complete toolkit'
  });

  const valueProps = [
    "Zero upfront or registration cost",
    "Direct quality leads in your locality",
    "Training and support from FixWow team",
    "Marketing and brand visibility boost",
    "Flexible working hours",
    "PAN India growth opportunities"
  ];

  const steps = [
    {
      step: "01",
      icon: Users,
      title: "Register",
      description: "Simple registration process with zero upfront cost"
    },
    {
      step: "02",
      icon: Zap,
      title: "Get Leads",
      description: "Receive quality service requests in your area"
    },
    {
      step: "03",
      icon: TrendingUp,
      title: "Grow Business",
      description: "Expand your customer base and increase revenue"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPartnerModalOpen(false);
    }, 2800);
  };

  return (
    <section className="neat-partner-section" id="become-a-partner">
      <div className="container">
        <div className="neat-partner-grid">
          {/* Left Column Matching Screenshot 4 */}
          <div className="neat-partner-left">
            <div className="neat-partner-badge">
              Partner With Us
            </div>

            <h2 className="neat-partner-title">
              Grow Your Business with FixWow
            </h2>

            <p className="neat-partner-subtitle">
              Join our network of trusted service partners. Whether you're a technician, service center, or dealer – we help you reach more customers and scale your business.
            </p>

            {/* 6 Value Props in 2 Columns Matching Screenshot 4 */}
            <div className="neat-partner-props-grid">
              {valueProps.map((prop, idx) => (
                <div key={idx} className="neat-prop-item">
                  <CheckCircle2 size={18} className="text-orange" />
                  <span>{prop}</span>
                </div>
              ))}
            </div>

            {/* Partner Category Pills Matching Screenshot 4 */}
            <div className="neat-partner-types-row">
              <span className="neat-type-pill">
                <Users size={16} /> Technicians
              </span>
              <span className="neat-type-pill">
                <ShieldCheck size={16} /> Service Centers
              </span>
              <span className="neat-type-pill">
                <DollarSign size={16} /> Dealers
              </span>
            </div>

            {/* CTA Button Matching Screenshot 4 */}
            <div className="neat-partner-cta-wrap">
              <button 
                className="btn btn-neat-primary btn-lg"
                onClick={() => setPartnerModalOpen(true)}
              >
                <span>Register as Partner</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column "How It Works" Card Matching Screenshot 4 */}
          <div className="neat-partner-right">
            <div className="neat-how-it-works-card">
              <h3 className="how-it-works-title">How It Works</h3>

              <div className="how-it-works-steps-list">
                {steps.map((st, idx) => {
                  const IconComp = st.icon;
                  return (
                    <div key={idx} className="how-it-works-step-item">
                      <div className="step-num-icon-box">
                        <span className="step-badge-num">{st.step}</span>
                        <IconComp size={20} />
                      </div>
                      <div className="step-info">
                        <h4 className="step-heading">{st.title}</h4>
                        <p className="step-desc">{st.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Registration Modal */}
      {partnerModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card neat-partner-modal glass-card">
            <div className="modal-header">
              <div>
                <div className="neat-badge-pill mb-1">Partner Onboarding</div>
                <h3 className="modal-title">Join FixWow Partner Network</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setPartnerModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="text-center p-4">
                <CheckCircle2 size={48} className="text-orange mx-auto mb-3" />
                <h3>Application Received!</h3>
                <p>Welcome to FixWow! Our partner relationship manager will contact you within 24 hours to finalize verification and start routing leads.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form-body">
                <div className="provider-options-grid mb-3">
                  <div 
                    className={`provider-option-card ${partnerType === 'technician' ? 'selected' : ''}`}
                    onClick={() => setPartnerType('technician')}
                  >
                    <strong>Skilled Technician</strong>
                    <p>Electrician, Plumber, Mechanic</p>
                  </div>

                  <div 
                    className={`provider-option-card ${partnerType === 'workshop' ? 'selected' : ''}`}
                    onClick={() => setPartnerType('workshop')}
                  >
                    <strong>Service Centre / Garage</strong>
                    <p>75-85% Profit Sharing Franchise</p>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Your Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh Kumar" 
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone Number (WhatsApp) *</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Skill / Specialization *</label>
                    <select 
                      value={form.trade}
                      onChange={(e) => setForm({ ...form, trade: e.target.value })}
                    >
                      <option>Bike & Two-Wheeler Mechanic</option>
                      <option>Car Repair & Maintenance</option>
                      <option>Electrician & House Wiring</option>
                      <option>AC Repair & Installation</option>
                      <option>Plumbing & Pipe Fitting</option>
                      <option>Carpentry & Painting</option>
                      <option>Deep Cleaning Specialist</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Bengaluru Service Locality *</label>
                    <select 
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                    >
                      {bangaloreAreas.map((area, idx) => (
                        <option key={idx} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-neat-primary btn-block btn-lg mt-3">
                  <FileCheck size={18} />
                  <span>Submit Partner Registration</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
