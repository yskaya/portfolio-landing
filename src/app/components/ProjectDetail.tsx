import { m } from 'motion/react';
import { MotionFadeIn } from '../graphs/MotionFadeIn';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Zap, X, Building2, Briefcase, MapPin, Monitor, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: Array<string | { title?: string; content: string }>;
  technologies: string[];
  features: string[];
  challenges: string[];
  outcomes: string[];
  achievements: string[];
  responsibilities?: string[];
  image?: string;
  demo?: string;
  github?: string;
  duration: string;
  team: string;
  team_size?: string | string[];
  role: string | string[];
  company?: string;
  company_size?: string;
  location?: string;
  work_mode?: string;
  status?: string;
  category: string;
}

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  isModal?: boolean;
}

export function ProjectDetail({ project, onBack, isModal = false }: ProjectDetailProps) {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();

  const mouseXPercent = typeof window !== "undefined" ? (mousePosition.x / window.innerWidth - 0.5) * 2 : 0;
  const mouseYPercent = typeof window !== "undefined" ? (mousePosition.y / window.innerHeight - 0.5) * 2 : 0;

  const content = (
    <div className={`relative ${isModal ? 'p-10 min-h-full' : 'min-h-screen py-32 px-4'} ${isModal ? '' : 'overflow-hidden'}`}>
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
      {/* Background effects for modal */}
      {isModal && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Enhanced cyber grid pattern - brighter */}
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
          {/* Enhanced glowing orbs - brighter and more prominent */}
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

      {/* Background effects - only for full page view */}
      {!isModal && (
        <div className="absolute inset-0 opacity-20">
          {/* Background effects placeholder */}
        </div>
      )}

      <div className={`${isModal ? 'max-w-full relative z-10' : 'max-w-6xl mx-auto relative z-10'}`}>
        {isModal ? (
          /* Modal Layout: Title -> Role -> Timeline -> Teams -> Company/Product size -> Company -> Description -> Tech Stack */
          <div>
            {/* Title with View Product link */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold inline-flex items-baseline gap-4" style={{ color: '#ffffff' }}>
                <span className="holographic">{project.title}</span>
                {project.demo && project.demo !== 'TBD' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-link-purple inline-block text-xs uppercase tracking-wider font-medium"
                    style={{ 
                      color: 'rgba(131, 56, 236, 0.7)',
                    }}
                  >
                    View Product
                  </a>
                )}
              </h1>
            </div>

            {/* Meta Info in new order: Role -> Timeline -> Teams -> Company - Separated with visual divider - More compact */}
            <div className="space-y-3 text-base" style={{ color: 'rgba(255, 255, 255, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              {/* Role/Position (display with slash if array) */}
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 flex-shrink-0" style={{ color: '#ff006e' }} />
                <span>
                  <strong style={{ color: '#ffffff' }}>Position:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{Array.isArray(project.role) ? project.role.join(' / ') : project.role}</span>
                </span>
              </div>

              {/* Timeline/Dates */}
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#00d4ff' }} />
                <span>
                  <strong style={{ color: '#ffffff' }}>Dates:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{project.duration}</span>
                </span>
              </div>

              {/* Location (with dates if available) */}
              {project.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#00ff88' }} />
                  <span>
                    <strong style={{ color: '#ffffff' }}>Location:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{project.location}</span>
                  </span>
                </div>
              )}

              {/* Work Mode */}
              {project.work_mode && (
                <div className="flex items-center gap-3">
                  <Monitor className="w-4 h-4 flex-shrink-0" style={{ color: '#8338ec' }} />
                  <span>
                    <strong style={{ color: '#ffffff' }}>Work Mode:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{project.work_mode}</span>
                  </span>
                </div>
              )}

              {/* Company (name and size inline) */}
              {project.company && project.company !== 'TBD' && (
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: '#8338ec' }} />
                  <span>
                    <strong style={{ color: '#ffffff' }}>Company:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{project.company}</span>
                    {project.company_size && <span className="ml-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>({project.company_size})</span>}
                  </span>
                </div>
              )}

              {/* Team */}
              {project.team && project.team !== 'TBD' && (
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 flex-shrink-0" style={{ color: '#00ff88' }} />
                  <span>
                    <strong style={{ color: '#ffffff' }}>Team:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{project.team}</span>
                  </span>
                </div>
              )}

              {/* Status */}
              {project.status && (
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#00d4ff' }} />
                  <span>
                    <strong style={{ color: '#ffffff' }}>Status:</strong> <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{project.status}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Description - Separated section */}
            <div className="space-y-8 pt-12">
              {project.longDescription.map((item, index) => {
                if (typeof item === 'string') {
                  return (
                    <p 
                      key={index}
                      className="text-lg leading-relaxed"
                      style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      {item}
                    </p>
                  );
                } else {
                  const content = item as { title?: string; content: string };
                  return (
                    <div key={index} className="space-y-4">
                      {content.title && (
                        <h3 className="text-2xl font-semibold mb-4" style={{ color: '#ffffff' }}>
                          {content.title}
                        </h3>
                      )}
                      <div 
                        className="text-lg leading-relaxed"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: content.content }} />
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            {/* Responsibilities - Separated section */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="pt-12">
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#ffffff' }}>
                  Responsibilities
                </h3>
                <div className="space-y-3">
                  {project.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0" style={{ color: '#00d4ff', marginTop: '2px' }}>•</span>
                      <p 
                        className="text-lg leading-relaxed flex-1"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        {responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack - Separated section */}
            <div className="pt-12" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-5 py-3 text-base rounded-md border"
                    style={{
                      background: 'rgba(0, 212, 255, 0.1)',
                      color: '#00d4ff',
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Full Page Layout - keep existing with animations */
          <>
            <MotionFadeIn
              className="mb-16"
              delay={0.2}
            >
              <div className="space-y-6">
                <div>
                  <m.h1 
                    className="text-4xl font-bold mb-4 holographic"
                    animate={{
                      x: mouseXPercent * 2,
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                  >
                    {project.title}
                  </m.h1>
                </div>

                {/* Project Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg border border-white/10" style={{ background: 'rgba(0, 212, 255, 0.1)' }}>
                    <Calendar className="w-6 h-6 mb-2" style={{ color: '#00d4ff' }} />
                    <div className="text-sm font-semibold mb-1" style={{ color: '#00d4ff' }}>
                      {project.duration}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Timeline
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                    <Users className="w-6 h-6 mb-2" style={{ color: '#00ff88' }} />
                    <div className="text-sm font-semibold mb-1" style={{ color: '#00ff88' }}>
                      {project.team_size || project.team}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Team Size
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-white/10" style={{ background: 'rgba(255, 0, 110, 0.1)' }}>
                    <Briefcase className="w-6 h-6 mb-2" style={{ color: '#ff006e' }} />
                    <div className="text-sm font-semibold mb-1" style={{ color: '#ff006e' }}>
                      {project.role}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      My Role
                    </div>
                  </div>
                  {project.company && (
                    <div className="p-4 rounded-lg border border-white/10" style={{ background: 'rgba(131, 56, 236, 0.1)' }}>
                      <Building2 className="w-6 h-6 mb-2" style={{ color: '#8338ec' }} />
                      <div className="text-sm font-semibold mb-1" style={{ color: '#8338ec' }}>
                        {project.company}
                      </div>
                      <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {project.company_size || 'Company'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm rounded-full border"
                        style={{
                          background: 'rgba(0, 212, 255, 0.1)',
                          color: '#00d4ff',
                          borderColor: 'rgba(0, 212, 255, 0.3)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </MotionFadeIn>

            {/* Detailed Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Description */}
              <MotionFadeIn delay={0.4}>
                <div className="space-y-6">
                  {project.longDescription.map((item, index) => {
                    if (typeof item === 'string') {
                      return (
                        <p 
                          key={index}
                          className="text-base leading-relaxed"
                          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          {item}
                        </p>
                      );
                    } else {
                      const content = item as { title?: string; content: string };
                      return (
                        <div key={index} className="space-y-2">
                          {content.title && (
                            <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>
                              {content.title}
                            </h3>
                          )}
                          <p 
                            className="text-base leading-relaxed"
                            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                          >
                            {content.content}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </MotionFadeIn>

              {/* Responsibilities */}
              {project.responsibilities && project.responsibilities.length > 0 && (
                <MotionFadeIn
                  className="rounded-xl p-6 border border-white/10"
                  style={{ background: 'rgba(131, 56, 236, 0.1)' }}
                  delay={0.5}
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>
                    Responsibilities
                  </h3>
                  <div className="space-y-3">
                    {project.responsibilities.map((responsibility, index) => (
                      <m.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ background: '#8338ec' }}
                        />
                        <p 
                          className="text-base leading-relaxed"
                          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          {responsibility}
                        </p>
                      </m.div>
                    ))}
                  </div>
                </MotionFadeIn>
              )}

              {/* Achievements */}
              <MotionFadeIn
                className="rounded-xl p-6 border border-white/10"
                style={{ background: 'rgba(0, 212, 255, 0.1)' }}
                delay={0.6}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>
                  Achievements
                </h3>
                <div className="space-y-3">
                  {project.achievements && project.achievements.length > 0 ? (
                    project.achievements.map((achievement, index) => (
                      <m.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ background: '#00d4ff' }}
                        />
                        <p 
                          className="text-base leading-relaxed"
                          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        >
                          {achievement}
                        </p>
                      </m.div>
                    ))
                  ) : (
                    <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      No achievements listed.
                    </p>
                  )}
                </div>
              </MotionFadeIn>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // For modal mode, return content directly
  if (isModal) {
    return content;
  }

  // For full page mode, wrap in full page layout
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
        radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(131, 56, 236, 0.1) 0%, transparent 50%),
        linear-gradient(180deg, #0a0a0f 0%, #121218 100%)
      `,
      }}
    >
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      {content}
    </div>
  );
}