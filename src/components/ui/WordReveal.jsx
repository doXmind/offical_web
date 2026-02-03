import React from 'react';
import { motion } from 'framer-motion';

/**
 * WordReveal - 逐字显示动画组件 (Anthropic 风格)
 *
 * @param {string} text - 要显示的文本
 * @param {number} delay - 初始延迟 (秒)
 * @param {number} staggerDelay - 每个单词之间的延迟 (秒)
 * @param {string} className - 容器的 CSS 类名
 * @param {boolean} once - 是否只播放一次
 */
const WordReveal = ({
  text,
  delay = 0,
  staggerDelay = 0.08,
  className = '',
  once = true,
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * CharReveal - 逐字符显示动画组件
 * 用于更精细的效果，如 Logo 或短标题
 */
export const CharReveal = ({
  text,
  delay = 0,
  staggerDelay = 0.03,
  className = '',
  once = true,
}) => {
  const chars = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * LineReveal - 逐行显示动画组件
 * 用于段落或多行文本
 */
export const LineReveal = ({
  children,
  delay = 0,
  staggerDelay = 0.15,
  className = '',
  once = true,
}) => {
  const lines = React.Children.toArray(children);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once }}
    >
      {lines.map((line, index) => (
        <motion.div key={index} variants={child}>
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WordReveal;
