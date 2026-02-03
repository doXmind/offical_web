import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Users, Zap, Globe } from 'lucide-react';

// Stats data - these can be updated with real metrics
const stats = [
  {
    id: 'documents',
    value: 10000,
    suffix: '+',
    label: 'Documents Created',
    icon: FileText,
  },
  {
    id: 'users',
    value: 500,
    suffix: '+',
    label: 'Beta Users',
    icon: Users,
  },
  {
    id: 'edits',
    value: 50000,
    suffix: '+',
    label: 'AI Edits Made',
    icon: Zap,
  },
  {
    id: 'countries',
    value: 30,
    suffix: '+',
    label: 'Countries',
    icon: Globe,
  },
];

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  // Format number with commas
  const formattedCount = count.toLocaleString();

  return (
    <span ref={ref}>
      {formattedCount}
      {suffix}
    </span>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center p-4 md:p-6"
    >
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 light:bg-black/5 border border-white/10 light:border-black/10 mb-3 md:mb-4">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white/70 light:text-black/70" />
      </div>

      {/* Value */}
      <div className="text-2xl md:text-4xl font-light text-white light:text-gray-900 mb-1 md:mb-2">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </div>

      {/* Label */}
      <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 border-y border-white/5 light:border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
