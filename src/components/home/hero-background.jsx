import { useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronGrid } from "./chevron-grid";

export function HeroBackground({ children }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  const spotlightX = useTransform(smoothX, [0, 1], ["-10%", "70%"]);
  const spotlightY = useTransform(smoothY, [0, 1], ["-5%", "60%"]);

  const blob2X = useTransform(smoothX, [0, 1], ["60%", "20%"]);
  const blob2Y = useTransform(smoothY, [0, 1], ["50%", "10%"]);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-clip"
      onMouseMove={handleMouseMove}
    >
      {/* Ambient mesh blobs */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 -top-20 h-[600px] w-[700px] rounded-full bg-blue-600/[0.12] blur-[120px]" />
        <div className="absolute -right-10 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.10] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
      </div>

      {/* Interactive chevron grid */}
      <ChevronGrid />

      {/* Mouse-following glow */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-blue-400/[0.08] blur-[150px]"
        style={{ left: spotlightX, top: spotlightY }}
      />

      {/* Secondary parallax blob */}
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-indigo-400/[0.06] blur-[130px]"
        style={{ left: blob2X, top: blob2Y }}
      />

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
