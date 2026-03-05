import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Login from "./components/Login/Login";
import RequireAuth from "./components/Login/RequireAuth";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./components/Dashboard";
import PatientsDetail from "./components/Patient/PatientsRecords/PatientsDetails";
import Visits from "./components/Patient/PatientsRecords/Visits";
import Prescriptions from "./components/Patient/PatientsRecords/Prescriptions";
import Reports from "./components/Patient/PatientsRecords/Reports";
import NewPatientWizard from "./components/NewPatient/AddNewPatient";
import MedicationInventory from "./components/Medications/Medications";
import AboutPage from "./components/About/AboutInDetails";
import Blogs from "./components/Blogs/Blogs";
import { buildTheme } from "./styles/theme";

export default function App() {
  const [mode, setMode] = React.useState(() => localStorage.getItem("cf_mode") || "light");

  React.useEffect(() => {
    localStorage.setItem("cf_mode", mode);
  }, [mode]);

  const theme = React.useMemo(() => buildTheme(mode), [mode]);
  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* 1) Public route */}
          <Route path="/login" element={<Login />} />

          {/* 2) Protected app routes */}
          <Route
            element={
              <RequireAuth>
                <AppLayout mode={mode} onToggleMode={toggleMode} />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/newPatient/AddNewPatient" element={<NewPatientWizard />} />
            <Route path="/patients" element={<PatientsDetail />} />
            <Route path="/patients/visits" element={<Visits />} />
            <Route path="/patients/prescriptions" element={<Prescriptions />} />
            <Route path="/patients/reports" element={<Reports />} />
            <Route path="/medications/medications" element={<MedicationInventory />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/AboutPage" element={<AboutPage />} />
          </Route>

          {/* 3) Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}