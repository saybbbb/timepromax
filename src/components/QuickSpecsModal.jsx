import React from 'react';
import { X, Cpu, Battery, Waves, Activity, Radio, Smartphone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickSpecsModal({ isOpen, onClose, watch, onOrder }) {
  if (!isOpen || !watch) return null;

  const specCategories = [
    {
      icon: <Cpu className="w-5 h-5 text-[#38bdf8]" />,
      title: 'Display & Architecture',
      items: [
        { label: 'Screen Type', value: '1.95" Curved Ultra-HD AMOLED' },
        { label: 'Resolution', value: '410 × 502 pixels (326 PPI)' },
        { label: 'Brightness', value: 'Up to 1,000 Nits Peak' },
        { label: 'Cover Glass', value: '2.5D Scratch-Resistant Curved Crystal' },
      ],
    },
    {
      icon: <Battery className="w-5 h-5 text-amber-400" />,
      title: 'Endurance & Charging',
      items: [
        { label: 'Battery Capacity', value: '380mAh High-Density Lithium-Cobalt' },
        { label: 'Typical Battery Life', value: '7 to 10 Days Continuous' },
        { label: 'Standby Time', value: 'Up to 30 Days' },
        { label: 'Charging Method', value: 'Magnetic Snap Fast Charger (0–100% in 55 mins)' },
      ],
    },
    {
      icon: <Activity className="w-5 h-5 text-rose-400" />,
      title: 'Biometrics & Sensors',
      items: [
        { label: 'Cardio Sensor', value: 'Hexa-Optical Continuous BioTracker 4.0' },
        { label: 'Oxygen Telemetry', value: 'Real-Time SpO2 Infrared Saturation' },
        { label: 'Activity Tracking', value: '100+ Sports Modes, Automatic Workout Detection' },
        { label: 'Sleep & Stress', value: 'REM/Deep Sleep Tracking & Breath Coach' },
      ],
    },
    {
      icon: <Waves className="w-5 h-5 text-blue-400" />,
      title: 'Durability & Materials',
      items: [
        { label: 'Water Rating', value: 'IP68 Certified (50M / 5 ATM Swimproof)' },
        { label: 'Chassis Finish', value: watch.caseFinish || 'Aerospace-Grade Alloy' },
        { label: 'Strap Material', value: watch.strap || 'Ergonomic Fluoroelastomer' },
        { label: 'Weight', value: '42 grams (Chassis only)' },
      ],
    },
    {
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      title: 'Connectivity & Audio',
      items: [
        { label: 'Wireless Protocol', value: 'Bluetooth 5.3 Low Energy (BLE)' },
        { label: 'Calling Capabilities', value: 'HD Voice Calls via Bluetooth with Dual Mics' },
        { label: 'Speaker System', value: 'Acoustic Micro-Cavity Speaker with AAC Decoder' },
        { label: 'Notifications', value: 'SMS, Calls, Messenger, GCash, WhatsApp' },
      ],
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
      title: 'System Compatibility',
      items: [
        { label: 'iOS Support', value: 'Apple iOS 12.0 or later' },
        { label: 'Android Support', value: 'Android 8.0 or later' },
        { label: 'Companion App', value: 'TimePro Connect (Free on App Store & Google Play)' },
        { label: 'Language', value: 'English, Filipino, and 14 International Languages' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-[#0c0e14] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Glow Accent */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[110px] opacity-25 pointer-events-none"
          style={{ backgroundColor: watch.accentColor || '#38bdf8' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 pr-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-black/60 border border-white/10 p-2 shrink-0 flex items-center justify-center">
              <img
                src={watch.image}
                alt={watch.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
                Technical Specification Sheet
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {watch.name}
              </h3>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-2xl font-black text-[#38bdf8] font-mono">
              {watch.formattedPrice}
            </div>
            <span className="text-xs text-gray-400">Official Retail Price</span>
          </div>
        </div>

        {/* Scrollable Specs Body */}
        <div className="overflow-y-auto py-6 space-y-6 pr-2 scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                  {cat.icon}
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {cat.title}
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  {cat.items.map((it, i) => (
                    <div key={i} className="flex justify-between gap-2">
                      <span className="text-gray-400 font-mono">{it.label}:</span>
                      <span className="text-gray-200 font-medium text-right">{it.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Warranty / Certification Pill */}
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-center gap-3 text-xs text-blue-300">
            <ShieldCheck className="w-5 h-5 text-[#38bdf8] shrink-0" />
            <span>
              Certified for quality standards. Each TimePro Max watch undergoes 24-hour pressure testing and drop-impact simulation before packaging.
            </span>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-400 font-mono">
            Model: <span className="text-white font-semibold">{watch.name}</span> • 1-Year Warranty Included
          </div>
          <button
            onClick={() => {
              onClose();
              onOrder(watch);
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-900/40 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 fill-white" />
            <span>Order This Model ({watch.formattedPrice})</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
