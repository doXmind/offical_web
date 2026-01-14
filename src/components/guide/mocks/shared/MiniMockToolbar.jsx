import React from 'react';
import { Type, Bold, Italic, Underline, List, Code, Table, Image } from 'lucide-react';

const MiniMockToolbar = ({
  activeTools = [],
  showAllTools = false,
  className = '',
}) => {
  const basicTools = [
    { icon: Bold, name: 'B' },
    { icon: Italic, name: 'I' },
    { icon: Underline, name: 'U' },
  ];

  const extendedTools = [
    { icon: List, name: 'list' },
    { icon: Code, name: 'code' },
    { icon: Table, name: 'table' },
    { icon: Image, name: 'image' },
  ];

  const tools = showAllTools ? [...basicTools, ...extendedTools] : basicTools;

  return (
    <div className={`px-3 py-1.5 border-b border-white/10 flex items-center gap-2 ${className}`}>
      <Type className="w-3 h-3 text-gray-600" />
      <div className="flex gap-0.5">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          const isActive = activeTools.includes(tool.name);
          return (
            <div
              key={index}
              className={`
                w-5 h-5 flex items-center justify-center text-[9px] border rounded
                ${isActive
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'border-white/10 text-gray-600'
                }
              `}
            >
              {tool.name.length === 1 ? tool.name : <Icon className="w-2.5 h-2.5" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniMockToolbar;
