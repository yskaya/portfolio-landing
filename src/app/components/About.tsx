import { useState } from 'react';
import { m } from 'motion/react';
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Code2, Globe, Award, Users, BookOpen } from 'lucide-react';
import { HoverGlowCard } from '../graphs/HoverGlowCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useData } from '../context/DataContext';
import { CareerStory } from './CareerStory';

const iconMap: Record<string, any> = {
  'Code2': Code2,
  'Globe': Globe,
  'Award': Award,
  'Users': Users,
};

export function About() {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [storySectionId, setStorySectionId] = useState<number | undefined>(undefined);
  const { intro } = useData();

  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;

  const aboutSection = intro.about_section;
  const highlights = aboutSection?.highlights || [];
  const content = aboutSection?.content || [];
  const title = aboutSection?.title || 'About';


  return (
    <section className="relative py-32 px-4 overflow-hidden">

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-16">
            <m.h2 
              className="text-4xl md:text-5xl font-bold mb-16 text-white relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {title}
              
              <m.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </m.h2>
            
            <div className="space-y-8 text-gray-300">
              {content.map((s, index) => (
                <MotionFadeIn key={index} as="p" delay={(index + 1) * 0.2}>
                  <span dangerouslySetInnerHTML={{ __html: s.content }} />
                </MotionFadeIn>
              ))}
              
              {/* Read Full Story Link */}
              <MotionFadeIn delay={(content.length + 1) * 0.2}>
                <button
                  onClick={() => {
                    setStorySectionId(undefined);
                    setIsStoryModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 text-base font-medium transition-all duration-300 hover:gap-3 group mt-4"
                  style={{ color: '#8338ec' }}
                >
                  <span>Read full story</span>
                  <BookOpen className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </MotionFadeIn>
            </div>
          </div>
          
          <div className="relative">
            <m.div
              className="relative h-full rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              
              <img src="./T__08280.JPG" />
            </m.div>
          </div>
        </div>

        {/* Highlights Grid */}
        <m.div 
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {highlights.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Code2;
              return (
                <HoverGlowCard
                  key={index}
                  className="text-center p-6 rounded-xl relative backdrop-blur-md border border-white/10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <IconComponent className="h-6 w-6 text-white mx-auto mb-2" />
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </HoverGlowCard>
              );
            })}
          </div>
        </m.div>


       
      </div>

      {/* My Story Dialog */}
      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent 
          className="!max-w-4xl sm:!max-w-4xl !h-screen !border !p-0 flex flex-col !rounded-none"
          style={{
            background: `
              linear-gradient(180deg, rgba(10, 10, 20, 0.85) 0%, rgba(15, 15, 25, 0.80) 50%, rgba(10, 10, 20, 0.85) 100%),
              radial-gradient(circle at 30% 20%, rgba(131, 56, 236, 0.25) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 212, 255, 0.20) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 60%)
            `,
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            boxShadow: `
              0 0 80px rgba(131, 56, 236, 0.4),
              0 0 120px rgba(0, 212, 255, 0.3),
              0 0 160px rgba(255, 0, 110, 0.2),
              inset 0 0 100px rgba(131, 56, 236, 0.1),
              inset 0 0 200px rgba(0, 212, 255, 0.05)
            `,
          }}
        >
          <div className="flex-1 overflow-y-auto">
            <DialogHeader className="sr-only">
              <DialogTitle>My Story</DialogTitle>
            </DialogHeader>
            <CareerStory
              onBack={() => setIsStoryModalOpen(false)}
              isModal
              scrollToSectionId={storySectionId}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}