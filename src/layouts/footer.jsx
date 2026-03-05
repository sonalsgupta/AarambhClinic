import { Box, Typography, Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(90deg, #f37d6b,#2081c0)",
        color: "#fff",
        px: 3,
        py: 1.2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1200
      }}
    >
      {/* Clinic Name */}
      <Typography fontWeight={700}>
        Aarambh Mental Health Clinic
      <br/>
        3rd floor, Westend Shopping Building, Aundh, Pune, Maharashtra 411067
      </Typography>

      {/* Contact */}
      <Stack direction="row" spacing={3} alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <PlaceIcon fontSize="small" />
          <Typography fontWeight={600}>Pune</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon fontSize="small" />
          <Typography fontWeight={700}>+91 98XXXXXX12</Typography>
        </Stack>
      </Stack>

      {/* Copyright */}
      <Typography variant="caption">
        © {new Date().getFullYear()} ClinicFlow
      </Typography>
    </Box>
  );
}