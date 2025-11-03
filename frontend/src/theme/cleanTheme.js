import { createTheme } from "@mui/material/styles";

const palette = {
    mode: "light",
    primary: {
        main: "#111111",
        light: "#1F2937", // gray-800 like
        dark: "#000000",
        contrastText: "#FFFFFF",
    },
    secondary: {
        main: "#6B7280", // gray-500
        light: "#9CA3AF",
        dark: "#374151",
        contrastText: "#111111",
    },
    background: {
        default: "#FFFFFF",
        paper: "#FFFFFF",
    },
    divider: "#E5E7EB",
    text: {
        primary: "#111111",
        secondary: "#6B7280",
    },
    success: { main: "#22C55E" }, // green
    warning: { main: "#F59E0B" },
    error: { main: "#EF4444" }, // red
    info: { main: "#111111" },
};

const shape = { borderRadius: 8 };

const typography = {
    fontFamily: [
        'Inter',
        'Heebo',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
    ].join(','),
    button: { textTransform: 'none', fontWeight: 600 },
};

const components = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                backgroundColor: '#FFFFFF',
                color: '#0B1220',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                paddingInline: 16,
                paddingBlock: 8,
                border: `1px solid ${'#E5E7EB'}`,
                boxShadow: 'none',
            },
            contained: {
                border: '1px solid transparent',
                boxShadow: 'none',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#000000' },
                '&.Mui-disabled': { backgroundColor: '#E5E7EB', color: '#9CA3AF' },
            },
            outlined: {
                borderColor: palette.primary.main,
                color: palette.primary.main,
                '&:hover': { backgroundColor: '#F5F5F5' },
            },
            text: {
                border: '1px solid transparent',
                '&:hover': { backgroundColor: '#F5F5F5' },
            },
        },
    },
    MuiToggleButton: {
        styleOverrides: {
            root: {
                borderRadius: 9999,
                borderColor: palette.divider,
                paddingInline: 12,
                '&.Mui-selected': {
                    backgroundColor: palette.primary.main,
                    color: palette.primary.contrastText,
                    borderColor: palette.primary.main,
                    '&:hover': { backgroundColor: '#000000' },
                },
            },
        },
    },
    MuiChip: {
        styleOverrides: { root: { borderRadius: 9999 } },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFFFFF',
                    borderRadius: 8,
                    '& fieldset': { borderColor: '#E5E7EB' },
                    '&:hover fieldset': { borderColor: '#D1D5DB' },
                    '&.Mui-focused': {
                        boxShadow: '0 0 0 3px rgba(0,0,0,0.2)',
                    },
                    '&.Mui-focused fieldset': { borderColor: palette.primary.main, borderWidth: 2 },
                },
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                boxShadow: 'none',
                border: `1px solid ${'#E5E7EB'}`,
            },
            rounded: {
                borderRadius: 8,
            },
            outlined: {
                borderColor: '#E5E7EB',
            },
        },
        defaultProps: {
            elevation: 0,
            variant: 'outlined',
        },
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: 9999,
                '&.Mui-selected': {
                    backgroundColor: 'rgba(0,0,0,0.08)',
                },
                '&:hover': {
                    backgroundColor: '#F5F5F5',
                },
            },
        },
    },
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 12,
                backgroundColor: palette.background.paper,
                border: `1px solid ${'#E5E7EB'}`,
            },
        },
    },
};

export const cleanTheme = createTheme({ palette, shape, typography, components });

export default cleanTheme;


