import React, { useState } from 'react';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  icon?: string; // Font Awesome class name e.g. "fa-solid fa-house"
}

export interface NavigationProps {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  logoSrc?: string;
  logoText?: string;
  actions?: React.ReactNode;
}

export const LogoContainer: React.FC<{
  src?: string;
  text?: string;
  onClick?: () => void;
}> = ({ src, text = 'SK', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-[clamp(40px,4.4vw,48px)] h-[clamp(40px,4.4vw,48px)] rounded-full bg-white light:bg-[#111111] text-[#111111] light:text-white shadow-[0_4px_14px_rgba(0,0,0,0.16)] transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] focus:outline-none shrink-0 overflow-hidden"
    >
      {src ? (
        <img src={src} alt="Brand Logo" className="w-full h-full object-contain p-2" />
      ) : (
        <span className="font-sans font-bold text-[14px] sm:text-[15px] tracking-tight">{text}</span>
      )}
    </button>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  items,
  activeId,
  onSelect,
  logoSrc,
  logoText = 'SK',
  actions,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-4 z-[100] w-full px-4 sm:px-6">
      <div className="layout-container flex items-center justify-between gap-4">
        {/* 22. Logo Container (Circular, clamp(40px, 4.4vw, 48px), hover scale 1.04) */}
        <LogoContainer src={logoSrc} text={logoText} />

        {/* 19-20. Desktop Floating Pill Navigation (Hidden at <=720px) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121214]/90 light:bg-white/90 backdrop-blur-[16px] border border-white/12 light:border-black/10 rounded-full px-3 py-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.16)]">
          {items.map((item) => {
            const isActive = activeId ? activeId === item.id : item.active;

            return (
              <button
                key={item.id}
                onClick={() => onSelect?.(item.id)}
                className={`relative px-4 py-2 rounded-full text-[14px] font-sans font-medium transition-all duration-200 select-none flex items-center gap-2 ${
                  isActive
                    ? 'text-white light:text-[#111111] font-semibold'
                    : 'text-[#8e8e8e] hover:text-white light:hover:text-[#111111]'
                }`}
              >
                {item.icon && <i className={`${item.icon} text-xs`} />}
                <span>{item.label}</span>
                {/* 20. Three-dot indicator for active nav item */}
                {isActive && (
                  <span
                    className="inline-block w-[3px] h-[3px] rounded-full bg-current ml-0.5"
                    style={{
                      boxShadow: '-5px 0 currentColor, 5px 0 currentColor',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions / Desktop Extras */}
        <div className="hidden md:flex items-center gap-3">
          {actions}
        </div>

        {/* 38. Mobile Menu Trigger (Visible at <=720px) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden touch-target w-11 h-11 rounded-full bg-[#18181b] light:bg-white border border-white/14 light:border-black/10 flex items-center justify-center text-white light:text-[#111111] shadow-[0_4px_14px_rgba(0,0,0,0.16)] focus:outline-none"
        >
          <i className={`fa-solid ${mobileOpen ? 'fa-xmark text-base' : 'fa-bars text-sm'} transition-transform duration-200`} />
        </button>
      </div>

      {/* 38. Mobile Menu Sheet (≤720px) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[600] flex flex-col justify-end p-4">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-[6px] transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu Sheet (28px radius) */}
          <div className="relative z-10 bg-[#121214] light:bg-white border border-white/14 light:border-black/10 rounded-[28px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 light:border-black/8">
              <span className="font-sans font-semibold text-white light:text-[#111111] text-[15px]">Меню</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 light:bg-black/5 flex items-center justify-center text-white light:text-[#111111]"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {items.map((item) => {
                const isActive = activeId ? activeId === item.id : item.active;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelect?.(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[16px] font-sans font-medium transition-colors ${
                      isActive
                        ? 'bg-[#2563eb]/15 text-[#3b82f6] font-semibold'
                        : 'text-[#c4c2c3] light:text-[#2e2e2e] hover:bg-white/5 light:hover:bg-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <i className={`${item.icon} text-sm`} />}
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span
                        className="inline-block w-[3px] h-[3px] rounded-full bg-current"
                        style={{
                          boxShadow: '-5px 0 currentColor, 5px 0 currentColor',
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {actions && <div className="pt-3 border-t border-white/10 light:border-black/8">{actions}</div>}
          </div>
        </div>
      )}
    </header>
  );
};
