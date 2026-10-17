import React, { useState, useEffect } from 'react';
import { Watch, ShoppingBag, Search, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenCheckout, cartCount = 0, activeTab, setActiveTab }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Products', href: '#products', id: 'products' },
    { name: 'Dial Studio', href: '#dial-studio', id: 'dial-studio' },
    { name: 'About us', href: '#about', id: 'about' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-black/40 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo matching Canva: Watch Icon + TimePro Max */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-[#38bdf8]/40 flex items-center justify-center bg-gradient-to-br from-[#151c2a] to-[#0b0e17] shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:border-[#38bdf8] group-hover:scale-105 transition-all p-1">
              <img src="/favicon.svg" alt="TimePro Max Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-baseline">
              <span className="font-extrabold tracking-tight text-xl text-white font-sans">
                TimePro
              </span>
              <span className="font-extrabold tracking-tight text-xl text-[#38bdf8] ml-1">
                Max
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm tracking-wide font-medium transition-all relative py-1 cursor-pointer ${
                  activeTab === link.id
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#38bdf8] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search & Shopping Bag */}
          <div className="flex items-center gap-4">
            {/* Search Toggle */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1 border border-white/20">
                  <Search className="w-4 h-4 text-gray-300 mr-2" />
                  <input
                    type="text"
                    placeholder="Search watches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="bg-transparent text-xs text-white outline-none w-32 sm:w-44"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-gray-400 hover:text-white text-xs ml-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Bag / Cart */}
            <button
              onClick={onOpenCheckout}
              className="relative p-2 text-gray-300 hover:text-sky-400 transition-colors cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#38bdf8] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 backdrop-blur-2xl px-6 py-6 transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-base font-medium py-2.5 border-b border-white/10 transition-colors ${
                  activeTab === link.id ? 'text-[#38bdf8] font-bold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCheckout();
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#2563eb] text-white font-bold text-center tracking-wider text-xs uppercase flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SHOP NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
