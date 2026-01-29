import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SpotlightOverlay - Focus/vignette effect
 *
 * Creates a spotlight effect that darkens the area around a focal point,
 * drawing attention to specific UI elements.
 *
 * @param {Object} props
 * @param {boolean} props.isActive - Whether spotlight is visible
 * @param {Object} props.spotlight - Spotlight configuration
 * @param {number} props.spotlight.x - Center X position (0-100%)
 * @param {number} props.spotlight.y - Center Y position (0-100%)
 * @param {number} props.spotlight.width - Light area width (0-100%)
 * @param {number} props.spotlight.height - Light area height (0-100%)
 * @param {number} props.intensity - Darkness intensity (0-1, default 0.6)
 */
const SpotlightOverlay = ({
  isActive,
  spotlight,
  intensity = 0.6,
}) => {
  if (!spotlight) return null;

  const {
    x = 50,
    y = 50,
    width = 30,
    height = 30,
  } = spotlight;

  // Create radial gradient for spotlight effect
  // Inner area is transparent, outer area darkens with smooth gradient
  // Multiple stops ensure a professional, film-like vignette effect
  const gradientStyle = {
    background: `radial-gradient(
      ellipse ${width}% ${height}% at ${x}% ${y}%,
      transparent 0%,
      transparent 45%,
      rgba(0, 0, 0, ${intensity * 0.15}) 55%,
      rgba(0, 0, 0, ${intensity * 0.35}) 65%,
      rgba(0, 0, 0, ${intensity * 0.55}) 75%,
      rgba(0, 0, 0, ${intensity * 0.75}) 85%,
      rgba(0, 0, 0, ${intensity * 0.9}) 92%,
      rgba(0, 0, 0, ${intensity}) 100%
    )`,
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={gradientStyle}
        />
      )}
    </AnimatePresence>
  );
};

export default SpotlightOverlay;
