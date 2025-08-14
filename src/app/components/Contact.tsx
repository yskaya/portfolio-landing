import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, MapPin, Linkedin } from "lucide-react";
import { m } from "motion/react";
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { MotionSlideIn } from "../graphs/MotionSlideIn";
import { useData } from '../context/DataContext';

const links = [
  { label: 'yulia.kanapatskaya@gmail.com', link: 'mailto:yulia.kanapatskaya@gmail.com', component: Mail},
  { label: 'linkedin.com/in/yskaya', link: 'https://linkedin.com/in/yskaya', component: Linkedin}
];

export function Contact() {
  const { intro } = useData();
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <MotionFadeIn
          as="h2"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
        >
          Let's Build Something Together
        </MotionFadeIn>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionSlideIn direction="left">
            <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              I'm seeking a long-term <strong>Senior / Staff Software Engineer</strong> role — with a Frontend focus —
              where <strong>architectural leadership</strong> and <strong>hands-on contribution</strong> are both valued.
              I'm drawn to teams that prioritize <strong>modular systems, scalable architecture</strong>, and
              <strong>clear, maintainable code</strong>.
            </p>

            <div className="mb-8">
              <p className="text-gray-300 mb-4">
                I want to join a culture that respects thoughtful decision-making and long-term craft. 
                I'm not looking for just a job — I'm looking for a new chapter: a place where product and people are built to last… 
                and <strong>equity don't expire before the mission is done</strong>.
              </p>
            </div>
            
            <div className="space-y-4">
              {links.map((l, index) => {
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </m.div>
                );
              })}
            </div>

            
          </MotionSlideIn>

          <MotionSlideIn direction="right" delay={0.2}>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-gray-300">
                  Let's discuss opportunities and collaborations
                </CardDescription>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionFadeIn
            className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10"
            delay={0.3}
          >
            <p className="text-gray-400 text-sm italic">
              "Whether guiding a team, untangling a legacy system, or building something from scratch,
              I bring clarity to complexity — and momentum to code."
            </p>
            <p className="text-gray-500 text-xs mt-2">— From my cover letter</p>
          </MotionFadeIn>
        </div>

        {/* Call to action */}
        <MotionFadeIn className="text-center mt-16" delay={0.4}>
          <p className="text-xl text-gray-300 mb-6">
            Ready to build something that lasts?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg" 
              className="bg-white text-black hover:bg-gray-200"
              asChild
            >
              <a href={intro.links?.email ? `mailto:${intro.links.email}` : '#'}>
                <Mail className="mr-2 h-5 w-5" />
                Email Me
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <a href={intro.links?.linkedin || '#'} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </MotionFadeIn>

        
      </div>
    </section>
  );
}