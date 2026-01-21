import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, FolderOpen, X } from 'lucide-react';

const DemoSidebar = ({
  files = [],
  activeFileId = null,
  showCreateModal = false,
  createModalInput = '',
  onCloseModal,
}) => {
  return (
    <div className="w-36 md:w-44 border-r border-white/10 bg-white/[0.01] flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-2 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <FolderOpen className="w-3 h-3 text-gray-500" />
          <span className="text-[10px] font-medium text-gray-400">Files</span>
        </div>
        <button className="w-4 h-4 flex items-center justify-center rounded text-gray-500 hover:text-gray-400 hover:bg-white/5">
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto py-1">
        <AnimatePresence mode="popLayout">
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={file.isNew ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-1.5 px-2 py-1.5 cursor-pointer transition-colors ${
                file.id === activeFileId
                  ? 'bg-white/10 border-l-2 border-blue-500'
                  : 'hover:bg-white/5 border-l-2 border-transparent'
              }`}
            >
              <FileText className={`w-3 h-3 ${file.id === activeFileId ? 'text-blue-400' : 'text-gray-500'}`} />
              <span className={`text-[10px] truncate ${file.id === activeFileId ? 'text-white' : 'text-gray-400'}`}>
                {file.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Create Modal Overlay */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 p-2"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-white/10 rounded-lg p-3 w-full"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400">New File</span>
                <button
                  onClick={onCloseModal}
                  className="text-gray-500 hover:text-gray-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={createModalInput}
                  readOnly
                  className="w-full bg-black/50 border border-white/10 rounded px-2 py-1.5 text-[10px] text-white outline-none"
                  placeholder="File name..."
                />
                {createModalInput && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white"
                  />
                )}
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className={`px-2 py-1 text-[10px] rounded ${
                    createModalInput
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-500'
                  }`}
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemoSidebar;
