import React, { useState, useMemo } from 'react';
import { 
  Bike, 
  Search, 
  ShieldCheck, 
  Award, 
  RotateCcw, 
  Calendar, 
  Gauge, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingCart, 
  Zap, 
  FileText, 
  PhoneCall,
  X,
  Send,
  Fuel
} from 'lucide-react';
import SellerVerificationIcon from './SellerVerificationIcon';
import { calculateSellerBadge, WOW_BIKES_BRANDS, INITIAL_SELLERS } from '../data/marketplaceData';

export default function WowBikes({ 
  products = [], 
  sellers = INITIAL_SELLERS,
  addToCart, 
  onBack,
  onNavigate
}) {
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [bikeType, setBikeType] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  // Test drive modal state
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [selectedBikeForDrive, setSelectedBikeForDrive] = useState(null);
  const [driveFormSuccess, setDriveFormSuccess] = useState(false);
  const [driveFormData, setDriveFormData] = useState({
    name: '',
    phone: '',
    date: '',
    slot: 'Evening (3 PM - 6 PM)',
    address: 'Bengaluru'
  });

  // Filter bikes
  const bikeProducts = useMemo(() => {
    return products.filter(p => p.vertical === 'wow-bikes' || p.categoryId === 'bikes');
  }, [products]);

  const filteredBikes = useMemo(() => {
    return bikeProducts.filter(bike => {
      // Brand filter
      if (selectedBrand !== 'All Brands' && bike.brand !== selectedBrand) {
        return false;
      }
      // Type filter
      if (bikeType === 'Scooters' && !bike.title?.toLowerCase().includes('scooter') && !bike.title?.toLowerCase().includes('activa') && !bike.title?.toLowerCase().includes('jupiter')) {
        return false;
      }
      if (bikeType === 'Electric' && !bike.title?.toLowerCase().includes('electric') && !bike.title?.toLowerCase().includes('ather') && !bike.title?.toLowerCase().includes('ola')) {
        return false;
      }
      if (bikeType === 'Motorcycles' && (bike.title?.toLowerCase().includes('activa') || bike.title?.toLowerCase().includes('jupiter') || bike.title?.toLowerCase().includes('scooter'))) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = bike.title?.toLowerCase().includes(q);
        const matchBrand = bike.brand?.toLowerCase().includes(q);
        const matchSpecs = bike.specs?.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchSpecs) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // recommended
    });
  }, [bikeProducts, selectedBrand, bikeType, searchQuery, sortBy]);

  const handleOpenTestDrive = (bike) => {
    setSelectedBikeForDrive(bike);
    setDriveFormSuccess(false);
    setTestDriveModalOpen(true);
  };

  const handleTestDriveSubmit = (e) => {
    e.preventDefault();
    setDriveFormSuccess(true);
    setTimeout(() => {
      setTestDriveModalOpen(false);
      setDriveFormSuccess(false);
    }, 2800);
  };

  return (
    <div className="wow-vertical-page wow-bikes-page">
      {/* Top Breadcrumb Bar */}
      <div className="wow-breadcrumb-bar">
        <div className="container">
          <div className="wow-breadcrumb-inner">
            <button className="wow-back-btn" onClick={onBack}>
              <ArrowLeft size={16} />
              <span>Back to Marketplace</span>
            </button>
            <div className="wow-breadcrumb-trail">
              <span onClick={() => onNavigate && onNavigate('home')}>Home</span>
              <span className="sep">/</span>
              <span onClick={onBack}>Buy & Sell</span>
              <span className="sep">/</span>
              <strong className="active text-orange">WowBikes</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="wow-vertical-hero">
        <div className="container">
          <div className="wow-hero-content text-center">
            <div className="wow-hero-badge">
              <Bike size={16} className="text-orange" />
              <span>FixWow Certified Two-Wheelers</span>
            </div>
            <h1 className="wow-hero-title">
              WowBikes • Verified Pre-Owned Bikes & Scooters
            </h1>
            <p className="wow-hero-desc">
              Thorough 80-Point Mechanical Certification on engine, brakes, chassis, and electronics. 
              Enjoy 3 Months FixWow Warranty, free doorstep test drive, and immediate paper transfer.
            </p>

            {/* Trust Badges */}
            <div className="wow-trust-row">
              <div className="wow-trust-pill">
                <ShieldCheck size={18} className="text-orange" />
                <span>80-Point Checked</span>
              </div>
              <div className="wow-trust-pill">
                <Award size={18} className="text-orange" />
                <span>3-Month Warranty</span>
              </div>
              <div className="wow-trust-pill">
                <Zap size={18} className="text-orange" />
                <span>Free Doorstep Test Ride</span>
              </div>
              <div className="wow-trust-pill">
                <RotateCcw size={18} className="text-orange" />
                <span>Instant Paperwork</span>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="wow-search-box-wrap">
              <Search size={18} className="wow-search-icon" />
              <input 
                type="text" 
                placeholder="Search by bike model (e.g. Classic 350, Activa, R15, Duke, Ather)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="wow-search-input"
              />
              {searchQuery && (
                <button className="wow-clear-btn" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Products Section */}
      <section className="wow-content-section">
        <div className="container">
          {/* Brand Filter Chips Row */}
          <div className="wow-filter-block">
            <div className="wow-filter-label">
              <span>Filter by Two-Wheeler Brand:</span>
            </div>
            <div className="wow-brand-chips-row">
              {WOW_BIKES_BRANDS.map((brandName) => {
                const isSelected = selectedBrand === brandName;
                return (
                  <button
                    key={brandName}
                    className={`wow-brand-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brandName)}
                  >
                    <span>{brandName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Controls Bar: Type & Sort */}
          <div className="wow-secondary-controls">
            <div className="wow-fuel-chips">
              <span className="control-label">Type:</span>
              {['All', 'Motorcycles', 'Scooters', 'Electric'].map(type => (
                <button
                  key={type}
                  className={`wow-sub-chip ${bikeType === type ? 'active' : ''}`}
                  onClick={() => setBikeType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="wow-sort-wrap">
              <span className="control-label">Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="wow-sort-select"
              >
                <option value="recommended">Featured / Best Deal</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="wow-results-count-bar">
            <span>Showing <strong>{filteredBikes.length}</strong> verified two-wheelers in Bengaluru</span>
            {(selectedBrand !== 'All Brands' || bikeType !== 'All' || searchQuery) && (
              <button 
                className="wow-reset-filters-btn"
                onClick={() => {
                  setSelectedBrand('All Brands');
                  setBikeType('All');
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Bikes Grid */}
          <div className="wow-cars-grid">
            {filteredBikes.map((bike) => {
              const seller = sellers.find(s => s.id === bike.seller_id);
              const { badge } = seller ? calculateSellerBadge(seller) : { badge: 'verified' };
              const sellerName = bike.seller_name || seller?.name || 'Ramesh Auto Care';

              return (
                <div key={bike.id} className="wow-car-card">
                  {/* Image & Badges */}
                  <div className="wow-card-img-wrap">
                    <img 
                      src={bike.image} 
                      alt={bike.title} 
                      className="wow-card-img"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80";
                      }}
                    />
                    <div className="wow-tag-floating-left">{bike.tag || 'Certified'}</div>
                    <div className="wow-brand-floating-right">{bike.brand}</div>
                  </div>

                  {/* Body Content */}
                  <div className="wow-card-body">
                    {/* Brand Pill & Year */}
                    <div className="wow-card-meta-header">
                      <span className="wow-brand-pill">{bike.brand}</span>
                      <span className="wow-year-pill">{bike.year || '2021'} Model</span>
                    </div>

                    <h3 className="wow-card-title">{bike.title}</h3>

                    {/* Key Specs Row */}
                    <div className="wow-specs-grid">
                      <div className="wow-spec-item" title="Brand & Maker">
                        <Bike size={14} className="text-orange" />
                        <span>{bike.brand}</span>
                      </div>
                      <div className="wow-spec-item" title="Kilometers Driven">
                        <Gauge size={14} className="text-orange" />
                        <span>{bike.km || '12,000 km'}</span>
                      </div>
                      <div className="wow-spec-item" title="Mechanical Check">
                        <ShieldCheck size={14} className="text-green" />
                        <span>80-Pt Checked</span>
                      </div>
                      <div className="wow-spec-item" title="Warranty">
                        <Award size={14} className="text-orange" />
                        <span>3-Mo Warranty</span>
                      </div>
                    </div>

                    <p className="wow-desc-snippet">{bike.specs}</p>

                    {/* Seller Line */}
                    <div className="wow-seller-line">
                      <span className="seller-label">Seller:</span>
                      <strong className="seller-name">{sellerName}</strong>
                      <SellerVerificationIcon badge={badge} size={14} />
                    </div>

                    {/* Price and EMI Row */}
                    <div className="wow-price-box">
                      <div>
                        <div className="wow-car-price">₹{bike.price?.toLocaleString()}</div>
                        {bike.originalPrice && (
                          <div className="wow-old-price">New: ₹{bike.originalPrice.toLocaleString()}</div>
                        )}
                      </div>
                      {bike.emi && (
                        <div className="wow-emi-badge">
                          <span>EMI: <strong>₹{bike.emi}/mo</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="wow-card-actions">
                      <button 
                        className="btn btn-wow-testdrive"
                        onClick={() => handleOpenTestDrive(bike)}
                      >
                        <Calendar size={15} />
                        <span>Test Ride</span>
                      </button>
                      <button 
                        className="btn btn-wow-buy"
                        onClick={() => addToCart({
                          id: bike.id,
                          name: bike.title,
                          price: bike.price,
                          type: 'refurbished-bike',
                          category: 'Bikes'
                        })}
                      >
                        <ShoppingCart size={15} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredBikes.length === 0 && (
            <div className="wow-empty-state text-center p-8">
              <Bike size={48} className="text-orange mx-auto mb-3" />
              <h3>No bikes or scooters found matching your criteria</h3>
              <p>Try switching brands, vehicle types, or clearing the search bar.</p>
              <button 
                className="btn btn-neat-primary mt-4"
                onClick={() => {
                  setSelectedBrand('All Brands');
                  setBikeType('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Sell Two-Wheeler CTA Banner */}
          <div className="wow-sell-promo-card">
            <div className="promo-text">
              <div className="promo-badge">Sell on WowBikes</div>
              <h3>Sell your two-wheeler in 30 minutes with instant cash</h3>
              <p>Free doorstep inspection across Bengaluru, top market valuation, and instant bank transfer.</p>
            </div>
            <button 
              className="btn btn-neat-primary btn-lg"
              onClick={() => alert("Our certified two-wheeler valuation team will reach out! Call us at +91 901 908 8160 for instant doorstep inspection.")}
            >
              <PhoneCall size={18} />
              <span>Request Free Bike Valuation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Free Test Drive Modal */}
      {testDriveModalOpen && selectedBikeForDrive && (
        <div className="modal-backdrop">
          <div className="modal-card wow-testdrive-modal glass-card">
            <div className="modal-header">
              <div>
                <div className="neat-badge-pill mb-1">Free Doorstep Ride</div>
                <h3 className="modal-title">Book Test Ride for {selectedBikeForDrive.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setTestDriveModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {driveFormSuccess ? (
              <div className="text-center p-6">
                <CheckCircle2 size={48} className="text-orange mx-auto mb-3" />
                <h3>Test Ride Scheduled!</h3>
                <p>Our FixWow bike specialist will bring the <strong>{selectedBikeForDrive.title}</strong> to your doorstep for a free test ride.</p>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="booking-form-body">
                <div className="neat-modal-car-preview">
                  <img src={selectedBikeForDrive.image} alt="" className="preview-img" />
                  <div>
                    <strong>{selectedBikeForDrive.title}</strong>
                    <div className="text-orange font-bold">₹{selectedBikeForDrive.price?.toLocaleString()}</div>
                    <span className="text-muted text-xs">{selectedBikeForDrive.specs}</span>
                  </div>
                </div>

                <div className="form-field">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={driveFormData.name}
                    onChange={(e) => setDriveFormData({ ...driveFormData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98800 12345" 
                      value={driveFormData.phone}
                      onChange={(e) => setDriveFormData({ ...driveFormData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Preferred Date *</label>
                    <input 
                      type="date" 
                      value={driveFormData.date}
                      onChange={(e) => setDriveFormData({ ...driveFormData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Doorstep Location in Bengaluru *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your address/area" 
                    value={driveFormData.address}
                    onChange={(e) => setDriveFormData({ ...driveFormData, address: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-neat-primary btn-block btn-lg mt-3">
                  <Send size={18} />
                  <span>Confirm Free Doorstep Test Ride</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
