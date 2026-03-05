import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import AppLayout from "./layouts/AppLayout";
import Dashboard from "./components/Dashboard";
import PatientsDetail from "./components/Patient/PatientsRecords/PatientsDetails";
import Visits from "./components/Patient/PatientsRecords/Visits";
import Prescriptions from "./components/Patient/PatientsRecords/Prescriptions";
import Reports from "./components/Patient/PatientsRecords/Reports";
import NewPatientWizard from "./components/NewPatient/AddNewPatient";
import MedicationInventory from "./components/Medications/Medications";
import AboutPage from "./components/About/AboutInDetails"
import { buildTheme } from "./styles/theme";
import Blogs from "./components/Blogs/Blogs";


export default function App() {
  const [mode, setMode] = React.useState(() => {
    return localStorage.getItem("cf_mode") || "light";
  });
  

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
          <Route element={<AppLayout mode={mode} onToggleMode={toggleMode} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/newPatient/AddNewPatient" element={<NewPatientWizard />} />
            <Route path="/patients" element={<PatientsDetail />} />
            <Route path="/patients/visits" element={<Visits />} />
            <Route path="/patients/prescriptions" element={<Prescriptions />} />
            <Route path="/patients/reports" element={<Reports />} />
            <Route path="/medications/medications" element={<MedicationInventory />} />
            <Route path="/Blogs" element = {<Blogs/>}/>
            <Route path="/AboutPage" element = {<AboutPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
