/**
 * SMART SCHOOL KZ — UNIVERSAL DESIGN SYSTEM TOKENS (TypeScript Definition)
 * Visual Identity: Educational × Digital × Premium × Human × Futuristic
 * Paradigm: Calm Technology
 */

export const designTokens = {
  // 05. Color System
  colors: {
    bg: '#000000',
    surface: '#ffffff',
    surfaceSoft: '#f5f7f8',
    text: '#ffffff',
    textDark: '#111111',
    muted: '#8e8e8e',
    mutedLight: '#c4c2c3',
    navText: '#2e2e2e',
    
    // Blue Identity
    blue: '#2563eb',
    blueBright: '#3b82f6',
    blueDark: '#0f2f6b',
    
    // Green Identity
    green: '#16a34a',
    greenBright: '#22c55e',
    greenDark: '#14532d',
    
    // Neutrals
    pillDark: '#28282a',
    borderLight: 'rgba(0,0,0,0.10)',
    borderDark: 'rgba(255,255,255,0.14)',
    whiteBorder: 'rgba(255,255,255,0.40)',
    
    // Semantic Status
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#2563eb',
  },

  // 16. Radius System
  radius: {
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    pill: '999px',
  },

  // 26. Shadow System
  shadows: {
    nav: '0 4px 14px rgba(0,0,0,0.16)',
    soft: '0 12px 40px rgba(0,0,0,0.10)',
    deep: '0 20px 60px rgba(0,0,0,0.25)',
  },

  // 07-09. Typography System
  typography: {
    fonts: {
      ui: '"Inter", "Segoe UI", system-ui, sans-serif',
      display: '"BubbledotICG-FinePos", "Geist Pixel Circle", monospace',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    scale: {
      displayXl: 'clamp(48px, 8vw, 120px)',
      display: 'clamp(40px, 6.2vw, 80px)',
      h1: 'clamp(36px, 5vw, 64px)',
      h2: 'clamp(28px, 3.5vw, 48px)',
      h3: 'clamp(22px, 2.5vw, 32px)',
      bodyLg: 'clamp(16px, 1.55vw, 20px)',
      body: '15px',
      small: '13px',
      micro: '11px',
    },
    letterSpacing: {
      display: '-0.04em',
      displayMobile: '-0.06em',
      displayTiny: '-0.08em',
      ui: '-0.01em',
      body: '0',
    },
    lineHeight: {
      display: 1.05,
      h1: 1.1,
      h2h3: 1.2,
      body: 1.55,
      ui: 1.4,
    }
  },

  // 57. Spacing System (4px base)
  spacing: {
    4: '4px',
    8: '8px',
    12: '12px',
    16: '16px',
    20: '20px',
    24: '24px',
    32: '32px',
    40: '40px',
    48: '48px',
    64: '64px',
    80: '80px',
    96: '96px',
    120: '120px',
    160: '160px',
  },

  // 58. Z-Index System
  zIndex: {
    base: 1,
    content: 10,
    header: 100,
    dropdown: 200,
    modal: 500,
    overlay: 600,
    toast: 700,
  },

  // 39. Responsive Breakpoints
  breakpoints: {
    mobile: '420px',
    tablet: '720px',
    desktop: '1440px',
    editorial: '1600px',
  },

  // 41-45. Motion System
  motion: {
    easePrimary: 'cubic-bezier(0.22, 1, 0.36, 1)',
    durationFast: '0.25s',
    durationBase: '0.35s',
    durationEntrance: '0.85s',
    durationHeader: '0.7s',
    pageTransition: '300ms to 600ms',
  },

  // 40. Touch Target
  touchTarget: {
    minWidth: '44px',
    minHeight: '44px',
  }
} as const;

export type DesignTokens = typeof designTokens;
