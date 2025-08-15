import { MotionFadeIn } from "../graphs/MotionFadeIn";
import { AnimatedHeadline } from '../graphs/AnimatedHeadline';

export function Qualification() {
  
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
              <li>Driving frontend architecture for large-scale platforms</li>
              <li>Building reusable modules and internal libraries</li>
              <li>Leading modernization efforts — from monolith-to-SPA transitions</li>
              <li>Defining engineering workflows including CI/CD pipelines</li>
              <li>Owning delivery across the stack (primarily frontend)</li>
              <li>Mentoring engineers through code reviews and POCs</li>
              <li>Collaborating internationally across hybrid teams</li>
              <li>Contributing to hiring and process improvements</li>
            </ul>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
}