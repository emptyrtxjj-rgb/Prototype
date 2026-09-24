import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  leftIcon,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={twMerge(clsx(
            'w-full bg-dark-900/90 text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-lg px-3.5 py-2 text-sm',
            'transition-colors duration-150 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500',
            leftIcon && 'pl-10',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
            className
          ))}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-rose-400 font-mono">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={twMerge(clsx(
          'w-full bg-dark-900/90 text-slate-100 placeholder-slate-500 border border-slate-700/80 rounded-lg px-3.5 py-2 text-sm',
          'transition-colors duration-150 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 min-h-[90px]',
          error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
          className
        ))}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-rose-400 font-mono">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={twMerge(clsx(
          'w-full bg-dark-900/90 text-slate-100 border border-slate-700/80 rounded-lg px-3.5 py-2 text-sm',
          'transition-colors duration-150 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500',
          error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
          className
        ))}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-dark-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-xs text-rose-400 font-mono">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
