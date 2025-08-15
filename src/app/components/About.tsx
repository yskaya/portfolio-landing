import { m } from 'motion/react';
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Code2, Globe, Award, Users } from 'lucide-react';
import { HoverGlowCard } from '../graphs/HoverGlowCard';

const highlights = [
  { icon: Code2, title: "15+ Years Experience", desc: "Full-stack mastery" },
  { icon: Globe, title: "Global Journey", desc: "Belarus → Berlin → NYC → LA" },
  { icon: Award, title: "AI Innovation", desc: "Cutting-edge solutions" },
  { icon: Users, title: "Team Leadership", desc: "Mentoring & scaling" }
];

const cl = [
  { content: `I earned a <strong>Master's in Computer Design Engineering</strong> — not in software, but in systems, structure, and logic.
                That mindset has shaped a <strong>15-year journey</strong> across web development: from backend frameworks to CI/CD
                pipelines and infrastructure. I've lived and worked in <strong>Belarus, Berlin, New York</strong>, and now <strong>Los Angeles</strong> —
                contributing across tech stacks and product stages in early-stage startups and global organizations.`},
  { content: `I've grown with <strong>the web</strong> — from no-syntax editors and hand-coded HTML to modern UIs and scalable microservices;
                from raw SQL and on-prem development to cloud infrastructures, Docker and Kubernetes; from tightly coupled
                monoliths to modular, distributed systems. Each shift has refined <strong>how I build</strong> — and <strong>how I rebuild better</strong>. I’ve worked
                across diverse products — file-sharing systems, payroll platforms to edtech, collaboration tools, and AI apps.
                I’ve designed systems from the ground up and restructured legacy code for clarity and scale.`},
  { content: `As a <strong>Staff Frontend Engineer</strong>, I've helped to <strong>form engineering teams, shape hiring practices</strong>, and
                <strong>drive development strategies</strong> at scale. I've led <strong>legacy decoupling, defined architectural evolution</strong>,
                and <strong>established coding standards</strong> across cross-functional teams. I've worked closely with product and platform teams,
                <strong>mentored engineers</strong>, and remained <strong>a consistent contributor</strong> to the codebase — combining strategy with hands-on execution.`},
]

export function About() {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();

  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 2;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 2;


  return (
    <section className="relative py-32 px-4 overflow-hidden">

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-16">
            <m.h2 
              className="text-4xl md:text-5xl font-bold mb-16 text-white relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              The Evolution
              
              <m.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-white via-gray-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </m.h2>
            
            <div className="space-y-8 text-gray-300">
              {cl.map((s, index) => (
                <MotionFadeIn key={index} as="p" delay={(index + 1) * 0.2}>
                  {s.content}
                </MotionFadeIn>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <m.div
              className="relative h-full rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              
              <img src="./T__08280.JPG" />
            </m.div>
          </div>
        </div>

        {/* Highlights Grid */}
        <m.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {highlights.map((item, index) => (
            <HoverGlowCard
              key={index}
              className="text-center p-6 rounded-xl relative"
            >
              <item.icon className="h-6 w-6 text-white" />
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </HoverGlowCard>
          ))}
        </m.div>

       
      </div>
    </section>
  );
}