import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';
import { useData } from '../context/DataContext';

export function QualificationAndHighlights() {
  const { skills, intro } = useData();
  const qualifications = skills.qualification || [];
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
          Qualifications & Career Highlights
        </AnimatedHeadline>

        <div className="mt-10 space-y-8">
          {/* Qualifications */}
          <MotionFadeIn
            as="div"
            className="text-center"
          >
            <div className="cyber-glass-purple cyber-glass-purple-box rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-white">Qualifications</h3>
              <ul className="space-y-3 text-gray-300 max-w-4xl mx-auto">
                {qualifications.map((qual, index) => (
                  <li key={index} className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {qual}
                  </li>
                ))}
              </ul>
            </div>
          </MotionFadeIn>

          {/* Career Highlights */}
          <MotionFadeIn
            as="div"
            delay={0.2}
          >
            <div className="cyber-glass-purple cyber-glass-purple-box rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-white text-center">Career Highlights</h3>
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
      </div>
    </section>
  );
}

