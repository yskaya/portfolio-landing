import { useMemo, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { ProjectDetail } from "./ProjectDetail";
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { useData } from "../context/DataContext";
import { HoverGlowCard } from '../graphs/HoverGlowCard';

interface ProjectsProps {
  showAll?: boolean;
}

export function Projects({ showAll = false }: ProjectsProps) {
  const { projects } = useData();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const displayProjects = showAll ? projects : projects.slice(0, 6);

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
      <div className="max-w-6xl mx-auto">
        <MotionFadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            {showAll ? "All Projects" : "Featured Projects"}
          </h2>
        </MotionFadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayProjects.map((project, index) => (
            <MotionFadeIn key={index} delay={index * 0.1}>
              <HoverGlowCard onClick={() => handleProjectSelect(project.id)}>
                <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl text-white mb-1 line-clamp-1">{project.title}</CardTitle>
                        {/* Date and Position - compact, under title */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          {project.duration && project.duration !== 'TBD' && (
                            <span>{project.duration}</span>
                          )}
                          {project.role && (
                            <>
                              {project.duration && project.duration !== 'TBD' && <span>•</span>}
                              <span className="line-clamp-1">{Array.isArray(project.role) ? project.role.join(' / ') : project.role}</span>
                            </>
                          )}
                        </div>
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
                          className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 group"
                          style={{ color: '#8338ec' }}
                        >
                          <span>Visit Project</span>
                          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </HoverGlowCard>
            </MotionFadeIn>
          ))}
        </div>
      </div>

      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
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