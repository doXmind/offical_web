import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Sparkles,
  FileText,
  Expand,
  Minimize2,
  MessageSquare,
  Languages
} from 'lucide-react';

const commands = [
  {
    icon: CheckCircle,
    name: 'Fix Grammar',
    description: 'Correct spelling, grammar, and punctuation errors automatically'
  },
  {
    icon: Sparkles,
    name: 'Improve',
    description: 'Enhance writing quality, clarity, and flow'
  },
  {
    icon: FileText,
    name: 'Simplify',
    description: 'Make text easier to understand with simpler language'
  },
  {
    icon: Expand,
    name: 'Expand',
    description: 'Add more detail, examples, and depth to your content'
  },
  {
    icon: Minimize2,
    name: 'Shorten',
    description: 'Reduce length while keeping the core message'
  },
  {
    icon: MessageSquare,
    name: 'Change Tone',
    description: 'Switch between Professional, Casual, Friendly, or Confident'
  },
  {
    icon: Languages,
    name: 'Translate',
    description: 'Convert text to English, Chinese, Japanese, French, German, or Spanish'
  }
];

const QuickEditCommands = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {commands.map((command, index) => (
        <motion.div
          key={command.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="p-4 border border-white/10 rounded-lg hover:border-white/20 transition-colors"
        >
          <div className="flex items-start gap-3">
            <command.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="font-medium text-white mb-1">{command.name}</h5>
              <p className="text-sm text-gray-400">{command.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickEditCommands;
