import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Upload, Loader2 } from 'lucide-react';
import DemoFileItem from './DemoFileItem';
import { ITEM_SPRING } from '../constants/animationConfig';

const SidebarButton = ({ icon: Icon, isHighlighted, isLoading, onClick, ariaLabel }) => (
  <div className="relative">
    <motion.button
      className={`h-8 w-8 flex items-center justify-center rounded transition-colors ${
        isHighlighted
          ? 'bg-blue-500/20 text-blue-400'
          : 'text-gray-500 hover:text-gray-400 hover:bg-white/5'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', ...ITEM_SPRING }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
    </motion.button>
    {isHighlighted && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: 1 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute inset-0 rounded ring-2 ring-blue-500/50"
      />
    )}
  </div>
);

const DemoSidebar = ({
  files = [],
  activeFileId = null,
  showSearch = true,
  showImport = true,
  showCreate = true,
  isSearchHighlighted = false,
  isImportHighlighted = false,
  isCreateHighlighted = false,
  isImporting = false,
  onFileClick,
  onSearchClick,
  onImportClick,
  onCreateClick,
}) => {
  return (
    <div className="w-48 md:w-56 border-r border-white/10 bg-white/[0.02] flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-white/10 p-3">
        <div className="flex items-center justify-between">
          <h2 className="hidden md:block text-sm font-semibold text-white">Files</h2>
          <div className="flex w-full md:w-auto items-center justify-end gap-1">
            {showSearch && (
              <SidebarButton
                icon={Search}
                isHighlighted={isSearchHighlighted}
                onClick={onSearchClick}
                ariaLabel="Search"
              />
            )}
            {showImport && (
              <SidebarButton
                icon={Upload}
                isHighlighted={isImportHighlighted}
                isLoading={isImporting}
                onClick={onImportClick}
                ariaLabel="Import File"
              />
            )}
            {showCreate && (
              <SidebarButton
                icon={Plus}
                isHighlighted={isCreateHighlighted}
                onClick={onCreateClick}
                ariaLabel="Create New File"
              />
            )}
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {files.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-600">
            No files yet
          </div>
        ) : (
          <div className="space-y-1 p-2">
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
