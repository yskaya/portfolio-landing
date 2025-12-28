import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Linkedin, Download } from "lucide-react";
import { m } from "motion/react";
import { MotionFadeIn } from "../graphs/MotionFadeIn";
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionSlideIn direction="left">
            
            {intro.contact_text && (
              <div className="mb-8">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {intro.contact_text}
                </p>
              </div>
            )}

            {/* Contact Links */}
            <div className="mb-8">
              <div className="space-y-4">
                {contactLinks.map((l, index) => {
                  const Component = l.component;
                  return (
                    <m.div
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Component className="h-5 w-5" />
                      <a
                        href={l.link}
                        target={l.link.startsWith('http') ? '_blank' : '_self'}
                        rel={l.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </m.div>
                  );
                })}
              </div>
            </div>

            {/* Download Links */}
            <div>
              <div className="space-y-4">
                {downloadLinks.map((l, index) => {
                  const Component = l.component;
                  return (
                    <m.div
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Component className="h-5 w-5" />
                      <a
                        href={l.link}
                        download={l.download}
                        className="hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </m.div>
                  );
                })}
              </div>
            </div>
          </MotionSlideIn>

          <MotionSlideIn direction="right" delay={0.2}>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Your Name" 
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input 
                    placeholder="Your Email" 
                    type="email"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Input 
                  placeholder="Subject" 
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Textarea 
                  placeholder="Tell me about the role, your team, and what you're building..." 
                  rows={4}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </MotionSlideIn>
        </div>
      </div>
    </section>
  );
}