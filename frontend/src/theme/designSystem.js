import { createTheme } from '@mui/material/styles';

// Color Palette - Professional and elegant design
const colors = {
    // Primary Colors - Deep Blue / Royal Blue (#1A3E8C)
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

    // Secondary Colors - Vibrant Teal / Aqua (#1ABC9C)
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

    // Accent Colors - Teal variations for highlights
    accent: {
        50: '#e6f7f4',
        100: '#b3e6dd',
        200: '#80d5c6',
        300: '#4dc4af',
        400: '#1ab398',
        500: '#1ABC9C', // Same as secondary
        600: '#17a68c',
        700: '#14907c',
        800: '#117a6c',
        900: '#0e645c',
    },

    // Background Colors - Dark Warm Gray (#2C2C2C)
    background: {
        50: '#f5f5f5',
        100: '#e8e8e8',
        200: '#d1d1d1',
        300: '#b4b4b4',
        400: '#979797',
        500: '#7a7a7a',
        600: '#5d5d5d',
        700: '#404040',
        800: '#2C2C2C', // Main dark background - Dark Warm Gray
        900: '#1a1a1a', // Darker background
    },

    // Surface Colors - For cards and elevated elements
    surface: {
        50: '#ffffff',
        100: '#f8f8f8',
        200: '#f0f0f0',
        300: '#e8e8e8',
        400: '#d8d8d8',
        500: '#c8c8c8',
        600: '#b8b8b8',
        700: '#a8a8a8',
        800: '#989898',
        900: '#888888',
    },

    // Neutral Colors - Based on Dark Warm Gray
    neutral: {
        50: '#f5f5f5',
        100: '#e8e8e8',
        200: '#d1d1d1',
        300: '#b4b4b4',
        400: '#979797',
        500: '#7a7a7a',
        600: '#5d5d5d',
        700: '#404040',
        800: '#2C2C2C',
        900: '#1a1a1a',
    },

    // Semantic Colors - Professional and elegant
    success: '#1ABC9C', // Teal for success
    warning: '#f39c12', // Orange for warning
    error: '#e74c3c', // Red for error
    info: '#1A3E8C', // Deep Blue for info
};

// Typography Scale - Modern, readable hierarchy
const typography = {
    fontFamily: [
        '"Inter"',
        '"Roboto"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','),

    // Font weights
    fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
    },

    // Font sizes with perfect scale
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
    },

    // Line heights
    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
};

// Spacing Scale - Consistent 8px grid system
const spacing = {
    0: 0,
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
};

// Border Radius Scale
const borderRadius = {
    none: 0,
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
};

// Shadow Scale
const shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

// Animation Durations
const transitions = {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
};

