import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  errorMessage,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className="w-full space-y-1.5 font-sans text-left">
      {label && (
        <label className="block text-[13px] font-medium tracking-[-0.01em] text-white/90 light:text-[#111111]/90">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3.5 text-[#8e8e8e] pointer-events-none flex items-center justify-center">
            {leftIcon}
          </span>
        )}

        <input
          disabled={disabled}
          className={`w-full text-[15px] font-sans text-white light:text-[#111111] placeholder:text-[#8e8e8e] bg-[#111111] light:bg-[#ffffff] rounded-[16px] border transition-all duration-200 outline-none ${
            leftIcon ? 'pl-10' : 'pl-4'
          } ${rightIcon ? 'pr-10' : 'pr-4'} py-3 min-h-[46px] ${
            hasError
              ? 'border-[#ef4444] focus:ring-3 focus:ring-[#ef4444]/20'
              : 'border-white/14 light:border-black/10 focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20'
          } disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3.5 text-[#8e8e8e] pointer-events-none flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>

      {hasError ? (
        <p className="text-[13px] text-[#ef4444] font-medium tracking-[-0.01em] flex items-center gap-1">
          <i className="fa-solid fa-circle-exclamation text-xs" />
          <span>{errorMessage}</span>
        </p>
      ) : helperText ? (
        <p className="text-[13px] text-[#8e8e8e] tracking-[-0.01em]">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  errorMessage,
  options,
  className = '',
  ...props
}) => {
  const hasError = Boolean(errorMessage);

  return (
    <div className="w-full space-y-1.5 font-sans text-left">
      {label && (
        <label className="block text-[13px] font-medium tracking-[-0.01em] text-white/90 light:text-[#111111]/90">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          className={`w-full appearance-none text-[15px] font-sans text-white light:text-[#111111] bg-[#111111] light:bg-[#ffffff] rounded-[16px] border px-4 py-3 pr-10 min-h-[46px] transition-all duration-200 outline-none cursor-pointer ${
            hasError
              ? 'border-[#ef4444] focus:ring-3 focus:ring-[#ef4444]/20'
              : 'border-white/14 light:border-black/10 focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/20'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#111111] text-white light:bg-white light:text-[#111111]">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8e8e8e] text-xs">
          <i className="fa-solid fa-chevron-down" />
        </span>
      </div>

      {hasError ? (
        <p className="text-[13px] text-[#ef4444] font-medium">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-[13px] text-[#8e8e8e]">{helperText}</p>
      ) : null}
    </div>
  );
};

export interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, disabled }) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-3 focus-visible:ring-[#2563eb]/30 disabled:opacity-40 disabled:cursor-not-allowed ${
          checked ? 'bg-[#2563eb]' : 'bg-[#28282a] light:bg-slate-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-[14px] text-white light:text-[#111111] font-medium">{label}</span>}
    </label>
  );
};
