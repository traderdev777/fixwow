import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Star, 
  Shield, 
  ArrowLeft, 
  Plus, 
  Save, 
  Sparkles, 
  Phone, 
  MapPin, 
  Building, 
  FileText, 
  Package, 
  Eye, 
  AlertCircle 
} from 'lucide-react';
import SellerVerificationIcon from './SellerVerificationIcon';
import { calculateSellerBadge } from '../data/marketplaceData';

export default function SellerDashboard({ 
  currentSeller, 
  onUpdateSeller, 
  onAddProduct, 
  onBackToMarketplace,
  products = [],
  allSellers = [],
  onSwitchSeller 
}) {
  const [activeDashboardTab, setActiveDashboardTab] = useState('profile'); // 'profile' | 'listings' | 'new-product'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form state with real-time editing
  const [formData, setFormData] = useState({
    name: currentSeller?.name || '',
    photo: currentSeller?.photo || '',
    phone: currentSeller?.phone || '',
    location: currentSeller?.location || '',
    businessName: currentSeller?.businessName || '',
    businessDesc: currentSeller?.businessDesc || '',
  });

  // Calculate live badge progression in real time as user types
  const liveStats = calculateSellerBadge(formData);

  // New product form state
  const [productForm, setProductForm] = useState({
    title: '',
    categoryName: 'Home Appliances',
    categoryId: 'appliances',
    price: '',
    originalPrice: '',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=700&q=80',
    specs: '',
    condition: 'Like New (Minimal Usage)',
    tag: 'Verified Listing'
  });
  const [productPublished, setProductPublished] = useState(false);

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
  };

  const handleSetSamplePhoto = (url) => {
    setFormData(prev => ({ ...prev, photo: url }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    onUpdateSeller({
      ...currentSeller,
      ...formData,
      isPhotoUploaded: Boolean(formData.photo && formData.photo.trim() !== '')
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) return;

    onAddProduct({
      ...productForm,
      price: parseFloat(productForm.price) || 0,
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      seller_id: currentSeller.id,
      seller_name: formData.name || currentSeller.name,
      id: `prod-${Date.now()}`
    });

    setProductPublished(true);
    setProductForm({
      title: '',
      categoryName: 'Home Appliances',
      categoryId: 'appliances',
      price: '',
      originalPrice: '',
      image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=700&q=80',
      specs: '',
      condition: 'Like New (Minimal Usage)',
      tag: 'Verified Listing'
    });
    setTimeout(() => {
      setProductPublished(false);
      setActiveDashboardTab('listings');
    }, 1800);
  };

  // Products belonging to this seller
  const sellerProducts = products.filter(p => p.seller_id === currentSeller?.id);

  return (
    <div className="seller-dashboard-wrap">
      {/* Top Header Bar */}
      <div className="seller-dashboard-header">
        <div className="container dashboard-header-inner">
          <div className="dashboard-title-row">
            <button 
              onClick={onBackToMarketplace}
              className="dashboard-back-btn"
              title="Return to Buy & Sell Marketplace"
            >
              <ArrowLeft size={16} />
              <span>Back to Marketplace</span>
            </button>

            <div className="dashboard-title-group">
              <h1 className="dashboard-main-title">Seller Hub & Verification Console</h1>
              <p className="dashboard-subtitle">
                Manage your FixWow seller profile, badge verification status, and refurbished product listings.
              </p>
            </div>
          </div>

          {/* Quick Seller Switcher for Testing */}
          {allSellers && allSellers.length > 0 && (
            <div className="dashboard-seller-switcher">
              <span className="switcher-label">Test Different Seller Account:</span>
              <select
                value={currentSeller?.id}
                onChange={(e) => {
                  const s = allSellers.find(sel => sel.id === e.target.value);
                  if (s && onSwitchSeller) {
                    onSwitchSeller(s);
                    setFormData({
                      name: s.name || '',
                      photo: s.photo || '',
                      phone: s.phone || '',
                      location: s.location || '',
                      businessName: s.businessName || '',
                      businessDesc: s.businessDesc || '',
                    });
                  }
                }}
                className="switcher-select"
              >
                {allSellers.map(s => {
                  const b = calculateSellerBadge(s).badge;
                  const label = b === 'trusted' ? '⭐ Trusted' : b === 'verified' ? '✓ Verified' : 'New';
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name} ({label})
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="container dashboard-body-container">
        {/* Navigation Tabs */}
        <div className="dashboard-nav-tabs">
          <button 
            className={`dashboard-tab-btn ${activeDashboardTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveDashboardTab('profile')}
          >
            <span>Profile Settings & Badges</span>
            <span className="tab-badge-pill">
              {liveStats.percentage}% Complete
            </span>
          </button>
          <button 
            className={`dashboard-tab-btn ${activeDashboardTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveDashboardTab('listings')}
          >
            <span>My Active Listings ({sellerProducts.length})</span>
          </button>
          <button 
            className={`dashboard-tab-btn ${activeDashboardTab === 'new-product' ? 'active' : ''}`}
            onClick={() => setActiveDashboardTab('new-product')}
          >
            <Plus size={15} />
            <span>Post New Listing</span>
          </button>
        </div>

        {/* ================= TAB 1: PROFILE SETTINGS & BADGES ================= */}
        {activeDashboardTab === 'profile' && (
          <div className="dashboard-profile-grid">
            {/* Left Column: Real-Time Profile Completion Progress Card */}
            <div className="dashboard-completion-card">
              <div className="completion-card-header">
                <div>
                  <h3 className="completion-card-title">Profile Completion Score</h3>
                  <p className="completion-card-desc">
                    Complete your profile to unlock verified trust badges on all product cards in the marketplace.
                  </p>
                </div>
                <div className="completion-score-badge">
                  <span className="score-number">{liveStats.percentage}%</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="completion-progress-track">
                <div 
                  className={`completion-progress-fill fill-${liveStats.badge}`}
                  style={{ width: `${liveStats.percentage}%` }}
                />
              </div>

              {/* Current Active Badge Display */}
              <div className="current-badge-status-box">
                <div className="badge-status-left">
                  <span className="badge-status-label">Your Current Badge Status:</span>
                  <div className="badge-status-current">
                    <SellerVerificationIcon badge={liveStats.badge} showLabel={true} size={18} />
                  </div>
                </div>

                <div className="badge-status-tier-tag">
                  {liveStats.badge === 'trusted' && <span className="tier-pill tier-gold">Tier 3: Gold Star</span>}
                  {liveStats.badge === 'verified' && <span className="tier-pill tier-blue">Tier 2: Blue Check</span>}
                  {liveStats.badge === 'new' && <span className="tier-pill tier-gray">Tier 1: Basic</span>}
                </div>
              </div>

              {/* Real-Time Checklist */}
              <div className="completion-checklist-box">
                <h4 className="checklist-heading">Verification Checklist</h4>
                <div className="checklist-items">
                  {liveStats.checklist.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`checklist-item ${item.completed ? 'completed' : 'pending'}`}
                    >
                      <div className="checklist-checkbox">
                        {item.completed ? (
                          <CheckCircle2 size={16} className="text-emerald-500 fill-emerald-100" />
                        ) : (
                          <div className="checkbox-empty" />
                        )}
                      </div>
                      <span className="checklist-label">{item.label}</span>
                      <span className="checklist-weight">+{item.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badge Progression Guide Card */}
              <div className="badge-rules-guide">
                <h4 className="rules-heading">Badge Progression Rules</h4>
                <div className="rules-list">
                  <div className={`rule-item ${liveStats.badge === 'new' ? 'active-rule' : ''}`}>
                    <div className="rule-badge-icon">
                      <SellerVerificationIcon badge="new" />
                    </div>
                    <div className="rule-content">
                      <strong>New Seller (Gray)</strong>
                      <span>Default status for incomplete profiles.</span>
                    </div>
                  </div>

                  <div className={`rule-item ${liveStats.badge === 'verified' ? 'active-rule' : ''}`}>
                    <div className="rule-badge-icon">
                      <SellerVerificationIcon badge="verified" />
                    </div>
                    <div className="rule-content">
                      <strong>Verified Seller (Blue ✓)</strong>
                      <span>Requires: Profile photo, display name, phone, and location.</span>
                    </div>
                  </div>

                  <div className={`rule-item ${liveStats.badge === 'trusted' ? 'active-rule' : ''}`}>
                    <div className="rule-badge-icon">
                      <SellerVerificationIcon badge="trusted" />
                    </div>
                    <div className="rule-content">
                      <strong>Trusted Seller (Gold ⭐)</strong>
                      <span>Requires: ALL 6 fields including business name and business description.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Edit Form & Photo Upload */}
            <div className="dashboard-form-card">
              <form onSubmit={handleProfileSave} className="profile-edit-form">
                <div className="form-card-header">
                  <h3 className="form-card-title">Seller Identity & Business Details</h3>
                  <p className="form-card-desc">
                    Changes reflect immediately on your marketplace listings and public profile.
                  </p>
                </div>

                {saveSuccess && (
                  <div className="save-success-banner">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <span>Profile saved successfully! Your verification badge has been updated.</span>
                  </div>
                )}

                {/* 1. Photo Upload Section */}
                <div className="profile-photo-upload-section">
                  <label className="field-label">Seller Profile Photo / Avatar *</label>
                  
                  <div className="photo-upload-container">
                    <div className="avatar-preview-box">
                      {formData.photo ? (
                        <img 
                          src={formData.photo} 
                          alt="Seller Avatar" 
                          className="avatar-preview-img" 
                        />
                      ) : (
                        <div className="avatar-preview-placeholder">
                          <Camera size={26} className="text-slate-400" />
                          <span>No Photo</span>
                        </div>
                      )}
                    </div>

                    <div className="photo-actions-wrap">
                      <div className="file-input-wrapper">
                        <label className="btn-upload-file">
                          <Upload size={15} />
                          <span>Upload From Device</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoUpload}
                            className="hidden-file-input" 
                          />
                        </label>
                      </div>

                      {formData.photo && (
                        <button 
                          type="button" 
                          onClick={handleRemovePhoto}
                          className="btn-remove-photo"
                        >
                          <Trash2 size={14} />
                          <span>Remove Photo</span>
                        </button>
                      )}

                      {/* Sample avatars for instant 1-click test */}
                      <div className="sample-photos-row">
                        <span className="sample-label">Or Pick Test Avatar:</span>
                        <button 
                          type="button" 
                          className="btn-sample-pic"
                          onClick={() => handleSetSamplePhoto("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80")}
                        >
                          Ramesh (Auto)
                        </button>
                        <button 
                          type="button" 
                          className="btn-sample-pic"
                          onClick={() => handleSetSamplePhoto("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80")}
                        >
                          Pooja (Appliances)
                        </button>
                        <button 
                          type="button" 
                          className="btn-sample-pic"
                          onClick={() => handleSetSamplePhoto("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80")}
                        >
                          TechNova (IT)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Text Input Fields */}
                <div className="form-fields-grid">
                  <div className="form-group">
                    <label className="field-label">Full Display Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Ramesh Auto Care"
                      className="form-text-input" 
                    />
                    <span className="field-hint">Shown next to your verification badge on all product cards.</span>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Contact Phone Number *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. +91 98451 22345"
                      className="form-text-input" 
                    />
                    <span className="field-hint">Used by buyers to contact you for purchase inquiries.</span>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Service Area / Location *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g. Chokkana Halli, Beside Shobha City, Bengaluru"
                      className="form-text-input" 
                    />
                    <span className="field-hint">Bengaluru area for doorstep inspections and pickup.</span>
                  </div>

                  <div className="form-group">
                    <label className="field-label">Registered Business Name (Required for Trusted ⭐)</label>
                    <input 
                      type="text" 
                      value={formData.businessName}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                      placeholder="e.g. Ramesh Auto Care & Refurbished Motors"
                      className="form-text-input" 
                    />
                    <span className="field-hint">Your enterprise or shop name.</span>
                  </div>

                  <div className="form-group full-width">
                    <label className="field-label">Business Description & Background (Required for Trusted ⭐)</label>
                    <textarea 
                      rows={3}
                      value={formData.businessDesc}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessDesc: e.target.value }))}
                      placeholder="Tell buyers about your quality checks, warranty guarantees, and experience."
                      className="form-textarea-input" 
                    />
                    <span className="field-hint">Displayed on your public profile page.</span>
                  </div>
                </div>

                <div className="form-submit-row">
                  <button type="submit" className="btn btn-save-profile">
                    <Save size={16} />
                    <span>Save Profile & Update Verification Badge</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 2: MY LISTINGS ================= */}
        {activeDashboardTab === 'listings' && (
          <div className="dashboard-listings-section">
            <div className="listings-header-row">
              <div>
                <h3 className="section-heading">My Active Products ({sellerProducts.length})</h3>
                <p className="section-subheading">All items listed under your seller profile with your verification badge.</p>
              </div>
              <button 
                onClick={() => setActiveDashboardTab('new-product')}
                className="btn btn-neat-primary"
              >
                <Plus size={16} />
                <span>Add Another Item</span>
              </button>
            </div>

            {sellerProducts.length === 0 ? (
              <div className="empty-listings-box">
                <Package size={40} className="text-slate-300 mb-2" />
                <h4>No Products Listed Yet</h4>
                <p>Click "Post New Listing" to add your refurbished appliances, vehicles, or electronics.</p>
                <button 
                  onClick={() => setActiveDashboardTab('new-product')}
                  className="btn btn-neat-primary mt-3"
                >
                  <Plus size={16} />
                  <span>Post First Listing</span>
                </button>
              </div>
            ) : (
              <div className="seller-items-grid">
                {sellerProducts.map((prod) => (
                  <div key={prod.id} className="seller-item-card">
                    <div className="item-card-image-wrap">
                      <img src={prod.image} alt={prod.title} className="item-card-img" />
                      <span className="item-category-pill">{prod.categoryName}</span>
                    </div>

                    <div className="item-card-content">
                      <div className="item-seller-line">
                        <SellerVerificationIcon badge={liveStats.badge} showLabel={true} size={14} />
                      </div>
                      <h4 className="item-card-title">{prod.title}</h4>
                      <p className="item-card-specs">{prod.specs}</p>
                      
                      <div className="item-card-pricing">
                        <span className="item-price">₹{prod.price.toLocaleString('en-IN')}</span>
                        {prod.originalPrice && (
                          <span className="item-original-price">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>

                      <div className="item-card-status-badge">
                        <CheckCircle2 size={13} className="text-emerald-500" />
                        <span>Live on Buy & Sell Marketplace</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: POST NEW LISTING ================= */}
        {activeDashboardTab === 'new-product' && (
          <div className="dashboard-add-product-card">
            <h3 className="add-product-title">Post New Item to Buy & Sell Marketplace</h3>
            <p className="add-product-desc">
              Your product will be published immediately with your verified seller badge and linked to your seller profile.
            </p>

            {productPublished && (
              <div className="save-success-banner mb-4">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>Product published successfully! Redirecting to your listings...</span>
              </div>
            )}

            <form onSubmit={handleAddProductSubmit} className="add-product-form">
              <div className="form-fields-grid">
                <div className="form-group full-width">
                  <label className="field-label">Item Title *</label>
                  <input 
                    type="text" 
                    required
                    value={productForm.title}
                    onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. LG 260L Double Door Refrigerator (Mint Condition)"
                    className="form-text-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="field-label">Category *</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => {
                      const id = e.target.value;
                      const names = {
                        cars: 'Cars',
                        bikes: 'Bikes',
                        mobiles: 'Mobiles',
                        laptops: 'Laptops',
                        desktops: 'Desktops',
                        appliances: 'Home Appliances',
                        tvs: 'TVs & ACs',
                        electronics: 'Electronics'
                      };
                      setProductForm(prev => ({ 
                        ...prev, 
                        categoryId: id, 
                        categoryName: names[id] || 'Home Appliances' 
                      }));
                    }}
                    className="form-text-input"
                  >
                    <option value="appliances">Home Appliances</option>
                    <option value="cars">Cars</option>
                    <option value="bikes">Bikes</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="laptops">Laptops</option>
                    <option value="desktops">Desktops</option>
                    <option value="tvs">TVs & ACs</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="field-label">Selling Price (₹) *</label>
                  <input 
                    type="number" 
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g. 16500"
                    className="form-text-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="field-label">Original / MRP Price (₹)</label>
                  <input 
                    type="number" 
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="e.g. 28000"
                    className="form-text-input" 
                  />
                </div>

                <div className="form-group">
                  <label className="field-label">Condition *</label>
                  <select
                    value={productForm.condition}
                    onChange={(e) => setProductForm(prev => ({ ...prev, condition: e.target.value }))}
                    className="form-text-input"
                  >
                    <option value="Like New (Minimal Usage)">Like New (Minimal Usage)</option>
                    <option value="Refurbished (Certified)">Refurbished (Certified)</option>
                    <option value="Good (Tested)">Good (Tested)</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="field-label">Product Image URL *</label>
                  <input 
                    type="url" 
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://..."
                    className="form-text-input" 
                  />
                </div>

                <div className="form-group full-width">
                  <label className="field-label">Specifications & Inspection Notes</label>
                  <textarea 
                    rows={2}
                    value={productForm.specs}
                    onChange={(e) => setProductForm(prev => ({ ...prev, specs: e.target.value }))}
                    placeholder="e.g. 4-Star Smart Inverter • 6-Month Warranty • Inspected by FixWow Hub Chokkana Halli"
                    className="form-textarea-input" 
                  />
                </div>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn-neat-primary">
                  <Plus size={16} />
                  <span>Publish Item to Marketplace</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
