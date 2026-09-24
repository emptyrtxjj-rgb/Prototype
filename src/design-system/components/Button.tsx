import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill-dark' | 'green';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base: Pill shape (999px), Inter 600, smooth cubic-bezier transition, touch target 44px
  const baseClasses =
    'inline-flex items-center justify-center font-sans font-semibold tracking-[-0.01em] rounded-full transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-3 focus-visible:ring-[#2563eb]/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] select-none touch-target';

  // 17-18. Variants
  const variantClasses = {
    primary:
      'bg-[#2563eb] text-white hover:bg-[#3b82f6] shadow-[0_4px_14px_rgba(37,99,235,0.28)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.38)] hover:-translate-y-0.5 hover:scale-[1.02] border border-transparent',
    secondary:
      'bg-transparent text-white light:text-[#111111] border border-white/20 light:border-black/15 hover:bg-white/10 light:hover:bg-black/5 hover:border-white/40 light:hover:border-black/30 hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-[#8e8e8e] hover:text-white light:hover:text-[#111111] hover:bg-white/5 light:hover:bg-black/5',
    'pill-dark':
      'bg-[#28282a] text-white hover:bg-[#38383c] border border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 hover:scale-[1.02]',
    green:
      'bg-[#16a34a] text-white hover:bg-[#22c55e] shadow-[0_4px_14px_rgba(22,163,74,0.28)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.38)] hover:-translate-y-0.5 hover:scale-[1.02] border border-transparent',
  }[variant];

  // Sizes: compact horizontal padding
  const sizeClasses = {
    sm: 'text-[13px] px-4 py-2 min-h-[38px] gap-1.5',
    md: 'text-[15px] px-6 py-3 min-h-[44px] gap-2', // Standard 12px 24px
    lg: 'text-[16px] px-8 py-3.5 min-h-[50px] gap-2.5',
  }[size];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
