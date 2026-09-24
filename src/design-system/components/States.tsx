import React from 'react';
import { Button } from './Button';

// 51. Loading State Primitive: Skeleton with subtle shimmer
export const Skeleton: React.FC<{
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}> = ({ width = '100%', height = '20px', rounded = 'rounded-xl', className = '' }) => {
  return (
    <div
      style={{ width, height }}
      className={`relative overflow-hidden bg-white/6 light:bg-black/6 ${rounded} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 light:via-black/5 to-transparent" />
    </div>
  );
};

// 52. Empty State Primitive
export interface EmptyStateProps {
  icon?: string; // Font Awesome class name e.g. "fa-regular fa-folder-open"
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'fa-regular fa-compass',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[24px] border border-dashed border-white/14 light:border-black/10 bg-[#09090b]/50 light:bg-slate-50/50 space-y-4 max-w-lg mx-auto ${className}`}>
      <div className="w-14 h-14 rounded-full bg-white/8 light:bg-black/5 flex items-center justify-center text-[#8e8e8e] text-2xl">
        <i className={icon} />
      </div>
      <div className="space-y-1.5">
        <h4 className="font-sans font-semibold text-[17px] text-white light:text-[#111111]">
          {title}
        </h4>
        <p className="text-[14px] text-[#8e8e8e] max-w-sm leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// 53. Error State Primitive
export interface ErrorStateProps {
  title?: string;
  message: string;
  recoveryLabel?: string;
  onRecovery?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Ошибка выполнения',
  message,
  recoveryLabel = 'Попробовать снова',
  onRecovery,
  className = '',
}) => {
  return (
    <div className={`p-6 sm:p-8 rounded-[24px] border border-[#ef4444]/30 bg-[#ef4444]/5 light:bg-[#ef4444]/5 space-y-4 max-w-xl mx-auto text-left ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#ef4444]/15 text-[#ef4444] flex items-center justify-center text-lg shrink-0">
          <i className="fa-solid fa-triangle-exclamation" />
        </div>
        <div className="space-y-1">
          <h4 className="font-sans font-semibold text-[16px] text-white light:text-[#111111]">
            {title}
          </h4>
          <p className="text-[14px] text-[#c4c2c3] light:text-[#707070] leading-relaxed">
            {message}
          </p>
        </div>
      </div>
      {recoveryLabel && onRecovery && (
        <div className="pt-1 pl-14">
          <Button variant="secondary" size="sm" onClick={onRecovery}>
            {recoveryLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
