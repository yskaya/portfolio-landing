"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { m } from "motion/react";
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from "../graphs/AnimatedHeadline";
import { Quote, ExternalLink } from "lucide-react";
import { useData } from "../context/DataContext";

// Generate a seeded random number (0-1) based on a string seed
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Use sine to get a value between 0 and 1
  return Math.abs(Math.sin(hash)) % 1;
}

export function Recommendations() {
  const { recommendations, intro } = useData();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1152); // Default max-w-6xl width
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        setIsMobile(width < 760);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Calculate positions: rotations and absolute positions for cards (using percentages for responsiveness)
  const positions = useMemo(() => {
    if (!recommendations || recommendations.length === 0) return [];
    
    const cardHeight = 200; // Approximate card height including gaps
    const overlap = 80; // Overlap amount in pixels (negative gap for overlapping)
    
    return recommendations.map((rec, index) => {
      // Generate seeded random values
      const randomRotate = seededRandom(rec.id + 'rotate');
      const randomX = seededRandom(rec.id + 'x');
      
      // Random rotation
      const rotate = (randomRotate - 0.5) * 12; // -6 to +6 degrees
      
      // Position cards in three columns, two rows with more overlap
      const column = index % 3;
      const row = Math.floor(index / 3);
      
      // Base X position as percentage: specific positions for cards 1, 4 and 3, 6
      let baseXPercent: number;
      if (index === 0 || index === 3) {
        // Cards 1 and 4: left: 0
        baseXPercent = 0;
      } else if (index === 2 || index === 5) {
        // Cards 3 and 6: left: 70%
        baseXPercent = 70;
      } else {
        // Other cards: center column (35%)
        baseXPercent = 35;
      }
      
      // Add slight random offset (±2%)
      const randomOffsetX = (randomX - 0.5) * 4;
      const xPercent = baseXPercent + randomOffsetX;
      
      // Y position: first 3 cards (indices 0, 1, 2) at top: 0, others with overlap
      const y = index < 3 ? 0 : (row - 1) * (cardHeight - overlap) + (cardHeight - overlap);
      
      return { 
        rotate,
        xPercent,
        y
      };
    });
  }, [recommendations]);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  // Calculate z-index based on year order (oldest = 1, newest = highest)
  const zIndexMap = useMemo(() => {
    const recsWithYears = recommendations.map((rec, index) => ({
      index,
      year: rec.start_date ? parseInt(rec.start_date.match(/\d{4}/)?.[0] || '0') : 0,
    }));
    
    // Sort by year (oldest first), then by original index for same year
    const sorted = [...recsWithYears].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.index - b.index;
    });
    
    // Create map: original index -> z-index (1 for oldest, increasing)
    const map: Record<number, number> = {};
    sorted.forEach((item, sortedIndex) => {
      map[item.index] = sortedIndex + 1;
    });
    
    return map;
  }, [recommendations]);

  return (
    <section className="py-20 px-4 lg:px-12 relative overflow-hidden" style={{ marginBottom: '-200px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .glow-link-purple {
          position: relative;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .glow-link-purple::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: transparent;
          box-shadow: 0 0 15px rgba(131, 56, 236, 0), 0 0 30px rgba(131, 56, 236, 0);
          transition: box-shadow 0.3s ease, background 0.3s ease;
          pointer-events: none;
        }
        .glow-link-purple:hover {
          color: #a855f7 !important;
        }
        .glow-link-purple:hover::after {
          background: rgba(131, 56, 236, 0.2);
          box-shadow: 0px 0px 20px 5px rgba(131, 56, 236, 0.4), 0 0 30px rgba(131, 56, 236, 0.2);
        }
      `}} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <AnimatedHeadline>
            Recommendations
          </AnimatedHeadline>

          <MotionFadeIn
            as="p"
            className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
            delay={0.3}
          >
            LinkedIn recommendations from direct managers and cross-functional leaders
          </MotionFadeIn>
        </div>

        <div className="relative" style={{ minHeight: "600px", overflow: "visible" }}>
          {/* Single container with absolute positioning for all cards */}
          <div ref={containerRef} className="relative" style={{ width: "100%", height: "600px", overflow: "visible" }}>
            {recommendations.map((rec, index) => {
              const isHovered = hoveredIndex === index;
              const position = positions[index];
              const baseZIndex = zIndexMap[index] || index + 1;
              const zIndex = isHovered ? 100 : baseZIndex;
              const baseWidth = 380; // Base card width in px
              // On mobile (< 760px), use full width; otherwise use 760px max
              const expandedWidth = isMobile ? containerWidth : 760;
              
              // Calculate movement toward center (not perfectly centered)
              const containerCenter = 50; // 50% of container
              const currentPosition = position.xPercent;
              const moveTowardCenter = (containerCenter - currentPosition) * 0.5; // Move 50% of the way toward center
              const newXPercent = currentPosition + moveTowardCenter;
              
              return (
                <m.div
                  key={rec.id}
                  className="absolute"
                  style={{
                    top: `${position.y}px`,
                    zIndex: zIndex,
                    // Gateway: Add padding when hovered to keep cursor within bounds (prevents hover flicker)
                    // On mobile, use less padding since card is full width
                    padding: isHovered ? (isMobile ? "20px" : "40px") : "0",
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.9, left: `${position.xPercent}%`, x: 0 }}
                  animate={{
                    opacity: isHovered ? 1 : 0.9,
                    y: 0,
                    scale: 1,
                    rotate: isHovered ? 0 : position.rotate,
                    width: isHovered 
                      ? (isMobile ? '100%' : `${expandedWidth}px`)
                      : `${baseWidth}px`,
                    // Move toward center but not perfectly aligned - adjust left position and use partial centering
                    left: isHovered 
                      ? (isMobile ? '0%' : `${newXPercent}%`)
                      : `${position.xPercent}%`,
                    x: isHovered 
                      ? (isMobile ? 0 : `-${expandedWidth * 0.3}px`)
                      : 0, // Partial shift toward center, not full centering
                  }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <m.a
                    href={rec.linkedin_url || intro.links?.linkedin || 'https://linkedin.com/in/yskaya'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-6 rounded-lg border backdrop-blur-sm cursor-pointer block"
                    style={{
                      background: isHovered 
                        ? "rgb(11 39 90 / 100%)"
                        : "rgb(11 39 90 / 90%)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      borderColor: isHovered 
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.12)",
                      boxShadow: isHovered 
                        ? "0 40px 100px rgba(11, 39, 90, 1), 0 20px 60px rgba(11, 39, 90, 1), 0 10px 30px rgba(0, 0, 0, 1)"
                        : "0 5px 15px rgba(0, 0, 0, 0.2)",
                      width: "100%",
                      minHeight: "180px",
                      // Compensate for parent padding to maintain visual position
                      // On mobile, use less margin since padding is reduced
                      margin: isHovered ? (isMobile ? "-20px" : "-40px") : "0",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {/* Quote Icon */}
                    <m.div 
                      className="absolute top-4 right-4"
                    >
                      <Quote
                        className="w-8 h-8"
                        style={{ color: isHovered ? 'rgba(0, 212, 255, 0.9)' : 'rgba(0, 212, 255, 0.7)' }}
                      />
                    </m.div>

                    {/* Recommendation Text - 4 lines max when not hovered, full text when hovered */}
                    <p
                      className="text-base mb-6 pr-8"
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: "1.5",
                        ...(isHovered
                          ? {
                              display: "block",
                              overflow: "visible",
                              minHeight: "auto",
                            }
                          : {
                              display: "-webkit-box",
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxHeight: "6rem",
                              minHeight: "6rem",
                            }),
                      }}
                    >
                      "{rec.text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white mb-1">{rec.author}</p>
                        <p
                          className="text-sm"
                          style={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          {rec.author_title}
                        </p>
                      </div>
                      
                      {/* LinkedIn Link Indicator */}
                      <div
                        className="inline-flex items-center gap-2 transition-all"
                        style={{
                          color: isHovered ? 'rgba(0, 212, 255, 0.9)' : 'rgba(0, 212, 255, 0.7)',
                        }}
                      >
                        <span className="text-xs uppercase tracking-wider font-medium">View on LinkedIn</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </m.a>
                </m.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

