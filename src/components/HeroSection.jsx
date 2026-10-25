import React from 'react';
import { 
  Users, 
  Star, 
  Clock, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function HeroSection({ 
  openBookingModal, 
  onBookServiceClick,
  onPartnerClick 
}) {
  const stats = [
    {
      id: 1,
      icon: Users,
      value: "50K+",
      label: "Happy Customers"
    },
    {
      id: 2,
      icon: Star,
      value: "4.9",
      label: "Average Rating"
    },
    {
      id: 3,
      icon: Clock,
      value: "30 min",
      label: "Avg. Response Time"
    },
    {
      id: 4,
      icon: CheckCircle2,
      value: "100%",
      label: "Satisfaction Guaranteed"
    }
  ];

  return (
    <section className="neat-hero-section">
      <div className="container neat-hero-container">
        {/* Top Trust Badge Matching Screenshot 1 */}
        <div className="neat-hero-badge-wrap">
          <div className="neat-trust-pill">
            <span className="neat-orange-dot"></span>
            <span>Trusted by 50,000+ customers across India</span>
          </div>
        </div>

        {/* Hero Title Matching Screenshot 1 Exactly */}
        <h1 className="neat-hero-title">
          Fixing Everything. <span className="text-orange-glow">The</span> <br />
          <span className="text-orange-glow">
            <span className="title-bullet">•</span> WOW Way.
          </span>
        </h1>

        {/* Hero Subtitle Matching Screenshot 1 Exactly */}
        <p className="neat-hero-subtitle">
          Book trusted home & auto services instantly. Buy and sell refurbished items with confidence. Your one-stop solution for all repair and service needs.
        </p>

        {/* Dual Action Buttons Matching Screenshot 1 Exactly */}
        <div className="neat-hero-buttons-row">
          <button 
            className="btn btn-neat-primary"
            onClick={() => {
              if (onBookServiceClick) {
                onBookServiceClick();
              } else if (openBookingModal) {
                openBookingModal();
              }
            }}
          >
            <span>Book a Service</span>
            <ArrowRight size={18} />
          </button>

          <button 
            className="btn btn-neat-secondary"
            onClick={() => {
              if (onPartnerClick) {
                onPartnerClick();
              } else {
                const partnerSection = document.getElementById('partner-ecosystem');
                if (partnerSection) partnerSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Become a Partner</span>
          </button>
        </div>

        {/* 4 Floating Stat Cards Matching Screenshot 1 Exactly */}
        <div className="neat-hero-stats-grid">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="neat-stat-card">
                <div className="neat-stat-icon-box">
                  <IconComponent size={20} className="text-orange" />
                </div>
                <div className="neat-stat-info">
                  <strong className="neat-stat-value">{stat.value}</strong>
                  <span className="neat-stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


