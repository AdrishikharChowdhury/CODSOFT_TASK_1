"use client"
import GradientWaves from '../GradientWaves';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <GradientWaves
        horizonColor="#4da2ff"
        waveColor="#e9ccff"
        crestColor="#ffffff"
        speed={0.4}
        amplitude={2.5}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={1}
        height={5.5}
        fogDepth={15}
        detail="medium"
        brightness={1}
        opacity={1}
        mouseInteraction
        parallaxStrength={0.5}
        grain
        grainIntensity={0.05}
      />
    </div>
  );
}