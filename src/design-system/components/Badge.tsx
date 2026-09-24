import React from 'react';

export interface BadgeProps {
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'neutral';
  pulse?: boolean;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  pulse = false,
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const variantStyles = {
    blue: 'bg-[#2563eb]/12 text-[#3b82f6] border-[#2563eb]/25',
    green: 'bg-[#16a34a]/12 text-[#22c55e] border-[#16a34a]/25',
    amber: 'bg-[#f59e0b]/12 text-[#fbbf24] border-[#f59e0b]/25',
    red: 'bg-[#ef4444]/12 text-[#f87171] border-[#ef4444]/25',
    neutral: 'bg-white/8 light:bg-black/5 text-[#c4c2c3] light:text-[#2e2e2e] border-white/10 light:border-black/10',
  }[variant];

  const dotColors = {
    blue: 'bg-[#3b82f6]',
    green: 'bg-[#22c55e]',
    amber: 'bg-[#fbbf24]',
    red: 'bg-[#f87171]',
    neutral: 'bg-[#8e8e8e]',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 min-h-[22px] gap-1.5',
    md: 'text-[13px] px-3.5 py-1 min-h-[26px] gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-sans font-medium tracking-[-0.01em] rounded-full border transition-colors select-none ${variantStyles} ${sizeStyles} ${className}`}
    >
      {pulse ? (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors}`} />
        </span>
      ) : icon ? (
        <span className="inline-flex shrink-0">{icon}</span>
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors}`} />
      )}
      <span className="font-tabular truncate">{children}</span>
    </span>
  );
};
