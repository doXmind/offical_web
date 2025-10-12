// Theme configuration for doXmind
export const theme = {
  // Color system
  colors: {
    primary: {
      DEFAULT: '#0F766E',
      light: '#14b8a6',
      dark: '#0D5D56',
    },
    black: '#000000',
    white: '#ffffff',
    gray: {
      50: '#f5f5f5',
      100: '#e5e5e5',
      200: '#cccccc',
      300: '#aaaaaa',
      400: '#8a8a8a',
      500: '#6a6a6a',
      600: '#4a4a4a',
      700: '#2a2a2a',
      800: '#1a1a1a',
      900: '#0a0a0a',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
    },
  },

  // Spacing system (8px base)
  spacing: {
    0: '0',
    1: '0.5rem',   // 8px
    2: '1rem',     // 16px
    3: '1.5rem',   // 24px
    4: '2rem',     // 32px
    5: '2.5rem',   // 40px
    6: '3rem',     // 48px
    8: '4rem',     // 64px
    10: '5rem',    // 80px
    12: '6rem',    // 96px
    16: '8rem',    // 128px
    20: '10rem',   // 160px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(17, 196, 212, 0.3)',
    'glow-lg': '0 0 30px rgba(17, 196, 212, 0.3)',
  },

  // Transitions
  transitions: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
    modal: 1000,
    dropdown: 1050,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    tooltip: 1400,
  },
};

// Helper function to get theme values
export const getThemeValue = (path) => {
  const keys = path.split('.');
  let value = theme;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return undefined;
  }
  
  return value;
};