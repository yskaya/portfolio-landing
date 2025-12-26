import { useState, useMemo } from 'react';
import { m } from 'motion/react';
import { Calendar, MapPin, Users, TrendingUp, ExternalLink, Building, ChevronDown } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { MotionSection } from '../graphs/MotionSection';
import { MotionFadeIn } from '../graphs/MotionFadeIn';
import { MotionSlideIn } from '../graphs/MotionSlideIn';
import { useData } from '../context/DataContext';
import { AnimatedWorkHistory } from '../graphs';
import { HoverGlowCard } from '../graphs/HoverGlowCard';
import { BgPattern3 } from '../graphs/BgPattern3';

interface WorkExperience {
  id: string;
  company: string;
  companyUrl: string;
  position: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  achievements: string[];
  technologies: string[];
  teamSize?: string;
  impact?: string;
}

interface CompanyGroup {
  company: string;
  companyUrl: string;
  location: string;
  positions: WorkExperience[];
  dateRange: string;
}

export function WorkHistory() {
  const scrollY = useScrollPosition();
  const [expandedPositionId, setExpandedPositionId] = useState<string>('');
  const mousePosition = useMousePosition();

  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;
  const { work } = useData();

  const experiences: WorkExperience[] = work.map((item, index) => ({
    id: `work-${index}`,
    company: item.company,
    companyUrl: item.link || '',
    position: item.position,
    period: `${item.start} - ${item.end}`,
    location: item.location,
    type: 'TBD',
    description: [item.desc, ...(item.responsibilities || [])],
    achievements: Array.isArray(item.achievements) ? item.achievements : (item.achievements ? [item.achievements] : []),
    technologies: [],
    teamSize: item.team_size || 'TBD',
    impact: 'TBD',
  }));

  // Group experiences by company
  const companyGroups: CompanyGroup[] = useMemo(() => {
    const groups = new Map<string, CompanyGroup>();
    
    experiences.forEach((exp) => {
      if (!groups.has(exp.company)) {
        groups.set(exp.company, {
          company: exp.company,
          companyUrl: exp.companyUrl,
          location: exp.location,
          positions: [],
          dateRange: '',
        });
      }
      groups.get(exp.company)!.positions.push(exp);
    });

    // Calculate date ranges and sort positions by date (newest first)
    return Array.from(groups.values()).map((group) => {
      group.positions.sort((a, b) => {
        // Simple date comparison - extract year from period
        const aYear = parseInt(a.period.split(' - ')[0].split(' ').pop() || '0');
        const bYear = parseInt(b.period.split(' - ')[0].split(' ').pop() || '0');
        return bYear - aYear;
      });
      
      const dates = group.positions.map(p => p.period);
      const startDate = dates[dates.length - 1].split(' - ')[0];
      const endDate = dates[0].split(' - ')[1];
      group.dateRange = `${startDate} - ${endDate}`;
      
      return group;
    });
  }, [experiences]);

  const togglePositionExpanded = (id: string) => {
    setExpandedPositionId(expandedPositionId === id ? '' : id);
  };

  return (
    <div id="work-history" className="relative py-32 px-4 overflow-hidden">
      <BgPattern3 />

      <div className="max-w-6xl mx-auto">
        <m.div
          className="text-center mb-16"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          animate={{
            x: mouseXPercent * 5,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <m.h2 
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Professional Journey
          </m.h2>
          <m.p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            15 years of engineering excellence across global markets, from startup environments to enterprise-scale platforms.
          </m.p>
        </m.div>

        <div className="space-y-6">
          {companyGroups.map((group, groupIndex) => {
            return (
              <MotionFadeIn
                key={group.company}
                className="relative"
                animateStyle={{ x: mouseXPercent * (groupIndex % 2 === 0 ? 2 : -2) }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <HoverGlowCard className="cyber-glass-purple cyber-glass-purple-box cyber-glass-box rounded-xl overflow-hidden">
                  {/* Company Header - Always Visible */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Building className="w-5 h-5" style={{ color: '#8338ec' }} />
                          <m.h3 
                            className="text-2xl font-bold"
                            style={{ color: '#ffffff' }}
                            whileHover={{ color: '#8338ec' }}
                          >
                            {group.company}
                          </m.h3>
                          {group.companyUrl && (
                            <m.a
                              href={group.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full transition-all duration-300"
                              style={{
                                background: 'rgba(131, 56, 236, 0.2)',
                                borderColor: '#8338ec',
                                color: '#ffffff',
                              }}
                              whileHover={{
                                background: 'rgba(131, 56, 236, 0.4)',
                                scale: 1.05,
                              }}
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit
                            </m.a>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{group.dateRange}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{group.location}</span>
                          </div>
                          {group.positions.length > 1 && (
                            <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(131, 56, 236, 0.2)', color: '#8338ec' }}>
                              {group.positions.length} positions
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All Positions - Always Visible */}
                  <div className="px-6 pb-6 space-y-6 pt-6">
                    {group.positions.map((position, posIndex) => (
                      <div key={position.id}>
                        <div 
                          className="mb-3 cursor-pointer group"
                          onClick={() => togglePositionExpanded(position.id)}
                        >
                          <div className="flex relative" style={{ gap: '5%' }}>
                            {/* First Column: Position and Team - 25% */}
                            <div className="flex-shrink-0" style={{ width: '25%' }}>
                              <h4 className="text-lg font-semibold mb-1 group-hover:opacity-80 transition-opacity" style={{ color: '#ffffff' }}>
                                {position.position}
                              </h4>
                              {position.teamSize && position.teamSize !== 'TBD' && (
                                <div className="flex items-center gap-1 text-sm">
                                  <Users className="w-4 h-4" style={{ color: '#00ff88' }} />
                                  <span style={{ color: '#00ff88' }}>{position.teamSize}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Second Column: Date and Description - 60% */}
                            <div className="flex-shrink-0" style={{ width: '60%' }}>
                              <div className="text-sm mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                {position.period}
                              </div>
                              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                {position.description[0]}
                              </p>
                            </div>

                            {/* Visual indicator - Chevron icon */}
                            <div className="absolute right-0 top-0">
                              <m.div
                                animate={{ rotate: expandedPositionId === position.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="opacity-80 group-hover:opacity-100 transition-opacity"
                              >
                                <ChevronDown 
                                  className="w-6 h-6" 
                                  style={{ 
                                    color: expandedPositionId === position.id ? '#8338ec' : 'rgba(131, 56, 236, 0.9)',
                                    filter: 'drop-shadow(0 0 4px rgba(131, 56, 236, 0.5))'
                                  }} 
                                />
                              </m.div>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details - Appears right after description when expanded */}
                        <m.div
                          initial={false}
                          animate={{
                            height: expandedPositionId === position.id ? 'auto' : 0,
                            opacity: expandedPositionId === position.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden cursor-pointer"
                          onClick={() => togglePositionExpanded(position.id)}
                        >
                          <div className="pt-4" style={{ marginLeft: 'calc(25% + 5%)' }}>
                            {position.description.slice(1).length > 0 && (
                              <div className="space-y-2 mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                {position.description.slice(1).map((desc, descIndex) => (
                                  <div key={descIndex} className="flex items-start gap-3 text-sm">
                                    <span className="mt-1.5 flex-shrink-0" style={{ color: '#00d4ff' }}>•</span>
                                    <span className="flex-1 leading-relaxed">{desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {position.achievements.length > 0 && (
                              <div>
                                <h5 className="text-sm font-semibold mb-3" style={{ color: '#ffffff' }}>
                                  Key Achievements
                                </h5>
                                <div className="space-y-2">
                                  {position.achievements.map((achievement, achIndex) => (
                                    <div key={achIndex} className="flex items-start gap-3 text-sm">
                                      <span className="mt-1.5 flex-shrink-0" style={{ color: '#00ff88' }}>🚀</span>
                                      <span className="flex-1 leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{achievement}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </m.div>
                        
                        {/* Separating line - Only show between positions */}
                        {posIndex < group.positions.length - 1 && (
                          <div className="border-b border-white/10 pt-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </HoverGlowCard>
              </MotionFadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}
