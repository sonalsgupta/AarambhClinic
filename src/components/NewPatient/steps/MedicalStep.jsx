import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Paper,
  Stack,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Alert,
} from "@mui/material";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const COMMON_CONDITIONS = [
  { key: "diabetes", label: "Diabetes" },
  { key: "hypertension", label: "Hypertension" },
  { key: "asthma", label: "Asthma" },
  { key: "thyroid", label: "Thyroid" },
];

function ChipInput({ label, value, onChange, placeholder }) {
  const [draft, setDraft] = React.useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (value?.some((x) => x.toLowerCase() === v.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...(value || []), v]);
    setDraft("");
  };

  const remove = (item) => onChange((value || []).filter((x) => x !== item));

  return (
    <Box>
      <TextField
        size="small"
        label={label}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        helperText="Press Enter to add"
      />
      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
        {(value || []).map((item) => (
          <Chip key={item} label={item} onDelete={() => remove(item)} size="small" />
        ))}
      </Box>
    </Box>
  );
}

function Section({ title, children }) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 0.75 }}>
        {title}
      </Typography>
      <Stack spacing={1.25}>{children}</Stack>
    </Box>
  );
}

export default function PatientMedicalForm({ initialValues, onSave }) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      bloodGroup: "",
      allergies: [],
      chronic: {
        diabetes: false,
        hypertension: false,
        asthma: false,
        thyroid: false,
        other: "",
      },
      pastSurgeries: "",
      familyHistory: "",
      pregnancyStatus: "not_applicable",
      notes: "",
      ...initialValues,
    },
  });

  const pregnancyStatus = watch("pregnancyStatus");

  const submit = async (data) => {
    if (onSave) return onSave(data);
    console.log("Medical Info:", data);
    alert("Saved! (Check console)");
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        maxHeight: "75vh",
        overflowY: "auto",
      }}
    >
      <Stack spacing={1.5}>
        {/* Header */}
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Medical Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* 2-column layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
            alignItems: "start",
          }}
        >
          {/* LEFT COLUMN */}
          <Stack spacing={2}>
            <Section title="Core Details">
              {/* Blood Group */}
              <Controller
                name="bloodGroup"
                control={control}
                rules={{ required: "Blood group is required" }}
                render={({ field }) => (
                  <FormControl fullWidth size="small" error={!!errors.bloodGroup}>
                    <InputLabel>Blood Group *</InputLabel>
                    <Select label="Blood Group *" {...field}>
                      {BLOOD_GROUPS.map((bg) => (
                        <MenuItem key={bg} value={bg}>
                          {bg}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.bloodGroup && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                        {errors.bloodGroup.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              {/* Allergies */}
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <ChipInput
                    label="Known Allergies (especially drug)"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="e.g., Penicillin, Sulfa, Dust, Peanuts"
                  />
                )}
              />
            </Section>

            <Section title="Chronic Conditions">
              <FormGroup sx={{ gap: 0 }}>
                {COMMON_CONDITIONS.map((c) => (
                  <Controller
                    key={c.key}
                    name={`chronic.${c.key}`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        sx={{ my: -0.5 }}
                        control={
                          <Checkbox
                            size="small"
                            checked={!!field.value}
                            onChange={(_, v) => field.onChange(v)}
                          />
                        }
                        label={c.label}
                      />
                    )}
                  />
                ))}
              </FormGroup>

              <TextField
                size="small"
                label="Other chronic (optional)"
                fullWidth
                placeholder="e.g., CAD, CKD, Epilepsy, Arthritis..."
                {...register("chronic.other")}
              />
            </Section>
          </Stack>

          {/* RIGHT COLUMN */}
          <Stack spacing={2}>
            <Section title="History">
              <TextField
                size="small"
                label="Past Surgeries"
                fullWidth
                multiline
                minRows={2}
                placeholder="e.g., Appendectomy (2018), C-section (2021)"
                {...register("pastSurgeries")}
              />

              <TextField
                size="small"
                label="Family History (if relevant)"
                fullWidth
                multiline
                minRows={2}
                placeholder="e.g., Father: Diabetes, Mother: Hypertension"
                {...register("familyHistory")}
              />
            </Section>

            <Section title="Pregnancy / Lactation">
              <Controller
                name="pregnancyStatus"
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value="not_applicable" control={<Radio size="small" />} label="N/A" />
                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    <FormControlLabel value="pregnant" control={<Radio size="small" />} label="Pregnant" />
                    <FormControlLabel value="lactating" control={<Radio size="small" />} label="Lactating" />
                  </RadioGroup>
                )}
              />

              {(pregnancyStatus === "pregnant" || pregnancyStatus === "lactating") && (
                <Alert severity="info" sx={{ mt: 0.5 }}>
                  Add trimester/weeks in notes if relevant.
                </Alert>
              )}
            </Section>

            <Section title="Notes">
              <TextField
                size="small"
                label="Doctor Notes (optional)"
                fullWidth
                multiline
                minRows={3}
                placeholder="Anything important to remember..."
                {...register("notes")}
              />
            </Section>
          </Stack>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Sticky footer actions */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "background.paper",
            pt: 1,
            pb: 1,
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={handleSubmit(submit)}
            disabled={isSubmitting}
          >
            Save Medical Info
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
