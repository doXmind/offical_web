import React from 'react';
import { cn } from '../../core/utils';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300';

  const variants = {
    default: 'bg-gray-800 p-6',
    bordered: 'bg-black border border-gray-700 p-6',
    highlight: 'bg-gray-800 border border-primary p-6',
    ghost: 'p-6',
  };

  const hoverStyles = {
    default: 'hover:bg-gray-700',
    bordered: 'hover:border-gray-600',
    highlight: 'hover:border-primary/80 hover:shadow-glow',
    ghost: 'hover:bg-gray-900',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        hover && hoverStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;