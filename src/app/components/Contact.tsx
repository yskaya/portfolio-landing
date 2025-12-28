import { Mail, Linkedin, Download } from "lucide-react";
import { m } from "motion/react";
import { MotionSlideIn } from "../graphs/MotionSlideIn";
import { useData } from '../context/DataContext';

export function Contact() {
  const { intro } = useData();
  
  const downloadLinks = [
    { 
      label: 'Download Resume', 
      link: '/Resume_Yulia_Kanapatskaya_2026.pdf.pdf',
      component: Download,
      download: 'Resume_Yulia_Kanapatskaya_2026.pdf'
    },
    { 
      label: 'Download Cover Letter', 
      link: '/CL_Yulia_Kanapatskaya_2026.pdf',
      component: Download,
      download: 'CL_Yulia_Kanapatskaya_2026.pdf'
    }
  ];

  const contactLinks = [
    {
      label: 'Connect on LinkedIn',
      link: intro.links?.linkedin || 'https://linkedin.com/in/yskaya',
      component: Linkedin
    },
    {
      label: intro.links?.email || 'yulia.kanapatskaya@gmail.com',
      link: intro.links?.email ? `mailto:${intro.links.email}` : 'mailto:yulia.kanapatskaya@gmail.com',
      component: Mail
    }
  ];
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <m.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-white relative inline-block text-center w-full holographic"
          style={{ lineHeight: 2 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Get In Touch
          
          <m.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1"
            style={{ 
              width: '80%',
              background: 'linear-gradient(90deg, transparent, currentColor, transparent)',
            }}
            animate={{
              scaleX: [0, 1, 0],
              color: ['#00d4ff', '#ff006e', '#8338ec', '#00ff88', '#00d4ff'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 2,
              ease: 'easeInOut',
            }}
          />
        </m.h2>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <MotionSlideIn direction="left">
            <div className="space-y-12">
              {/* Contact Text */}
              {intro.contact_text && (
                <div className="text-center space-y-4">
                  {intro.contact_text.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Links - Single Column */}
              <div className="flex flex-col items-center gap-6">
                {contactLinks.map((l, index) => {
                  const Component = l.component;
                  return (
                    <m.a
                      key={index}
                      href={l.link}
                      target={l.link.startsWith('http') ? '_blank' : '_self'}
                      rel={l.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Component className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="text-lg">{l.label}</span>
                    </m.a>
                  );
                })}
                {downloadLinks.map((l, index) => {
                  const Component = l.component;
                  return (
                    <m.a
                      key={index}
                      href={l.link}
                      download={l.download}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Component className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="text-lg">{l.label}</span>
                    </m.a>
                  );
                })}
              </div>
            </div>
          </MotionSlideIn>
        </div>
      </div>
    </section>
  );
}