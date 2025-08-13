import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, TrendingUp, ExternalLink, Building } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { MotionSection } from '../motions/MotionSection';
import { MotionFadeIn } from '../motions/MotionFadeIn';
import { MotionSlideIn } from '../motions/MotionSlideIn';

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

export function WorkHistory() {
  const [scrollY, setScrollY] = useState(0);
  const [expandedId, setExpandedId] = useState<string>('');
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 2;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 2;

  const experiences: WorkExperience[] = [
    {
      id: 'wetransfer',
      company: 'WeTransfer',
      companyUrl: 'https://wetransfer.com',
      position: 'Staff Frontend Engineer',
      period: '2020 - Present',
      location: 'Los Angeles, CA / Remote',
      type: 'Full-time',
      description: [
        'Leading frontend architecture and development for file transfer platform serving millions of users globally',
        'Spearheading technical initiatives and mentoring engineering teams across multiple product areas',
        'Driving adoption of modern React patterns, TypeScript, and performance optimization strategies'
      ],
      achievements: [
        'Architected and implemented new file upload system increasing success rate by 35%',
        'Led team of 5+ engineers in rebuilding core platform features with modern tech stack',
        'Established frontend engineering standards and best practices adopted company-wide',
        'Reduced bundle size by 40% through advanced code splitting and optimization techniques'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'AWS', 'Docker'],
      teamSize: '5+ Engineers',
      impact: 'Millions of users'
    },
    {
      id: 'namely',
      company: 'Namely',
      companyUrl: 'https://namely.com',
      position: 'Senior Software Engineer',
      period: '2018 - 2020',
      location: 'New York, NY',
      type: 'Full-time',
      description: [
        'Developed and maintained HR platform features for mid-market companies',
        'Built responsive web applications using React and Redux for complex workforce management',
        'Collaborated with product and design teams to deliver user-centered solutions'
      ],
      achievements: [
        'Delivered key payroll and benefits management features used by 200,000+ employees',
        'Improved application performance by 50% through React optimization and lazy loading',
        'Led migration from legacy jQuery codebase to modern React architecture',
        'Mentored junior developers and conducted technical interviews'
      ],
      technologies: ['React', 'Redux', 'JavaScript', 'Ruby on Rails', 'PostgreSQL', 'CSS3'],
      teamSize: '3-4 Engineers',
      impact: '200,000+ employees'
    },
    {
      id: 'movinga',
      company: 'Movinga',
      companyUrl: 'https://www.movinga.de',
      position: 'Frontend Developer',
      period: '2017 - 2018',
      location: 'Berlin, Germany',
      type: 'Full-time',
      description: [
        'Built customer-facing web applications for moving and logistics platform',
        'Implemented responsive designs and interactive booking flows',
        'Worked in agile environment with international team across multiple time zones'
      ],
      achievements: [
        'Developed complete booking system frontend increasing conversion rate by 25%',
        'Created reusable component library reducing development time by 30%',
        'Implemented multi-language support for German and English markets',
        'Optimized mobile experience leading to 40% increase in mobile bookings'
      ],
      technologies: ['React', 'JavaScript', 'Sass', 'Webpack', 'PHP', 'MySQL'],
      teamSize: '2-3 Engineers',
      impact: 'European market'
    },
    {
      id: 'freelance',
      company: 'Independent Contractor',
      companyUrl: '',
      position: 'Full-stack Developer',
      period: '2015 - 2017',
      location: 'Belarus / Remote',
      type: 'Freelance',
      description: [
        'Delivered end-to-end web solutions for startups and small businesses',
        'Specialized in React frontend development and Node.js backend integration',
        'Managed complete project lifecycle from requirements to deployment'
      ],
      achievements: [
        'Successfully delivered 15+ projects ranging from e-commerce to SaaS platforms',
        'Built and maintained client relationships across US and European markets',
        'Developed expertise in full-stack JavaScript and modern deployment practices',
        'Achieved 100% client satisfaction rate with all projects delivered on time'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'CSS3'],
      teamSize: 'Solo developer',
      impact: '15+ successful projects'
    },
    {
      id: 'epam',
      company: 'EPAM Systems',
      companyUrl: 'https://www.epam.com',
      position: 'Software Engineer',
      period: '2009 - 2015',
      location: 'Minsk, Belarus',
      type: 'Full-time',
      description: [
        'Started career as junior developer and progressed to senior engineer',
        'Worked on enterprise applications for Fortune 500 clients',
        'Gained experience across multiple technologies and development methodologies'
      ],
      achievements: [
        'Progressed from Junior to Senior Engineer within 6 years',
        'Led development of critical features for major financial services client',
        'Contributed to multiple successful project deliveries worth $10M+',
        'Received "Outstanding Performance" award for exceptional client satisfaction'
      ],
      technologies: ['Java', 'JavaScript', 'Spring', 'Hibernate', 'Oracle', 'HTML/CSS'],
      teamSize: '8-12 Engineers',
      impact: 'Enterprise scale'
    }
  ];

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  return (
    <MotionSection id="work-history" className="relative py-32 px-4 overflow-hidden">
      {/* Background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff006e' stroke-width='0.5'%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3Ccircle cx='30' cy='30' r='25'/%3E%3Ccircle cx='30' cy='30' r='15'/%3E%3Ccircle cx='30' cy='30' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
        animate={{
          x: mouseXPercent * -2,
          y: mouseYPercent * -1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
          animate={{
            x: mouseXPercent * 5,
          }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <motion.h2 
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Professional Journey
          </motion.h2>
          <motion.p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            15 years of engineering excellence across global markets, from startup environments to enterprise-scale platforms.
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <MotionFadeIn
              key={exp.id}
              className="relative"
              animateStyle={{ x: mouseXPercent * (index % 2 === 0 ? 2 : -2) }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <motion.div
                className="cyber-glass-purple rounded-xl p-8 cursor-pointer transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 40px rgba(131, 56, 236, 0.3)',
                }}
                onClick={() => toggleExpanded(exp.id)}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.h3 
                        className="text-2xl font-bold"
                        style={{ color: '#ffffff' }}
                        whileHover={{ color: '#8338ec' }}
                      >
                        {exp.position}
                      </motion.h3>
                      {exp.companyUrl && (
                        <motion.a
                          href={exp.companyUrl}
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                          Visit
                        </motion.a>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" style={{ color: '#8338ec' }} />
                        <span style={{ color: '#8338ec', fontWeight: 600 }}>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    {exp.teamSize && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" style={{ color: '#00ff88' }} />
                        <span style={{ color: '#00ff88' }}>{exp.teamSize}</span>
                      </div>
                    )}
                    {exp.impact && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" style={{ color: '#00d4ff' }} />
                        <span style={{ color: '#00d4ff' }}>{exp.impact}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Brief Description */}
                <div className="mb-6">
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {exp.description[0]}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{
                        background: 'rgba(131, 56, 236, 0.3)',
                        color: '#ffffff',
                        border: '1px solid rgba(131, 56, 236, 0.5)',
                      }}
                      whileHover={{
                        background: 'rgba(131, 56, 236, 0.5)',
                        scale: 1.05,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Expand/Collapse Indicator */}
                <div className="flex justify-center">
                  <motion.div
                    className="w-8 h-1 rounded-full"
                    style={{ background: 'rgba(131, 56, 236, 0.5)' }}
                    animate={{
                      scaleX: expandedId === exp.id ? 2 : 1,
                      background: expandedId === exp.id ? '#8338ec' : 'rgba(131, 56, 236, 0.5)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedId === exp.id ? 'auto' : 0,
                    opacity: expandedId === exp.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-white/10 mt-6">
                    {/* Full Description */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>
                        Role Overview
                      </h4>
                      <div className="space-y-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {exp.description.map((desc, descIndex) => (
                          <p key={descIndex}>
                            • {desc}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3" style={{ color: '#ffffff' }}>
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <MotionSlideIn
                            key={achIndex}
                            delay={achIndex * 0.1}
                            direction="left"
                          >
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                              🚀 {achievement}
                            </p>
                          </MotionSlideIn>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </MotionFadeIn>
          ))}
        </div>

        {/* Career Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="cyber-glass-purple rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4 text-white">
              Career Highlights
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">15+</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">5</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Countries Worked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">20+</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">Millions</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Users Impacted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
