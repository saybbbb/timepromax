import React from 'react';
import { Activity, Radio, Waves, Sun, ShieldAlert, Cpu, HeartPulse, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesBento() {
  return (
    <section id="sensors" className="py-28 bg-[#050608] relative">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-indigo-600/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <span>Precision Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            ARCHITECTED FOR <span className="text-cyan-400">EXTREMES</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            Every sensor in the TimePro Max array is calibrated for laboratory accuracy under extreme gravitational, thermal, and barometric conditions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: BioSensor Neural Array (Large 8 cols) */}
          <div className="md:col-span-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                  Medical Grade Class II
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] mb-3">
                  Hexa-Optical BioSensor 4.0
                </h3>
                <p className="text-gray-400 text-sm max-w-lg mb-6 leading-relaxed">
                  Dual-wavelength photoplethysmography tracks blood oxygen saturation (SpO2), heart rate variability, and sub-epidermal temperature trends in real-time.
                </p>

                {/* Simulated ECG Live Wave */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                    <span className="flex items-center gap-1.5 text-red-400 font-bold">
                      <HeartPulse className="w-3.5 h-3.5" />
                      Continuous Lead-I ECG
                    </span>
                    <span className="text-cyan-400">Sinus Rhythm • Normal</span>
                  </div>
                  
                  {/* Animated ECG Wave SVG */}
                  <div className="w-full h-14 relative flex items-center">
                    <svg className="w-full h-full stroke-cyan-400 fill-none" viewBox="0 0 500 60" preserveAspectRatio="none">
                      <path
                        d="M0,30 L60,30 L75,10 L85,50 L95,20 L105,35 L120,30 L180,30 L195,8 L205,52 L215,18 L225,35 L240,30 L300,30 L315,10 L325,50 L335,20 L345,35 L360,30 L420,30 L435,8 L445,52 L455,18 L465,35 L500,30"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 3,000 Nits Display (4 cols) */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-400">LTPO 1-60Hz</span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] mb-2">
              3,000 <span className="text-xl text-amber-400 font-normal">Nits</span>
            </div>
            <h4 className="text-lg font-bold text-gray-200 mb-2">Sapphire Crystal Retina</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Twice as bright as conventional smartwatches. Ultra-high legibility under blinding alpine snow or scorching desert glare.
            </p>
          </div>

          {/* Card 3: Dual-Frequency GNSS (4 cols) */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Radio className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-indigo-400">L1 + L5 GNSS</span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">Precision Satellite Lock</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Combines GPS, GLONASS, Galileo, QZSS, and BeiDou frequencies. Eliminates multipath error in dense city skyscrapers.
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <Compass className="w-5 h-5 text-indigo-400 animate-spin" />
              <div className="flex flex-col text-[11px] font-mono">
                <span className="text-gray-300">Position Accuracy</span>
                <span className="text-indigo-400 font-bold">&lt; 0.8 Meters CEP</span>
              </div>
            </div>
          </div>

          {/* Card 4: Oceanic Depth Gauge (4 cols) */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Waves className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-blue-400">EN13319 Diver Standard</span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk'] mb-2">
              100M <span className="text-lg text-blue-400 font-normal">Depth</span>
            </div>
            <h4 className="text-lg font-bold text-gray-200 mb-2">Oceanic Dive Computer</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Auto-activates upon submersion. Measures depth down to 40 meters, dive duration, water temperature, and decompression stops.
            </p>
          </div>

          {/* Card 5: Extreme SOS & Neural S7 Processor (4 cols) */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-red-400">86dB Siren</span>
            </div>

            <h4 className="text-xl font-bold text-white mb-2">Wilderness SOS Mesh</h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Emit a high-frequency siren pattern audible up to 180 meters. Satellite crash and hard-fall detection automatically transmit coordinates.
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <Cpu className="w-5 h-5 text-red-400" />
              <div className="flex flex-col text-[11px] font-mono">
                <span className="text-gray-300">Neural Engine</span>
                <span className="text-white font-bold">Quantum-M2 4nm Chip</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
