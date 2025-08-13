import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MotionFadeIn } from "../motions/MotionFadeIn";
import { useMousePosition } from '../hooks/useMousePosition';
import { Code2, Globe, Award, Users } from 'lucide-react';

const highlights = [
  { icon: Code2, title: "15+ Years Experience", desc: "Full-stack mastery" },
  { icon: Globe, title: "Global Journey", desc: "Belarus → Berlin → NYC → LA" },
  { icon: Award, title: "AI Innovation", desc: "Cutting-edge solutions" },
  { icon: Users, title: "Team Leadership", desc: "Mentoring & scaling" }
];

export function About() {
  const [scrollY, setScrollY] = useState(0);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 2;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 2;


  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background layers */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M20 0 L30 10 L20 20 L10 10 Z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
        animate={{
          x: mouseXPercent * -3,
          y: mouseYPercent * -2,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            style={{ transform: `translateY(${scrollY * -0.05}px)` }}
            animate={{
              x: mouseXPercent * 5,
            }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8 text-white relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              The Evolution
              {/* Animated accent */}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <MotionFadeIn as="p" delay={0.2}>
                I earned a <strong>Master's in Computer Design Engineering</strong> — not in software, but in systems, structure, and logic.
                That mindset has shaped a <strong>15-year journey</strong> across web development: from backend frameworks to CI/CD
                pipelines and infrastructure. I've lived and worked in <strong>Belarus, Berlin, New York</strong>, and now <strong>Los Angeles</strong> —
                contributing across tech stacks and product stages in early-stage startups and global organizations.
              </MotionFadeIn>

              <MotionFadeIn as="p" delay={0.4}>
                I've grown with <strong>the web</strong> — from no-syntax editors and hand-coded HTML to modern UIs and scalable microservices;
                from raw SQL and on-prem development to cloud infrastructures, Docker and Kubernetes; from tightly coupled
                monoliths to modular, distributed systems. Each shift has refined <strong>how I build</strong> — and <strong>how I rebuild better</strong>.
              </MotionFadeIn>

              <MotionFadeIn as="p" delay={0.6}>
                As a <strong>Staff Frontend Engineer</strong>, I've helped to <strong>form engineering teams, shape hiring practices</strong>, and
                <strong>drive development strategies</strong> at scale. I've led <strong>legacy decoupling, defined architectural evolution</strong>,
                and <strong>established coding standards</strong> across cross-functional teams. I've worked closely with product and platform teams,
                <strong>mentored engineers</strong>, and remained <strong>a consistent contributor</strong> to the codebase — combining strategy with hands-on execution.
              </MotionFadeIn>
            </div>
          </motion.div>
          
          {/* Visual Content */}
          <motion.div 
            className="relative"
            style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            animate={{
              x: mouseXPercent * -3,
              y: mouseYPercent * 2,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 25 }}
          >
            {/* Main image container with glassmorphism */}
            <motion.div
              className="relative w-full h-96 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👩‍💻</span>
                  </div>
                  <p className="text-gray-400">Professional photo would go here</p>
                </div>
              </div>
              
              {/* World map dots representing her journey */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Belarus */}
                <motion.div
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  style={{ top: '30%', left: '60%' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                {/* Berlin */}
                <motion.div
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{ top: '25%', left: '52%' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                {/* New York */}
                <motion.div
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{ top: '35%', left: '25%' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                {/* Los Angeles */}
                <motion.div
                  className="absolute w-2 h-2 bg-purple-400 rounded-full"
                  style={{ top: '45%', left: '15%' }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-white/5 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  rotate: 360,
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity },
                  rotate: { duration: 10, repeat: Infinity, ease: 'linear' }
                }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-6 h-6 border border-white/20"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl relative"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255, 255, 255, 0.05)',
              }}
              animate={{
                y: mouseYPercent * (index % 2 === 0 ? 2 : -2),
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-white/10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-6 w-6 text-white" />
              </motion.div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl text-gray-300 italic max-w-3xl mx-auto relative">
            <span className="text-4xl text-white/20 absolute -top-4 -left-4">"</span>
            Let's build something that lasts
            <span className="text-4xl text-white/20 absolute -bottom-4 -right-4">"</span>
          </blockquote>
          <p className="text-gray-500 mt-4">— Yulia —</p>
        </motion.div>
      </div>
    </section>
  );
}