import React, { useState } from 'react';
import { 
  Wrench, 
  Snowflake, 
  Zap, 
  Droplets, 
  PaintBucket, 
  Sparkles, 
  Car, 
  Smartphone,
  ShieldCheck,
  Clock,
  PhoneCall,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function ServicesExplorer({ 
  openBookingModal, 
  isDedicatedPage = false,
  onViewAllServices 
}) {
  const serviceCards = [
    {
      id: "appliances",
      title: "Home Appliance Repair",
      description: "Expert repair for washing machines, refrigerators, microwaves, water purifiers, and all home appliances. Our certified technicians diagnose and fix issues quickly.",
      icon: Wrench,
      iconBg: "#e0f2fe",
      iconColor: "#0284c7",
      features: ["Same-day service", "90-day warranty", "Genuine spare parts"],
      serviceName: "Washing Machine & Refrigerator Repair",
      price: 399
    },
    {
      id: "ac-repair",
      title: "AC Repair & Installation",
      description: "Complete AC solutions including installation, repair, gas refilling, and annual maintenance. We service all major brands including LG, Samsung, Daikin, and more.",
      icon: Snowflake,
      iconBg: "#ecfeff",
      iconColor: "#0891b2",
      features: ["All brands serviced", "AMC available", "Energy efficiency check"],
      serviceName: "AC Power Jet Cleaning & Gas Charging",
      price: 499
    },
    {
      id: "electrical",
      title: "Electrical Services",
      description: "Professional electrical services for wiring, repairs, installations, and safety inspections. Licensed electricians for residential and commercial needs.",
      icon: Zap,
      iconBg: "#fefce8",
      iconColor: "#ca8a04",
      features: ["Safety certified", "24/7 emergency", "Complete solutions"],
      serviceName: "Complete House Wiring & MCB Fix",
      price: 299
    },
    {
      id: "plumbing",
      title: "Plumbing Services",
      description: "Expert plumbing solutions for leak repairs, pipe fitting, bathroom renovations, and drainage issues. Quick response for emergency plumbing needs.",
      icon: Droplets,
      iconBg: "#f0fdf4",
      iconColor: "#16a34a",
      features: ["Leak detection", "Bathroom fitting", "Drain cleaning"],
      serviceName: "Plumber Leak Fix & Pipe Fitting",
      price: 249
    },
    {
      id: "carpentry-painting",
      title: "Carpentry & Painting",
      description: "Quality carpentry work and professional painting services. From furniture repair to complete home makeovers with premium materials.",
      icon: PaintBucket,
      iconBg: "#fff4ec",
      iconColor: "#ea580c",
      features: ["Custom furniture", "Wall textures", "Wood polishing"],
      serviceName: "Home Painting & Woodwork Repair",
      price: 599
    },
    {
      id: "cleaning",
      title: "Cleaning Services",
      description: "Deep cleaning, sanitization, and regular housekeeping services. Professional equipment and eco-friendly cleaning solutions for a spotless home.",
      icon: Sparkles,
      iconBg: "#fdf2f8",
      iconColor: "#db2777",
      features: ["Deep cleaning", "Move-in/out", "Office cleaning"],
      serviceName: "Full Home Deep Cleaning & Sanitization",
      price: 899
    },
    {
      id: "automobile",
      title: "Car & Bike Services",
      description: "Complete automobile care including regular servicing, repairs, detailing, and roadside assistance. Doorstep service available.",
      icon: Car,
      iconBg: "#faf5ff",
      iconColor: "#9333ea",
      features: ["Doorstep service", "All vehicle types", "Genuine parts"],
      serviceName: "Bike & Car Periodic Doorstep Service",
      price: 449
    },
    {
      id: "electronics",
      title: "Electronics Repair",
      description: "Expert repair for mobiles, laptops, TVs, and all electronic gadgets. Data recovery, screen replacement, and motherboard repairs.",
      icon: Smartphone,
      iconBg: "#f3f4f6",
      iconColor: "#4f46e5",
      features: ["All brands", "Data recovery", "Quick turnaround"],
      serviceName: "Smart TV & Laptop Diagnostics",
      price: 349
    }
  ];

  const handleCardClick = (card) => {
    openBookingModal({
      categoryName: card.title,
      selectedService: { 
        name: card.serviceName, 
        price: card.price 
      }
    });
  };

  return (
    <div className="neat-services-page-wrap" id="services">
      <section className="neat-services-section">
        <div className="container">
          {/* Header Matching Screenshot 2 & 6 */}
          <div className="neat-section-header text-center">
            <div className="neat-badge-pill">
              Our Services
            </div>
            <h2 className="neat-heading-title">
              Expert Solutions for Every Need
            </h2>
            <p className="neat-subtitle">
              {isDedicatedPage 
                ? "From home repairs to auto services, our verified professionals deliver quality work with transparent pricing. Book instantly and experience the WOW difference."
                : "From home repairs to auto services, our verified professionals deliver quality work with transparent pricing."
              }
            </p>

            {/* Dedicated Page Trust Bar Matching Screenshot 6 */}
            {isDedicatedPage && (
              <div className="neat-services-trust-bar">
                <div className="services-trust-item">
                  <ShieldCheck size={18} className="text-orange" />
                  <span>Verified Professionals</span>
                </div>
                <div className="services-trust-item">
                  <Clock size={18} className="text-orange" />
                  <span>Same-Day Service</span>
                </div>
                <div className="services-trust-item">
                  <PhoneCall size={18} className="text-orange" />
                  <span>24/7 Support</span>
                </div>
              </div>
            )}
          </div>

          {/* HOME VIEW: Clean 4x2 Grid Matching Screenshot 2 Exactly */}
          {!isDedicatedPage ? (
            <>
              <div className="neat-services-homepage-grid">
                {serviceCards.map((card) => {
                  const IconComponent = card.icon;
                  return (
                    <div 
                      key={card.id} 
                      className="neat-service-home-card"
                      onClick={() => handleCardClick(card)}
                      role="button"
                      tabIndex={0}
                    >
                      <div 
                        className="service-home-icon-box"
                        style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <h3 className="service-home-card-title">{card.title}</h3>
                      <p className="service-home-card-desc">{card.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Centered Dark Navy Button Matching Screenshot 2 Exactly */}
              <div className="text-center mt-10">
                <button 
                  className="btn btn-neat-view-all-services"
                  onClick={onViewAllServices}
                >
                  <span>View All Services</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          ) : (
            /* DEDICATED SERVICES PAGE: Expanded 2-Col Cards Matching Screenshot 6 */
            <div className="neat-services-two-col-grid">
              {serviceCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div 
                    key={card.id} 
                    className="neat-service-two-col-card"
                    onClick={() => handleCardClick(card)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="two-col-card-top">
                      <div 
                        className="two-col-icon-box"
                        style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div className="two-col-title-wrap">
                        <h3 className="two-col-card-title">{card.title}</h3>
                      </div>
                    </div>

                    <p className="two-col-card-desc">{card.description}</p>

                    <div className="two-col-features-row">
                      {card.features.map((feature, fIdx) => (
                        <span key={fIdx} className="two-col-feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="two-col-action-wrap">
                      <button 
                        className="btn btn-neat-book-now"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(card);
                        }}
                      >
                        <span>Book Now</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA on dedicated page */}
      {isDedicatedPage && (
        <section className="neat-services-cta-banner">
          <div className="container text-center">
            <h2 className="cta-banner-title">
              Can't find what you're looking for?
            </h2>
            <p className="cta-banner-desc">
              Contact us directly and we'll help you find the right service for your needs.
            </p>
            <a href={`tel:${companyInfo.phone}`} className="btn btn-neat-primary btn-call-now">
              <PhoneCall size={18} />
              <span>Call Us Now</span>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
