import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ShoppingCart, 
  Car, 
  Bike, 
  Smartphone, 
  Laptop, 
  Monitor, 
  Home, 
  Tv, 
  Cpu, 
  DollarSign, 
  X, 
  Send,
  ArrowRight,
  Store,
  ShieldCheck,
  Award,
  RotateCcw,
  UserCheck
} from 'lucide-react';
import SellerVerificationIcon from './SellerVerificationIcon';
import { calculateSellerBadge, INITIAL_MARKETPLACE_PRODUCTS, INITIAL_SELLERS } from '../data/marketplaceData';
import wowcarsLogo from '../assets/wowcars-logo.png';

export default function UsedGoodsStore({ 
  addToCart, 
  products = INITIAL_MARKETPLACE_PRODUCTS, 
  sellers = INITIAL_SELLERS,
  onViewSeller,
  onOpenSellerDashboard,
  isHomePreview = false,
  onExploreMarketplace,
  onNavigateToVertical
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [sellSuccess, setSellSuccess] = useState(false);

  const [sellFormData, setSellFormData] = useState({
    itemTitle: '',
    category: 'Home Appliances',
    expectedPrice: '',
    condition: 'Like New (Minimal Usage)',
    phone: '',
    area: 'Chokkana Halli, Bengaluru'
  });

  // Calculate live counts
  const carsCount = products.filter(p => p.vertical === 'wow-cars' || p.categoryId === 'cars').length;
  const bikesCount = products.filter(p => p.vertical === 'wow-bikes' || p.categoryId === 'bikes').length;
  const tronicsCount = products.filter(p => p.vertical === 'wow-tronics' || p.categoryId !== 'cars' && p.categoryId !== 'bikes').length;

  const handlePillClick = (catId) => {
    if (catId === 'wow-cars' || catId === 'cars') {
      if (onNavigateToVertical) {
        onNavigateToVertical('wow-cars');
      } else {
        setActiveCategory('cars');
      }
    } else if (catId === 'wow-bikes' || catId === 'bikes') {
      if (onNavigateToVertical) {
        onNavigateToVertical('wow-bikes');
      } else {
        setActiveCategory('bikes');
      }
    } else if (catId === 'wow-tronics' || catId === 'electronics') {
      if (onNavigateToVertical) {
        onNavigateToVertical('wow-tronics');
      } else {
        setActiveCategory('appliances');
      }
    } else {
      setActiveCategory(catId);
    }
  };

  const filteredProducts = products.filter(p => {
    // Category filter
    if (activeCategory === 'cars' && p.categoryId !== 'cars') return false;
    if (activeCategory === 'bikes' && p.categoryId !== 'bikes') return false;
    if (activeCategory === 'mobiles' && p.categoryId !== 'mobiles') return false;
    if (activeCategory === 'laptops' && p.categoryId !== 'laptops') return false;
    if (activeCategory === 'desktops' && p.categoryId !== 'desktops') return false;
    if (activeCategory === 'appliances' && p.categoryId !== 'appliances') return false;
    if (activeCategory === 'tvs-acs' && p.categoryId !== 'tvs-acs') return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchBrand = p.brand?.toLowerCase().includes(q);
      const matchCat = p.categoryName?.toLowerCase().includes(q);
      const matchSpecs = p.specs?.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchCat && !matchSpecs) return false;
    }

    return true;
  });

  const displayProducts = isHomePreview ? filteredProducts.slice(0, 8) : filteredProducts;

  const handleSellSubmit = (e) => {
    e.preventDefault();
    setSellSuccess(true);
    setTimeout(() => {
      setSellSuccess(false);
      setSellModalOpen(false);
    }, 2500);
  };

  return (
    <section className="neat-used-section" id="buy-sell">
      <div className="container">
        {/* Section Header Matching Screenshot 3 Exactly */}
        <div className="neat-section-header text-center">
          <div className="neat-badge-pill neat-badge-gray">
            Buy & Sell
          </div>
          <h2 className="neat-heading-title">
            Quality Refurbished Items
          </h2>
          <p className="neat-subtitle">
            Buy certified pre-owned products or sell your used items with confidence. Every item is quality checked with warranty included.
          </p>

          {/* Trust Checkmarks Row Matching Screenshot 3 Exactly */}
          <div className="neat-trust-check-row">
            <div className="trust-check-item">
              <ShieldCheck size={18} className="text-orange" />
              <span>Quality Checked</span>
            </div>
            <div className="trust-check-item">
              <Award size={18} className="text-orange" />
              <span>Warranty Included</span>
            </div>
            <div className="trust-check-item">
              <RotateCcw size={18} className="text-orange" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        {/* 3 Core Flagship Category Showcase Cards (WowCars, WowBikes, WowTronics) */}
        <div className="wow-flagship-cards-grid">
          {/* Card 1: WowCars */}
          <div 
            className="wow-flagship-card card-cars"
            onClick={() => onNavigateToVertical && onNavigateToVertical('wow-cars')}
          >
            <div className="flagship-card-header">
              <div className="flagship-logo-wrap">
                <img 
                  src={wowcarsLogo} 
                  alt="WowCars - Pre-Owned Cars You Can Trust" 
                  className="flagship-wowcars-logo"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true';
                      e.currentTarget.src = `${import.meta.env.BASE_URL}wowcars-logo.png`;
                    }
                  }}
                />
              </div>
              <span className="flagship-badge">150-Point Checked</span>
            </div>
            <p className="flagship-desc">
              Pre-owned cars you can trust. 6-month engine & gearbox warranty, free doorstep test drive & guaranteed RC transfer.
            </p>
            <div className="flagship-brands-line">
              <span>Brands:</span> Maruti Suzuki, Hyundai, Tata, Toyota, Honda, Kia
            </div>
            <div className="flagship-footer">
              <span className="flagship-count">{carsCount} Cars Available</span>
              <span className="flagship-cta-link">
                <span>Explore WowCars</span>
                <ArrowRight size={15} />
              </span>
            </div>
          </div>

          {/* Card 2: WowBikes */}
          <div 
            className="wow-flagship-card card-bikes"
            onClick={() => onNavigateToVertical && onNavigateToVertical('wow-bikes')}
          >
            <div className="flagship-card-header">
              <div className="flagship-icon-box bg-blue-subtle">
                <Bike size={24} className="text-blue" />
              </div>
              <span className="flagship-badge">80-Point Inspected</span>
            </div>
            <h3 className="flagship-title">WowBikes</h3>
            <p className="flagship-desc">
              Verified two-wheelers & scooters with 3-month warranty, free doorstep test rides & instant transfer.
            </p>
            <div className="flagship-brands-line">
              <span>Brands:</span> Royal Enfield, Honda, TVS, Yamaha, KTM, Ather
            </div>
            <div className="flagship-footer">
              <span className="flagship-count">{bikesCount} Bikes Available</span>
              <span className="flagship-cta-link">
                <span>Explore WowBikes</span>
                <ArrowRight size={15} />
              </span>
            </div>
          </div>

          {/* Card 3: WowTronics */}
          <div 
            className="wow-flagship-card card-tronics"
            onClick={() => onNavigateToVertical && onNavigateToVertical('wow-tronics')}
          >
            <div className="flagship-card-header">
              <div className="flagship-icon-box bg-purple-subtle">
                <Cpu size={24} className="text-purple" />
              </div>
              <span className="flagship-badge">FixWow Warranty</span>
            </div>
            <h3 className="flagship-title">WowTronics</h3>
            <p className="flagship-desc">
              Refurbished electronics & home appliances with 40-point diagnostics, 6-12 month warranty & 7-day returns.
            </p>
            <div className="flagship-brands-line">
              <span>Brands:</span> Apple, Samsung, Dell, Lenovo, HP, LG, Sony
            </div>
            <div className="flagship-footer">
              <span className="flagship-count">{tronicsCount} Devices Available</span>
              <span className="flagship-cta-link">
                <span>Explore WowTronics</span>
                <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar Matching User Screenshot */}
        <div className="neat-used-search-wrap">
          <div className="neat-search-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search for cars, bikes, mobiles, laptops, appliances by brand or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neat-search-input"
            />
            {searchQuery && (
              <button className="neat-search-clear" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Flagships + Subcategories) */}
        <div className="neat-category-pills-container">
          <div className="neat-category-pills-row">
            <button
              className={`neat-filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              <span>All Items</span>
              <span className="pill-count">({products.length})</span>
            </button>

            <button
              className="neat-filter-pill highlight-orange"
              onClick={() => handlePillClick('wow-cars')}
              title="Click to open dedicated WowCars page"
            >
              <Car size={16} />
              <span className="pill-title">WowCars</span>
              <span className="pill-count">({carsCount})</span>
            </button>

            <button
              className="neat-filter-pill highlight-blue"
              onClick={() => handlePillClick('wow-bikes')}
              title="Click to open dedicated WowBikes page"
            >
              <Bike size={16} />
              <span className="pill-title">WowBikes</span>
              <span className="pill-count">({bikesCount})</span>
            </button>

            <button
              className="neat-filter-pill highlight-purple"
              onClick={() => handlePillClick('wow-tronics')}
              title="Click to open dedicated WowTronics page"
            >
              <Cpu size={16} />
              <span className="pill-title">WowTronics</span>
              <span className="pill-count">({tronicsCount})</span>
            </button>

            <button
              className={`neat-filter-pill ${activeCategory === 'mobiles' ? 'active' : ''}`}
              onClick={() => handlePillClick('mobiles')}
            >
              <Smartphone size={16} />
              <span className="pill-title">Mobiles</span>
            </button>

            <button
              className={`neat-filter-pill ${activeCategory === 'laptops' ? 'active' : ''}`}
              onClick={() => handlePillClick('laptops')}
            >
              <Laptop size={16} />
              <span className="pill-title">Laptops</span>
            </button>

            <button
              className={`neat-filter-pill ${activeCategory === 'desktops' ? 'active' : ''}`}
              onClick={() => handlePillClick('desktops')}
            >
              <Monitor size={16} />
              <span className="pill-title">Desktops</span>
            </button>

            <button
              className={`neat-filter-pill ${activeCategory === 'appliances' ? 'active' : ''}`}
              onClick={() => handlePillClick('appliances')}
            >
              <Home size={16} />
              <span className="pill-title">Home Appliances</span>
            </button>

            <button
              className={`neat-filter-pill ${activeCategory === 'tvs-acs' ? 'active' : ''}`}
              onClick={() => handlePillClick('tvs-acs')}
            >
              <Tv size={16} />
              <span className="pill-title">TVs & ACs</span>
            </button>
          </div>
        </div>

        {/* Products Grid with Seller Avatars and Badges */}
        <div className="neat-product-cards-grid">
          {displayProducts.map((prod) => {
            const seller = sellers.find(s => s.id === prod.seller_id);
            const { badge } = seller ? calculateSellerBadge(seller) : { badge: 'new' };
            const sellerDisplayName = prod.seller_name || seller?.name || 'Marketplace Seller';

            return (
              <div key={prod.id} className="neat-product-card">
                <div className="neat-product-img-wrapper">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="neat-product-img"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=700&q=80";
                    }}
                  />
                  <span className="neat-badge-tag-left">{prod.tag || 'Certified'}</span>
                  {prod.brand && <span className="neat-badge-brand-right">{prod.brand}</span>}
                </div>

                <div className="neat-product-body">
                  <div className="neat-card-top-pills">
                    {prod.brand && <span className="neat-pill-brand-inline">{prod.brand}</span>}
                    <span className="neat-pill-cat-inline">{prod.categoryName}</span>
                  </div>
                  <div className="neat-product-title-row">
                    <h3 className="neat-product-title">{prod.title}</h3>
                  </div>

                  {/* Clean Inline Seller Line with Verification Badge */}
                  <div className="neat-card-seller-row">
                    <button 
                      type="button"
                      className="neat-card-seller-btn-clean"
                      onClick={() => onViewSeller && onViewSeller(prod.seller_id)}
                      title={`Click to view profile of ${sellerDisplayName}`}
                    >
                      <span className="neat-card-seller-name">{sellerDisplayName}</span>
                      <SellerVerificationIcon badge={badge} size={14} />
                    </button>
                  </div>

                  <p className="neat-product-specs">{prod.specs}</p>

                  <div className="neat-price-row">
                    <div className="neat-price-group">
                      <span className="neat-current-price">₹{prod.price?.toLocaleString()}</span>
                      {prod.originalPrice && (
                        <span className="neat-old-price">₹{prod.originalPrice.toLocaleString()}</span>
                      )}
                    </div>

                    <button 
                      className="btn btn-neat-add-cart"
                      onClick={() => addToCart({
                        id: prod.id,
                        name: prod.title,
                        price: prod.price,
                        type: 'refurbished',
                        category: prod.categoryName
                      })}
                    >
                      <ShoppingCart size={16} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Marketplace CTA button on Home */}
        {isHomePreview && (
          <div className="text-center mt-10">
            <button 
              className="btn btn-neat-view-all-services"
              onClick={onExploreMarketplace}
            >
              <span>Explore All {products.length}+ Certified Pre-Owned Items</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Sell Your Item CTA Bar (Shown on full page or home) */}
        <div className="neat-sell-banner">
          <div>
            <h4>Have an old bike, appliance, or gadget to sell?</h4>
            <p>Get doorstep valuation within 2 hours, immediate bank transfer, and free pickup across Bengaluru.</p>
          </div>
          <div className="neat-sell-banner-btns">
            <button 
              className="btn btn-neat-secondary-white"
              onClick={onOpenSellerDashboard}
            >
              <Store size={17} />
              <span>Seller Dashboard</span>
            </button>
            <button 
              className="btn btn-neat-primary"
              onClick={() => setSellModalOpen(true)}
            >
              <span>Instant Sell Request</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Sell Modal */}
      {sellModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card neat-sell-modal glass-card">
            <div className="modal-header">
              <div>
                <div className="neat-badge-pill mb-1">Instant Cash</div>
                <h3 className="modal-title">Sell Your Old Appliance, Bike or Gadget</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSellModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {sellSuccess ? (
              <div className="text-center p-4">
                <CheckCircle2 size={48} className="text-orange mx-auto mb-3" />
                <h3>Inspection Scheduled!</h3>
                <p>Our valuation expert will call you shortly to inspect and pick up your item with instant payment.</p>
              </div>
            ) : (
              <form onSubmit={handleSellSubmit} className="booking-form-body">
                <div className="form-field">
                  <label>Item Name & Model *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Samsung 32-inch LED TV or Honda Activa"
                    value={sellFormData.itemTitle}
                    onChange={(e) => setSellFormData({ ...sellFormData, itemTitle: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label>Category</label>
                    <select 
                      value={sellFormData.category}
                      onChange={(e) => setSellFormData({ ...sellFormData, category: e.target.value })}
                    >
                      <option>Cars & Two-Wheelers</option>
                      <option>Home Appliances</option>
                      <option>Mobiles & Laptops</option>
                      <option>TVs & ACs</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Expected Price (₹) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 15000"
                      value={sellFormData.expectedPrice}
                      onChange={(e) => setSellFormData({ ...sellFormData, expectedPrice: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Your Contact Mobile Number *</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98800 12345"
                    value={sellFormData.phone}
                    onChange={(e) => setSellFormData({ ...sellFormData, phone: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-neat-primary btn-block btn-lg mt-3">
                  <Send size={18} />
                  <span>Request Free Doorstep Valuation</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
