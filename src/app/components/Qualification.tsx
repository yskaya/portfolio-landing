import { m } from 'motion/react';
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { Badge } from "../ui/badge";
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { Code, Database, Cloud, Zap, Wrench, TestTube } from 'lucide-react';
import { useData } from '../context/DataContext';

export function Qualification() {
  const scrollY = useScrollPosition();
  const mousePosition = useMousePosition();
  const { skills } = useData();

  const mouseXPercent = (mousePosition.x / window.innerWidth - 0.5) * 2;
  const mouseYPercent = (mousePosition.y / window.innerHeight - 0.5) * 2;

  const iconMap: Record<string, any> = {
    'Languages & Core': Code,
    'Frontend': Code,
    'Backend': Database,
    'APIs': Database,
    'Architecture patterns': Cloud,
    'CI/CD': Wrench,
    'Cloud & Infra': Cloud,
    'Build': Wrench,
    'Markup & Styling': Code,
    'AI Integration': Zap,
    'Testing': TestTube,
    'Other FE Frameworks': Zap,
    'Other Backend': Database,
  };

  const skillCategories = skills.skills.map((cat) => ({
    title: cat.category_name,
    icon: iconMap[cat.category_name] || Code,
    skills: cat.technologies,
    color: 'from-blue-500/20 to-cyan-500/20',
  }));

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      

      <div className="max-w-6xl mx-auto relative z-10">
        <MotionFadeIn
          as="h2"
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white relative"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        >
          Qualification

          {/* Animated circuit lines */}
          <m.div
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


        


        {/* Experience highlight */}
        <m.div 
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
        </m.div>
      </div>
    </section>
  );
}