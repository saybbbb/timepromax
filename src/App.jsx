import React, { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurStoryLifestyle from './components/OurStoryLifestyle';
import ProductsCollection, { WATCH_COLLECTION } from './components/ProductsCollection';
import WatchFaceStudio from './components/WatchFaceStudio';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import QuickSpecsModal from './components/QuickSpecsModal';
import AddedToCartBar from './components/AddedToCartBar';
import FloatingChatbot from './components/FloatingChatbot';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const lenisRef = useRef(null);
  
  // 1. Initialize Lenis Global Inertial Scroll Engine synchronized with GSAP
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Connect GSAP ticker to Lenis RAF loop
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Real Cart State: Empty by default
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutPromo, setCheckoutPromo] = useState(null);

  // Quick Specs Modal state
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [specsProduct, setSpecsProduct] = useState(WATCH_COLLECTION[0]);

  // Stop background scroll when modals/drawers are open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isCartOpen || isCheckoutOpen || isSpecsOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isCartOpen, isCheckoutOpen, isSpecsOpen]);

  // Floating Added-to-Cart Bar State (replaces old floating quick-buy bar)
  const [lastAddedWatch, setLastAddedWatch] = useState(null);
  const autoHideTimerRef = useRef(null);

  const handleAddToCart = (product, openDrawer = false) => {
    const productId = product.id || product.name.toLowerCase().replace(/\s+/g, '-');
    
    const formattedItem = {
      id: productId,
      name: product.name,
      price: product.price || 2999,
      formattedPrice: product.formattedPrice || '₱ 2,999',
      image: product.image || '/assets/products/luxe-gold.png',
      caseFinish: product.caseFinish || 'Polished Alloy',
      strap: product.strap || 'Sport Strap',
      quantity: 1,
    };

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === productId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, formattedItem];
    });

    // Display the added watch in the floating bar (same pill design as floating quick-buy)
    setLastAddedWatch({
      ...formattedItem,
      timestamp: Date.now(),
    });

    if (autoHideTimerRef.current) {
      clearTimeout(autoHideTimerRef.current);
    }
    autoHideTimerRef.current = setTimeout(() => {
      setLastAddedWatch(null);
    }, 6500);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBuyNowDirect = (product) => {
    handleAddToCart(product, false);
    setCheckoutItems([
      {
        id: product.id || product.name.toLowerCase().replace(/\s+/g, '-'),
        name: product.name,
        price: product.price || 2999,
        formattedPrice: product.formattedPrice || '₱ 2,999',
        image: product.image || '/assets/products/luxe-gold.png',
        caseFinish: product.caseFinish || 'Polished Alloy',
        strap: product.strap || 'Sport Strap',
        quantity: 1,
      }
    ]);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckoutFromCart = (items, promo) => {
    setCheckoutItems(items);
    setCheckoutPromo(promo);
    setIsCheckoutOpen(true);
  };

  const handleOpenCart = () => {
    setLastAddedWatch(null);
    setIsCartOpen(true);
  };

  const handleOpenSpecs = (product) => {
    setSpecsProduct(product);
    setIsSpecsOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col font-sans selection:bg-[#38bdf8] selection:text-black">
      
      {/* Fixed Sticky Header Navigation */}
      <Navbar
        onOpenCheckout={handleOpenCart}
        cartCount={totalCartCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section with Video */}
        <Hero onOpenCheckout={handleOpenCart} />

        {/* 2. Athletes & Our Story Narrative & 24/7 Stat Bar */}
        <OurStoryLifestyle />

        {/* 3. Signature Series: Our Collection */}
        <ProductsCollection
          onSelectProduct={handleBuyNowDirect}
          onAddToCart={(watch) => handleAddToCart(watch, false)}
          onOpenSpecs={handleOpenSpecs}
        />

        {/* 4. Interactive Watch Face Switcher Studio */}
        <WatchFaceStudio onOrderWatch={(watch) => handleAddToCart(watch, false)} />

        {/* 5. About Us Section */}
        <AboutUs />

        {/* 6. Contact Us & Verified Buyer Reviews Carousel */}
        <ContactUs />
      </main>

      {/* Footer */}
      <Footer
        onOpenCheckout={handleOpenCart}
        setActiveTab={setActiveTab}
      />

      {/* Smart Offline Floating Chatbot (Bottom Right) */}
      <FloatingChatbot onOpenCheckout={handleOpenCart} />

      {/* Technical Quick Specs Modal */}
      <QuickSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        watch={specsProduct}
        onOrder={(watch) => handleAddToCart(watch, false)}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckoutFromCart}
      />

      {/* Official Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems.length > 0 ? checkoutItems : cartItems}
        appliedPromo={checkoutPromo}
        onOrderSuccess={() => {
          // Clear cart on successful order
          setCartItems([]);
        }}
      />

      {/* Floating Added-to-Cart Notification Pill Bar (Replaces old quick-buy bar) */}
      <AddedToCartBar
        lastAddedWatch={lastAddedWatch}
        cartCount={totalCartCount}
        onOpenCart={() => {
          setLastAddedWatch(null);
          setIsCartOpen(true);
        }}
        onOpenCheckout={(items) => {
          setLastAddedWatch(null);
          handleProceedToCheckoutFromCart(items.length > 0 ? items : cartItems, null);
        }}
        onClose={() => setLastAddedWatch(null)}
      />

    </div>
  );
}


