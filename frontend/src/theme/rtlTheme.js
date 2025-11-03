import { createTheme } from '@mui/material/styles';

// Modern RTL Design System for Hebrew
// Professional, lightweight, and elegant theme with full RTL support

// ===========================================
// COLOR PALETTE - Professional & Modern
// ===========================================
const colors = {
    // Primary Colors - Deep Blue (#1A3E8C)
    primary: {
        50: '#e6f0ff',
        100: '#b3d1ff',
        200: '#80b2ff',
        300: '#4d93ff',
        400: '#1a74ff',
        500: '#1A3E8C', // Main primary - Deep Blue
        600: '#1532a3',
        700: '#1026ba',
        800: '#0b1ad1',
        900: '#060ee8',
    },

    // Secondary Colors - Vibrant Teal (#1ABC9C)
    secondary: {
        50: '#e6f7f4',
        100: '#b3e6dd',
        200: '#80d5c6',
        300: '#4dc4af',
        400: '#1ab398',
        500: '#1ABC9C', // Main secondary - Vibrant Teal
        600: '#17a68c',
        700: '#14907c',
        800: '#117a6c',
        900: '#0e645c',
    },

    // Neutral Colors - Dark Warm Gray (#2C2C2C)
    neutral: {
        50: '#f5f5f5',
        100: '#e8e8e8',
        200: '#d1d1d1',
        300: '#b4b4b4',
        400: '#979797',
        500: '#7a7a7a',
        600: '#5d5d5d',
        700: '#404040',
        800: '#2C2C2C', // Main neutral - Dark Warm Gray
        900: '#1a1a1a',
    },

    // Background Colors - Professional dark theme
    background: {
        default: '#2C2C2C',
        paper: '#404040',
        elevated: '#5d5d5d',
    },

    // Surface Colors - For cards and elevated elements
    surface: {
        primary: '#ffffff',
        secondary: '#f8f8f8',
        tertiary: '#e8e8e8',
    },

    // Semantic Colors - Professional and accessible
    success: '#1ABC9C',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#1A3E8C',
};

// ===========================================
// TYPOGRAPHY - Hebrew Optimized
// ===========================================
const typography = {
    fontFamily: [
        '"Heebo"', // Hebrew-optimized font
        '"Inter"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','),

    // Font weights for Hebrew
    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
    },

    // Typography scale optimized for Hebrew
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
    },
    h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },
    h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.4,
    },
    h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.5,
    },
    h6: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
    },
    body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },
};

// ===========================================
// SPACING SYSTEM - 8px Grid
// ===========================================
const spacing = {
    0: 0,
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    20: '5rem',   // 80px
    24: '6rem',   // 96px
};

// ===========================================
// BORDER RADIUS SYSTEM
// ===========================================
const borderRadius = {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',     // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
};

// ===========================================
// SHADOWS - Modern and subtle
// ===========================================
const shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

// ===========================================
// TRANSITIONS - Smooth animations
// ===========================================
const transitions = {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
};

