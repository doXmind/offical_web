import React from 'react';
import { motion } from 'framer-motion';

const GuideMockContainer = ({
  children,
  className = '',
  aspectRatio = '16 / 10',
  showTitleBar = true,
  title = 'doXmind Editor'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`relative border border-white/10 rounded-xl bg-black overflow-hidden flex flex-col ${className}`}
      style={{
        aspectRatio,
        boxShadow: '0 0 40px rgba(255, 255, 255, 0.02)',
      }}
    >
      {showTitleBar && (
        <div className="flex-shrink-0 flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
            <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
            <div className="w-2.5 h-2.5 rounded-full border border-white/20" />
          </div>
          <span className="text-[10px] text-gray-600 font-medium">{title}</span>
          <div className="w-12" />
        </div>
      )}
      <div className="flex-1 relative overflow-hidden">{children}</div>
    </motion.div>
  );
};

export default GuideMockContainer;
