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