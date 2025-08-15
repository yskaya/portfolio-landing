import { GraphGeometry } from './GraphGeometry';
import { BgPattern1 } from './BgPattern1';
import { GraphLights } from './GraphLights';
import { GraphMatrixRain } from './GraphMatrixRain';
import { GraphPulsingDots } from './GraphPulsingDots';

export function AnimatedBackground() {

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <BgPattern1 />

      <GraphGeometry />

      <GraphLights />

      <GraphMatrixRain />

      <GraphPulsingDots />
     
    </div>
  );
}