import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OurStoryLifestyle() {
  const sectionRef = useRef(null);
  const watermarkRef = useRef(null);
  const runnerCardRef = useRef(null);
  const gymCardRef = useRef(null);
  const polaroid1Ref = useRef(null);
  const polaroid2Ref = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Watermark smooth horizontal scrub
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Athlete cards multi-layered parallax depth
      if (runnerCardRef.current) {
        gsap.fromTo(
          runnerCardRef.current,
          { y: 35 },
          {
            y: -35,
            ease: 'none',
            scrollTrigger: {
              trigger: runnerCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      if (gymCardRef.current) {
        gsap.fromTo(
          gymCardRef.current,
          { y: 65 },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: gymCardRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // 3. Polaroids dynamic floating scrub
      if (polaroid1Ref.current) {
        gsap.fromTo(
          polaroid1Ref.current,
          { y: 30, rotation: -7 },
          {
            y: -45,
            rotation: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: polaroid1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
            },
          }
        );
      }

      if (polaroid2Ref.current) {
        gsap.fromTo(
          polaroid2Ref.current,
          { y: 55, rotation: 8 },
          {
            y: -65,
            rotation: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: polaroid2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          }
        );
      }

      // 4. Stats Counter Entrance Stagger
      if (statsRef.current) {
        gsap.fromTo(
          '.lifestyle-stat-box',
          { opacity: 0, y: 24, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white overflow-hidden relative">
      
      {/* 1. Athlete Running Showcase with "TIMEPRO MAX" Outlined Lettering */}
      <div className="relative py-12 sm:py-20 flex items-center justify-center border-t border-white/5 overflow-hidden">
        
        {/* Outlined Watermark Text with GSAP Scrubbed Parallax */}
        <div
          ref={watermarkRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20 z-0 whitespace-nowrap will-change-transform"
        >
          <span
            className="text-7xl sm:text-9xl md:text-[14rem] font-black uppercase tracking-tighter"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.45)',
              color: 'transparent',
            }}
          >
            TIMEPRO MAX
          </span>
        </div>

        {/* Athlete Images Showcase with Multi-Layered Depth */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Running Athlete Card */}
            <div
              ref={runnerCardRef}
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 group will-change-transform"
            >
              <img
                src="/assets/lifestyle/athlete-running.png"
                alt="TimePro Max in Action - Running"
                className="w-full h-[450px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Gym Athlete Card */}
            <div
              ref={gymCardRef}
              className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 group will-change-transform"
            >
              <img
                src="/assets/lifestyle/athlete-gym.png"
                alt="TimePro Max in Action - Training"
                className="w-full h-[450px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>
        </div>
      </div>

      {/* 2. OUR STORY Section */}
      <div className="py-20 bg-[#161616] border-t border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-gray-400">
                OUR STORY
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Time, redefined. <br />
                <span className="text-gray-300 font-semibold">Built for every moment.</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-2">
                TimePro Max was created with one simple idea, your smartwatch should do more than tell time. Designed for modern life, it brings powerful features, effortless style, and everyday convenience together on your wrist. From staying connected to tracking your day, TimePro Max keeps everything you need within a glance.
              </p>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-medium">
                Built with precision. Designed with purpose. <br />
                Made to move with you.
              </p>
            </div>

            {/* Right Column: High-Res Dual Polaroid Collage with Floating Parallax */}
            <div className="lg:col-span-5 flex justify-center items-center py-6">
              <div className="relative w-full max-w-sm h-80 sm:h-96 flex items-center justify-center">
                
                {/* Back Polaroid Card (Gym photo) */}
                <div
                  ref={polaroid1Ref}
                  className="absolute left-4 top-2 w-52 sm:w-60 bg-white p-3 pb-8 rounded-lg shadow-2xl z-10 border border-gray-200 will-change-transform"
                >
                  <div className="overflow-hidden rounded bg-gray-100 aspect-[4/3]">
                    <img
                      src="/assets/lifestyle/our-story-polaroid1.png"
                      alt="TimePro Max Moments"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 text-center mt-2 tracking-widest uppercase">
                    Everyday Companion
                  </div>
                </div>

                {/* Front Polaroid Card (Morning photo) */}
                <div
                  ref={polaroid2Ref}
                  className="absolute right-2 bottom-2 w-52 sm:w-60 bg-white p-3 pb-8 rounded-lg shadow-2xl z-20 border border-gray-200 will-change-transform"
                >
                  <div className="overflow-hidden rounded bg-gray-100 aspect-[4/3]">
                    <img
                      src="/assets/lifestyle/our-story-polaroid2.png"
                      alt="TimePro Max Everyday Life"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 text-center mt-2 tracking-widest uppercase">
                    Made to Move
                  </div>
                </div>

                {/* Decorative Pin / Ribbon Accent */}
                <div className="absolute z-30 -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-[#38bdf8] shadow-xl">
                  ✨ Real Moments
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Three Key Metrics Highlight Bar */}
      <div ref={statsRef} className="py-12 bg-black border-b border-white/10 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            
            <div className="lifestyle-stat-box flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-black text-white">24/7</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
                Smart Connected
              </span>
            </div>

            <div className="lifestyle-stat-box flex flex-col items-center border-x border-white/10">
              <span className="text-2xl sm:text-4xl font-black text-white">7+ Days</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
                Battery Life
              </span>
            </div>

            <div className="lifestyle-stat-box flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-black text-white">IP68</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
                Water Resistant
              </span>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

