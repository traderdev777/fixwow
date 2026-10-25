import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Calendar, 
  ShoppingBag, 
  Star, 
  CheckCircle2, 
  Shield, 
  Share2, 
  Sparkles, 
  Building, 
  ShoppingCart,
  ExternalLink,
  Award
} from 'lucide-react';
import SellerVerificationIcon from './SellerVerificationIcon';
import { calculateSellerBadge } from '../data/marketplaceData';

export default function PublicSellerProfile({ 
  sellerId, 
  sellers = [], 
  products = [], 
  onBack, 
  onAddToCart 
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const seller = sellers.find(s => s.id === sellerId) || sellers[0];

  if (!seller) {
    return (
      <div className="container py-12 text-center">
        <div className="seller-not-found-card glass-card">
          <Shield size={48} className="text-slate-400 mx-auto mb-3" />
          <h2>Seller Profile Not Found</h2>
          <p className="text-slate-500 mb-6">The seller you are looking for does not exist or has been removed.</p>
          <button onClick={onBack} className="btn btn-neat-primary">
            <ArrowLeft size={16} />
            <span>Return to Marketplace</span>
          </button>
        </div>
      </div>
    );
  }

  const { badge, percentage } = calculateSellerBadge(seller);
  const sellerProducts = products.filter(p => p.seller_id === seller.id);

  const categories = ['all', ...new Set(sellerProducts.map(p => p.categoryName || 'Other'))];
  const filteredProducts = selectedFilter === 'all' 
    ? sellerProducts 
    : sellerProducts.filter(p => p.categoryName === selectedFilter);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="public-seller-profile-page">
      {/* Top Breadcrumb Bar */}
      <div className="seller-profile-topbar">
        <div className="container flex-between">
          <button onClick={onBack} className="btn-back-link">
            <ArrowLeft size={16} />
            <span>Back to Buy & Sell</span>
          </button>

          <button onClick={handleShare} className="btn-share-profile">
            <Share2 size={15} />
            <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
          </button>
        </div>
      </div>

      <div className="container py-6">
        {/* Main Seller Profile Hero Card */}
        <div className="seller-hero-card">
          <div className="seller-hero-banner">
            <div className="banner-overlay-gradient" />
            <div className="banner-tag">
              <Award size={14} />
              <span>FixWow Marketplace Partner</span>
            </div>
          </div>

          <div className="seller-hero-content">
            <div className="seller-header-main-row">
              {/* Avatar */}
              <div className="seller-avatar-large-wrap">
                {seller.photo ? (
                  <img 
                    src={seller.photo} 
                    alt={seller.name} 
                    className="seller-avatar-large"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="seller-avatar-fallback-large" 
                  style={{ display: seller.photo ? 'none' : 'flex' }}
                >
                  {seller.name?.charAt(0) || 'S'}
                </div>
                <div className="seller-avatar-badge-floater">
                  <SellerVerificationIcon badge={badge} size={20} />
                </div>
              </div>

              {/* Title & Badge */}
              <div className="seller-identity-info">
                <div className="seller-title-badge-row">
                  <h1 className="seller-profile-name">{seller.name}</h1>
                  <div className="seller-badge-container">
                    <SellerVerificationIcon badge={badge} showLabel={true} size={17} />
                  </div>
                </div>

                {seller.businessName && (
                  <div className="seller-business-name-row">
                    <Building size={15} className="text-slate-400" />
                    <span className="business-title">{seller.businessName}</span>
                  </div>
                )}

                <div className="seller-meta-stats-row">
                  <span className="meta-stat-item">
                    <MapPin size={14} className="text-orange" />
                    <span>{seller.location || 'Bengaluru, Karnataka'}</span>
                  </span>
                  <span className="meta-stat-divider">•</span>
                  <span className="meta-stat-item">
                    <Calendar size={14} className="text-slate-400" />
                    <span>Member since {seller.memberSince || '2024'}</span>
                  </span>
                  <span className="meta-stat-divider">•</span>
                  <span className="meta-stat-item">
                    <Star size={14} className="text-amber-500 fill-amber-400" />
                    <span>{seller.rating || '4.9'} ({seller.totalSales || '30+'} Verified Orders)</span>
                  </span>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="seller-header-actions">
                <a 
                  href={`tel:${seller.phone || '+919845122345'}`}
                  className="btn btn-neat-primary seller-contact-btn"
                >
                  <Phone size={16} />
                  <span>Call Seller</span>
                </a>
                <a 
                  href={`https://wa.me/${(seller.phone || '919845122345').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(seller.name)},%20I%20saw%20your%20products%20on%20FixWow`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-direct"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Verification Status Banner */}
            <div className={`seller-verification-banner-box banner-${badge}`}>
              <div className="verification-box-left">
                <div className="verification-box-icon">
                  <SellerVerificationIcon badge={badge} size={22} />
                </div>
                <div>
                  <h4 className="verification-box-title">
                    {badge === 'trusted' && '⭐ FixWow Trusted Seller (Gold Tier)'}
                    {badge === 'verified' && '✓ FixWow Verified Seller (Blue Check)'}
                    {badge === 'new' && 'Shield Level: New Marketplace Seller'}
                  </h4>
                  <p className="verification-box-desc">
                    {badge === 'trusted' && '100% verified profile with confirmed identity, phone number, physical address, and certified business registration.'}
                    {badge === 'verified' && 'Identity, mobile phone number, profile photo, and operational service area verified by FixWow.'}
                    {badge === 'new' && 'New seller on FixWow marketplace. Basic contact details on file.'}
                  </p>
                </div>
              </div>
              <div className="verification-score-pill">
                <span>{percentage}% Profile Completed</span>
              </div>
            </div>

            {/* Business Description / About Seller */}
            {seller.businessDesc && (
              <div className="seller-about-section">
                <h3 className="seller-section-title">About this Business</h3>
                <p className="seller-about-text">{seller.businessDesc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Seller's Products Section */}
        <div className="seller-products-container">
          <div className="seller-products-header-row">
            <div>
              <h2 className="seller-listings-heading">
                Active Listings ({sellerProducts.length})
              </h2>
              <p className="seller-listings-sub">
                Inspected, tested and certified products available directly from {seller.name}
              </p>
            </div>

            {categories.length > 2 && (
              <div className="seller-category-filter-row">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`seller-filter-pill ${selectedFilter === cat ? 'active' : ''}`}
                  >
                    {cat === 'all' ? 'All Products' : cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-seller-products-card glass-card">
              <ShoppingBag size={42} className="text-slate-300 mx-auto mb-2" />
              <h3>No Listings Available</h3>
              <p>This seller does not currently have any active items in this category.</p>
            </div>
          ) : (
            <div className="neat-product-cards-grid">
              {filteredProducts.map((prod) => (
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
                    <span className="neat-badge-tag-left">{prod.tag || 'Verified Item'}</span>
                    <span className="neat-badge-cat-right">{prod.categoryName}</span>
                  </div>

                  <div className="neat-product-body">
                    <h3 className="neat-product-title">{prod.title}</h3>
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
                        onClick={() => onAddToCart && onAddToCart({
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
