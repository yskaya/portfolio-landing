import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Zap, X } from 'lucide-react';
import { Button } from './ui/button';
import { useMousePosition } from './hooks/useMousePosition';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string[];
  technologies: string[];
  features: string[];
  challenges: string[];
  results: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  timeline: string;
  teamSize: string;
  role: string;
  category: string;
}

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  isModal?: boolean;
}

export function ProjectDetail({ project, onBack, isModal = false }: ProjectDetailProps) {
  const [scrollY, setScrollY] = useState(0);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    if (!isModal) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isModal]);

  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 2;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 2;

  const content = (
    <div className={`relative ${isModal ? 'p-0' : 'min-h-screen py-32 px-4'} overflow-hidden`}>
      {/* Background effects - only for full page view */}
      {!isModal && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300d4ff' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3Ccircle cx='30' cy='30' r='25'/%3E%3Ccircle cx='30' cy='30' r='15'/%3E%3Ccircle cx='30' cy='30' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
          animate={{
            x: mouseXPercent * -1,
            y: mouseYPercent * -0.5,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      )}

      <div className={`${isModal ? '' : 'max-w-6xl mx-auto'} relative z-10`}>
        {/* Header */}
        <motion.div
          className={`${isModal ? 'mb-6' : 'mb-12'} flex items-center justify-between`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
            style={{
              background: 'rgba(0, 212, 255, 0.1)',
              borderColor: '#00d4ff',
              color: '#00d4ff',
            }}
          >
            {isModal ? <X className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            {isModal ? 'Close' : 'Back to Projects'}
          </Button>

          <div className="flex gap-3">
            {project.demoUrl && (
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  background: 'rgba(0, 255, 136, 0.1)',
                  borderColor: '#00ff88',
                  color: '#00ff88',
                }}
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  {isModal ? 'Demo' : 'Live Demo'}
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                asChild
                className="flex items-center gap-2 px-4 py-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                }}
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-${isModal ? '6' : '12'} ${isModal ? 'mb-6' : 'mb-16'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Project Image */}
          <div className="relative">
            <motion.div
              className={`relative ${isModal ? 'h-64' : 'h-80'} rounded-xl overflow-hidden cyber-glass`}
              whileHover={{ scale: isModal ? 1.02 : 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center">
                  <Zap className={`${isModal ? 'w-12 h-12' : 'w-16 h-16'} mx-auto mb-4 text-white/40`} />
                  <p className="text-white/60 font-medium">{project.category}</p>
                  <p className="text-white/40 text-sm mt-1">{project.title}</p>
                </div>
              </div>

              {/* Overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs px-2 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full border border-cyber-blue/30">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <motion.h1 
                className={`${isModal ? 'text-2xl' : 'text-4xl'} font-bold mb-4 holographic`}
                animate={{
                  x: mouseXPercent * (isModal ? 1 : 2),
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                {project.title}
              </motion.h1>
              <p 
                className={`${isModal ? 'text-sm' : 'text-lg'} leading-relaxed`}
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                {project.description}
              </p>
            </div>

            {/* Project Meta */}
            <div className={`grid grid-cols-${isModal ? '2' : '3'} gap-4`}>
              <div className="text-center p-4 cyber-glass rounded-lg">
                <Calendar className={`${isModal ? 'w-5 h-5' : 'w-6 h-6'} mx-auto mb-2`} style={{ color: '#00d4ff' }} />
                <div className={`${isModal ? 'text-xs' : 'text-sm'} font-semibold`} style={{ color: '#00d4ff' }}>
                  {project.timeline}
                </div>
                <div className={`${isModal ? 'text-xs' : 'text-xs'}`} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Timeline
                </div>
              </div>
              <div className="text-center p-4 cyber-glass rounded-lg">
                <Users className={`${isModal ? 'w-5 h-5' : 'w-6 h-6'} mx-auto mb-2`} style={{ color: '#00ff88' }} />
                <div className={`${isModal ? 'text-xs' : 'text-sm'} font-semibold`} style={{ color: '#00ff88' }}>
                  {project.teamSize}
                </div>
                <div className={`${isModal ? 'text-xs' : 'text-xs'}`} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Team Size
                </div>
              </div>
              {!isModal && (
                <div className="text-center p-4 cyber-glass rounded-lg">
                  <Zap className="w-6 h-6 mx-auto mb-2" style={{ color: '#ff006e' }} />
                  <div className="text-sm font-semibold" style={{ color: '#ff006e' }}>
                    {project.role}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    My Role
                  </div>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div>
              <h3 className={`${isModal ? 'text-sm' : 'text-lg'} font-semibold mb-3`} style={{ color: '#ffffff' }}>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className={`px-3 py-1 ${isModal ? 'text-xs' : 'text-sm'} rounded-full border`}
                    style={{
                      background: 'rgba(0, 212, 255, 0.1)',
                      color: '#00d4ff',
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    }}
                    whileHover={{
                      background: 'rgba(0, 212, 255, 0.2)',
                      scale: 1.05,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Sections */}
        <div className={`grid grid-cols-1 ${isModal ? 'gap-4' : 'lg:grid-cols-2 gap-8'}`}>
          {/* Project Description */}
          <motion.div
            className="cyber-glass-purple rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className={`${isModal ? 'text-lg' : 'text-xl'} font-bold mb-4`} style={{ color: '#ffffff' }}>
              Project Overview
            </h3>
            <div className="space-y-3">
              {project.fullDescription.map((paragraph, index) => (
                <p 
                  key={index}
                  className={isModal ? 'text-sm' : 'text-base'}
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div
            className="cyber-glass rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className={`${isModal ? 'text-lg' : 'text-xl'} font-bold mb-4`} style={{ color: '#ffffff' }}>
              Key Features
            </h3>
            <div className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ background: '#00d4ff' }}
                  />
                  <p 
                    className={isModal ? 'text-sm' : 'text-base'}
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Challenges & Solutions */}
          {!isModal && (
            <motion.div
              className="cyber-glass-pink rounded-xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>
                Technical Challenges
              </h3>
              <div className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ background: '#ff006e' }}
                    />
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {challenge}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results & Impact */}
          <motion.div
            className="cyber-glass-purple rounded-xl p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isModal ? 0.6 : 0.7 }}
          >
            <h3 className={`${isModal ? 'text-lg' : 'text-xl'} font-bold mb-4`} style={{ color: '#ffffff' }}>
              Results & Impact
            </h3>
            <div className="space-y-2">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (isModal ? 0.7 : 0.8) + index * 0.1 }}
                >
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ background: '#00ff88' }}
                  />
                  <p 
                    className={isModal ? 'text-sm' : 'text-base'}
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {result}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons - only in modal */}
        {isModal && (project.demoUrl || project.githubUrl) && (
          <motion.div
            className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {project.demoUrl && (
              <Button
                asChild
                className="btn-cyber px-6 py-3"
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                asChild
                className="px-6 py-3"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                }}
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </motion.div>
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