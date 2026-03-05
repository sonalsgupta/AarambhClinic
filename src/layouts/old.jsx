// import * as React from "react";
// import {
//     AppBar,
//     Box,
//     CssBaseline,
//     Divider,
//     Drawer,
//     IconButton,
//     List,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText,
//     Toolbar,
//     Typography,
//     useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import bannerImg from "../styles/assets/images/clinic-banner.png";
// import logoImg from "../styles/assets/images/logo.png";

// import {
//     Menu as MenuIcon,
//     Dashboard as DashboardIcon,
//     People as PeopleIcon,
//     EventNote as EventNoteIcon,
//     Medication as MedicationIcon,
//     Description as DescriptionIcon,
//     Settings as SettingsIcon,
// } from "@mui/icons-material";

// // Sidebar width
// const drawerWidth = 260;

// const navItems = [
//     { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
//     { label: "Patients", icon: <PeopleIcon />, path: "/patients" },
//     { label: "Visits", icon: <EventNoteIcon />, path: "/visits" },
//     { label: "Prescriptions", icon: <MedicationIcon />, path: "/prescriptions" },
//     { label: "Reports", icon: <DescriptionIcon />, path: "/reports" },
//     { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
// ];

// export default function AppLayout({ children, onNavigate, activePath = "/" }) {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//     const [mobileOpen, setMobileOpen] = React.useState(false);

//     const handleDrawerToggle = () => setMobileOpen((v) => !v);

//     const DrawerContent = (
//         <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//             <Toolbar sx={{ gap: 1 }}>
//                 <Box
//                     component="img"
//                     src={logoImg}
//                     alt="ClinicFlow"
//                     sx={{
//                         width: 60,
//                         height: 60,
//                         borderRadius: 2,
//                         objectFit: "contain", // or "cover" if you want fill
//                     }}
//                 />
//                 <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1 }}>
//                         ClinicFlow
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         Patient Records
//                     </Typography>
//                 </Box>
//             </Toolbar>

//             {/* <Divider /> */}

//             <List sx={{ px: 1, py: 1 }}>
//                 {navItems.map((item) => (
//                     <ListItemButton
//                         key={item.path}
//                         selected={activePath === item.path}
//                         onClick={() => {
//                             onNavigate?.(item.path);
//                             if (isMobile) setMobileOpen(false);
//                         }}
//                         sx={{
//                             borderRadius: 2,
//                             mb: 0.5,
//                         }}
//                     >
//                         <ListItemIcon sx={{ minWidth: 5 }}>{item.icon}</ListItemIcon>
//                         <ListItemText primary={item.label} />
//                     </ListItemButton>
//                 ))}
//             </List>

//             <Box sx={{ flex: 1 }} />

//             <Divider />

//             <Box sx={{ p: 2 }}>
//                 <Typography variant="caption" color="text.secondary">
//                     © {new Date().getFullYear()} ClinicFlow
//                 </Typography>
//             </Box>
//         </Box>
//     );

//     return (
//         <Box sx={{ display: "flex" }}>

//             <CssBaseline />
//             <AppBar
//                 position="fixed"
//                 elevation={1}
//                 sx={{
//                     width: { md: `calc(100% - ${drawerWidth}px)` },
//                     ml: { md: `${drawerWidth}px` },
//                     bgcolor: "background.paper",
//                     color: "text.primary",
//                     zIndex: (t) => t.zIndex.drawer + 1,
//                 }}
//             >
//                 <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }}>
//                     {isMobile && (
//                         <IconButton onClick={handleDrawerToggle}>
//                             <MenuIcon />
//                         </IconButton>
//                     )}

//                     <Typography variant="h6" fontWeight={700}>
//                         {navItems.find((x) => x.path === activePath)?.label ?? "ClinicFlow"}
//                     </Typography>

//                     <Box sx={{ flexGrow: 1 }} />

//                     <Typography variant="body2">Dr. Admin</Typography>
//                 </Toolbar>
//             </AppBar>



//             {/* Desktop drawer */}
//             {!isMobile && (
//                 <Drawer
//                     variant="permanent"
//                     sx={{
//                         width: drawerWidth,
//                         flexShrink: 0,
//                         "& .MuiDrawer-paper": {
//                             width: drawerWidth,
//                             boxSizing: "border-box",
//                             borderRight: "1px solid",
//                             borderColor: "divider",
//                         },
//                     }}
//                 >
//                     {DrawerContent}
//                 </Drawer>
//             )}

//             {/* Mobile drawer */}
//             {isMobile && (
//                 <Drawer
//                     variant="temporary"
//                     open={mobileOpen}
//                     onClose={handleDrawerToggle}
//                     ModalProps={{ keepMounted: true }}
//                     sx={{
//                         "& .MuiDrawer-paper": {
//                             width: drawerWidth,
//                             boxSizing: "border-box",
//                         },
//                     }}
//                 >
//                     {DrawerContent}
//                 </Drawer>
//             )}

//             <Box
//                 component="main"
//                 sx={{
//                     flexGrow: 1,
//                     p: 3,
//                     mt: { xs: "64px", sm: "72px" },
//                     minHeight: "100vh",
//                     position: "relative",
//                     overflow: "hidden",
//                     bgcolor: "background.default",
//                     width: '100vw',

//                     // watermark layer
//                     "&::before": {
//                         content: '""',
//                         position: "fixed",
//                         inset: 0,
//                         top: 100,
//                         left: '40%',
//                         right: 0,      // 👈 instead of width: 100vw
//                         bottom: 0,
//                         backgroundImage: `url(${bannerImg})`,
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "0 0",
//                         backgroundSize: "contain",
//                         opacity: 0.02,       // 👈 watermark subtlety
//                         pointerEvents: "none",
//                         zIndex: 0,
//                     },
//                 }}
//             >
//                 {/* actual app content */}
//                 <Box sx={{ position: "relative", zIndex: 1 }}>
//                     {children}
//                 </Box>
//             </Box>

//         </Box>

//     );
// }