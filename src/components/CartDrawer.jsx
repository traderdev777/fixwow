import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { bangaloreAreas, companyInfo } from '../data/companyInfo';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity, 
  removeItem, 
  clearCart 
}) {
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [deliveryArea, setDeliveryArea] = useState(bangaloreAreas[0]);
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const deliveryFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setCheckoutDone(true);
    setTimeout(() => {
      // Keep state or reset
    }, 4000);
  };

  return (
    <div className="cart-drawer-backdrop">
      <div className="cart-drawer-card">
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title-wrap">
            <ShoppingBag size={20} className="text-orange" />
            <h3>Your Shopping Cart ({cartItems.length})</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {checkoutDone ? (
          <div className="cart-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={44} />
            </div>
            <h3>Order Placed Successfully!</h3>
            <p>
              Your parts / certified goods order has been scheduled for express delivery from our Chokkana Halli Hub.
            </p>
            <div className="receipt-order-id text-orange">
              Order #FW-ORD-{Math.floor(10000 + Math.random() * 90000)}
            </div>
            <p className="delivery-timing-note">
              🚚 Estimated Doorstep Delivery: <strong>Today within 2 - 3 Hours</strong> to {deliveryArea}.
            </p>
            <button 
              className="btn btn-primary btn-block mt-4"
              onClick={() => {
                clearCart();
                setCheckoutDone(false);
                onClose();
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-drawer-body">
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <ShoppingBag size={48} className="text-dim" />
                <h4>Your Cart is Empty</h4>
                <p>Browse our Certified Used Goods or Genuine Tools & Spare Parts to add items.</p>
                <button className="btn btn-outline btn-sm mt-3" onClick={onClose}>
                  Explore Store
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="cart-items-scroll">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-info">
                        <span className="cart-item-cat">{item.category}</span>
                        <h4 className="cart-item-title">{item.name}</h4>
                        <div className="cart-item-price">
                          ₹{item.price.toLocaleString()}
                        </div>
                      </div>

                      <div className="cart-item-controls">
                        <div className="quantity-counter">
                          <button 
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-val">{item.quantity || 1}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button 
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Delivery alert */}
                <div className="cart-delivery-perk">
                  <Truck size={16} className="text-green" />
                  <span>
                    {subtotal > 999 
                      ? "🎉 You unlocked FREE Same-Day Bangalore Delivery!" 
                      : `Add ₹${1000 - subtotal} more to get FREE Same-Day Delivery`}
                  </span>
                </div>

                {/* Checkout Mini Form */}
                <form onSubmit={handlePlaceOrder} className="cart-checkout-form">
                  <div className="form-field">
                    <label>Select Delivery Area in Bengaluru</label>
                    <select 
                      value={deliveryArea}
                      onChange={(e) => setDeliveryArea(e.target.value)}
                    >
                      {bangaloreAreas.map((area, idx) => (
                        <option key={idx} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group-row">
                    <div className="form-field">
                      <label>Mobile Number *</label>
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Doorstep Street / Flat *</label>
                      <input 
                        type="text" 
                        placeholder="House / Flat & Landmark"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Totals */}
                  <div className="cart-totals-summary">
                    <div className="total-row">
                      <span>Items Subtotal:</span>
                      <strong>₹{subtotal.toLocaleString()}</strong>
                    </div>
                    <div className="total-row">
                      <span>Bengaluru Express Delivery:</span>
                      <strong>{deliveryFee === 0 ? <span className="text-green">FREE</span> : `₹${deliveryFee}`}</strong>
                    </div>
                    <div className="total-row grand-total-row">
                      <span>Grand Total:</span>
                      <strong className="grand-price text-orange">₹{grandTotal.toLocaleString()}</strong>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
                    <span>Confirm Order (Cash / UPI on Delivery)</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
