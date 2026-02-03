import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import DemoFileItem from './DemoFileItem';
import { ITEM_SPRING } from '../constants/animationConfig';

const DemoSidebar = ({
  files = [],
  activeFileId = null,
  onFileClick,
}) => {
  return (
    <div className="w-36 md:w-44 border-r border-white/10 bg-white/[0.02] flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-white/10 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Files</span>
          <motion.button
            className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-gray-400 hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', ...ITEM_SPRING }}
          >
            <Plus className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-1.5">
        {files.length === 0 ? (
          <div className="py-6 text-center text-[11px] text-gray-600">
            No files
          </div>
        ) : (
          <div className="space-y-0.5">
            <AnimatePresence mode="popLayout">
              {files.map((file) => (
                <DemoFileItem
                  key={file.id}
                  file={file}
                  isActive={file.id === activeFileId}
                  isNew={file.isNew}
                  onClick={() => onFileClick?.(file.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoSidebar;
