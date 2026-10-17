import React from 'react';
import { ShoppingBag, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddedToCartBar({
  lastAddedWatch,
  cartCount,
  onOpenCart,
  onOpenCheckout,
  onClose,
}) {
  if (!lastAddedWatch) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={lastAddedWatch.id + '-' + lastAddedWatch.timestamp}
        initial={{ y: 90, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 90, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="fixed bottom-5 inset-x-0 mx-auto z-40 max-w-lg px-4 pointer-events-auto"
      >
        <div className="p-2 sm:p-2.5 rounded-full bg-[#0c0e16]/95 backdrop-blur-2xl border border-[#38bdf8]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3">
          
          {/* Left: Thumbnail & Model Title & Added Status */}
          <div className="flex items-center gap-3 pl-2 min-w-0">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#1c2234] to-[#0c0f18] border border-[#38bdf8]/40 p-1 shrink-0 flex items-center justify-center shadow-inner">
              <img
                src={lastAddedWatch.image}
                alt={lastAddedWatch.name}
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white truncate max-w-[130px] sm:max-w-[180px]">
                  {lastAddedWatch.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30 whitespace-nowrap hidden sm:inline-block">
                  Added to Bag
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#38bdf8] font-mono">
                  {lastAddedWatch.formattedPrice || `₱ ${lastAddedWatch.price?.toLocaleString()}`}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  • Bag ({cartCount})
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-1">
            <button
              onClick={onOpenCart}
              className="px-3 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="hidden sm:inline">View Bag</span>
              <span className="sm:hidden">Bag</span>
            </button>

            <button
              onClick={() => onOpenCheckout([lastAddedWatch])}
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#38bdf8] hover:opacity-90 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/50 hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer ml-0.5"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
