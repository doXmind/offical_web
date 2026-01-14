import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Menu, RefreshCw,
  Smartphone, Hand, Maximize2, FileText, MessageSquare, Settings
} from 'lucide-react';

const gestures = [
  {
    icon: ChevronRight,
    gesture: 'Swipe Right',
    action: 'Show files panel',
    description: 'Access your documents quickly'
  },
  {
    icon: ChevronLeft,
    gesture: 'Swipe Left',
    action: 'Show chat panel',
    description: 'Open AI assistant'
  },
  {
    icon: Hand,
    gesture: 'Long Press',
    action: 'Context menu',
    description: 'Access Quick Edit options on selected text'
  },
  {
    icon: RefreshCw,
    gesture: 'Pull Down',
    action: 'Refresh',
    description: 'Refresh current view'
  },
  {
    icon: Maximize2,
    gesture: 'Drag Panels',
    action: 'Resize',
    description: 'Drag panel edges to resize'
  }
];

const bottomNavItems = [
  { icon: FileText, label: 'Files' },
  { icon: Menu, label: 'Editor' },
  { icon: MessageSquare, label: 'Chat' },
  { icon: Settings, label: 'Settings' }
];

const mobileTips = [
  'Use portrait mode for focused writing',
  'Use landscape mode for document comparison',
  'External keyboard shortcuts are fully supported',
  'Tab key works for autocomplete suggestions'
];

const MobileGestureGuide = () => {
  return (
    <div className="space-y-8">
      {/* Bottom Navigation */}
      <div>
        <h4 className="text-xl font-light mb-4">Bottom Navigation</h4>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5">
          <p className="text-gray-400 mb-4">
            On mobile devices, navigation moves to a bottom bar with iOS-style design:
          </p>
          <div className="flex justify-around items-center py-4 bg-black/50 rounded-lg border border-white/10">
            {bottomNavItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-1"
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Gesture Controls */}
      <div>
        <h4 className="text-xl font-light mb-4">Gesture Controls</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {gestures.map((gesture, index) => (
            <motion.div
              key={gesture.gesture}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-4 border border-white/10 rounded-lg bg-white/5 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <gesture.icon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{gesture.gesture}</span>
                    <span className="text-sm text-gray-500">{gesture.action}</span>
                  </div>
                  <p className="text-sm text-gray-400">{gesture.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Touch Optimization */}
      <div>
        <h4 className="text-xl font-light mb-4">Touch Optimization</h4>
        <div className="p-6 border border-white/10 rounded-lg bg-white/5">
          <div className="flex items-start gap-3 mb-4">
            <Smartphone className="w-5 h-5 text-white mt-0.5" />
            <div>
              <h5 className="font-medium text-white mb-2">Comfortable Touch Targets</h5>
              <p className="text-sm text-gray-400">
                All interactive elements are sized at 44-48px for easy tapping,
                following iOS Human Interface Guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tips */}
      <div>
        <h4 className="text-xl font-light mb-4">Tips for Mobile</h4>
        <ul className="space-y-2">
          {mobileTips.map((tip, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-400"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></span>
              {tip}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileGestureGuide;
