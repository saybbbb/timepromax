import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  Download,
  Lock,
  ChevronLeft,
  Smartphone,
  Banknote,
  Package,
  Calendar,
  Clock,
  Printer,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  items = [],
  appliedPromo = null,
  onOrderSuccess = () => {},
}) {
  const [step, setStep] = useState(1); // 1: Shipping & Contact, 2: Payment, 3: Success Confirmation

  // Customer Form Data
  const [formData, setFormData] = useState({
    fullName: 'Juan Dela Cruz',
    email: 'juan.delacruz@gmail.com',
    phone: '09756080664',
    streetAddress: 'Zone 4, Macanhan',
    barangay: 'Carmen',
    city: 'Cagayan de Oro City',
    province: 'Misamis Oriental',
    postalCode: '9000',
    deliveryMethod: 'cdo_sameday',
    paymentMethod: 'gcash',
    gcashNumber: '09756080664',
    cardNumber: '4532 •••• •••• 8841',
    cardExpiry: '08/29',
    cardCvv: '•••',
    cardName: 'JUAN DELA CRUZ',
    notes: 'Please call or ring doorbell upon arrival.',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  if (!isOpen) return null;

  // Normalized items to checkout
  const checkoutItems = items.length > 0 ? items : [
    {
      id: 'luxe-gold',
      name: 'TimePro Max Luxe Gold',
      price: 3499,
      formattedPrice: '₱ 3,499',
      image: '/assets/products/luxe-gold.png',
      caseFinish: 'Rose Gold PVD',
      strap: 'Fluted Sport Cream',
      quantity: 1,
    }
  ];

  const subtotal = checkoutItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discountPercent) : 0;
  const shippingFee = 0; // Free Insured Express
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderRef = `TPM-CDO-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingRef = `LBC-PH${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const completedSummary = {
        orderRef,
        trackingRef,
        date: new Date().toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...checkoutItems],
        totalAmount,
        discountAmount,
        paymentMethod: formData.paymentMethod,
        shippingAddress: `${formData.streetAddress}, ${formData.barangay}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
        recipient: formData.fullName,
        phone: formData.phone,
        courier: formData.deliveryMethod === 'cdo_sameday' ? 'CDO Local Courier (Same-Day Express)' : 'LBC Express Insured Courier',
        estimatedDelivery: formData.deliveryMethod === 'cdo_sameday' ? 'Today, before 6:00 PM' : '2 – 3 Business Days',
      };

      setOrderSummary(completedSummary);
      setIsProcessing(false);
      setStep(3);
      onOrderSuccess();

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#38bdf8', '#2563eb', '#10b981', '#ffffff', '#f59e0b'],
        });
      } catch (err) {}
    }, 1400);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-[#0c0e15] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-gray-200"
      >
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#10131d]/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center justify-center text-[#38bdf8]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-[#38bdf8] block">
                256-Bit SSL Encrypted
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Official TimePro Max Checkout
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator (Only for Steps 1 & 2) */}
        {step < 3 && (
          <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-center gap-4 text-xs font-mono">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-[#38bdf8] font-bold' : 'text-gray-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-[#38bdf8] text-black font-extrabold' : 'bg-white/10'}`}>
                1
              </span>
              <span>Delivery & Contact</span>
            </div>
            <span className="text-gray-600">———</span>
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-[#38bdf8] font-bold' : 'text-gray-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-[#38bdf8] text-black font-extrabold' : 'bg-white/10'}`}>
                2
              </span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          
          {/* STEP 1: SHIPPING & CONTACT */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              
              {/* Items Preview Strip */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={checkoutItems[0].image}
                      alt={checkoutItems[0].name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {checkoutItems[0].name} {checkoutItems.length > 1 && `+ ${checkoutItems.length - 1} more`}
                    </h4>
                    <span className="text-[11px] text-gray-400 font-mono">
                      Total: ₱ {totalAmount.toLocaleString()} (Free Express Shipping)
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold whitespace-nowrap bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  In Stock • Dispatch Today
                </span>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] mb-3">
                  1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Juan Dela Cruz"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Philippine Mobile (+63)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="09XXXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-gray-400 block mb-1">Email Address for Tracking Updates</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. juan@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] mb-3">
                  2. Shipping Address
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-gray-400 block mb-1">House / Unit / Building & Street</label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="e.g. Zone 4, Macanhan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Barangay</label>
                    <input
                      type="text"
                      name="barangay"
                      required
                      value={formData.barangay}
                      onChange={handleInputChange}
                      placeholder="e.g. Carmen"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">City / Municipality</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Cagayan de Oro City"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Province</label>
                    <input
                      type="text"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleInputChange}
                      placeholder="e.g. Misamis Oriental"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 9000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono placeholder-gray-500 focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Courier Delivery Method Selection */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] mb-3">
                  3. Delivery Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Same Day CDO Delivery */}
                  <label
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      formData.deliveryMethod === 'cdo_sameday'
                        ? 'bg-[#38bdf8]/10 border-[#38bdf8] shadow-md'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#38bdf8]" />
                        <span className="text-xs font-bold text-white">Same-Day CDO Express</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="cdo_sameday"
                        checked={formData.deliveryMethod === 'cdo_sameday'}
                        onChange={handleInputChange}
                        className="accent-[#38bdf8]"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Dispatched from Carmen showroom. Delivered before 6 PM today.
                    </p>
                    <span className="text-xs font-bold text-emerald-400 mt-2">FREE</span>
                  </label>

                  {/* Nationwide LBC Express Courier */}
                  <label
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      formData.deliveryMethod === 'lbc_express'
                        ? 'bg-[#38bdf8]/10 border-[#38bdf8] shadow-md'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#38bdf8]" />
                        <span className="text-xs font-bold text-white">Insured Courier (LBC / J&T)</span>
                      </div>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="lbc_express"
                        checked={formData.deliveryMethod === 'lbc_express'}
                        onChange={handleInputChange}
                        className="accent-[#38bdf8]"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Nationwide delivery with online tracking code. 2–3 Days.
                    </p>
                    <span className="text-xs font-bold text-emerald-400 mt-2">FREE</span>
                  </label>

                </div>
              </div>

              {/* Continue to Payment Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-900/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Continue to Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: PAYMENT METHOD & REVIEW */}
          {step === 2 && (
            <div className="space-y-6">
              
              {/* Back to Step 1 */}
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Edit Shipping Information</span>
              </button>

              {/* Destination Summary Pill */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] font-mono">DELIVERING TO</span>
                  <span className="text-white font-semibold">{formData.fullName} • {formData.city}</span>
                </div>
                <span className="text-[#38bdf8] font-mono text-[11px] font-bold">
                  {formData.deliveryMethod === 'cdo_sameday' ? 'Same-Day' : 'Insured LBC'}
                </span>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] mb-3">
                  Select Payment Method
                </h4>

                <div className="space-y-3">
                  
                  {/* Option 1: GCash / Maya */}
                  <div
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'gcash' }))}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      formData.paymentMethod === 'gcash'
                        ? 'bg-[#38bdf8]/10 border-[#38bdf8] shadow-md'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#005CE6]/20 border border-[#005CE6]/40 flex items-center justify-center text-[#005CE6]">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">GCash / Maya E-Wallet</span>
                            <span className="text-[10px] bg-blue-500/20 text-[#38bdf8] px-2 py-0.5 rounded font-mono font-bold">
                              Fastest
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Instant zero-fee transfer via official merchant gateway
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="gcash"
                        checked={formData.paymentMethod === 'gcash'}
                        onChange={handleInputChange}
                        className="accent-[#38bdf8]"
                      />
                    </div>

                    {formData.paymentMethod === 'gcash' && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                        <label className="text-[11px] text-gray-400">Your GCash / Maya Registered Number</label>
                        <input
                          type="text"
                          name="gcashNumber"
                          value={formData.gcashNumber}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-[#38bdf8]/40 text-white text-xs font-mono focus:outline-none"
                          placeholder="09XXXXXXXXX"
                        />
                        <span className="text-[10px] text-gray-400">
                          Secure payment prompt will trigger upon placing order.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Option 2: Credit / Debit Card */}
                  <div
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      formData.paymentMethod === 'card'
                        ? 'bg-[#38bdf8]/10 border-[#38bdf8] shadow-md'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">Credit / Debit Card</span>
                            <span className="text-[10px] text-gray-400 font-mono">Visa • Mastercard • JCB</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            256-Bit SSL encrypted secure payment
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="accent-[#38bdf8]"
                      />
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                        <div>
                          <label className="text-[11px] text-gray-400 block mb-1">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs font-mono focus:border-[#38bdf8] focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] text-gray-400 block mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs font-mono focus:border-[#38bdf8] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-gray-400 block mb-1">CVV</label>
                            <input
                              type="text"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs font-mono focus:border-[#38bdf8] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Option 3: Cash on Delivery (COD) */}
                  <div
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-[#38bdf8]/10 border-[#38bdf8] shadow-md'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white">Cash on Delivery (COD)</span>
                          <p className="text-xs text-gray-400">
                            Pay with cash directly to the courier when package reaches your door
                          </p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="accent-[#38bdf8]"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Order Total Breakdown Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-white">₱ {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Voucher Discount</span>
                    <span>-₱ {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-sans">Grand Total</span>
                  <span className="text-[#38bdf8] text-base font-mono">
                    ₱ {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit / Place Order Button */}
              <button
                onClick={handleCompleteOrder}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] text-white font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-900/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing & Generating Tracking Number...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order (₱ {totalAmount.toLocaleString()})</span>
                  </>
                )}
              </button>

            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED & RECEIPT */}
          {step === 3 && orderSummary && (
            <div className="text-center py-2 space-y-6">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                  Payment & Reservation Authorized
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-1.5 leading-relaxed">
                  Thank you, <span className="text-white font-bold">{orderSummary.recipient}</span>. Your official TimePro Max package is being inspected and prepared for express dispatch.
                </p>
              </div>

              {/* Printable Official Receipt Card */}
              <div className="text-left bg-gradient-to-b from-[#131622] to-[#0c0e15] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
                
                {/* Header with Tracking Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 block">ORDER REFERENCE</span>
                    <span className="text-base font-mono font-bold text-[#38bdf8]">{orderSummary.orderRef}</span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[10px] font-mono uppercase text-gray-400 block">COURIER TRACKING</span>
                    <span className="text-xs font-mono font-semibold text-emerald-400">{orderSummary.trackingRef}</span>
                  </div>
                </div>

                {/* Logistics & Delivery Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Estimated Delivery</span>
                    <span className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
                      {orderSummary.estimatedDelivery}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Courier Partner</span>
                    <span className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                      <Truck className="w-3.5 h-3.5 text-[#38bdf8]" />
                      {orderSummary.courier}
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">Shipping Address</span>
                    <span className="text-gray-300 font-medium block mt-0.5">{orderSummary.shippingAddress}</span>
                  </div>
                </div>

                {/* Itemized Watch Details */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Items in Parcel</span>
                  {orderSummary.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium">
                        {it.name} <span className="text-gray-400">× {it.quantity}</span>
                      </span>
                      <span className="text-white font-mono">
                        ₱ {(it.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-sm font-bold">
                  <span className="text-gray-300 font-sans">Total Paid</span>
                  <span className="text-[#38bdf8] font-mono text-base">
                    ₱ {orderSummary.totalAmount.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="w-full sm:w-1/2 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#38bdf8]" />
                  <span>Print Official Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-1/2 py-3 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40"
                >
                  <span>Continue Browsing</span>
                </button>
              </div>

              {/* Customer Hotline Assistance */}
              <div className="text-[11px] text-gray-500 font-mono">
                Questions about your delivery? Call our Carmen showroom at{' '}
                <a href="tel:09756080664" className="text-[#38bdf8] hover:underline font-bold">
                  09756080664
                </a>
              </div>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
}
