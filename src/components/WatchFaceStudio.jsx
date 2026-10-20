import React, { useState, useEffect } from 'react';
import { Heart, Compass, Flame, Footprints, BatteryCharging, Wifi, ArrowRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WATCH_FACES = [
  {
    id: 'vital-pulse',
    name: 'Vital Pulse',
    category: 'Health & Fitness',
    desc: 'Real-time cardiovascular telemetry, active step ring, and calorie expenditure.',
    themeColor: '#38bdf8',
  },
  {
    id: 'neon-aurora',
    name: 'Neon Aurora',
    category: 'Executive Luxe',
    desc: 'Fluid bioluminescent ribbons with understated analog precision.',
    themeColor: '#f59e0b',
  },
  {
    id: 'prism-bloom',
    name: 'Prism Bloom',
    category: 'Chromatic Art',
    desc: 'Dynamic 12-petal geometric iris with vibrant gradient reflections.',
    themeColor: '#ec4899',
  },
  {
    id: 'expedition-baro',
    name: 'Expedition Compass',
    category: 'Outdoor & Trail',
    desc: 'High-precision cardinal azimuth, elevation telemetry, and storm barometer.',
    themeColor: '#10b981',
  },
];

export const STUDIO_CASES = [
  { id: 'gold', name: 'Luxe Gold', color: '#d97706', bezel: '#92400e', defaultStrap: '#d4b996', hardware: '#f59e0b' },
  { id: 'black', name: 'Shadow Black', color: '#1e293b', bezel: '#0f172a', defaultStrap: '#1e2025', hardware: '#334155' },
  { id: 'teal', name: 'Active Teal', color: '#0f766e', bezel: '#115e59', defaultStrap: '#164e63', hardware: '#0891b2' },
  { id: 'silver', name: 'Polished Silver', color: '#cbd5e1', bezel: '#94a3b8', defaultStrap: '#94a3b8', hardware: '#cbd5e1' },
];

export const STRAP_STYLES = [
  {
    id: 'fluted',
    name: 'Fluted Sport',
    desc: 'Center recessed spine with dual keeper loops and pin buckle',
  },
  {
    id: 'steel',
    name: 'Steel Link',
    desc: 'Triple-row segmented brushed stainless steel links',
  },
  {
    id: 'perforated',
    name: 'Air-Flow Mesh',
    desc: 'Dual-column circular breathability vents for athletes',
  },
  {
    id: 'alpine',
    name: 'Alpine Woven',
    desc: 'High-altitude ribbed loop textile with reinforced edges',
  },
];

export default function WatchFaceStudio({ onOrderWatch }) {
  const [activeFace, setActiveFace] = useState(WATCH_FACES[0]);
  const [selectedCase, setSelectedCase] = useState(STUDIO_CASES[0]);
  const [strapStyle, setStrapStyle] = useState(STRAP_STYLES[0]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const seconds = time.getSeconds();

  const isSteel = strapStyle.id === 'steel' || selectedCase.id === 'silver';
  const strapColor = isSteel ? '#94a3b8' : selectedCase.defaultStrap;

  return (
    <section id="dial-studio" className="py-24 bg-[#090b10] border-t border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeFace.themeColor }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans">
            CUSTOMIZE YOUR <span className="text-[#38bdf8]">TIMEPRO MAX</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Choose a watch face, strap, and case color to preview your watch.
          </p>
        </div>

        {/* 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Watch Chassis with Dynamic Dial & Realistic Textured Straps */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-black/60 border border-white/10 shadow-2xl relative">
            
            {/* Watch Chassis Container */}
            <div className="relative w-64 h-[440px] flex items-center justify-center select-none py-6">
              
              {/* ==================== UPPER STRAP ==================== */}
              <div className="absolute top-2 w-32 h-28 flex flex-col items-center pointer-events-none">
                
                {/* Brushed Metal Tang Buckle at top */}
                <div
                  className="w-20 h-3 rounded-t-md shadow-md border-t border-x border-white/30"
                  style={{
                    backgroundColor: selectedCase.hardware,
                    backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.4) 50%, rgba(0,0,0,0.3) 100%)',
                  }}
                />

                {/* Main Upper Strap Body */}
                <div
                  className="w-30 h-24 rounded-t-xl relative overflow-hidden transition-all duration-500 shadow-xl border-x border-black/30"
                  style={{
                    backgroundColor: strapColor,
                    boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.2), inset 0 -4px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Texture: STEEL LINK */}
                  {isSteel && (
                    <div className="w-full h-full flex flex-col justify-between py-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-full h-3.5 border-b border-black/50 flex justify-between px-1">
                          <div className="w-6 h-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-sm" />
                          <div className="w-12 h-full bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 rounded-sm shadow-sm" />
                          <div className="w-6 h-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-sm" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Texture: FLUTED SPORT */}
                  {strapStyle.id === 'fluted' && !isSteel && (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* Edge Stitch / Groove lines */}
                      <div className="absolute inset-y-0 left-2 w-0.5 bg-black/25" />
                      <div className="absolute inset-y-0 right-2 w-0.5 bg-black/25" />
                      {/* Center Recessed Spine */}
                      <div className="w-10 h-full bg-black/25 shadow-inner border-x border-white/10" />
                    </div>
                  )}

                  {/* Texture: PERFORATED AIR-FLOW */}
                  {strapStyle.id === 'perforated' && !isSteel && (
                    <div className="w-full h-full flex flex-col justify-around items-center py-2">
                      {[1, 2, 3].map((r) => (
                        <div key={r} className="flex gap-4">
                          <div className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border-b border-white/20" />
                          <div className="w-3.5 h-3.5 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border-b border-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border-b border-white/20" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Texture: ALPINE WOVEN */}
                  {strapStyle.id === 'alpine' && !isSteel && (
                    <div
                      className="w-full h-full opacity-60"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 8px)',
                      }}
                    />
                  )}

                  {/* Strap Keeper Loops (Retainer bands) */}
                  {!isSteel && (
                    <div className="absolute top-4 inset-x-2 flex flex-col gap-1.5 z-10">
                      <div className="w-full h-3 rounded bg-black/40 border border-white/20 shadow-md" />
                      <div className="w-full h-3 rounded bg-black/40 border border-white/20 shadow-md" />
                    </div>
                  )}
                </div>

                {/* Lug Quick-Release Connector Bar */}
                <div
                  className="w-28 h-2 -mt-1 rounded-sm shadow-md z-10 border-t border-white/40"
                  style={{
                    backgroundColor: selectedCase.bezel,
                    backgroundImage: 'linear-gradient(90deg, #111, #444, #111)',
                  }}
                />
              </div>

              {/* ==================== LOWER STRAP ==================== */}
              <div className="absolute bottom-2 w-32 h-32 flex flex-col items-center pointer-events-none">
                
                {/* Lug Connector Bar at bottom */}
                <div
                  className="w-28 h-2 -mb-1 rounded-sm shadow-md z-10 border-b border-white/40"
                  style={{
                    backgroundColor: selectedCase.bezel,
                    backgroundImage: 'linear-gradient(90deg, #111, #444, #111)',
                  }}
                />

                {/* Main Lower Strap Body */}
                <div
                  className="w-30 h-28 rounded-b-3xl relative overflow-hidden transition-all duration-500 shadow-2xl border-x border-black/30"
                  style={{
                    backgroundColor: strapColor,
                    boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.2), inset 0 -4px 6px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Texture: STEEL LINK */}
                  {isSteel && (
                    <div className="w-full h-full flex flex-col justify-between py-1">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="w-full h-3.5 border-t border-black/50 flex justify-between px-1">
                          <div className="w-6 h-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-sm" />
                          <div className="w-12 h-full bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 rounded-sm shadow-sm" />
                          <div className="w-6 h-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 rounded-sm" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Texture: FLUTED SPORT */}
                  {strapStyle.id === 'fluted' && !isSteel && (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* Edge Stitch / Groove lines */}
                      <div className="absolute inset-y-0 left-2 w-0.5 bg-black/25" />
                      <div className="absolute inset-y-0 right-2 w-0.5 bg-black/25" />
                      
                      {/* Center Recessed Fluted Channel */}
                      <div className="w-10 h-full bg-black/25 shadow-inner border-x border-white/10 flex flex-col items-center justify-around py-3">
                        {/* 5 Precision Oval Adjustment Holes with 3D Depth */}
                        {[1, 2, 3, 4, 5].map((h) => (
                          <div
                            key={h}
                            className="w-4 h-2 rounded-full bg-black shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.9)] border-b border-white/20"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Texture: PERFORATED AIR-FLOW */}
                  {strapStyle.id === 'perforated' && !isSteel && (
                    <div className="w-full h-full flex flex-col justify-around items-center py-2">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <div key={r} className="flex gap-4 items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border-b border-white/20" />
                          <div className="w-4 h-2 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border-b border-white/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border-b border-white/20" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Texture: ALPINE WOVEN */}
                  {strapStyle.id === 'alpine' && !isSteel && (
                    <div
                      className="w-full h-full opacity-60 flex flex-col justify-center items-center"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.3) 5px, rgba(0,0,0,0.3) 10px)',
                      }}
                    >
                      <div className="w-6 h-6 rounded-full border border-black/40 flex items-center justify-center text-[8px] font-mono font-bold text-black/60">
                        TPM
                      </div>
                    </div>
                  )}

                  {/* Embossed Brand Mark at strap tip */}
                  <div className="absolute bottom-1 inset-x-0 text-center">
                    <span className="text-[8px] font-mono tracking-widest text-black/40 uppercase font-bold">
                      TIMEPRO MAX
                    </span>
                  </div>
                </div>

              </div>

              {/* ==================== WATCH CASE & AMOLED SCREEN ==================== */}
              <div
                className="relative z-20 w-52 h-60 rounded-[40px] p-2 transition-all duration-500 shadow-2xl flex items-center justify-center border border-white/20"
                style={{
                  backgroundColor: selectedCase.color,
                  boxShadow: `0 25px 50px -12px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Digital Crown with Gripping Knurl Pattern */}
                <div
                  className="absolute -right-2.5 top-14 w-2.5 h-12 rounded-r-md transition-colors duration-300 border-y border-r border-black/40"
                  style={{
                    backgroundColor: selectedCase.bezel,
                    backgroundImage: 'repeating-linear-gradient(0deg, #111, #111 2px, #444 2px, #444 4px)',
                  }}
                />

                {/* Inner Screen Bezel */}
                <div
                  className="w-full h-full rounded-[34px] p-1.5 flex items-center justify-center transition-colors duration-500"
                  style={{ backgroundColor: selectedCase.bezel }}
                >
                  {/* AMOLED Screen */}
                  <div className="w-full h-full rounded-[28px] bg-black p-3.5 flex flex-col justify-between relative overflow-hidden border border-white/10">
                    
                    {/* Top Status Bar */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-gray-400 z-20">
                      <div className="flex items-center gap-1 text-red-400">
                        <Heart className="w-2.5 h-2.5 fill-red-500 animate-pulse" />
                        <span className="text-[9px]">104 BPM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wifi className="w-2.5 h-2.5 text-gray-400" />
                        <BatteryCharging className="w-2.5 h-2.5 text-[#38bdf8]" />
                        <span className="text-[9px]">98%</span>
                      </div>
                    </div>

                    {/* Animated Dial Screens */}
                    <AnimatePresence mode="wait">
                      {/* FACE 1: Vital Pulse */}
                      {activeFace.id === 'vital-pulse' && (
                        <motion.div
                          key="vital-pulse"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center justify-center my-auto z-10 w-full"
                        >
                          <div className="text-3xl font-extrabold tracking-tight text-white font-mono">
                            {hours}
                          </div>
                          <div className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider mb-2">
                            WED 24 • ACTIVE
                          </div>

                          <div className="grid grid-cols-2 gap-1.5 w-full mt-1">
                            <div className="p-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 justify-center">
                              <Footprints className="w-3 h-3 text-emerald-400" />
                              <span className="text-[9px] font-mono text-white">10,349</span>
                            </div>
                            <div className="p-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1 justify-center">
                              <Flame className="w-3 h-3 text-amber-400" />
                              <span className="text-[9px] font-mono text-white">560 kcal</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* FACE 2: Neon Aurora */}
                      {activeFace.id === 'neon-aurora' && (
                        <motion.div
                          key="neon-aurora"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center justify-center my-auto z-10 w-full relative"
                        >
                          <div className="w-full h-16 relative flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 200 60">
                              <path
                                d="M10,30 Q50,5 100,30 T190,30"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="3"
                                strokeLinecap="round"
                                className="opacity-80"
                              />
                              <path
                                d="M10,30 Q50,55 100,30 T190,30"
                                fill="none"
                                stroke="#fbbf24"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="opacity-90"
                              />
                            </svg>
                          </div>
                          <div className="text-2xl font-bold tracking-tight text-white font-mono mt-1">
                            {hours}
                          </div>
                          <div className="text-[9px] text-amber-400 tracking-widest uppercase font-mono">
                            AURORA LUXE
                          </div>
                        </motion.div>
                      )}

                      {/* FACE 3: Prism Bloom */}
                      {activeFace.id === 'prism-bloom' && (
                        <motion.div
                          key="prism-bloom"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center justify-center my-auto z-10 w-full"
                        >
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center relative mb-1"
                            style={{ transform: `rotate(${seconds * 6}deg)`, transition: 'transform 1s linear' }}
                          >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 opacity-80 blur-[2px]" />
                            <div className="relative z-10 w-11 h-11 rounded-full bg-black flex items-center justify-center text-[10px] font-bold text-white font-mono">
                              {hours}
                            </div>
                          </div>
                          <div className="text-[10px] font-bold text-white font-mono mt-0.5">
                            09:30 AM
                          </div>
                          <div className="text-[8px] text-pink-400 uppercase tracking-widest font-mono">
                            04-06 WED
                          </div>
                        </motion.div>
                      )}

                      {/* FACE 4: Expedition Compass */}
                      {activeFace.id === 'expedition-baro' && (
                        <motion.div
                          key="expedition-baro"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col items-center justify-center my-auto z-10 w-full"
                        >
                          <div className="relative w-14 h-14 rounded-full border border-emerald-500/40 flex items-center justify-center mb-1">
                            <Compass className="w-8 h-8 text-emerald-400 animate-[spin_30s_linear_infinite]" />
                            <span className="absolute top-0.5 text-[7px] text-emerald-400 font-bold">N</span>
                          </div>
                          <div className="text-xl font-black text-white font-mono">
                            {hours}
                          </div>
                          <div className="text-[8px] text-emerald-400 tracking-wider font-mono">
                            ALT: 1,842M // 1013hPa
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Indicator */}
                    <div className="w-full text-center z-10">
                      <span className="text-[8px] uppercase tracking-widest text-gray-500 font-mono">
                        TIMEPRO MAX OLED
                      </span>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* Active Specs Tag */}
            <div className="mt-4 text-xs font-mono text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeFace.themeColor }} />
              <span className="text-white font-bold">{activeFace.name}</span>
              <span>•</span>
              <span>{selectedCase.name}</span>
              <span>•</span>
              <span className="text-[#38bdf8]">{strapStyle.name}</span>
            </div>

          </div>

          {/* Right Column: Interactive Switcher Controls */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* 1. Watch Face Selector */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs uppercase tracking-widest font-mono text-[#38bdf8] mb-2.5 block">
                1. Watch face
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WATCH_FACES.map((face) => (
                  <button
                    key={face.id}
                    onClick={() => setActiveFace(face)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col gap-0.5 cursor-pointer ${
                      activeFace.id === face.id
                        ? 'border-[#38bdf8] bg-blue-950/30 shadow-lg shadow-blue-950/40'
                        : 'border-white/10 hover:border-white/20 bg-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{face.name}</span>
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: face.themeColor }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 line-clamp-1">{face.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Strap Texture & Style Selector (NEW!) */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs uppercase tracking-widest font-mono text-[#38bdf8] mb-2.5 block flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>2. Strap</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STRAP_STYLES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStrapStyle(st)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      strapStyle.id === st.id
                        ? 'border-[#38bdf8] bg-blue-950/40 text-white shadow-md'
                        : 'border-white/10 hover:border-white/20 bg-black/40 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{st.name}</span>
                    <span className="text-[9px] text-gray-400 leading-tight line-clamp-1">{st.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Chassis Finish Toggle */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs uppercase tracking-widest font-mono text-[#38bdf8] mb-2.5 block">
                3. Case color
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STUDIO_CASES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      selectedCase.id === c.id
                        ? 'border-[#38bdf8] bg-blue-950/30 text-white'
                        : 'border-white/10 hover:border-white/20 bg-black/40 text-gray-400'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-[11px] font-medium">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-black to-blue-950/30 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-400 block">Your watch</span>
                <span className="text-xl sm:text-2xl font-black text-white">
                  ₱ 2,999 – ₱ 3,499
                </span>
              </div>
              <button
                onClick={() => onOrderWatch({
                  name: `TimeProMax ${selectedCase.name} (${strapStyle.name})`,
                  formattedPrice: selectedCase.id === 'gold' ? '₱ 3,499' : '₱ 2,999',
                  price: selectedCase.id === 'gold' ? 3499 : 2999,
                  image: selectedCase.id === 'gold' ? '/assets/products/luxe-gold.png' : '/assets/products/shadow-pro.png',
                  caseFinish: selectedCase.name,
                  strap: `${strapStyle.name} Strap`,
                })}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-900/40 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
