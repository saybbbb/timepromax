import React, { useState, useRef } from 'react';
import { Phone, Clock, MapPin, Star, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ROW_1_REVIEWS = [
  {
    id: 'r1-1',
    initial: 'P',
    name: 'Paolo D.',
    role: 'Remote Engineer • CDO',
    quote: 'Bluetooth calls are crystal clear while driving along CDO coastal road. Notifications from GCash and Slack never lag. Super easy iOS sync.',
    model: 'Luxe Gold',
  },
  {
    id: 'r1-2',
    initial: 'B',
    name: 'Bea S.',
    role: 'Weekend Hiker • Bukidnon',
    quote: 'Accidentally wore it cliff diving in Camiguin—IP68 water resistance handled the depth with zero issues. Ejected water speaker feature is gold!',
    model: 'Active X',
  },
  {
    id: 'r1-3',
    initial: 'C',
    name: 'Carlo M.',
    role: 'Product Designer • Manila',
    quote: 'The tactile crown dial feedback and fluid 60Hz display feel remarkably premium. Everyone at the studio asked where I bought it.',
    model: 'Silver Edition',
  },
  {
    id: 'r1-4',
    initial: 'S',
    name: 'Samantha C.',
    role: 'Creative Director • CDO',
    quote: 'The rose-gold finish with cream strap looks super high-end! The AMOLED screen is bright and easy to read even under direct midday tropical sun.',
    model: 'Luxe Gold',
  },
  {
    id: 'r1-5',
    initial: 'M',
    name: 'Mark Dave R.',
    role: 'Marathon Runner • CDO',
    quote: 'The 9-day battery is no joke. Did 3 trail runs in Dahilayan and a swim in Macabalan without a single recharge. The GPS locks instantly.',
    model: 'Active X',
  },
];

const ROW_2_REVIEWS = [
  {
    id: 'r2-1',
    initial: 'Y',
    name: 'Ysabel G.',
    role: 'Yoga Instructor • Davao',
    quote: 'The breathable mesh band is so comfortable during hot Vinyasa sessions. Does not irritate my skin at all and tracks heart zones precisely.',
    model: 'Elite White',
  },
  {
    id: 'r2-2',
    initial: 'N',
    name: 'Nico V.',
    role: 'Carmen Resident • CDO',
    quote: 'Walked straight into the Carmen showroom, tested the strap studio, and walked out with the Luxe Gold. Outstanding customer support.',
    model: 'Luxe Gold',
  },
  {
    id: 'r2-3',
    initial: 'A',
    name: 'Dr. Andrea L.',
    role: 'Resident Doctor • Iligan',
    quote: 'Accurately tracks continuous heart rate, SpO2 blood oxygen, and step count during busy 24-hour hospital shifts. Fast charge is a lifesaver.',
    model: 'Elite White',
  },
  {
    id: 'r2-4',
    initial: 'J',
    name: 'Jo-Ann T.',
    role: 'Triathlete • Cebu',
    quote: 'Switched from a ₱25k smartwatch and honestly prefer this. Sleep stage tracking is spot on and the lightweight casing never snags my jersey.',
    model: 'Active X',
  },
  {
    id: 'r2-5',
    initial: 'J',
    name: 'Joshua T.',
    role: 'Architect • Davao',
    quote: 'The matte black DLC coating looks sleek and minimalist. GCash, call, and SMS notifications pop up without missing a beat. Very smooth app setup.',
    model: 'Shadow Pro',
  },
];

const VERIFIED_REVIEWS = [...ROW_1_REVIEWS, ...ROW_2_REVIEWS];

function ReviewCard({ review }) {
  return (
    <div className="w-[320px] sm:w-[380px] shrink-0 bg-gradient-to-b from-[#141724]/90 to-[#0d0f17]/95 text-gray-200 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/60 border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 flex flex-col justify-between group hover:scale-[1.02]">
      <div>
        {/* Top Row: 5 Amber Stars + Cyan Quote Glyph */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-3xl font-serif font-black text-[#38bdf8]/25 group-hover:text-[#38bdf8]/60 transition-colors leading-none select-none">
            &rdquo;
          </span>
        </div>

        {/* Review Quote Body */}
        <p className="text-gray-300 group-hover:text-white transition-colors text-[14px] sm:text-[15px] font-light leading-relaxed line-clamp-3">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Bottom Row: User Avatar & Model Pill Tag */}
      <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
        {/* Left: Avatar + Name + Role */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e2538] to-[#101422] border border-[#38bdf8]/30 flex items-center justify-center font-bold text-sm text-[#38bdf8] shrink-0 shadow-inner select-none">
            {review.initial}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-white text-sm leading-tight truncate flex items-center gap-1.5">
              <span>{review.name}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </h4>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {review.role}
            </p>
          </div>
        </div>

        {/* Right: Rounded Model Pill Tag */}
        <div className="bg-[#38bdf8]/10 text-[#38bdf8] px-3 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 border border-[#38bdf8]/30 shadow-xs shrink-0 select-none">
          <svg
            className="w-3.5 h-3.5 shrink-0 text-[#38bdf8]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="7" width="12" height="10" rx="3" />
            <path d="M9 7V3h6v4" />
            <path d="M9 17v4h6v-4" />
          </svg>
          <span className="truncate max-w-[110px]">{review.model}</span>
        </div>
      </div>
    </div>
  );
}

export default function ContactUs() {
  return (
    <section id="contact" className="pt-24 pb-28 bg-[#0a0c10] text-gray-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-wide uppercase font-serif">
            CONTACT US
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mt-2 font-light">
            We'd Like To Hear From You
          </p>
        </div>

        {/* 1. Showroom & Contact Information Card matching Canva 3.png */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#181a20] to-[#121318] border border-white/10 mb-24 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Left: Circular Model Photo */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src="/assets/lifestyle/contact-avatar.png"
                  alt="TimePro Max Client Support"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>

            {/* Right: Contact Details */}
            <div className="md:col-span-7 flex flex-col gap-5 text-left md:pl-6">
              <div>
                <div className="flex items-center gap-2 text-[#38bdf8] mb-1">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span className="text-xs uppercase tracking-widest font-mono">Location</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Carmen, Cagayan de Oro City
                </h3>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-sm sm:text-base font-light">
                  Hours: Monday–Friday, 9:00 AM–5:00 PM
                </span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  Call now
                </span>
                <a
                  href="tel:09756080664"
                  className="text-2xl sm:text-3xl font-extrabold text-[#38bdf8] hover:underline flex items-center gap-2 font-mono"
                >
                  <Phone className="w-6 h-6" />
                  <span>09756080664</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-gray-400 block mb-3">
                  Follow us too!
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-black border border-white/30 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                    aria-label="X Twitter"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 2. VERIFIED BUYER REVIEWS (Dual-row left & right marquee matching TimePro Max dark tech theme) */}
      <div className="w-full pt-12 pb-16 relative overflow-hidden border-t border-white/10">
        
        {/* Subtle Cyan Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            
            {/* Left: "Owners say it best" */}
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-mono tracking-wider uppercase mb-3 w-fit">
                <Award className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Verified Buyer Experiences</span>
              </div>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-sans">
                OWNERS SAY <span className="text-[#38bdf8]">IT BEST.</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mt-2 font-light">
                Real feedback from active athletes, professionals, and daily users across the Philippines.
              </p>
            </div>

            {/* Right: "4.9" Score Card */}
            <div className="flex items-center gap-4 sm:gap-5 bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-2xl">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none font-sans">
                4.9
              </span>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 sm:w-4.5 h-4 sm:h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-mono text-gray-400 tracking-wider mt-1 whitespace-nowrap">
                  from 1,200+ verified owners
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Dual-Row Marquee Tracks (Row 1 Left, Row 2 Right) */}
        <div className="relative reviews-marquee-track overflow-hidden py-3 space-y-5 sm:space-y-6">
          
          {/* Left & Right Edge Vignette Fades blending seamlessly into dark page */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-44 bg-gradient-to-r from-[#0a0c10] via-[#0a0c10]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-44 bg-gradient-to-l from-[#0a0c10] via-[#0a0c10]/80 to-transparent pointer-events-none z-10" />

          {/* Row 1: Scrolling Left */}
          <div className="animate-marquee-left flex gap-5 sm:gap-6 pl-4">
            {[...ROW_1_REVIEWS, ...ROW_1_REVIEWS].map((rev, idx) => (
              <ReviewCard key={`r1-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="animate-marquee-right flex gap-5 sm:gap-6 pl-4">
            {[...ROW_2_REVIEWS, ...ROW_2_REVIEWS].map((rev, idx) => (
              <ReviewCard key={`r2-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>

        </div>

        {/* Footer Hint */}
        <div className="mt-8 text-center relative z-10">
          <span className="text-[11px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Hover over any review to pause • 100% Authenticated Purchases</span>
          </span>
        </div>

      </div>

    </section>
  );
}

