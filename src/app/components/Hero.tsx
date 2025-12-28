import { useState, useEffect } from "react";
import { m } from 'motion/react';
import { MotionFadeIn } from '../graphs/MotionFadeIn';
import { Button } from "../ui/button";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useData } from '../context/DataContext';

export function Hero() {
  const scrollY = useScrollPosition();
  const [textIndex, setTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const mousePosition = useMousePosition();
  const { intro } = useData();

  const rotatingTitles = intro.positions && intro.positions.length > 0 ? intro.positions : ["TBD"];
  const username = intro.links?.email ? intro.links.email.split('@')[0] : 'tbd';
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: intro.links?.github, color: '#00d4ff' },
    { icon: Linkedin, label: 'LinkedIn', href: intro.links?.linkedin, color: '#ff006e' },
    { icon: Mail, label: 'Contact', href: intro.links?.email ? `mailto:${intro.links.email}` : '#', color: '#8338ec' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

  // Typing animation for download command
  useEffect(() => {
    const textToType = 'download...';
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        setTypedText(textToType.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // After typing completes, wait a bit then show download link
        setTimeout(() => {
          setShowDownloadLink(true);
        }, 500);
      }
    }, 80); // Typing speed - adjust for faster/slower typing

    return () => clearInterval(typingInterval);
  }, []);

  // Calculate mouse movement effects
  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .glow-link-blue {
          position: relative;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .glow-link-blue::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: transparent;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0), 0 0 30px rgba(0, 212, 255, 0);
          transition: box-shadow 0.3s ease, background 0.3s ease;
          pointer-events: none;
        }
        .glow-link-blue:hover {
          color: #00d4ff !important;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(0, 212, 255, 0.6), 0 0 30px rgba(0, 212, 255, 0.4);
        }
        .glow-link-blue:hover::after {
          background: rgba(0, 212, 255, 0.3);
          box-shadow: 0px 0px 20px 5px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.4);
        }
      `}} />
      {/* Cyberpunk Background Elements */}
      <m.div
        className="absolute inset-0 opacity-20"
        animate={{
          rotate: mouseXPercent * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Hexagonal patterns */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 border rounded-full"
          style={{ 
            borderColor: '#00d4ff',
            borderWidth: '1px',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
          }} 
        />
        <div 
          className="absolute top-40 right-40 w-24 h-24 border rotate-45"
          style={{ 
            borderColor: '#ff006e',
            borderWidth: '1px',
            boxShadow: '0 0 15px rgba(255, 0, 110, 0.3)',
          }} 
        />
        <div 
          className="absolute bottom-32 left-32 w-16 h-16 rounded"
          style={{ 
            background: 'rgba(131, 56, 236, 0.3)',
            boxShadow: '0 0 25px rgba(131, 56, 236, 0.4)',
          }} 
        />
        <div 
          className="absolute bottom-20 right-20 w-20 h-20 border-l border-t"
          style={{ 
            borderColor: '#00ff41',
            borderWidth: '2px',
            boxShadow: '0 0 15px rgba(0, 255, 65, 0.3)',
          }} 
        />
      </m.div>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Terminal-style intro */}
        <MotionFadeIn
          className="mb-16 mt-16 text-left"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.9rem',
            color: '#00ff41',
          }}
        >
          <div className="bg-black/50 rounded-lg p-4 border" style={{
            borderColor: '#00ff41',
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
            color: '#00ff41',
          }}>
            <div className="flex items-center gap-2">
              <Terminal size={16} />
              <span>{username}@portfolio:~$ </span>
              <span>{typedText}</span>
              {!showDownloadLink && (
                <m.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  █
                </m.span>
              )}
            </div>
            {showDownloadLink && (
              <m.div 
                className="ml-4 mt-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a
                  href="/Yulia_Kanapatskaya.zip"
                  download="Yulia_Kanapatskaya.zip"
                  className="glow-link-blue"
                  style={{ 
                    color: '#00d4ff',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  download Yulia_Kanapatskaya.zip
                </a>
              </m.div>
            )}
          </div>
        </MotionFadeIn>

        {/* Name with holographic effect */}
        <m.div
          className="mb-8"
          style={{
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
          animate={{
            x: mouseXPercent * 10,
            y: mouseYPercent * 5,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <MotionFadeIn
            as="h1"
            className="text-6xl md:text-8xl font-bold mb-6 relative holographic"
            delay={0.2}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
            }}
          >
            {intro.name}

            {/* Glitch effect overlay */}
            <m.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 30%, rgba(0, 212, 255, 0.1) 50%, transparent 70%)',
                transform: 'skew(-10deg)',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </MotionFadeIn>
          
          {/* Rotating subtitle with typewriter effect */}
          <m.div
            className="relative"
            animate={{
              x: mouseXPercent * -5,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <MotionFadeIn
              as="h2"
              key={textIndex}
              className="text-2xl md:text-3xl mb-6 relative z-10"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#00d4ff',
                textShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
              }}
            >
              {rotatingTitles[textIndex]}
              <m.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: '#00ff41' }}
              >
                _
              </m.span>
            </MotionFadeIn>
            
            {/* Animated underline with circuit pattern */}
            <m.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5"
              style={{
                background: 'linear-gradient(90deg, transparent, #00d4ff, #ff006e, #8338ec, transparent)',
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
              }}
              animate={{
                width: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </m.div>

          {/* Bio with cyber styling */}
          <MotionFadeIn
            as="p"
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'Inter, sans-serif',
            }}
            delay={0.4}
          >
            {intro.short_description || intro.about || 'TBD'}
          </MotionFadeIn>
        </m.div>
        
        {/* Social Links */}
        <MotionFadeIn
          className="flex flex-wrap justify-center gap-4 mb-12"
          delay={0.6}
        >
          {socialLinks.map((item, index) => (
            <div key={index}>
              <Button 
                asChild
                variant="outline" 
                size="default" 
                className="relative overflow-hidden border transition-all duration-300 btn-cyber"
                style={{
                  background: `rgba(${item.color === '#00d4ff' ? '0, 212, 255' : item.color === '#ff006e' ? '255, 0, 110' : '131, 56, 236'}, 0.08)`,
                  borderColor: item.color,
                  color: item.color,
                  fontFamily: 'JetBrains Mono, monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.875rem',
                }}
                onMouseEnter={(e) => {
                  const rgb = item.color === '#00d4ff' ? '0, 212, 255' : item.color === '#ff006e' ? '255, 0, 110' : '131, 56, 236';
                  e.currentTarget.style.boxShadow = `0 0 15px rgba(${rgb}, 0.4), 0 0 30px rgba(${rgb}, 0.2)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <a href={item.href || '#'} target={item.href?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </a>
              </Button>
            </div>
          ))}
        </MotionFadeIn>
        
        {/* Location - inline display */}
        <MotionFadeIn
          className="mb-12 flex items-center justify-center"
          delay={0.8}
        >
          <div
            className="inline-flex items-center gap-4"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {/* Open for relocation - left side */}
            {intro.open_for_relocation && (
              <m.span
                className="text-xs uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{
                  color: 'rgba(0, 255, 65, 0.7)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textShadow: '0 0 6px rgba(0, 255, 65, 0.3)',
                }}
              >
                open for relocation
              </m.span>
            )}
            
            {/* More noticeable pulsing indicator */}
            <m.span
              className="relative flex items-center justify-center"
              style={{ color: '#00ff41' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span style={{ 
                filter: 'drop-shadow(0 0 4px #00ff41)',
              }}>
                ◉
              </span>
              {/* Pulsing glow effect */}
              <m.span
                className="absolute inset-0"
                style={{
                  color: '#00ff41',
                  filter: 'blur(4px)',
                  opacity: 0.6,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ◉
              </m.span>
            </m.span>
            
            {/* Location - right side */}
            <span
              className="uppercase tracking-wider"
              style={{
                color: 'rgba(0, 255, 65, 0.9)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.15rem',
                letterSpacing: '0.1em',
                textShadow: '0 0 8px rgba(0, 255, 65, 0.4)',
              }}
            >
              {intro.location || 'TBD'}
            </span>
          </div>
        </MotionFadeIn>
        
        {/* Down Arrow Sign */}
        <m.div 
          className="relative"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <ArrowDown 
            className="h-8 w-8 mx-auto"
            style={{
              color: '#00d4ff',
              filter: 'drop-shadow(0 0 10px #00d4ff)',
            }}
          />
          <m.div 
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 border rounded-full"
            style={{
              borderColor: '#00d4ff',
              borderWidth: '1px',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0.2, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </m.div>
      </div>

      {/* Sparkling Show */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, index) => (
          <m.div
            key={index}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: index % 3 === 0 ? '#00d4ff' : index % 3 === 1 ? '#ff006e' : '#00ff41',
              boxShadow: `0 0 10px ${index % 3 === 0 ? '#00d4ff' : index % 3 === 1 ? '#ff006e' : '#00ff41'}`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}