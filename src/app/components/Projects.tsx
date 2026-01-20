import { useMemo, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { ProjectDetail } from "./ProjectDetail";
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from "../graphs/AnimatedHeadline";
import { useData } from "../context/DataContext";
import { HoverGlowCard } from '../graphs/HoverGlowCard';
import { AnimatePresence, m } from "motion/react";

interface ProjectsProps {
  showAll?: boolean;
}

export function Projects({ showAll = false }: ProjectsProps) {
  const { projects } = useData();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  
  const displayProjects = showAll 
    ? projects 
    : showAllProjects 
      ? projects 
      : projects.slice(0, 4);
  
  const hasMoreProjects = !showAll && projects.length > 4;

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId),
    [selectedProjectId, projects]
  );

  const handleProjectSelect = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setIsProjectModalOpen(true);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setIsProjectModalOpen(false);
    setSelectedProjectId("");
  }, []);

  return (
    <>
    <section className="py-20 px-4 lg:px-12">
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
        .glow-link-white {
          position: relative;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .glow-link-white::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: transparent;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0), 0 0 30px rgba(255, 255, 255, 0);
          transition: box-shadow 0.3s ease, background 0.3s ease;
          pointer-events: none;
        }
        .glow-link-white:hover {
          color: #ffffff !important;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
        }
        .glow-link-white:hover::after {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0px 0px 20px 5px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2);
        }
        .glow-link-cyan {
          position: relative;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }
        .glow-link-cyan::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: transparent;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0), 0 0 30px rgba(0, 212, 255, 0);
          transition: box-shadow 0.3s ease, background 0.3s ease;
          pointer-events: none;
        }
        .glow-link-cyan:hover {
          color: #00d4ff !important;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(0, 212, 255, 0.6);
        }
        .glow-link-cyan:hover::after {
          background: rgba(0, 212, 255, 0.2);
          box-shadow: 0px 0px 20px 5px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2);
        }
      `}} />
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <AnimatedHeadline>
            {showAll ? "All Projects" : "Featured Projects"}
          </AnimatedHeadline>

          <MotionFadeIn
            as="p"
            className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
            delay={0.3}
          >
            Work spanning a wide range of products and scales — from simple marketing sites and early-stage MVPs to complex, multi-team platforms serving 1M+ daily active users
          </MotionFadeIn>
        </div>
        
        <m.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          layout
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project, index) => (
              <m.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95,
                  y: -10,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeInOut",
                  layout: { duration: 0.4, ease: "easeInOut" }
                }}
              >
                <MotionFadeIn delay={index < 4 ? index * 0.1 : 0}>
                  <HoverGlowCard onClick={() => handleProjectSelect(project.id)}>
                    <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl text-white mb-1 line-clamp-1">{project.title}</CardTitle>
                            {/* Date and Location - on one line */}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                              {project.duration && project.duration !== 'TBD' && (
                                <span>{project.duration}</span>
                              )}
                              {project.location && project.location !== 'TBD' && (
                                <>
                                  {project.duration && project.duration !== 'TBD' && <span>•</span>}
                                  <span>{project.location.split(',')[0]}</span>
                                </>
                              )}
                            </div>
                            {/* Position - on another line */}
                            {project.role && (
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <span className="line-clamp-1">{Array.isArray(project.role) ? project.role.join(' / ') : project.role}</span>
                              </div>
                            )}
                          </div>
                          {project.featured && (
                            <Badge className="bg-white text-black transition-none flex-shrink-0">Featured</Badge>
                          )}
                        </div>
                        <CardDescription className="text-gray-300 mt-2">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="border-white/20 text-gray-300 transition-none"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge
                              variant="outline"
                              className="border-white/20 text-gray-300 transition-none"
                            >
                              +{project.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Visit Link */}
                        {project.demo && project.demo !== 'TBD' && (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="glow-link-white inline-flex items-center gap-2 text-xs uppercase tracking-wider font-medium"
                              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              <span>Visit Project</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </HoverGlowCard>
                </MotionFadeIn>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
        
        {hasMoreProjects && !showAllProjects && (
          <MotionFadeIn className="text-center mt-12" delay={0.5}>
            <button
              onClick={() => setShowAllProjects(true)}
              className="glow-link-cyan inline-flex items-center gap-2 text-sm uppercase tracking-wider font-medium"
              style={{ color: 'rgba(0, 212, 255, 0.7)' }}
            >
              <span>Show All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </MotionFadeIn>
        )}
      </div>

      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
          <DialogContent 
            className="!max-w-4xl sm:!max-w-4xl !h-screen !p-0 flex flex-col !rounded-none !border-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(10, 10, 20, 0.85) 0%, rgba(15, 15, 25, 0.80) 50%, rgba(10, 10, 20, 0.85) 100%),
                radial-gradient(circle at 30% 20%, rgba(131, 56, 236, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(0, 212, 255, 0.20) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 60%)
              `,
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
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
              <DialogTitle>{selectedProject?.title || "Project Details"}</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <ProjectDetail
                project={selectedProject}
                onBack={handleCloseProjectModal}
                isModal
              />
            )}
            </div>
          </DialogContent>
        </Dialog>
    </section>
    </>
  );
}