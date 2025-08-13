import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { projectsData } from "./ProjectData";
import { MotionFadeIn } from "../motions/MotionFadeIn";

interface ProjectsProps {
  onProjectSelect?: (projectId: string) => void;
  showAll?: boolean;
}

export function Projects({ onProjectSelect, showAll = false }: ProjectsProps) {
  const displayProjects = showAll ? projectsData : projectsData.slice(0, 4);

  return (
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
              <Card className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  {project.featured && (
                    <Badge className="bg-white text-black">Featured</Badge>
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
                      className="border-white/20 text-gray-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge 
                      variant="outline" 
                      className="border-white/20 text-gray-300"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {onProjectSelect && (
                    <Button 
                      onClick={() => onProjectSelect(project.id)}
                      className="bg-white text-black hover:bg-gray-200"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
            </MotionFadeIn>
          ))}
        </div>
        
        {!showAll && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => onProjectSelect?.('all')} 
              variant="outline" 
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}