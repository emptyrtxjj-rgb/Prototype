import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'cyan' | 'blue' | 'emerald' | 'none';
  variant?: 'glass' | 'subtle' | 'solid';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  variant = 'glass',
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-all duration-300 relative overflow-hidden';

  const variants = {
    glass: 'bg-dark-850/80 backdrop-blur-md border border-slate-800/80 shadow-subtle-card',
    subtle: 'bg-dark-900/60 backdrop-blur-sm border border-slate-800/50',
    solid: 'bg-dark-850 border border-slate-800',
  };

  const glows = {
    none: '',
    cyan: 'glow-card',
    blue: 'glow-card',
    emerald: 'glow-card glow-card-emerald',
  };

  return (
    <div className={twMerge(clsx(baseStyles, variants[variant], glows[glow], className))} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx('px-6 py-4 border-b border-slate-800/60 flex items-center justify-between', className))} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...props
}) => (
  <h3 className={twMerge(clsx('text-base font-semibold text-slate-100 flex items-center gap-2', className))} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className,
  ...props
}) => (
  <p className={twMerge(clsx('text-xs text-slate-400 mt-0.5', className))} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx('p-6', className))} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={twMerge(clsx('px-6 py-3 border-t border-slate-800/60 bg-dark-900/30 flex items-center justify-between', className))} {...props}>
    {children}
  </div>
);
