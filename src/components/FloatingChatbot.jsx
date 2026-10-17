import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ShoppingBag, Minimize2, CheckCircle2, ChevronRight, RefreshCw, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const KNOWLEDGE_BASE = [
  {
    keywords: ['price', 'cost', 'how much', 'magkano', 'presyo', 'models', 'collection'],
    answer: "Here is our official TimePro Max Signature Series pricing:\n• TimeProMax Shadow Pro: ₱ 2,999\n• TimeProMax Active X: ₱ 2,999\n• TimeProMax Elite White: ₱ 2,999\n• TimeProMax Silver Link: ₱ 3,199\n• TimeProMax Luxe Gold: ₱ 3,499\nAll models include magnetic fast charging and a 1-year warranty!",
    actionText: "Order Now",
  },
  {
    keywords: ['battery', 'charge', 'life', 'tagal', 'endurance', 'charging'],
    answer: "TimePro Max is powered by a 380mAh high-density Lithium-Cobalt cell delivering 7 to 10 days of continuous typical usage (up to 30 days standby). It uses our magnetic snap fast charger to go from 0 to 100% in just 55 minutes!",
  },
  {
    keywords: ['water', 'swim', 'rain', 'shower', 'basa', 'waterproof', 'ip68', 'depth'],
    answer: "Yes! TimePro Max is IP68 and 5 ATM certified. It is fully swimproof up to 50 meters (164 ft), safe for swimming, heavy tropical rains, and daily showering.",
  },
  {
    keywords: ['location', 'where', 'address', 'saan', 'cdo', 'cagayan', 'carmen', 'store', 'showroom'],
    answer: "Our showroom is located in Carmen, Cagayan de Oro City, Northern Mindanao. You can visit us Monday to Friday from 9:00 AM to 5:00 PM to experience the watches in person!",
  },
  {
    keywords: ['phone', 'contact', 'call', 'number', 'hotline', 'cellphone'],
    answer: "You can reach our Carmen showroom directly at 09756080664 during business hours (Mon–Fri, 9:00 AM – 5:00 PM).",
  },
  {
    keywords: ['iphone', 'android', 'ios', 'compat', 'samsung', 'xiaomi', 'app'],
    answer: "TimePro Max offers universal compatibility! It pairs seamlessly with Apple iOS (iOS 12.0+) and Android (Android 8.0+) devices via Bluetooth 5.3 through our companion app, TimePro Connect.",
  },
  {
    keywords: ['call', 'mic', 'speaker', 'tawag', 'bluetooth call'],
    answer: "Yes! You can make and answer HD crystal-clear phone calls right from your wrist using the built-in acoustic speaker and dual noise-canceling microphones.",
  },
  {
    keywords: ['notification', 'sms', 'facebook', 'messenger', 'gcash', 'alert'],
    answer: "TimePro Max delivers instant real-time haptic notifications for GCash alerts, SMS, incoming calls, Messenger, WhatsApp, and email without phone lag.",
  },
  {
    keywords: ['shipping', 'deliver', 'cod', 'cash on delivery', 'j&t', 'lbc', 'padala'],
    answer: "We offer Free Same-Day Delivery within Cagayan de Oro City! For nationwide orders across the Philippines, delivery takes 2–3 business days via J&T Express or LBC. Cash on Delivery (COD) is supported!",
  },
  {
    keywords: ['order', 'buy', 'reserve', 'bili', 'checkout', 'bag', 'cart'],
    answer: "You can place your order online right now with Free Insured Express Delivery across the Philippines! We support GCash, Credit/Debit Card, and Cash on Delivery (COD).",
    actionText: "Proceed to Checkout",
  },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Mabuhay! I'm your TimePro Max offline concierge. Ask me anything about pricing, battery life, water resistance, or showroom visits in CDO!",
  },
];

const QUICK_CHIPS = [
  "What are the prices?",
  "How long is battery life?",
  "Is it swimproof?",
  "Where in CDO are you?",
  "Does it support iPhone & Android?",
];

export default function FloatingChatbot({ onOpenCheckout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  const findSmartAnswer = (query) => {
    const q = query.toLowerCase().trim();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        return item;
      }
    }
    return {
      answer: "TimePro Max features Grade 5 titanium alloy, 7–10 days battery, IP68 water resistance, and Bluetooth HD calling. Would you like to check prices or our Carmen, CDO showroom location?",
      actionText: "Check Prices",
    };
  };

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulated offline intelligence response
    setTimeout(() => {
      const match = findSmartAnswer(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: match.answer,
        actionText: match.actionText,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[90vw] sm:w-[380px] h-[520px] max-h-[80vh] rounded-3xl bg-[#0c0e14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-950/80 via-black to-[#0c0e14] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#38bdf8] to-blue-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    TimePro AI Assistant
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Smart Offline Mode</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Minimize Chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#1e40af] text-white rounded-br-none'
                        : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    
                    {/* Inline Action CTA if available */}
                    {m.actionText && (
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenCheckout();
                        }}
                        className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38bdf8] hover:bg-sky-300 text-black font-extrabold text-[11px] tracking-wide uppercase transition-all shadow-md cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 fill-black" />
                        <span>{m.actionText}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 text-gray-400 text-xs flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin text-[#38bdf8]" />
                    <span>TimePro Concierge is answering...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/40 overflow-x-auto flex gap-1.5 scrollbar-none no-scrollbar">
              {QUICK_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] text-gray-300 whitespace-nowrap transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about specs, price, CDO hub..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[#38bdf8]"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-full bg-[#1e40af] hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Pill Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-full bg-gradient-to-r from-[#1e40af] via-blue-600 to-[#38bdf8] text-white shadow-[0_10px_30px_rgba(37,99,235,0.5)] border border-white/20 flex items-center justify-center cursor-pointer"
        aria-label="Open TimePro Assistant"
      >
        {/* Glow Ping Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#38bdf8] opacity-30 blur-sm group-hover:opacity-60 transition-opacity" />

        {isOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <div className="relative z-10 flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <span className="hidden sm:inline-block text-xs font-bold font-mono tracking-wider pr-1">
              Ask AI
            </span>
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
            )}
          </div>
        )}
      </motion.button>

    </div>
  );
}
