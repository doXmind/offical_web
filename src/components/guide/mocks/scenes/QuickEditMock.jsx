import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Type, CheckCircle, Sparkles, Zap, Edit3, Languages, FileText } from 'lucide-react';
import GuideMockContainer from '../GuideMockContainer';

const iconMap = {
  CheckCircle,
  Sparkles,
  Type,
  Edit3,
  Zap,
  Languages,
};

const QUICK_EDIT_CONTENT = {
  text: "The meeting was very good and everyone was happy about it.",
  improvedText: "The meeting proved highly productive, and all participants expressed satisfaction with the outcomes.",
  commands: [
    { name: 'Fix Grammar', icon: 'CheckCircle' },
    { name: 'Improve', icon: 'Sparkles' },
    { name: 'Simplify', icon: 'Type' },
    { name: 'Expand', icon: 'Edit3' },
    { name: 'Shorten', icon: 'Zap' },
    { name: 'Translate', icon: 'Languages' },
  ],
};

const QuickEditMock = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 1800);
    const t4 = setTimeout(() => setPhase(4), 2200);
    const t5 = setTimeout(() => setPhase(5), 2500);
    const t6 = setTimeout(() => setPhase(6), 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const commands = QUICK_EDIT_CONTENT.commands.slice(0, 6);

  return (
    <GuideMockContainer>
      <div className="flex h-full w-full bg-black absolute inset-0">
        {/* Sidebar - matches MockSidebar */}
        <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
          <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
            Files
          </div>
          <div className="space-y-1">
            {['Meeting Notes.md', 'Project Notes.md', 'Ideas.md'].map((file, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${
                  i === 0 ? 'bg-white/10 text-white' : 'text-gray-500'
                }`}
              >
                <FileText className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{file}</span>
              </div>
            ))}
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

          <div className="flex-1 p-4 relative">
            <h2 className="text-sm font-medium text-white mb-3">Meeting Notes</h2>

            <div className="relative inline-block">
              {phase < 6 ? (
                <p className="text-xs text-gray-400 leading-relaxed">
                  <span
                    className={`transition-all duration-300 ${
                      phase >= 1 ? 'bg-white/20 px-0.5 rounded' : ''
                    }`}
                  >
                    {QUICK_EDIT_CONTENT.text}
                  </span>
                </p>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-gray-300 leading-relaxed bg-white/5 px-2 py-1 rounded"
                >
                  {QUICK_EDIT_CONTENT.improvedText}
                </motion.p>
              )}

              {/* Quick Edit Menu */}
              {phase >= 2 && phase < 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-2 bg-black border border-white/20 rounded-lg p-1.5 shadow-xl z-10"
                >
                  <div className="grid grid-cols-3 gap-1">
                    {commands.map((cmd) => {
                      const Icon = iconMap[cmd.icon];
                      const isImprove = cmd.name === 'Improve';
                      const isHovered = phase >= 3 && isImprove;
                      const isClicked = phase >= 4 && isImprove;

                      return (
                        <motion.div
                          key={cmd.name}
                          animate={isClicked ? { scale: [1, 0.95, 1] } : {}}
                          transition={{ duration: 0.15 }}
                          className={`
                            flex items-center gap-1.5 px-2 py-1.5 rounded text-[10px]
                            ${isHovered
                              ? 'bg-white/20 text-white'
                              : 'text-gray-400 hover:bg-white/10'
                            }
                          `}
                        >
                          <Icon className="w-3 h-3" />
                          <span>{cmd.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Loading indicator */}
              {phase === 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute left-0 top-full mt-2 flex items-center gap-2 text-gray-500"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-3 h-3 border border-white/30 border-t-white rounded-full"
                  />
                  <span className="text-[10px]">Improving...</span>
                </motion.div>
              )}
            </div>

            {/* Success toast */}
            {phase >= 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg"
              >
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-gray-300">Text improved</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </GuideMockContainer>
  );
};

export default QuickEditMock;
