import React from 'react';
import { 
  ShieldCheck, 
  Tag, 
  Clock, 
  Headphones, 
  MapPin, 
  Award,
  CheckCircle2
} from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: "Verified Professionals",
      description: "All service partners undergo thorough background verification and skill assessment",
      icon: ShieldCheck,
      color: "#ff5722"
    },
    {
      id: 2,
      title: "Transparent Pricing",
      description: "No hidden charges. Get upfront pricing before booking any service",
      icon: Tag,
      color: "#ff5722"
    },
    {
      id: 3,
      title: "Fast Service",
      description: "Quick response times with same-day service availability in most areas",
      icon: Clock,
      color: "#ff5722"
    },
    {
      id: 4,
      title: "Trusted Support",
      description: "Dedicated customer support team available 7 days a week",
      icon: Headphones,
      color: "#ff5722"
    },
    {
      id: 5,
      title: "PAN India Network",
      description: "Expanding rapidly to serve customers across all major cities",
      icon: MapPin,
      color: "#ff5722"
    },
    {
      id: 6,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with hassle-free re-service if needed",
      icon: Award,
      color: "#ff5722"
    }
  ];

  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="container">
        {/* Section Header */}
        <div className="neat-section-header text-center">
          <div className="neat-badge-pill">
            Why Choose Us
          </div>
          <h2 className="neat-heading-title">
            The FixWow Difference
          </h2>
          <p className="neat-subtitle">
            Experience service that truly delivers the WOW factor. Here's why thousands of customers trust us.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="why-choose-grid">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="why-choose-card">
                <div className="why-choose-icon-box">
                  <IconComponent size={22} className="text-orange" />
                </div>
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
