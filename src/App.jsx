import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesExplorer from './components/ServicesExplorer';
import MegaGarageSection from './components/MegaGarageSection';
import UsedGoodsStore from './components/UsedGoodsStore';
import PartnerEcosystem from './components/PartnerEcosystem';
import WhyChooseUs from './components/WhyChooseUs';
import ToolsAndSparesStore from './components/ToolsAndSparesStore';
import BookingTracker from './components/BookingTracker';
import FixWowHubSection from './components/FixWowHubSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CartDrawer from './components/CartDrawer';
import FloatingActions from './components/FloatingActions';
import SellerDashboard from './components/SellerDashboard';
import PublicSellerProfile from './components/PublicSellerProfile';
import WowCars from './components/WowCars';
import WowBikes from './components/WowBikes';
import WowTronics from './components/WowTronics';
import { bangaloreAreas } from './data/companyInfo';
import { INITIAL_SELLERS, INITIAL_MARKETPLACE_PRODUCTS } from './data/marketplaceData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedArea, setSelectedArea] = useState(bangaloreAreas[0]);

  // Marketplace & Seller Ecosystem State
  const [sellers, setSellers] = useState(INITIAL_SELLERS);
  const [marketplaceProducts, setMarketplaceProducts] = useState(INITIAL_MARKETPLACE_PRODUCTS);
  const [currentSellerId, setCurrentSellerId] = useState('seller-4'); // Default: Vikram Kumar (New Seller) for testing progression
  const [viewingSellerId, setViewingSellerId] = useState('seller-1'); // Default: Ramesh Auto Care (Trusted)

  const currentSeller = sellers.find(s => s.id === currentSellerId) || sellers[0];

  const handleUpdateSeller = (updatedSeller) => {
    setSellers(prev => prev.map(s => s.id === updatedSeller.id ? updatedSeller : s));
  };

  const handleAddProduct = (newProduct) => {
    setMarketplaceProducts(prev => [newProduct, ...prev]);
  };

  const handleViewSeller = (sellerId) => {
    if (sellerId) {
      setViewingSellerId(sellerId);
      setActiveTab('seller-profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenSellerDashboard = (sellerId) => {
    if (sellerId && typeof sellerId === 'string') {
      setCurrentSellerId(sellerId);
    }
    setActiveTab('seller-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Theme State: defaults to 'light' per user's neat-and-clean screenshot request
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('fixwow-theme');
    return saved || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fixwow-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  // Shopping Cart State
  const [cartItems, setCartItems] = useState([
    {
      id: "prod-3",
      name: "LG 260L Refrigerator (Like New)",
      price: 16500,
      type: "refurbished",
      category: "Home Appliances",
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedBookingData, setPreselectedBookingData] = useState(null);

  // Active Live Booking State (for tracker)
  const [activeBooking, setActiveBooking] = useState(null);

  // Cart operations
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Open booking modal
  const openBookingModal = (data = null) => {
    setPreselectedBookingData(data);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (bookingDetails) => {
    setActiveBooking({
      ...bookingDetails,
      technician: {
        name: "Manjunath S.",
        role: "Senior Automobile & Electrical Lead",
        rating: 4.9,
        reviews: 214,
        badgeId: "FW-PRO-402",
        phone: "+91 98801 84210",
        vehicle: "FixWow Mobile Unit (KA-04-MB-1029)",
        eta: "18 Minutes"
      }
    });
  };

  const handlePartnerClick = () => {
    setActiveTab('become-a-partner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixwow-app">
      {/* 1. Header / Navbar Matching Screenshot 1 */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0)}
        setIsCartOpen={setIsCartOpen}
        openBookingModal={openBookingModal}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="main-content">
        {/* VIEW 1: Dedicated Services Page (When 'Services' tab is selected) */}
        {activeTab === 'services' && (
          <div className="services-page-view">
            <ServicesExplorer 
              openBookingModal={openBookingModal}
              isDedicatedPage={true}
            />
          </div>
        )}

        {/* VIEW 2: Dedicated Buy & Sell Page */}
        {activeTab === 'buy-sell' && (
          <div className="buysell-page-view">
            <UsedGoodsStore 
              addToCart={addToCart}
              products={marketplaceProducts}
              sellers={sellers}
              onViewSeller={handleViewSeller}
              onOpenSellerDashboard={handleOpenSellerDashboard}
              onNavigateToVertical={(vert) => {
                setActiveTab(vert);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 2A: Dedicated WowCars Page */}
        {activeTab === 'wow-cars' && (
          <div className="wow-cars-page-view">
            <WowCars 
              products={marketplaceProducts}
              sellers={sellers}
              addToCart={addToCart}
              onBack={() => {
                setActiveTab('buy-sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 2B: Dedicated WowBikes Page */}
        {activeTab === 'wow-bikes' && (
          <div className="wow-bikes-page-view">
            <WowBikes 
              products={marketplaceProducts}
              sellers={sellers}
              addToCart={addToCart}
              onBack={() => {
                setActiveTab('buy-sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 2C: Dedicated WowTronics Page */}
        {activeTab === 'wow-tronics' && (
          <div className="wow-tronics-page-view">
            <WowTronics 
              products={marketplaceProducts}
              sellers={sellers}
              addToCart={addToCart}
              onBack={() => {
                setActiveTab('buy-sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* VIEW 3: Dedicated Become a Partner Page */}
        {activeTab === 'become-a-partner' && (
          <div className="partner-page-view">
            <PartnerEcosystem />
            <WhyChooseUs />
          </div>
        )}

        {/* VIEW 4: Dedicated Mega Garage Page */}
        {activeTab === 'garage' && (
          <div className="garage-page-view">
            <MegaGarageSection 
              openBookingModal={openBookingModal} 
            />
          </div>
        )}

        {/* VIEW 5: Seller Hub & Dashboard (Profile settings, real-time badge progression, new listing) */}
        {activeTab === 'seller-dashboard' && (
          <div className="seller-dashboard-page-view">
            <SellerDashboard 
              currentSeller={currentSeller}
              onUpdateSeller={handleUpdateSeller}
              onAddProduct={handleAddProduct}
              onBackToMarketplace={() => {
                setActiveTab('buy-sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              products={marketplaceProducts}
              allSellers={sellers}
              onSwitchSeller={(s) => setCurrentSellerId(s.id)}
            />
          </div>
        )}

        {/* VIEW 6: Public Seller Profile Page */}
        {activeTab === 'seller-profile' && (
          <div className="seller-profile-page-view">
            <PublicSellerProfile 
              sellerId={viewingSellerId}
              sellers={sellers}
              products={marketplaceProducts}
              onBack={() => {
                setActiveTab('buy-sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddToCart={addToCart}
            />
          </div>
        )}

        {/* VIEW 7: Home / Master View - Pristine 5 Sections Matching Screenshots 1-5 */}
        {activeTab === 'home' && (
          <>
            {/* Section 1: Hero Section Matching Screenshot 1 */}
            <HeroSection 
              openBookingModal={openBookingModal}
              onBookServiceClick={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPartnerClick={handlePartnerClick}
            />

            {/* Section 2: Our Services 4x2 Grid Matching Screenshot 2 */}
            <ServicesExplorer 
              openBookingModal={openBookingModal}
              isDedicatedPage={false}
              onViewAllServices={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Section 3: Quality Refurbished Items / Buy & Sell Matching Screenshot 3 */}
            <UsedGoodsStore 
              addToCart={addToCart}
              products={marketplaceProducts}
              sellers={sellers}
              onViewSeller={handleViewSeller}
              onOpenSellerDashboard={handleOpenSellerDashboard}
              isHomePreview={true}
              onExploreMarketplace={() => {
                setActiveTab('buy-sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToVertical={(vert) => {
                setActiveTab(vert);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Section 4: Partner With Us / Grow Your Business Matching Screenshot 4 */}
            <PartnerEcosystem />

            {/* Section 5: Why Choose Us / The FixWow Difference Matching Screenshot 5 */}
            <WhyChooseUs />
          </>
        )}
      </main>

      {/* Footer Matching Screenshot 4 */}
      <Footer 
        setActiveTab={setActiveTab}
        openBookingModal={openBookingModal}
      />

      {/* Floating Action Buttons (Robot Chatbot + WhatsApp) Matching all Screenshots */}
      <FloatingActions 
        openBookingModal={openBookingModal}
      />

      {/* Interactive Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedData={preselectedBookingData}
        selectedArea={selectedArea}
        onBookingSuccess={handleBookingSuccess}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </div>
  );
}
