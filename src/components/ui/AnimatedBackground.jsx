import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';

/**
 * AnimatedBackground - 微妙的背景动画效果
 * 用于 Hero 区域，增加视觉层次感
 */
const AnimatedBackground = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-white/[0.02] light:from-black/[0.02] to-transparent blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tl from-white/[0.02] light:from-black/[0.02] to-transparent blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid pattern - hidden in light mode */}
      <div
        className="absolute inset-0 opacity-[0.015] light:hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Grid pattern - light mode */}
      <div
        className="absolute inset-0 opacity-[0.03] hidden light:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
};

/**
 * GlowEffect - 跟随鼠标的微光效果
 */
export const GlowEffect = ({ className = '' }) => {
  const glowRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;

      const rect = glowRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowRef.current.style.setProperty('--mouse-x', `${x}px`);
      glowRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(
          600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'},
          transparent 40%
        )`,
      }}
    />
  );
};

/**
 * FloatingParticles - 浮动粒子效果
 */
export const FloatingParticles = ({ count = 20, className = '' }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/10 light:bg-black/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
