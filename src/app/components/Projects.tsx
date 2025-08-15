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
  
  const displayProjects = showAll ? projects : projects.slice(0, 4);

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
    <section className="py-20 px-4">
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
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                      {project.featured && (
                        <Badge className="bg-white text-black transition-none">Featured</Badge>
                      )}
                    </div>
                    <CardDescription className="text-gray-300">
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
                    
                  </CardContent>
                </Card>
              </HoverGlowCard>
            </MotionFadeIn>
          ))}
        </div>
      </div>

      <Dialog open={isProjectModalOpen} onOpenChange={setIsProjectModalOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto cyber-glass border-2">
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
          </DialogContent>
        </Dialog>
    </section>
    </>
  );
}