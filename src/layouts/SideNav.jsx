import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logoImg from "../styles/assets/images/logo.png";

const drawerWidth = 260;

export default function SideNav({
    navItems,
    isMobile,
    mobileOpen,
    onClose,
}) {
    const [openKey, setOpenKey] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const activePath = location.pathname;

    // auto-open the group if a child is active
    useMemo(() => {
        const parent = navItems.find(
            (i) => i.children?.some((c) => c.path === activePath)
        );
        if (parent?.label) setOpenKey(parent.label);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePath]);

    const DrawerContent = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Compact header (fixes stretched look) */}
            <Toolbar
                disableGutters
                sx={{
                    px: 2,
                    py: 2,
                    minHeight: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >

                {/* Logo */}
                <Box
                    component="img"
                    src={logoImg}
                    alt="ClinicFlow"
                    sx={{
                        width: 110,
                        height: 110,
                        objectFit: "contain",
                        mb: 0.5
                    }}
                />

                {/* Logo Name */}
           

                {/* Tagline */}
                <Typography
                    sx={{
                        fontSize: 11,
                        color: "#6b7a90",
                        letterSpacing: 0.4,
                        lineHeight: 1
                    }}
                >
                    Beginning the journey to better mental health
                </Typography>

            </Toolbar>
            <Divider />

            {/* Menu */}
            <List sx={{ px: 1.2, py: 1 }}>
                {navItems.map((item) => {
                    const isParentActive =
                        item.path === activePath ||
                        item.children?.some((c) => c.path === activePath);

                    const isOpen = openKey === item.label;

                    return (
                        <Box key={item.label} sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => {
                                    if (item.children) {
                                        setOpenKey(isOpen ? null : item.label);
                                    } else {
                                        navigate(item.path);
                                        if (isMobile) onClose?.();
                                    }
                                }}
                                sx={{
                                    borderRadius: 0,
                                    px: 1.4,
                                    py: 1.1,
                                    gap: 1,
                                    color: isParentActive ? "#123b72" : "#233044",
                                    backgroundColor: isParentActive ? "rgba(18,59,114,0.10)" : "transparent",
                                    border: isParentActive ? "1px solid rgba(18,59,114,0.18)" : "1px solid transparent",
                                    transition: "all 160ms ease",
                                    "&:hover": {
                                        backgroundColor: isParentActive
                                            ? "rgba(18,59,114,0.14)"
                                            : "rgba(17, 24, 39, 0.04)",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 36,
                                        color: isParentActive ? "#123b72" : "#5b6b82",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontWeight: isParentActive ? 600 : 500, fontSize: 13 }}>
                                            {item.label}
                                        </Typography>
                                    }
                                />

                                {item.children && (
                                    <Box sx={{ color: "#607089" }}>
                                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                                    </Box>
                                )}
                            </ListItemButton>

                            {/* Children */}
                            {item.children && (
                                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding sx={{ mt: 0.5, ml: 1.2 }}>
                                        {item.children.map((child) => {
                                            const isChildActive = child.path === activePath;

                                            return (
                                                <ListItemButton
                                                    key={child.label}
                                                    onClick={() => {
                                                        navigate(child.path);
                                                        if (isMobile) onClose?.();
                                                    }}
                                                    sx={{
                                                        borderRadius: 0,
                                                        pl: 2.2,
                                                        pr: 1.2,
                                                        py: 0.9,
                                                        mb: 0.4,
                                                        color: isChildActive ? "#123b72" : "#2b3a52",
                                                        backgroundColor: isChildActive
                                                            ? "rgba(18,59,114,0.10)"
                                                            : "transparent",
                                                        "&:hover": {
                                                            backgroundColor: isChildActive
                                                                ? "rgba(18,59,114,0.14)"
                                                                : "rgba(17, 24, 39, 0.04)",
                                                        },
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 34,
                                                            color: isChildActive ? "#123b72" : "#6b7a90",
                                                        }}
                                                    >
                                                        {child.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Typography sx={{ fontWeight: isChildActive ? 600 : 500, fontSize: 13 }}>
                                                                {child.label}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItemButton>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            )}
                        </Box>
                    );
                })}
            </List>

            <Box sx={{ flex: 1 }} />

            <Divider />

            {/* Footer */}
            <Box sx={{ p: 2 }}>
                <Typography variant="caption" sx={{ color: "#6b7a90" }}>
                    © {new Date().getFullYear()} ClinicFlow • Secure Clinical Workspace
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            {!isMobile ? (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            borderRight: "1px solid #e9eef7",
                            background: "linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)",
                        },
                    }}
                >
                    {DrawerContent}
                </Drawer>
            ) : (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={onClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            borderRight: "1px solid #e9eef7",
                            background: "linear-gradient(180deg, #ffffff 0%, #fbfcff 100%)",
                        },
                    }}
                >
                    {DrawerContent}
                </Drawer>
            )}
        </>
    );
}

export { drawerWidth };