// ===========================================
// RTL THEME CONFIGURATION
// ===========================================
export const rtlTheme = createTheme({
    // Enable RTL direction globally
    direction: 'rtl',

    // Color palette
    palette: {
        mode: 'dark',
        primary: {
            main: colors.primary[500],
            light: colors.primary[300],
            dark: colors.primary[700],
            contrastText: colors.surface.primary,
        },
        secondary: {
            main: colors.secondary[500],
            light: colors.secondary[300],
            dark: colors.secondary[700],
            contrastText: colors.surface.primary,
        },
        background: {
            default: colors.background.default,
            paper: colors.background.paper,
        },
        text: {
            primary: colors.surface.primary,
            secondary: colors.neutral[300],
        },
        error: {
            main: colors.error,
        },
        warning: {
            main: colors.warning,
        },
        info: {
            main: colors.info,
        },
        success: {
            main: colors.success,
        },
    },

    // Typography configuration
    typography: {
        fontFamily: typography.fontFamily,
        fontWeightLight: typography.fontWeight.light,
        fontWeightRegular: typography.fontWeight.regular,
        fontWeightMedium: typography.fontWeight.medium,
        fontWeightBold: typography.fontWeight.bold,
        h1: typography.h1,
        h2: typography.h2,
        h3: typography.h3,
        h4: typography.h4,
        h5: typography.h5,
        h6: typography.h6,
        body1: typography.body1,
        body2: typography.body2,
        caption: typography.caption,
    },

    // Spacing configuration
    spacing: 8, // 8px base unit

    // Shape configuration
    shape: {
        borderRadius: parseInt(borderRadius.lg),
    },

    // Component customizations for RTL
    components: {
        // AppBar - RTL optimized
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.default,
                    color: colors.surface.primary,
                    boxShadow: shadows.md,
                    borderBottom: `1px solid ${colors.neutral[600]}`,
                },
            },
        },

        // Drawer - RTL optimized
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.background.paper,
                    color: colors.surface.primary,
                    borderLeft: `1px solid ${colors.neutral[600]}`,
                    // RTL specific styling
                    '& .MuiListItemButton-root': {
                        textAlign: 'right',
                    },
                },
            },
        },

        // Button - Modern with RTL support
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: typography.fontWeight.medium,
                    borderRadius: borderRadius.lg,
                    padding: `${spacing[2]} ${spacing[4]}`,
                    transition: `all ${transitions.normal}`,
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: shadows.md,
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
                    boxShadow: shadows.sm,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})`,
                        boxShadow: shadows.md,
                    },
                },
                outlined: {
                    borderColor: colors.primary[500],
                    color: colors.primary[500],
                    '&:hover': {
                        backgroundColor: `${colors.primary[500]}10`,
                        borderColor: colors.primary[400],
                    },
                },
            },
        },

        // Card - Modern with RTL support
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.paper,
                    color: colors.surface.primary,
                    borderRadius: borderRadius.xl,
                    border: `1px solid ${colors.neutral[600]}`,
                    boxShadow: shadows.lg,
                    transition: `all ${transitions.normal}`,
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: shadows.xl,
                    },
                },
            },
        },

        // TextField - RTL optimized
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: borderRadius.lg,
                        backgroundColor: colors.background.elevated,
                        transition: `all ${transitions.normal}`,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.primary[400],
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                            borderColor: colors.primary[500],
                        },
                        '& input': {
                            textAlign: 'right', // RTL text alignment
                            color: colors.surface.primary,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: colors.neutral[400],
                        '&.Mui-focused': {
                            color: colors.primary[500],
                        },
                    },
                },
            },
        },

        // ListItemButton - RTL navigation
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.lg,
                    margin: '4px 8px',
                    transition: `all ${transitions.normal}`,
                    textAlign: 'right', // RTL text alignment
                    '&.Mui-selected': {
                        backgroundColor: `${colors.primary[500]}20`,
                        color: colors.primary[300],
                        borderLeft: `3px solid ${colors.primary[500]}`,
                        '&:hover': {
                            backgroundColor: `${colors.primary[500]}30`,
                        },
                    },
                    '&:hover': {
                        backgroundColor: colors.neutral[700],
                        color: colors.surface.primary,
                    },
                },
            },
        },

        // Chip - RTL optimized
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.neutral[600],
                    color: colors.neutral[300],
                    fontWeight: typography.fontWeight.medium,
                },
                colorSuccess: {
                    backgroundColor: colors.success,
                    color: colors.surface.primary,
                },
                colorError: {
                    backgroundColor: colors.error,
                    color: colors.surface.primary,
                },
                colorWarning: {
                    backgroundColor: colors.warning,
                    color: colors.surface.primary,
                },
            },
        },

        // LinearProgress - Modern gradient
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 6,
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.neutral[600],
                },
                bar: {
                    background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.secondary[500]})`,
                },
            },
        },

        // Paper - RTL optimized
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background.paper,
                },
                elevation1: {
                    boxShadow: shadows.sm,
                },
                elevation2: {
                    boxShadow: shadows.md,
                },
                elevation3: {
                    boxShadow: shadows.lg,
                },
            },
        },
    },
});

// ===========================================
// DESIGN TOKENS EXPORT
// ===========================================
export const designTokens = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    transitions,
};

// ===========================================
// RTL UTILITIES
// ===========================================
export const rtlUtils = {
    // Get RTL-aware margin
    margin: (value) => ({
        marginLeft: value,
        marginRight: 0,
    }),

    // Get RTL-aware padding
    padding: (value) => ({
        paddingLeft: value,
        paddingRight: 0,
    }),

    // Get RTL-aware border
    border: (value) => ({
        borderLeft: value,
        borderRight: 'none',
    }),

    // Get RTL-aware text alignment
    textAlign: 'right',

    // Get RTL-aware flex direction
    flexDirection: 'row-reverse',
};

export default rtlTheme;
