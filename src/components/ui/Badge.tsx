import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate' | 'blue' | 'violet';
  size?: 'sm' | 'md';
  hasDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'slate',
  size = 'md',
  hasDot = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-medium rounded-full select-none';

  const variants = {
    cyan: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30',
    blue: 'bg-blue-500/10 text-blue-300 border border-blue-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-300 border border-rose-500/30',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
    violet: 'bg-purple-500/10 text-purple-300 border border-purple-500/30',
  };

  const dotColors = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
    blue: 'bg-blue-400 shadow-[0_0_8px_#60a5fa]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
    rose: 'bg-rose-400 shadow-[0_0_8px_#f43f5e]',
    slate: 'bg-slate-400',
    violet: 'bg-purple-400 shadow-[0_0_8px_#c084fc]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {hasDot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotColors[variant])} />
      )}
      <span>{children}</span>
    </span>
  );
};
