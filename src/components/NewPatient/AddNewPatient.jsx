import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";

import {
  Paper,
  Tabs,
  Tab,
  Stack,
  Box,
  Button,
} from "@mui/material";

import BasicInfoStep from "./steps/BasicInfoStep";
import MedicalStep from "./steps/MedicalStep";

/* ✅ ONLY TWO STEPS */
const steps = ["basic", "medical"];

export default function NewPatientWizard({ getValues }) {
  const [docsHandle, setDocsHandle] = useState(null);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      phone: "",
      email: "",

      bloodGroup: "",
      allergies: "",
      chronicConditions: "",
    },
  });

  const [activeStep, setActiveStep] = useState(0);

  /* ✅ Step-wise validation */
  const stepFields = [
    ["firstName", "lastName", "dob", "phone"],
    ["bloodGroup", "allergies", "chronicConditions"],
  ];

  const next = async () => {
    const valid = await methods.trigger(stepFields[activeStep]);
    if (valid) setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  /* ---------- helpers ---------- */
  const safeName = (s) =>
    (s || "patient")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");

  async function writeTextFile(folderHandle, filename, content) {
    const fileHandle = await folderHandle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  }

  const pickDocumentsFolder = async () => {
    const handle = await window.showDirectoryPicker();
    setDocsHandle(handle);
  };

  const onSubmit = async (formData) => {
    if (!docsHandle) {
      alert("Please select your Documents folder first.");
      return;
    }

    const patientId = uuidv4();
    const visitDate = new Date().toISOString().slice(0, 10);
    const fileName = `${safeName(
      `${formData.firstName}_${formData.lastName}`
    )}_${visitDate}.csv`;

    const rows = [
      ["patientId", patientId],
      ["name", `${formData.firstName} ${formData.lastName}`],
      ["dob", formData.dob],
      ["phone", formData.phone],
      [],
      ["bloodGroup", formData.bloodGroup],
      ["allergies", formData.allergies],
      ["chronicConditions", formData.chronicConditions],
    ];

    const csv = Papa.unparse(rows, { quotes: true });
    await writeTextFile(docsHandle, fileName, csv);

    alert(`Saved: ${fileName}`);
  };

  const onTabChange = (_e, newStep) => {
  setActiveStep(newStep);
};

  return (
    <>
      <FormProvider {...methods}>
        <Paper elevation={0} sx={{ p: 3 }}>
          <Tabs
            value={activeStep}
            onChange={onTabChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="Basic Information" />
            <Tab label="Medical Information" />
          </Tabs>

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {activeStep === 0 && <BasicInfoStep />}
            {activeStep === 1 && <MedicalStep />}

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                onClick={back}
                disabled={activeStep === 0}
              >
                Back
              </Button>

              {activeStep < steps.length - 1 ? (
                <Button variant="contained" onClick={next}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="success">
                  Save Patient
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </FormProvider>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={pickDocumentsFolder}>
          Select Documents Folder
        </Button>

        <Button
          variant="contained"
          disabled={!docsHandle}
          onClick={() => onSubmit(getValues())}
        >
          Submit & Save CSV
        </Button>
      </Stack>
    </>
  );
}
