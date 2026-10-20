import React from 'react';

const teamMembers = [
  'ALFEREZ, NIVEA',
  'ARANCES, JOHN KURT',
  'DECANO, JOHN EMMAN',
  'HONGHONG, MYLA GRACE',
  'TADENA, CHRISTIAN DAVE',
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-[#111317] text-gray-200 border-t border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans">
            ABOUT US
          </h2>
          <div className="w-16 h-1 bg-[#38bdf8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Project introduction */}
        <div className="space-y-8 text-base sm:text-lg leading-relaxed text-gray-300">
          <p className="font-light">
            We created <span className="text-white font-semibold">TimePro Max</span> as a smartwatch store prototype. It brings browsing, watch customization, and checkout into one place so you can try the shopping experience.
          </p>

          <div className="pt-8 border-t border-white/10" aria-labelledby="team-heading">
            <h3 id="team-heading" className="text-2xl font-bold text-white mb-6 text-center font-serif">
              Meet Our Team
            </h3>
            <ul className="space-y-3 text-center">
              {teamMembers.map((name) => (
                <li
                  key={name}
                  className="text-base font-medium text-gray-200"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
