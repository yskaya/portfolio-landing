import { useState, useMemo } from 'react';
import { m } from 'motion/react';
import { Calendar, MapPin, Users, TrendingUp, ExternalLink, Building, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { MotionSection } from '../graphs/MotionSection';
import { MotionFadeIn } from '../graphs/MotionFadeIn';
import { MotionSlideIn } from '../graphs/MotionSlideIn';
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';
import { useData } from '../context/DataContext';
import { AnimatedWorkHistory } from '../graphs';
import { HoverGlowCard } from '../graphs/HoverGlowCard';
import { BgPattern3 } from '../graphs/BgPattern3';
import { CareerStory } from './CareerStory';

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

// Map company names to story section IDs
const companyToStorySection: Record<string, string> = {
  'KL82 (Creative Laboratory 82)': 'story:kl82',
  'KL82': 'story:kl82',
  'Various (Europe)': 'story:kl82', // KL82 is part of early Europe work
  'Sophia Learning (via Warecorp)': 'story:sophia',
  'Sophia Learning': 'story:sophia',
  'Candena': 'story:candena',
  'U.S. Relocation & Freelance': 'story:move-to-us',
  'Freelance Engineer': 'story:move-to-us',
  'AI Amelia (IPsoft)': 'story:amelia',
  'IPsoft (Amelia)': 'story:amelia',
  'Amelia': 'story:amelia',
  'Namely': 'story:namely',
  'WeTransfer': 'story:wetransfer',
  'WoWCube': 'story:wowcube',
};

export function WorkHistory() {
  const scrollY = useScrollPosition();
  const [expandedPositionId, setExpandedPositionId] = useState<string>('');
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [storySectionId, setStorySectionId] = useState<string | undefined>(undefined);
  const mousePosition = useMousePosition();

  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;
  const { work } = useData();

  const handleStoryClick = (company: string) => {
    const sectionId = companyToStorySection[company];
    if (sectionId) {
      setStorySectionId(sectionId);
      setIsStoryModalOpen(true);
    } else {
      setStorySectionId(undefined);
      setIsStoryModalOpen(true);
    }
  };

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
    teamSize: item.team || item.team_size || 'TBD',
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
      <BgPattern3 />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <AnimatedHeadline>
            Professional Journey
          </AnimatedHeadline>

          <MotionFadeIn
            as="p"
            className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
            delay={0.3}
          >
            15 years of engineering excellence across global markets,<br/>from startup environments to enterprise-scale platforms.
          </MotionFadeIn>
        </div>

        <div className="space-y-6">
          {companyGroups.map((group, groupIndex) => {
            return (
              <MotionFadeIn
                key={group.company}
                className="relative"
                animateStyle={{ x: mouseXPercent * (groupIndex % 2 === 0 ? 2 : -2) }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="cyber-glass-purple cyber-glass-purple-box cyber-glass-box rounded-xl overflow-hidden">
                  {/* Company Header - Always Visible */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <m.h3 
                            className="text-2xl font-bold"
                            style={{ color: '#ffffff' }}
                          >
                            {group.company}
                          </m.h3>
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
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All Positions - Always Visible */}
                  <div className="px-6 pb-6 space-y-6 pt-6">
                    {group.positions.map((position, posIndex) => (
                      <div key={position.id} style={{ marginBottom: posIndex === group.positions.length - 1 ? 0 : undefined }}>
                        <m.div 
                          className="mb-3 cursor-pointer group rounded-lg p-2 -m-2"
                          onClick={() => togglePositionExpanded(position.id)}
                        >
                          <div className="flex relative" style={{ gap: '5%' }}>
                            {/* First Column: Position, Team, and Date - 25% */}
                            <div className="flex-shrink-0" style={{ width: '25%' }}>
                              <h4 className="text-lg font-semibold mb-1" style={{ color: '#ffffff' }}>
                                {position.position}
                              </h4>
                              {position.teamSize && position.teamSize !== 'TBD' && (
                                <div className="flex items-center gap-1 text-sm mb-1">
                                  <Users className="w-4 h-4" style={{ color: '#00ff88' }} />
                                  <span style={{ color: '#00ff88' }}>{position.teamSize}</span>
                                </div>
                              )}
                              {/* Only show date if company has multiple positions */}
                              {group.positions.length > 1 && (
                                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                  {position.period}
                                </div>
                              )}
                            </div>
                            
                            {/* Second Column: Description - 60% */}
                            <div className="flex-shrink-0" style={{ width: '60%' }}>
                              <p className="text-sm inline" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                {position.description[0]}
                                {expandedPositionId !== position.id && group.company !== 'U.S. Relocation & Freelance' && (
                                  <>
                                    {' '}
                                    <span 
                                      className="glow-link-purple inline-block text-xs uppercase tracking-wider font-medium ml-2"
                                      style={{ 
                                        color: 'rgba(131, 56, 236, 0.7)',
                                      }}
                                    >
                                      more
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </m.div>

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
                          <div style={{ marginLeft: 'calc(30%)', paddingBottom: '2rem' }}>
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
                          <div className="border-b border-white/10"></div>
                        )}
                      </div>
                    ))}
                    
                    {/* Read Story Link - At the end of all positions */}
                    <div className="pt-6 border-t border-white/10 flex justify-end">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleStoryClick(group.company);
                        }}
                        className="glow-link-purple inline-block text-xs uppercase tracking-wider font-medium"
                        style={{ 
                          color: 'rgba(131, 56, 236, 0.7)',
                        }}
                      >
                        read story
                      </a>
                    </div>
                  </div>
                </div>
              </MotionFadeIn>
            );
          })}
        </div>
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
    </div>
  );
}
