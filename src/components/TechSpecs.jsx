import React from 'react';
import { Check, Minus, Sparkles } from 'lucide-react';

export default function TechSpecs() {
  const specs = [
    {
      feature: 'Chassis Material',
      timePro49: 'Aerospace Grade 5 Titanium',
      timePro45: 'Aerospace Grade 5 Titanium',
      generic: 'Standard Aluminum Alloy',
    },
    {
      feature: 'Front Crystal',
      timePro49: 'Dual-Camber Sapphire Glass',
      timePro45: 'Dual-Camber Sapphire Glass',
      generic: 'Mineral / Ion-X Glass',
    },
    {
      feature: 'Peak Luminance',
      timePro49: '3,000 Nits LTPO OLED',
      timePro45: '2,000 Nits LTPO OLED',
      generic: '1,000 Nits LCD/OLED',
    },
    {
      feature: 'Water Resistance',
      timePro49: '100m + 40m Recreational Dive (EN13319)',
      timePro45: '50m Swimproof (ISO 22810)',
      generic: 'Splash Resistant (IP67)',
    },
    {
      feature: 'Battery Endurance',
      timePro49: 'Up to 14 Days (72h GPS Expedition)',
      timePro45: 'Up to 10 Days (48h GPS Expedition)',
      generic: '18 - 24 Hours Daily',
    },
    {
      feature: 'Satellite SOS Comms',
      timePro49: 'Two-Way Iridium L-Band',
      timePro45: 'Emergency SOS via Cellular',
      generic: 'Requires Phone Tethering',
    },
    {
      feature: 'Emergency Siren',
      timePro49: '86-Decibel Dual-Speaker Sound',
      timePro45: 'Standard Haptic / Tone Alert',
      generic: 'Standard Notification Tone',
    },
  ];

  return (
    <section id="specs" className="py-24 bg-[#07090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <span>Competitive Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            THE BENCHMARK OF <span className="text-cyan-400">PERFORMANCE</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            See how the TimePro Max architecture outperforms conventional wearable smartwatches across essential metrics.
          </p>
        </div>

        {/* Specs Table */}
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-6 px-6 text-sm font-mono text-gray-400 uppercase tracking-wider w-1/4">
                  Core Metric
                </th>
                <th className="py-6 px-6 text-sm font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/20 border-x border-cyan-500/20 w-1/3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>TimePro Max 49mm</span>
                  </div>
                </th>
                <th className="py-6 px-6 text-sm font-mono text-gray-300 uppercase tracking-wider w-1/4">
                  TimePro Max 45mm
                </th>
                <th className="py-6 px-6 text-sm font-mono text-gray-500 uppercase tracking-wider w-1/4">
                  Standard Smartwatches
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {specs.map((item, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-semibold text-gray-200">
                    {item.feature}
                  </td>
                  <td className="py-5 px-6 font-bold text-white bg-cyan-950/10 border-x border-cyan-500/20">
                    <span className="text-cyan-300">{item.timePro49}</span>
                  </td>
                  <td className="py-5 px-6 text-gray-300 font-medium">
                    {item.timePro45}
                  </td>
                  <td className="py-5 px-6 text-gray-500">
                    {item.generic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
