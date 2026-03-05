import { useEffect, useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextField,
  Typography,
  MenuItem,
  Box,
  Grid,
  Stack,
} from "@mui/material";

const generatePatientId = () => `PAT-${Date.now().toString().slice(-6)}`;

const calculateAgeDecimal = (dob) => {
  if (!dob) return "";
  const birth = new Date(dob);
  const now = new Date();
  if (Number.isNaN(birth.getTime())) return "";

  const diffMs = now.getTime() - birth.getTime();
  if (diffMs < 0) return "";

  const years = diffMs / (365.25 * 24 * 60 * 60 * 1000);
  return years.toFixed(1); // "9.9"
};

const getAgeCategory = (age) => {
  const a = Number(age);
  if (!Number.isFinite(a)) return "";
  if (a < 18) return "Pediatric";
  if (a >= 60) return "Geriatric";
  return "Adult";
};

const maskAadhaar = (digits) => {
  const d = (digits || "").replace(/\D/g, "").slice(0, 12);
  if (d.length <= 4) return d;
  if (d.length < 12) return d; // while typing, show raw digits
  return `**** **** ${d.slice(-4)}`;
};

export default function BasicInfoStep() {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const dob = watch("dob");
  const age = watch("age");
  const patientId = watch("patientId");

  // generate Patient ID once
  useEffect(() => {
    setValue("patientId", generatePatientId(), { shouldDirty: false });
  }, [setValue]);

  // auto-calc age from dob
  useEffect(() => {
    setValue("age", calculateAgeDecimal(dob), { shouldDirty: false });
  }, [dob, setValue]);

  // auto age category
  const ageCategory = useMemo(() => getAgeCategory(age), [age]);
  useEffect(() => {
    setValue("ageCategory", ageCategory, { shouldDirty: false });
  }, [ageCategory, setValue]);

  return (
    <Box sx={{ maxHeight: "65vh", overflowY: "auto", pr: 1 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Basic Information
      </Typography>

      {/* Inline header row: Patient ID + Age Category (NO boxes) */}
      <Box
        sx={{
          mb: 1,
          px: 0.5,
          py: 0.75,
          borderRadius: 2,
          bgcolor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="caption" color="text.secondary">
            Patient ID:
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: "primary.main" }}>
            {patientId || "—"}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography variant="caption" color="text.secondary">
            Category:
          </Typography>
          <Typography variant="subtitle2" fontWeight={700} sx={{ color: "primary.main" }}>
            {ageCategory || "—"}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(12, 1fr)",
          },
          alignItems: "start",
        }}
      >
        {/* Row 1: Name | Sex at Birth | DOB | Age */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Full Name"
            size="small"
            fullWidth
            {...register("fullName", { required: "Full name is required" })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 2" } }}>
          <TextField
            select
            label="Sex at Birth"
            size="small"
            fullWidth
            {...register("sexAtBirth", { required: "Sex at birth is required" })}
            error={!!errors.sexAtBirth}
            helperText={errors.sexAtBirth?.message}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 3" } }}>
          <TextField
            label="DOB"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: new Date().toISOString().split("T")[0], // 👈 disables future dates
            }}
            {...register("dob", {
              required: "DOB is required",
              validate: (value) =>
                new Date(value) <= new Date() || "DOB cannot be in the future",
            })}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 3" } }}>
          <TextField
            label="Age (years)"
            size="small"
            fullWidth
            value={age || ""}
            InputLabelProps={{ shrink: true }}
            placeholder=""
            InputProps={{ readOnly: true }}
            {...register("age")}
          />
        </Box>

        {/* Row 2: Aadhaar | Email | Address  (FORCED to row 2 by design) */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <Controller
            name="govtId"
            control={control}
            rules={{
              validate: (val) => {
                const digits = (val || "").replace(/\D/g, "");
                if (!digits) return true;
                return digits.length === 12 || "Aadhaar should be 12 digits";
              },
            }}
            render={({ field, fieldState }) => {
              const digitsOnly = (field.value || "").replace(/\D/g, "").slice(0, 12);
              const displayValue = maskAadhaar(digitsOnly);

              return (
                <TextField
                  label="Aadhaar (Optional)"
                  size="small"
                  fullWidth
                  value={displayValue}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
                    field.onChange(digits);
                  }}
                  inputProps={{ inputMode: "numeric" }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message || "Format: **** **** 1234"}
                />
              );
            }}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField label="Email" size="small" fullWidth {...register("email")} />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Address (Area, City)"
            size="small"
            fullWidth
            {...register("address")}
          />
        </Box>

        {/* Row 3: Disability | Details | Assistive Devices */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            select
            label="Disability"
            size="small"
            fullWidth
            defaultValue="No"
            {...register("disability", { required: "Please select disability status" })}
            error={!!errors.disability}
            helperText={errors.disability?.message}
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Disability Details (Optional)"
            size="small"
            fullWidth
            disabled={watch("disability") !== "Yes"}
            {...register("disabilityDetails")}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Assistive Devices (Optional)"
            size="small"
            fullWidth
            disabled={watch("disability") !== "Yes"}
            {...register("assistiveDevices")}
          />
        </Box>

        {/* Row 4 (last): Mobile | Emergency Contact | Contact Person */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Mobile"
            size="small"
            fullWidth
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit mobile" },
            })}
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Emergency Contact"
            size="small"
            fullWidth
            {...register("emergencyContact")}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 4" } }}>
          <TextField
            label="Emergency Contact Person"
            size="small"
            fullWidth
            {...register("contactName")}
          />
        </Box>
      </Box>





    </Box>


  );
}
