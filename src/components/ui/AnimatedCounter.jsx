import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    damping: 30,
    stiffness: 50,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};

export default AnimatedCounter;
