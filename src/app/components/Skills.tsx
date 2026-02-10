import { m } from 'motion/react';
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';
import { Badge } from "../ui/badge";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Code, Database, Cloud, Zap, Wrench, TestTube, Building } from 'lucide-react';
import { useData } from '../context/DataContext';
import { HoverGlowCard } from '../graphs/HoverGlowCard';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';

export function Skills() {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();
  const { skills } = useData();

  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;

  // Helper function to parse technology and calculate years
  const parseTechnology = (tech: string) => {
    // Match both em dash (—) and regular dash (-) followed by "since YYYY"
    const sinceMatch = tech.match(/[—\-] since (\d{4})/);
    if (sinceMatch) {
      const year = parseInt(sinceMatch[1]);
      const currentYear = new Date().getFullYear();
      const years = currentYear - year;
      // Remove the "— since YYYY" or "- since YYYY" part
      const techName = tech.replace(/[—\-] since \d{4}/, '').trim();
      return { name: techName, years, hasDate: true, isBadge: true };
    }
    
    // Check if it contains a colon (group label like "APIs: REST, GraphQL")
    if (tech.includes(':')) {
      const [label, techs] = tech.split(':');
      return { 
        name: tech, 
        years: null, 
        hasDate: false, 
        isBadge: false,
        isGroupLabel: true,
        label: label.trim(),
        techList: techs ? techs.split(',').map(t => t.trim()) : []
      };
    }
    
    // Check if it's a descriptive phrase (long, contains &, or common descriptive words)
    const isDescriptive = tech.length > 30 || 
                          tech.includes(' & ') || 
                          tech.includes('platforms') ||
                          tech.includes('systems') ||
                          tech.includes('workflows') ||
                          tech.includes('architectures') ||
                          tech.includes('modernization') ||
                          tech.includes('integration') ||
                          tech.match(/\([^)]+\)/); // Contains parentheses (like "LLM integration (OpenAI)")
    
    return { 
      name: tech, 
      years: null, 
      hasDate: false, 
      isBadge: !isDescriptive 
    };
  };

  const iconMap: Record<string, any> = {
    'Web Full-Stack core': Building,
    'Architecture, Platforms & AI': Cloud,
    'Tooling, Infra & Delivery': Wrench,
    // Legacy mappings for backwards compatibility
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

  const skillCategories = skills.collections.map((collection) => ({
    title: collection.name,
    icon: iconMap[collection.name] || Code,
    groups: collection.groups,
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
          Progressed through every stage of modern web development — from core web fundamentals and early monoliths to large-scale React platforms and distributed, multi-service systems
        </MotionFadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <HoverGlowCard
                key={index}
                className="relative"
                
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Card with glassmorphism */}
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden h-full`}
                  style={{
                    background: `linear-gradient(135deg, ${category.color.split(' ')[0].replace('from-', 'rgba(')} 0%, rgba(0,0,0,0.1) 100%)`,
                  }}
                >

                  {/* Category Header - Better formatting */}
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <m.div
                      className="flex items-center gap-3"
                    >
                      <m.div
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          border: '1px solid rgba(131, 56, 236, 0.3)',
                        }}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </m.div>
                      <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">
                        {category.title}
                      </h3>
                    </m.div>
                  </div>

                  {/* Skills with staggered animation */}
                  <div className="space-y-4">
                    {category.groups.map((group, groupIndex) => {
                      return (
                        <m.div
                          key={groupIndex}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: groupIndex * 0.05,
                          }}
                          className="space-y-2"
                        >
                          <p className="text-sm text-gray-400 font-medium">{group.label}:</p>
                          <div className="flex flex-wrap gap-2">
                            {group.technologies.map((tech, techIndex) => {
                              const parsed = parseTechnology(tech);
                              
                              // Check if it's a descriptive phrase (not a badge)
                              const isDescriptive = parsed.name.length > 30 || 
                                parsed.name.includes(' & ') || 
                                parsed.name.includes('platforms') ||
                                parsed.name.includes('systems') ||
                                parsed.name.includes('workflows') ||
                                parsed.name.includes('architectures') ||
                                parsed.name.includes('modernization') ||
                                parsed.name.includes('integration') ||
                                parsed.name.match(/\([^)]+\)/);
                              
                              // Only show badge if it's an actual tech name, not a descriptive phrase
                              if (isDescriptive) {
                                return (
                                  <m.p
                                    key={techIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                      duration: 0.3, 
                                      delay: groupIndex * 0.05 + techIndex * 0.03,
                                    }}
                                    className="text-sm text-gray-300"
                                  >
                                    {parsed.name}
                                  </m.p>
                                );
                              }
                              
                              return (
                                <m.div
                                  key={techIndex}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: groupIndex * 0.05 + techIndex * 0.03,
                                    type: 'spring',
                                    stiffness: 200
                                  }}
                                >
                                  {parsed.hasDate && parsed.years !== null ? (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge 
                                          variant="secondary" 
                                          className="bg-white/10 text-white border-white/20 transition-all duration-300 cursor-default relative overflow-hidden text-xs"
                                        >
                                          <m.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ x: '-100%' }}
                                          />
                                          <span className="relative z-10">{parsed.name}</span>
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent
                                        className="bg-gray-900 text-white border-gray-700"
                                        sideOffset={5}
                                      >
                                        <p>{parsed.years} {parsed.years === 1 ? 'year' : 'years'} of experience</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    <Badge 
                                      variant="secondary" 
                                      className="bg-white/10 text-white border-white/20 transition-all duration-300 cursor-default relative overflow-hidden text-xs"
                                    >
                                      <m.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ x: '-100%' }}
                                      />
                                      <span className="relative z-10">{parsed.name}</span>
                                    </Badge>
                                  )}
                                </m.div>
                              );
                            })}
                          </div>
                        </m.div>
                      );
                    })}
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