import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, MapPin, Linkedin } from "lucide-react";
import { m } from 'motion/react';
import { useData } from '../context/DataContext';

export function Contact() {
  const { intro } = useData();
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <m.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let's Build Something Together
        </m.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {intro.about || 'TBD'}
            </p>

            <div className="mb-8">
              <p className="text-gray-300 mb-4">
                {intro.short_description || 'TBD'}
              </p>
            </div>
            
            <div className="space-y-4">
              <m.div 
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Mail className="h-5 w-5" />
                <a href={intro.links?.email ? `mailto:${intro.links.email}` : '#'} className="hover:text-white transition-colors">
                  {intro.links?.email || 'TBD'}
                </a>
              </m.div>
              <m.div 
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Linkedin className="h-5 w-5" />
                <a
                  href={intro.links?.linkedin || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {intro.links?.linkedin || 'TBD'}
                </a>
              </m.div>
              <m.div 
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <MapPin className="h-5 w-5" />
                <span>{intro.location || 'TBD'}</span>
              </m.div>
            </div>

            <m.div 
              className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm italic">
                "Whether guiding a team, untangling a legacy system, or building something from scratch, 
                I bring clarity to complexity — and momentum to code."
              </p>
              <p className="text-gray-500 text-xs mt-2">— From my cover letter</p>
            </m.div>
          </m.div>
          
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
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
          </m.div>
        </div>

        {/* Call to action */}
        <m.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
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
        </m.div>
      </div>
    </section>
  );
}