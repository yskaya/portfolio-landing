import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';
import { useData } from '../context/DataContext';

export function Qualification() {
  const { skills } = useData();
  const qualifications = skills.qualification || [];
  
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedHeadline>
          Qualification
        </AnimatedHeadline>

        <MotionFadeIn
          as="div"
          className="mt-10 text-center"
        >
          <div className="max-w-4xl mx-auto p-8">
            <ul className="space-y-2 text-gray-300">
              {qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}