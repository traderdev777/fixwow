import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Smartphone, 
  Laptop, 
  Home, 
  Tv, 
  Search, 
  ShieldCheck, 
  Award, 
  RotateCcw, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingCart, 
  Sparkles, 
  FileText, 
  PhoneCall,
  X,
  Send,
  Zap,
  Tag
} from 'lucide-react';
import SellerVerificationIcon from './SellerVerificationIcon';
import { calculateSellerBadge, WOW_TRONICS_BRANDS, INITIAL_SELLERS } from '../data/marketplaceData';

export default function WowTronics({ 
  products = [], 
  sellers = INITIAL_SELLERS,
  addToCart, 
  onBack,
  onNavigate
}) {
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Categories within WowTronics
  const subCategories = [
    { id: 'All', label: 'All WowTronics', icon: Sparkles },
    { id: 'Mobiles', label: 'Mobiles', icon: Smartphone },
    { id: 'Laptops', label: 'Laptops', icon: Laptop },
    { id: 'Desktops', label: 'Desktops', icon: Cpu },
    { id: 'Home Appliances', label: 'Home Appliances', icon: Home },
    { id: 'TVs & ACs', label: 'TVs & ACs', icon: Tv },
  ];

  // Filter electronics & appliances
  const tronicsProducts = useMemo(() => {
    return products.filter(p => 
      p.vertical === 'wow-tronics' || 
      p.categoryId === 'mobiles' || 
      p.categoryId === 'laptops' || 
      p.categoryId === 'desktops' || 
      p.categoryId === 'appliances' || 
      p.categoryId === 'tvs-acs' ||
      p.categoryId === 'electronics'
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return tronicsProducts.filter(item => {
      // Category filter
      if (selectedCategory !== 'All' && item.categoryName !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All Brands' && item.brand !== selectedBrand) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchBrand = item.brand?.toLowerCase().includes(q);
        const matchSpecs = item.specs?.toLowerCase().includes(q);
        const matchCategory = item.categoryName?.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchSpecs && !matchCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // recommended
    });
  }, [tronicsProducts, selectedCategory, selectedBrand, searchQuery, sortBy]);

  return (
    <div className="wow-vertical-page wow-tronics-page">
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
              <strong className="active text-orange">WowTronics</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="wow-vertical-hero">
        <div className="container">
          <div className="wow-hero-content text-center">
            <div className="wow-hero-badge">
              <Zap size={16} className="text-orange" />
              <span>FixWow Certified Refurbished</span>
            </div>
            <h1 className="wow-hero-title">
              WowTronics • Refurbished Electronics & Home Appliances
            </h1>
            <p className="wow-hero-desc">
              Every smartphone, laptop, desktop, refrigerator, washing machine, and TV is rigorously tested 
              through FixWow’s 40-Point Diagnostic Check with 6 to 12 Months Warranty and 7-Day Easy Returns.
            </p>

            {/* Trust Badges */}
            <div className="wow-trust-row">
              <div className="wow-trust-pill">
                <ShieldCheck size={18} className="text-orange" />
                <span>40-Point Diagnostics</span>
              </div>
              <div className="wow-trust-pill">
                <Award size={18} className="text-orange" />
                <span>6 - 12 Mo Warranty</span>
              </div>
              <div className="wow-trust-pill">
                <RotateCcw size={18} className="text-orange" />
                <span>7-Day Replacement</span>
              </div>
              <div className="wow-trust-pill">
                <Zap size={18} className="text-orange" />
                <span>Free Doorstep Demo</span>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="wow-search-box-wrap">
              <Search size={18} className="wow-search-icon" />
              <input 
                type="text" 
                placeholder="Search mobiles, laptops, TVs, fridges, washing machines by brand..."
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
          {/* Subcategory Pills Row */}
          <div className="wow-subcategories-bar">
            {subCategories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`wow-category-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <IconComp size={16} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Brand Filter Chips Row */}
          <div className="wow-filter-block">
            <div className="wow-filter-label">
              <span>Filter by Brand:</span>
            </div>
            <div className="wow-brand-chips-row">
              {WOW_TRONICS_BRANDS.map((brandName) => {
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

          {/* Secondary Controls Bar: Sort & Reset */}
          <div className="wow-secondary-controls">
            <div className="wow-active-meta">
              <span>Category: <strong>{selectedCategory}</strong></span>
              {selectedBrand !== 'All Brands' && (
                <span> • Brand: <strong>{selectedBrand}</strong></span>
              )}
            </div>

            <div className="wow-sort-wrap">
              <span className="control-label">Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="wow-sort-select"
              >
                <option value="recommended">Featured / Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="wow-results-count-bar">
            <span>Showing <strong>{filteredProducts.length}</strong> certified refurbished items</span>
            {(selectedBrand !== 'All Brands' || selectedCategory !== 'All' || searchQuery) && (
              <button 
                className="wow-reset-filters-btn"
                onClick={() => {
                  setSelectedBrand('All Brands');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          <div className="wow-tronics-grid">
            {filteredProducts.map((prod) => {
              const seller = sellers.find(s => s.id === prod.seller_id);
              const { badge } = seller ? calculateSellerBadge(seller) : { badge: 'verified' };
              const sellerName = prod.seller_name || seller?.name || 'Pooja Electronics & Appliances';
              const discountPercent = prod.originalPrice 
                ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) 
                : 0;

              return (
                <div key={prod.id} className="wow-tronic-card">
                  {/* Image & Badges */}
                  <div className="wow-card-img-wrap">
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="wow-card-img"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=700&q=80";
                      }}
                    />
                    <div className="wow-tag-floating-left">{prod.tag || 'Certified Refurbished'}</div>
                    <div className="wow-brand-floating-right">{prod.brand}</div>
                  </div>

                  {/* Body Content */}
                  <div className="wow-card-body">
                    {/* Brand Pill & Category Tag */}
                    <div className="wow-card-meta-header">
                      <span className="wow-brand-pill">{prod.brand}</span>
                      <span className="wow-category-pill">{prod.categoryName}</span>
                    </div>

                    <h3 className="wow-card-title">{prod.title}</h3>

                    <p className="wow-desc-snippet">{prod.specs}</p>

                    {/* Warranty & Condition Badge */}
                    <div className="wow-warranty-line">
                      <ShieldCheck size={14} className="text-green" />
                      <span>{prod.warranty || '6 Months FixWow Warranty'}</span>
                    </div>

                    {/* Seller Line */}
                    <div className="wow-seller-line">
                      <span className="seller-label">Seller:</span>
                      <strong className="seller-name">{sellerName}</strong>
                      <SellerVerificationIcon badge={badge} size={14} />
                    </div>

                    {/* Price & Savings */}
                    <div className="wow-price-box">
                      <div>
                        <div className="wow-car-price">₹{prod.price?.toLocaleString()}</div>
                        {prod.originalPrice && (
                          <div className="wow-old-price">New: ₹{prod.originalPrice.toLocaleString()}</div>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <div className="wow-discount-pill">
                          <span>{discountPercent}% OFF</span>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Action */}
                    <div className="wow-card-actions-single">
                      <button 
                        className="btn btn-wow-buy btn-block"
                        onClick={() => addToCart({
                          id: prod.id,
                          name: prod.title,
                          price: prod.price,
                          type: 'refurbished',
                          category: prod.categoryName
                        })}
                      >
                        <ShoppingCart size={16} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="wow-empty-state text-center p-8">
              <Cpu size={48} className="text-orange mx-auto mb-3" />
              <h3>No items found in WowTronics matching your criteria</h3>
              <p>Try switching brands, categories, or clearing your search term.</p>
              <button 
                className="btn btn-neat-primary mt-4"
                onClick={() => {
                  setSelectedBrand('All Brands');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Sell Electronics CTA Banner */}
          <div className="wow-sell-promo-card">
            <div className="promo-text">
              <div className="promo-badge">Sell on WowTronics</div>
              <h3>Sell your old laptop, mobile, or home appliance instantly</h3>
              <p>Get doorstep device diagnostic test within 2 hours, instant bank transfer, and free pickup across Bengaluru.</p>
            </div>
            <button 
              className="btn btn-neat-primary btn-lg"
              onClick={() => alert("Our certified electronics valuation team will reach out! Call us at +91 901 908 8160 for instant doorstep pickup & cash.")}
            >
              <PhoneCall size={18} />
              <span>Sell Device for Instant Cash</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
