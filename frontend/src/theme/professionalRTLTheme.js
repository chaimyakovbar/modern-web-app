import { createTheme } from '@mui/material/styles';

/**
 * Professional RTL Design System
 * Modern, lightweight, and elegant theme with full RTL support for Hebrew
 * 
 * Key Features:
 * - Natural RTL layout without visual shifts
 * - Professional color palette
 * - Hebrew-optimized typography
 * - Modular and maintainable structure
 */

// ===========================================
// PROFESSIONAL COLOR PALETTE
// ===========================================
const colors = {
    // Primary - Deep Blue (#1A3E8C)
    primary: {
        50: '#e6f0ff',
        100: '#b3d1ff',
        200: '#80b2ff',
        300: '#4d93ff',
        400: '#1a74ff',
        500: '#1A3E8C', // Main primary color
        600: '#1532a3',
        700: '#1026ba',
        800: '#0b1ad1',
        900: '#060ee8',
    },

    // Secondary - Vibrant Teal (#1ABC9C)
    secondary: {
        50: '#e6f7f4',
        100: '#b3e6dd',
        200: '#80d5c6',
        300: '#4dc4af',
        400: '#1ab398',
        500: '#1ABC9C', // Main secondary color
        600: '#17a68c',
        700: '#14907c',
        800: '#117a6c',
        900: '#0e645c',
    },

    // Neutral - Dark Warm Gray (#2C2C2C)
    neutral: {
        50: '#f5f5f5',
        100: '#e8e8e8',
        200: '#d1d1d1',
        300: '#b4b4b4',
        400: '#979797',
        500: '#7a7a7a',
        600: '#5d5d5d',
        700: '#404040',
        800: '#2C2C2C', // Main neutral color
        900: '#1a1a1a',
    },

    // Background colors
    background: {
        default: '#2C2C2C',
        paper: '#404040',
        elevated: '#5d5d5d',
    },

    // Surface colors for cards and elevated elements
    surface: {
        primary: '#ffffff',
        secondary: '#f8f8f8',
        tertiary: '#e8e8e8',
    },

    // Semantic colors
    success: '#1ABC9C',
    warning: '#f39c12',
    error: '#e74c3c',
    info: '#1A3E8C',
};

// ===========================================
// HEBREW-OPTIMIZED TYPOGRAPHY
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

    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
    },

    // Typography scale optimized for Hebrew reading
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
// SHADOWS - Professional and subtle
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
// TRANSITIONS - Smooth and professional
// ===========================================
const transitions = {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
};

// ===========================================
// LTR UTILITIES - Natural LTR flow
// ===========================================
export const ltrUtils = {
    // Get LTR-aware margin (applies to left side in LTR)
    margin: (value) => ({
        marginLeft: value,
        marginRight: 0,
    }),

    // Get LTR-aware padding (applies to left side in LTR)
    padding: (value) => ({
        paddingLeft: value,
        paddingRight: 0,
    }),

    // Get LTR-aware border (applies to left side in LTR)
    border: (value) => ({
        borderLeft: value,
        borderRight: 'none',
    }),

    // Text alignment for LTR
    textAlign: 'left',

    // Flex direction for LTR
    flexDirection: 'row',

    // Icon positioning for LTR
    iconPosition: {
        start: 'left',
        end: 'right',
    },
};

// ===========================================
// PROFESSIONAL RTL THEME
// ===========================================
export const professionalRTLTheme = createTheme({
    // Enable LTR direction globally
    direction: 'ltr',

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

    // Component customizations for natural RTL
    components: {
        // AppBar - RTL optimized without visual shifts
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

        // Drawer - Natural LTR positioning
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.background.paper,
                    color: colors.surface.primary,
                    borderRight: `1px solid ${colors.neutral[600]}`,
                    // Natural LTR positioning without transforms
                    '& .MuiListItemButton-root': {
                        textAlign: 'left',
                        paddingLeft: spacing[2],
                        paddingRight: spacing[1],
                    },
                },
            },
        },

        // Button - Professional with RTL support
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
                    // RTL icon positioning
                    '& .MuiButton-startIcon': {
                        marginRight: spacing[1],
                        marginLeft: 0,
                    },
                    '& .MuiButton-endIcon': {
                        marginLeft: spacing[1],
                        marginRight: 0,
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

        // Card - Professional with natural RTL
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

        // TextField - LTR optimized input
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
                            textAlign: 'left', // Natural LTR text alignment
                            direction: 'ltr',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: colors.neutral[400],
                        left: 0,
                        right: 'auto',
                        transformOrigin: 'top left',
                        '&.Mui-focused': {
                            color: colors.primary[500],
                            transform: 'translate(14px, -9px) scale(0.75)',
                        },
                        '&.MuiFormLabel-filled': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                        },
                    },
                    // LTR adornment positioning
                    '& .MuiInputAdornment-root': {
                        '&.MuiInputAdornment-positionStart': {
                            marginLeft: spacing[1],
                            marginRight: 0,
                        },
                        '&.MuiInputAdornment-positionEnd': {
                            marginRight: spacing[1],
                            marginLeft: 0,
                        },
                    },
                },
            },
        },

        // ListItemButton - Natural LTR navigation
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.lg,
                    margin: '4px 8px',
                    transition: `all ${transitions.normal}`,
                    textAlign: 'left',
                    '&.Mui-selected': {
                        backgroundColor: `${colors.primary[500]}20`,
                        color: colors.primary[300],
                        borderLeft: `3px solid ${colors.primary[500]}`,
                        borderRight: 'none',
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

        // LinearProgress - Professional gradient
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

        // Paper - Professional background
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

        // Tabs - LTR optimized
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTabs-indicator': {
                        left: 0,
                        right: 'auto',
                    },
                },
            },
        },

        // Tab - LTR text alignment
        MuiTab: {
            styleOverrides: {
                root: {
                    textAlign: 'left',
                    direction: 'ltr',
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
// LTR COMPONENT GUIDELINES
// ===========================================
export const ltrGuidelines = {
    // How to create LTR components
    createLTRComponent: `
    // 1. Use ltrUtils for positioning
    import { ltrUtils } from './theme/professionalRTLTheme';
    
    const LTRComponent = () => (
      <Box sx={{
        ...ltrUtils.margin('16px'),
        textAlign: ltrUtils.textAlign,
        direction: 'ltr'
      }}>
        <Typography>English text</Typography>
      </Box>
    );
  `,

    // Icon positioning in LTR
    iconPositioning: `
    // Use start/end instead of left/right
    <Button startIcon={<Icon />}>Button</Button>
    <TextField 
      InputProps={{
        startAdornment: <Icon />
      }}
    />
  `,

    // Text alignment
    textAlignment: `
    // Always use textAlign: 'left' for LTR
    <Typography sx={{ textAlign: 'left' }}>
      English text
    </Typography>
  `,
};

export default professionalRTLTheme;
