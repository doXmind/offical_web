import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, ArrowRight, CheckCircle, Loader2, Type, Sparkles, MessageSquare, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const FileImportMock = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show file
      setTimeout(() => setPhase(2), 1500),  // Converting
      setTimeout(() => setPhase(3), 3500),  // Complete
      setTimeout(() => setPhase(4), 4500),  // Show in editor
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const fileTypes = [
    { ext: 'PDF', color: 'text-red-400' },
    { ext: 'DOCX', color: 'text-blue-400' },
    { ext: 'MD', color: 'text-green-400' },
  ];

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
            Import File
          </div>

          {/* Supported formats */}
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {fileTypes.map((type, i) => (
              <motion.div
                key={type.ext}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-[9px] font-medium ${type.color} px-1.5 py-0.5 bg-white/5 border border-white/10 rounded`}
              >
                {type.ext}
              </motion.div>
            ))}
          </div>

          {/* Drop zone / File preview */}
          <div className="border-2 border-dashed border-white/10 rounded-lg p-3 flex flex-col items-center justify-center min-h-[100px]">
            {phase < 1 && (
              <div className="text-center">
                <Upload className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                <p className="text-[9px] text-gray-500">Drop file to import</p>
              </div>
            )}

            {phase >= 1 && phase < 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-12 h-14 bg-red-500/10 border border-red-500/30 rounded mx-auto mb-1 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-400/60" />
                </div>
                <p className="text-[9px] text-white">report.pdf</p>
              </motion.div>
            )}

            {/* Converting indicator */}
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-center"
              >
                <div className="flex items-center gap-1 justify-center text-[8px] text-gray-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Converting...</span>
                </div>
                <motion.div
                  className="w-20 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-white/60 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                  />
                </motion.div>
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 flex items-center gap-1 text-[9px] text-green-400"
              >
                <CheckCircle className="w-3 h-3" />
                <span>Complete!</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-white/10 flex items-center gap-3">
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

          <div className="flex-1 p-4">
            {phase >= 4 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-sm font-medium text-white mb-3">report.md</h2>
                <div className="space-y-2 text-xs text-gray-400">
                  <p className="font-medium text-white"># Annual Report 2024</p>
                  <p>This document provides an overview of our company's performance...</p>
                  <p className="font-medium text-white mt-3">## Key Highlights</p>
                  <p>- Revenue increased by 25%</p>
                  <p>- Customer base grew to 1M users</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white/20 mb-2" />
                <p className="text-[10px] text-gray-600">Imported content will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel - matches MockChatPanel */}
        <div className="w-48 h-full border-l border-white/10 bg-white/[0.02] flex flex-col">
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 font-medium">AI Assistant</span>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-hidden">
            <div className="flex">
              <div className="max-w-[90%] px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg rounded-bl-sm">
                <p className="text-[10px] text-gray-300 leading-relaxed">
                  I can help you analyze and edit imported documents.
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-3 py-2 border-t border-white/10">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg">
              <MessageSquare className="w-3 h-3 text-gray-600" />
              <span className="text-[10px] text-gray-600 flex-1">Ask anything...</span>
              <Send className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </GuideMockContainer>
  );
};

export default FileImportMock;
