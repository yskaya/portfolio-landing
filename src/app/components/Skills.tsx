import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MotionFadeIn } from "../motions/MotionFadeIn";
import { Badge } from "./ui/badge";
import { useMousePosition } from '../hooks/useMousePosition';
import { Code, Database, Cloud, Zap, Wrench, TestTube } from 'lucide-react';

export function Skills() {
  const [scrollY, setScrollY] = useState(0);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 2;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 2;

  const skillCategories = [
    {
      title: "Languages & Core",
      icon: Code,
      skills: ["JavaScript (ES6+)", "TypeScript", "React", "Next.js", "CSS", "HTML"],
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Backend & APIs",
      icon: Database,
      skills: ["Node.js", "NestJS", "Express", "MySQL", "REST", "GraphQL", "WebSocket", "gRPC", "Redis"],
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Build & DevOps",
      icon: Wrench,
      skills: ["Webpack", "Vite", "Rollup", "npm", "Yarn", "Drone", "Jenkins", "Travis CI", "GitHub Actions"],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      skills: ["AWS", "Docker", "OAuth", "Microservices", "Monorepo", "SPA", "MPA"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Testing & Quality",
      icon: TestTube,
      skills: ["Jest", "Enzyme", "Jasmine", "Karma", "Integration Testing", "Cypress", "e2e", "Selenium", "Chromatic"],
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "AI & Emerging",
      icon: Zap,
      skills: ["OpenAI", "LLM workflows", "AI Integration", "Vue.js", "Angular", "Ruby on Rails", "PHP"],
      color: "from-indigo-500/20 to-purple-500/20"
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Technical background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Cpath d='M10 10l40 40M10 50l40-40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
        animate={{
          x: mouseXPercent * -2,
          y: mouseYPercent * -1,
          rotate: mouseXPercent * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <MotionFadeIn
          as="h2"
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white relative"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        >
          Tech Stack

          {/* Animated circuit lines */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
            animate={{
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </MotionFadeIn>

        <MotionFadeIn
          as="p"
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
          delay={0.3}
        >
          15 years of web development with deep JavaScript expertise and a frontend focus.
          Skilled in React, Node.js, NestJS, and Next.js across monoliths, SPAs, microservices, and monorepos.
        </MotionFadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                style={{ transform: `translateY(${scrollY * (index % 2 === 0 ? -0.02 : 0.02)}px)` }}
                animate={{
                  x: mouseXPercent * (index % 2 === 0 ? 2 : -2),
                  y: mouseYPercent * (index % 2 === 0 ? 1 : -1),
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: index % 2 === 0 ? 2 : -2,
                }}
              >
                {/* Card with glassmorphism */}
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 h-full`}
                  style={{
                    background: `linear-gradient(135deg, ${category.color.split(' ')[0].replace('from-', 'rgba(')} 0%, rgba(0,0,0,0.1) 100%)`,
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Background pattern */}
                  <div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M10 0 L15 5 L10 10 L5 5 Z' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Icon with rotation effect */}
                  <motion.div
                    className="flex items-center mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-3"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </motion.div>

                  {/* Skills with staggered animation */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
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
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                          <span className="relative z-10">{skill}</span>
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Floating particles */}
                  {Array.from({ length: 2 }).map((_, particleIndex) => (
                    <motion.div
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
              </motion.div>
            );
          })}
        </div>

        {/* Experience highlight */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl" style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <h3 className="text-2xl font-semibold text-white mb-4">Key Qualifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <ul className="space-y-2 text-gray-300">
                <li>• Driving frontend architecture for large-scale platforms</li>
                <li>• Building reusable modules and internal libraries</li>
                <li>• Leading modernization efforts — from monolith-to-SPA transitions</li>
                <li>• Defining engineering workflows including CI/CD pipelines</li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li>• Owning delivery across the stack (primarily frontend)</li>
                <li>• Mentoring engineers through code reviews and POCs</li>
                <li>• Collaborating internationally across hybrid teams</li>
                <li>• Contributing to hiring and process improvements</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}