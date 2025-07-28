import React from 'react';
import { cn } from '../../core/utils';

// Heading Component
export const Heading = ({
  level = 1,
  children,
  className = '',
  gradient = false,
  ...props
}) => {
  const Tag = `h${level}`;
  
  const sizes = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    3: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug',
    4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-snug',
    5: 'text-lg md:text-xl lg:text-2xl font-semibold leading-normal',
    6: 'text-base md:text-lg lg:text-xl font-semibold leading-normal',
  };

  return (
    <Tag
      className={cn(
        sizes[level],
        gradient ? 'text-gradient' : 'text-white',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Text Component
export const Text = ({
  children,
  variant = 'body',
  className = '',
  ...props
}) => {
  const variants = {
    body: 'text-base text-gray-300 leading-relaxed',
    lead: 'text-lg md:text-xl text-gray-200 leading-relaxed',
    small: 'text-sm text-gray-400 leading-normal',
    caption: 'text-xs text-gray-500 leading-normal',
  };

  return (
    <p className={cn(variants[variant], className)} {...props}>
      {children}
    </p>
  );
};

// Link Component
export const Link = ({
  children,
  href,
  variant = 'default',
  className = '',
  external = false,
  ...props
}) => {
  const variants = {
    default: 'text-primary hover:text-primary-light transition-colors',
    subtle: 'text-gray-400 hover:text-white transition-colors',
    underline: 'text-white hover:text-primary underline underline-offset-4 transition-colors',
  };

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      className={cn(variants[variant], className)}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
};

// Badge Component
export const Badge = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-gray-800 text-gray-300',
    primary: 'bg-primary/20 text-primary',
    success: 'bg-green-500/20 text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};