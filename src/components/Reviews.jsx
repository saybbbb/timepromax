import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

export default function Reviews() {
  const testimonials = [
    {
      name: 'Kaelen Vance',
      role: 'Alpine Expedition Lead // Everest South Col',
      quote: 'At -35°C on the Hillary Step, standard OLED screens freeze and shut down. The TimePro Max battery didn’t flinch once over 9 days of continuous GPS beaconing.',
      rating: 5,
      elevation: '8,848M Tested',
      tag: 'Extreme Cold',
    },
    {
      name: 'Dr. Maya Lin',
      role: 'Marine Biologist & Freediving Athlete',
      quote: 'The automatic depth gauge and ascent rate alarms are on par with dedicated $1,500 dive computers. The sapphire crystal has taken multiple reef scrapes with zero scratches.',
      rating: 5,
      elevation: '42M Submerged',
      tag: 'Oceanic Depth',
    },
    {
      name: 'Marcus Thorne',
      role: 'Tech & Horology Journalist, ChronoTech',
      quote: 'The Grade 5 titanium machining and bezel chamfering rival high-end Swiss mechanicals, yet beneath lies an uncompromising biosensing powerhouse.',
      rating: 5,
      elevation: 'Editor Choice 2026',
      tag: 'Design & Build',
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-[#050608] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Field Validated</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            PROVEN ON <span className="text-cyan-400">EXPEDITIONS</span>
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            Stress-tested across the most hostile environments on Earth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 relative flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                    {t.tag}
                  </span>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-gray-400">{t.role}</p>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2 py-1 rounded-md border border-cyan-500/20">
                  {t.elevation}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
