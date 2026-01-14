import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, BookOpen, FileText, Upload, Check, Loader2, X } from 'lucide-react';
import { MockSidebar } from '../components';

const KnowledgeBaseScene = ({ isActive = true }) => {
  const [phase, setPhase] = useState(0);
  // Phase 0: Initial - panel closed
  // Phase 1: Panel opens
  // Phase 2: File being dragged
  // Phase 3: File dropped, uploading
  // Phase 4: Processing
  // Phase 5: Indexed, show success
  // Phase 6: User asks question about document

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }

    setPhase(0);

    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setPhase(4), 3200);
    const t5 = setTimeout(() => setPhase(5), 4500);
    const t6 = setTimeout(() => setPhase(6), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isActive]);

  const documents = [
    { name: 'Product Spec.pdf', size: '2.4 MB', status: 'indexed', sections: 24 },
  ];

  return (
    <div className="flex h-full w-full bg-black absolute inset-0">
      <MockSidebar />

      <div className="flex-1 flex flex-col relative">
        {/* Toolbar */}
        <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Type className="w-3.5 h-3.5 text-gray-600" />
            <div className="flex gap-1">
              {['B', 'I', 'U'].map((btn) => (
                <div
                  key={btn}
                  className="w-6 h-6 flex items-center justify-center text-[10px] text-gray-600 border border-white/10 rounded"
                >
                  {btn}
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Base Button */}
          <div className="relative">
            <motion.button
              animate={phase >= 1 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.2 }}
              className={`
                flex items-center gap-1.5 px-2 py-1 rounded text-[10px]
                ${phase >= 1 ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5'}
              `}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Knowledge</span>
              {phase >= 5 && (
                <span className="ml-1 px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[9px]">
                  1
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <h2 className="text-sm font-medium text-white mb-3">Project Overview</h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            This document outlines the key features and requirements for our new product launch...
          </p>

          {/* Chat input showing question about document */}
          {phase >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg"
            >
              <p className="text-[10px] text-gray-400 mb-2">Ask about your documents:</p>
              <div className="flex items-center gap-2 px-2 py-1.5 bg-white/5 border border-white/20 rounded">
                <span className="text-xs text-white">What are the key features in the spec?</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-0.5 h-3 bg-white"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Knowledge Base Panel */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-2 top-12 w-56 bg-black border border-white/20 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-medium">Knowledge Base</span>
              <X className="w-3 h-3 text-gray-600 cursor-pointer hover:text-white" />
            </div>

            <div className="p-3">
              {/* Upload Zone */}
              <motion.div
                animate={phase === 2 ? {
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)'
                } : {}}
                className={`
                  border border-dashed border-white/20 rounded-lg p-3 mb-3
                  ${phase === 2 ? 'border-blue-500/50 bg-blue-500/10' : ''}
                `}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <Upload className={`w-4 h-4 ${phase === 2 ? 'text-blue-400' : 'text-gray-500'}`} />
                  <span className="text-[9px] text-gray-500">
                    {phase === 2 ? 'Drop file here' : 'Drop PDF, DOCX, PPTX'}
                  </span>
                </div>

                {/* Dragging file indicator */}
                {phase === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-blue-400" />
                      <span className="text-[9px] text-blue-400">Product Spec.pdf</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Document List */}
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-start gap-2 p-2 bg-white/5 border border-white/10 rounded">
                    <div className="w-6 h-6 bg-red-500/20 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3 h-3 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white truncate">Product Spec.pdf</p>
                      <p className="text-[9px] text-gray-500">2.4 MB</p>
                    </div>
                    <div className="flex-shrink-0">
                      {phase === 3 && (
                        <div className="flex items-center gap-1">
                          <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                          <span className="text-[9px] text-blue-400">45%</span>
                        </div>
                      )}
                      {phase === 4 && (
                        <div className="flex items-center gap-1">
                          <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                          <span className="text-[9px] text-blue-400">Processing</span>
                        </div>
                      )}
                      {phase >= 5 && (
                        <div className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-[9px] text-green-400">24 sections</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Progress bar during upload */}
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-blue-500"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseScene;
