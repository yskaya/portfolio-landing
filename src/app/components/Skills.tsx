import { m } from 'motion/react';
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';
import { Badge } from "../ui/badge";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Code, Database, Cloud, Zap, Wrench, TestTube } from 'lucide-react';
import { useData } from '../context/DataContext';
import { HoverGlowCard } from '../graphs/HoverGlowCard';

export function Skills() {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();
  const { skills } = useData();

  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;

  const iconMap: Record<string, any> = {
    'Languages & Core': Code,
    'Frontend': Code,
    'Backend': Database,
    'APIs': Database,
    'Architecture patterns': Cloud,
    'CI/CD': Wrench,
    'Cloud & Infra': Cloud,
    'Build': Wrench,
    'Markup & Styling': Code,
    'AI Integration': Zap,
    'Testing': TestTube,
    'Other FE Frameworks': Zap,
    'Other Backend': Database,
  };

  const skillCategories = skills.skills.map((cat) => ({
    title: cat.category_name,
    icon: iconMap[cat.category_name] || Code,
    skills: cat.technologies,
    color: 'from-blue-500/20 to-cyan-500/20',
  }));

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedHeadline>
          Tech Stack
        </AnimatedHeadline>

        <MotionFadeIn
          as="p"
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
          delay={0.3}
        >
          {skills.qualification && skills.qualification.length > 0
            ? skills.qualification.slice(0, 2).join(' ')
            : 'TBD'}
        </MotionFadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <HoverGlowCard
                key={index}
                className="relative group"
                
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Card with glassmorphism */}
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 h-full`}
                  style={{
                    background: `linear-gradient(135deg, ${category.color.split(' ')[0].replace('from-', 'rgba(')} 0%, rgba(0,0,0,0.1) 100%)`,
                  }}
                >

                  {/* Icon with rotation effect */}
                  <m.div
                    className="flex items-center mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <m.div
                      className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-3"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </m.div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </m.div>

                  {/* Skills with staggered animation */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <m.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: skillIndex * 0.05,
                          type: 'spring',
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          boxShadow: '0 10px 20px rgba(255,255,255,0.1)',
                        }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default relative overflow-hidden text-xs"
                        >
                          {/* Shine effect */}
                          <m.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                          <span className="relative z-10">{skill}</span>
                        </Badge>
                      </m.div>
                    ))}
                  </div>

                  {/* Floating particles */}
                  {Array.from({ length: 2 }).map((_, particleIndex) => (
                    <m.div
                      key={particleIndex}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        right: `${20 + particleIndex * 15}%`,
                        top: `${20 + particleIndex * 20}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2 + particleIndex,
                        repeat: Infinity,
                        delay: particleIndex * 0.5,
                      }}
                    />
                  ))}
                </div>
              </HoverGlowCard>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}