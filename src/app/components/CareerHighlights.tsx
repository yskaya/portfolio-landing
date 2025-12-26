import { m } from 'motion/react';
import { useData } from '../context/DataContext';
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';
import { MotionFadeIn } from '../graphs/MotionFadeIn';

export function CareerHighlights() {
  const { intro } = useData();
  const careerHighlights = intro.career_highlights || {
    years_experience: '15+',
    countries_worked: '5',
    projects_delivered: '20+',
    users_impacted: 'Millions'
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedHeadline>
          Career Highlights
        </AnimatedHeadline>
        
        <MotionFadeIn
          as="div"
          className="mt-10"
        >
          <div className="cyber-glass-purple cyber-glass-purple-box rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.years_experience}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.countries_worked}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Countries Worked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.projects_delivered}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 holographic">{careerHighlights.users_impacted}</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Users Impacted</div>
              </div>
            </div>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}

