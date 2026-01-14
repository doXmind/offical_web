import React from 'react';
import { FileText } from 'lucide-react';
import { SIDEBAR_FILES } from '../constants/demoContent';

const MockSidebar = ({ files = SIDEBAR_FILES }) => {
  return (
    <div className="w-40 h-full border-r border-white/10 bg-white/[0.02] p-3">
      <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2 px-1">
        Files
      </div>
      <div className="space-y-1">
        {files.map((file, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-2 px-2 py-1.5 rounded text-xs
              ${file.active
                ? 'bg-white/10 text-white'
                : 'text-gray-500 hover:bg-white/5'
              }
            `}
          >
            <FileText className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockSidebar;
