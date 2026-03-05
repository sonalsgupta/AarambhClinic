import React, { useMemo, useEffect, useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import Papa from "papaparse";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

/** -------------------- Helpers: filename-safe + CSV -------------------- */
function safeSlug(input = "") {
  return (
    input
      .trim()
      .replace(/[\/\\?%*:|"<>]/g, "")
      .replace(/\s+/g, "_")
      .slice(0, 60) || "Patient"
  );
}

// RFC4180-ish escaping
function csvCell(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function toPrescriptionCsv(data) {
  const lines = [];
  lines.push(["Clinic", data.clinicName].map(csvCell).join(","));
  lines.push(["Clinic Address", data.clinicAddress].map(csvCell).join(","));
  lines.push(["Doctor", data.doctorName].map(csvCell).join(","));
  lines.push(["Doctor Reg No", data.doctorRegNo].map(csvCell).join(","));
  lines.push("");

  lines.push(["Patient Name", data.patientName].map(csvCell).join(","));
  lines.push(["Phone", data.phone].map(csvCell).join(","));
  lines.push(["Visit Date", data.visitDate].map(csvCell).join(","));
  lines.push("");

  lines.push(["Symptoms", data.symptoms].map(csvCell).join(","));
  lines.push(["Any change", data.anyChange].map(csvCell).join(","));
  lines.push(["Doctor's Note", data.doctorsNote].map(csvCell).join(","));
  lines.push("");

  lines.push(["Medicines"].map(csvCell).join(","));
  lines.push(["#", "Name", "Dose"].map(csvCell).join(","));
  (data.medicines || []).forEach((m, i) => {
    lines.push([i + 1, m?.name ?? "", m?.dose ?? ""].map(csvCell).join(","));
  });

  return lines.join("\r\n");
}

/** -------------------- Local storage “folders” by patient -------------------- */
const rxKey = (patientName) => `rx_history_${safeSlug(patientName)}`;

function loadRxFromLocal(patientName) {
  try {
    return JSON.parse(localStorage.getItem(rxKey(patientName)) || "[]");
  } catch {
    return [];
  }
}

function saveRxToLocal(patientName, visitDate, csvText) {
  const key = rxKey(patientName);
  const existing = loadRxFromLocal(patientName);

  const id = `${visitDate}_${Date.now()}`;
  const next = [
    { id, visitDate, createdAt: new Date().toISOString(), csvText },
    ...existing,
  ];

  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

/** -------------------- CSV -> Viewer parse -------------------- */
function parsePrescriptionCsv(csvText) {
  const result = Papa.parse(csvText, { skipEmptyLines: false });
  const rows = result.data || [];

  const getVal = (label) => {
    const found = rows.find((r) => (r?.[0] || "").trim() === label);
    return found?.[1] || "";
  };

  const meta = {
    clinicName: getVal("Clinic"),
    clinicAddress: getVal("Clinic Address"),
    doctor: getVal("Doctor"),
    doctorRegNo: getVal("Doctor Reg No"),
    patientName: getVal("Patient Name"),
    phone: getVal("Phone"),
    visitDate: getVal("Visit Date"),
    symptoms: getVal("Symptoms"),
    anyChange: getVal("Any change"),
    doctorsNote: getVal("Doctor's Note"),
  };

  // Find medicines header row: #,Name,Dose
  const headerIdx = rows.findIndex(
    (r) =>
      (r?.[0] || "") === "#" &&
      (r?.[1] || "") === "Name" &&
      (r?.[2] || "") === "Dose"
  );

  const meds = [];
  if (headerIdx !== -1) {
    for (let i = headerIdx + 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r || String(r[0] || "").trim() === "") break;

      meds.push({
        id: `${meta.visitDate}_${i}`,
        sno: r[0],
        name: r[1] || "",
        dose: r[2] || "",
      });
    }
  }

  return { meta, meds };
}

export default function Prescriptions() {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      clinicName: "Aarambh Clinic",
      clinicAddress: "Pimple Saudagar, Pune",
      doctorName: "Dr. ________",
      doctorRegNo: "Reg No: ________",

      patientName: "Rahul Sharma",
      phone: "9876543210",
      visitDate: new Date().toISOString().slice(0, 10),

      symptoms: "",
      anyChange: "",
      doctorsNote: "",

      medicines: [
        { name: "Paracetamol 650", dose: "1 tab after food, TID x 3 days" },
      ],
    },
  });

  const { control, register, handleSubmit, getValues, watch } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  /** --------- Viewer state --------- */
  const [rxHistory, setRxHistory] = useState(() =>
    loadRxFromLocal(methods.getValues("patientName"))
  );
  const [selectedRx, setSelectedRx] = useState(null);
  const [viewerMeta, setViewerMeta] = useState({});
  const [viewerMeds, setViewerMeds] = useState([]);

  // When patient changes, reload list
  useEffect(() => {
    const sub = watch((values, { name }) => {
      if (name === "patientName") {
        const list = loadRxFromLocal(values.patientName);
        setRxHistory(list);
        setSelectedRx(null);
        setViewerMeta({});
        setViewerMeds([]);
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // Print styles (injected once)
  const printCss = useMemo(
    () => `
      @media print {
        body * { visibility: hidden !important; }
        #print-area, #print-area * { visibility: visible !important; }
        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0 !important;
          margin: 0 !important;
        }
        .no-print { display: none !important; }
        .print-title { font-size: 18pt; font-weight: 800; }
        .print-sub { font-size: 10pt; opacity: 0.85; }
      }
    `,
    []
  );

  const onSubmit = (data) => {
    const csv = toPrescriptionCsv(data);

    // Save into local “folder” for the patient
    const next = saveRxToLocal(data.patientName, data.visitDate, csv);
    setRxHistory(next);

    // Auto-select the newly saved one and show viewer
    const newlySaved = next[0];
    setSelectedRx(newlySaved);
    const parsed = parsePrescriptionCsv(newlySaved.csvText);
    setViewerMeta(parsed.meta);
    setViewerMeds(parsed.meds);

    // Print
    window.print();
  };

  const onPrint = () => {
    console.log("Print Snapshot", getValues());
    window.print();
  };

  return (
    <FormProvider {...methods}>
      <style>{printCss}</style>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 0 }}>
        {/* Top actions (won't print) */}
        <Box className="no-print" sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button variant="contained" onClick={onPrint}>
            Print
          </Button>
          <Button variant="outlined" type="submit" form="rx-form">
            Save & Print
          </Button>
        </Box>

        {/* ✅ Previous Prescriptions Viewer (won't print) */}
        <Box
          className="no-print"
          sx={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 2,
            mb: 2,
          }}
        >
          <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>
              Previous Prescriptions
            </Typography>

            {rxHistory.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No saved prescriptions for this patient yet.
              </Typography>
            ) : (
              <List dense sx={{ maxHeight: 360, overflow: "auto" }}>
                {rxHistory.map((rx) => (
                  <ListItemButton
                    key={rx.id}
                    selected={selectedRx?.id === rx.id}
                    onClick={() => {
                      setSelectedRx(rx);
                      const parsed = parsePrescriptionCsv(rx.csvText);
                      setViewerMeta(parsed.meta);
                      setViewerMeds(parsed.meds);
                    }}
                  >
                    <ListItemText
                      primary={`Visit: ${rx.visitDate}`}
                      secondary={new Date(rx.createdAt).toLocaleString()}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>
              Prescription Viewer
            </Typography>

            {!selectedRx ? (
              <Typography variant="body2" color="text.secondary">
                Click a previous prescription to view it.
              </Typography>
            ) : (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2">
                    <b>Patient:</b> {viewerMeta.patientName}
                  </Typography>
                  <Typography variant="body2">
                    <b>Phone:</b> {viewerMeta.phone}
                  </Typography>
                  <Typography variant="body2">
                    <b>Visit:</b> {viewerMeta.visitDate}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  Medicines
                </Typography>

                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 1.5fr",
                      p: 1,
                      fontWeight: 800,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Box>#</Box>
                    <Box>Name</Box>
                    <Box>Dose</Box>
                  </Box>

                  {viewerMeds.length === 0 ? (
                    <Box sx={{ p: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        No medicines found in this CSV.
                      </Typography>
                    </Box>
                  ) : (
                    viewerMeds.map((r) => (
                      <Box
                        key={r.id}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "80px 1fr 1.5fr",
                          p: 1,
                          borderTop: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Box>{r.sno}</Box>
                        <Box>{r.name}</Box>
                        <Box>{r.dose}</Box>
                      </Box>
                    ))
                  )}
                </Box>
              </>
            )}
          </Paper>
        </Box>

        {/* ✅ PRINT AREA */}
        <Box id="print-area">
          <Paper
            elevation={0}
            sx={{ p: 2, border: "1px solid", borderColor: "divider" }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Box>
                <Typography className="print-title">
                  {methods.getValues("clinicName")}
                </Typography>
                <Typography className="print-sub">
                  {methods.getValues("clinicAddress")}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 700 }}>
                  {methods.getValues("doctorName")}
                </Typography>
                <Typography className="print-sub">
                  {methods.getValues("doctorRegNo")}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Form */}
            <form id="rx-form" onSubmit={handleSubmit(onSubmit)}>
              {/* Patient Info */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                <TextField label="Patient Name" size="small" {...register("patientName")} />
                <TextField label="Phone" size="small" {...register("phone")} />
                <TextField
                  label="Visit Date"
                  type="date"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  {...register("visitDate")}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Symptoms */}
              <TextField
                label="Symptoms"
                multiline
                minRows={2}
                fullWidth
                sx={{ mb: 2 }}
                {...register("symptoms")}
              />

              {/* Medicines */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontWeight: 800 }}>Prescribed Medicines</Typography>

                <Button
                  className="no-print"
                  startIcon={<AddIcon />}
                  variant="outlined"
                  onClick={() => append({ name: "", dose: "" })}
                >
                  Add Medicine
                </Button>
              </Box>

              <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                {fields.map((field, index) => (
                  <Box
                    key={field.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1.6fr auto",
                      gap: 1,
                      alignItems: "center",
                    }}
                  >
                    <TextField label="Medicine" size="small" {...register(`medicines.${index}.name`)} />
                    <TextField label="Dose" size="small" {...register(`medicines.${index}.dose`)} />

                    <IconButton
                      className="no-print"
                      aria-label="remove"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Any change + Doctor note */}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField label="Any change" multiline minRows={3} fullWidth {...register("anyChange")} />
                <TextField label="Doctor's Note" multiline minRows={3} fullWidth {...register("doctorsNote")} />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Footer */}
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                <Typography className="print-sub">
                  Follow-up: ________ days / If symptoms worsen, visit immediately.
                </Typography>

                <Box sx={{ textAlign: "right", minWidth: 220 }}>
                  <Typography sx={{ fontWeight: 700 }}>Signature</Typography>
                  <Box sx={{ height: 48, borderBottom: "1px solid", borderColor: "text.primary" }} />
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      </Paper>
    </FormProvider>
  );
}
