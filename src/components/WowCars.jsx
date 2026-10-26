import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Search, 
  ShieldCheck, 
  Award, 
  RotateCcw, 
  Calendar, 
  Fuel, 
  Gauge, 
  CheckCircle2, 
  ArrowLeft, 
  ShoppingCart, 
  Sparkles, 
  FileText, 
  PhoneCall,
  X,
  Send,
  Star,
  Calculator,
  ChevronRight,
  SlidersHorizontal,
  HelpCircle,
  Clock,
  MapPin,
  Check,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import SellerVerificationIcon from './SellerVerificationIcon';
import wowcarsLogo from '../assets/wowcars-logo.png';
import { 
  calculateSellerBadge, 
  WOW_CARS_BRANDS, 
  WOW_CARS_BODY_TYPES,
  WOW_CARS_BUDGETS,
  INITIAL_SELLERS 
} from '../data/marketplaceData';

export default function WowCars({ 
  products = [], 
  sellers = INITIAL_SELLERS,
  addToCart, 
  onBack,
  onNavigate
}) {
  // Filters State
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedBodyType, setSelectedBodyType] = useState('All Types');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [selectedFuel, setSelectedFuel] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Test Drive Modal State
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false);
  const [selectedCarForDrive, setSelectedCarForDrive] = useState(null);
  const [driveFormSuccess, setDriveFormSuccess] = useState(false);
  const [driveFormData, setDriveFormData] = useState({
    name: '',
    phone: '',
    date: '',
    slot: 'Morning (10:00 AM - 1:00 PM)',
    address: 'Thanisandra / Chokkana Halli, Bengaluru'
  });

  // 150-Point Inspection Modal State
  const [inspectionModalOpen, setInspectionModalOpen] = useState(false);
  const [selectedCarForInspection, setSelectedCarForInspection] = useState(null);

  // EMI Calculator State
  const [loanPrice, setLoanPrice] = useState(600000);
  const [downPayment, setDownPayment] = useState(100000);
  const [loanTenureYears, setLoanTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(9.5);

  // Instant Sell Valuation State
  const [sellValBrand, setSellValBrand] = useState('Maruti Suzuki');
  const [sellValYear, setSellValYear] = useState('2021');
  const [sellValKm, setSellValKm] = useState('35000');
  const [sellValPhone, setSellValPhone] = useState('');
  const [valuationResult, setValuationResult] = useState(null);

  // Extract all car products
  const carProducts = useMemo(() => {
    return products.filter(p => p.vertical === 'wow-cars' || p.categoryId === 'cars');
  }, [products]);

  // Dynamic Filtering Logic
  const filteredCars = useMemo(() => {
    return carProducts.filter(car => {
      // 1. Brand filter
      if (selectedBrand !== 'All Brands' && car.brand !== selectedBrand) {
        return false;
      }

      // 2. Body Type filter
      if (selectedBodyType !== 'All Types' && car.bodyType !== selectedBodyType) {
        return false;
      }

      // 3. Fuel filter
      if (selectedFuel !== 'All' && car.fuelType !== selectedFuel) {
        return false;
      }

      // 4. Transmission filter
      if (selectedTransmission !== 'All' && car.transmission !== selectedTransmission) {
        return false;
      }

      // 5. Budget filter
      if (selectedBudget === 'Under ₹5 Lakh' && car.price >= 500000) return false;
      if (selectedBudget === '₹5 - 8 Lakh' && (car.price < 500000 || car.price > 800000)) return false;
      if (selectedBudget === '₹8 - 12 Lakh' && (car.price < 800000 || car.price > 1200000)) return false;
      if (selectedBudget === 'Above ₹12 Lakh' && car.price <= 1200000) return false;

      // 6. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = car.title?.toLowerCase().includes(q);
        const matchBrand = car.brand?.toLowerCase().includes(q);
        const matchSpecs = car.specs?.toLowerCase().includes(q);
        const matchColor = car.color?.toLowerCase().includes(q);
        const matchRto = car.rto?.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchSpecs && !matchColor && !matchRto) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'score-high') return (b.inspectionScore || 95) - (a.inspectionScore || 95);
      if (sortBy === 'year-new') return parseInt(b.year || '2020') - parseInt(a.year || '2020');
      return 0; // recommended
    });
  }, [carProducts, selectedBrand, selectedBodyType, selectedFuel, selectedTransmission, selectedBudget, searchQuery, sortBy]);

  // EMI Calculation Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculatedEMI = useMemo(() => {
    const principal = Math.max(0, loanPrice - downPayment);
    const monthlyRate = (interestRate / 12) / 100;
    const totalMonths = loanTenureYears * 12;
    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) return 0;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return Math.round(emi);
  }, [loanPrice, downPayment, loanTenureYears, interestRate]);

  const totalPayable = useMemo(() => {
    const totalMonths = loanTenureYears * 12;
    return calculatedEMI * totalMonths;
  }, [calculatedEMI, loanTenureYears]);

  const totalInterest = useMemo(() => {
    const principal = Math.max(0, loanPrice - downPayment);
    return Math.max(0, totalPayable - principal);
  }, [totalPayable, loanPrice, downPayment]);

  // Open Test Drive Modal
  const handleOpenTestDrive = (car) => {
    setSelectedCarForDrive(car);
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

  // Open 150-Point Inspection Modal
  const handleOpenInspection = (car) => {
    setSelectedCarForInspection(car);
    setInspectionModalOpen(true);
  };

  // Instant Sell Valuation Calculation
  const handleCalculateValuation = (e) => {
    e.preventDefault();
    let base = 500000;
    if (sellValBrand === 'Maruti Suzuki') base = 480000;
    else if (sellValBrand === 'Hyundai') base = 620000;
    else if (sellValBrand === 'Tata Motors') base = 580000;
    else if (sellValBrand === 'Toyota') base = 950000;
    else if (sellValBrand === 'Mahindra') base = 700000;
    else if (sellValBrand === 'Kia') base = 850000;
    else if (sellValBrand === 'Honda') base = 680000;

    const yearFactor = (parseInt(sellValYear) - 2018) * 45000;
    const kmFactor = Math.max(0, (60000 - parseInt(sellValKm || '30000')) * 2);
    const estimatedValue = Math.round(base + yearFactor + kmFactor);
    const lowerRange = Math.round(estimatedValue * 0.94);
    const upperRange = Math.round(estimatedValue * 1.05);

    setValuationResult({
      lower: lowerRange,
      upper: upperRange,
      brand: sellValBrand,
      year: sellValYear
    });
  };

  return (
    <div className="wow-vertical-page wow-cars-dynamic-page">
      {/* 1. Top Breadcrumb & Concierge Hotline Bar */}
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
              <strong className="active text-orange">WowCars</strong>
            </div>

            <div className="wow-concierge-pill">
              <PhoneCall size={14} className="text-orange" />
              <span>Car Concierge: <strong>+91 901 908 8160</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Flagship Dynamic Hero Banner Featuring User's WowCars Logo */}
      <section className="wowcars-flagship-hero">
        <div className="container">
          <div className="wowcars-hero-grid">
            {/* Left Column: Official Logo + Value Proposition */}
            <div className="wowcars-hero-left">
              <div className="wowcars-brand-logo-frame">
                <img 
                  src={wowcarsLogo} 
                  alt="WowCars - Pre-Owned Cars You Can Trust" 
                  className="wowcars-main-logo"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = 'true';
                      e.currentTarget.src = `${import.meta.env.BASE_URL}wowcars-logo.png`;
                    }
                  }}
                />
              </div>

              <div className="wowcars-hero-badge-tag">
                <Sparkles size={15} className="text-orange" />
                <span>FixWow Certified Pre-Owned Network • Bengaluru</span>
              </div>

              <h1 className="wowcars-hero-headline">
                The Safest Way to Buy Certified Used Cars in Bengaluru
              </h1>

              <p className="wowcars-hero-subtext">
                Every vehicle passes FixWow’s rigorous 150-Point Certified Inspection. 
                Enjoy <strong>6 Months Comprehensive Engine & Gearbox Warranty</strong>, 
                <strong> 7-Day Money-Back Guarantee</strong>, and <strong>Free Doorstep Test Drive</strong>.
              </p>

              {/* Trust Metric Counters */}
              <div className="wowcars-stats-row">
                <div className="wowcars-stat-box">
                  <div className="stat-num">150+</div>
                  <div className="stat-label">Point Inspection</div>
                </div>
                <div className="wowcars-stat-box">
                  <div className="stat-num">6 Mo</div>
                  <div className="stat-label">Free Warranty</div>
                </div>
                <div className="wowcars-stat-box">
                  <div className="stat-num">7 Days</div>
                  <div className="stat-label">Return Policy</div>
                </div>
                <div className="wowcars-stat-box">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">RC Transfer</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Interactive Spotlight Card */}
            <div className="wowcars-hero-right">
              <div className="wowcars-spotlight-card">
                <div className="spotlight-card-top">
                  <div className="spotlight-tag">
                    <CheckCircle2 size={14} />
                    <span>Featured Deal of the Week</span>
                  </div>
                  <span className="spotlight-city">Bengaluru Verified</span>
                </div>

                <div className="spotlight-img-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80" 
                    alt="Hyundai Creta SX" 
                    className="spotlight-img"
                  />
                  <div className="spotlight-inspection-badge">
                    <ShieldCheck size={14} />
                    <span>99% Health Score</span>
                  </div>
                </div>

                <div className="spotlight-body">
                  <div className="spotlight-title-row">
                    <h3>Hyundai Creta SX 1.5 Petrol</h3>
                    <div className="spotlight-price">₹9,80,000</div>
                  </div>
                  <p className="spotlight-specs">
                    2021 Model • 28,500 km • Panoramic Sunroof • 1st Owner • KA-03 Indiranagar
                  </p>

                  <div className="spotlight-actions">
                    <button 
                      className="btn btn-wowcars-accent"
                      onClick={() => {
                        const target = carProducts.find(c => c.id === 'prod-c2') || carProducts[0];
                        handleOpenTestDrive(target);
                      }}
                    >
                      <Calendar size={16} />
                      <span>Book Free Doorstep Test Drive</span>
                    </button>
                    <button 
                      className="btn btn-wowcars-outline"
                      onClick={() => {
                        const target = carProducts.find(c => c.id === 'prod-c2') || carProducts[0];
                        handleOpenInspection(target);
                      }}
                    >
                      <FileText size={16} />
                      <span>Inspection Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Search & Interactive Filter Control Deck */}
      <section className="wowcars-filter-deck">
        <div className="container">
          <div className="wowcars-deck-card">
            {/* Search Input Bar */}
            <div className="wowcars-search-row">
              <div className="wowcars-search-input-wrap">
                <Search size={20} className="wowcars-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search by car model, brand, color, or RTO (e.g. Swift, Creta, Nexon, KA-04)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="wowcars-search-field"
                />
                {searchQuery && (
                  <button className="wowcars-search-clear" onClick={() => setSearchQuery('')}>
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="wowcars-sort-wrap">
                <SlidersHorizontal size={16} className="text-muted" />
                <span className="sort-label">Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="wowcars-sort-dropdown"
                >
                  <option value="recommended">Featured / Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="score-high">Highest Inspection Score</option>
                  <option value="year-new">Newest Model Year</option>
                </select>
              </div>
            </div>

            {/* Body Type Quick-Filter Buttons */}
            <div className="wowcars-bodytype-bar">
              <span className="filter-group-title">Body Type:</span>
              <div className="wowcars-bodytype-pills">
                {WOW_CARS_BODY_TYPES.map((type) => {
                  const isSelected = selectedBodyType === type;
                  return (
                    <button
                      key={type}
                      className={`wowcars-type-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedBodyType(type)}
                    >
                      <Car size={15} />
                      <span>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter Chips */}
            <div className="wowcars-brand-bar">
              <span className="filter-group-title">Brand:</span>
              <div className="wowcars-brand-chips">
                {WOW_CARS_BRANDS.map((brandName) => {
                  const isSelected = selectedBrand === brandName;
                  return (
                    <button
                      key={brandName}
                      className={`wowcars-brand-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedBrand(brandName)}
                    >
                      <span>{brandName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget Range Chips */}
            <div className="wowcars-budget-bar">
              <span className="filter-group-title">Budget:</span>
              <div className="wowcars-budget-chips">
                {WOW_CARS_BUDGETS.map((budget) => {
                  const isSelected = selectedBudget === budget;
                  return (
                    <button
                      key={budget}
                      className={`wowcars-budget-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedBudget(budget)}
                    >
                      <span>{budget}</span>
                    </button>
                  );
                })}

                <div className="wowcars-fuel-inline">
                  <span className="filter-group-title ml-4">Fuel:</span>
                  {['All', 'Petrol', 'Diesel'].map((fuel) => (
                    <button
                      key={fuel}
                      className={`wowcars-mini-chip ${selectedFuel === fuel ? 'active' : ''}`}
                      onClick={() => setSelectedFuel(fuel)}
                    >
                      {fuel}
                    </button>
                  ))}
                </div>

                <div className="wowcars-fuel-inline">
                  <span className="filter-group-title ml-4">Gearbox:</span>
                  {['All', 'Manual', 'Automatic'].map((trans) => (
                    <button
                      key={trans}
                      className={`wowcars-mini-chip ${selectedTransmission === trans ? 'active' : ''}`}
                      onClick={() => setSelectedTransmission(trans)}
                    >
                      {trans}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Car Inventory Grid Section */}
      <section className="wowcars-inventory-section">
        <div className="container">
          {/* Results Count & Reset Bar */}
          <div className="wowcars-results-header">
            <div>
              <h2 className="inventory-heading">Available Pre-Owned Cars in Bengaluru</h2>
              <p className="inventory-subheading">
                Showing <strong>{filteredCars.length}</strong> certified cars ready for instant doorstep test drive
              </p>
            </div>

            {(selectedBrand !== 'All Brands' || selectedBodyType !== 'All Types' || selectedBudget !== 'All Budgets' || selectedFuel !== 'All' || selectedTransmission !== 'All' || searchQuery) && (
              <button 
                className="wowcars-clear-all-btn"
                onClick={() => {
                  setSelectedBrand('All Brands');
                  setSelectedBodyType('All Types');
                  setSelectedBudget('All Budgets');
                  setSelectedFuel('All');
                  setSelectedTransmission('All');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Cars Grid */}
          <div className="wowcars-grid-container">
            {filteredCars.map((car) => {
              const seller = sellers.find(s => s.id === car.seller_id);
              const { badge } = seller ? calculateSellerBadge(seller) : { badge: 'verified' };
              const sellerName = car.seller_name || seller?.name || 'Ramesh Auto Care';

              return (
                <div key={car.id} className="wowcars-vehicle-card">
                  {/* Top Image Showcase */}
                  <div className="card-media-wrap">
                    <img 
                      src={car.image} 
                      alt={car.title} 
                      className="card-car-img"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80";
                      }}
                    />

                    {/* Floating Left: Tag Badge */}
                    <div className="card-badge-left">
                      <span>{car.tag || '150-Pt Checked'}</span>
                    </div>

                    {/* Floating Right: Inspection Score */}
                    <div className="card-badge-right">
                      <ShieldCheck size={13} className="text-green" />
                      <span>{car.inspectionScore || 98}% Score</span>
                    </div>

                    {/* Bottom floating brand */}
                    <div className="card-brand-bottom">
                      <span>{car.brand}</span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="card-content-body">
                    {/* Header Row: Model Year & Body Type */}
                    <div className="card-meta-top">
                      <span className="card-year-pill">{car.year || '2021'} Model</span>
                      <span className="card-type-pill">{car.bodyType || 'Hatchback'}</span>
                      <span className="card-rto-pill">{car.rto || 'Bengaluru'}</span>
                    </div>

                    <h3 className="card-car-title">{car.title}</h3>

                    {/* 4-Specs Metric Grid */}
                    <div className="card-specs-matrix">
                      <div className="spec-tile" title="Kilometers Driven">
                        <Gauge size={14} className="text-orange" />
                        <span>{car.km || '30,000 km'}</span>
                      </div>
                      <div className="spec-tile" title="Fuel Type">
                        <Fuel size={14} className="text-orange" />
                        <span>{car.fuelType || 'Petrol'}</span>
                      </div>
                      <div className="spec-tile" title="Transmission">
                        <Car size={14} className="text-orange" />
                        <span>{car.transmission || 'Manual'}</span>
                      </div>
                      <div className="spec-tile" title="Ownership">
                        <Check size={14} className="text-green" />
                        <span>{car.owner || '1st Owner'}</span>
                      </div>
                    </div>

                    {/* Highlighted Specs Sentence */}
                    <p className="card-specs-summary">{car.specs}</p>

                    {/* Inspection Health Bar */}
                    <div 
                      className="card-inspection-bar-wrap" 
                      onClick={() => handleOpenInspection(car)}
                      title="Click to view full 150-Point Inspection Report"
                    >
                      <div className="inspection-bar-text">
                        <span>150-Point Quality Pass</span>
                        <strong className="text-green">{car.inspectionScore || 98}% Verified</strong>
                      </div>
                      <div className="inspection-progress-track">
                        <div 
                          className="inspection-progress-fill" 
                          style={{ width: `${car.inspectionScore || 98}%` }}
                        />
                      </div>
                    </div>

                    {/* Verified Seller Line */}
                    <div className="card-seller-info-row">
                      <span className="seller-intro">Seller:</span>
                      <span className="seller-name">{sellerName}</span>
                      <SellerVerificationIcon badge={badge} size={14} />
                    </div>

                    {/* Price & EMI Box */}
                    <div className="card-price-container">
                      <div>
                        <div className="card-price-value">₹{car.price?.toLocaleString()}</div>
                        {car.originalPrice && (
                          <div className="card-original-price">New: ₹{car.originalPrice.toLocaleString()}</div>
                        )}
                      </div>

                      {car.emi && (
                        <div className="card-emi-pill">
                          <span className="emi-label">EMI from</span>
                          <strong className="emi-amount">₹{car.emi}/mo</strong>
                        </div>
                      )}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="card-action-row">
                      <button 
                        className="btn btn-card-testdrive"
                        onClick={() => handleOpenTestDrive(car)}
                      >
                        <Calendar size={15} />
                        <span>Free Test Drive</span>
                      </button>

                      <button 
                        className="btn btn-card-report"
                        onClick={() => handleOpenInspection(car)}
                        title="View 150-Point Inspection Breakdown"
                      >
                        <FileText size={15} />
                      </button>

                      <button 
                        className="btn btn-card-buy"
                        onClick={() => addToCart({
                          id: car.id,
                          name: car.title,
                          price: car.price,
                          type: 'refurbished-car',
                          category: 'Cars'
                        })}
                        title="Reserve or Add to Cart"
                      >
                        <ShoppingCart size={15} />
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCars.length === 0 && (
            <div className="wowcars-empty-state">
              <Car size={54} className="text-orange mx-auto mb-3" />
              <h3>No cars found matching your selected filters</h3>
              <p>Try resetting the brand, body type, or price filters to view all available cars.</p>
              <button 
                className="btn btn-neat-primary mt-4"
                onClick={() => {
                  setSelectedBrand('All Brands');
                  setSelectedBodyType('All Types');
                  setSelectedBudget('All Budgets');
                  setSelectedFuel('All');
                  setSelectedTransmission('All');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. Dynamic Car Loan & EMI Calculator Interactive Widget */}
      <section className="wowcars-calculator-section">
        <div className="container">
          <div className="calculator-card-wrapper">
            <div className="calculator-header text-center">
              <div className="neat-badge-pill neat-badge-gray mb-2">
                <Calculator size={15} className="text-orange mr-1" />
                <span>Instant Finance</span>
              </div>
              <h2 className="calc-title">Car Loan & Monthly EMI Calculator</h2>
              <p className="calc-desc">
                Customize your down payment and tenure to calculate affordable monthly EMIs with FixWow partner banks.
              </p>
            </div>

            <div className="calculator-body-grid">
              {/* Sliders Column */}
              <div className="calc-controls-col">
                {/* 1. Car Price Slider */}
                <div className="calc-slider-block">
                  <div className="slider-label-row">
                    <span>Car Price:</span>
                    <strong>₹{loanPrice.toLocaleString()}</strong>
                  </div>
                  <input 
                    type="range" 
                    min="200000" 
                    max="2000000" 
                    step="25000"
                    value={loanPrice} 
                    onChange={(e) => setLoanPrice(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="slider-limits">
                    <span>₹2 Lakh</span>
                    <span>₹20 Lakh</span>
                  </div>
                </div>

                {/* 2. Down Payment Slider */}
                <div className="calc-slider-block">
                  <div className="slider-label-row">
                    <span>Down Payment:</span>
                    <strong>₹{downPayment.toLocaleString()}</strong>
                  </div>
                  <input 
                    type="range" 
                    min="50000" 
                    max={loanPrice * 0.8} 
                    step="10000"
                    value={downPayment} 
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="slider-limits">
                    <span>₹50,000</span>
                    <span>₹{(loanPrice * 0.8).toLocaleString()}</span>
                  </div>
                </div>

                {/* 3. Tenure Buttons */}
                <div className="calc-slider-block">
                  <div className="slider-label-row">
                    <span>Loan Tenure (Years):</span>
                    <strong>{loanTenureYears} Years ({loanTenureYears * 12} Months)</strong>
                  </div>
                  <div className="calc-tenure-btns">
                    {[1, 2, 3, 4, 5, 7].map((yr) => (
                      <button
                        key={yr}
                        className={`tenure-btn ${loanTenureYears === yr ? 'active' : ''}`}
                        onClick={() => setLoanTenureYears(yr)}
                      >
                        {yr} {yr === 1 ? 'Yr' : 'Yrs'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Interest Rate */}
                <div className="calc-slider-block">
                  <div className="slider-label-row">
                    <span>Interest Rate (% per annum):</span>
                    <strong>{interestRate}%</strong>
                  </div>
                  <input 
                    type="range" 
                    min="7.5" 
                    max="14.0" 
                    step="0.25"
                    value={interestRate} 
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="calc-range-slider"
                  />
                  <div className="slider-limits">
                    <span>7.5% (Prime)</span>
                    <span>14.0%</span>
                  </div>
                </div>
              </div>

              {/* Output Display Card */}
              <div className="calc-output-col">
                <div className="calc-summary-card">
                  <span className="summary-label">Estimated Monthly EMI</span>
                  <div className="summary-emi-amount">₹{calculatedEMI.toLocaleString()}</div>
                  <span className="summary-caption">Inclusive of partner bank processing support</span>

                  <div className="summary-divider" />

                  <div className="summary-metrics-list">
                    <div className="metric-line">
                      <span>Loan Amount (Principal):</span>
                      <strong>₹{(loanPrice - downPayment).toLocaleString()}</strong>
                    </div>
                    <div className="metric-line">
                      <span>Total Interest Payable:</span>
                      <strong>₹{totalInterest.toLocaleString()}</strong>
                    </div>
                    <div className="metric-line">
                      <span>Total Amount Payable:</span>
                      <strong>₹{totalPayable.toLocaleString()}</strong>
                    </div>
                  </div>

                  <button 
                    className="btn btn-neat-primary btn-block mt-4"
                    onClick={() => alert("Our auto-financing lead will contact you with 0-downpayment options and pre-approved loans from HDFC, ICICI, and SBI!")}
                  >
                    <CheckCircle2 size={16} />
                    <span>Apply for Instant Loan Approval</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Instant Sell Valuation Tool ("Sell Your Car in 30 Mins") */}
      <section className="wowcars-sell-estimator-section">
        <div className="container">
          <div className="sell-estimator-card">
            <div className="sell-card-content">
              <div className="neat-badge-pill mb-2">
                <TrendingUp size={14} className="text-orange mr-1" />
                <span>Instant Valuation</span>
              </div>
              <h2 className="sell-title">Want to Sell Your Car in Bengaluru?</h2>
              <p className="sell-desc">
                Get an instant estimated price range, doorstep 150-point inspection in 2 hours, and same-day payment with free RC transfer.
              </p>

              <form onSubmit={handleCalculateValuation} className="sell-quick-form">
                <div className="form-row-three">
                  <div className="form-group-item">
                    <label>Car Brand</label>
                    <select 
                      value={sellValBrand}
                      onChange={(e) => setSellValBrand(e.target.value)}
                    >
                      {WOW_CARS_BRANDS.filter(b => b !== 'All Brands').map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label>Registration Year</label>
                    <select 
                      value={sellValYear}
                      onChange={(e) => setSellValYear(e.target.value)}
                    >
                      {['2024', '2023', '2022', '2021', '2020', '2019', '2018'].map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-item">
                    <label>Kilometers Driven</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 35000" 
                      value={sellValKm}
                      onChange={(e) => setSellValKm(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="sell-action-row">
                  <button type="submit" className="btn btn-wowcars-accent">
                    <Calculator size={16} />
                    <span>Get Instant Resale Value</span>
                  </button>
                </div>
              </form>

              {valuationResult && (
                <div className="valuation-result-box">
                  <CheckCircle2 size={32} className="text-green" />
                  <div>
                    <div className="val-car-title">
                      Estimated WowCars Value for {valuationResult.year} {valuationResult.brand}:
                    </div>
                    <div className="val-price-range">
                      ₹{valuationResult.lower.toLocaleString()} – ₹{valuationResult.upper.toLocaleString()}
                    </div>
                    <p className="val-note">
                      *Exact price finalized after free doorstep 150-point physical inspection. Call <strong>+91 901 908 8160</strong> for instant pickup.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. The WowCars Assurance: 6 Trust Pillars */}
      <section className="wowcars-assurance-section">
        <div className="container">
          <div className="text-center mb-8">
            <div className="neat-badge-pill neat-badge-gray mb-2">The WowCars Promise</div>
            <h2 className="neat-heading-title">Why Pre-Owned Cars from WowCars are Better</h2>
            <p className="neat-subtitle">No lemons, no odometer tampering, no surprises. Just quality cars inspected by experts.</p>
          </div>

          <div className="assurance-pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon bg-orange-subtle">
                <ShieldCheck size={26} className="text-orange" />
              </div>
              <h4>150-Point Inspection</h4>
              <p>Every engine, gearbox, chassis, and electronic component tested by senior certified automobile engineers.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon bg-blue-subtle">
                <Award size={26} className="text-blue" />
              </div>
              <h4>6-Month Warranty</h4>
              <p>Comprehensive engine and transmission warranty with pan-India cashless roadside coverage.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon bg-purple-subtle">
                <RotateCcw size={26} className="text-purple" />
              </div>
              <h4>7-Day Money Back</h4>
              <p>If you don’t fall in love with your car within 7 days, return it for a 100% refund, no questions asked.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon bg-orange-subtle">
                <Calendar size={26} className="text-orange" />
              </div>
              <h4>Doorstep Test Drive</h4>
              <p>We bring the sanitized vehicle straight to your home or office in Bengaluru at your chosen time slot.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon bg-blue-subtle">
                <FileText size={26} className="text-blue" />
              </div>
              <h4>Guaranteed RC Transfer</h4>
              <p>Complete RTO documentation, ownership name transfer, and insurance transfer handled entirely by us.</p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon bg-purple-subtle">
                <DollarSign size={26} className="text-purple" />
              </div>
              <h4>Zero Hidden Fees</h4>
              <p>Fixed, transparent pricing with no dealer commissions or surprise documentation surcharges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Free Test Drive Modal */}
      {testDriveModalOpen && selectedCarForDrive && (
        <div className="modal-backdrop">
          <div className="modal-card wow-testdrive-modal glass-card">
            <div className="modal-header">
              <div>
                <div className="neat-badge-pill mb-1">Doorstep Test Drive</div>
                <h3 className="modal-title">Book Free Doorstep Test Drive</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setTestDriveModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {driveFormSuccess ? (
              <div className="text-center p-6">
                <CheckCircle2 size={48} className="text-orange mx-auto mb-3" />
                <h3>Test Drive Scheduled!</h3>
                <p>Our WowCars specialist will bring the <strong>{selectedCarForDrive.title}</strong> directly to your address for a thorough test drive.</p>
              </div>
            ) : (
              <form onSubmit={handleTestDriveSubmit} className="booking-form-body">
                <div className="neat-modal-car-preview">
                  <img src={selectedCarForDrive.image} alt="" className="preview-img" />
                  <div>
                    <strong>{selectedCarForDrive.title}</strong>
                    <div className="text-orange font-bold">₹{selectedCarForDrive.price?.toLocaleString()}</div>
                    <span className="text-muted text-xs">{selectedCarForDrive.specs}</span>
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
                    placeholder="Enter your apartment, street, and area" 
                    value={driveFormData.address}
                    onChange={(e) => setDriveFormData({ ...driveFormData, address: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-wowcars-accent btn-block btn-lg mt-3">
                  <Send size={18} />
                  <span>Confirm Free Doorstep Test Drive</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 9. Interactive 150-Point Inspection Report Modal */}
      {inspectionModalOpen && selectedCarForInspection && (
        <div className="modal-backdrop">
          <div className="modal-card wow-inspection-modal glass-card">
            <div className="modal-header">
              <div>
                <div className="neat-badge-pill mb-1">
                  <ShieldCheck size={14} className="text-green mr-1" />
                  <span>Certified Inspection Report</span>
                </div>
                <h3 className="modal-title">150-Point Check: {selectedCarForInspection.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setInspectionModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="inspection-modal-body">
              {/* Overall Score Banner */}
              <div className="inspection-score-banner">
                <div className="score-circle">
                  <span>{selectedCarForInspection.inspectionScore || 98}</span>
                  <small>/100</small>
                </div>
                <div className="score-meta">
                  <h4>FixWow Certified Vehicle</h4>
                  <p>Inspected by Senior Lead Automobile Inspector on 12-Oct-2026 at Chokkana Halli Hub.</p>
                  <span className="badge-pass">PASSED ALL MANDATORY SAFETY CRITERIA</span>
                </div>
              </div>

              {/* Categorized Checkpoints */}
              <div className="inspection-checklist-grid">
                <div className="check-category-card">
                  <div className="cat-title-row">
                    <Car size={16} className="text-orange" />
                    <strong>Engine & Transmission</strong>
                    <span className="cat-score">100%</span>
                  </div>
                  <ul>
                    <li><Check size={14} className="text-green" /> Engine compression & noise: Normal</li>
                    <li><Check size={14} className="text-green" /> Fluid levels & zero leakage: Passed</li>
                    <li><Check size={14} className="text-green" /> Clutch bite & smooth shifting: Passed</li>
                  </ul>
                </div>

                <div className="check-category-card">
                  <div className="cat-title-row">
                    <ShieldCheck size={16} className="text-orange" />
                    <strong>Chassis & Structural Frame</strong>
                    <span className="cat-score">100%</span>
                  </div>
                  <ul>
                    <li><Check size={14} className="text-green" /> Zero accidental frame damage: Verified</li>
                    <li><Check size={14} className="text-green" /> Apron, pillar & floor integrity: Intact</li>
                    <li><Check size={14} className="text-green" /> Zero flood or water damage: Verified</li>
                  </ul>
                </div>

                <div className="check-category-card">
                  <div className="cat-title-row">
                    <Gauge size={16} className="text-orange" />
                    <strong>Brakes, Tyres & Suspension</strong>
                    <span className="cat-score">96%</span>
                  </div>
                  <ul>
                    <li><Check size={14} className="text-green" /> Front &amp; rear brake pads: &gt; 80% life</li>
                    <li><Check size={14} className="text-green" /> Tyre tread depth: 6.8mm (Healthy)</li>
                    <li><Check size={14} className="text-green" /> Shock absorbers & bushes: Operational</li>
                  </ul>
                </div>

                <div className="check-category-card">
                  <div className="cat-title-row">
                    <FileText size={16} className="text-orange" />
                    <strong>Electricals, AC & Paperwork</strong>
                    <span className="cat-score">100%</span>
                  </div>
                  <ul>
                    <li><Check size={14} className="text-green" /> AC chilling at 6.2°C: Optimal</li>
                    <li><Check size={14} className="text-green" /> Single owner, clear title: Verified</li>
                    <li><Check size={14} className="text-green" /> Comprehensive insurance active: Verified</li>
                  </ul>
                </div>
              </div>

              {/* Action Inside Modal */}
              <div className="inspection-modal-actions">
                <button 
                  className="btn btn-wowcars-accent btn-block"
                  onClick={() => {
                    setInspectionModalOpen(false);
                    handleOpenTestDrive(selectedCarForInspection);
                  }}
                >
                  <Calendar size={16} />
                  <span>Book Free Doorstep Test Drive for This Car</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
