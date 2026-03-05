import { IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function TopAppBar({ mode, onToggleMode }) {
  return (
    // your existing AppBar/Toolbar here...
    <Tooltip title={mode === "dark" ? "Switch to Light" : "Switch to Dark"}>
      <IconButton color="inherit" onClick={onToggleMode} size="small">
        {mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
