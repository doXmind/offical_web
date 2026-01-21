import React from 'react';
import { motion } from 'framer-motion';
import {
  PanelLeftClose,
  PanelLeft,
  MessageSquare,
  MessageSquareOff,
  Moon,
  Sun,
  Keyboard,
  User,
} from 'lucide-react';
import { ITEM_SPRING } from '../constants/animationConfig';

// Logo component matching doxmind-mini's X icon
const Logo = ({ size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
  return (
    <div className={`${sizeClasses} flex items-center justify-center`}>
      <span className="text-white font-bold text-sm">X</span>
    </div>
  );
};

const HeaderButton = ({ icon: Icon, isActive, onClick, ariaLabel }) => (
  <motion.button
    onClick={onClick}
    aria-label={ariaLabel}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', ...ITEM_SPRING }}
    className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
      isActive
        ? 'text-white bg-white/10'
        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
    }`}
  >
    <Icon className="w-4 h-4" />
  </motion.button>
);

const HeaderDivider = () => (
  <div className="mx-1 h-5 w-px bg-white/10" />
);

const DemoHeader = ({
  fileName = 'Untitled',
  isDirty = false,
  isSaving = false,
  isSidebarOpen = true,
  isChatOpen = true,
  isDarkMode = true,
  onToggleSidebar,
  onToggleChat,
  onToggleTheme,
  showAnimations = true,
}) => {
  return (
    <header className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.02] px-3 md:px-4">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Logo size="sm" />

        <HeaderDivider />

        {/* Sidebar Toggle */}
        <HeaderButton
          icon={isSidebarOpen ? PanelLeftClose : PanelLeft}
          isActive={false}
          onClick={onToggleSidebar}
          ariaLabel={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        />

        {/* File Name */}
        <div className="ml-2 flex items-center gap-2">
          <span className="text-sm font-medium text-white">{fileName}</span>
          {isDirty && (
            <span className="text-xs text-gray-500">(unsaved)</span>
          )}
          {isSaving && (
            <span className="text-xs text-gray-500">Saving...</span>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Keyboard Shortcuts */}
        <HeaderButton
          icon={Keyboard}
          isActive={false}
          ariaLabel="Keyboard Shortcuts"
        />

        {/* Theme Toggle */}
        <HeaderButton
          icon={isDarkMode ? Moon : Sun}
          isActive={false}
          onClick={onToggleTheme}
          ariaLabel="Toggle Theme"
        />

        {/* Chat Toggle */}
        <HeaderButton
          icon={isChatOpen ? MessageSquareOff : MessageSquare}
          isActive={false}
          onClick={onToggleChat}
          ariaLabel={isChatOpen ? 'Hide AI Chat' : 'Show AI Chat'}
        />

        <HeaderDivider />

        {/* User Avatar */}
        <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
          <User className="w-4 h-4 text-gray-300" />
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
