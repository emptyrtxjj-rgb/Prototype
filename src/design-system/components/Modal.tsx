import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'md' | 'lg'; // 520px or 720px
  children: React.ReactNode;
  footerActions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footerActions,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = size === 'lg' ? 'max-w-[720px]' : 'max-w-[520px]';

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* 37. Backdrop: background: rgba(0,0,0,0.62); backdrop-filter: blur(6px) */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-[8px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 37. Modal Container: 24-32px radius, deep shadow, scale & translateY transition */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${maxWidthClass} bg-[#111111] light:bg-[#ffffff] border border-white/14 light:border-black/10 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.40)] space-y-6 animate-fade-in text-white light:text-[#111111]`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h3 className="font-sans font-semibold text-[20px] sm:text-[22px] tracking-[-0.01em]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[14px] text-[#8e8e8e] leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-white/8 light:bg-black/5 hover:bg-white/15 light:hover:bg-black/10 flex items-center justify-center text-[#8e8e8e] hover:text-white light:hover:text-[#111111] transition-colors shrink-0"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>
        </div>

        {/* Body Content */}
        <div className="text-[15px] font-sans leading-relaxed text-[#c4c2c3] light:text-[#2e2e2e]">
          {children}
        </div>

        {/* Footer Actions */}
        {footerActions && (
          <div className="pt-3 border-t border-white/10 light:border-black/8 flex items-center justify-end gap-3">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};
