import React from 'react';
import { Sparkles, HeartHandshake, Compass } from 'lucide-react';

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

        {/* About TimePro */}
        <div className="space-y-8 text-base sm:text-lg leading-relaxed text-gray-300">
          <p className="font-light">
            Welcome to <span className="text-white font-semibold">TimePro</span>, where modern technology meets everyday style. We believe a smartwatch should be more than just a timepiece. It should be a reliable companion that helps you stay connected, active, and organized throughout your day. That’s why we offer smartwatches designed with a balance of style, functionality, and convenience. From tracking your daily activity and staying connected to complementing your everyday look, TimePro is made to fit seamlessly into your lifestyle.
          </p>

          <div className="pt-8">
            <h3 className="text-2xl font-bold text-white mb-6 font-serif">
              Why Choose TimePro?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Modern design</h4>
                <p className="text-sm text-gray-400 leading-normal">
                  Stylish watches designed to look great wherever you go.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Smart Features</h4>
                <p className="text-sm text-gray-400 leading-normal">
                  Useful features to help you stay connected and keep track of your daily activities.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-[#38bdf8] flex items-center justify-center mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Everyday Comfort</h4>
                <p className="text-sm text-gray-400 leading-normal">
                  Lightweight and practical designs made for all-day wear.
                </p>
              </div>
            </div>
          </div>

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

          <div className="pt-8 text-center border-t border-white/10 space-y-3">
            <p className="text-base sm:text-lg text-gray-300 font-light max-w-xl mx-auto">
              At TimePro, our goal is simple: to make smart technology accessible, stylish, and useful for everyone.
            </p>
            <div className="text-lg sm:text-xl font-bold text-[#38bdf8]">
              TimePro — More than a watch. Your everyday companion.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
