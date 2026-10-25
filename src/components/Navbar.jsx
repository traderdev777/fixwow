import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  setIsCartOpen, 
  openBookingModal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="neat-header-wrapper" id="top">
      <div className="container neat-header-container">
        {/* Left Brand Logo Matching Screenshot 1 */}
        <div 
          className="neat-logo-wrap" 
          onClick={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img 
            src="/fixwow-logo.png" 
            alt="FixWow" 
            className="neat-logo-img"
          />
        </div>

        {/* Center Nav Items Matching Screenshot 1 */}
        <nav className={`neat-nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
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

        {/* Right Actions: Clean Single Book a Service Button Matching Screenshot 1 */}
        <div className="neat-header-right">
          {/* Subtle Shopping Cart button if items in cart */}
          {cartCount > 0 && (
            <button 
              className="neat-icon-btn neat-cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="Cart"
            >
              <ShoppingCart size={18} />
              <span className="neat-cart-count">{cartCount}</span>
            </button>
          )}

          {/* "Book a Service" Primary CTA Matching Screenshot 1 */}
          <button 
            className="btn btn-neat-primary neat-book-btn"
            onClick={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Book a Service</span>
          </button>

          {/* Mobile menu toggle */}
          <button 
            className="neat-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

