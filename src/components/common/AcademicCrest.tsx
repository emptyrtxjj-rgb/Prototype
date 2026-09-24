import React from 'react';

export interface AcademicCrestProps {
  className?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  light?: boolean;
  variant?: 'crimson' | 'light' | 'gold';
}

export const AcademicCrest: React.FC<AcademicCrestProps> = ({ 
  className = '', 
  size = 48,
  light = false,
  variant
}) => {
  const numericSize = typeof size === 'number' 
    ? size 
    : size === 'sm' ? 32
    : size === 'md' ? 48
    : size === 'lg' ? 64
    : size === 'xl' ? 96
    : 48;

  const isLight = light || variant === 'light';
  const strokeColor = isLight ? '#FFFFFF' : '#7A1526';
  const goldColor = variant === 'gold' ? '#D4AF37' : (isLight ? '#E6CA85' : '#C5A059');

  return (
    <svg 
      width={numericSize} 
      height={numericSize} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Laurel Wreath Left */}
      <path 
        d="M26 68C22 58 22 42 30 30M24 64C20 60 18 52 20 44M20 54C16 48 16 40 20 32M24 40C22 34 24 26 30 20M32 28C32 20 38 15 46 12" 
        stroke={goldColor} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      {/* Laurel Leaves Left */}
      <circle cx="21" cy="48" r="2.5" fill={goldColor} />
      <circle cx="24" cy="36" r="2.5" fill={goldColor} />
      <circle cx="30" cy="24" r="2.5" fill={goldColor} />
      <circle cx="40" cy="16" r="2.5" fill={goldColor} />

      {/* Laurel Wreath Right */}
      <path 
        d="M74 68C78 58 78 42 70 30M76 64C80 60 82 52 80 44M80 54C84 48 84 40 80 32M76 40C78 34 76 26 70 20M68 28C68 20 62 15 54 12" 
        stroke={goldColor} 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      {/* Laurel Leaves Right */}
      <circle cx="79" cy="48" r="2.5" fill={goldColor} />
      <circle cx="76" cy="36" r="2.5" fill={goldColor} />
      <circle cx="70" cy="24" r="2.5" fill={goldColor} />
      <circle cx="60" cy="16" r="2.5" fill={goldColor} />

      {/* Shield Center */}
      <path 
        d="M50 20L66 26V48C66 62 50 74 50 74C50 74 34 62 34 48V26L50 20Z" 
        fill={isLight ? "rgba(255,255,255,0.15)" : "#7A1526"} 
        stroke={goldColor} 
        strokeWidth="2.5" 
      />
      
      {/* Open Book in Shield */}
      <path 
        d="M42 42C46 40 50 42 50 42C50 42 54 40 58 42V55C54 53 50 55 50 55C50 55 46 53 42 55V42Z" 
        fill={isLight ? "#FFFFFF" : "#FAF8F5"} 
      />
      <line x1="50" y1="42" x2="50" y2="55" stroke={strokeColor} strokeWidth="1.5" />

      {/* Star on top */}
      <polygon 
        points="50,6 52,11 57,11 53,14 55,19 50,16 45,19 47,14 43,11 48,11" 
        fill={goldColor} 
      />
    </svg>
  );
};
