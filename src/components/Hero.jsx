import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Play, Pause, Volume2, VolumeX, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero({ onOpenCheckout }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-black">
      
      {/* Cinematic Full Background Video Layer - Unobstructed */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-75 filter contrast-105 saturate-110"
        />
        {/* Subtle gradient overlay to keep text ultra-readable without hiding the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />
      </div>

      {/* Floating Video Controls (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full shadow-2xl">
        <button
          onClick={togglePlay}
          className="p-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Hero Content - Clean, Centered & Cinematic (Zero obstructing images) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        
        {/* NEW ARRIVAL Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-sky-400/30 text-[#38bdf8] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>NEW ARRIVAL</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none drop-shadow-2xl"
        >
          TimePro <span className="text-[#38bdf8]">Max</span>
        </motion.h1>

        {/* Subtitles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 sm:mt-6 space-y-1"
        >
          <p className="text-xl sm:text-3xl text-gray-200 font-light drop-shadow-md">
            More than a watch.
          </p>
          <p className="text-xl sm:text-3xl text-gray-200 font-light drop-shadow-md">
            Your everyday companion.
          </p>
        </motion.div>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onOpenCheckout}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-extrabold text-sm tracking-wider uppercase shadow-2xl shadow-blue-900/60 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 fill-white" />
            <span>SHOP NOW</span>
          </button>

          <button
            onClick={scrollToProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowDown className="w-4 h-4 text-gray-400" />
          </button>
        </motion.div>

      </div>

    </section>
  );
}
