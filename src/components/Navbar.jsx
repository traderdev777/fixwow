import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Calendar } from 'lucide-react';
import fixwowLogo from '../assets/fixwow-logo.png';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  setIsCartOpen, 
  openBookingModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on resize to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'buy-sell', label: 'Buy & Sell' },
    { id: 'become-a-partner', label: 'Become a Partner' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'about') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('why-choose-us');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'contact') {
      setTimeout(() => {
        const el = document.getElementById('footer') || document.querySelector('.site-footer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (id === 'become-a-partner') {
      setActiveTab('become-a-partner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'services') {
      setActiveTab('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'buy-sell') {
      setActiveTab('buy-sell');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="neat-header-wrapper" id="top">
        <div className="container neat-header-container">
          {/* Left Brand Logo */}
          <div 
            className="neat-logo-wrap" 
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img 
              src={fixwowLogo} 
              alt="FixWow" 
              className="neat-logo-img"
              onError={(e) => {
                e.currentTarget.src = `${import.meta.env.BASE_URL}fixwow-logo.png`;
              }}
            />
          </div>

          {/* Desktop Nav Items */}
          <nav className="neat-nav-menu">
            {navItems.map((item) => {
              const isActive = activeTab === item.id || 
                (item.id === 'buy-sell' && (activeTab === 'wow-cars' || activeTab === 'wow-bikes' || activeTab === 'wow-tronics'));
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`neat-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="neat-header-right">
            {/* Shopping Cart button if items in cart */}
            {cartCount > 0 && (
              <button 
                className="neat-icon-btn neat-cart-btn"
                onClick={() => setIsCartOpen(true)}
                title="Cart"
                aria-label="View shopping cart"
              >
                <ShoppingCart size={18} />
                <span className="neat-cart-count">{cartCount}</span>
              </button>
            )}

            {/* "Book a Service" Primary CTA */}
            <button 
              className="btn btn-neat-primary neat-book-btn"
              onClick={() => {
                setActiveTab('services');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Book a Service"
            >
              <Calendar size={15} className="neat-book-icon-mobile" />
              <span className="neat-book-btn-text">Book a Service</span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="neat-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Slide-down Mobile Navigation Drawer */}
        <div className={`neat-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="neat-mobile-drawer-inner">
            <div className="neat-mobile-nav-links">
              {navItems.map((item) => {
                const isActive = activeTab === item.id || 
                  (item.id === 'buy-sell' && (activeTab === 'wow-cars' || activeTab === 'wow-bikes' || activeTab === 'wow-tronics'));
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`neat-mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="neat-mobile-drawer-footer">
              <button
                className="btn btn-neat-primary w-full"
                onClick={() => {
                  setActiveTab('services');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Calendar size={16} />
                <span>Book a Doorstep Service</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for closing mobile drawer */}
      {mobileMenuOpen && (
        <div 
          className="neat-mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

