import React from 'react';
import { FileText, Plus, Search } from 'lucide-react';

const MiniMockSidebar = ({
  files = [
    { name: 'Document.md', active: true },
    { name: 'Notes.md', active: false },
    { name: 'Draft.md', active: false },
  ],
  showSearch = false,
  className = '',
}) => {
  return (
    <div className={`w-32 border-r border-white/10 bg-white/[0.02] flex flex-col ${className}`}>
      <div className="p-2 border-b border-white/10 flex items-center justify-between">
        <span className="text-[9px] text-gray-500 uppercase tracking-wider">Files</span>
        <Plus className="w-3 h-3 text-gray-600" />
      </div>

      {showSearch && (
        <div className="p-2 border-b border-white/10">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded text-[9px] text-gray-500">
            <Search className="w-2.5 h-2.5" />
            <span>Search...</span>
          </div>
        </div>
      )}

      <div className="flex-1 p-2 space-y-0.5 overflow-hidden">
        {files.map((file, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-1.5 px-2 py-1 rounded text-[9px] truncate
              ${file.active
                ? 'bg-white/10 text-white'
                : 'text-gray-500 hover:bg-white/5'
              }
            `}
          >
            <FileText className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniMockSidebar;
