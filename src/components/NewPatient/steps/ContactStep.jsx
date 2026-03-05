import { useFormContext } from "react-hook-form";
import { Stack, TextField, Typography } from "@mui/material";

export default function ContactStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" fontWeight={600}>
        Contact Details
      </Typography>

      <TextField
        label="Phone Number"
        type="tel"
        fullWidth
        placeholder="e.g. 9876543210"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Enter a valid 10-digit Indian mobile number",
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <TextField
        label="Email Address"
        type="email"
        fullWidth
        placeholder="e.g. patient@email.com"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
    </Stack>
  );
}
