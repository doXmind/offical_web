import React from 'react';
import { cn } from '../../core/utils';

const VersionBadge = ({ version, className = '' }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        'bg-white/10 text-white border border-white/20',
        className
      )}
    >
      v{version}
    </span>
  );
};

export default VersionBadge;
