import React from 'react';
import { Watch, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenCheckout, setActiveTab }) {
  const handleNavClick = (id) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(id);
    }
    if (window.lenis) {
      window.lenis.scrollTo(`#${id}`, { offset: -70, duration: 1.4 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#38bdf8]/40 flex items-center justify-center bg-gradient-to-br from-[#151c2a] to-[#0b0e17] shadow-[0_0_12px_rgba(56,189,248,0.3)] p-1">
                <img src="/favicon.svg" alt="TimePro Max Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-baseline">
                <span className="font-extrabold tracking-tight text-xl text-white">
                  TimePro
                </span>
                <span className="font-extrabold tracking-tight text-xl text-[#38bdf8] ml-1">
                  Max
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              More than a watch. Your everyday companion. Bringing powerful features, effortless style, and everyday convenience together on your wrist.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 max-w-sm">
              <span className="text-xs font-mono text-[#38bdf8] block mb-1">
                OFFICIAL TIMEPRO GUARANTEE
              </span>
              <p className="text-xs text-gray-400 leading-tight">
                All timepieces include 1-year official hardware coverage and 7-day nationwide replacement guarantee.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3 text-sm">
            <span className="text-white uppercase tracking-wider font-semibold mb-1">
              Explore
            </span>
            <button
              onClick={() => handleNavClick('home')}
              className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Home & Hero Video
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Our Collection (5 Models)
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Contact & AI Concierge
            </button>
          </div>

          {/* Showroom Contact Details matching Canva */}
          <div className="md:col-span-4 flex flex-col gap-3 text-sm">
            <span className="text-white uppercase tracking-wider font-semibold mb-1">
              Showroom Location
            </span>
            <div className="flex items-start gap-2.5 text-gray-300">
              <MapPin className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
              <span>Carmen, Cagayan de Oro City, Northern Mindanao</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-300">
              <Phone className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>09756080664</span>
            </div>
            <div className="text-xs text-gray-500 font-mono mt-2">
              Monday–Friday, 9:00 AM–5:00 PM
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © 2026 TimePro Max Philippines. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCheckout}
              className="text-[#38bdf8] hover:underline font-semibold cursor-pointer"
            >
              View Shopping Bag
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
