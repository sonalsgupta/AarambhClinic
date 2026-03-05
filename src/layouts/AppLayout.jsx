import * as React from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopAppBar from "./TopAppBar";
import bannerImg from "../styles/assets/images/clinic-banner3.png";
import PsychologyIcon from '@mui/icons-material/Psychology';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventNote as EventNoteIcon,
  Medication as MedicationIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const navItems = [
  { label: "Home", icon: <DashboardIcon />, path: "/" },
  { label: "New Patient Registration", icon: <PersonIcon />, path: "/newPatient/AddNewPatient" },
  {
    label: "Patients",
    icon: <PeopleIcon />,
    path: "/patients",
    children: [
      { label: "Patient Directory", icon: <EventNoteIcon />, path: "/patients/visits" },
      { label: "Prescriptions", icon: <MedicationIcon />, path: "/patients/prescriptions" },
      { label: "Reports", icon: <DescriptionIcon />, path: "/patients/reports" },
    ],
  },
  { label: "Medicine Inventory", icon: <MedicationIcon />, path: "/medications/medications" },
  {
    label: "Interns", icon: <MedicationIcon />, path: "/medications/medications",
    children: [
      { label: "Intern Directory", icon: <PeopleIcon />, path: "/interns/directory" },
      { label: "New Intern Registration", icon: <PersonIcon />, path: "/interns/new" },
      { label: "Schedule", icon: <EventNoteIcon />, path: "/interns/schedule" },
      { label: "Reports", icon: <DescriptionIcon />, path: "/reports" },

    ],
  },
  { label: "Blogs", icon: <MenuBookIcon />, path: "/blogs" },

  { label: "About Us", icon: <PsychologyIcon />, path: "/AboutPage" },
];

export default function AppLayout({ mode, onToggleMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const activePath = location.pathname;

  const title =
    navItems.find((x) => x.path === activePath)?.label ??
    navItems
      .flatMap((x) => x.children ?? [])
      .find((c) => c.path === activePath)?.label ??
    "ClinicFlow";

  return (

    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <TopAppBar mode={mode} onToggleMode={onToggleMode} />

      <SideNav
        navItems={navItems}
        activePath={activePath}
        onNavigate={(path) => navigate(path)}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",

          /* 👇 critical fix */
          height: {
            xs: "calc(100vh - 64px)",
            sm: "calc(100vh - 72px)",
          },

          p: 3,
          position: "relative",
          bgcolor: "background.default",

          "&::before": {
            content: '""',
            position: "absolute",   // 🔥 key change
            inset: 0,
            top: 100,
            left: "1%",
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            opacity: 0.025,
            pointerEvents: "none",
          },
        }}
      >
        <Outlet />
      </Box>

    </Box>

  );


}