// Create the main theme
export const designSystem = createTheme({
    direction: 'rtl',

    palette: {
        mode: 'dark', // Professional dark theme
        primary: {
            main: colors.primary[500], // #1A3E8C - Deep Blue
            light: colors.primary[300],
            dark: colors.primary[700],
            contrastText: '#ffffff',
        },
        secondary: {
            main: colors.secondary[500], // #1ABC9C - Vibrant Teal
            light: colors.secondary[300],
            dark: colors.secondary[700],
            contrastText: '#ffffff',
        },
        error: {
            main: colors.error,
            light: '#f5b7b1',
            dark: '#c0392b',
        },
        warning: {
            main: colors.warning,
            light: '#f8c471',
            dark: '#d68910',
        },
        info: {
            main: colors.info,
            light: colors.primary[200],
            dark: colors.primary[700],
        },
        success: {
            main: colors.success,
            light: colors.accent[200],
            dark: colors.accent[700],
        },
        background: {
            default: colors.background[800], // #2C2C2C - Dark Warm Gray
            paper: colors.background[700], // Slightly lighter for cards
        },
        text: {
            primary: colors.surface[50], // Clean white text
            secondary: colors.neutral[300], // Soft gray for secondary
            disabled: colors.neutral[500],
        },
        divider: colors.background[600], // Subtle divider
    },

    typography: {
        fontFamily: typography.fontFamily,
        fontWeightLight: typography.fontWeight.light,
        fontWeightRegular: typography.fontWeight.regular,
        fontWeightMedium: typography.fontWeight.medium,
        fontWeightBold: typography.fontWeight.bold,

        h1: {
            fontSize: typography.fontSize['5xl'],
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.tight,
            letterSpacing: '-0.025em',
        },
        h3: {
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.semiBold,
            lineHeight: typography.lineHeight.tight,
        },
        h4: {
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.semiBold,
            lineHeight: typography.lineHeight.normal,
        },
        h5: {
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.medium,
            lineHeight: typography.lineHeight.normal,
        },
        h6: {
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.medium,
            lineHeight: typography.lineHeight.normal,
        },
        body1: {
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.regular,
            lineHeight: typography.lineHeight.normal,
        },
        body2: {
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.regular,
            lineHeight: typography.lineHeight.normal,
        },
        caption: {
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.regular,
            lineHeight: typography.lineHeight.normal,
        },
    },

    spacing: 8, // 8px base unit

    shape: {
        borderRadius: parseInt(borderRadius.lg),
    },

    components: {
        // AppBar Component - Professional glass effect
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: `${colors.background[800]}CC`, // Semi-transparent Dark Warm Gray
                    backdropFilter: 'blur(10px)',
                    color: colors.surface[50],
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderBottom: `1px solid ${colors.background[600]}`,
                },
            },
        },

        // Drawer Component - Professional dark sidebar
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: colors.background[900], // Darker background
                    color: colors.surface[50],
                    borderLeft: `1px solid ${colors.background[600]}`,
                },
            },
        },

        // Button Component - Professional with Deep Blue gradients
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: typography.fontWeight.medium,
                    borderRadius: borderRadius.lg,
                    padding: `${spacing[2]} ${spacing[4]}`,
                    transition: `all ${transitions.normal} ease-in-out`,
                    '&:hover': {
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                },
                contained: {
                    background: `linear-gradient(135deg, ${colors.primary[500]}, ${colors.primary[600]})`,
                    boxShadow: `0 4px 14px 0 ${colors.primary[500]}40`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})`,
                        boxShadow: `0 6px 20px 0 ${colors.primary[500]}60`,
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

        // Card Component - Professional with Dark Warm Gray
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background[700], // Dark Warm Gray for cards
                    color: colors.surface[50],
                    borderRadius: borderRadius.xl,
                    border: `1px solid ${colors.background[600]}`,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    transition: `all ${transitions.normal} ease-in-out`,
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                    },
                },
            },
        },

        // TextField Component - Professional with Deep Blue focus
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: borderRadius.lg,
                        backgroundColor: colors.background[600],
                        transition: `all ${transitions.normal} ease-in-out`,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.primary[400],
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                            borderColor: colors.primary[500],
                        },
                        '& input': {
                            color: colors.surface[50],
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

        // Paper Component - Modern background
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.background[800],
                },
                elevation1: {
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
                elevation2: {
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                },
                elevation3: {
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                },
            },
        },

        // ListItemButton - Professional sidebar navigation
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.lg,
                    margin: '4px 8px',
                    transition: `all ${transitions.normal} ease-in-out`,
                    '&.Mui-selected': {
                        backgroundColor: `${colors.primary[500]}20`,
                        color: colors.primary[300],
                        borderLeft: `3px solid ${colors.primary[500]}`,
                        '&:hover': {
                            backgroundColor: `${colors.primary[500]}30`,
                        },
                    },
                    '&:hover': {
                        backgroundColor: colors.background[700],
                        color: colors.surface[50],
                    },
                },
            },
        },

        // Chip Component - Professional with Vibrant Teal accents
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.background[600],
                    color: colors.neutral[300],
                    fontWeight: typography.fontWeight.medium,
                },
                colorSuccess: {
                    backgroundColor: colors.accent[500], // Vibrant Teal
                    color: colors.surface[50],
                },
                colorError: {
                    backgroundColor: colors.error,
                    color: colors.surface[50],
                },
                colorWarning: {
                    backgroundColor: colors.warning,
                    color: colors.surface[50],
                },
            },
        },

        // LinearProgress - Professional with Deep Blue to Teal gradient
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 6,
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.background[600],
                },
                bar: {
                    background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.accent[500]})`,
                },
            },
        },
    },
});

// Export design tokens for direct use
export const designTokens = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    transitions,
};

// Utility functions for consistent styling
export const getSpacing = (multiplier) => `${multiplier * 8}px`;
export const getColor = (colorName, shade = 500) => colors[colorName]?.[shade] || colorName;
export const getShadow = (level) => shadows[level] || shadows.base;
export const getBorderRadius = (size) => borderRadius[size] || borderRadius.lg;
