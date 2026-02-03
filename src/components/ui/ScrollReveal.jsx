import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal - 滚动触发淡入动画组件
 *
 * @param {React.ReactNode} children - 子元素
 * @param {number} delay - 延迟时间 (秒)
 * @param {number} duration - 动画时长 (秒)
 * @param {number} threshold - 触发阈值 (0-1)
 * @param {string} className - 容器 CSS 类名
 * @param {boolean} once - 是否只播放一次
 * @param {'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur'} variant - 动画类型
 */
const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  className = '',
  once = true,
  variant = 'slide-up',
  as: Component = 'div',
}) => {
  const variants = {
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    'slide-right': {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    'blur': {
      hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    },
  };

  const selectedVariant = variants[variant] || variants['slide-up'];
  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing
      }}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * StaggerContainer - 子元素依次入场的容器
 */
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.2,
}) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={container}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem - 配合 StaggerContainer 使用的子项
 */
export const StaggerItem = ({
  children,
  className = '',
  variant = 'slide-up',
}) => {
  const variants = {
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    'slide-left': {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants[variant] || variants['slide-up']}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxReveal - 带视差效果的滚动显示
 */
export const ParallaxReveal = ({
  children,
  offset = 50,
  className = '',
  once = true,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-100px' }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
