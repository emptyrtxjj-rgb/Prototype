import React from 'react';

export interface MetricDisplayProps {
  symbol?: string; // Display font symbol (e.g. ✦, ◈, 01, %, etc.)
  value: string | number;
  label: string;
  context?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  symbol,
  value,
  label,
  context,
  trend,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 font-sans select-none text-left ${className}`}>
      {/* 33. [DISPLAY SYMBOL] + Inter value with tabular numbers */}
      <div className="flex items-baseline gap-2.5">
        {symbol && (
          <span className="font-['BubbledotICG-FinePos',monospace] text-[clamp(24px,3vw,36px)] text-[#2563eb] light:text-[#2563eb] leading-none shrink-0">
            {symbol}
          </span>
        )}
        <span className="font-sans font-semibold text-[clamp(28px,3.8vw,44px)] tracking-[-0.03em] text-white light:text-[#111111] font-tabular leading-none">
          {value}
        </span>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-[13px] font-medium font-tabular px-2 py-0.5 rounded-full ${
              trend.isPositive
                ? 'bg-[#16a34a]/15 text-[#22c55e]'
                : 'bg-[#ef4444]/15 text-[#f87171]'
            }`}
          >
            <i className={`fa-solid ${trend.isPositive ? 'fa-arrow-up' : 'fa-arrow-down'} text-[10px]`} />
            {trend.value}
          </span>
        )}
      </div>

      {/* Label & Context */}
      <div className="space-y-0.5">
        <p className="text-[14px] font-medium text-[#c4c2c3] light:text-[#2e2e2e] tracking-[-0.01em]">
          {label}
        </p>
        {context && (
          <p className="text-[12px] text-[#8e8e8e] leading-snug">
            {context}
          </p>
        )}
      </div>
    </div>
  );
};
