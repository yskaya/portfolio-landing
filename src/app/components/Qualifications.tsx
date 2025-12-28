import { m } from 'motion/react';
import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { useData } from '../context/DataContext';

export function Qualifications() {
  const { intro, skills } = useData();

  // Use qualification_section from intro if available, otherwise use skills.qualification
  const qualificationSection = intro.qualification_section;
  const qualificationContent = qualificationSection?.content || (skills.qualification || []).map(q => ({ content: q }));
  const qualificationTitle = qualificationSection?.title || 'Qualifications';
  const careerHighlights = intro.career_highlights || {
    years_experience: '15+',
    countries_worked: '5',
    projects_delivered: '20+',
    users_impacted: 'Millions'
  };

  if (!qualificationContent || qualificationContent.length === 0) {
    return null;
  }

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <m.h2 
          className="text-4xl md:text-5xl font-bold mb-12 text-white relative inline-block text-center w-full holographic"
          style={{ lineHeight: 2 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {qualificationTitle}
          
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
        
        <div className="space-y-6 text-gray-300 mb-16 text-center">
          {qualificationContent.map((s, index) => (
            <MotionFadeIn key={index} as="p" delay={(index + 1) * 0.15} className="text-lg">
              <span dangerouslySetInnerHTML={{ __html: typeof s === 'string' ? s : s.content }} />
            </MotionFadeIn>
          ))}
        </div>

        {/* Career Highlights Grid */}
        <m.div 
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="rounded-xl p-8 backdrop-blur-md border" style={{
            background: 'rgba(20, 20, 30, 0.4)',
            borderColor: 'rgba(131, 56, 236, 0.2)',
          }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.years_experience}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.countries_worked}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Countries Worked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.projects_delivered}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.users_impacted}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Users Impacted</div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

