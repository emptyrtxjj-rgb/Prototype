import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'utility' | 'glass';
  shadow?: 'none' | 'soft' | 'medium' | 'deep';
  interactive?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'primary',
  shadow = 'soft',
  interactive = false,
  children,
  className = '',
  ...props
}) => {
  // 23-24. Hierarchy variants
  const variantStyles = {
    // Primary card: large visual area, 24-32px radius, generous padding
    primary:
      'bg-[#09090b] light:bg-[#ffffff] border border-white/12 light:border-black/8 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8',
    // Secondary card: compact information, 20px radius
    secondary:
      'bg-[#121214] light:bg-[#f5f7f8] border border-white/10 light:border-black/6 rounded-[20px] p-5 sm:p-6',
    // Utility card: small functional module, 16px radius
    utility:
      'bg-[#18181b] light:bg-[#ffffff] border border-white/8 light:border-black/6 rounded-[16px] p-4',
    // Glass variant: restrained glassmorphism, 24px radius
    glass:
      'bg-black/40 light:bg-white/60 backdrop-blur-[16px] -webkit-backdrop-blur-[16px] border border-white/14 light:border-black/10 rounded-[24px] p-6 sm:p-8',
  }[variant];

  // 26. Shadows
  const shadowStyles = {
    none: '',
    soft: 'shadow-[0_4px_14px_rgba(0,0,0,0.16)]',
    medium: 'shadow-[0_12px_40px_rgba(0,0,0,0.12)]',
    deep: 'shadow-[0_20px_60px_rgba(0,0,0,0.25)]',
  }[shadow];

  // 45. Hover physics
  const interactiveStyles = interactive
    ? 'transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 light:hover:border-black/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.20)] cursor-pointer'
    : '';

  return (
    <div
      className={`relative overflow-hidden text-white light:text-[#111111] font-sans ${variantStyles} ${shadowStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
