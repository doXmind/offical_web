import React from 'react';
import { motion } from 'framer-motion';

const StepGuide = ({ steps, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start gap-4"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white text-sm flex items-center justify-center font-medium">
            {index + 1}
          </div>
          <div className="flex-1 pt-1">
            <h5 className="font-medium text-white mb-1">{step.title}</h5>
            <p className="text-sm text-gray-400">{step.description}</p>
            {step.tip && (
              <p className="text-xs text-gray-500 mt-2 pl-3 border-l border-white/10">
                {step.tip}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StepGuide;
