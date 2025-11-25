// Global Theme Configuration for Artelier
// Modern art gallery aesthetic with elegant color palette

export const theme = {
  // Color Palette
  colors: {
    // Primary Colors
    richBlack: '#171717',
    darkGrey: '#1f2933',
    canvasBeige: '#f5f5f5',
    metallicGold: '#d4d4d4',
    softGrey: '#9a9a9a',
    pureWhite: '#FFFFFF',
    
    // Accent Colors
    deepCharcoal: '#262626',
    warmGold: '#a3a3a3',
    lightBeige: '#fafafa',
    mediumGrey: '#6b6b6b',
    
    // Status Colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    
    // Overlay & Shadows
    overlayDark: 'rgba(23, 23, 23, 0.85)',
    overlayLight: 'rgba(255, 255, 255, 0.95)',
    shadowLight: 'rgba(0, 0, 0, 0.1)',
    shadowMedium: 'rgba(0, 0, 0, 0.15)',
    shadowHeavy: 'rgba(0, 0, 0, 0.25)',
  },

  // Typography
  fonts: {
    primary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    heading: "'Playfair Display', 'Georgia', serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },

  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Spacing (using 8px base unit)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    gold: '0 4px 20px rgba(212, 175, 55, 0.3)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    base: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },

  // Breakpoints (for media queries)
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Gradients
  gradients: {
    goldShimmer: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 50%, #f5f5f5 100%)',
    darkOverlay: 'linear-gradient(180deg, rgba(23, 23, 23, 0) 0%, rgba(23, 23, 23, 0.8) 100%)',
    lightOverlay: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 100%)',
    beigeFade: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
    darkToGrey: 'linear-gradient(135deg, #171717 0%, #262626 100%)',
  },
};

// CSS Variables Generator (for use in CSS files)
export const generateCSSVariables = () => {
  return `
    :root {
      /* Colors */
      --color-rich-black: ${theme.colors.richBlack};
      --color-dark-grey: ${theme.colors.darkGrey};
      --color-canvas-beige: ${theme.colors.canvasBeige};
      --color-metallic-gold: ${theme.colors.metallicGold};
      --color-soft-grey: ${theme.colors.softGrey};
      --color-pure-white: ${theme.colors.pureWhite};
      --color-deep-charcoal: ${theme.colors.deepCharcoal};
      --color-warm-gold: ${theme.colors.warmGold};
      --color-light-beige: ${theme.colors.lightBeige};
      --color-medium-grey: ${theme.colors.mediumGrey};
      
      /* Fonts */
      --font-primary: ${theme.fonts.primary};
      --font-heading: ${theme.fonts.heading};
      --font-mono: ${theme.fonts.mono};
      
      /* Transitions */
      --transition-fast: ${theme.transitions.fast};
      --transition-base: ${theme.transitions.base};
      --transition-slow: ${theme.transitions.slow};
      
      /* Shadows */
      --shadow-sm: ${theme.shadows.sm};
      --shadow-base: ${theme.shadows.base};
      --shadow-md: ${theme.shadows.md};
      --shadow-lg: ${theme.shadows.lg};
      --shadow-xl: ${theme.shadows.xl};
      --shadow-gold: ${theme.shadows.gold};
    }
  `;
};

export default theme;
