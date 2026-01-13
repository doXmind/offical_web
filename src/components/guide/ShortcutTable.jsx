import React from 'react';

const ShortcutTable = ({ shortcuts, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border border-white/10 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-white/5">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Action</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Shortcut</th>
            {shortcuts.some(s => s.description) && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 hidden md:table-cell">Description</th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm">
          {shortcuts.map((shortcut, index) => (
            <tr key={index} className="border-t border-white/5">
              <td className="px-4 py-3 text-gray-300">{shortcut.action}</td>
              <td className="px-4 py-3">
                <kbd className="px-2 py-1 bg-white/5 rounded text-primary font-mono text-xs">
                  {shortcut.keys}
                </kbd>
              </td>
              {shortcuts.some(s => s.description) && (
                <td className="px-4 py-3 text-gray-400 hidden md:table-cell">
                  {shortcut.description || ''}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortcutTable;
