import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * HookSequence - Pain-point contrast opening for maximum emotional impact
 *
 * Phase 0 (0-1.5s): Pain point - "Research paper due tomorrow..."
 * Phase 1 (1.5-2s): Transition - "Or..."
 * Phase 2 (2-3s): Solution reveal - Stats with countUp effect
 */

// Animated counter component
const CountUp = ({ end, duration = 0.5, suffix = '' }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const HookSequence = ({ progress = 0 }) => {
  // Progress 0-1 over 3 seconds
  // Phase 0: 0-0.5 (0-1.5s) - Pain point
  // Phase 1: 0.5-0.67 (1.5-2s) - Transition
  // Phase 2: 0.67-1 (2-3s) - Solution

  const phase = useMemo(() => {
    if (progress < 0.5) return 'pain';
    if (progress < 0.67) return 'transition';
    return 'solution';
  }, [progress]);

  const painProgress = Math.min(progress / 0.5, 1);
  const transitionProgress = progress >= 0.5 ? Math.min((progress - 0.5) / 0.17, 1) : 0;
  const solutionProgress = progress >= 0.67 ? Math.min((progress - 0.67) / 0.33, 1) : 0;

  // Pain point texts
  const painTexts = [
    { text: 'Research paper due tomorrow', delay: 0 },
    { text: '12 hours of work', delay: 0.15 },
    { text: 'Still on the first draft', delay: 0.3 },
  ];

  // Solution stats
  const stats = [
    { value: 3247, label: 'words', color: 'text-white', suffix: '' },
    { value: 8, label: 'citations', color: 'text-green-400', suffix: '' },
    { value: 4, label: 'sources', color: 'text-purple-400', suffix: '' },
    { value: 60, label: 'seconds', color: 'text-blue-400', suffix: 's' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic background based on phase */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: phase === 'pain'
            ? 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.08) 0%, rgba(0,0,0,1) 60%)'
            : phase === 'transition'
            ? 'radial-gradient(circle at 50% 50%, rgba(100, 100, 100, 0.05) 0%, rgba(0,0,0,1) 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(0,0,0,1) 60%)'
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated pulse effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: phase === 'pain'
            ? [
                'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.03) 0%, transparent 40%)',
                'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.03) 0%, transparent 40%)',
              ]
            : [
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 40%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 55%)',
                'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 40%)',
              ]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Phase 0: Pain Point (0-1.5s) */}
      <AnimatePresence>
        {phase === 'pain' && (
          <motion.div
            key="pain"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              {/* Abstract desk scene - minimalist lines */}
              <motion.div
                className="mb-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: painProgress > 0.1 ? 0.3 : 0 }}
              >
                <svg width="120" height="60" viewBox="0 0 120 60" className="text-red-500/30">
                  {/* Desk outline */}
                  <motion.line
                    x1="10" y1="50" x2="110" y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: painProgress > 0.1 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Laptop shape */}
                  <motion.path
                    d="M35 50 L35 30 L85 30 L85 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: painProgress > 0.2 ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                  {/* Screen content lines */}
                  <motion.line
                    x1="42" y1="36" x2="78" y2="36"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: painProgress > 0.3 ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <motion.line
                    x1="42" y1="42" x2="65" y2="42"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: painProgress > 0.35 ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  />
                  {/* Coffee cup */}
                  <motion.circle
                    cx="100" cy="45" r="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: painProgress > 0.4 ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  />
                </svg>
              </motion.div>

              {/* Pain point texts */}
              <div className="space-y-3">
                {painTexts.map((item, idx) => (
                  <motion.p
                    key={idx}
                    className={`text-xl md:text-2xl font-light ${idx === 2 ? 'text-red-400/90' : 'text-gray-400'}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: painProgress > item.delay + 0.1 ? 1 : 0,
                      y: painProgress > item.delay + 0.1 ? 0 : 15
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {item.text}
                  </motion.p>
                ))}
              </div>

              {/* Stress indicator - subtle */}
              <motion.div
                className="mt-6 flex justify-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: painProgress > 0.6 ? 0.5 : 0 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-red-500/50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Transition "Or..." (1.5-2s) */}
      <AnimatePresence>
        {phase === 'transition' && (
          <motion.div
            key="transition"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="text-5xl md:text-6xl font-light text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.3,
                type: 'spring',
                stiffness: 200
              }}
            >
              Or...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Solution Reveal (2-3s) */}
      <AnimatePresence>
        {phase === 'solution' && (
          <motion.div
            key="solution"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              {/* Statistics Grid */}
              <motion.div
                className="grid grid-cols-4 gap-4 md:gap-8 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.08,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <div className={`text-3xl md:text-5xl font-bold ${stat.color}`}>
                      {solutionProgress > 0.2 ? (
                        <CountUp end={stat.value} duration={0.5} suffix={stat.suffix} />
                      ) : (
                        <span>0{stat.suffix}</span>
                      )}
                    </div>
                    <motion.div
                      className="text-xs md:text-sm text-gray-500 mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto mb-4"
                initial={{ width: 0 }}
                animate={{ width: solutionProgress > 0.4 ? 280 : 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />

              {/* Tagline */}
              <motion.p
                className="text-lg md:text-xl text-gray-400 font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: solutionProgress > 0.5 ? 1 : 0,
                  y: solutionProgress > 0.5 ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                One AI. One minute. <span className="text-blue-400">Done.</span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations */}
      <motion.div
        className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2"
        style={{
          borderColor: phase === 'pain' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.1 ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2"
        style={{
          borderColor: phase === 'pain' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0.1 ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      />
    </div>
  );
};

export default HookSequence;
