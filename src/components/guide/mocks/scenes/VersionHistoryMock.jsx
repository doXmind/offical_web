import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, RotateCcw, ChevronRight, Plus, Minus, FileText, Type, Sparkles, MessageSquare, Send } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const VersionHistoryMock = () => {
  const [phase, setPhase] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const versions = [
    { id: 1, time: '2 min ago', changes: '+15 -3' },
    { id: 2, time: '1 hour ago', changes: '+42 -12' },
    { id: 3, time: 'Yesterday', changes: '+8 -2' },
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),   // Show versions
      setTimeout(() => { setPhase(2); setSelectedVersion(1); }, 1500),  // Select version
      setTimeout(() => setPhase(3), 2500),  // Show diff
      setTimeout(() => setPhase(4), 4000),  // Hover restore
      setTimeout(() => setPhase(5), 4500),  // Click restore
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - Version List */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] flex flex-col">
          <div className="px-3 py-2 border-b border-white/10 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">History</span>
          </div>

          <div className="flex-1 p-3 space-y-1">
            {versions.map((version, i) => (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -10 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedVersion(version.id)}
                className={`
                  p-2 rounded cursor-pointer transition-colors
                  ${selectedVersion === version.id
                    ? 'bg-white/10 border border-white/20'
                    : 'hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white">{version.time}</span>
                  <ChevronRight className={`w-3 h-3 transition-opacity ${selectedVersion === version.id ? 'opacity-100 text-white' : 'opacity-0'}`} />
                </div>
                <div className="flex items-center gap-2 mt-1 text-[9px]">
                  <span className="text-green-400 flex items-center gap-0.5">
                    <Plus className="w-2 h-2" />
                    {version.changes.split(' ')[0].replace('+', '')}
                  </span>
                  <span className="text-red-400 flex items-center gap-0.5">
                    <Minus className="w-2 h-2" />
                    {version.changes.split(' ')[1].replace('-', '')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Diff View - Editor area */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Type className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[10px] text-gray-500">Changes</span>
            </div>
            {phase >= 4 && selectedVersion && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-1 px-2 py-1 rounded text-[9px] transition-colors
                  ${phase === 5 ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}
                `}
              >
                <RotateCcw className="w-2.5 h-2.5" />
                Restore
              </motion.button>
            )}
          </div>

          <div className="flex-1 p-4 overflow-hidden relative">
            {selectedVersion && phase >= 3 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="text-[10px] text-gray-500 mb-3">Showing changes from {versions.find(v => v.id === selectedVersion)?.time}</div>

                {/* Diff content */}
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="text-gray-400">## Introduction</div>
                  <div className="text-gray-400">This document covers...</div>

                  <motion.div
                    initial={{ backgroundColor: 'rgba(239, 68, 68, 0)' }}
                    animate={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    className="text-red-400 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <Minus className="w-2.5 h-2.5" />
                    <span className="line-through">Old paragraph text here</span>
                  </motion.div>

                  <motion.div
                    initial={{ backgroundColor: 'rgba(34, 197, 94, 0)' }}
                    animate={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                    className="text-green-400 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>New improved paragraph with better clarity</span>
                  </motion.div>

                  <div className="text-gray-400">...</div>

                  <motion.div
                    initial={{ backgroundColor: 'rgba(34, 197, 94, 0)' }}
                    animate={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                    transition={{ delay: 0.2 }}
                    className="text-green-400 px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>Added new section content</span>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-[10px] text-gray-600">
                Select a version to see changes
              </div>
            )}

            {/* Restore success */}
            {phase === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <RotateCcw className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-green-400">Version restored!</span>
              </motion.div>
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
                  I can help you review version changes and restore previous versions.
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

export default VersionHistoryMock;
