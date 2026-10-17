import React, { useState, useEffect } from 'react';
import { Check, Shield, Wifi, BatteryCharging, Heart, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CASE_FINISHES = [
  {
    id: 'titanium',
    name: 'Natural Titanium',
    desc: 'Brushed aerospace Grade 5 titanium with micro-bead blasted chamfers.',
    caseColor: '#cbd5e1',
    bezelColor: '#94a3b8',
    accentColor: '#38bdf8',
    price: 0,
  },
  {
    id: 'obsidian',
    name: 'Obsidian DLC',
    desc: 'Diamond-Like Carbon stealth coating for supreme scratch resistance.',
    caseColor: '#1e293b',
    bezelColor: '#0f172a',
    accentColor: '#22d3ee',
    price: 50,
  },
  {
    id: 'gold',
    name: 'Cyber Gold PVD',
    desc: 'Dual-phase PVD deposition with warm aerospace champagne sheen.',
    caseColor: '#d97706',
    bezelColor: '#b45309',
    accentColor: '#fbbf24',
    price: 100,
  },
];

export const STRAP_STYLES = [
  {
    id: 'alpine-orange',
    name: 'Alpine Loop (Volt Orange)',
    type: 'High-altitude woven nylon',
    strapColor: '#f97316',
    accent: '#ea580c',
    price: 0,
  },
  {
    id: 'ocean-cyan',
    name: 'Ocean Band (Deep Cyan)',
    type: 'High-grade elastomer for diving',
    strapColor: '#06b6d4',
    accent: '#0891b2',
    price: 20,
  },
  {
    id: 'stealth-black',
    name: 'Milanese Mesh (Midnight Black)',
    type: 'Magnetic woven stainless steel',
    strapColor: '#18181b',
    accent: '#27272a',
    price: 60,
  },
  {
    id: 'white-frost',
    name: 'Glacial Trail (Arctic White)',
    type: 'Ultralight sweat-wicking textile',
    strapColor: '#e2e8f0',
    accent: '#cbd5e1',
    price: 15,
  },
];

export default function WatchCustomizer({ onSelectConfig }) {
  const [selectedCase, setSelectedCase] = useState(CASE_FINISHES[0]);
  const [selectedStrap, setSelectedStrap] = useState(STRAP_STYLES[0]);
  const [selectedSize, setSelectedSize] = useState('49mm');
  const [cellular, setCellular] = useState(true);

  // Dynamic Live Time for watch face
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const basePrice = 799;
  const sizeSurcharge = selectedSize === '49mm' ? 100 : 0;
  const cellularSurcharge = cellular ? 100 : 0;
  const totalPrice = basePrice + selectedCase.price + selectedStrap.price + sizeSurcharge + cellularSurcharge;

  const currentConfig = {
    model: `TimePro Max ${selectedSize}`,
    caseName: selectedCase.name,
    caseId: selectedCase.id,
    strapName: selectedStrap.name,
    strapColor: selectedStrap.strapColor,
    size: selectedSize,
    cellular: cellular ? 'GPS + Cellular Satellite' : 'GPS Only',
    totalPrice,
  };

  return (
    <section id="customizer" className="relative py-28 bg-[#07090e] border-t border-b border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: selectedStrap.strapColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <span>Studio Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            BUILD YOUR <span className="text-cyan-400">TIMEPRO MAX</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Select your aerospace casing, band architecture, and network options. Experience your bespoke timepiece in real-time.
          </p>
        </div>

        {/* 2-Column Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Watch Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 relative shadow-2xl">
            
            {/* Live Watch Rendering */}
            <div className="relative w-72 h-[420px] flex items-center justify-center select-none py-6">
              
              {/* Upper Strap */}
              <motion.div
                layout
                className="absolute top-0 w-32 h-28 rounded-t-2xl shadow-xl transition-all duration-500 border border-black/20"
                style={{
                  backgroundColor: selectedStrap.strapColor,
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.12) 5px, rgba(0,0,0,0.12) 10px)',
                }}
              />

              {/* Lower Strap */}
              <motion.div
                layout
                className="absolute bottom-0 w-32 h-28 rounded-b-2xl shadow-xl transition-all duration-500 border border-black/20"
                style={{
                  backgroundColor: selectedStrap.strapColor,
                  backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.12) 5px, rgba(0,0,0,0.12) 10px)',
                }}
              />

              {/* Watch Chassis (Titanium Casing) */}
              <motion.div
                layout
                className="relative z-10 w-56 h-64 rounded-[44px] p-2.5 transition-all duration-500 shadow-2xl flex items-center justify-center"
                style={{
                  backgroundColor: selectedCase.caseColor,
                  boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Digital Crown (Right Side) */}
                <div
                  className="absolute -right-3 top-16 w-3 h-14 rounded-r-md transition-all duration-300"
                  style={{
                    backgroundColor: selectedCase.bezelColor,
                    backgroundImage: 'repeating-linear-gradient(0deg, #111, #111 2px, #444 2px, #444 4px)',
                  }}
                />
                
                {/* Action Button (Left Side) */}
                <div
                  className="absolute -left-2.5 top-20 w-2.5 h-10 rounded-l-md bg-orange-600 border border-orange-400/50 shadow-md"
                  title="Programmable Action Button"
                />

                {/* Bezel Ring */}
                <div
                  className="w-full h-full rounded-[38px] p-2 flex items-center justify-center transition-all duration-500 border border-white/10"
                  style={{ backgroundColor: selectedCase.bezelColor }}
                >
                  {/* AMOLED Display Face */}
                  <div className="w-full h-full rounded-[32px] bg-black p-4 flex flex-col justify-between items-center relative overflow-hidden border border-cyan-500/20">
                    
                    {/* Dial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-indigo-950/20 pointer-events-none" />

                    {/* Top Status Bar */}
                    <div className="w-full flex items-center justify-between text-[11px] font-mono text-gray-400 z-10 px-1">
                      <div className="flex items-center gap-1 text-cyan-400 font-bold">
                        <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
                        <span>74</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-3 h-3 text-emerald-400" />
                        <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[10px]">98%</span>
                      </div>
                    </div>

                    {/* Center Time & Activity Ring */}
                    <div className="flex flex-col items-center justify-center z-10 my-auto">
                      <div className="text-4xl font-extrabold tracking-tighter text-white font-mono">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[11px] uppercase tracking-widest text-cyan-400 font-semibold font-mono mt-0.5">
                        {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>

                      {/* Fitness Rings Preview */}
                      <div className="mt-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                        <span className="text-pink-400 font-bold">620 kcal</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-emerald-400 font-bold">48 min</span>
                      </div>
                    </div>

                    {/* Bottom Telemetry Pill */}
                    <div className="w-full text-center z-10 pb-0.5">
                      <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">
                        ALT: 1,842M // BARO: 1013hPa
                      </span>
                    </div>

                  </div>
                </div>

              </motion.div>
            </div>

            {/* Spec Tag under stage */}
            <div className="mt-6 flex items-center gap-4 text-xs text-gray-400 font-mono bg-black/40 px-4 py-2 rounded-full border border-white/5">
              <span>{selectedCase.name}</span>
              <span>•</span>
              <span>{selectedStrap.name.split(' ')[0]} {selectedStrap.name.split(' ')[1]}</span>
              <span>•</span>
              <span className="text-cyan-400 font-bold">{selectedSize}</span>
            </div>

          </div>

          {/* Right Column: Selectors & Price Configuration */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            
            {/* 1. Case Material Selector */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-3 block">
                1. Case Material & Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CASE_FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setSelectedCase(fin)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col gap-1 cursor-pointer ${
                      selectedCase.id === fin.id
                        ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/50'
                        : 'border-white/10 hover:border-white/20 bg-black/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: fin.caseColor }}
                      />
                      {selectedCase.id === fin.id && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-sm font-semibold text-white mt-1">{fin.name}</span>
                    <span className="text-[11px] text-gray-400">
                      {fin.price === 0 ? 'Standard' : `+$${fin.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Band Architecture */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-3 block">
                2. Band Architecture & Tone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STRAP_STYLES.map((strap) => (
                  <button
                    key={strap.id}
                    onClick={() => setSelectedStrap(strap)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex items-center gap-3 cursor-pointer ${
                      selectedStrap.id === strap.id
                        ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/50'
                        : 'border-white/10 hover:border-white/20 bg-black/30'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-white/30 shrink-0"
                      style={{ backgroundColor: strap.strapColor }}
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs font-semibold text-white truncate">{strap.name}</span>
                      <span className="text-[10px] text-gray-400 truncate">{strap.type}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-300 shrink-0">
                      {strap.price === 0 ? 'Included' : `+$${strap.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Case Size & Connectivity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Size */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <label className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-2.5 block">
                  3. Case Diameter
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['45mm', '49mm'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-3 rounded-lg border text-center font-bold text-xs font-mono transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-white/10 text-gray-400 hover:text-white bg-black/30'
                      }`}
                    >
                      {size} {size === '49mm' ? '(+$100)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cellular Connectivity */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <label className="text-xs uppercase tracking-widest font-mono text-cyan-400 mb-2.5 block">
                  4. Satellite Cellular
                </label>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-white">L-Band Satellite</span>
                    <span className="text-[10px] text-gray-400">Off-grid worldwide text & SOS</span>
                  </div>
                  <button
                    onClick={() => setCellular(!cellular)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      cellular ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${
                        cellular ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Add to Order Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0d121c] to-blue-950/30 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  Official Retail Price
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] mt-0.5">
                  ${totalPrice}
                  <span className="text-xs text-cyan-400 font-mono ml-2 font-normal">USD</span>
                </div>
              </div>

              <button
                onClick={() => onSelectConfig(currentConfig)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed with this Spec</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
