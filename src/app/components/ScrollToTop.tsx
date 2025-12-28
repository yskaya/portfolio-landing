'use client';

import { useState, useEffect } from 'react';
import { m } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <m.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-black/80 border border-cyan-500/30 backdrop-blur-sm cursor-pointer transition-all duration-300"
      style={{
        color: '#00d4ff',
        boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
      }}
      whileTap={{
        scale: 0.95,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowUp className="w-5 h-5" />
    </m.button>
  );
}

