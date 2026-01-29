import React from 'react';
import { motion } from 'framer-motion';

/**
 * CameraLayer - Virtual camera system for zoom effects
 *
 * Uses ONLY scale + transformOrigin for positioning (no translate).
 * This ensures the camera zooms directly into the target area without distortion.
 *
 * How it works:
 * - originX/originY sets the focal point (0-1, where 0.5 is center)
 * - scale zooms into that focal point
 * - The content appears to "zoom into" the area specified by origin
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to wrap
 * @param {Object} props.cameraState - Camera position configuration
 * @param {Object} props.transition - Framer Motion transition config
 * @param {boolean} props.isExportMode - Use linear transitions for video export
 */
const CameraLayer = ({
  children,
  cameraState,
  transition,
  isExportMode = false,
}) => {
  const {
    scale = 1,
    originX = 0.5,
    originY = 0.5,
  } = cameraState || {};

  // Use linear transition for video export to ensure frame consistency
  const exportTransition = {
    type: 'tween',
    duration: 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  };

  const activeTransition = isExportMode ? exportTransition : transition;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className="w-full h-full"
        animate={{ scale }}
        transition={activeTransition}
        style={{
          transformOrigin: `${originX * 100}% ${originY * 100}%`,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CameraLayer;
