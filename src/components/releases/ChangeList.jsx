import React from 'react';
import { Plus, ArrowUp, Check, Minus, AlertTriangle } from 'lucide-react';
import { cn } from '../../core/utils';

const categoryConfig = {
  added: {
    icon: Plus,
    label: 'Added',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  improved: {
    icon: ArrowUp,
    label: 'Improved',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  fixed: {
    icon: Check,
    label: 'Fixed',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  removed: {
    icon: Minus,
    label: 'Removed',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  security: {
    icon: AlertTriangle,
    label: 'Security',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
};

const ChangeList = ({ changes, className = '' }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {changes.map((change, index) => {
        const config = categoryConfig[change.category] || categoryConfig.added;
        const Icon = config.icon;

        return (
          <div key={index}>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('p-1 rounded', config.bgColor)}>
                <Icon className={cn('w-4 h-4', config.color)} />
              </span>
              <h4 className={cn('font-medium', config.color)}>
                {config.label}
              </h4>
            </div>
            <ul className="space-y-2 pl-7">
              {change.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-gray-400 text-sm flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ChangeList;
