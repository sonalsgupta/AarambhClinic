import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: { main: "#2563EB" },
    secondary: { main: "#0D9488" },

    ...(mode === "light"
      ? {
          background: { default: "#F8FAFC", paper: "#FFFFFF" },
          text: { primary: "#0F172A", secondary: "#475569" },
          divider: "rgba(15, 23, 42, 0.12)",
        }
      : {
          background: { default: "#0B1220", paper: "#111827" },
          text: { primary: "#E5E7EB", secondary: "#9CA3AF" },
          divider: "rgba(229, 231, 235, 0.12)",
        }),
  },

  shape: { borderRadius: 8 },

  typography: {
    fontFamily: ["Inter", "Roboto", "Arial", "sans-serif"].join(","),
    fontSize: 13,
    h6: { fontSize: "1rem", fontWeight: 700 },
    subtitle1: { fontSize: "0.85rem", fontWeight: 600 },
    body1: { fontSize: "0.8rem", lineHeight: 1.5 },
    body2: { fontSize: "0.75rem", lineHeight: 1.4 },
    caption: { fontSize: "0.7rem" },
    button: { fontSize: "0.75rem", fontWeight: 600, textTransform: "none" },
  },

  components: {
    MuiTextField: { defaultProps: { size: "small", margin: "dense" } },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          fontSize: "0.8rem",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.03)"
              : "transparent",
        }),
        input: { padding: "8.5px 10px" },
        notchedOutline: ({ theme }) => ({
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(229,231,235,0.18)"
              : "rgba(15,23,42,0.18)",
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.75rem" },
        shrink: { fontSize: "0.7rem" },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: "0.7rem", marginLeft: 0 },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: { minHeight: 32, padding: "4px 12px", borderRadius: 6 },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(15,23,42,0.06)",
        }),
      },
    },

    MuiChip: {
      styleOverrides: { root: { fontSize: "0.7rem", height: 24 } },
    },

    MuiCheckbox: { styleOverrides: { root: { padding: 6 } } },
    MuiRadio: { styleOverrides: { root: { padding: 6 } } },
    MuiDivider: { styleOverrides: { root: { opacity: 0.6 } } },
  },
});

export const buildTheme = (mode = "light") => createTheme(getDesignTokens(mode));
