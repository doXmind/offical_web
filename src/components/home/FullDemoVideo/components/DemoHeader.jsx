import React from 'react';
import { motion } from 'framer-motion';
import { PanelLeft, MessageSquare, User } from 'lucide-react';
import { ITEM_SPRING } from '../constants/animationConfig';

// Simplified logo
const Logo = () => (
  <div className="w-5 h-5 flex items-center justify-center">
    <span className="text-white font-bold text-xs">X</span>
  </div>
);

const HeaderButton = ({ icon: Icon, isActive }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', ...ITEM_SPRING }}
    className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${
      isActive
        ? 'text-white bg-white/10'
        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
    }`}
  >
    <Icon className="w-3.5 h-3.5" />
  </motion.button>
);

const DemoHeader = ({
  fileName = 'Untitled',
  isDirty = false,
  isSidebarOpen = true,
  isChatOpen = true,
}) => {
  return (
    <header className="flex h-10 items-center justify-between border-b border-white/10 bg-white/[0.02] px-3">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Logo />
        <div className="w-px h-4 bg-white/10 mx-1" />
        <HeaderButton icon={PanelLeft} isActive={isSidebarOpen} />

        {/* File Name */}
        <div className="flex items-center gap-1.5 ml-1">
          <span className="text-xs font-medium text-white truncate max-w-[120px]">{fileName}</span>
          {isDirty && (
            <span className="text-[10px] text-gray-500">(unsaved)</span>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1.5">
        <HeaderButton icon={MessageSquare} isActive={isChatOpen} />
        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
          <User className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
