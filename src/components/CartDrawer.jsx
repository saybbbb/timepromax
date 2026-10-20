import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Tag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discountPercent) : 0;
  const shippingFee = 0; // Free Insured Express Delivery Nationwide
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toUpperCase();

    if (cleanCode === 'TIMEPRO10' || cleanCode === 'CDO10' || cleanCode === 'VIP10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 0.1, label: '10% Launch Privilege Discount' });
      setPromoCode('');
    } else if (cleanCode === 'FREESHIP' || cleanCode === 'SHIPFREE') {
      setAppliedPromo({ code: cleanCode, discountPercent: 0.05, label: '5% Express Shipping Credit' });
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "TIMEPRO10" for 10% off.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#0c0e14] border-l border-white/10 text-gray-200 flex flex-col shadow-2xl relative"
            >
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">Your Shopping Bag</h3>
                    <p className="text-xs text-gray-400 font-mono">
                      {cartItems.reduce((acc, i) => acc + i.quantity, 0)} item(s) selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Express Shipping Notification Banner */}
              <div className="bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-blue-950/40 px-6 py-3 border-b border-white/5 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <p className="text-xs text-gray-300 font-medium">
                  <span className="text-[#38bdf8] font-bold">FREE Express Delivery</span> unlocked across the Philippines!
                </p>
              </div>

              {/* Cart Items List */}
              <div data-lenis-prevent className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">Your bag is empty</h4>
                    <p className="text-xs text-gray-400 max-w-xs mb-6">
                      Explore our TimePro Max Signature collection and customize your timepiece.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#161a26] to-[#0d0f17] border border-white/10 flex items-center justify-center shrink-0 p-1.5 shadow-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white truncate">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">
                          {item.caseFinish || 'Signature Titanium'} • {item.strap || 'Sport Strap'}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <div className="text-sm font-extrabold text-[#38bdf8] font-mono">
                            ₱ {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-[#090b10] border-t border-white/10 space-y-4">
                  
                  {/* Voucher / Promo Box */}
                  <div>
                    {!appliedPromo ? (
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Promo code (e.g. TIMEPRO10)"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 uppercase font-mono focus:border-[#38bdf8] focus:outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                        <div className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="font-mono text-emerald-400 font-bold">{appliedPromo.code}</span>
                          <span className="text-gray-300">({appliedPromo.label})</span>
                        </div>
                        <button
                          onClick={handleRemovePromo}
                          className="text-gray-400 hover:text-white text-[11px] underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-400 mt-1 font-mono">{promoError}</p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-gray-400 font-mono">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">₱ {subtotal.toLocaleString()}</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>-₱ {discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Insured Express Shipping</span>
                      <span className="text-emerald-400 font-bold">FREE</span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span className="font-sans">Total</span>
                      <span className="text-[#38bdf8] text-base font-mono">
                        ₱ {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Proceed to Checkout Button */}
                  <button
                    onClick={() => {
                      onClose();
                      onProceedToCheckout(cartItems, appliedPromo);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-900/40 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Trust Micro-Badges */}
                  <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      1-Year Official Warranty
                    </span>
                    <span>•</span>
                    <span>7-Day Replacement</span>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
