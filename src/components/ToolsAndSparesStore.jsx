import React, { useState } from 'react';
import { 
  Wrench, 
  ShoppingCart, 
  Check, 
  Star, 
  ShieldCheck, 
  Zap, 
  Search, 
  PackageCheck,
  Truck
} from 'lucide-react';
import { toolsAndSpares } from '../data/toolsAndSparesData';

export default function ToolsAndSparesStore({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Tools & Kits', 'Auto Spares', 'Appliance Spares', 'Electrical Spares', 'Plumbing Spares'];

  const filteredItems = toolsAndSpares.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.compatibility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="spares-section" id="tools-spares-store">
      <div className="container">
        {/* Header */}
        <div className="section-header-row">
          <div>
            <div className="badge badge-orange mb-2">100% Genuine & Tested</div>
            <h2 className="section-title">
              Tools & Genuine <span className="gradient-text-orange">Spare Parts</span> Hub
            </h2>
            <p className="section-subtitle">
              Professional contractor-grade tools, OEM replacement spares for bikes, cars, ACs, refrigerators & electrical wiring.
            </p>
          </div>

          <div className="service-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search battery, engine oil, multimeter, MCB, wire..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="used-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Quality Badges */}
        <div className="spares-trust-banner glass-card">
          <div className="spares-trust-item">
            <PackageCheck size={20} className="text-orange" />
            <span>OEM Manufacturer Sealed Spares</span>
          </div>
          <div className="spares-trust-item">
            <Truck size={20} className="text-blue" />
            <span>2-Hour Express Delivery in Bangalore</span>
          </div>
          <div className="spares-trust-item">
            <ShieldCheck size={20} className="text-gold" />
            <span>100% Replacement Warranty If Defective</span>
          </div>
        </div>

        {/* Grid */}
        <div className="spares-grid">
          {filteredItems.length === 0 ? (
            <div className="no-services-found glass-card">
              <p>No tools or spare parts matched your search.</p>
              <button className="btn btn-outline btn-sm mt-3" onClick={() => setSearchQuery('')}>
                Show All Items
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="spare-item-card glass-card">
                <div className="spare-top-badge-row">
                  <span className="badge badge-orange">{item.badge}</span>
                  <span className="spare-category-tag">{item.category}</span>
                </div>

                <h4 className="spare-item-title">{item.name}</h4>

                <div className="spare-compatibility-box">
                  <strong>Compatibility:</strong>
                  <span>{item.compatibility}</span>
                </div>

                <p className="spare-specs-text">{item.specs}</p>

                <div className="spare-rating-row">
                  <Star size={14} className="fill-gold text-gold" />
                  <strong>{item.rating}</strong>
                  <span>({item.reviewsCount} verified buyers)</span>
                </div>

                <div className="spare-price-row">
                  <div className="spare-pricing">
                    <span className="current-price">₹{item.price.toLocaleString()}</span>
                    <span className="original-mrp">₹{item.originalPrice.toLocaleString()}</span>
                  </div>
                  <span className="savings-badge">
                    Save ₹{(item.originalPrice - item.price).toLocaleString()}
                  </span>
                </div>

                <div className="spare-card-footer">
                  <button 
                    className="btn btn-primary btn-block"
                    onClick={() => addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      type: item.type,
                      category: item.category
                    })}
                  >
                    <ShoppingCart size={16} />
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
