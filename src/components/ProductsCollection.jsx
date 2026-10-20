import React, { useState, useRef, useEffect } from 'react';
import { Plus, ShoppingBag, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const WATCH_COLLECTION = [
  {
    id: 'luxe-gold',
    name: 'TimeProMax Luxe Gold',
    price: 3499,
    formattedPrice: '₱ 3,499',
    desc: 'Rose-gold accents with a soft cream background.',
    image: '/assets/products/luxe-gold.png',
    accentColor: '#d97706',
    caseFinish: 'Rose Gold PVD Alloy',
    strap: 'Soft Cream Silicone',
  },
  {
    id: 'shadow-pro',
    name: 'TimeProMax Shadow Pro',
    price: 2999,
    formattedPrice: '₱ 2,999',
    desc: 'Dark background, black accents, and white text.',
    image: '/assets/products/shadow-pro.png',
    accentColor: '#475569',
    caseFinish: 'Matte Obsidian DLC',
    strap: 'Midnight Black Silicone',
  },
  {
    id: 'active-x',
    name: 'TimeProMax Active X',
    price: 2999,
    formattedPrice: '₱ 2,999',
    desc: 'Deep teal sport aesthetic with high-precision metrics.',
    image: '/assets/products/active-x.png',
    accentColor: '#0891b2',
    caseFinish: 'Deep Teal Sport Alloy',
    strap: 'Oceanic Cyan Elastomer',
  },
  {
    id: 'elite-white',
    name: 'TimeProMax Elite White',
    price: 2999,
    formattedPrice: '₱ 2,999',
    desc: 'Silver casing with arctic white band and red crown accent.',
    image: '/assets/products/elite-white.png',
    accentColor: '#94a3b8',
    caseFinish: 'Brushed Silver Alloy',
    strap: 'Arctic White Sport Strap',
  },
  {
    id: 'silver',
    name: 'TimeProMax Silver',
    price: 3199,
    formattedPrice: '₱ 3,199',
    desc: 'Silver, and light grey styling with stainless steel bracelet.',
    image: '/assets/products/silver.png',
    accentColor: '#cbd5e1',
    caseFinish: 'Polished Stainless Steel',
    strap: 'Stainless Steel Link Bracelet',
  },
];

/* 3D Interactive Tilt Watch Stage with GSAP Depth Hooks */
function TiltWatchStage({ watch, watchFloatRef, glowRef, pedestalRef }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-sm w-full group flex flex-col items-center py-6 select-none cursor-pointer"
      style={{ perspective: 1000 }}
    >
      {/* Ambient Backlight Glow with Scrubbed Expansion */}
      <div
        ref={glowRef}
        className="absolute top-1/4 w-56 h-56 blur-[85px] rounded-full opacity-25 transition-opacity duration-500 group-hover:opacity-70 pointer-events-none will-change-transform"
        style={{ backgroundColor: watch.accentColor }}
      />

      {/* GSAP Scrubbed Watch Levitation Container */}
      <div ref={watchFloatRef} className="relative z-10 w-full flex flex-col items-center justify-center will-change-transform">
        {/* 3D Tilting Watch Cutout */}
        <motion.div
          animate={{
            rotateX: isHovered ? coords.y * -25 : 0,
            rotateY: isHovered ? coords.x * 25 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="relative w-full flex flex-col items-center justify-center transform-gpu"
        >
          <img
            src={watch.image}
            alt={watch.name}
            className="w-full max-h-[440px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
          />

          {/* Dynamic Glass Glare Sheen following cursor */}
          {isHovered && (
            <div
              className="absolute inset-4 pointer-events-none rounded-3xl opacity-20 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255,255,255,1), transparent 55%)`,
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Luxury Pedestal Base with Independent Optical Depth */}
      <div
        ref={pedestalRef}
        className="w-56 h-7 -mt-6 rounded-[100%] bg-gradient-to-b from-white/10 to-transparent border-t border-white/20 blur-[1px] pointer-events-none shadow-2xl will-change-transform"
      />
      
      {/* Subtle 3D Tilt Hint Pill */}
      <span className="text-[10px] font-mono text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        ✦ Interactive 3D Tilt
      </span>
    </div>
  );
}

/* Desktop Single Product Row with GSAP ScrollTrigger Depth Parallax */
function DesktopProductRow({ watch, index, onSelectProduct, onAddToCart, onOpenSpecs }) {
  const rowRef = useRef(null);
  const watchFloatRef = useRef(null);
  const glowRef = useRef(null);
  const pedestalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed 3D Watch Float Parallax
      if (watchFloatRef.current) {
        gsap.fromTo(
          watchFloatRef.current,
          { y: 38 },
          {
            y: -38,
            ease: 'none',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Pedestal differential depth (moves slower for levitation illusion)
      if (pedestalRef.current) {
        gsap.fromTo(
          pedestalRef.current,
          { y: 14, scaleX: 0.92 },
          {
            y: -16,
            scaleX: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // 3. Ambient backlight glow expands & intensifies on scroll
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { scale: 0.75, opacity: 0.18 },
          {
            scale: 1.25,
            opacity: 0.52,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 85%',
              end: 'center 45%',
              scrub: 1,
            },
          }
        );
      }

      // 4. Staggered reveal for details and specs
      if (contentRef.current) {
        const revealElements = contentRef.current.querySelectorAll('.row-reveal-item');
        gsap.fromTo(
          revealElements,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-12 gap-8 items-center border-b border-white/10 pb-20 will-change-transform"
    >
      {/* Left Column: 3D Tilting Watch on Levitation Pedestal */}
      <div className="col-span-6 flex justify-center items-center">
        <TiltWatchStage
          watch={watch}
          watchFloatRef={watchFloatRef}
          glowRef={glowRef}
          pedestalRef={pedestalRef}
        />
      </div>

      {/* Right Column: Title, Price, Description, BUY NOW button, Specs Sheet Button */}
      <div ref={contentRef} className="col-span-6 flex flex-col items-start text-left pl-8">
        <div className="row-reveal-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400 mb-3">
          <span>Signature Model 0{index + 1}</span>
        </div>

        <h3 className="row-reveal-item text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-2">
          {watch.name}
        </h3>

        <div className="row-reveal-item text-xl sm:text-2xl font-bold text-gray-200 mb-4 font-mono">
          Price: <span className="text-[#38bdf8]">{watch.formattedPrice}</span>
        </div>

        {/* Action Buttons */}
        <div className="row-reveal-item flex items-center gap-3 mb-4">
          <button
            onClick={() => onSelectProduct(watch)}
            className="px-7 py-3 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-blue-900/40 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5 fill-white" />
            <span>BUY NOW !</span>
          </button>

          <button
            onClick={() => (onAddToCart || onSelectProduct)(watch)}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors cursor-pointer"
            title="Add to Shopping Bag"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenSpecs(watch)}
            className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer ml-1"
          >
            <Eye className="w-4 h-4 text-[#38bdf8]" />
            <span>View Full Specs</span>
          </button>
        </div>

        <p className="row-reveal-item text-sm text-gray-400 font-light max-w-md leading-relaxed">
          {watch.desc}
        </p>

        {/* Specs pill */}
        <div className="row-reveal-item mt-5 flex items-center gap-3 text-xs text-gray-400 font-mono bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl">
          <span>Case: {watch.caseFinish}</span>
          <span>•</span>
          <span>Strap: {watch.strap}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProductsCollection({ onSelectProduct, onAddToCart, onOpenSpecs }) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          '.collection-gold-line',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );

        gsap.fromTo(
          headerRef.current.querySelectorAll('.header-reveal-item'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToIndex = (index) => {
    const nextIdx = Math.max(0, Math.min(index, WATCH_COLLECTION.length - 1));
    setMobileIndex(nextIdx);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.85;
      carouselRef.current.scrollTo({
        left: nextIdx * cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    scrollToIndex(mobileIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(mobileIndex + 1);
  };

  return (
    <section ref={sectionRef} id="products" className="py-24 bg-black text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner: OUR COLLECTION with GSAP Animated Accents */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="relative inline-block px-10 py-3 mb-8">
            <div className="collection-gold-line absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60 origin-center" />
            <h2 className="header-reveal-item text-3xl sm:text-5xl font-black tracking-widest uppercase font-serif text-[#f3f4f6]">
              OUR COLLECTION
            </h2>
            <div className="collection-gold-line absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60 origin-center" />
          </div>

          <blockquote className="header-reveal-item text-xl sm:text-2xl font-bold italic text-white mb-4">
            "Smarter Time, Better You, Built for Every Moment."
          </blockquote>
          
          <p className="header-reveal-item text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Precision engineered with premium materials and advanced technology. TimePromax smartwatches are designed to keep up with your lifestyle — wherever life takes you.
          </p>

          <div className="header-reveal-item mt-12 flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-white/30" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white font-serif tracking-wide">
                Signature series
              </span>
              <span className="text-xs text-gray-400 italic">
                Innovation on your wrist.
              </span>
            </div>
            <span className="h-[1px] w-12 bg-white/30" />
          </div>
        </div>

        {/* 1. MOBILE SWIPEABLE CAROUSEL (Visible on md:hidden) */}
        <div className="md:hidden relative">
          
          {/* Carousel Controls */}
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-mono text-gray-400">
              Model {mobileIndex + 1} of {WATCH_COLLECTION.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={mobileIndex === 0}
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
                aria-label="Previous watch"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={mobileIndex === WATCH_COLLECTION.length - 1}
                className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
                aria-label="Next watch"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipe Container */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-none no-scrollbar"
            onScroll={(e) => {
              const cardWidth = e.currentTarget.offsetWidth * 0.85;
              const newIndex = Math.round(e.currentTarget.scrollLeft / cardWidth);
              if (newIndex !== mobileIndex && newIndex >= 0 && newIndex < WATCH_COLLECTION.length) {
                setMobileIndex(newIndex);
              }
            }}
          >
            {WATCH_COLLECTION.map((watch) => (
              <div
                key={watch.id}
                className="min-w-[85%] snap-center p-6 rounded-3xl bg-[#12141a] border border-white/10 flex flex-col items-center text-center relative overflow-hidden shadow-2xl"
              >
                {/* Glow reflection */}
                <div
                  className="absolute top-1/4 w-40 h-40 blur-[70px] rounded-full opacity-30 pointer-events-none"
                  style={{ backgroundColor: watch.accentColor }}
                />

                {/* Watch cutout */}
                <div className="w-full h-64 flex items-center justify-center relative">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="max-h-60 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
                  />
                </div>

                <div className="w-44 h-5 -mt-3 rounded-[100%] bg-white/10 border-t border-white/20 blur-[1px] mb-4" />

                <h3 className="text-xl font-bold text-white mb-1">
                  {watch.name}
                </h3>

                <div className="text-lg font-black text-[#38bdf8] font-mono mb-2">
                  {watch.formattedPrice}
                </div>

                <p className="text-xs text-gray-400 mb-4 max-w-xs">
                  {watch.desc}
                </p>

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => onSelectProduct(watch)}
                      className="flex-1 py-3 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-blue-900/40 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 fill-white" />
                      <span>BUY NOW !</span>
                    </button>
                    <button
                      onClick={() => (onAddToCart || onSelectProduct)(watch)}
                      className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors cursor-pointer shrink-0"
                      title="Add to Shopping Bag"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenSpecs(watch)}
                    className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>View Technical Specs</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {WATCH_COLLECTION.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  mobileIndex === i ? 'w-6 bg-[#38bdf8]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 2. DESKTOP FULL LUXURY LIST WITH 3D CURSOR TILT & GSAP DEPTH PARALLAX */}
        <div className="hidden md:block space-y-20">
          {WATCH_COLLECTION.map((watch, index) => (
            <DesktopProductRow
              key={watch.id}
              watch={watch}
              index={index}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onOpenSpecs={onOpenSpecs}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
