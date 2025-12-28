import React from 'react';
import { m } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

interface CareerStoryProps {
  onBack?: () => void;
  isModal?: boolean;
  scrollToSectionId?: string;
}

export function CareerStory({ onBack, isModal = false, scrollToSectionId }: CareerStoryProps) {
  const { careerStory } = useData();
  const reversedStory = [...careerStory].reverse();

  // Scroll to specific section if provided
  React.useEffect(() => {
    if (scrollToSectionId && typeof window !== "undefined") {
      // Handle both string IDs (with colons) and numeric IDs for backward compatibility
      const elementId = scrollToSectionId.includes(':') 
        ? `story-section-${scrollToSectionId.replace(/:/g, '-')}`
        : `story-section-${scrollToSectionId}`;
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300); // Wait for dialog animation
      }
    }
  }, [scrollToSectionId]);

  const content = (
    <div className={`relative ${isModal ? 'p-10 min-h-full' : 'min-h-screen py-32 px-4'} ${isModal ? '' : 'overflow-hidden'}`}>
      {/* Background effects for modal */}
      {isModal && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Enhanced cyber grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                linear-gradient(rgba(131, 56, 236, 0.25) 1px, transparent 1px),
                linear-gradient(90deg, rgba(131, 56, 236, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px, 60px 60px, 30px 30px, 30px 30px',
            }}
          />
          {/* Enhanced glowing orbs */}
          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(131, 56, 236, 0.6) 0%, rgba(131, 56, 236, 0.3) 30%, transparent 70%)',
              animation: 'matrix-glow 8s ease-in-out infinite alternate',
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, rgba(0, 212, 255, 0.3) 30%, transparent 70%)',
              animation: 'matrix-glow 10s ease-in-out infinite alternate',
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px] opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(255, 0, 110, 0.5) 0%, rgba(255, 0, 110, 0.2) 30%, transparent 70%)',
              animation: 'matrix-glow 12s ease-in-out infinite alternate',
            }}
          />
          {/* Subtle scanline effect */}
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 212, 255, 0.15) 2px, rgba(0, 212, 255, 0.15) 4px)',
            }}
          />
          {/* Edge glow effect */}
          <div 
            className="absolute inset-0"
            style={{
              boxShadow: 'inset 0 0 200px rgba(131, 56, 236, 0.15), inset 0 0 300px rgba(0, 212, 255, 0.1)',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      <div className={`${isModal ? 'max-w-full relative z-10' : 'max-w-6xl mx-auto relative z-10'}`}>
        {isModal ? (
          <div>
            {/* Title */}
            <h1 className="text-4xl font-bold mb-12" style={{ color: '#ffffff' }}>
              My Story
            </h1>

            {/* Story Sections */}
            <div className="space-y-12">
              {reversedStory.map((section, index) => (
                <div key={section.id} id={`story-section-${section.id.replace(/:/g, '-')}`} className="space-y-6 scroll-mt-8">
                  {/* Period and Title */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: '#00d4ff' }} />
                      <span className="text-xl font-semibold" style={{ color: '#00d4ff' }}>
                        {section.period}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                      {section.title}
                    </h2>
                  </div>

                  {/* Content */}
                  <div 
                    className="text-lg leading-relaxed space-y-4"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />

                  {/* Separator (except for last item) */}
                  {index < reversedStory.length - 1 && (
                    <div className="pt-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-12 text-center" style={{ color: '#ffffff' }}>
              My Story
            </h1>
            <div className="space-y-12">
              {reversedStory.map((section, index) => (
                <div key={section.id} className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 justify-center">
                      <Calendar className="w-5 h-5" style={{ color: '#00d4ff' }} />
                      <span className="text-xl font-semibold" style={{ color: '#00d4ff' }}>
                        {section.period}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-center" style={{ color: '#ffffff' }}>
                      {section.title}
                    </h2>
                  </div>
                  <div 
                    className="text-lg leading-relaxed space-y-4 max-w-4xl mx-auto"
                    style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                  {index < reversedStory.length - 1 && (
                    <div className="pt-6 border-b max-w-4xl mx-auto" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return content;
}

