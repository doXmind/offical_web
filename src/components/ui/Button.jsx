import React from 'react';
import { cn } from '../../core/utils';

const Button = ({
  children,
  variant = 'primary',
  size = 'base',
  className = '',
  disabled = false,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-white text-black hover:bg-gray-100 focus:ring-white',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-black focus:ring-white',
    ghost: 'text-white hover:text-primary focus:ring-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    base: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;